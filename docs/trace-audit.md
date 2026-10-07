# Footprint trace audit

Run the regression suite with Node.js 18 or newer:

```sh
node --test tests/*.test.js
```

The audit generates every root-level footprint JavaScript file with a minimal
Ergogen parameter context, then parses the emitted KiCad S-expressions. For each
pad and trace on a shared copper layer it checks:

- A segment passing through a pad center must end there (split the route there).
- A trace touching pad copper must have an explicit segment endpoint at that
  pad center on the same layer and net.
- A trace with an explicit net must not touch a pad on another net.
- No trace may have zero length.

The suite exhaustively varies the routing and pad-selection booleans listed in
`tests/pad-center-traces.test.js`, both sides, and rotations of 0°, 90°, and 37°
at a translated location (28,260 generated variants across 24 files). Additional cases cover narrower/wider Choc pads,
smaller vias and trace widths, inward diode vias, and user router vertices.
Detector fixtures verify that unsplit center crossings, pad-area contacts,
track-width contacts, wrong layers, custom polygons, and wrong nets are handled.

## Results by footprint

| Footprint | Trace finding / action |
| --- | --- |
| `battery_connector_jst_ph_2.js` | Connector-to-jumper traces already end at centers, including the new rectangular variant. |
| `battery_connector_molex_pico_ezmate_1x02.js` | No generated traces. |
| `diode_tht_sod123.js` | Both THT and SMD/via routes already end at centers. |
| `display_nice_view.js` | Both jumper positions already route to centers. |
| `display_ssd1306.js` | Both jumper positions already route to centers. |
| `led_sk6812mini-e.js` | Both mounting orientations already route to centers. |
| `mcu_nice_nano.js` | Use rectangular jumper centers on both sides; shorten the back jumper segments to end at the centers they previously crossed; add back-layer sections from the offset route endpoints to the inside via-pad centers. |
| `mcu_supermini_nrf52840.js` | Same fixes as nice!nano. |
| `mounting_hole_npth.js` | No generated traces. |
| `mounting_hole_plated.js` | No generated traces. |
| `power_switch_smd_side.js` | No generated traces. |
| `reset_switch_smd_side.js` | No generated traces. |
| `reset_switch_tht_top.js` | No generated traces. |
| `rotary_encoder_ec11_ec12.js` | No generated traces. |
| `switch_choc_v1_v2.js` | Add horizontal center connections to the same-side hotswap routes. Account for configurable outer-pad centers in both routing modes. Omit a horizontal section when its endpoints coincide at a pad width of 1.6 mm. |
| `switch_gateron_ks27_ks33.js` | No generated traces; custom pads are solder pads, not chevron jumpers. |
| `switch_mx.js` | Routes already reach pad centers, but the opposed-side routing had incorrect net assignments on both routes and a 0.0005 mm endpoint mismatch. Correct the nets to match their pads and vias and join the endpoints exactly. |
| `trrs_pj320a.js` | No generated traces. |
| `utility_ergogen_logo.js` | No generated traces. |
| `utility_filled_zone.js` | No generated traces. |
| `utility_keepout_zone.js` | No generated traces. |
| `utility_point_debugger.js` | No generated traces. |
| `utility_router.js` | Emits user-specified route vertices; has no pads or access to other footprints. See limits below. |
| `utility_text.js` | No generated traces. |

## KiCad validation and limits

Ten isolated sample boards covering the two jumper styles and both switch routing
modes were loaded by KiCad CLI 8.0.9. Copper SVG export succeeded. KiCad DRC reported
no track/pad shorts or copper clearance violations for these samples; both switch
footprints had zero unconnected items. These are not fully routed PCB designs:
missing outlines/library configuration, MCU silkscreen overlap, overlapping MX
mounting holes, and intentionally open jumper nets are still reported.

The checker uses a 0.000001 mm center tolerance, polygonal approximations of curved
pad boundaries, and the emitted custom polygons plus their anchors. It does not
prove correctness for every arbitrary numeric parameter or replace full-board
KiCad DRC. MCU segments retain their existing implicit-net style, so their
geometric center checks cannot independently verify trace net assignments.

`utility_router.js` cannot inspect pads emitted elsewhere in an assembled PCB.
Automatic splitting of arbitrary user-defined routes against other footprints
requires a board-level pass after Ergogen generation. The changes here fix and
check the predefined footprint routes; they do not claim to normalize arbitrary
external routing.

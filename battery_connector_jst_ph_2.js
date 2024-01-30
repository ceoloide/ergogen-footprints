// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: MIT
//
// To view a copy of this license, visit https://opensource.org/license/mit/
//
// Author: @ceoloide
//
// Description:
//  A reversible JST PH 2.0mm footprint with support for solder jumpers and traces. This is
//  the same part sold at Typeractive.xyz and LCSC.
//
//  Note that the footprint's courtyard includes the space required for the male connector
//  and its cables. Make sure to leave enough room in front of the connector. The silkscreen
//  includes a handy reference for positive and negative terminals that remains visible
//  after the connector is soldered, to ensure wire polarity is correct.
//
// Datasheet:
//  https://cdn.shopify.com/s/files/1/0618/5674/3655/files/JST-S2B-PH-K.pdf?v=1670451309
//
// Params
//    side: default is F for Front
//      the side on which to place the single-side footprint and designator, either F or B
//    reversible: default is false
//      if true, the footprint will be placed on both sides so that the PCB can be
//      reversible
//    include_traces: default is true
//      if true it will include traces that connect the jumper pads to the connector pins
//    trace_width: default is 0.250mm
//      allows to override the trace width that connects the jumper pads to the connector
//      pins. Not recommended to go below 0.25mm.
//    silkscreen: default is true
//      if true it will include the silkscreen. Recommended to be true to ensure connector
//      polarity is not reversed, which can lead to shorting and damage to the MCU
//    fabrication: default is true
//      if true it will include the outline of the connector in the fabrication layer
//    courtyard: default is true
//      if true it will include a courtyard outline around the connector and in front of it
//      to also account for the male connector plug and the wires. Recommended to be true
//      at least once in the development of a board to confirm sufficient clearance for the
//      connector and wires.

module.exports = {
    params: {
        designator: 'JST',
        side: 'F',
        reversible: false,
        include_traces: true,
        trace_width: 0.250,
        include_silkscreen: true,
        include_fabrication: true,
        include_courtyard: true,
        BAT_P: { type: 'net', value: 'BAT_P' },
        BAT_N: { type: 'net', value: 'GND' },
    },
    body: p => {

        const get_at_coordinates = () => {
            const pattern = /\(at (-?[\d\.]*) (-?[\d\.]*) (-?[\d\.]*)\)/;
            const matches = p.at.match(pattern);
            if (matches && matches.length == 4) {
                return [parseFloat(matches[1]), parseFloat(matches[2]), parseFloat(matches[3])];
            } else {
                return null;
            }
        }

        const adjust_point = (x, y) => {
            const at_l = get_at_coordinates();
            if (at_l == null) {
                throw new Error(
                    `Could not get x and y coordinates from p.at: ${p.at}`
                );
            }
            const at_x = at_l[0];
            const at_y = at_l[1];
            const at_angle = at_l[2];
            const adj_x = at_x + x;
            const adj_y = at_y + y;

            const radians = (Math.PI / 180) * at_angle,
                cos = Math.cos(radians),
                sin = Math.sin(radians),
                nx = (cos * (adj_x - at_x)) + (sin * (adj_y - at_y)) + at_x,
                ny = (cos * (adj_y - at_y)) - (sin * (adj_x - at_x)) + at_y;

            const point_str = `${nx.toFixed(3)} ${ny.toFixed(3)}`;
            return point_str;
        }

        let local_nets = [
            p.local_net("1"),
            p.local_net("2"),
        ];

        const standard_opening = `
            (module "ceoloide/battery_connector_jst_ph_2" (layer ${p.side}.Cu) (tedit 6135B927)
                ${p.at /* parametric position */}

                (descr "JST PH series connector, S2B-PH-K (http://www.jst-mfg.com/product/pdf/eng/ePH.pdf)")
                (fp_text reference "${p.ref}" (at 0 4.8 ${p.rot}) (layer "${p.side}.SilkS") ${p.ref_hide}
                    (effects (font (size 1 1) (thickness 0.15)))
                )
            `
        const front_fabrication = `
                (fp_line (start -2.95 -1.35) (end -2.95 6.25) (width 0.1) (layer "F.Fab"))
                (fp_line (start -2.95 6.25) (end 2.95 6.25) (width 0.1) (layer "F.Fab"))
                (fp_line (start -2.25 -1.35) (end -2.95 -1.35) (width 0.1) (layer "F.Fab"))
                (fp_line (start -2.25 0.25) (end -2.25 -1.35) (width 0.1) (layer "F.Fab"))
                (fp_line (start 2.25 -1.35) (end 2.25 0.25) (width 0.1) (layer "F.Fab"))
                (fp_line (start 2.25 0.25) (end -2.25 0.25) (width 0.1) (layer "F.Fab"))
                (fp_line (start 2.95 -1.35) (end 2.25 -1.35) (width 0.1) (layer "F.Fab"))
                (fp_line (start 2.95 6.25) (end 2.95 -1.35) (width 0.1) (layer "F.Fab"))
        `
        const front_courtyard = `
                (fp_line (start -3.45 -1.85) (end -3.45 10.5) (width 0.05) (layer "F.CrtYd"))
                (fp_line (start -3.45 10.5) (end 3.45 10.5) (width 0.05) (layer "F.CrtYd"))
                (fp_line (start 3.45 -1.85) (end -3.45 -1.85) (width 0.05) (layer "F.CrtYd"))
                (fp_line (start 3.45 10.5) (end 3.45 -1.85) (width 0.05) (layer "F.CrtYd"))
        `
        const front_silkscreen = `
                (fp_line (start -1.5 7.40) (end -0.5 7.40) (width 0.1) (layer "F.SilkS"))
                (fp_line (start 1.5 7.40) (end 0.5 7.40) (width 0.1) (layer "F.SilkS"))
                (fp_line (start 1 6.90) (end 1 7.90) (width 0.1) (layer "F.SilkS"))
                (fp_line (start -2.06 -1.46) (end -3.06 -1.46) (width 0.12) (layer "F.SilkS"))
                (fp_line (start -3.06 -1.46) (end -3.06 -0.46) (width 0.12) (layer "F.SilkS"))
                (fp_line (start 2.14 -1.46) (end 3.06 -1.46) (width 0.12) (layer "F.SilkS"))
                (fp_line (start 3.06 -1.46) (end 3.06 -0.46) (width 0.12) (layer "F.SilkS"))
                (fp_line (start -2.14 6.36) (end -3.06 6.36) (width 0.12) (layer "F.SilkS"))
                (fp_line (start -3.06 6.36) (end -3.06 5.36) (width 0.12) (layer "F.SilkS"))
                (fp_line (start 2.14 6.36) (end 3.06 6.36) (width 0.12) (layer "F.SilkS"))
                (fp_line (start 3.06 6.36) (end 3.06 5.36) (width 0.12) (layer "F.SilkS"))
        `
        const back_fabrication = `
                (fp_line (start -2.95 -1.35) (end -2.25 -1.35) (width 0.1) (layer "B.Fab"))
                (fp_line (start -2.95 6.25) (end -2.95 -1.35) (width 0.1) (layer "B.Fab"))
                (fp_line (start -2.25 -1.35) (end -2.25 0.25) (width 0.1) (layer "B.Fab"))
                (fp_line (start -2.25 0.25) (end 2.25 0.25) (width 0.1) (layer "B.Fab"))
                (fp_line (start 2.25 -1.35) (end 2.95 -1.35) (width 0.1) (layer "B.Fab"))
                (fp_line (start 2.25 0.25) (end 2.25 -1.35) (width 0.1) (layer "B.Fab"))
                (fp_line (start 2.95 -1.35) (end 2.95 6.25) (width 0.1) (layer "B.Fab"))
                (fp_line (start 2.95 6.25) (end -2.95 6.25) (width 0.1) (layer "B.Fab"))
        `
        const back_courtyard = `
                (fp_line (start -3.45 -1.85) (end -3.45 10.5) (width 0.05) (layer "B.CrtYd"))
                (fp_line (start -3.45 10.5) (end 3.45 10.5) (width 0.05) (layer "B.CrtYd"))
                (fp_line (start 3.45 -1.85) (end -3.45 -1.85) (width 0.05) (layer "B.CrtYd"))
                (fp_line (start 3.45 10.5) (end 3.45 -1.85) (width 0.05) (layer "B.CrtYd"))
        `
        const back_silkscreen = `
                (fp_line (start 1.5 7.40) (end 0.5 7.40) (width 0.1) (layer "B.SilkS"))
                (fp_line (start -1.5 7.40) (end -0.5 7.40) (width 0.1) (layer "B.SilkS"))
                (fp_line (start -1 6.90) (end -1 7.90) (width 0.1) (layer "B.SilkS"))
                (fp_line (start -2.06 -1.46) (end -3.06 -1.46) (width 0.12) (layer "B.SilkS"))
                (fp_line (start -3.06 -1.46) (end -3.06 -0.46) (width 0.12) (layer "B.SilkS"))
                (fp_line (start 2.14 -1.46) (end 3.06 -1.46) (width 0.12) (layer "B.SilkS"))
                (fp_line (start 3.06 -1.46) (end 3.06 -0.46) (width 0.12) (layer "B.SilkS"))
                (fp_line (start -2.14 6.36) (end -3.06 6.36) (width 0.12) (layer "B.SilkS"))
                (fp_line (start -3.06 6.36) (end -3.06 5.36) (width 0.12) (layer "B.SilkS"))
                (fp_line (start 2.14 6.36) (end 3.06 6.36) (width 0.12) (layer "B.SilkS"))
                (fp_line (start 3.06 6.36) (end 3.06 5.36) (width 0.12) (layer "B.SilkS"))
        `
        const front_pads = `
                (pad 1 thru_hole roundrect (at -1 0 ${p.rot}) (size 1.2 1.75) (drill 0.75) (layers "*.Cu" "*.Mask") (roundrect_rratio 0.20) ${p.BAT_N.str})
                (pad 2 thru_hole oval (at 1 0 ${p.rot}) (size 1.2 1.75) (drill 0.75) (layers "*.Cu" "*.Mask") ${p.BAT_P.str})
        `
        const back_pads = `
                (pad 1 thru_hole roundrect (at 1 0 ${p.rot}) (size 1.2 1.75) (drill 0.75) (layers "*.Cu" "*.Mask") (roundrect_rratio 0.20) ${p.BAT_N.str})
                (pad 2 thru_hole oval (at -1 0 ${p.rot}) (size 1.2 1.75) (drill 0.75) (layers "*.Cu" "*.Mask") ${p.BAT_P.str})
        `
        const reversible_pads = `
                (pad 11 thru_hole oval (at -1 0 ${p.rot}) (size 1.2 1.75) (drill 0.75) (layers "*.Cu" "*.Mask") ${local_nets[0].str})
                (pad 12 thru_hole oval (at 1 0 ${p.rot}) (size 1.2 1.75) (drill 0.75) (layers "*.Cu" "*.Mask") ${local_nets[1].str})
                (pad 21 smd custom (at -1 1.8 ${180 + p.rot}) (size 0.1 0.1) (layers "F.Cu" "F.Mask")
                    (clearance 0.1) (zone_connect 0)
                    (options (clearance outline) (anchor rect))
                    (primitives
                    (gr_poly
                        (pts
                        (xy 0.6 0.4)
                        (xy -0.6 0.4)
                        (xy -0.6 0.2)
                        (xy 0 -0.4)
                        (xy 0.6 0.2)
                        )   
                        (width 0))
                    )
                    ${local_nets[0]})
                (pad 31 smd custom (at -1 1.8 ${180 + p.rot}) (size 0.1 0.1) (layers "B.Cu" "B.Mask")
                    (clearance 0.1) (zone_connect 0)
                    (options (clearance outline) (anchor rect))
                    (primitives
                    (gr_poly
                        (pts
                        (xy 0.6 0.4)
                        (xy -0.6 0.4)
                        (xy -0.6 0.2)
                        (xy 0 -0.4)
                        (xy 0.6 0.2)
                        )
                        (width 0))
                    )
                    ${local_nets[0]})
                (pad 22 smd custom (at 1 1.8 ${180 + p.rot}) (size 0.1 0.1) (layers "F.Cu" "F.Mask")
                    (clearance 0.1) (zone_connect 0)
                    (options (clearance outline) (anchor rect))
                    (primitives
                    (gr_poly
                        (pts
                        (xy 0.6 0.4)
                        (xy -0.6 0.4)
                        (xy -0.6 0.2)
                        (xy 0 -0.4)
                        (xy 0.6 0.2)
                        )
                        (width 0))
                    )
                    ${local_nets[1]})
                (pad 32 smd custom (at 1 1.8 ${180 + p.rot}) (size 0.1 0.1) (layers "B.Cu" "B.Mask")
                    (clearance 0.1) (zone_connect 0)
                    (options (clearance outline) (anchor rect))
                    (primitives
                    (gr_poly
                        (pts
                        (xy 0.6 0.4)
                        (xy -0.6 0.4)
                        (xy -0.6 0.2)
                        (xy 0 -0.4)
                        (xy 0.6 0.2)
                        )
                        (width 0))
                    )
                    ${local_nets[1]})
                (pad 1 smd custom (at -1 2.816 ${180 + p.rot}) (size 1.2 0.5) (layers "F.Cu" "F.Mask") ${p.BAT_P.str}
                    (clearance 0.1) (zone_connect 0)
                    (options (clearance outline) (anchor rect))
                    (primitives
                    (gr_poly
                        (pts
                        (xy 0.6 0)
                        (xy -0.6 0)
                        (xy -0.6 1)
                        (xy 0 0.4)
                        (xy 0.6 1)
                        )
                        (width 0))
                    ) )
                (pad 1 smd custom (at 1 2.816 ${180 + p.rot}) (size 1.2 0.5) (layers "B.Cu" "B.Mask") ${p.BAT_P.str}
                    (clearance 0.1) (zone_connect 0)
                    (options (clearance outline) (anchor rect))
                    (primitives
                    (gr_poly
                        (pts
                        (xy 0.6 0)
                        (xy -0.6 0)
                        (xy -0.6 1)
                        (xy 0 0.4)
                        (xy 0.6 1)
                        )
                        (width 0))
                    ) )
                (pad 2 smd custom (at -1 2.816 ${180 + p.rot}) (size 1.2 0.5) (layers "B.Cu" "B.Mask") ${p.BAT_N.str}
                    (clearance 0.1) (zone_connect 0)
                    (options (clearance outline) (anchor rect))
                    (primitives
                    (gr_poly
                        (pts
                        (xy 0.6 0)
                        (xy -0.6 0)
                        (xy -0.6 1)
                        (xy 0 0.4)
                        (xy 0.6 1)
                        )
                        (width 0))
                    ) )
                (pad 2 smd custom (at 1 2.816 ${180 + p.rot}) (size 1.2 0.5) (layers "F.Cu" "F.Mask") ${p.BAT_N.str}
                    (clearance 0.1) (zone_connect 0)
                    (options (clearance outline) (anchor rect))
                    (primitives
                    (gr_poly
                        (pts
                        (xy 0.6 0)
                        (xy -0.6 0)
                        (xy -0.6 1)
                        (xy 0 0.4)
                        (xy 0.6 1)
                        )
                        (width 0))
                    ) )
            `
        const standard_closing = `
            )
        `

        const reversible_traces = ` 
        (segment (start ${adjust_point(-1, 1.8)}) (end ${adjust_point(-1, 0)}) (width ${p.trace_width}) (layer "F.Cu") (net ${local_nets[0].index}))
        (segment (start ${adjust_point(-1, 1.8)}) (end ${adjust_point(-1, 0)}) (width ${p.trace_width}) (layer "B.Cu") (net ${local_nets[0].index}))
        (segment (start ${adjust_point(1, 1.8)}) (end ${adjust_point(1, 0)}) (width ${p.trace_width}) (layer "F.Cu") (net ${local_nets[1].index}))
        (segment (start ${adjust_point(1, 1.8)}) (end ${adjust_point(1, 0)}) (width ${p.trace_width}) (layer "B.Cu") (net ${local_nets[1].index}))
        `

        let final = standard_opening;

        if (p.side == "F" || p.reversible) {
            if (p.include_fabrication) {
                final += front_fabrication;
            }
            if (p.include_courtyard) {
                final += front_courtyard;
            }
            if (p.include_silkscreen) {
                final += front_silkscreen;
            }
        }
        if (p.side == "B" || p.reversible) {
            if (p.include_fabrication) {
                final += back_fabrication;
            }
            if (p.include_courtyard) {
                final += back_courtyard;
            }
            if (p.include_silkscreen) {
                final += back_silkscreen;
            }
        }
        if (p.reversible) {
            final += reversible_pads;
        } else if (p.side == "F") {
            final += front_pads;
        } else if (p.side == "B") {
            final += back_pads;
        }
        final += standard_closing;
        if (p.reversible && p.include_traces) {
            final += reversible_traces;
        }
        return final;
    }
}
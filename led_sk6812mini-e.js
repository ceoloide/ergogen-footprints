// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: MIT
//
// To view a copy of this license, visit https://opensource.org/license/mit/
//
// Author: @ceoloide
//
// Description:
//  Reversible footprint for "YS-SK6812mini-e" LEDs, to be used either as per-key lightning or
//  underglow. The footprint allows many customizations, including pre-defined traces to
//  simplify routing.
//
//  These LEDs are very tolerant of undervoltage, and are easy to solder thanks to the side
//  legs.
//
// Datasheet:
//  https://datasheet.lcsc.com/lcsc/2305101623_OPSCO-Optoelectronics-SK6812MINI-E_C5149201.pdf
//
// Nets:
//    P1: corresponds to VCC pin
//    P2: corresponds to Data-Out pin
//    P3: corresponds to GND pin
//    P4: corresponds to Data-In pin
//
// Params:
//    side: default is B for Back
//      the side on which to place the single-side footprint and designator, either F or B
//    reversible: default is false
//      if true, the footprint will be placed on both sides so that the PCB can be
//      reversible
//    reverse_mount: default is true (per-key LED)
//      if true, the pads will be oriented so that the LED shines through ther PCB, i.e.
//      when used for per-key LEDs. When set to false, the pads will match the datasheet
//      and assume the LED shines away from the PCB, i.e. when used as underglow. Note that
//      automated PCB assembly may not support both options depending on the component reel
//    include_traces_vias: default is true
//      if true it will include traces and vias to simplify routing when the footprint is
//      made reversible
//    signal_trace_width: default is 0.250mm
//      allows to override the trace width that connects the DIN / DOUT pads. Not recommended
//      to go below 0.15mm (JLCPC min is 0.127mm)
//    gnd_trace_width: default is 0.250mm
//      allows to override the GND trace width. Not recommended to go below 0.25mm (JLCPC
//      min is 0.127mm). Do not exceed 0.8mm to avoid clearance errors
//    vcc_trace_width: default is 0.250mm
//      allows to override the VCC trace width. Not recommended to go below 0.25mm (JLCPC
//      min is 0.127mm). Do not exceed 0.8mm to avoid clearance errors
//    via_size: default is 0.8
//      allows to define the size of the via. Not recommended below 0.56 (JLCPCB minimum),
//      or above 0.8 (KiCad default), to avoid overlap or DRC errors
//    via_drill: default is 0.4
//      allows to define the size of the drill. Not recommended below 0.3 (JLCPCB minimum),
//      or above 0.4 (KiCad default), to avoid overlap or DRC errors 
//    include_courtyard: default is true
//      if true it will include the part courtyard
//    include_keepout: default is false
//      if true it will include the part keepout area
//    led_3dmodel_filename: default is ''
//      Allows you to specify the path to a 3D model STEP or WRL file to be
//      used when rendering the PCB. Use the ${VAR_NAME} syntax to point to
//      a KiCad configured path.
//    led_3dmodel_xyz_offset: default is [0, 0, 0]
//      xyz offset (in mm), used to adjust the position of the 3d model
//      relative the footprint.
//    led_3dmodel_xyz_scale: default is [1, 1, 1]
//      xyz scale, used to adjust the size of the 3d model relative to its
//      original size.
//    led_3dmodel_xyz_rotation: default is [0, 0, 0]
//      xyz rotation (in degrees), used to adjust the orientation of the 3d
//      model relative the footprint.

module.exports = {
  params: {
    designator: 'LED',
    side: 'B',
    reversible: false,
    reverse_mount: true,
    include_traces_vias: true,
    choc_v2_stab_pth_as_via: false,
    signal_trace_width: 0.25,
    gnd_trace_width: 0.25,
    vcc_trace_width: 0.25,
    via_size: 0.8,
    via_drill: 0.4,
    include_courtyard: true,
    include_keepout: false,
    led_3dmodel_filename: '',
    led_3dmodel_xyz_offset: [0, 0, 0],
    led_3dmodel_xyz_rotation: [0, 0, 0],
    led_3dmodel_xyz_scale: [1, 1, 1],
    P1: { type: 'net', value: 'VCC' },
    P2: undefined,
    P3: { type: 'net', value: 'GND' },
    P4: undefined,
  },
  body: p => {
    const standard_opening = `
  (footprint "ceoloide:led_SK6812mini-e (${p.reverse_mount ? "per-key" : "underglow"}${p.reversible ? ", reversible" : "single-side"})" 
    (layer "${p.side}.Cu")
    ${p.at}
    (property "Reference" "${p.ref}"
      (at -4 -2.5 ${p.r})
      (layer "${p.side}.SilkS")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15))${p.reverse_mount ? ` (justify mirror)` : ``})
    )
    (property "Value" "SK6812mini-e"
      (at 0 0 ${p.r})
      (layer "${p.side}.SilkS")
      hide
      (effects (font (size 1 1) (thickness 0.15)))
    )
    (attr smd)

    (fp_line (start -1.6 -1.4) (end 1.6 -1.4) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
    (fp_line (start -1.6 1.4) (end 1.6 1.4) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
    (fp_line (start -1.6 -1.4) (end -1.6 1.4) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
    (fp_line (start 1.6 -1.4) (end 1.6 1.4) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
    (fp_line (start -1.6 -1.05) (end -2.94 -1.05) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
    (fp_line (start -2.94 -1.05) (end -2.94 -0.37) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
    (fp_line (start -2.94 -0.37) (end -1.6 -0.37) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
    (fp_line (start -1.6 0.35) (end -2.94 0.35) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
    (fp_line (start -2.94 1.03) (end -1.6 1.03) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
    (fp_line (start -2.94 0.35) (end -2.94 1.03) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
    (fp_line (start 1.6 1.03) (end 2.94 1.03) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
    (fp_line (start 2.94 0.35) (end 1.6 0.35) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
    (fp_line (start 2.94 1.03) (end 2.94 0.35) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
    (fp_line (start 1.6 -0.37) (end 2.94 -0.37) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
    (fp_line (start 2.94 -1.05) (end 1.6 -1.05) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
    (fp_line (start 2.94 -0.37) (end 2.94 -1.05) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
    `
    const marks_reversed = `
    (fp_line (start -0.8 -1.4) (end -0.8 1.4) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
    (fp_line (start 0.8 -1.4) (end 0.8 1.4) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
    (fp_line (start -1 -1.4) (end -1 1.4) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
    (fp_line (start 1 -1.4) (end 1 1.4) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
    `
    const marks_straight = `
    (fp_line (start -1.6 -0.7) (end -0.8 -1.4) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
    `
    const front_reversed = `
    (fp_line (start -3.8 1.6) (end -2.2 1.6) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -3.8 0) (end -3.8 1.6) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (pad "4" smd rect (at -2.7 -0.7 ${p.r}) (size 1.4 1) (layers "F.Cu" "F.Paste" "F.Mask") ${p.P4.str})
    (pad "3" smd rect (at -2.7 0.7 ${p.r}) (size 1.4 1) (layers "F.Cu" "F.Paste" "F.Mask") ${p.P3.str})
    (pad "1" smd rect (at 2.7 -0.7 ${p.r}) (size 1.4 1) (layers "F.Cu" "F.Paste" "F.Mask") ${p.P1.str})
    (pad "2" smd rect (at 2.7 0.7 ${p.r}) (size 1.4 1) (layers "F.Cu" "F.Paste" "F.Mask") ${p.P2.str})
    `
    const front = `
    (fp_line (start -3.8 -1.6) (end -2.2 -1.6) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -3.8 0) (end -3.8 -1.6) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (pad "4" smd rect (at -2.70 0.7 ${p.r}) (size 1.4 1) (layers "F.Cu" "F.Paste" "F.Mask") ${p.P4.str})
    (pad "3" smd rect (at -2.70 -0.7 ${p.r}) (size 1.4 1) (layers "F.Cu" "F.Paste" "F.Mask") ${p.P3.str})
    (pad "1" smd rect (at 2.70 0.7 ${p.r}) (size 1.4 1) (layers "F.Cu" "F.Paste" "F.Mask") ${p.P1.str})
    (pad "2" smd rect (at 2.70 -0.7 ${p.r}) (size 1.4 1) (layers "F.Cu" "F.Paste" "F.Mask") ${p.P2.str})
    `
    const back_reversed = `
    (fp_text user "%R" (at -4 2.5 ${p.r}) (layer F.SilkS) (effects (font (size 1 1) (thickness 0.15))))
    (fp_line (start -3.8 -1.6) (end -2.2 -1.6) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -3.8 0) (end -3.8 -1.6) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (pad "2" smd rect (at 2.70 -0.7 ${p.r}) (size 1.4 1) (layers "B.Cu" "B.Paste" "B.Mask") ${p.P2.str})
    (pad "1" smd rect (at 2.70 0.7 ${p.r}) (size 1.4 1) (layers "B.Cu" "B.Paste" "B.Mask") ${p.P1.str})
    (pad "3" smd rect (at -2.70 -0.7 ${p.r}) (size 1.4 1) (layers "B.Cu" "B.Paste" "B.Mask") ${p.P3.str})
    (pad "4" smd rect (at -2.70 0.7 ${p.r}) (size 1.4 1) (layers "B.Cu" "B.Paste" "B.Mask") ${p.P4.str})
    `
    const back = `
    (fp_text user "%R" (at -4 -2.5 ${p.r}) (layer B.SilkS) (effects (font (size 1 1) (thickness 0.15)) (justify mirror)))
    (fp_line (start -3.8 1.6) (end -2.2 1.6) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -3.8 0) (end -3.8 1.6) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (pad "2" smd rect (at 2.70 0.7 ${p.r}) (size 1.4 1) (layers "B.Cu" "B.Paste" "B.Mask") ${p.P2.str})
    (pad "1" smd rect (at 2.70 -0.7 ${p.r}) (size 1.4 1) (layers "B.Cu" "B.Paste" "B.Mask") ${p.P1.str})
    (pad "3" smd rect (at -2.70 0.7 ${p.r}) (size 1.4 1) (layers "B.Cu" "B.Paste" "B.Mask") ${p.P3.str})
    (pad "4" smd rect (at -2.70 -0.7 ${p.r}) (size 1.4 1) (layers "B.Cu" "B.Paste" "B.Mask") ${p.P4.str})
    `
    const standard_closing = `
    (fp_rect (start -1.8 -1.55) (end 1.8 1.55) (layer "Edge.Cuts") (stroke (width 0.12) (type solid)) (fill none))
  )
    `
    /* choc_v2_stab_pth_as_via */
    const traces_vias_reversed = `
  ${'' /* VCC Trace */}
  (segment (start ${p.eaxy(3.4, -0.7)}) (end ${p.eaxy(3.8, -0.1)}) (width ${p.vcc_trace_width}) (layer "F.Cu") (net ${p.P1.index}))
  (segment (start ${p.eaxy(3.8, -0.1)}) (end ${p.eaxy(3.8, 0.7)}) (width ${p.vcc_trace_width}) (layer "F.Cu") (net ${p.P1.index}))
  (segment (start ${p.eaxy(2.7, -0.7)}) (end ${p.eaxy(3.4, -0.7)}) (width ${p.vcc_trace_width}) (layer "F.Cu") (net ${p.P1.index}))
  (via (at ${p.eaxy(3.8, 0.7)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") (net ${p.P1.index}))
  (segment (start ${p.eaxy(2.7, 0.7)}) (end ${p.eaxy(3.8, 0.7)}) (width ${p.vcc_trace_width}) (layer "B.Cu") (net ${p.P1.index}))
  ${'' /* Data signal out trace */}
  (segment (start ${p.eaxy(4.95, -0.7)}) (end ${p.eaxy(2.7, -0.7)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${p.P2.index}))
  ${p.choc_v2_stab_pth_as_via ? '' : `(via (at ${p.eaxy(4.95, -0.7)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") (net ${p.P2.index}))`}
  (segment (start ${p.eaxy(2.7, 0.7)}) (end ${p.eaxy(3.481, 1.485)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${p.P2.index}))
  (segment (start ${p.eaxy(3.481, 1.485)}) (end ${p.eaxy(4.529, 1.485)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${p.P2.index}))
  (segment (start ${p.eaxy(4.95, 1.06)}) (end ${p.eaxy(4.95, -0.7)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${p.P2.index}))
  (segment (start ${p.eaxy(4.529, 1.485)}) (end ${p.eaxy(4.95, 1.06)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${p.P2.index}))
  ${'' /* GND Trace */}
  (segment (start ${p.eaxy(-3.4, -0.7)}) (end ${p.eaxy(-3.8, -0.1)}) (width ${p.gnd_trace_width}) (layer "B.Cu") (net ${p.P3.index}))
  (segment (start ${p.eaxy(-3.8, -0.1)}) (end ${p.eaxy(-3.8, 0.7)}) (width ${p.gnd_trace_width}) (layer "B.Cu") (net ${p.P3.index}))
  (segment (start ${p.eaxy(-2.7, -0.7)}) (end ${p.eaxy(-3.4, -0.7)}) (width ${p.gnd_trace_width}) (layer "B.Cu") (net ${p.P3.index}))
  (via (at ${p.eaxy(-3.8, 0.7)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") (net ${p.P3.index}))
  (segment (start ${p.eaxy(-2.7, 0.7)}) (end ${p.eaxy(-3.8, 0.7)}) (width ${p.gnd_trace_width}) (layer "F.Cu") (net ${p.P3.index}))
  ${'' /* Data signal in trace */}
  (segment (start ${p.eaxy(-4.95, -0.7)}) (end ${p.eaxy(-2.7, -0.7)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${p.P4.index}))
  ${p.choc_v2_stab_pth_as_via ? '' : `(via (at ${p.eaxy(-4.95, -0.7)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") (net ${p.P4.index}))`}
  (segment (start ${p.eaxy(-2.7, 0.7)}) (end ${p.eaxy(-3.481, 1.485)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${p.P4.index}))
  (segment (start ${p.eaxy(-3.481, 1.485)}) (end ${p.eaxy(-4.529, 1.485)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${p.P4.index}))
  (segment (start ${p.eaxy(-4.95, 1.06)}) (end ${p.eaxy(-4.95, -0.7)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${p.P4.index}))
  (segment (start ${p.eaxy(-4.529, 1.485)}) (end ${p.eaxy(-4.95, 1.06)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${p.P4.index}))
    `

    const traces_vias_straight = `
  ${'' /* VCC Trace */}
  (segment (start ${p.eaxy(3.4, -0.7)}) (end ${p.eaxy(4.06, -0.105916)}) (width ${p.vcc_trace_width}) (layer "B.Cu") (net ${p.P1.index}))
  (segment (start ${p.eaxy(4.06, -0.105916)}) (end ${p.eaxy(4.06, 0.7)}) (width ${p.vcc_trace_width}) (layer "B.Cu") (net ${p.P1.index}))
  (segment (start ${p.eaxy(2.7, -0.7)}) (end ${p.eaxy(3.4, -0.7)}) (width ${p.vcc_trace_width}) (layer "B.Cu") (net ${p.P1.index}))
  (via (at ${p.eaxy(4.06, 0.7)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") (net ${p.P1.index}))
  (segment (start ${p.eaxy(2.7, 0.7)}) (end ${p.eaxy(4.06, 0.7)}) (width ${p.vcc_trace_width}) (layer "F.Cu") (net ${p.P1.index}))
  ${'' /* Data signal out trace */}
  (segment (start ${p.eaxy(4.95, -0.7)}) (end ${p.eaxy(2.7, -0.7)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${p.P2.index}))
  (via (at ${p.eaxy(4.95, -0.7)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") (net ${p.P2.index}))
  (segment (start ${p.eaxy(2.7, 0.7)}) (end ${p.eaxy(3.481, 1.485)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${p.P2.index}))
  (segment (start ${p.eaxy(3.481, 1.485)}) (end ${p.eaxy(4.529, 1.485)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${p.P2.index}))
  (segment (start ${p.eaxy(4.95, 1.06)}) (end ${p.eaxy(4.95, -0.7)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${p.P2.index}))
  (segment (start ${p.eaxy(4.529, 1.485)}) (end ${p.eaxy(4.95, 1.06)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${p.P2.index}))
  ${'' /* GND Trace */}
  (segment (start ${p.eaxy(-3.4, -0.7)}) (end ${p.eaxy(-4.06, -0.105916)}) (width ${p.gnd_trace_width}) (layer "F.Cu") (net ${p.P3.index}))
  (segment (start ${p.eaxy(-4.06, -0.105916)}) (end ${p.eaxy(-4.06, 0.7)}) (width ${p.gnd_trace_width}) (layer "F.Cu") (net ${p.P3.index}))
  (segment (start ${p.eaxy(-2.7, -0.7)}) (end ${p.eaxy(-3.4, -0.7)}) (width ${p.gnd_trace_width}) (layer "F.Cu") (net ${p.P3.index}))
  (via (at ${p.eaxy(-4.06, 0.7)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") (net ${p.P3.index}))
  (segment (start ${p.eaxy(-2.7, 0.7)}) (end ${p.eaxy(-4.06, 0.7)}) (width ${p.gnd_trace_width}) (layer "B.Cu") (net ${p.P3.index}))
  ${'' /* Data signal in trace */}
  (segment (start ${p.eaxy(-4.95, -0.7)}) (end ${p.eaxy(-2.7, -0.7)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${p.P4.index}))
  (via (at ${p.eaxy(-4.95, -0.7)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") (net ${p.P4.index}))
  (segment (start ${p.eaxy(-2.7, 0.7)}) (end ${p.eaxy(-3.481, 1.485)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${p.P4.index}))
  (segment (start ${p.eaxy(-3.481, 1.485)}) (end ${p.eaxy(-4.529, 1.485)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${p.P4.index}))
  (segment (start ${p.eaxy(-4.95, 1.06)}) (end ${p.eaxy(-4.95, -0.7)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${p.P4.index}))
  (segment (start ${p.eaxy(-4.529, 1.485)}) (end ${p.eaxy(-4.95, 1.06)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${p.P4.index}))
    `

    const courtyard_front = `
    (fp_poly
      (pts
        (xy 1.6 -1.05)
        (xy 2.94 -1.05)
        (xy 2.94 -0.37)
        (xy 1.6 -0.37)
        (xy 1.6 0.35)
        (xy 2.94 0.35)
        (xy 2.94 1.03)
        (xy 1.6 1.03)
        (xy 1.6 1.4)
        (xy -1.6 1.4)
        (xy -1.6 1.03)
        (xy -2.94 1.03)
        (xy -2.94 0.35)
        (xy -1.6 0.35)
        (xy -1.6 -0.37)
        (xy -2.94 -0.37)
        (xy -2.94 -1.05)
        (xy -1.6 -1.05)
        (xy -1.6 -1.4)
        (xy 1.6 -1.4)
      )
			(stroke
				(width 0.1)
				(type solid)
			)
      (layer "B.CrtYd")
    )
    `

    const courtyard_back = `
    (fp_poly
      (pts
        (xy 1.6 -1.05)
        (xy 2.94 -1.05)
        (xy 2.94 -0.37)
        (xy 1.6 -0.37)
        (xy 1.6 0.35)
        (xy 2.94 0.35)
        (xy 2.94 1.03)
        (xy 1.6 1.03)
        (xy 1.6 1.4)
        (xy -1.6 1.4)
        (xy -1.6 1.03)
        (xy -2.94 1.03)
        (xy -2.94 0.35)
        (xy -1.6 0.35)
        (xy -1.6 -0.37)
        (xy -2.94 -0.37)
        (xy -2.94 -1.05)
        (xy -1.6 -1.05)
        (xy -1.6 -1.4)
        (xy 1.6 -1.4)
      )
			(stroke
				(width 0.1)
				(type solid)
			)
      (layer "B.CrtYd")
    )
    `

    const keepout = `
  (zone
    (net 0)
    (net_name "")
    (layers "F&B.Cu")
    (hatch edge 0.3)
    (connect_pads (clearance 0))
    (min_thickness 0.25)
		(filled_areas_thickness no)
		(keepout
			(tracks not_allowed)
			(vias not_allowed)
			(pads allowed)
			(copperpour not_allowed)
			(footprints allowed)
		)
		(fill
			(thermal_gap 0.5)
			(thermal_bridge_width 0.5)
		)
    (polygon
      (pts
        (xy ${p.eaxy(-2.00, -1.85)})
        (xy ${p.eaxy(2.00, -1.85)})
        (xy ${p.eaxy(2.00, 1.85)})
        (xy ${p.eaxy(-2.00, 1.85)})
      )
    )
  )
    `

    const led_3dmodel = `
    (model ${p.led_3dmodel_filename}
      (offset (xyz ${p.led_3dmodel_xyz_offset[0]} ${p.led_3dmodel_xyz_offset[1]} ${p.led_3dmodel_xyz_offset[2]}))
      (scale (xyz ${p.led_3dmodel_xyz_scale[0]} ${p.led_3dmodel_xyz_scale[1]} ${p.led_3dmodel_xyz_scale[2]}))
      (rotate (xyz ${p.led_3dmodel_xyz_rotation[0]} ${p.led_3dmodel_xyz_rotation[1]} ${p.led_3dmodel_xyz_rotation[2]}))
    )
      `

    let final = standard_opening;

    if (p.side == "F" || p.reversible) {
      if (p.reverse_mount) {
        final += marks_reversed;
        final += front_reversed;
      } else {
        final += marks_straight;
        final += front;
      }
      if (p.include_courtyard) {
        final += courtyard_front;
      }
    }
    if (p.side == "B" || p.reversible) {
      if (p.reverse_mount) {
        final += back_reversed;
        final += marks_reversed;
      } else {
        final += marks_straight;
        final += back;
      }
      if (p.include_courtyard) {
        final += courtyard_back;
      }
    }

    if (p.led_3dmodel_filename) {
      final += led_3dmodel
    }

    final += standard_closing;
    if (p.include_keepout) {
      final += keepout;
    }
    if (p.reversible && p.include_traces_vias) {
      if (p.reverse_mount) {
        final += traces_vias_reversed;
      } else {
        final += traces_vias_straight;
      }
    }

    return final;
  }
}

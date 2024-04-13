// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
//
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
//
// Author: @infused-kim + @ceoloide improvements
//
// Description:
//  Reversible footprint for nice!view display. Includes an outline of the
//  display to make positioning easier.
//
//  Note that because the center pin is VCC on both sides, there is no associated jumper pad
//  in the reversible footprint.
//
//  In its default configuration, jumper pads are positioned above the pins, when the
//  component is oriented verically and pointing upwards, or left of the pins, when oriented
//  horizontally and oriented leftward. Jumper pads position can be inverted with a parameter.
//
// Pinout and schematics:
//  https://nicekeyboards.com/docs/nice-view/pinout-schematic
//
// Params:
//    side: default is F for Front
//      the side on which to place the single-side footprint and designator, either F or B
//    reversible: default is false
//      if true, the footprint will be placed on both sides so that the PCB can be
//      reversible
//    include_traces: default is true
//      if true it will include traces that connect the jumper pads to the vias
//      and the through-holes for the MCU
//    gnd_trace_width: default is 0.250mm
//      allows to override the GND trace width. Not recommended to go below 0.25mm (JLCPC
//      min is 0.127mm).
//    signal_trace_width: default is 0.250mm
//      allows to override the trace width that connects the jumper pads to the MOSI, SCK,
//      and CS pins. Not recommended to go below 0.15mm (JLCPC min is 0.127mm).
//    invert_jumpers_position default is false
//      allows to change the position of the jumper pads, from their default to the opposite
//      side of the pins. See the description above for more details.
//    include_silkscreen: default is true
//      if true it will include the silkscreen layer.
//    include_labels default is true
//      if true and Silkscreen layer is included, it will include the pin labels. The labels
//      will match the *opposite* side of the board when the footprint is set to be reversible, 
//      since they are meant to match the solder jumpers behavior and aid testing.
//    include_courtyard: default is true
//      if true it will include a courtyard outline around the pin header.
//
// @ceoloide's improvements:
//  - Added support for traces
//  - Upgraded to KiCad 8 format
//  - Make silkscreen and courtyard optional

module.exports = {
  params: {
    designator: 'DISP',
    side: 'F',
    reversible: false,
    include_traces: true,
    gnd_trace_width: 0.25,
    signal_trace_width: 0.25,
    invert_jumpers_position: false,
    include_silkscreen: true,
    include_labels: true,
    include_courtyard: true,
    MOSI: { type: 'net', value: 'MOSI' },
    SCK: { type: 'net', value: 'SCK' },
    VCC: { type: 'net', value: 'VCC' },
    GND: { type: 'net', value: 'GND' },
    CS: { type: 'net', value: 'CS' },
  },
  body: p => {
    let dst_nets = [
      p.CS,
      p.GND,
      p.VCC,
      p.SCK,
      p.MOSI,
    ];

    let local_nets = [
      p.local_net("1"),
      p.local_net("2"),
      p.VCC,
      p.local_net("4"),
      p.local_net("5"),
    ];

    let socket_nets = dst_nets;

    if (p.reversible) {
      socket_nets = local_nets;
    } else if (p.side == 'B') {
      socket_nets = dst_nets.slice().reverse();
    }

    let jumpers_offset = 0;
    let labels_offset = 0;
    let label_vcc_offset = 0;

    let jumpers_front_top = dst_nets;
    let jumpers_front_bottom = local_nets;
    let jumpers_back_top = dst_nets;
    let jumpers_back_bottom = local_nets.slice().reverse();

    if (p.invert_jumpers_position) {
      jumpers_offset = 4.4;
      labels_offset = jumpers_offset + 2.80 + 0.1;
      label_vcc_offset = 4.35;

      jumpers_front_top = local_nets;
      jumpers_front_bottom = dst_nets;
      jumpers_back_top = local_nets.slice().reverse();
      jumpers_back_bottom = dst_nets;
    }

    const top = `
  (footprint "ceoloide:display_nice_view"
    (layer ${p.side}.Cu)
    ${p.at /* parametric position */}
    (property "Reference" "${p.ref}"
      (at 0 20 ${p.r})
      (layer "${p.side}.SilkS")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15)))
    )
    (attr exclude_from_pos_files exclude_from_bom)
    `
    const front_silkscreen = `
    (fp_line (start -6.41 15.37) (end -6.41 18.03) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 6.41 18.03) (end -6.41 18.03) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 6.41 15.37) (end 6.41 18.03) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 6.41 15.37) (end -6.41 15.37) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    `
    const front_courtyard = `
    (fp_line (start 6.88 14.9) (end 6.88 18.45) (layer "F.CrtYd") (stroke (width 0.15) (type solid)))
    (fp_line (start 6.88 18.45) (end -6.82 18.45) (layer "F.CrtYd") (stroke (width 0.15) (type solid)))
    (fp_line (start -6.82 18.45) (end -6.82 14.9) (layer "F.CrtYd") (stroke (width 0.15) (type solid)))
    (fp_line (start -6.82 14.9) (end 6.88 14.9) (layer "F.CrtYd") (stroke (width 0.15) (type solid)))
    `

    const front_jumpers = `
    (pad "14" smd rect (at -5.08 ${14.05 + jumpers_offset} ${90 + p.r}) (size 0.6 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${jumpers_front_top[0].str})
    (pad "15" smd rect (at -2.54 ${14.05 + jumpers_offset} ${90 + p.r}) (size 0.6 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${jumpers_front_top[1].str})
    (pad "16" smd rect (at 2.54 ${14.05 + jumpers_offset} ${90 + p.r}) (size 0.6 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${jumpers_front_top[3].str})
    (pad "17" smd rect (at 5.08 ${14.05 + jumpers_offset} ${90 + p.r}) (size 0.6 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${jumpers_front_top[4].str})

    (pad "10" smd rect (at -5.08 ${14.95 + jumpers_offset} ${90 + p.r}) (size 0.6 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${jumpers_front_bottom[0].str})
    (pad "11" smd rect (at -2.54 ${14.95 + jumpers_offset} ${90 + p.r}) (size 0.6 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${jumpers_front_bottom[1].str})
    (pad "12" smd rect (at 2.54 ${14.95 + jumpers_offset} ${90 + p.r}) (size 0.6 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${jumpers_front_bottom[3].str})
    (pad "13" smd rect (at 5.08 ${14.95 + jumpers_offset} ${90 + p.r}) (size 0.6 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${jumpers_front_bottom[4].str})
    `

    const back_silkscreen = `
    (fp_line (start 6.41 15.37) (end 6.41 18.03) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 6.41 15.37) (end -6.41 15.37) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 6.41 18.03) (end -6.41 18.03) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -6.41 15.37) (end -6.41 18.03) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    `

    const back_courtyard = `
    (fp_line (start 6.88 14.9) (end 6.88 18.45) (layer "B.CrtYd") (stroke (width 0.15) (type solid)))
    (fp_line (start 6.88 18.45) (end -6.82 18.45) (layer "B.CrtYd") (stroke (width 0.15) (type solid)))
    (fp_line (start -6.82 18.45) (end -6.82 14.9) (layer "B.CrtYd") (stroke (width 0.15) (type solid)))
    (fp_line (start -6.82 14.9) (end 6.88 14.9) (layer "B.CrtYd") (stroke (width 0.15) (type solid)))
    `

    const back_jumpers = `
    (pad "24" smd rect (at 5.08 ${14.05 + jumpers_offset} ${270 + p.r}) (size 0.6 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${jumpers_back_top[0].str})
    (pad "25" smd rect (at 2.54 ${14.05 + jumpers_offset} ${270 + p.r}) (size 0.6 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${jumpers_back_top[1].str})
    (pad "26" smd rect (at -2.54 ${14.05 + jumpers_offset} ${270 + p.r}) (size 0.6 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${jumpers_back_top[3].str})
    (pad "27" smd rect (at -5.08 ${14.05 + jumpers_offset} ${270 + p.r}) (size 0.6 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${jumpers_back_top[4].str})

    (pad "20" smd rect (at 5.08 ${14.95 + jumpers_offset} ${270 + p.r}) (size 0.6 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${jumpers_back_bottom[0].str})
    (pad "21" smd rect (at 2.54 ${14.95 + jumpers_offset} ${270 + p.r}) (size 0.6 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${jumpers_back_bottom[1].str})
    (pad "22" smd rect (at -2.54 ${14.95 + jumpers_offset} ${270 + p.r}) (size 0.6 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${jumpers_back_bottom[3].str})
    (pad "23" smd rect (at -5.08 ${14.95 + jumpers_offset} ${270 + p.r}) (size 0.6 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${jumpers_back_bottom[4].str})
    `

    const silkscreen_labels_front = `
    (fp_text user "DA" (at -5.08 ${13.1 + labels_offset} ${p.r}) (layer "F.SilkS")
      (effects (font (size 1 1) (thickness 0.15)))
    )
    (fp_text user "CS" (at 5.12 ${13.1 + labels_offset} ${p.r}) (layer "F.SilkS")
      (effects (font (size 1 1) (thickness 0.15)))
    )
    (fp_text user "GND" (at 2.62 ${13.1 + labels_offset} ${p.r}) (layer "F.SilkS")
      (effects (font (size 1 1) (thickness 0.15)))
    )
    (fp_text user "VCC" (at 0.15 ${14.6 + label_vcc_offset} ${p.r}) (layer "F.SilkS")
      (effects (font (size 1 1) (thickness 0.15)))
    )
    (fp_text user "CL" (at -2.48 ${13.1 + labels_offset} ${p.r}) (layer "F.SilkS")
      (effects (font (size 1 1) (thickness 0.15)))
    )
    `

    const silkscreen_labels_back = `
    (fp_text user "CS" (at -4.98 ${13.1 + labels_offset} ${p.r}) (layer "B.SilkS")
      (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
    )
    (fp_text user "VCC" (at 0.15 ${14.6 + label_vcc_offset} ${p.r}) (layer "B.SilkS")
      (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
    )
    (fp_text user "DA" (at 5.22 ${13.1 + labels_offset} ${p.r}) (layer "B.SilkS")
      (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
    )
    (fp_text user "CL" (at 2.72 ${13.1 + labels_offset} ${p.r}) (layer "B.SilkS")
      (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
    )
    (fp_text user "GND" (at -2.38 ${13.1 + labels_offset} ${p.r}) (layer "B.SilkS")
      (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
    )
    `

    const bottom = `
    (pad "1" thru_hole oval (at -5.08 16.7 ${270 + p.r}) (size 1.7 1.7) (drill 1) (layers "*.Cu" "*.Mask") ${socket_nets[0].str})
    (pad "2" thru_hole oval (at -2.54 16.7 ${270 + p.r}) (size 1.7 1.7) (drill 1) (layers "*.Cu" "*.Mask") ${socket_nets[1].str})
    (pad "3" thru_hole oval (at 0 16.7 ${270 + p.r}) (size 1.7 1.7) (drill 1) (layers "*.Cu" "*.Mask") ${socket_nets[2].str})
    (pad "4" thru_hole oval (at 2.54 16.7 ${270 + p.r}) (size 1.7 1.7) (drill 1) (layers "*.Cu" "*.Mask") ${socket_nets[3].str})
    (pad "5" thru_hole circle (at 5.08 16.7 ${270 + p.r}) (size 1.7 1.7) (drill 1) (layers "*.Cu" "*.Mask") ${socket_nets[4].str})

    (fp_line (start 5.4 13.4) (end 5.4 -11.9) (layer Dwgs.User) (stroke (width 0.15) (type solid)))
    (fp_line (start -5.4 13.4) (end -5.4 -11.9) (layer Dwgs.User) (stroke (width 0.15) (type solid)))
    (fp_line (start 5.4 -11.9) (end -5.4 -11.9) (layer Dwgs.User) (stroke (width 0.15) (type solid)))
    (fp_line (start -5.4 13.4) (end 5.4 13.4) (layer Dwgs.User) (stroke (width 0.15) (type solid)))

    (fp_line (start -7 -18) (end 7 -18) (layer Dwgs.User) (stroke (width 0.15) (type solid)))
    (fp_line (start 7 18) (end -7 18) (layer Dwgs.User) (stroke (width 0.15) (type solid)))
    (fp_line (start -7 18) (end -7 -18) (layer Dwgs.User) (stroke (width 0.15) (type solid)))
    (fp_line (start 7 18) (end 7 -18) (layer Dwgs.User) (stroke (width 0.15) (type solid)))
  )
    `

    const traces_bottom = `
  (segment (start ${p.eaxy(-5.08, 16.7)}) (end ${p.eaxy(-5.08, 18.45)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${jumpers_front_bottom[0].index}))
  (segment (start ${p.eaxy(-2.54, 16.7)}) (end ${p.eaxy(-2.54, 18.45)}) (width ${p.gnd_trace_width}) (layer "F.Cu") (net ${jumpers_front_bottom[1].index}))
  (segment (start ${p.eaxy(2.54, 16.7)}) (end ${p.eaxy(2.54, 18.45)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${jumpers_front_bottom[3].index}))
  (segment (start ${p.eaxy(5.08, 16.7)}) (end ${p.eaxy(5.08, 18.45)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${jumpers_front_bottom[4].index}))
  (segment (start ${p.eaxy(-5.08, 16.7)}) (end ${p.eaxy(-5.08, 18.45)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${jumpers_back_bottom[0].index}))
  (segment (start ${p.eaxy(-2.54, 16.7)}) (end ${p.eaxy(-2.54, 18.45)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${jumpers_back_bottom[1].index}))
  (segment (start ${p.eaxy(2.54, 16.7)}) (end ${p.eaxy(2.54, 18.45)}) (width ${p.gnd_trace_width}) (layer "B.Cu") (net ${jumpers_back_bottom[3].index}))
  (segment (start ${p.eaxy(5.08, 16.7)}) (end ${p.eaxy(5.08, 18.45)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${jumpers_back_bottom[4].index}))
    `

    const traces_top = `
  (segment (start ${p.eaxy(-5.08, 16.7)}) (end ${p.eaxy(-5.08, 14.95)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${jumpers_front_top[0].index}))
  (segment (start ${p.eaxy(-2.54, 16.7)}) (end ${p.eaxy(-2.54, 14.95)}) (width ${p.gnd_trace_width}) (layer "F.Cu") (net ${jumpers_front_top[1].index}))
  (segment (start ${p.eaxy(2.54, 16.7)}) (end ${p.eaxy(2.54, 14.95)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${jumpers_front_top[3].index}))
  (segment (start ${p.eaxy(5.08, 16.7)}) (end ${p.eaxy(5.08, 14.95)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${jumpers_front_top[4].index}))
  (segment (start ${p.eaxy(-5.08, 16.7)}) (end ${p.eaxy(-5.08, 14.95)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${jumpers_back_top[0].index}))
  (segment (start ${p.eaxy(-2.54, 16.7)}) (end ${p.eaxy(-2.54, 14.95)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${jumpers_back_top[1].index}))
  (segment (start ${p.eaxy(2.54, 16.7)}) (end ${p.eaxy(2.54, 14.95)}) (width ${p.gnd_trace_width}) (layer "B.Cu") (net ${jumpers_back_top[3].index}))
  (segment (start ${p.eaxy(5.08, 16.7)}) (end ${p.eaxy(5.08, 14.95)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${jumpers_back_top[4].index}))
    `

    let final = top;

    if (p.side == "F" || p.reversible) {
      if (p.include_silkscreen) {
        final += front_silkscreen;
        if (p.include_labels) final += silkscreen_labels_front;
      }
      if (p.include_courtyard) final += front_courtyard;
    }
    if (p.side == "B" || p.reversible) {
      if (p.include_silkscreen) {
        final += back_silkscreen;
        if (p.include_labels) final += silkscreen_labels_back;
      }
      if (p.include_courtyard) final += back_courtyard;
    }
    if (p.reversible) {
      final += front_jumpers;
      final += back_jumpers;
    }
    final += bottom;
    if (p.include_traces && p.reversible) {
      if (p.invert_jumpers_position) {
        final += traces_bottom;
      } else {
        final += traces_top;
      }
    }
    return final;
  }
}
// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
//
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
//
// Author: @ceoloide
//
// Description:
//  Reversible footprint for SSD1306 OLED display. Includes an outline of the
//  display to make positioning easier.
//
//  In its default configuration, jumper pads are positioned above the pins, when the
//  component is oriented verically and pointing upwards, or left of the pins, when oriented
//  horizontally and oriented leftward. Jumper pads position can be inverted with a parameter.
//
//  In its default configuration, labels are positioned below the pins, when the
//  component is oriented verically and pointing upwards, or right of the pins, when oriented
//  horizontally and oriented leftward. Labels position can be inverted with a parameter.
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
//      allows to override the trace width that connects the jumper pads to the SDA, and SCL.
//      Not recommended to go below 0.15mm (JLCPC min is 0.127mm).
//    invert_jumpers_position default is false
//      allows to change the position of the jumper pads, from their default to the opposite
//      side of the pins. See the description above for more details.
//    invert_labels_position default is false
//      allows to change the position of the labels, from their default to the north
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
// # Placement and soldering of jumpers
//
// The reversible footprint is meant to be used with jumpers on the
// OPPOSITE side of where the display is installed. The silkscreen
// labels will also match the board when read on the opposite side.
// This is to have all jumpers and components to solder on the same
// side, and be able to read the correct labels of the display to do
// tests with a multimeter.

module.exports = {
  params: {
    designator: 'DISP',
    side: 'F',
    reversible: false,
    include_traces: true,
    gnd_trace_width: 0.25,
    signal_trace_width: 0.25,
    invert_jumpers_position: false,
    invert_labels_position: false,
    include_silkscreen: true,
    include_labels: true,
    include_courtyard: true,
    SDA: { type: 'net', value: 'SDA' },
    SCL: { type: 'net', value: 'SCL' },
    VCC: { type: 'net', value: 'VCC' },
    GND: { type: 'net', value: 'GND' },
  },
  body: p => {
    let dst_nets = [
      p.SDA,
      p.SCL,
      p.VCC,
      p.GND,
    ];

    let local_nets = [
      p.local_net("1"),
      p.local_net("2"),
      p.local_net("3"),
      p.local_net("4"),
    ];

    if (p.reversible || p.side == "B") {
      dst_nets = dst_nets.slice().reverse();
    }
    let socket_nets = p.reversible ? local_nets : dst_nets;

    let jumpers_offset = 0;
    let labels_offset = 3.75;

    let jumpers_front_top = dst_nets;
    let jumpers_front_bottom = local_nets;
    let jumpers_back_top = dst_nets;
    let jumpers_back_bottom = local_nets.slice().reverse();

    if (p.invert_labels_position) {
      if(p.reversible && !p.invert_jumpers_position) {
          labels_offset = -1.62;
      } else {
        labels_offset = 0;
      }
    } else {
      if(p.reversible && p.invert_jumpers_position) {
        labels_offset = 1.62 + 3.75;
      }
    }
    if (p.invert_jumpers_position) {
      jumpers_offset = 4.4;

      jumpers_front_top = local_nets;
      jumpers_front_bottom = dst_nets;
      jumpers_back_top = local_nets.slice().reverse();
      jumpers_back_bottom = dst_nets;
    }

    const top = `
  (footprint "ceoloide:display_ssd1306"
    (layer "${p.side}.Cu")
    ${p.at}
    (property "Reference" "${p.ref}"
      (at 0 20 ${p.r})
      (layer "${p.side}.SilkS")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15)))
    )
		(attr exclude_from_pos_files exclude_from_bom)
    `
    
    const front_silkscreen = `
    (fp_line (start 5.14 15.37) (end 5.14 18.03) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 5.14 15.37) (end -5.14 15.37) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 5.14 18.03) (end -5.14 18.03) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -5.14 15.37) (end -5.14 18.03) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    `
    
    const front_courtyard = `
    (fp_line (start 5.61 14.9) (end 5.61 18.45) (layer "F.CrtYd") (stroke (width 0.15) (type solid)))
    (fp_line (start 5.61 18.45) (end -5.61 18.45) (layer "F.CrtYd") (stroke (width 0.15) (type solid)))
    (fp_line (start -5.61 18.45) (end -5.61 14.9) (layer "F.CrtYd") (stroke (width 0.15) (type solid)))
    (fp_line (start -5.61 14.9) (end 5.61 14.9) (layer "F.CrtYd") (stroke (width 0.15) (type solid)))
    `
    
    const front_fab = `
    (fp_line (start -3.77 -11.14) (end -3.77 11.24) (layer "F.Fab") (stroke (width 0.15) (type solid)))
    (fp_line (start 1.75 -11.14) (end 1.75 11.24) (layer "F.Fab") (stroke (width 0.15) (type solid)))
    (fp_line (start -3.77 -11.14) (end 1.75 -11.14) (layer "F.Fab") (stroke (width 0.15) (type solid)))
    (fp_line (start -3.77 11.24) (end 1.75 11.24) (layer "F.Fab") (stroke (width 0.15) (type solid)))
    `

    const front_jumpers = `
    (pad "14" smd rect (at -3.81 ${14.05 + jumpers_offset} ${90 + p.r}) (size 0.6 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${jumpers_front_top[0].str})
    (pad "15" smd rect (at -1.27 ${14.05 + jumpers_offset} ${90 + p.r}) (size 0.6 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${jumpers_front_top[1].str})
    (pad "16" smd rect (at 1.27 ${14.05 + jumpers_offset} ${90 + p.r}) (size 0.6 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${jumpers_front_top[2].str})
    (pad "17" smd rect (at 3.81 ${14.05 + jumpers_offset} ${90 + p.r}) (size 0.6 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${jumpers_front_top[3].str})

    (pad "10" smd rect (at -3.81 ${14.95 + jumpers_offset} ${90 + p.r}) (size 0.6 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${jumpers_front_bottom[0].str})
    (pad "11" smd rect (at -1.27 ${14.95 + jumpers_offset} ${90 + p.r}) (size 0.6 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${jumpers_front_bottom[1].str})
    (pad "12" smd rect (at 1.27 ${14.95 + jumpers_offset} ${90 + p.r}) (size 0.6 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${jumpers_front_bottom[2].str})
    (pad "13" smd rect (at 3.81 ${14.95 + jumpers_offset} ${90 + p.r}) (size 0.6 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${jumpers_front_bottom[3].str})
    `

    const back_silkscreen = `
    (fp_line (start 5.14 15.37) (end 5.14 18.03) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 5.14 15.37) (end -5.14 15.37) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 5.14 18.03) (end -5.14 18.03) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -5.14 15.37) (end -5.14 18.03) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    `

    const back_courtyard = `
    (fp_line (start 5.61 14.9) (end 5.61 18.45) (layer "B.CrtYd") (stroke (width 0.15) (type solid)))
    (fp_line (start 5.61 18.45) (end -5.61 18.45) (layer "B.CrtYd") (stroke (width 0.15) (type solid)))
    (fp_line (start -5.61 18.45) (end -5.61 14.9) (layer "B.CrtYd") (stroke (width 0.15) (type solid)))
    (fp_line (start -5.61 14.9) (end 5.61 14.9) (layer "B.CrtYd") (stroke (width 0.15) (type solid)))
    `
    
    const back_fab = `
    (fp_line (start 3.77 -11.14) (end 3.77 11.24) (layer "B.Fab") (stroke (width 0.15) (type solid)))
    (fp_line (start -1.75 -11.14) (end -1.75 11.24) (layer "B.Fab") (stroke (width 0.15) (type solid)))
    (fp_line (start 3.77 -11.14) (end -1.75 -11.14) (layer "B.Fab") (stroke (width 0.15) (type solid)))
    (fp_line (start 3.77 11.24) (end -1.75 11.24) (layer "B.Fab") (stroke (width 0.15) (type solid)))
    `

    const back_jumpers = `
    (pad "24" smd rect (at 3.81 ${14.05 + jumpers_offset} ${270 + p.r}) (size 0.6 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${jumpers_back_top[0].str})
    (pad "25" smd rect (at 1.27 ${14.05 + jumpers_offset} ${270 + p.r}) (size 0.6 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${jumpers_back_top[1].str})
    (pad "26" smd rect (at -1.27 ${14.05 + jumpers_offset} ${270 + p.r}) (size 0.6 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${jumpers_back_top[2].str})
    (pad "27" smd rect (at -3.81 ${14.05 + jumpers_offset} ${270 + p.r}) (size 0.6 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${jumpers_back_top[3].str})

    (pad "20" smd rect (at 3.81 ${14.95 + jumpers_offset} ${270 + p.r}) (size 0.6 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${jumpers_back_bottom[0].str})
    (pad "21" smd rect (at 1.27 ${14.95 + jumpers_offset} ${270 + p.r}) (size 0.6 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${jumpers_back_bottom[1].str})
    (pad "22" smd rect (at -1.27 ${14.95 + jumpers_offset} ${270 + p.r}) (size 0.6 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${jumpers_back_bottom[2].str})
    (pad "23" smd rect (at -3.81 ${14.95 + jumpers_offset} ${270 + p.r}) (size 0.6 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${jumpers_back_bottom[3].str})
    `

    const silkscreen_labels_front = `
    (fp_text user "${dst_nets[0].name}" (at -3.81 ${14.75 + labels_offset} ${90 + p.r}) (unlocked yes) (layer "F.SilkS")
      (effects (font (size 1 1) (thickness 0.15)) (justify ${!p.invert_labels_position  ? "right" : "left"}))
    )
    (fp_text user "${dst_nets[1].name}" (at -1.27 ${14.75 + labels_offset} ${90 + p.r}) (unlocked yes) (layer "F.SilkS")
      (effects (font (size 1 1) (thickness 0.15)) (justify ${!p.invert_labels_position ? "right" : "left"}))
    )
    (fp_text user "${dst_nets[2].name}" (at 1.27 ${14.75 + labels_offset} ${90 + p.r}) (unlocked yes) (layer "F.SilkS")
      (effects (font (size 1 1) (thickness 0.15)) (justify ${!p.invert_labels_position ? "right" : "left"}))
    )
    (fp_text user "${dst_nets[3].name}" (at 3.81 ${14.75 + labels_offset} ${90 + p.r}) (unlocked yes) (layer "F.SilkS")
      (effects (font (size 1 1) (thickness 0.15)) (justify ${!p.invert_labels_position ? "right" : "left"}))
    )
    `
    const silkscreen_labels_back = `
    (fp_text user "${p.reversible ? dst_nets[0].name : dst_nets[3].name}" (at 3.81 ${14.75 + labels_offset} ${90 + p.r}) (layer "B.SilkS")
      (effects (font (size 1 1) (thickness 0.15)) (justify ${!p.invert_labels_position ? "left" : "right"} mirror))
    )
    (fp_text user "${p.reversible ? dst_nets[1].name : dst_nets[2].name}" (at 1.27 ${14.75 + labels_offset} ${90 + p.r}) (layer "B.SilkS")
      (effects (font (size 1 1) (thickness 0.15)) (justify ${!p.invert_labels_position ? "left" : "right"} mirror))
    )
    (fp_text user "${p.reversible ? dst_nets[2].name : dst_nets[1].name}" (at -1.27 ${14.75 + labels_offset} ${90 + p.r}) (layer "B.SilkS")
      (effects (font (size 1 1) (thickness 0.15)) (justify ${!p.invert_labels_position ? "left" : "right"} mirror))
    )
    (fp_text user "${p.reversible ? dst_nets[3].name : dst_nets[0].name}" (at -3.81 ${14.75 + labels_offset} ${90 + p.r}) (layer "B.SilkS")
      (effects (font (size 1 1) (thickness 0.15)) (justify ${!p.invert_labels_position ? "left" : "right"} mirror))
    )
    `

    const bottom = `
    (pad "1" thru_hole oval (at -3.81 16.7 ${270 + p.r}) (size 1.7 1.7) (drill 1) (layers "*.Cu" "*.Mask") ${socket_nets[0].str})
    (pad "2" thru_hole oval (at -1.27 16.7 ${270 + p.r}) (size 1.7 1.7) (drill 1) (layers "*.Cu" "*.Mask") ${socket_nets[1].str})
    (pad "3" thru_hole oval (at 1.27 16.7 ${270 + p.r}) (size 1.7 1.7) (drill 1) (layers "*.Cu" "*.Mask") ${socket_nets[2].str})
    (pad "4" thru_hole oval (at 3.81 16.7 ${270 + p.r}) (size 1.7 1.7) (drill 1) (layers "*.Cu" "*.Mask") ${socket_nets[3].str})

    (fp_line (start -6.00 -19.70) (end -6.00 18.30) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start 6.00 -19.70) (end 6.00 18.30) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start -6.00 -19.70) (end 6.00 -19.70) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start -6.00 -17.45) (end 6.00 -17.45) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start -6.00 18.30) (end 6.00 18.30) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start -6.00 12.55) (end 6.00 12.55) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
  )
    `

    const traces_bottom = `
  (segment (start ${p.eaxy(-3.81, 16.7)}) (end ${p.eaxy(-3.81, 18.45)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${socket_nets[0].index}))
  (segment (start ${p.eaxy(-1.27, 16.7)}) (end ${p.eaxy(-1.27, 18.45)}) (width ${p.gnd_trace_width}) (layer "F.Cu") (net ${socket_nets[1].index}))
  (segment (start ${p.eaxy(1.27, 16.7)}) (end ${p.eaxy(1.27, 18.45)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${socket_nets[2].index}))
  (segment (start ${p.eaxy(3.81, 16.7)}) (end ${p.eaxy(3.81, 18.45)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${socket_nets[3].index}))
  (segment (start ${p.eaxy(-3.81, 16.7)}) (end ${p.eaxy(-3.81, 18.45)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${socket_nets[0].index}))
  (segment (start ${p.eaxy(-1.27, 16.7)}) (end ${p.eaxy(-1.27, 18.45)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${socket_nets[1].index}))
  (segment (start ${p.eaxy(1.27, 16.7)}) (end ${p.eaxy(1.27, 18.45)}) (width ${p.gnd_trace_width}) (layer "B.Cu") (net ${socket_nets[2].index}))
  (segment (start ${p.eaxy(3.81, 16.7)}) (end ${p.eaxy(3.81, 18.45)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${socket_nets[3].index}))
    `

    const traces_top = `
  (segment (start ${p.eaxy(-3.81, 16.7)}) (end ${p.eaxy(-3.81, 14.95)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${socket_nets[0].index}))
  (segment (start ${p.eaxy(-1.27, 16.7)}) (end ${p.eaxy(-1.27, 14.95)}) (width ${p.gnd_trace_width}) (layer "F.Cu") (net ${socket_nets[1].index}))
  (segment (start ${p.eaxy(1.27, 16.7)}) (end ${p.eaxy(1.27, 14.95)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${socket_nets[2].index}))
  (segment (start ${p.eaxy(3.81, 16.7)}) (end ${p.eaxy(3.81, 14.95)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${socket_nets[3].index}))
  (segment (start ${p.eaxy(-3.81, 16.7)}) (end ${p.eaxy(-3.81, 14.95)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${socket_nets[0].index}))
  (segment (start ${p.eaxy(-1.27, 16.7)}) (end ${p.eaxy(-1.27, 14.95)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${socket_nets[1].index}))
  (segment (start ${p.eaxy(1.27, 16.7)}) (end ${p.eaxy(1.27, 14.95)}) (width ${p.gnd_trace_width}) (layer "B.Cu") (net ${socket_nets[2].index}))
  (segment (start ${p.eaxy(3.81, 16.7)}) (end ${p.eaxy(3.81, 14.95)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${socket_nets[3].index}))
    `

    let final = top;

    if (p.side == "F" || p.reversible) {
      final += front_fab;
      if (p.include_silkscreen) {
        final += front_silkscreen;
        if (p.include_labels) final += silkscreen_labels_front;
      }
      if (p.include_courtyard) final += front_courtyard;
    }
    if (p.side == "B" || p.reversible) {
      final += back_fab;
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
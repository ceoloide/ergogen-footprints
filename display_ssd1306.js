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
//    include_labels default is true
//      if true it will include the pin labels on the Silkscreen layer. The labels will match
//      the *opposite* side of the board when the footprint is set to be reversible, since
//      they are meant to match the solder jumpers behavior and aid testing.

module.exports = {
  params: {
    designator: 'DISP',
    side: 'F',
    reversible: false,
    include_traces: true,
    gnd_trace_width: 0.25,
    signal_trace_width: 0.25,
    invert_jumpers_position: false,
    include_labels: true,
    SDA: { type: 'net', value: 'SDA' },
    SCL: { type: 'net', value: 'SCL' },
    VCC: { type: 'net', value: 'VCC' },
    GND: { type: 'net', value: 'GND' },
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

    let dst_nets = [
      p.GND,
      p.VCC,
      p.SCL,
      p.SDA,
    ];

    local_nets = [
      p.local_net("1"),
      p.local_net("2"),
      p.local_net("3"),
      p.local_net("4"),
    ];

    let socket_nets = dst_nets;

    if (p.reversible) {
      socket_nets = local_nets;
    } else if (p.side == 'B') {
      socket_nets = dst_nets.slice().reverse();
    }

    let jumpers_offset = 0;
    let jumpers_rot = 0;
    let labels_offset = 0;

    let jumpers_front_top = dst_nets;
    let jumpers_front_bottom = local_nets;
    let jumpers_back_top = dst_nets;
    let jumpers_back_bottom = local_nets.slice().reverse();

    if (p.invert_jumpers_position) {
      jumpers_offset = 4.4;
      jumpers_rot = 180;
      labels_offset = jumpers_offset + 2.80 +  0.1;

      jumpers_front_top = local_nets;
      jumpers_front_bottom = dst_nets;
      jumpers_back_top = local_nets.slice().reverse();
      jumpers_back_bottom = dst_nets;
    }

    const top = `
      (module "ceoloide:display_ssd1306" (layer ${p.side}.Cu) (tedit 6448AF5B)
        ${p.at /* parametric position */}
        (attr virtual)
        (fp_text reference "${p.ref}" (at 0 20 ${p.rot}) (layer ${p.side}.SilkS) ${p.ref_hide}
          (effects (font (size 1 1) (thickness 0.15)))
        )
        (fp_text user %R (at 0 20 ${p.rot}) (layer ${p.side}.Fab)
          (effects (font (size 1 1) (thickness 0.15)))
        )
        `
    const front = `
        (fp_line (start 5.14 15.37) (end 5.14 18.03) (layer F.SilkS) (width 0.12))
        (fp_line (start 5.14 15.37) (end -5.14 15.37) (layer F.SilkS) (width 0.12))
        (fp_line (start 5.14 18.03) (end -5.14 18.03) (layer F.SilkS) (width 0.12))
        (fp_line (start -5.14 15.37) (end -5.14 18.03) (layer F.SilkS) (width 0.12))

        (fp_line (start 5.61 14.9) (end 5.61 18.45) (layer F.CrtYd) (width 0.15))
        (fp_line (start 5.61 18.45) (end -5.61 18.45) (layer F.CrtYd) (width 0.15))
        (fp_line (start -5.61 18.45) (end -5.61 14.9) (layer F.CrtYd) (width 0.15))
        (fp_line (start -5.61 14.9) (end 5.61 14.9) (layer F.CrtYd) (width 0.15))

        (fp_line (start -3.77 -11.14) (end -3.77 11.24) (layer F.Fab) (width 0.15))
        (fp_line (start 1.75 -11.14) (end 1.75 11.24) (layer F.Fab) (width 0.15))
        (fp_line (start -3.77 -11.14) (end 1.75 -11.14) (layer F.Fab) (width 0.15))
        (fp_line (start -3.77 11.24) (end 1.75 11.24) (layer F.Fab) (width 0.15))
    `

    const front_jumpers = `
        (pad 14 smd rect (at -3.81 ${14.05 + jumpers_offset} ${90 + p.rot}) (size 0.6 1.2) (layers F.Cu F.Mask) ${jumpers_front_top[0].str})
        (pad 15 smd rect (at -1.27 ${14.05 + jumpers_offset} ${90 + p.rot}) (size 0.6 1.2) (layers F.Cu F.Mask) ${jumpers_front_top[1].str})
        (pad 16 smd rect (at 1.27 ${14.05 + jumpers_offset} ${90 + p.rot}) (size 0.6 1.2) (layers F.Cu F.Mask) ${jumpers_front_top[2].str})
        (pad 17 smd rect (at 3.81 ${14.05 + jumpers_offset} ${90 + p.rot}) (size 0.6 1.2) (layers F.Cu F.Mask) ${jumpers_front_top[3].str})

        (pad 10 smd rect (at -3.81 ${14.95 + jumpers_offset} ${90 + p.rot}) (size 0.6 1.2) (layers F.Cu F.Mask) ${jumpers_front_bottom[0].str})
        (pad 11 smd rect (at -1.27 ${14.95 + jumpers_offset} ${90 + p.rot}) (size 0.6 1.2) (layers F.Cu F.Mask) ${jumpers_front_bottom[1].str})
        (pad 12 smd rect (at 1.27 ${14.95 + jumpers_offset} ${90 + p.rot}) (size 0.6 1.2) (layers F.Cu F.Mask) ${jumpers_front_bottom[2].str})
        (pad 13 smd rect (at 3.81 ${14.95 + jumpers_offset} ${90 + p.rot}) (size 0.6 1.2) (layers F.Cu F.Mask) ${jumpers_front_bottom[3].str})
    `

    const back = `
        (fp_line (start 5.14 15.37) (end 5.14 18.03) (layer B.SilkS) (width 0.12))
        (fp_line (start 5.14 15.37) (end -5.14 15.37) (layer B.SilkS) (width 0.12))
        (fp_line (start 5.14 18.03) (end -5.14 18.03) (layer B.SilkS) (width 0.12))
        (fp_line (start -5.14 15.37) (end -5.14 18.03) (layer B.SilkS) (width 0.12))

        (fp_line (start 5.61 14.9) (end 5.61 18.45) (layer B.CrtYd) (width 0.15))
        (fp_line (start 5.61 18.45) (end -5.61 18.45) (layer B.CrtYd) (width 0.15))
        (fp_line (start -5.61 18.45) (end -5.61 14.9) (layer B.CrtYd) (width 0.15))
        (fp_line (start -5.61 14.9) (end 5.61 14.9) (layer B.CrtYd) (width 0.15))

        (fp_line (start 3.77 -11.14) (end 3.77 11.24) (layer B.Fab) (width 0.15))
        (fp_line (start -1.75 -11.14) (end -1.75 11.24) (layer B.Fab) (width 0.15))
        (fp_line (start 3.77 -11.14) (end -1.75 -11.14) (layer B.Fab) (width 0.15))
        (fp_line (start 3.77 11.24) (end -1.75 11.24) (layer B.Fab) (width 0.15))
    `

    const back_jumpers = `
        (pad 24 smd rect (at 3.81 ${14.05 + jumpers_offset} ${270 + p.rot}) (size 0.6 1.2) (layers B.Cu B.Mask) ${jumpers_back_top[0].str})
        (pad 25 smd rect (at 1.27 ${14.05 + jumpers_offset} ${270 + p.rot}) (size 0.6 1.2) (layers B.Cu B.Mask) ${jumpers_back_top[1].str})
        (pad 26 smd rect (at -1.27 ${14.05 + jumpers_offset} ${270 + p.rot}) (size 0.6 1.2) (layers B.Cu B.Mask) ${jumpers_back_top[2].str})
        (pad 27 smd rect (at -3.81 ${14.05 + jumpers_offset} ${270 + p.rot}) (size 0.6 1.2) (layers B.Cu B.Mask) ${jumpers_back_top[3].str})

        (pad 20 smd rect (at 3.81 ${14.95 + jumpers_offset} ${270 + p.rot}) (size 0.6 1.2) (layers B.Cu B.Mask) ${jumpers_back_bottom[0].str})
        (pad 21 smd rect (at 1.27 ${14.95 + jumpers_offset} ${270 + p.rot}) (size 0.6 1.2) (layers B.Cu B.Mask) ${jumpers_back_bottom[1].str})
        (pad 22 smd rect (at -1.27 ${14.95 + jumpers_offset} ${270 + p.rot}) (size 0.6 1.2) (layers B.Cu B.Mask) ${jumpers_back_bottom[2].str})
        (pad 23 smd rect (at -3.81 ${14.95 + jumpers_offset} ${270 + p.rot}) (size 0.6 1.2) (layers B.Cu B.Mask) ${jumpers_back_bottom[3].str})
    `

    const labels = `
        (fp_text user SDA (at -4.50 ${13.0 + labels_offset} ${p.rot}) (layer F.SilkS)
          (effects (font (size 1 1) (thickness 0.15)))
        )
        (fp_text user SCL (at -1.50 ${13.0 + labels_offset} ${p.rot}) (layer F.SilkS)
          (effects (font (size 1 1) (thickness 0.15)))
        )
        (fp_text user VCC (at 1.50 ${13.0 + labels_offset} ${p.rot}) (layer F.SilkS)
          (effects (font (size 1 1) (thickness 0.15)))
        )
        (fp_text user GND (at 4.50 ${13.0 + labels_offset} ${p.rot}) (layer F.SilkS)
          (effects (font (size 1 1) (thickness 0.15)))
        )
        (fp_text user GND (at -4.50 ${13.0 + labels_offset} ${p.rot}) (layer B.SilkS)
          (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
        )
        (fp_text user VCC (at -1.50 ${13.0 + labels_offset} ${p.rot}) (layer B.SilkS)
          (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
        )
        (fp_text user SCL (at 1.50 ${13.0 + labels_offset} ${p.rot}) (layer B.SilkS)
          (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
        )
        (fp_text user SDA (at 4.50 ${13.0 + labels_offset} ${p.rot}) (layer B.SilkS)
          (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
        )
    `

    const bottom = `
      (pad 1 thru_hole oval (at -3.81 16.7 ${270 + p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${socket_nets[0].str})
      (pad 2 thru_hole oval (at -1.27 16.7 ${270 + p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${socket_nets[1].str})
      (pad 3 thru_hole oval (at 1.27 16.7 ${270 + p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${socket_nets[2].str})
      (pad 4 thru_hole oval (at 3.81 16.7 ${270 + p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${socket_nets[3].str})

      (fp_line (start -6.00 -19.70) (end -6.00 18.30) (layer Dwgs.User) (width 0.15))
      (fp_line (start 6.00 -19.70) (end 6.00 18.30) (layer Dwgs.User) (width 0.15))
      (fp_line (start -6.00 -19.70) (end 6.00 -19.70) (layer Dwgs.User) (width 0.15))
      (fp_line (start -6.00 -17.45) (end 6.00 -17.45) (layer Dwgs.User) (width 0.15))
      (fp_line (start -6.00 18.30) (end 6.00 18.30) (layer Dwgs.User) (width 0.15))
      (fp_line (start -6.00 12.55) (end 6.00 12.55) (layer Dwgs.User) (width 0.15))
      )
    `

    const traces_bottom = `
    (segment (start ${adjust_point(-3.81, 16.7)}) (end ${adjust_point(-3.81, 18.45)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${jumpers_front_bottom[0].index}))
    (segment (start ${adjust_point(-1.27, 16.7)}) (end ${adjust_point(-1.27, 18.45)}) (width ${p.gnd_trace_width}) (layer "F.Cu") (net ${jumpers_front_bottom[1].index}))
    (segment (start ${adjust_point(1.27, 16.7)}) (end ${adjust_point(1.27, 18.45)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${jumpers_front_bottom[2].index}))
    (segment (start ${adjust_point(3.81, 16.7)}) (end ${adjust_point(3.81, 18.45)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${jumpers_front_bottom[3].index}))
    (segment (start ${adjust_point(-3.81, 16.7)}) (end ${adjust_point(-3.81, 18.45)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${jumpers_back_bottom[0].index}))
    (segment (start ${adjust_point(-1.27, 16.7)}) (end ${adjust_point(-1.27, 18.45)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${jumpers_back_bottom[1].index}))
    (segment (start ${adjust_point(1.27, 16.7)}) (end ${adjust_point(1.27, 18.45)}) (width ${p.gnd_trace_width}) (layer "B.Cu") (net ${jumpers_back_bottom[2].index}))
    (segment (start ${adjust_point(3.81, 16.7)}) (end ${adjust_point(3.81, 18.45)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${jumpers_back_bottom[3].index}))
    `

    const traces_top = `
    (segment (start ${adjust_point(-3.81, 16.7)}) (end ${adjust_point(-3.81, 14.95)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${jumpers_front_top[0].index}))
    (segment (start ${adjust_point(-1.27, 16.7)}) (end ${adjust_point(-1.27, 14.95)}) (width ${p.gnd_trace_width}) (layer "F.Cu") (net ${jumpers_front_top[1].index}))
    (segment (start ${adjust_point(1.27, 16.7)}) (end ${adjust_point(1.27, 14.95)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${jumpers_front_top[2].index}))
    (segment (start ${adjust_point(3.81, 16.7)}) (end ${adjust_point(3.81, 14.95)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${jumpers_front_top[3].index}))
    (segment (start ${adjust_point(-3.81, 16.7)}) (end ${adjust_point(-3.81, 14.95)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${jumpers_back_top[0].index}))
    (segment (start ${adjust_point(-1.27, 16.7)}) (end ${adjust_point(-1.27, 14.95)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${jumpers_back_top[1].index}))
    (segment (start ${adjust_point(1.27, 16.7)}) (end ${adjust_point(1.27, 14.95)}) (width ${p.gnd_trace_width}) (layer "B.Cu") (net ${jumpers_back_top[2].index}))
    (segment (start ${adjust_point(3.81, 16.7)}) (end ${adjust_point(3.81, 14.95)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${jumpers_back_top[3].index}))
    `

    let final = top;

    if (p.side == "F" || p.reversible) {
      final += front;
    }
    if (p.side == "B" || p.reversible) {
      final += back;
    }

    if (p.reversible) {
      final += front_jumpers;
      final += back_jumpers;

      if (p.include_labels) {
        final += labels;
      }
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
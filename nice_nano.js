// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
//
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
//
// Author: @infused-kim + @ceoloide improvements
//
// Description:
//  A reversible footprint for the nice!nano (or any pro-micro compatible
//  controller) that uses jumpers instead of two socket rows to be reversible.
//
//  This is a re-implementation of the promicro_pretty footprint made popular
//  by @benvallack.
//
// Pinout and schematics:
//  https://nicekeyboards.com/docs/nice-nano/pinout-schematic
//
// Params:
//    use_rectangular_jumpers: default is false
//      if true, it will replace chevron-style jumpers with rectangual pads
//    include_traces: default is true
//      if true it will include traces that connect the jumper pads to the vias
//      and the through-holes for the MCU
//    via_size: default is 0.8
//      allows to define the size of the via. Not recommended below 0.56 (JLCPCB minimum),
//      or above 0.8 (KiCad default), to avoid overlap or DRC errors.
//    via_drill: default is 0.4
//      allows to define the size of the drill. Not recommended below 0.3 (JLCPCB minimum),
//      or above 0.4 (KiCad default), to avoid overlap or DRC errors. 
//    Pxx_label, VCC_label, RAW_label, GND_label, RST_label: default is ''
//      allows to override the label for each pin
//
// @infused-kim's improvements:
//  - Use real traces instead of pads, which gets rid of hundreds of DRC errors.
//  - Leave more space between the vias to allow easier routing through the middle
//    of the footprint
//
// @ceoloide's improvements:
//  - Move vias closer to the pads to clear up more space for silkscreen
//  - Add ability to use rectangular jumpers instead of chevron-style
//  - Add ability to control via size, to free up space for routing if needed
//
// # Placement and soldering of jumpers
//
// The footprint is meant to be used with a nice!nano (or any other pro micro
// compatible board) that is placed on the top side of the PCB with the
// components facing down.
//
// This means when you look down at it, the RAW pin is in the upper left
// corner and the 006 pin in the upper right corner.
//
// To make it work in this configuration, you solder the jumpers on the
// OPPOSITE side.
//
// The silkscreen labels are displayed on the opposite side of the MCU, when
// it's facing down. This is so that one can solder all components and jumpers
// on the back side, and be able to read the correct labels to do tests.
//
// Due to the way how this footprint works, you can also place it with the
// components facing up or even at the bottom. You just need to make sure you
// solder the jumpers on the correct side. Remember that the silkscreen matches
// what the jumpers enable for every through-hole.
//
// # Further credits
//
// This footprint was created from scratch by @infused-kim, but is based on the ideas from
// these footprints:
//
// https://github.com/Albert-IV/ergogen-contrib/blob/main/src/footprints/promicro_pretty.js
// https://github.com/50an6xy06r6n/keyboard_reversible.pretty

module.exports = {
  params: {
    designator: 'MCU',

    use_rectangular_jumpers: false,
    include_traces: true,
    via_size: 0.8, // JLCPC min is 0.56 for 1-2 layer boards, KiCad defaults to 0.8
    via_drill: 0.4, // JLCPC min is 0.3 for 1-2 layer boards, KiCad defaults to 0.4

    show_instructions: true,
    show_silk_labels: true,
    show_via_labels: true,

    RAW_label: '',
    GND_label: '',
    RST_label: '',
    VCC_label: '',
    P21_label: '',
    P20_label: '',
    P19_label: '',
    P18_label: '',
    P15_label: '',
    P14_label: '',
    P16_label: '',
    P10_label: '',

    P1_label: '',
    P0_label: '',
    P2_label: '',
    P3_label: '',
    P4_label: '',
    P5_label: '',
    P6_label: '',
    P7_label: '',
    P8_label: '',
    P9_label: '',

    RAW: { type: 'net', value: 'RAW' },
    GND: { type: 'net', value: 'GND' },
    RST: { type: 'net', value: 'RST' },
    VCC: { type: 'net', value: 'VCC' },
    P21: { type: 'net', value: 'P21' },
    P20: { type: 'net', value: 'P20' },
    P19: { type: 'net', value: 'P19' },
    P18: { type: 'net', value: 'P18' },
    P15: { type: 'net', value: 'P15' },
    P14: { type: 'net', value: 'P14' },
    P16: { type: 'net', value: 'P16' },
    P10: { type: 'net', value: 'P10' },

    P1: { type: 'net', value: 'P1' },
    P0: { type: 'net', value: 'P0' },
    P2: { type: 'net', value: 'P2' },
    P3: { type: 'net', value: 'P3' },
    P4: { type: 'net', value: 'P4' },
    P5: { type: 'net', value: 'P5' },
    P6: { type: 'net', value: 'P6' },
    P7: { type: 'net', value: 'P7' },
    P8: { type: 'net', value: 'P8' },
    P9: { type: 'net', value: 'P9' },
  },
  body: p => {
    const get_pin_net_name = (p, pin_name) => {
      return p[pin_name].name;
    };

    const get_pin_net_str = (p, pin_name) => {
      return p[pin_name].str;
    };

    const get_pin_label_override = (p, pin_name) => {
      prop_name = `${pin_name}_label`;
      return p[prop_name];
    };

    const get_pin_label = (p, pin_name) => {
      label = get_pin_label_override(p, pin_name);
      if (label == '') {
        label = get_pin_net_name(p, pin_name);
      }

      if (label === undefined) {
        label = '""';
      }

      return label;
    };

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

    const gen_traces_row = (row_num) => {
      const traces = `
          (segment (start ${adjust_point((p.use_rectangular_jumpers ? 4.58 : 4.775), -12.7 + (row_num * 2.54))}) (end ${adjust_point(3.4, -12.7 + (row_num * 2.54))}) (width 0.25) (layer F.Cu) (net 1))
          (segment (start ${adjust_point((p.use_rectangular_jumpers ? -4.58 : -4.775), -12.7 + (row_num * 2.54))}) (end ${adjust_point(-3.4, -12.7 + (row_num * 2.54))}) (width 0.25) (layer F.Cu) (net 13))
          
          (segment (start ${adjust_point(-7.62, -12.7 + (row_num * 2.54))}) (end ${adjust_point(-5.5, -12.7 + (row_num * 2.54))}) (width 0.25) (layer F.Cu) (net 23))
          (segment (start ${adjust_point(-7.62, -12.7 + (row_num * 2.54))}) (end ${adjust_point(-5.5, -12.7 + (row_num * 2.54))}) (width 0.25) (layer B.Cu) (net 23))
          (segment (start ${adjust_point(5.5, -12.7 + (row_num * 2.54))}) (end ${adjust_point(7.62, -12.7 + (row_num * 2.54))}) (width 0.25) (layer F.Cu) (net 24))
          (segment (start ${adjust_point(7.62, -12.7 + (row_num * 2.54))}) (end ${adjust_point(5.5, -12.7 + (row_num * 2.54))}) (width 0.25) (layer B.Cu) (net 24))
          
          (segment (start ${adjust_point(-2.604695, 0.23 + (row_num * 2.54) - 12.7)}) (end ${adjust_point(3.17, 0.23 + (row_num * 2.54) - 12.7)}) (width 0.25) (layer "B.Cu") (net 2))
          (segment (start ${adjust_point(-4.775, 0 + (row_num * 2.54) - 12.7)}) (end ${adjust_point(-4.425305, 0 + (row_num * 2.54) - 12.7)}) (width 0.25) (layer "B.Cu") (net 2))
          (segment (start ${adjust_point(-3.700305, 0.725 + (row_num * 2.54) - 12.7)}) (end ${adjust_point(-3.099695, 0.725 + (row_num * 2.54) - 12.7)}) (width 0.25) (layer "B.Cu") (net 2))
          (segment (start ${adjust_point(-4.425305, 0 + (row_num * 2.54) - 12.7)}) (end ${adjust_point(-3.700305, 0.725 + (row_num * 2.54) - 12.7)}) (width 0.25) (layer "B.Cu") (net 2))
          (segment (start ${adjust_point(-3.099695, 0.725 + (row_num * 2.54) - 12.7)}) (end ${adjust_point(-2.604695, 0.23 + (row_num * 2.54) - 12.7)}) (width 0.25) (layer "B.Cu") (net 2))

          (segment (start ${adjust_point(4.775, 0 + (row_num * 2.54) - 12.7)}) (end ${adjust_point(4.425305, 0 + (row_num * 2.54) - 12.7)}) (width 0.25) (layer "B.Cu") (net 20))
          (segment (start ${adjust_point(2.594695, -0.22 + (row_num * 2.54) - 12.7)}) (end ${adjust_point(-3.18, -0.22 + (row_num * 2.54) - 12.7)}) (width 0.25) (layer "B.Cu") (net 20))
          (segment (start ${adjust_point(4.425305, 0 + (row_num * 2.54) - 12.7)}) (end ${adjust_point(3.700305, -0.725 + (row_num * 2.54) - 12.7)}) (width 0.25) (layer "B.Cu") (net 20))
          (segment (start ${adjust_point(3.700305, -0.725 + (row_num * 2.54) - 12.7)}) (end ${adjust_point(3.099695, -0.725 + (row_num * 2.54) - 12.7)}) (width 0.25) (layer "B.Cu") (net 20))
          (segment (start ${adjust_point(3.099695, -0.725 + (row_num * 2.54) - 12.7)}) (end ${adjust_point(2.594695, -0.22 + (row_num * 2.54) - 12.7)}) (width 0.25) (layer "B.Cu") (net 20))
        `

      return traces
    }

    const gen_traces = () => {
      let traces = '';
      for (let i = 0; i < 12; i++) {
        row_traces = gen_traces_row(i)
        traces += row_traces
      }

      return traces
    }

    const gen_socket_row = (row_num, pin_name_left, pin_name_right, show_via_labels, show_silk_labels) => {
      const row_offset_y = 2.54 * row_num

      const socket_hole_num_left = 24 - row_num
      const socket_hole_num_right = 1 + row_num
      const via_num_left = 124 - row_num
      const via_num_right = 1 + row_num

      const net_left = get_pin_net_str(p, pin_name_left)
      const net_right = get_pin_net_str(p, pin_name_right)
      const via_label_left = get_pin_label(p, pin_name_left)
      const via_label_right = get_pin_label(p, pin_name_right)

      // These are the silkscreen labels that will be printed on the PCB.
      // They tell us the orientation if the controller is placed with
      // the components down, on top of the PCB and the jumpers are
      // soldered on the opposite side than the controller, when seen on
      // the opposite side of the controller.
      const net_silk_front_left = via_label_left
      const net_silk_front_right = via_label_right
      const net_silk_back_left = via_label_right
      const net_silk_back_right = via_label_left

      let socket_row_base = `
          ${''/* Socket Holes */}
          (pad ${socket_hole_num_left} thru_hole circle (at -7.62 ${-12.7 + row_offset_y} ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.local_net(socket_hole_num_left).str})
          (pad ${socket_hole_num_right} thru_hole circle (at 7.62 ${-12.7 + row_offset_y} ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.local_net(socket_hole_num_right).str})

          ${''/* Inside VIAS */}
          (pad ${via_num_right} thru_hole circle (at 3.4 ${-12.7 + row_offset_y} ${p.rot}) (size ${p.via_size} ${p.via_size}) (drill ${p.via_drill}) (layers *.Cu *.Mask) ${net_right})
          (pad ${via_num_left} thru_hole circle (at -3.4 ${-12.7 + row_offset_y} ${p.rot}) (size ${p.via_size} ${p.via_size}) (drill ${p.via_drill}) (layers *.Cu *.Mask) ${net_left})
        `

      let socket_row_rectangular_jumpers = `
        ${''/* Jumper Pads - Front Left */}
        (pad ${socket_hole_num_left} smd rect (at -5.48 ${-12.7 + row_offset_y} ${p.rot}) (size 0.6 1.2) (layers F.Cu F.Mask) ${p.local_net(socket_hole_num_left).str})
        (pad ${via_num_left} smd rect (at -4.58 ${-12.7 + row_offset_y} ${p.rot}) (size 0.6 1.2) (layers F.Cu F.Mask) ${net_left})

        ${''/* Jumper Pads - Front Right */}
        (pad ${via_num_right} smd rect (at 4.58 ${-12.7 + row_offset_y} ${p.rot}) (size 0.6 1.2) (layers F.Cu F.Mask) ${net_right})
        (pad ${socket_hole_num_left} smd rect (at 5.48 ${-12.7 + row_offset_y} ${p.rot}) (size 0.6 1.2) (layers F.Cu F.Mask) ${p.local_net(socket_hole_num_right).str})

        ${''/* Jumper Pads - Back Left */}
        (pad ${socket_hole_num_left} smd rect (at -5.48 ${-12.7 + row_offset_y} ${p.rot}) (size 0.6 1.2) (layers B.Cu B.Mask) ${p.local_net(socket_hole_num_left).str})
        (pad ${via_num_right} smd rect (at -4.58 ${-12.7 + row_offset_y} ${p.rot}) (size 0.6 1.2) (layers B.Cu B.Mask) ${net_right})

        ${''/* Jumper Pads - Back Right */}
        (pad ${via_num_left} smd rect (at 4.58 ${-12.7 + row_offset_y} ${p.rot}) (size 0.6 1.2) (layers B.Cu B.Mask) ${net_left})
        (pad ${socket_hole_num_left} smd rect (at 5.48 ${-12.7 + row_offset_y} ${p.rot}) (size 0.6 1.2) (layers B.Cu B.Mask) ${p.local_net(socket_hole_num_right).str})
        `

      let socket_row_chevron_jumpers = `
          ${''/* Jumper Pads - Front Left */}
          (pad ${socket_hole_num_left} smd custom (at -5.5 ${-12.7 + row_offset_y} ${p.rot}) (size 0.2 0.2) (layers F.Cu F.Mask) ${p.local_net(socket_hole_num_left).str}
            (zone_connect 2)
            (options (clearance outline) (anchor rect))
            (primitives
              (gr_poly (pts
                (xy -0.5 -0.625) (xy -0.25 -0.625) (xy 0.25 0) (xy -0.25 0.625) (xy -0.5 0.625)
            ) (width 0))
          ))
          (pad ${via_num_left} smd custom (at -4.775 ${-12.7 + row_offset_y} ${p.rot}) (size 0.2 0.2) (layers F.Cu F.Mask) ${net_left}
            (zone_connect 2)
            (options (clearance outline) (anchor rect))
            (primitives
              (gr_poly (pts
                (xy -0.65 -0.625) (xy 0.5 -0.625) (xy 0.5 0.625) (xy -0.65 0.625) (xy -0.15 0)
            ) (width 0))
          ))

          ${''/* Jumper Pads - Front Right */}
          (pad ${via_num_right} smd custom (at 4.775 ${-12.7 + row_offset_y} ${180 + p.rot}) (size 0.2 0.2) (layers F.Cu F.Mask) ${net_right}
            (zone_connect 2)
            (options (clearance outline) (anchor rect))
            (primitives
              (gr_poly (pts
                (xy -0.65 -0.625) (xy 0.5 -0.625) (xy 0.5 0.625) (xy -0.65 0.625) (xy -0.15 0)
            ) (width 0))
          ))
          (pad ${socket_hole_num_right} smd custom (at 5.5 ${-12.7 + row_offset_y} ${180 + p.rot}) (size 0.2 0.2) (layers F.Cu F.Mask) ${p.local_net(socket_hole_num_right).str}
            (zone_connect 2)
            (options (clearance outline) (anchor rect))
            (primitives
              (gr_poly (pts
                (xy -0.5 -0.625) (xy -0.25 -0.625) (xy 0.25 0) (xy -0.25 0.625) (xy -0.5 0.625)
            ) (width 0))
          ))

          ${''/* Jumper Pads - Back Left */}
          (pad ${socket_hole_num_left} smd custom (at -5.5 ${-12.7 + row_offset_y} ${p.rot}) (size 0.2 0.2) (layers B.Cu B.Mask) ${p.local_net(socket_hole_num_left).str}
            (zone_connect 2)
            (options (clearance outline) (anchor rect))
            (primitives
              (gr_poly (pts
                (xy -0.5 0.625) (xy -0.25 0.625) (xy 0.25 0) (xy -0.25 -0.625) (xy -0.5 -0.625)
            ) (width 0))
          ))

          (pad ${via_num_right} smd custom (at -4.775 ${-12.7 + row_offset_y} ${p.rot}) (size 0.2 0.2) (layers B.Cu B.Mask) ${net_right}
            (zone_connect 2)
            (options (clearance outline) (anchor rect))
            (primitives
              (gr_poly (pts
                (xy -0.65 0.625) (xy 0.5 0.625) (xy 0.5 -0.625) (xy -0.65 -0.625) (xy -0.15 0)
            ) (width 0))
          ))

          ${''/* Jumper Pads - Back Right */}
          (pad ${via_num_left} smd custom (at 4.775 ${-12.7 + row_offset_y} ${180 + p.rot}) (size 0.2 0.2) (layers B.Cu B.Mask) ${net_left}
            (zone_connect 2)
            (options (clearance outline) (anchor rect))
            (primitives
              (gr_poly (pts
                (xy -0.65 0.625) (xy 0.5 0.625) (xy 0.5 -0.625) (xy -0.65 -0.625) (xy -0.15 0)
            ) (width 0))
          ))
          (pad ${socket_hole_num_right} smd custom (at 5.5 ${-12.7 + row_offset_y} ${180 + p.rot}) (size 0.2 0.2) (layers B.Cu B.Mask) ${p.local_net(socket_hole_num_right).str}
            (zone_connect 2)
            (options (clearance outline) (anchor rect))
            (primitives
              (gr_poly (pts
                (xy -0.5 0.625) (xy -0.25 0.625) (xy 0.25 0) (xy -0.25 -0.625) (xy -0.5 -0.625)
            ) (width 0))
          ))
        `
      let socket_row = socket_row_base
      if (p.use_rectangular_jumpers) {
        socket_row += socket_row_rectangular_jumpers
      } else {
        socket_row += socket_row_chevron_jumpers
      }
      if (show_silk_labels == true) {
        socket_row += `

            ${''/* Silkscreen Labels - Front */}
            (fp_text user ${net_silk_front_left} (at -3 ${-12.7 + row_offset_y} ${p.rot}) (layer F.SilkS)
              (effects (font (size 1 1) (thickness 0.15)) (justify left))
            )
            (fp_text user ${net_silk_front_right} (at 3 ${-12.7 + row_offset_y} ${p.rot}) (layer F.SilkS)
              (effects (font (size 1 1) (thickness 0.15)) (justify right))
            )

            ${''/* Silkscreen Labels - Back */}
            (fp_text user ${net_silk_back_left} (at -3 ${-12.7 + row_offset_y} ${180 + p.rot}) (layer B.SilkS)
              (effects (font (size 1 1) (thickness 0.15)) (justify right mirror))
            )
            (fp_text user ${net_silk_back_right} (at 3 ${-12.7 + row_offset_y} ${180 + p.rot}) (layer B.SilkS)
              (effects (font (size 1 1) (thickness 0.15)) (justify left mirror))
            )
          `
      }

      if (show_via_labels == true) {
        socket_row += `
            ${''/* Via Labels - Front */}
            (fp_text user ${via_label_left} (at -3.262 ${-13.5 + row_offset_y} ${p.rot}) (layer F.Fab)
              (effects (font (size 0.5 0.5) (thickness 0.08)))
            )
            (fp_text user ${via_label_right} (at 3.262 ${-13.5 + row_offset_y} ${p.rot}) (layer F.Fab)
              (effects (font (size 0.5 0.5) (thickness 0.08)))
            )

            ${''/* Via Labels - Back */}
            (fp_text user ${via_label_left} (at -3.262 ${-13.5 + row_offset_y} ${180 + p.rot}) (layer B.Fab)
              (effects (font (size 0.5 0.5) (thickness 0.08)) (justify mirror))
            )
            (fp_text user ${via_label_right} (at 3.262 ${-13.5 + row_offset_y} ${180 + p.rot}) (layer B.Fab)
              (effects (font (size 0.5 0.5) (thickness 0.08)) (justify mirror))
            )
          `
      }

      return socket_row
    }

    const gen_socket_rows = (show_via_labels, show_silk_labels) => {
      const pin_names = [
        ['P1', 'RAW'],
        ['P0', 'GND'],
        ['GND', 'RST'],
        ['GND', 'VCC'],
        ['P2', 'P21'],
        ['P3', 'P20'],
        ['P4', 'P19'],
        ['P5', 'P18'],
        ['P6', 'P15'],
        ['P7', 'P14'],
        ['P8', 'P16'],
        ['P9', 'P10'],
      ]
      let socket_rows = '';
      for (let i = 0; i < pin_names.length; i++) {
        pin_name_left = pin_names[i][0]
        pin_name_right = pin_names[i][1]

        const socket_row = gen_socket_row(
          i, pin_name_left, pin_name_right,
          show_via_labels, show_silk_labels
        )

        socket_rows += socket_row
      }

      return socket_rows
    }

    const common_top = `
        (module "ceoloide:nice_nano" (layer F.Cu) (tedit 6451A4F1)
          (attr virtual)
          ${p.at /* parametric position */}
          (fp_text reference "${p.ref}" (at 0 -15 ${p.rot}) (layer F.SilkS) ${p.ref_hide}
            (effects (font (size 1 1) (thickness 0.15)))
          )

          ${''/* USB Socket Outline */}
          (fp_line (start 3.556 -18.034) (end 3.556 -16.51) (layer Dwgs.User) (width 0.15))
          (fp_line (start -3.81 -16.51) (end -3.81 -18.034) (layer Dwgs.User) (width 0.15))
          (fp_line (start -3.81 -18.034) (end 3.556 -18.034) (layer Dwgs.User) (width 0.15))


          ${''/* Controller top part outline */}
          (fp_line (start -8.89 -16.51) (end 8.89 -16.51) (layer F.Fab) (width 0.12))
          (fp_line (start -8.89 -16.51) (end -8.89 -14) (layer F.Fab) (width 0.12))
          (fp_line (start 8.89 -16.51) (end 8.89 -14) (layer F.Fab) (width 0.12))
          (fp_line (start -8.89 -16.5) (end -8.89 -13.99) (layer B.Fab) (width 0.12))
          (fp_line (start 8.89 -16.51) (end 8.89 -14) (layer B.Fab) (width 0.12))
          (fp_line (start -8.89 -16.51) (end 8.89 -16.51) (layer B.Fab) (width 0.12))

          ${''/* Socket outlines */}
          (fp_line (start 6.29 -11.43) (end 8.95 -11.43) (layer F.SilkS) (width 0.12))
          (fp_line (start 6.29 -14.03) (end 8.95 -14.03) (layer F.SilkS) (width 0.12))
          (fp_line (start 6.29 -14.03) (end 6.29 16.57) (layer F.SilkS) (width 0.12))
          (fp_line (start 6.29 16.57) (end 8.95 16.57) (layer F.SilkS) (width 0.12))
          (fp_line (start 8.95 -14.03) (end 8.95 16.57) (layer F.SilkS) (width 0.12))
          (fp_line (start -8.95 -14.03) (end -6.29 -14.03) (layer F.SilkS) (width 0.12))
          (fp_line (start -8.95 -14.03) (end -8.95 16.57) (layer F.SilkS) (width 0.12))
          (fp_line (start -8.95 16.57) (end -6.29 16.57) (layer F.SilkS) (width 0.12))
          (fp_line (start -6.29 -14.03) (end -6.29 16.57) (layer F.SilkS) (width 0.12))
          (fp_line (start -8.95 -11.43) (end -6.29 -11.43) (layer B.SilkS) (width 0.12))
          (fp_line (start -6.29 -14.03) (end -8.95 -14.03) (layer B.SilkS) (width 0.12))
          (fp_line (start -6.29 -14.03) (end -6.29 16.57) (layer B.SilkS) (width 0.12))
          (fp_line (start -6.29 16.57) (end -8.95 16.57) (layer B.SilkS) (width 0.12))
          (fp_line (start -8.95 -14.03) (end -8.95 16.57) (layer B.SilkS) (width 0.12))
          (fp_line (start 8.95 -14.03) (end 6.29 -14.03) (layer B.SilkS) (width 0.12))
          (fp_line (start 8.95 -14.03) (end 8.95 16.57) (layer B.SilkS) (width 0.12))
          (fp_line (start 8.95 16.57) (end 6.29 16.57) (layer B.SilkS) (width 0.12))
          (fp_line (start 6.29 -14.03) (end 6.29 16.57) (layer B.SilkS) (width 0.12))
      `;

    const instructions = `
          (fp_text user "R. Side - Jumper Here" (at 0 -15.245 ${p.rot}) (layer F.SilkS)
            (effects (font (size 1 1) (thickness 0.15)))
          )
          (fp_text user "L. Side - Jumper Here" (at 0 -15.245 ${p.rot}) (layer B.SilkS)
            (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
          )
    `

    const socket_rows = gen_socket_rows(
      p.show_via_labels, p.show_silk_labels
    )
    const traces = gen_traces()


    return `
          ${''/* Controller*/}
          ${common_top}
          ${socket_rows}
          ${p.show_instructions ? instructions : ''}
        )

        ${''/* Traces */}
        ${p.include_traces ? traces : ''}
    `;
  }
}

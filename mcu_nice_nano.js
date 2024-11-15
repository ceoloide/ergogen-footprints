// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
//
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
//
// Author: @infused-kim + @ceoloide improvements
//
// Description:
//  A single-side or reversible footprint for the nice!nano (or any pro-micro compatible
//  controller) that uses jumpers instead of two socket rows to be reversible.
//
//  Note that the extra pins are *ONLY* compatible with nice!nano boards and not with
//  clones like the Supermini, which has pins in a slightly different position.
//
//  This is a re-implementation of the promicro_pretty footprint made popular
//  by @benvallack.
//
// Pinout and schematics:
//  https://nicekeyboards.com/docs/nice-nano/pinout-schematic
//
// Params:
//    side: default is F for Front
//      the side on which to place the single-side footprint and designator, either F or B
//    reversible: default is false
//      if true, the footprint will be placed on both sides so that the PCB can be
//      reversible
//    reverse_mount: default is false (MCU facing away from the PCB)
//      if true, the sockets will be oriented so that the MCU faces the PCB (RAW / B+ is the
//      top left pin). This is the most common mounting option for the nice!nano.
//      When set to false, the pads will match the datasheet and assume the MCU faces away
//      from the PCB (RAW / B+ is the top right pin).
//    include_traces: default is true
//      if true it will include traces that connect the jumper pads to the vias
//      and the through-holes for the MCU
//    include_extra_pins: default is false
//      if true and if not reversible it will include nice!nano extra pin sockets (P1.01,
//      P1.02, P1.07)
//    only_required_jumpers: default is false
//      if true, it will only place jumpers on the first 4 rows of pins, which can't be
//      reversed in firmware, i.e. RAW and P1, GND and P0, GND and RST, GND and VCC.
//    use_rectangular_jumpers: default is false
//      if true, it will replace chevron-style jumpers with rectangual pads
//    via_size: default is 0.8
//      allows to define the size of the via. Not recommended below 0.56 (JLCPCB minimum),
//      or above 0.8 (KiCad default), to avoid overlap or DRC errors.
//    via_drill: default is 0.4
//      allows to define the size of the drill. Not recommended below 0.3 (JLCPCB minimum),
//      or above 0.4 (KiCad default), to avoid overlap or DRC errors. 
//    Pxx_label, VCC_label, RAW_label, GND_label, RST_label: default is ''
//      allows to override the label for each pin
//    mcu_3dmodel_filename: default is ''
//      Allows you to specify the path to a 3D model STEP or WRL file to be
//      used when rendering the PCB. Use the ${VAR_NAME} syntax to point to
//      a KiCad configured path.
//    mcu_3dmodel_xyz_offset: default is [0, 0, 0]
//      xyz offset (in mm), used to adjust the position of the 3d model
//      relative the footprint.
//    mcu_3dmodel_xyz_scale: default is [1, 1, 1]
//      xyz scale, used to adjust the size of the 3d model relative to its
//      original size.
//    mcu_3dmodel_xyz_rotation: default is [0, 0, 0]
//      xyz rotation (in degrees), used to adjust the orientation of the 3d
//      model relative the footprint.
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
//  - Add ability to only have required jumpers and let the rest be handled in firmware
//  - Add single side (non-reversible) support
//  - Add ability to mount with MCU facing towards or away from PCB
//  - Add ability to show silkscreen labels on both sides for single side footprint
//  - Add extra pins (P1.01, P1.02, P1.07) when footprint is single-side or reversible
//    (only required jumpers)
//  - Upgrade to KiCad 8
//
// # Placement and soldering of jumpers
//
// The reversible footprint is meant to be used with jumpers on the
// OPPOSITE side of where the nice!nano (or pro-micro compatible board) is
// installed. The silkscreen labels will also match the board when read on
// the opposite side. This is to have all jumpers and components to solder on
// the same side, and be able to read the correct labels of the MCU to do
// tests with a multimeter.
//
// # Further credits
//
// The original footprint was created from scratch by @infused-kim, but was based on the ideas from
// these other footprints:
//
// https://github.com/Albert-IV/ergogen-contrib/blob/main/src/footprints/promicro_pretty.js
// https://github.com/50an6xy06r6n/keyboard_reversible.pretty

module.exports = {
  params: {
    designator: 'MCU',
    side: 'F',
    reversible: false,
    reverse_mount: false,
    include_traces: true,
    include_extra_pins: false,
    invert_jumpers_position: false,
    only_required_jumpers: false,
    use_rectangular_jumpers: false,
    via_size: 0.8, // JLCPC min is 0.56 for 1-2 layer boards, KiCad defaults to 0.8
    via_drill: 0.4, // JLCPC min is 0.3 for 1-2 layer boards, KiCad defaults to 0.4

    show_instructions: true,
    show_silk_labels: true,
    show_silk_labels_on_both_sides: false,
    show_via_labels: true,

    mcu_3dmodel_filename: '',
    mcu_3dmodel_xyz_offset: [0, 0, 0],
    mcu_3dmodel_xyz_rotation: [0, 0, 0],
    mcu_3dmodel_xyz_scale: [1, 1, 1],

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

    P101_label: '',
    P102_label: '',
    P107_label: '',

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

    P101: { type: 'net', value: 'P101' },
    P102: { type: 'net', value: 'P102' },
    P107: { type: 'net', value: 'P107' },
  },
  body: p => {
    const get_pin_net_name = (p, pin_name) => {
      return p[pin_name].name;
    };

    const get_pin_net_str = (p, pin_name) => {
      return p[pin_name].str;
    };

    const get_pin_label_override = (p, pin_name) => {
      let prop_name = `${pin_name}_label`;
      return p[prop_name];
    };

    const get_pin_label = (p, pin_name) => {
      let label = get_pin_label_override(p, pin_name);
      if (label == '') {
        label = get_pin_net_name(p, pin_name);
      }

      if (label === undefined) {
        label = '""';
      }

      return label;
    };

    const gen_traces_row = (row_num) => {
      const traces = `
  (segment (start ${p.eaxy((p.use_rectangular_jumpers ? 4.58 : 4.775), -12.7 + (row_num * 2.54))}) (end ${p.eaxy(3.4, -12.7 + (row_num * 2.54))}) (width 0.25) (layer "F.Cu"))
  (segment (start ${p.eaxy((p.use_rectangular_jumpers ? -4.58 : -4.775), -12.7 + (row_num * 2.54))}) (end ${p.eaxy(-3.4, -12.7 + (row_num * 2.54))}) (width 0.25) (layer "F.Cu"))

  (segment (start ${p.eaxy(-7.62, -12.7 + (row_num * 2.54))}) (end ${p.eaxy(-5.5, -12.7 + (row_num * 2.54))}) (width 0.25) (layer "F.Cu"))
  (segment (start ${p.eaxy(-7.62, -12.7 + (row_num * 2.54))}) (end ${p.eaxy(-5.5, -12.7 + (row_num * 2.54))}) (width 0.25) (layer "B.Cu"))
  (segment (start ${p.eaxy(5.5, -12.7 + (row_num * 2.54))}) (end ${p.eaxy(7.62, -12.7 + (row_num * 2.54))}) (width 0.25) (layer "F.Cu"))
  (segment (start ${p.eaxy(7.62, -12.7 + (row_num * 2.54))}) (end ${p.eaxy(5.5, -12.7 + (row_num * 2.54))}) (width 0.25) (layer "B.Cu"))

  (segment (start ${p.eaxy(-2.604695, 0.23 + (row_num * 2.54) - 12.7)}) (end ${p.eaxy(3.17, 0.23 + (row_num * 2.54) - 12.7)}) (width 0.25) (layer "B.Cu"))
  (segment (start ${p.eaxy(-4.775, 0 + (row_num * 2.54) - 12.7)}) (end ${p.eaxy(-4.425305, 0 + (row_num * 2.54) - 12.7)}) (width 0.25) (layer "B.Cu"))
  (segment (start ${p.eaxy(-3.700305, 0.725 + (row_num * 2.54) - 12.7)}) (end ${p.eaxy(-3.099695, 0.725 + (row_num * 2.54) - 12.7)}) (width 0.25) (layer "B.Cu"))
  (segment (start ${p.eaxy(-4.425305, 0 + (row_num * 2.54) - 12.7)}) (end ${p.eaxy(-3.700305, 0.725 + (row_num * 2.54) - 12.7)}) (width 0.25) (layer "B.Cu"))
  (segment (start ${p.eaxy(-3.099695, 0.725 + (row_num * 2.54) - 12.7)}) (end ${p.eaxy(-2.604695, 0.23 + (row_num * 2.54) - 12.7)}) (width 0.25) (layer "B.Cu"))

  (segment (start ${p.eaxy(4.775, 0 + (row_num * 2.54) - 12.7)}) (end ${p.eaxy(4.425305, 0 + (row_num * 2.54) - 12.7)}) (width 0.25) (layer "B.Cu"))
  (segment (start ${p.eaxy(2.594695, -0.22 + (row_num * 2.54) - 12.7)}) (end ${p.eaxy(-3.18, -0.22 + (row_num * 2.54) - 12.7)}) (width 0.25) (layer "B.Cu"))
  (segment (start ${p.eaxy(4.425305, 0 + (row_num * 2.54) - 12.7)}) (end ${p.eaxy(3.700305, -0.725 + (row_num * 2.54) - 12.7)}) (width 0.25) (layer "B.Cu"))
  (segment (start ${p.eaxy(3.700305, -0.725 + (row_num * 2.54) - 12.7)}) (end ${p.eaxy(3.099695, -0.725 + (row_num * 2.54) - 12.7)}) (width 0.25) (layer "B.Cu"))
  (segment (start ${p.eaxy(3.099695, -0.725 + (row_num * 2.54) - 12.7)}) (end ${p.eaxy(2.594695, -0.22 + (row_num * 2.54) - 12.7)}) (width 0.25) (layer "B.Cu"))
        `

      return traces
    }

    const gen_traces = () => {
      let traces = '';
      for (let i = 0; i < 12; i++) {
        if (i < 4 || !p.only_required_jumpers) {
          let row_traces = gen_traces_row(i)
          traces += row_traces
        }
      }

      return traces
    }

    const invert_pins = (p.side == 'B' && !p.reverse_mount && !p.reversible) || (p.side == 'F' && p.reverse_mount) || (p.reverse_mount && p.reversible)

    const gen_socket_row = (row_num, pin_name_left, pin_name_right, show_via_labels, show_silk_labels) => {
      const row_offset_y = 2.54 * row_num

      const socket_hole_num_left = 24 - row_num
      const socket_hole_num_right = 1 + row_num
      const via_num_left = 124 - row_num
      const via_num_right = 101 + row_num

      const net_left = get_pin_net_str(p, pin_name_left)
      const net_right = get_pin_net_str(p, pin_name_right)
      const via_label_left = get_pin_label(p, pin_name_left)
      const via_label_right = get_pin_label(p, pin_name_right)

      // These are the silkscreen labels that will be printed on the PCB.
      // If the footprint is reversible, they will be aligned with the pins
      // on the opposite side of where the MCU board is mounted.
      const net_silk_front_left = (p.reversible && (row_num < 4 || !p.only_required_jumpers) ? via_label_right : via_label_left)
      const net_silk_front_right = (p.reversible && (row_num < 4 || !p.only_required_jumpers) ? via_label_left : via_label_right)
      const net_silk_back_left = (p.reversible && (row_num < 4 || !p.only_required_jumpers) ? via_label_left : via_label_right)
      const net_silk_back_right = (p.reversible && (row_num < 4 || !p.only_required_jumpers) ? via_label_right : via_label_left)

      let socket_row_base = `
    ${''/* Socket Holes */}
    (pad "${socket_hole_num_left}" thru_hole circle (at -7.62 ${-12.7 + row_offset_y} ${p.r}) (size 1.7 1.7) (drill 1) (layers "*.Cu" "*.Mask") ${p.reversible && (row_num < 4 || !p.only_required_jumpers) ? p.local_net(socket_hole_num_left).str : net_left})
    (pad "${socket_hole_num_right}" thru_hole circle (at 7.62 ${-12.7 + row_offset_y} ${p.r}) (size 1.7 1.7) (drill 1) (layers "*.Cu" "*.Mask") ${p.reversible && (row_num < 4 || !p.only_required_jumpers) ? p.local_net(socket_hole_num_right).str : net_right})
      `
      let socket_row_vias = `
    ${''/* Inside VIAS */}
    (pad "${via_num_right}" thru_hole circle (at 3.4 ${-12.7 + row_offset_y} ${p.r}) (size ${p.via_size} ${p.via_size}) (drill ${p.via_drill}) (layers "*.Cu" "*.Mask") ${p.reverse_mount ? net_right : net_left})
    (pad "${via_num_left}" thru_hole circle (at -3.4 ${-12.7 + row_offset_y} ${p.r}) (size ${p.via_size} ${p.via_size}) (drill ${p.via_drill}) (layers "*.Cu" "*.Mask") ${p.reverse_mount ? net_left : net_right})
      `

      let socket_row_rectangular_jumpers = `
    ${''/* Jumper Pads - Front Left */}
    (pad "${socket_hole_num_left}" smd rect (at -5.48 ${-12.7 + row_offset_y} ${p.r}) (size 0.6 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${p.local_net(socket_hole_num_left).str})
    (pad "${via_num_left}" smd rect (at -4.58 ${-12.7 + row_offset_y} ${p.r}) (size 0.6 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${p.reverse_mount ? net_left : net_right})

    ${''/* Jumper Pads - Front Right */}
    (pad "${via_num_right}" smd rect (at 4.58 ${-12.7 + row_offset_y} ${p.r}) (size 0.6 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${p.reverse_mount ? net_right : net_left})
    (pad "${socket_hole_num_left}" smd rect (at 5.48 ${-12.7 + row_offset_y} ${p.r}) (size 0.6 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${p.local_net(socket_hole_num_right).str})

    ${''/* Jumper Pads - Back Left */}
    (pad "${socket_hole_num_left}" smd rect (at -5.48 ${-12.7 + row_offset_y} ${p.r}) (size 0.6 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${p.local_net(socket_hole_num_left).str})
    (pad "${via_num_right}" smd rect (at -4.58 ${-12.7 + row_offset_y} ${p.r}) (size 0.6 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${p.reverse_mount ? net_right : net_left})

    ${''/* Jumper Pads - Back Right */}
    (pad "${via_num_left}" smd rect (at 4.58 ${-12.7 + row_offset_y} ${p.r}) (size 0.6 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${p.reverse_mount ? net_left : net_right})
    (pad "${socket_hole_num_left}" smd rect (at 5.48 ${-12.7 + row_offset_y} ${p.r}) (size 0.6 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${p.local_net(socket_hole_num_right).str})
        `

      let socket_row_chevron_jumpers = `
    ${''/* Jumper Pads - Front Left */}
    (pad "${socket_hole_num_left}" smd custom (at -5.5 ${-12.7 + row_offset_y} ${p.r}) (size 0.2 0.2) (layers "F.Cu" "F.Paste" "F.Mask") ${p.local_net(socket_hole_num_left).str}
      (zone_connect 2)
      (options (clearance outline) (anchor rect))
      (primitives
        (gr_poly (pts
          (xy -0.5 -0.625) (xy -0.25 -0.625) (xy 0.25 0) (xy -0.25 0.625) (xy -0.5 0.625)
      ) (width 0) (fill yes))
    ))
    (pad "${via_num_left}" smd custom (at -4.775 ${-12.7 + row_offset_y} ${p.r}) (size 0.2 0.2) (layers "F.Cu" "F.Paste" "F.Mask") ${p.reverse_mount ? net_left : net_right}
      (zone_connect 2)
      (options (clearance outline) (anchor rect))
      (primitives
        (gr_poly (pts
          (xy -0.65 -0.625) (xy 0.5 -0.625) (xy 0.5 0.625) (xy -0.65 0.625) (xy -0.15 0)
      ) (width 0) (fill yes))
    ))

    ${''/* Jumper Pads - Front Right */}
    (pad "${via_num_right}" smd custom (at 4.775 ${-12.7 + row_offset_y} ${180 + p.r}) (size 0.2 0.2) (layers "F.Cu" "F.Paste" "F.Mask") ${p.reverse_mount ? net_right : net_left}
      (zone_connect 2)
      (options (clearance outline) (anchor rect))
      (primitives
        (gr_poly (pts
          (xy -0.65 -0.625) (xy 0.5 -0.625) (xy 0.5 0.625) (xy -0.65 0.625) (xy -0.15 0)
      ) (width 0) (fill yes))
    ))
    (pad "${socket_hole_num_right}" smd custom (at 5.5 ${-12.7 + row_offset_y} ${180 + p.r}) (size 0.2 0.2) (layers "F.Cu" "F.Paste" "F.Mask") ${p.local_net(socket_hole_num_right).str}
      (zone_connect 2)
      (options (clearance outline) (anchor rect))
      (primitives
        (gr_poly (pts
          (xy -0.5 -0.625) (xy -0.25 -0.625) (xy 0.25 0) (xy -0.25 0.625) (xy -0.5 0.625)
      ) (width 0) (fill yes))
    ))

    ${''/* Jumper Pads - Back Left */}
    (pad "${socket_hole_num_left}" smd custom (at -5.5 ${-12.7 + row_offset_y} ${p.r}) (size 0.2 0.2) (layers "B.Cu" "B.Paste" "B.Mask") ${p.local_net(socket_hole_num_left).str}
      (zone_connect 2)
      (options (clearance outline) (anchor rect))
      (primitives
        (gr_poly (pts
          (xy -0.5 0.625) (xy -0.25 0.625) (xy 0.25 0) (xy -0.25 -0.625) (xy -0.5 -0.625)
      ) (width 0) (fill yes))
    ))

    (pad "${via_num_right}" smd custom (at -4.775 ${-12.7 + row_offset_y} ${p.r}) (size 0.2 0.2) (layers "B.Cu" "B.Paste" "B.Mask") ${p.reverse_mount ? net_right : net_left}
      (zone_connect 2)
      (options (clearance outline) (anchor rect))
      (primitives
        (gr_poly (pts
          (xy -0.65 0.625) (xy 0.5 0.625) (xy 0.5 -0.625) (xy -0.65 -0.625) (xy -0.15 0)
      ) (width 0) (fill yes))
    ))

    ${''/* Jumper Pads - Back Right */}
    (pad "${via_num_left}" smd custom (at 4.775 ${-12.7 + row_offset_y} ${180 + p.r}) (size 0.2 0.2) (layers "B.Cu" "B.Paste" "B.Mask") ${p.reverse_mount ? net_left : net_right}
      (zone_connect 2)
      (options (clearance outline) (anchor rect))
      (primitives
        (gr_poly (pts
          (xy -0.65 0.625) (xy 0.5 0.625) (xy 0.5 -0.625) (xy -0.65 -0.625) (xy -0.15 0)
      ) (width 0) (fill yes))
    ))
    (pad "${socket_hole_num_right}" smd custom (at 5.5 ${-12.7 + row_offset_y} ${180 + p.r}) (size 0.2 0.2) (layers "B.Cu" "B.Paste" "B.Mask") ${p.local_net(socket_hole_num_right).str}
      (zone_connect 2)
      (options (clearance outline) (anchor rect))
      (primitives
        (gr_poly (pts
          (xy -0.5 0.625) (xy -0.25 0.625) (xy 0.25 0) (xy -0.25 -0.625) (xy -0.5 -0.625)
      ) (width 0) (fill yes))
    ))
        `
      let socket_row = socket_row_base;
      if (p.reversible && (row_num < 4 || !p.only_required_jumpers)) {
        socket_row += socket_row_vias;
        if (p.use_rectangular_jumpers) {
          socket_row += socket_row_rectangular_jumpers
        } else {
          socket_row += socket_row_chevron_jumpers
        }
      }
      if (show_silk_labels == true) {
        if (p.reversible || p.show_silk_labels_on_both_sides || p.side == 'F') {
          // Silkscreen labels - front
          if (row_num != 10 || (!p.include_extra_pins && p.reversible) || (p.include_extra_pins && invert_pins && !p.reversible) || (!p.include_extra_pins && !p.reversible)) {
            socket_row += `
    (fp_text user "${net_silk_front_left}" (at -${p.reversible && (row_num < 4 || !p.only_required_jumpers) ? (net_silk_front_left.length > 2 ? 1.45 : 2.04) : 4.47} ${-12.7 + row_offset_y} ${p.r}) (layer "F.SilkS")
      (effects (font (size 1 1) (thickness 0.15)))
    )
            `
          }
          if (row_num != 10 || (!p.include_extra_pins && p.reversible) || (p.include_extra_pins && !invert_pins && !p.reversible) || (!p.include_extra_pins && !p.reversible)) {
            socket_row += `
    (fp_text user "${net_silk_front_right}" (at ${p.reversible && (row_num < 4 || !p.only_required_jumpers) ? (net_silk_front_right.length > 2 ? 1.45 : 2.04) : 4.47} ${-12.7 + row_offset_y} ${p.r}) (layer "F.SilkS")
      (effects (font (size 1 1) (thickness 0.15)))
    )
            `
          }
        }
        if (p.reversible|| p.show_silk_labels_on_both_sides || p.side == 'B') {
          // Silkscreen labels - back
          if (row_num != 10 || (!p.include_extra_pins && p.reversible) || (p.include_extra_pins && !invert_pins && !p.reversible) || (!p.include_extra_pins && !p.reversible)) {
            socket_row += `
    (fp_text user "${net_silk_back_left}" (at ${p.reversible ? '-' : ''}${p.reversible && (row_num < 4 || !p.only_required_jumpers) ? (net_silk_back_left.length > 2 ? 1.45 : 2.04) : 4.47} ${-12.7 + row_offset_y} ${p.r}) (layer "B.SilkS")
      (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
    )
            `
          }
          if (row_num != 10 || (!p.include_extra_pins && p.reversible) || (p.include_extra_pins && invert_pins && !p.reversible) || (!p.include_extra_pins && !p.reversible)) {
            socket_row += `
    (fp_text user "${net_silk_back_right}" (at ${p.reversible ? '' : '-'}${p.reversible && (row_num < 4 || !p.only_required_jumpers) ? (net_silk_back_right.length > 2 ? 1.45 : 2.04) : 4.47} ${-12.7 + row_offset_y} ${p.r}) (layer "B.SilkS")
      (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
    )
            `
          }
        }
      }

      if (show_via_labels && (p.reversible && (row_num < 4 || !p.only_required_jumpers))) {
        socket_row += `
    ${''/* Via Labels - Front */}
    (fp_text user "${via_label_left}" (at -3.262 ${-13.5 + row_offset_y} ${p.r}) (layer "F.Fab")
      (effects (font (size 0.5 0.5) (thickness 0.08)))
    )
    (fp_text user "${via_label_right}" (at 3.262 ${-13.5 + row_offset_y} ${p.r}) (layer "F.Fab")
      (effects (font (size 0.5 0.5) (thickness 0.08)))
    )

    ${''/* Via Labels - Back */}
    (fp_text user "${via_label_left}" (at -3.262 ${-13.5 + row_offset_y} ${180 + p.r}) (layer "B.Fab")
      (effects (font (size 0.5 0.5) (thickness 0.08)) (justify mirror))
    )
    (fp_text user "${via_label_right}" (at 3.262 ${-13.5 + row_offset_y} ${180 + p.r}) (layer "B.Fab")
      (effects (font (size 0.5 0.5) (thickness 0.08)) (justify mirror))
    )
          `
      }

      return socket_row
    }
    const gen_socket_rows = (show_via_labels, show_silk_labels) => {
      const pin_names = [
        // The pin matrix below assumes PCB is mounted with the MCU
        // facing away from the PCB (reverse_mount = false) on the
        // Front side. It should be inverted for reverse_mount = true
        // or when mounted on teh Back
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
        let pin_name_left = pin_names[i][invert_pins ? 1 : 0]
        let pin_name_right = pin_names[i][invert_pins ? 0 : 1]

        const socket_row = gen_socket_row(
          i, pin_name_left, pin_name_right,
          show_via_labels, show_silk_labels
        )

        socket_rows += socket_row
      }
      // Socket silkscreen
      // P1 / D1 / P0.06 is marked according to orientation
      if (show_silk_labels == true) {
        if (p.reversible || p.show_silk_labels_on_both_sides || p.side == 'F') {
          socket_rows += `
    (fp_line (start 6.29 -14.03) (end 8.95 -14.03) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 6.29 -14.03) (end 6.29 16.57) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 6.29 16.57) (end 8.95 16.57) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -6.29 -14.03) (end -6.29 16.57) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 8.95 -14.03) (end 8.95 16.57) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -8.95 -14.03) (end -6.29 -14.03) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -8.95 -14.03) (end -8.95 16.57) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -8.95 16.57) (end -6.29 16.57) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start ${invert_pins ? '' : '-'}6.29 -11.43) (end ${invert_pins ? '' : '-'}8.95 -11.43) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
            `
        }
        if (p.reversible || p.show_silk_labels_on_both_sides || p.side == 'B') {
          socket_rows += `
    (fp_line (start -6.29 -14.03) (end -8.95 -14.03) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -6.29 -14.03) (end -6.29 16.57) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -6.29 16.57) (end -8.95 16.57) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start -8.95 -14.03) (end -8.95 16.57) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 8.95 -14.03) (end 6.29 -14.03) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 8.95 -14.03) (end 8.95 16.57) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 8.95 16.57) (end 6.29 16.57) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start 6.29 -14.03) (end 6.29 16.57) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
    (fp_line (start ${invert_pins ? (p.reversible ? '-' : '') : (p.reversible ? '' : '-')}8.95 -11.43) (end ${invert_pins ? (p.reversible ? '-' : '') : (p.reversible ? '' : '-')}6.29 -11.43) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
          `
        }
      }
      return socket_rows
    }

    const common_top = `
  (footprint "ceoloide:mcu_nice_nano"
    (layer "${p.side}.Cu")
    ${p.at}
    (property "Reference" "${p.ref}"
      (at 0 -15 ${p.r})
      (layer "${p.side}.SilkS")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15)))
    )
    (attr exclude_from_pos_files exclude_from_bom)

    ${''/* USB socket outline */}
    (fp_line (start 3.556 -18.034) (end 3.556 -16.51) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start -3.81 -16.51) (end -3.81 -18.034) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start -3.81 -18.034) (end 3.556 -18.034) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))


  ${''/* Controller outline */}
    (fp_line (start -8.89 -16.51) (end 8.89 -16.51) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start -8.89 -16.51) (end -8.89 16.57) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start 8.89 -16.51) (end 8.89 16.57) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start -8.89 16.57) (end 8.89 16.57) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    `;

    const instructions = `
    (fp_text user "R Jumpers, MCU ${!p.reverse_mount ? 'Up' : 'Down'}" (at 0 -15.245 ${p.r}) (layer "F.SilkS")
      (effects (font (size 1 1) (thickness 0.15)))
    )
    (fp_text user "L Jumpers, MCU ${!p.reverse_mount ? 'Up' : 'Down'}" (at 0 -15.245 ${p.r}) (layer "B.SilkS")
      (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
    )
    `

    const socket_rows = gen_socket_rows(
      p.show_via_labels, p.show_silk_labels
    )
    const traces = gen_traces()

    const extra_pins = `
    (pad "25" thru_hole circle (at ${invert_pins ? '' : '-'}5.08 ${-12.7 + 25.4} ${p.r}) (size 1.7 1.7) (drill 1) (layers "*.Cu" "*.Mask") ${p.P101})
    (pad "26" thru_hole circle (at ${invert_pins ? '' : '-'}2.54 ${-12.7 + 25.4} ${p.r}) (size 1.7 1.7) (drill 1) (layers "*.Cu" "*.Mask") ${p.P102})
    (pad "27" thru_hole circle (at 0 ${-12.7 + 25.4} ${p.r}) (size 1.7 1.7) (drill 1) (layers "*.Cu" "*.Mask") ${p.P107})
    `
    const extra_pins_reversible = `
    (pad "28" thru_hole circle (at ${invert_pins ? '-' : ''}5.08 ${-12.7 + 25.4} ${p.r}) (size 1.7 1.7) (drill 1) (layers "*.Cu" "*.Mask") ${p.P101})
    (pad "29" thru_hole circle (at ${invert_pins ? '-' : ''}2.54 ${-12.7 + 25.4} ${p.r}) (size 1.7 1.7) (drill 1) (layers "*.Cu" "*.Mask") ${p.P102})
    `

    const mcu_3dmodel = `
    (model ${p.mcu_3dmodel_filename}
      (offset (xyz ${p.mcu_3dmodel_xyz_offset[0]} ${p.mcu_3dmodel_xyz_offset[1]} ${p.mcu_3dmodel_xyz_offset[2]}))
      (scale (xyz ${p.mcu_3dmodel_xyz_scale[0]} ${p.mcu_3dmodel_xyz_scale[1]} ${p.mcu_3dmodel_xyz_scale[2]}))
      (rotate (xyz ${p.mcu_3dmodel_xyz_rotation[0]} ${p.mcu_3dmodel_xyz_rotation[1]} ${p.mcu_3dmodel_xyz_rotation[2]}))
    )
    `

    return `
    ${''/* Controller*/}
    ${common_top}
    ${socket_rows}
    ${p.include_extra_pins && (!p.reversible || (p.reversible && p.only_required_jumpers)) ? extra_pins : ''}
    ${p.include_extra_pins && p.reversible && p.only_required_jumpers ? extra_pins_reversible : ''}
    ${p.reversible && p.show_instructions ? instructions : ''}
    ${p.mcu_3dmodel_filename ? mcu_3dmodel : ''}
  )

  ${''/* Traces */}
  ${p.reversible && p.include_traces ? traces : ''}
    `;
  }
}

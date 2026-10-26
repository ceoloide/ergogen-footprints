// Copyright (c) 2023 Marco Massarelli
// SPDX-License-Identifier: MIT
// License: https://opensource.org/license/mit/
// Author: @Virginia2244
//
// Description:
// Elite-C header footprint, with optional reversible solder jumpers.
// Header and jumper geometry is retained from @Virginia2244. Close the
// appropriate jumper bank after choosing the mounting face; do not bridge both.
// Unjumpered GPIO rows require a matching firmware pin mapping on the other face.
// VBUS is common on both faces and does not need a jumper. The five bottom
// GPIO pads retain the fixed source mapping; they are not independently reversible.
//
// Nets:
// Header rows from top to bottom (left / right, front view):
// VBUS / VBUS; D3 / B0; D2 / GND; GND / RST; GND / VCC; D1 / F4; D0 / F5; D4 / F6; C6 / F7; D7 / B1; E6
//   / B3; B4 / B2; B5 / B6.
//
// Params:
// designator: default "MCU". Reference prefix.
// reversible: default false. Emit the alternative mounting geometry as well.
// include_labels: default true. Include the module name on silkscreen.
// include_instructions: default true. Include jumper assembly instructions in reversible mode.
// include_traces: default true. Route the reversible jumpers to their header pads and vias.
// reversible_rows: default 5. Number of leading header rows with jumpers; truncated and clamped to the
//   row count. Elite-C includes the common VBUS row in this count.
// Net defaults: D3="D3", D2="D2", D1="D1", D0="D0", D4="D4", C6="C6", D7="D7", E6="E6", B4="B4",
//   B5="B5", B0="B0", F4="F4", F5="F5", F6="F6", F7="F7", B1="B1", B3="B3", B2="B2", B6="B6",
//   VBUS="VBUS", GND="GND", RST="RST", VCC="VCC", B7="B7", D5="D5", C7="C7", F1="F1", F0="F0".

module.exports = {
  params: {
    designator: 'MCU',
    reversible: false,
    include_labels: true,
    include_instructions: true,
    include_traces: true,
    reversible_rows: 5,

    D3: { type: 'net', value: 'D3' },
    D2: { type: 'net', value: 'D2' },
    D1: { type: 'net', value: 'D1' },
    D0: { type: 'net', value: 'D0' },
    D4: { type: 'net', value: 'D4' },
    C6: { type: 'net', value: 'C6' },
    D7: { type: 'net', value: 'D7' },
    E6: { type: 'net', value: 'E6' },
    B4: { type: 'net', value: 'B4' },
    B5: { type: 'net', value: 'B5' },

    B0: { type: 'net', value: 'B0' },
    F4: { type: 'net', value: 'F4' },
    F5: { type: 'net', value: 'F5' },
    F6: { type: 'net', value: 'F6' },
    F7: { type: 'net', value: 'F7' },
    B1: { type: 'net', value: 'B1' },
    B3: { type: 'net', value: 'B3' },
    B2: { type: 'net', value: 'B2' },
    B6: { type: 'net', value: 'B6' },

    VBUS: { type: 'net', value: 'VBUS' },
    GND: { type: 'net', value: 'GND' },
    RST: { type: 'net', value: 'RST' },
    VCC: { type: 'net', value: 'VCC' },

    B7: { type: 'net', value: 'B7' },
    D5: { type: 'net', value: 'D5' },
    C7: { type: 'net', value: 'C7' },
    F1: { type: 'net', value: 'F1' },
    F0: { type: 'net', value: 'F0' },
  },
  body: p => {
    /* Putting the nets into an array so that it can be iterated through */
    const pin_nets = [
      [p.VBUS, p.VBUS],
      [p.D3, p.B0],
      [p.D2, p.GND],
      [p.GND, p.RST],
      [p.GND, p.VCC],
      [p.D1, p.F4],
      [p.D0, p.F5],
      [p.D4, p.F6],
      [p.C6, p.F7],
      [p.D7, p.B1],
      [p.E6, p.B3],
      [p.B4, p.B2],
      [p.B5, p.B6],
    ];

    // Header positions and jumper offsets, in millimetres.
    const spacing = {
      top_left_pin: { x: -7.62, y: -16.51 },
      top_right_pin: { x: 7.62, y: -16.51 },
      pin_dist: 2.54,
      total_pin_num: 26, //Must be an even number
      pin_to_male_pad: 2,
      pin_to_female_pad: 2.845,
      pin_to_via: 4.358,
    };

    // Routing corners relative to each header pad.
    const reversible_rows = Math.max(
      0,
      Math.min(spacing.total_pin_num / 2, Math.trunc(p.reversible_rows)),
    );

    const trace_spacing = {
      top_left: { x: 3.6, y: 0.85 },
      top_right: { x: 5.2, y: 0.85 },
      bottom_left: { x: 5.2, y: 0.85 },
      bottom_right: { x: 3.6, y: 0.85 },
    };

    /*Generates the through holes on sides of the microcontroller*/
    const get_thru_hole = () => {
      let thru_hole = '';
      /* Starts at the top two microcontrollers and goes down.
      It makes the nets of each pin internal if it suposed to be a reversible pin otherwise it takes from the pin_nets values.*/
      for (let i = 0; i < spacing.total_pin_num / 2; i++) {
        // Only place a pin hole for the top VCC if it reversavle
        if (i == 0) {
          thru_hole += p.reversible
            ? `(pad "${i}" thru_hole oval (at ${spacing.top_left_pin.x}  ${spacing.top_left_pin.y + i * spacing.pin_dist}  ${p.r})       (size 1.7 1.7) (drill 1) (layers "*.Cu" "*.Mask")
            ${pin_nets[i][0].str})\n`
            : ``;

          thru_hole += `(pad "${spacing.total_pin_num - 1 - i}" thru_hole oval (at ${spacing.top_right_pin.x} ${spacing.top_right_pin.y + i * spacing.pin_dist} ${180 + p.r}) (size 1.7 1.7) (drill 1) (layers "*.Cu" "*.Mask") ${pin_nets[i][1].str})\n`;
          continue;
        }
        thru_hole += `(pad "${i}"                             thru_hole oval (at ${spacing.top_left_pin.x}  ${spacing.top_left_pin.y + i * spacing.pin_dist}  ${p.r})       (size 1.7 1.7) (drill 1) (layers "*.Cu" "*.Mask") ${p.reversible && i < reversible_rows ? p.local_net(i).str : pin_nets[i][0].str})\n`;

        thru_hole += `(pad "${spacing.total_pin_num - 1 - i}" thru_hole oval (at ${spacing.top_right_pin.x} ${spacing.top_right_pin.y + i * spacing.pin_dist} ${180 + p.r}) (size 1.7 1.7) (drill 1) (layers "*.Cu" "*.Mask") ${p.reversible && i < reversible_rows ? p.local_net(spacing.total_pin_num - 1 - i).str : pin_nets[i][1].str})\n`;
      }
      return thru_hole;
    };

    /* Adds the bottom row of pins */
    const through_hole_bottom = `
      (pad "30"  thru_hole oval  (at -5.08 13.97 ${p.r}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${p.B7.str})
      (pad "29"  thru_hole oval  (at -2.54 13.97 ${p.r}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${p.D5.str})
      (pad "28"  thru_hole oval  (at  0    13.97 ${p.r}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${p.C7.str})
      (pad "27"  thru_hole oval  (at  2.54 13.97 ${p.r}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${p.F1.str})
      (pad "26"  thru_hole oval  (at  5.08 13.97 ${p.r}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${p.F0.str})
`;

    // Jumper geometry adapted by @Virginia2244 from @infused-kim.
    const male_pad = `
      (zone_connect 2)
      (options (clearance outline) (anchor rect))
      (primitives
        (gr_poly
          (pts
            (xy -0.5 -0.625)
            (xy -0.25 -0.625)
            (xy 0.25 0)
            (xy -0.25 0.625)
            (xy -0.5 0.625)
          )
          (width 0) (fill yes))
        )
      )\n`;
    const female_pad = `
      (zone_connect 2)
      (options (clearance outline) (anchor rect))
      (primitives
        (gr_poly
          (pts
            (xy -0.65 -0.625)
            (xy 0.5 -0.625)
            (xy 0.5 0.625)
            (xy -0.65 0.625)
            (xy -0.15 0)
          )
          (width 0) (fill yes))
        )
      )\n`;

    /*This generates all of the solder pads that make the reversible footprints possible.*/
    const get_solder_pads = () => {
      let solder_pads = '';

      /*It starts with making the first row then iterates down.
      Front means the front layer of the pcb while back means the back layer of the pcb.
      left and right mean the left and right side of the microcontroller*/
      for (let i = 1; i < reversible_rows; i++) {
        //Left VIAS
        solder_pads += `\t\t(pad "N${i}" thru_hole circle (at ${spacing.top_left_pin.x + spacing.pin_to_via} ${spacing.top_left_pin.y + i * spacing.pin_dist} ${p.r}) (size 0.8 0.8) (drill 0.4) (layers "*.Cu" "*.Mask") ${pin_nets[i][0].str})\n`;

        //Left Front male
        solder_pads += `\t\t(pad "${i}" smd custom (at ${spacing.top_left_pin.x + spacing.pin_to_male_pad} ${spacing.top_left_pin.y + i * spacing.pin_dist} ${p.r}) (size 0.2 0.2) (layers "F.Cu" "F.Mask") ${p.local_net(i).str}`;
        solder_pads += male_pad;

        //Left Front female
        solder_pads += `\t\t(pad "N${spacing.total_pin_num - 1 - i}" smd custom (at ${spacing.top_left_pin.x + spacing.pin_to_female_pad} ${spacing.top_left_pin.y + i * spacing.pin_dist} ${p.r}) (size 0.2 0.2) (layers "F.Cu" "F.Mask") ${pin_nets[i][1].str}`;
        solder_pads += female_pad;

        //Left Back male
        solder_pads += `\t\t(pad "${i}" smd custom (at ${spacing.top_left_pin.x + spacing.pin_to_male_pad} ${spacing.top_left_pin.y + i * spacing.pin_dist} ${p.r}) (size 0.2 0.2) (layers "B.Cu" "B.Mask") ${p.local_net(i).str}`;
        solder_pads += male_pad;

        //Left Back female
        solder_pads += `\t\t(pad "N${i}" smd custom (at ${spacing.top_left_pin.x + spacing.pin_to_female_pad} ${spacing.top_left_pin.y + i * spacing.pin_dist} ${p.r}) (size 0.2 0.2) (layers "B.Cu" "B.Mask") ${pin_nets[i][0].str}`;
        solder_pads += female_pad;

        //Right VIAS
        solder_pads += `\t\t(pad "N${spacing.total_pin_num - 1 - i}" thru_hole circle (at ${spacing.top_right_pin.x - spacing.pin_to_via} ${spacing.top_right_pin.y + i * spacing.pin_dist} ${p.r}) (size 0.8 0.8) (drill 0.4) (layers "*.Cu" "*.Mask") ${pin_nets[i][1].str})\n`;

        //Right Back male
        solder_pads += `\t\t(pad "${spacing.total_pin_num - 1 - i}" smd custom (at ${spacing.top_right_pin.x - spacing.pin_to_male_pad} ${spacing.top_right_pin.y + i * spacing.pin_dist} ${180 + p.r}) (size 0.2 0.2) (layers "B.Cu" "B.Mask") ${p.local_net(spacing.total_pin_num - 1 - i).str}`;
        solder_pads += male_pad;

        //Right Back female
        solder_pads += `\t\t(pad "N${spacing.total_pin_num - 1 - i}" smd custom (at ${spacing.top_right_pin.x - spacing.pin_to_female_pad} ${spacing.top_right_pin.y + i * spacing.pin_dist} ${180 + p.r}) (size 0.2 0.2) (layers "B.Cu" "B.Mask") ${pin_nets[i][1].str}`;
        solder_pads += female_pad;

        //Right Front female
        solder_pads += `\t\t(pad "N${i}" smd custom (at ${spacing.top_right_pin.x - spacing.pin_to_female_pad} ${spacing.top_right_pin.y + i * spacing.pin_dist} ${180 + p.r}) (size 0.2 0.2) (layers "F.Cu" "F.Mask") ${pin_nets[i][0].str}`;
        solder_pads += female_pad;

        //Right Front male
        solder_pads += `\t\t(pad "${spacing.total_pin_num - 1 - i}" smd custom (at ${spacing.top_right_pin.x - spacing.pin_to_male_pad} ${spacing.top_right_pin.y + i * spacing.pin_dist} ${180 + p.r}) (size 0.2 0.2) (layers "F.Cu" "F.Mask") ${p.local_net(spacing.total_pin_num - 1 - i).str}`;
        solder_pads += male_pad;
      }
      return solder_pads;
    };

    // Jumper geometry adapted by @Virginia2244 from @infused-kim.
    const get_traces = () => {
      let traces = ``;
      /*Starts by generating all of the traces for one row, then iterates down all of the pins.*/
      for (let i = 1; i < reversible_rows; i++) {
        /* Left pin to Right male pad F and B*/
        traces += `\t(segment (start ${p.eaxy(spacing.top_left_pin.x + spacing.pin_to_male_pad, spacing.top_left_pin.y + i * spacing.pin_dist)}) (end ${p.eaxy(spacing.top_left_pin.x, spacing.top_left_pin.y + i * spacing.pin_dist)}) (width 0.25) (layer "F.Cu") (net ${p.local_net(i).index}))`;
        traces += `\t(segment (start ${p.eaxy(spacing.top_left_pin.x + spacing.pin_to_male_pad, spacing.top_left_pin.y + i * spacing.pin_dist)}) (end ${p.eaxy(spacing.top_left_pin.x, spacing.top_left_pin.y + i * spacing.pin_dist)}) (width 0.25) (layer "B.Cu") (net ${p.local_net(i).index}))`;
        /* Right pin to Right male pad F and B*/
        traces += `\t(segment (start ${p.eaxy(spacing.top_right_pin.x - spacing.pin_to_male_pad, spacing.top_right_pin.y + i * spacing.pin_dist)}) (end ${p.eaxy(spacing.top_right_pin.x, spacing.top_right_pin.y + i * spacing.pin_dist)}) (width 0.25) (layer "F.Cu") (net ${p.local_net(spacing.total_pin_num - 1 - i).index}))`;
        traces += `\t(segment (start ${p.eaxy(spacing.top_right_pin.x - spacing.pin_to_male_pad, spacing.top_right_pin.y + i * spacing.pin_dist)}) (end ${p.eaxy(spacing.top_right_pin.x, spacing.top_right_pin.y + i * spacing.pin_dist)}) (width 0.25) (layer "B.Cu") (net ${p.local_net(spacing.total_pin_num - 1 - i).index}))`;

        /*Left female pad to right via F*/
        traces += `\t(segment (start ${p.eaxy(spacing.top_left_pin.x + spacing.pin_to_female_pad, spacing.top_left_pin.y + i * spacing.pin_dist)}) (end ${p.eaxy(spacing.top_left_pin.x + trace_spacing.top_left.x, spacing.top_left_pin.y - trace_spacing.top_left.y + i * spacing.pin_dist)}) (width 0.25) (layer "F.Cu") (net ${pin_nets[i][1].index}))`;
        traces += `\t(segment (start ${p.eaxy(spacing.top_left_pin.x + trace_spacing.top_left.x, spacing.top_left_pin.y - trace_spacing.top_left.y + i * spacing.pin_dist)}) (end ${p.eaxy(spacing.top_right_pin.x - trace_spacing.top_right.x, spacing.top_right_pin.y - trace_spacing.top_right.y + i * spacing.pin_dist)}) (width 0.25) (layer "F.Cu") (net ${pin_nets[i][1].index}))`;
        traces += `\t(segment (start ${p.eaxy(spacing.top_right_pin.x - trace_spacing.top_right.x, spacing.top_right_pin.y - trace_spacing.top_right.y + i * spacing.pin_dist)}) (end ${p.eaxy(spacing.top_right_pin.x - spacing.pin_to_via, spacing.top_right_pin.y + i * spacing.pin_dist)})  (width 0.25) (layer "F.Cu") (net ${pin_nets[i][1].index}))`;

        /*Right female pad to left via F*/
        traces += `\t(segment (start ${p.eaxy(spacing.top_right_pin.x - spacing.pin_to_female_pad, spacing.top_right_pin.y + i * spacing.pin_dist)})   (end ${p.eaxy(spacing.top_right_pin.x - trace_spacing.bottom_right.x, spacing.top_right_pin.y + trace_spacing.bottom_right.y + i * spacing.pin_dist)})   (width 0.25) (layer "F.Cu") (net ${pin_nets[i][0].index}))`;
        traces += `\t(segment (start ${p.eaxy(spacing.top_right_pin.x - trace_spacing.bottom_right.x, spacing.top_right_pin.y + trace_spacing.bottom_right.y + i * spacing.pin_dist)})   (end ${p.eaxy(spacing.top_left_pin.x + trace_spacing.bottom_left.x, spacing.top_left_pin.y + trace_spacing.bottom_left.y + i * spacing.pin_dist)}) (width 0.25) (layer "F.Cu") (net ${pin_nets[i][0].index}))`;
        traces += `\t(segment (start ${p.eaxy(spacing.top_left_pin.x + trace_spacing.bottom_left.x, spacing.top_left_pin.y + trace_spacing.bottom_left.y + i * spacing.pin_dist)}) (end ${p.eaxy(spacing.top_left_pin.x + spacing.pin_to_via, spacing.top_left_pin.y + i * spacing.pin_dist)})  (width 0.25) (layer "F.Cu") (net ${pin_nets[i][0].index}))`;

        /*Left female pad to left via B*/
        traces += `\t(segment (start ${p.eaxy(spacing.top_left_pin.x + spacing.pin_to_female_pad, spacing.top_left_pin.y + i * spacing.pin_dist)}) (end ${p.eaxy(spacing.top_left_pin.x + spacing.pin_to_via, spacing.top_left_pin.y + i * spacing.pin_dist)}) (width 0.25) (layer "B.Cu") (net ${pin_nets[i][0].index}))`;

        /*Right female pad to right via B*/
        traces += `\t(segment (start ${p.eaxy(spacing.top_right_pin.x - spacing.pin_to_female_pad, spacing.top_right_pin.y + i * spacing.pin_dist)}) (end ${p.eaxy(spacing.top_right_pin.x - spacing.pin_to_via, spacing.top_right_pin.y + i * spacing.pin_dist)}) (width 0.25) (layer "B.Cu") (net ${pin_nets[i][1].index}))`;
      }
      return traces;
    };

    /* Adding labels on the front side of the pcb */
    const labels_front = `

      (fp_text user "elite-c" (at 0 -20 ${p.r}) (layer "F.SilkS")
        (effects (font (size 1 1) (thickness 0.15)))
      )
      `;

    /* Adds labels on the back side of the pcb */
    const labels_back = `

      (fp_text user "elite-c" (at 0 -20 ${p.r}) (layer "B.SilkS")
        (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
      )
      `;

    /* Instructions about which side the solder should be on. */
    const instructions = `
          (fp_text user "R. Side - Jumper Here" (at 0 18 ${p.r}) (layer "F.SilkS")
            (effects (font (size 1 1) (thickness 0.15)))
          )
          (fp_text user "L. Side - Jumper Here" (at 0 18 ${p.r}) (layer "B.SilkS")
            (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
          )
      `;

    /* Code for the reversible footprints */
    const standard = `
      (footprint "ceoloide:mcu_elite_c" ${p.at} (layer "F.Cu")

      (fp_line (start 8.89 -15.24) (end 8.89 15.24) (layer "F.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start 8.89 15.24) (end -8.89 15.24) (layer "F.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start -8.89 15.24) (end -8.89 -15.24) (layer "F.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start 6.35 -15.24) (end 6.35 -12.7) (layer "F.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start 6.35 -12.7) (end 8.89 -12.7) (layer "F.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start -8.89 15.24) (end -8.89 -17.78) (layer "B.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start 8.89 15.24) (end -8.89 15.24) (layer "B.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start 8.89 -17.78) (end 8.89 15.24) (layer "B.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start -8.89 -17.78) (end 8.89 -17.78) (layer "B.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start -8.89 -15.24) (end -8.89 -17.78) (layer "F.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start -8.89 -17.78) (end 8.89 -17.78) (layer "F.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start 8.89 -17.78) (end 8.89 -15.24) (layer "F.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start -3.556 -14.224) (end 3.81 -14.224) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
      (fp_line (start 3.81 -14.224) (end 3.81 -19.304) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
      (fp_line (start 3.81 -19.304) (end -3.556 -19.304) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
      (fp_line (start -3.556 -19.304) (end -3.556 -14.224) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
      (fp_line (start 6.35 -15.24) (end 8.89 -15.24) (layer "B.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start 6.35 -15.24) (end 8.89 -15.24) (layer "F.SilkS") (stroke (width 0.381) (type solid)))


${get_thru_hole()}
${through_hole_bottom}
`;

    /* The code for the reversible footprint */
    const reversible_text = `
      (footprint "ceoloide:mcu_elite_c" ${p.at} (layer "F.Cu")


      (fp_line (start 8.89 -15.24) (end 8.89 15.24) (layer "F.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start 8.89 15.24) (end -8.89 15.24) (layer "F.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start -8.89 15.24) (end -8.89 -15.24) (layer "F.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start 6.35 -15.24) (end 6.35 -12.7) (layer "F.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start 6.35 -12.7) (end 8.89 -12.7) (layer "F.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start -8.89 15.24) (end -8.89 -17.78) (layer "B.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start 8.89 15.24) (end -8.89 15.24) (layer "B.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start 8.89 -17.78) (end 8.89 15.24) (layer "B.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start -8.89 -17.78) (end 8.89 -17.78) (layer "B.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start -8.89 -15.24) (end -8.89 -17.78) (layer "F.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start -8.89 -17.78) (end 8.89 -17.78) (layer "F.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start 8.89 -17.78) (end 8.89 -15.24) (layer "F.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start -3.556 -14.224) (end 3.81 -14.224) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
      (fp_line (start 3.81 -14.224) (end 3.81 -19.304) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
      (fp_line (start 3.81 -19.304) (end -3.556 -19.304) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
      (fp_line (start -3.556 -19.304) (end -3.556 -14.224) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
      (fp_line (start 6.35 -15.24) (end 8.89 -15.24) (layer "B.SilkS") (stroke (width 0.381) (type solid)))
      (fp_line (start 6.35 -15.24) (end 8.89 -15.24) (layer "F.SilkS") (stroke (width 0.381) (type solid)))

    ${get_thru_hole()}
    ${through_hole_bottom}


    ${get_solder_pads()}


    ${p.include_labels ? labels_back : ''}


    ${p.reversible && p.include_instructions ? instructions : ''}

      `;

    return `
        ${p.reversible ? reversible_text : standard}
        ${p.include_labels ? labels_front : ''}
      (property "Reference" "${p.ref}" (at 0 -22 ${p.r}) (layer "F.SilkS") ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15))))
				)
        ${p.include_traces ? (p.reversible ? get_traces() : '') : ''}
      `;
  },
};

// Copyright (c) 2023 Marco Massarelli
// SPDX-License-Identifier: MIT
// License: https://opensource.org/license/mit/
// Author: @Virginia2244
//
// Description:
// Seeed XIAO header footprint, with optional reversible solder jumpers.
// Header and jumper geometry is retained from @Virginia2244. Close the
// appropriate jumper bank after choosing the mounting face; do not bridge both.
// Unjumpered GPIO rows require a matching firmware pin mapping on the other face.
//
// Nets:
// Header rows from top to bottom (left / right, front view):
// P0 / VCC; P1 / GND; P2 / V3; P3 / P10; P4 / P9; P5 / P8; P6 / P7.
//
// Params:
// designator: default "MCU". Reference prefix.
// reversible: default false. Emit the alternative mounting geometry as well.
// include_labels: default true. Include the module name on silkscreen.
// include_instructions: default true. Include jumper assembly instructions in reversible mode.
// include_traces: default true. Route the reversible jumpers to their header pads and vias.
// reversible_rows: default 3. Number of leading header rows with jumpers; truncated and clamped to the
//   row count.
// Net defaults: P0="P0", P1="P1", P2="P2", P3="P3", P4="P4", P5="P5", P6="P6", P7="P7", P8="P8",
//   P9="P9", P10="P10", VCC="VCC", GND="GND", V3="V3".

module.exports = {
  params: {
    designator: 'MCU',
    reversible: false,
    include_labels: true,
    include_instructions: true,
    include_traces: true,
    reversible_rows: 3,
    P0: { type: 'net', value: 'P0' },
    P1: { type: 'net', value: 'P1' },
    P2: { type: 'net', value: 'P2' },
    P3: { type: 'net', value: 'P3' },
    P4: { type: 'net', value: 'P4' },
    P5: { type: 'net', value: 'P5' },
    P6: { type: 'net', value: 'P6' },
    P7: { type: 'net', value: 'P7' },
    P8: { type: 'net', value: 'P8' },
    P9: { type: 'net', value: 'P9' },
    P10: { type: 'net', value: 'P10' },
    VCC: { type: 'net', value: 'VCC' },
    GND: { type: 'net', value: 'GND' },
    V3: { type: 'net', value: 'V3' },
  },
  body: p => {
    /* Putting the nets into an array so that it can be iterated through */
    const pin_nets = [
      [p.P0, p.VCC],
      [p.P1, p.GND],
      [p.P2, p.V3],
      [p.P3, p.P10],
      [p.P4, p.P9],
      [p.P5, p.P8],
      [p.P6, p.P7],
    ];

    // Header positions and jumper offsets, in millimetres.
    const spacing = {
      top_left_pin: { x: -7.62, y: -7.62 },
      top_right_pin: { x: 7.62, y: -7.62 },
      pin_dist: 2.54,
      total_pin_num: 14, // Must be divisible by 2
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

    /*Generates all of the through holes on the microcontroller*/
    const get_thru_hole = () => {
      let thru_hole = '';
      /* Starts at the top two microcontrollers and goes down.
      It makes the nets internal if it reversible and straight to the pin_nets if not.*/
      for (let i = 0; i < spacing.total_pin_num / 2; i++) {
        thru_hole += `(pad "${i}"                             thru_hole oval (at ${spacing.top_left_pin.x}  ${spacing.top_left_pin.y + i * spacing.pin_dist}  ${p.r})       (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers "*.Cu" "*.Mask") ${p.reversible ? p.local_net(i).str : pin_nets[i][0].str})\n`;
        thru_hole += `(pad "${spacing.total_pin_num - 1 - i}" thru_hole oval (at ${spacing.top_right_pin.x} ${spacing.top_right_pin.y + i * spacing.pin_dist} ${180 + p.r}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers "*.Cu" "*.Mask") ${p.reversible ? p.local_net(spacing.total_pin_num - 1 - i).str : pin_nets[i][1].str})\n`;
      }
      return thru_hole;
    };

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
      for (let i = 0; i < spacing.total_pin_num / 2; i++) {
        if (i < reversible_rows) {
          //Through holes
          solder_pads += `(pad "${i}"                             thru_hole oval (at ${spacing.top_left_pin.x}  ${spacing.top_left_pin.y + i * spacing.pin_dist}  ${p.r})       (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers "*.Cu" "*.Mask") ${p.local_net(i).str})\n`;
          solder_pads += `(pad "${spacing.total_pin_num - 1 - i}" thru_hole oval (at ${spacing.top_right_pin.x} ${spacing.top_right_pin.y + i * spacing.pin_dist} ${180 + p.r}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers "*.Cu" "*.Mask") ${p.local_net(spacing.total_pin_num - 1 - i).str})\n`;

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
        } else {
          //Through holes
          solder_pads += `(pad "${i}"                             thru_hole oval (at ${spacing.top_left_pin.x}  ${spacing.top_left_pin.y + i * spacing.pin_dist}  ${p.r})       (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers "*.Cu" "*.Mask") ${pin_nets[i][0].str})\n`;
          solder_pads += `(pad "${spacing.total_pin_num - 1 - i}" thru_hole oval (at ${spacing.top_right_pin.x} ${spacing.top_right_pin.y + i * spacing.pin_dist} ${180 + p.r}) (size 2.75 1.8) (drill 1 (offset -0.475 0)) (layers "*.Cu" "*.Mask") ${pin_nets[i][1].str})\n`;
        }
      }
      return solder_pads;
    };

    // Jumper geometry adapted by @Virginia2244 from @infused-kim.
    const get_traces = () => {
      let traces = ``;
      /*Starts by generating all of the traces for one row, then iterates down all of the pins.*/
      for (let i = 0; i < spacing.total_pin_num / 2 && i < reversible_rows; i++) {
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

    (fp_text user "XIAO" (at 0 3.5 ${p.r}) (layer "F.SilkS")
    (effects (font (size 1 1) (thickness 0.15)))
    )

    (fp_text user "Seeed" (at 0 1.5 ${p.r}) (layer "F.SilkS")
        (effects (font (size 1 1) (thickness 0.15)))
    )
    `;

    /* Adds labels on the back side of the pcb */
    const labels_back = `

    (fp_text user "XIAO" (at 0 3.5 ${p.r}) (layer "B.SilkS")
    (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
    )

    (fp_text user "Seeed" (at 0 1.5 ${p.r}) (layer "B.SilkS")
        (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
    )
    `;

    /* Instructions about which side the solder should be on. */
    const instructions = `
        (fp_text user "R. Side - Jumper Here" (at 0 11.5 ${p.r}) (layer "F.SilkS")
          (effects (font (size 1 1) (thickness 0.15)))
        )
        (fp_text user "L. Side - Jumper Here" (at 0 11.5 ${p.r}) (layer "B.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
        )
    `;

    /* Code for the reversible footprints */
    const standard = `

(footprint "ceoloide:mcu_seeed_xiao"
${p.at}
(layer "F.Cu")
(attr through_hole exclude_from_pos_files)


(fp_rect (start 4.5 -4.5) (end -4.5 -11.92403) (layer "F.SilkS") (fill none) (stroke (width 0.127) (type solid)))


(fp_line (start 8.9 8.5) (end 8.9 -8.5) (layer "F.SilkS") (stroke (width 0.127) (type solid)))
(fp_line (start -8.9 -8.5) (end -8.9 8.5) (layer "F.SilkS") (stroke (width 0.127) (type solid)))
(fp_line (start 6.9 -10.5) (end -6.9 -10.5) (layer "F.SilkS") (stroke (width 0.127) (type solid)))
(fp_line (start -6.9 10.5) (end 6.9 10.5) (layer "F.SilkS") (stroke (width 0.127) (type solid)))
(fp_arc (start -8.9 -8.5) (mid -8.3 -9.9) (end -6.9 -10.5) (stroke (width 0.127) (type solid)) (layer "F.SilkS"))
(fp_arc (start -6.9 10.5) (mid -8.3 9.9) (end -8.9 8.5) (stroke (width 0.127) (type solid)) (layer "F.SilkS"))
(fp_arc (start 6.9 -10.5) (mid 8.3 -9.9) (end 8.9 -8.5) (stroke (width 0.127) (type solid)) (layer "F.SilkS"))
(fp_arc (start 8.9 8.5) (mid 8.3 9.9) (end 6.9 10.5) (stroke (width 0.127) (type solid)) (layer "F.SilkS"))


${get_thru_hole()}

    `;

    /* The code for the reversible footprint */
    const reversible_text = `
(footprint "ceoloide:mcu_seeed_xiao"
  ${p.at}
  (layer "F.Cu")
  (attr through_hole exclude_from_pos_files)


  (fp_rect (start 4.5 -4.5) (end -4.5 -11.92403) (layer "F.SilkS") (fill none) (stroke (width 0.127) (type solid)))


  (fp_line (start 8.9 8.5) (end 8.9 -8.5) (layer "F.SilkS") (stroke (width 0.127) (type solid)))
  (fp_line (start -8.9 -8.5) (end -8.9 8.5) (layer "F.SilkS") (stroke (width 0.127) (type solid)))
  (fp_line (start 6.9 -10.5) (end -6.9 -10.5) (layer "F.SilkS") (stroke (width 0.127) (type solid)))
  (fp_line (start -6.9 10.5) (end 6.9 10.5) (layer "F.SilkS") (stroke (width 0.127) (type solid)))
  (fp_arc (start -8.9 -8.5) (mid -8.3 -9.9) (end -6.9 -10.5) (stroke (width 0.127) (type solid)) (layer "F.SilkS"))
  (fp_arc (start -6.9 10.5) (mid -8.3 9.9) (end -8.9 8.5) (stroke (width 0.127) (type solid)) (layer "F.SilkS"))
  (fp_arc (start 6.9 -10.5) (mid 8.3 -9.9) (end 8.9 -8.5) (stroke (width 0.127) (type solid)) (layer "F.SilkS"))
  (fp_arc (start 8.9 8.5) (mid 8.3 9.9) (end 6.9 10.5) (stroke (width 0.127) (type solid)) (layer "F.SilkS"))


  (fp_rect (start 4.5 -4.5) (end -4.5 -11.92403) (layer "B.SilkS") (fill none) (stroke (width 0.127) (type solid)))


  (fp_line (start 8.9 8.5) (end 8.9 -8.5) (layer "B.SilkS") (stroke (width 0.127) (type solid)))
  (fp_line (start -8.9 -8.5) (end -8.9 8.5) (layer "B.SilkS") (stroke (width 0.127) (type solid)))
  (fp_line (start 6.9 -10.5) (end -6.9 -10.5) (layer "B.SilkS") (stroke (width 0.127) (type solid)))
  (fp_line (start -6.9 10.5) (end 6.9 10.5) (layer "B.SilkS") (stroke (width 0.127) (type solid)))
  (fp_arc (start -8.9 -8.5) (mid -8.3 -9.9) (end -6.9 -10.5) (stroke (width 0.127) (type solid)) (layer "B.SilkS"))
  (fp_arc (start -6.9 10.5) (mid -8.3 9.9) (end -8.9 8.5) (stroke (width 0.127) (type solid)) (layer "B.SilkS"))
  (fp_arc (start 6.9 -10.5) (mid 8.3 -9.9) (end 8.9 -8.5) (stroke (width 0.127) (type solid)) (layer "B.SilkS"))
  (fp_arc (start 8.9 8.5) (mid 8.3 9.9) (end 6.9 10.5) (stroke (width 0.127) (type solid)) (layer "B.SilkS"))


  ${get_solder_pads()}


  ${p.include_labels ? labels_back : ''}
    `;

    return `
      ${p.reversible ? reversible_text : standard}
      ${p.include_labels ? labels_front : ''}
      (property "Reference" "${p.ref}" (at 0 -14 ${p.r}) (layer "F.SilkS") ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15))))
      ${p.reversible && p.include_instructions ? instructions : ''}
      )
      ${p.include_traces ? (p.reversible ? get_traces() : '') : ''}
    `;
  },
};

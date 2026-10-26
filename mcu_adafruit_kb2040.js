// Copyright (c) 2023 Marco Massarelli
// SPDX-License-Identifier: MIT
// License: https://opensource.org/license/mit/
// Author: @Virginia2244
//
// Description:
// Adafruit KB2040 header footprint, with optional reversible solder jumpers.
// Header and jumper geometry is retained from @Virginia2244. Close the
// appropriate jumper bank after choosing the mounting face; do not bridge both.
// Unjumpered GPIO rows require a matching firmware pin mapping on the other face.
//
// Nets:
// Header rows from top to bottom (left / right, front view):
// DPOS / DMIN; TX / RAW; RX / G; GND / RST; P1 / V3; P2 / A3; P3 / A2; P4 / A1; P5 / A0; P6 / CLK; P7 /
//   MI; P8 / MO; P9 / P10.
//
// Params:
// designator: default "MCU". Reference prefix.
// reversible: default false. Emit the alternative mounting geometry as well.
// include_labels: default true. Include the module name on silkscreen.
// include_instructions: default true. Include jumper assembly instructions in reversible mode.
// include_traces: default true. Route the reversible jumpers to their header pads and vias.
// Net defaults: DPOS="DPOS", DMIN="DMIN", TX="TX", RX="RX", GND="GND", P1="P1", P2="P2", P3="P3",
//   P4="P4", P5="P5", P6="P6", P7="P7", P8="P8", P9="P9", RAW="RAW", G="G", RST="RST", V3="V3", A3="A3",
//   A2="A2", A1="A1", A0="A0", CLK="CLK", MI="MI", MO="MO", P10="P10".

module.exports = {
  params: {
    designator: 'MCU',
    reversible: false,
    include_labels: true,
    include_instructions: true,
    include_traces: true,

    DPOS: { type: 'net', value: 'DPOS' },
    DMIN: { type: 'net', value: 'DMIN' },
    TX: { type: 'net', value: 'TX' },
    RX: { type: 'net', value: 'RX' },
    GND: { type: 'net', value: 'GND' },
    P1: { type: 'net', value: 'P1' },
    P2: { type: 'net', value: 'P2' },
    P3: { type: 'net', value: 'P3' },
    P4: { type: 'net', value: 'P4' },
    P5: { type: 'net', value: 'P5' },
    P6: { type: 'net', value: 'P6' },
    P7: { type: 'net', value: 'P7' },
    P8: { type: 'net', value: 'P8' },
    P9: { type: 'net', value: 'P9' },

    RAW: { type: 'net', value: 'RAW' },
    G: { type: 'net', value: 'G' },
    RST: { type: 'net', value: 'RST' },
    V3: { type: 'net', value: 'V3' },
    A3: { type: 'net', value: 'A3' },
    A2: { type: 'net', value: 'A2' },
    A1: { type: 'net', value: 'A1' },
    A0: { type: 'net', value: 'A0' },
    CLK: { type: 'net', value: 'CLK' },
    MI: { type: 'net', value: 'MI' },
    MO: { type: 'net', value: 'MO' },
    P10: { type: 'net', value: 'P10' },
  },
  body: p => {
    /* Putting the nets into an array so that it can be iterated through */
    const pin_nets = [
      [p.DPOS, p.DMIN],
      [p.TX, p.RAW],
      [p.RX, p.G],
      [p.GND, p.RST],
      [p.P1, p.V3],
      [p.P2, p.A3],
      [p.P3, p.A2],
      [p.P4, p.A1],
      [p.P5, p.A0],
      [p.P6, p.CLK],
      [p.P7, p.MI],
      [p.P8, p.MO],
      [p.P9, p.P10],
    ];

    // Header positions and jumper offsets, in millimetres.
    const spacing = {
      top_left_pin: { x: -7.62, y: -15.23 },
      top_right_pin: { x: 7.62, y: -15.23 },
      pin_dist: 2.54,
      total_pin_num: 26,
      pin_to_male_pad: 2,
      pin_to_female_pad: 2.845,
      pin_to_via: 4.358,
    };

    // Routing corners relative to each header pad.
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
        thru_hole += `(pad "${i}"                             thru_hole oval (at ${spacing.top_left_pin.x}  ${spacing.top_left_pin.y + i * spacing.pin_dist}  ${p.r})       (size 1.7 1.7) (drill 1) (layers "*.Cu" "*.Mask") ${p.reversible ? p.local_net(i).str : pin_nets[i][0].str})\n`;
        thru_hole += `(pad "${spacing.total_pin_num - 1 - i}" thru_hole oval (at ${spacing.top_right_pin.x} ${spacing.top_right_pin.y + i * spacing.pin_dist} ${180 + p.r}) (size 1.7 1.7) (drill 1) (layers "*.Cu" "*.Mask") ${p.reversible ? p.local_net(spacing.total_pin_num - 1 - i).str : pin_nets[i][1].str})\n`;
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
      for (let i = 0; i < spacing.total_pin_num / 2; i++) {
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

    (fp_text user "kb2040" (at 0 -20 ${p.r}) (layer "F.SilkS")
      (effects (font (size 1 1) (thickness 0.15)))
    )
    `;

    /* Adds labels on the back side of the pcb */
    const labels_back = `

    (fp_text user "kb2040" (at 0 -20 ${p.r}) (layer "B.SilkS")
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
    (footprint "ceoloide:mcu_adafruit_kb2040" ${p.at}
    (layer "F.Cu")
    (descr "KB2040 footprint")
    (tags "kb2040 KB2040")

    (fp_line (start -8.89 16.5) (end 8.89 16.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 8.89 16.5) (end 8.89 -16.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 8.89 -16.5) (end 3.81 -16.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 3.81 -16.5) (end 3.81 -17.78) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 3.81 -17.78) (end -3.81 -17.78) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start -3.81 -17.78) (end -3.81 -16.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start -3.81 -16.5) (end -8.89 -16.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start -8.89 -16.5) (end -8.89 16.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))


    ${get_thru_hole()}
    `;

    /* The code for the reversible footprint */
    const reversible_text = `
    (footprint "ceoloide:mcu_adafruit_kb2040" ${p.at}
    (layer "F.Cu")
    (descr "KB2040 footprint")
    (tags "kb2040 KB2040")

    (fp_line (start -8.89 16.5) (end 8.89 16.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 8.89 16.5) (end 8.89 -16.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 8.89 -16.5) (end 3.81 -16.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 3.81 -16.5) (end 3.81 -17.78) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 3.81 -17.78) (end -3.81 -17.78) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start -3.81 -17.78) (end -3.81 -16.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start -8.89 -16.5) (end -8.89 16.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start -3.81 -16.5) (end -8.89 -16.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))

    (fp_line (start -8.89 16.5) (end 8.89 16.5) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 8.89 16.5) (end 8.89 -16.5) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 8.89 -16.5) (end 3.81 -16.5) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 3.81 -16.5) (end 3.81 -17.78) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 3.81 -17.78) (end -3.81 -17.78) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start -3.81 -17.78) (end -3.81 -16.5) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start -8.89 -16.5) (end -8.89 16.5) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start -3.81 -16.5) (end -8.89 -16.5) (layer "B.SilkS") (stroke (width 0.15) (type solid)))

    ${get_thru_hole()}


    ${get_solder_pads()}


    ${p.include_labels ? labels_back : ''}


    ${p.reversible && p.include_instructions ? instructions : ''}

    `;

    return `
      ${p.reversible ? reversible_text : standard}
      ${p.include_labels ? labels_front : ''}
      (property "Reference" "${p.ref}" (at 0 -20 ${p.r}) (layer "F.SilkS") ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15))))
      )
      ${p.include_traces ? (p.reversible ? get_traces() : '') : ''}
    `;
  },
};

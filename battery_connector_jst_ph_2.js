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
//    use_3_thru_holes: false
//      if true, use three through holes instead of jumper pads for reversible PCB.
//      Only effective when reversible is true.
//      Middle pin is positive and the other two pins connect to GND. This allows choosing
//      either left or right pin to be positive on each side of the PCB.
//    housing_positive_on_left: false
//      if true, when inserting the housing into the header of the connector (and looking
//      from housing to header), the positive pin is on the left side.
//      (This is the same polarity used by Adafruit and SparkFun products.)
//    include_traces: default is true
//      if true it will include traces that connect the jumper pads to the connector pins
//    trace_width: default is 0.250mm
//      allows to override the trace width that connects the jumper pads to the connector
//      pins. Not recommended to go below 0.25mm.
//    include_silkscreen: default is true
//      if true it will include the silkscreen. Recommended to be true to ensure connector
//      polarity is not reversed, which can lead to shorting and damage to the MCU
//    include_silkscreen_on_both_sides: false
//      if true it will include the silkscreen on both sides of the PCB. Only effective
//      when reversible is false.
//    include_fabrication: default is true
//      if true it will include the outline of the connector in the fabrication layer
//    include_courtyard: default is true
//      if true it will include a courtyard outline around the connector and in front of it
//      to also account for the male connector plug and the wires. Recommended to be true
//      at least once in the development of a board to confirm sufficient clearance for the
//      connector and wires.
//    battery_connector_3dmodel_filename: default is ''
//      Allows you to specify the path to a 3D model STEP or WRL file to be
//      used when rendering the PCB. Use the ${VAR_NAME} syntax to point to
//      a KiCad configured path.
//    battery_connector_3dmodel_xyz_offset: default is [0, 0, 0]
//      xyz offset (in mm), used to adjust the position of the 3d model
//      relative the footprint.
//    battery_connector_3dmodel_xyz_scale: default is [1, 1, 1]
//      xyz scale, used to adjust the size of the 3d model relative to its
//      original size.
//    battery_connector_3dmodel_xyz_rotation: default is [0, 0, 0]
//      xyz rotation (in degrees), used to adjust the orientation of the 3d
//      model relative the footprint.

module.exports = {
  params: {
    designator: 'JST',
    side: 'F',
    reversible: false,
    use_3_thru_holes: false,
    housing_positive_on_left: false,
    include_traces: true,
    trace_width: 0.250,
    include_silkscreen: true,
    include_silkscreen_on_both_sides: false,
    include_fabrication: true,
    include_courtyard: true,
    battery_connector_3dmodel_filename: '',
    battery_connector_3dmodel_xyz_offset: [0, 0, 0],
    battery_connector_3dmodel_xyz_rotation: [0, 0, 0],
    battery_connector_3dmodel_xyz_scale: [1, 1, 1],
    BAT_P: { type: 'net', value: 'BAT_P' },
    BAT_N: { type: 'net', value: 'GND' },
  },
  body: p => {
    let local_nets = [
      p.local_net("1"),
      p.local_net("2"),
    ];

    // For variable names, housing "positive_{right,left}" is based on connector mounted on front side.
    // For back side mounting, left and right are reversed.
    const use_positive_left =
      (p.side == "F" && p.housing_positive_on_left) ||
      (p.side == "B" && !p.housing_positive_on_left);

    const standard_opening = `
    (footprint "ceoloide:battery_connector_jst_ph_2"
        (layer "${p.side}.Cu")
        ${p.at}
        (property "Reference" "${p.ref}"
            (at 0 4.8 ${p.r})
            (layer "${p.side}.SilkS")
            ${p.ref_hide}
            (effects (font (size 1 1) (thickness 0.15)))
        )
        `
    // offset is for using 3 thru holes for reversible PCB. The connector's mount position is different on each side.
    const fabrication = (side, offset = 0) => `
        (fp_line (start ${-2.95 + offset} -1.35) (end ${-2.95 + offset} 6.25) (stroke (width 0.1) (type solid)) (layer "${side}.Fab"))
        (fp_line (start ${-2.95 + offset} 6.25) (end ${2.95 + offset} 6.25) (stroke (width 0.1) (type solid)) (layer "${side}.Fab"))
        (fp_line (start ${-2.25 + offset} -1.35) (end ${-2.95 + offset} -1.35) (stroke (width 0.1) (type solid)) (layer "${side}.Fab"))
        (fp_line (start ${-2.25 + offset} 0.25) (end ${-2.25 + offset} -1.35) (stroke (width 0.1) (type solid)) (layer "${side}.Fab"))
        (fp_line (start ${2.25 + offset} -1.35) (end ${2.25 + offset} 0.25) (stroke (width 0.1) (type solid)) (layer "${side}.Fab"))
        (fp_line (start ${2.25 + offset} 0.25) (end ${-2.25 + offset} 0.25) (stroke (width 0.1) (type solid)) (layer "${side}.Fab"))
        (fp_line (start ${2.95 + offset} -1.35) (end ${2.25 + offset} -1.35) (stroke (width 0.1) (type solid)) (layer "${side}.Fab"))
        (fp_line (start ${2.95 + offset} 6.25) (end ${2.95 + offset} -1.35) (stroke (width 0.1) (type solid)) (layer "${side}.Fab"))
        `
    const courtyard = (side, offset = 0) => `
        (fp_line (start ${-3.45 + offset} -1.85) (end ${-3.45 + offset} 10.5) (stroke (width 0.05) (type solid)) (layer "${side}.CrtYd"))
        (fp_line (start ${-3.45 + offset} 10.5) (end ${3.45 + offset} 10.5) (stroke (width 0.05) (type solid)) (layer "${side}.CrtYd"))
        (fp_line (start ${3.45 + offset} -1.85) (end ${-3.45 + offset} -1.85) (stroke (width 0.05) (type solid)) (layer "${side}.CrtYd"))
        (fp_line (start ${3.45 + offset} 10.5) (end ${3.45 + offset} -1.85) (stroke (width 0.05) (type solid)) (layer "${side}.CrtYd"))
        `
    // This draws four corners of a square for the connector.
    const silkscreen_common = (side, offset = 0) => `
        (fp_line (start ${-2.06 + offset} -1.46) (end ${-3.06 + offset} -1.46) (stroke (width 0.12) (type solid)) (layer "${side}.SilkS"))
        (fp_line (start ${-3.06 + offset} -1.46) (end ${-3.06 + offset} -0.46) (stroke (width 0.12) (type solid)) (layer "${side}.SilkS"))
        (fp_line (start ${2.14 + offset} -1.46) (end ${3.06 + offset} -1.46) (stroke (width 0.12) (type solid)) (layer "${side}.SilkS"))
        (fp_line (start ${3.06 + offset} -1.46) (end ${3.06 + offset} -0.46) (stroke (width 0.12) (type solid)) (layer "${side}.SilkS"))
        (fp_line (start ${-2.14 + offset} 6.36) (end ${-3.06 + offset} 6.36) (stroke (width 0.12) (type solid)) (layer "${side}.SilkS"))
        (fp_line (start ${-3.06 + offset} 6.36) (end ${-3.06 + offset} 5.36) (stroke (width 0.12) (type solid)) (layer "${side}.SilkS"))
        (fp_line (start ${2.14 + offset} 6.36) (end ${3.06 + offset} 6.36) (stroke (width 0.12) (type solid)) (layer "${side}.SilkS"))
        (fp_line (start ${3.06 + offset} 6.36) (end ${3.06 + offset} 5.36) (stroke (width 0.12) (type solid)) (layer "${side}.SilkS"))
      `
    const positive_right_silkscreen = (side, offset = 0) => {
      return `
        (fp_line (start ${1 + offset} 6.90) (end ${1 + offset} 7.90) (stroke (width 0.1) (type solid)) (layer "${side}.SilkS"))
        (fp_line (start ${1.5 + offset} 7.40) (end ${0.5 + offset} 7.40) (stroke (width 0.1) (type solid)) (layer "${side}.SilkS"))
        (fp_line (start ${-1.5 + offset} 7.40) (end ${-0.5 + offset} 7.40) (stroke (width 0.1) (type solid)) (layer "${side}.SilkS"))
        ${silkscreen_common(side, offset)}
        `
    }
    const positive_left_silkscreen = (side, offset = 0) => {
      return `
        (fp_line (start ${-1 + offset} 6.90) (end ${-1 + offset} 7.90) (stroke (width 0.1) (type solid)) (layer "${side}.SilkS"))
        (fp_line (start ${-1.5 + offset} 7.40) (end ${-0.5 + offset} 7.40) (stroke (width 0.1) (type solid)) (layer "${side}.SilkS"))
        (fp_line (start ${1.5 + offset} 7.40) (end ${0.5 + offset} 7.40) (stroke (width 0.1) (type solid)) (layer "${side}.SilkS"))
        ${silkscreen_common(side, offset)}
        `
    }
    const positive_right_pad_2nd_gnd = p.reversible && p.use_3_thru_holes
      ? `(pad "3" thru_hole roundrect (at 3 0 ${p.r}) (size 1.2 1.75) (drill 0.75) (layers "*.Cu" "*.Mask") (roundrect_rratio 0.20) ${p.BAT_N.str})`
      : ``
    const positive_right_pads = `
        (pad "1" thru_hole roundrect (at -1 0 ${p.r}) (size 1.2 1.75) (drill 0.75) (layers "*.Cu" "*.Mask") (roundrect_rratio 0.20) ${p.BAT_N.str})
        (pad "2" thru_hole oval (at 1 0 ${p.r}) (size 1.2 1.75) (drill 0.75) (layers "*.Cu" "*.Mask") ${p.BAT_P.str})
        ${positive_right_pad_2nd_gnd}
        `
    const positive_left_pad_2nd_gnd = p.reversible && p.use_3_thru_holes
      ? `(pad "3" thru_hole roundrect (at -3 0 ${p.r}) (size 1.2 1.75) (drill 0.75) (layers "*.Cu" "*.Mask") (roundrect_rratio 0.20) ${p.BAT_N.str})`
      : ``
    const positive_left_pads = `
        (pad "1" thru_hole roundrect (at 1 0 ${p.r}) (size 1.2 1.75) (drill 0.75) (layers "*.Cu" "*.Mask") (roundrect_rratio 0.20) ${p.BAT_N.str})
        (pad "2" thru_hole oval (at -1 0 ${p.r}) (size 1.2 1.75) (drill 0.75) (layers "*.Cu" "*.Mask") ${p.BAT_P.str})
        ${positive_left_pad_2nd_gnd}
        `
    const reversible_pads = `
        (pad "11" thru_hole oval (at -1 0 ${p.r}) (size 1.2 1.75) (drill 0.75) (layers "*.Cu" "*.Mask") ${local_nets[0].str})
        (pad "12" thru_hole oval (at 1 0 ${p.r}) (size 1.2 1.75) (drill 0.75) (layers "*.Cu" "*.Mask") ${local_nets[1].str})
        (pad "21" smd custom (at -1 1.8 ${180 + p.r}) (size 0.1 0.1) (layers "F.Cu" "F.Mask" "F.Paste")
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
                    (width 0)
                    (fill yes)
                )
            )
            ${local_nets[0]}
        )
        (pad "31" smd custom (at -1 1.8 ${180 + p.r}) (size 0.1 0.1) (layers "B.Cu" "B.Mask" "B.Paste")
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
                    (width 0)
                    (fill yes)
                )
            )
            ${local_nets[0]}
        )
        (pad "22" smd custom (at 1 1.8 ${180 + p.r}) (size 0.1 0.1) (layers "F.Cu" "F.Mask" "F.Paste")
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
                    (width 0)
                    (fill yes)
                )
            )
            ${local_nets[1]}
        )
        (pad "32" smd custom (at 1 1.8 ${180 + p.r}) (size 0.1 0.1) (layers "B.Cu" "B.Mask" "B.Paste")
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
                    (width 0)
                    (fill yes)
                )
            )
            ${local_nets[1]}
        )
        (pad "1" smd custom (at -1 2.816 ${180 + p.r}) (size 1.2 0.5) (layers "F.Cu" "F.Mask" "F.Paste") ${use_positive_left ? p.BAT_P.str : p.BAT_N.str}
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
                    (width 0)
                    (fill yes)
                )
            )
        )
        (pad "1" smd custom (at 1 2.816 ${180 + p.r}) (size 1.2 0.5) (layers "B.Cu" "B.Mask" "B.Paste") ${use_positive_left ? p.BAT_P.str : p.BAT_N.str}
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
                    (width 0)
                    (fill yes)
                )
            )
        )
        (pad "2" smd custom (at -1 2.816 ${180 + p.r}) (size 1.2 0.5) (layers "B.Cu" "B.Mask" "B.Paste") ${use_positive_left ? p.BAT_N.str : p.BAT_P.str}
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
                    (width 0)
                    (fill yes)
                )
            )
        )
        (pad "2" smd custom (at 1 2.816 ${180 + p.r}) (size 1.2 0.5) (layers "F.Cu" "F.Mask" "F.Paste") ${use_positive_left ? p.BAT_N.str : p.BAT_P.str}
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
                    (width 0)
                    (fill yes)
                )
            ) 
        )
        `
    const standard_closing = `
    )
        `

    const reversible_traces = ` 
    (segment (start ${p.eaxy(-1, 1.8)}) (end ${p.eaxy(-1, 0)}) (width ${p.trace_width}) (layer "F.Cu") (net ${local_nets[0].index}))
    (segment (start ${p.eaxy(-1, 1.8)}) (end ${p.eaxy(-1, 0)}) (width ${p.trace_width}) (layer "B.Cu") (net ${local_nets[0].index}))
    (segment (start ${p.eaxy(1, 1.8)}) (end ${p.eaxy(1, 0)}) (width ${p.trace_width}) (layer "F.Cu") (net ${local_nets[1].index}))
    (segment (start ${p.eaxy(1, 1.8)}) (end ${p.eaxy(1, 0)}) (width ${p.trace_width}) (layer "B.Cu") (net ${local_nets[1].index}))
        `

    const battery_connector_3dmodel = `
    (model ${p.battery_connector_3dmodel_filename}
      (offset (xyz ${p.battery_connector_3dmodel_xyz_offset[0]} ${p.battery_connector_3dmodel_xyz_offset[1]} ${p.battery_connector_3dmodel_xyz_offset[2]}))
      (scale (xyz ${p.battery_connector_3dmodel_xyz_scale[0]} ${p.battery_connector_3dmodel_xyz_scale[1]} ${p.battery_connector_3dmodel_xyz_scale[2]}))
      (rotate (xyz ${p.battery_connector_3dmodel_xyz_rotation[0]} ${p.battery_connector_3dmodel_xyz_rotation[1]} ${p.battery_connector_3dmodel_xyz_rotation[2]}))
    )
    `

    let final = standard_opening;

    if (p.include_fabrication) {
      final += fabrication(p.side);
    }
    if (p.include_courtyard) {
      final += courtyard(p.side);
    }

    const reverse_side = p.side == "F" ? "B" : "F";
    const silkscreen = use_positive_left ? positive_left_silkscreen : positive_right_silkscreen;
    const silkscreen_reverse_side = use_positive_left ? positive_right_silkscreen : positive_left_silkscreen;
    if (p.include_silkscreen) {
      final += silkscreen(p.side);
      if (!p.reversible && p.include_silkscreen_on_both_sides) {
        // Non-reversible PCB showing exactly the same silkscreen on both sides.
        final += silkscreen(reverse_side);
      }
    }

    if (p.reversible) {
      const offset = p.use_3_thru_holes ? (p.side == "F" ? -2 : 2) : 0;
      if (p.include_fabrication) {
        final += fabrication(reverse_side, offset);
      }
      if (p.include_courtyard) {
        final += courtyard(reverse_side, offset);
      }
      if (p.include_silkscreen) {
        final += silkscreen_reverse_side(reverse_side, offset);
      }
    }

    if (p.reversible && !p.use_3_thru_holes) {
      final += reversible_pads;
    } else if (use_positive_left) {
      final += positive_left_pads;
    } else {
      final += positive_right_pads;
    }
    if (p.battery_connector_3dmodel_filename) {
      final += battery_connector_3dmodel
    }
    final += standard_closing;
    if (p.reversible && p.include_traces && !p.use_3_thru_holes) {
      final += reversible_traces;
    }
    return final;
  }
}


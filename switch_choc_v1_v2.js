// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
//
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
//
// Authors: @ergogen + @infused-kim, @ceoloide, @grazfather, @nxtk improvements
//
// Description:
//    Kailh Choc PG1350 (v1) + Kailh Choc PG1353 (v2) reversible and hotswappable footprint.
//    This includes support for LOFREE low profile POM switches (Ghost, Phantom, Wizard)
//
//    With the set defaults it will include support for choc v1 and v2 hotswap, single side
//    (Back).
//
// Nets:
//    from: corresponds to pin 1
//    to: corresponds to pin 2
//
// Params:
//    side: default is B for Back
//      the side on which to place the single-side footprint and designator, either F or B
//    reversible: default is false
//      if true, the footprint will be placed on both sides so that the PCB can be
//      reversible
//    hotswap: default is true
//      if true, will include holes and pads for Kailh choc hotswap sockets
//    solder: default is false
//      if true, will include holes to solder switches (works with hotswap too)
//    include_plated_holes: default is false
//      Alternate version of the footprint compatible with side, reversible, hotswap, solder options in any combination.
//      Pretty, allows for connecting ground fill zones via center hole, 
//      allows for setting nets to Choc v2 stabilizers and them for your routing needs.
//    include_stabilizer_nets: default is false
//      if true, will add adjustable nets to choc v2 plated stabilizer holes, 
//      LEFTSTAB: default is "D1"
//      RIGHTSTAB: default is "D2"
//    include_centerhole_net: default is false
//      if true, will add adjustable net to the center hole
//      CENTERHOLE: default is "GND"
//    outer_pad_width_front: default 2.6
//    outer_pad_width_back: default 2.6
//      Allows you to make the outer hotswap pads smaller to silence DRC
//      warnings when the sockets are too close to the edge cuts. It's not
//      recommended to go below 1.6mm to ensure the hotswap socket can be
//      properly soldered.
//    include_keycap: default is false
//      if true, will add mx sized keycap box around the footprint (18mm)
//    include_corner_marks: default is false
//      if true, will add corner marks to indicate plate hole size and position
//    include_choc_v1_led_cutout_marks: default is false
//      if true, will add marks for the led cutout in choc v1 switch body
//    include_choc_v2_led_cutout_marks: default is false
//      if true, will add marks for the led cutout in choc v2 switch body
//    include_stabilizer_pad: default is true
//      if true, will add a corner pad for the stabilizer leg present in some
//      Choc switches, unless choc_v2_support is false.
//    oval_stabilizer_pad: default is false
//      if false, will add an oval pad for the stabilizer leg, and a round one
//      if true. Note that the datasheet calls for a round one.
//    choc_v1_stabilizers_diameter: default is 1.9 (mm)
//      Allows you to narrow Choc v1 stabilizer / boss holes diameter for tighter fit, not recommended to set below 1.7
//    choc_v1_support: default is true
//      if true, will add lateral stabilizer holes that are required for
//      Choc v1 footprints.
//    choc_v2_support: default is true
//      if true, will make the central hole bigger to as required for
//      Choc v2 footprints. If false it will also disable the corner stabilizer
//      pad even if include_stabilizer_pad is true.
//    keycap_height: default is 18
//      Allows you to adjust the width of the keycap outline. For example,
//      to show a 1.5u outline for easier aligning.
//    keycap_width: default is 18
//      Allows you to adjust the height of the keycap outline.
//    allow_soldermask_bridges: default is true
//      Disables 'solder mask aperture bridges items with different nets' DRC check when set to true
//      setting this option to false may be useful for debugging purposes, (applied locally to this footprint only)
//      for global setting see `allow_soldermask_bridges_in_footprints` in a kicad template
//    switch_3dmodel_filename: default is ''
//      Allows you to specify the path to a 3D model STEP or WRL file to be
//      used when rendering the PCB. Use the ${VAR_NAME} syntax to point to
//      a KiCad configured path.
//    switch_3dmodel_xyz_offset: default is [0, 0, 0]
//      xyz offset (in mm), used to adjust the position of the 3d model
//      relative the footprint.
//    switch_3dmodel_xyz_scale: default is [1, 1, 1]
//      xyz scale, used to adjust the size of the 3d model relative to its
//      original size.
//    switch_3dmodel_xyz_rotation: default is [0, 0, 0]
//      xyz rotation (in degrees), used to adjust the orientation of the 3d
//      model relative the footprint.
//    hotswap_3dmodel_filename: default is ''
//      Allows you to specify the path to a 3D model to be used when rendering
//      the PCB. Allows for paths using a configured path by using the
//      ${VAR_NAME} syntax.
//    hotswap_3dmodel_xyz_offset: default is [0, 0, 0]
//      xyz offset (in mm), used to adjust the position of the 3d model
//      relative the footprint.
//    hotswap_3dmodel_xyz_scale: default is [1, 1, 1]
//      xyz scale, used to adjust the size of the 3d model relative its
//      original size.
//    hotswap_3dmodel_xyz_rotation: default is [0, 0, 0]
//      xyz rotation (in degrees), used to adjust the orientation of the 3d
//      model relative the footprint.
//    keycap_3dmodel_filename: default is ''
//      Allows you to specify the path to a 3D model STEP or WRL file to be
//      used when rendering the PCB. Use the ${VAR_NAME} syntax to point to
//      a KiCad configured path.
//    keycap_3dmodel_xyz_offset: default is [0, 0, 0]
//      xyz offset (in mm), used to adjust the position of the 3d model
//      relative the footprint.
//    keycap_3dmodel_xyz_scale: default is [1, 1, 1]
//      xyz scale, used to adjust the size of the 3d model relative to its
//      original size.
//    keycap_3dmodel_xyz_rotation: default is [0, 0, 0]
//      xyz rotation (in degrees), used to adjust the orientation of the 3d
//      model relative the footprint.
//
// Notes:
// - Hotswap and solder can be used together. The solder holes will then be
//   added above the hotswap holes.
//
// @infused-kim's improvements:
//  - Add hotswap socket outlines
//  - Move switch corner marks from user layer to silk screen
//  - Add option to adjust keycap size outlines (to show 1.5u outline)
//  - Add option to add hotswap sockets and direct soldering holes at the
//    same time
//  - Make hotswap pads not overlap holes to fix DRC errors
//  - Fixed DRC errors "Drilled holes co-located"
//
// @ceoloide's improvements:
//  - Adjusted footprint to be Choc PG1353 (v2) compatible
//  - Add option to hide corner marks, as they interfere with hotswap silkscreen
//  - Add ability to specify board side
//  - Add ability to include stabilizer pad
//  - Add ability to use an oval stabilizer pad
//  - Upgrade to KiCad 8
//
// @grazfather's improvements:
//  - Add support for switch 3D model
//
// @nxtk's improvements:
//  - Add plated version, inspired by @daprice and @ssbb
//  - Add ability to adjust v1 stabilizer / boss holes
//  - Add ability to assign nets to v2 stabilizer / boss holes (useful for routing diode in place of backlight led)
//  - Add ability to set a net to central hole (useful for connecting ground fill zones)
//  - Add opposite stabilizer / boss holes when (choc_v2_support & solder & hotswap) options enabled together
//  - Change v2 stabilizer / boss holes to plated
//  - Add allow_soldermask_bridges option, which disables 'solder mask aperture bridges items with different nets' DRC check
//
// @mlilley's improvements:
//  - Add options to include marks for the led cutout in choc v1 and v2 switch bodies

module.exports = {
  params: {
    designator: 'S',
    side: 'B',
    reversible: false,
    hotswap: true,
    include_plated_holes: false,
    include_stabilizer_nets: false,
    include_centerhole_net: false,
    solder: false,
    outer_pad_width_front: 2.6,
    outer_pad_width_back: 2.6,
    include_keycap: false,
    keycap_width: 18,
    keycap_height: 18,
    include_corner_marks: false,
    include_choc_v1_led_cutout_marks: false,
    include_choc_v2_led_cutout_marks: false,
    include_stabilizer_pad: true,
    oval_stabilizer_pad: false,
    choc_v1_support: true,
    choc_v2_support: true,
    choc_v1_stabilizers_diameter: 1.9,
    allow_soldermask_bridges: true,
    switch_3dmodel_filename: '',
    switch_3dmodel_xyz_offset: [0, 0, 0],
    switch_3dmodel_xyz_rotation: [0, 0, 0],
    switch_3dmodel_xyz_scale: [1, 1, 1],
    hotswap_3dmodel_filename: '',
    hotswap_3dmodel_xyz_offset: [0, 0, 0],
    hotswap_3dmodel_xyz_rotation: [0, 0, 0],
    hotswap_3dmodel_xyz_scale: [1, 1, 1],
    keycap_3dmodel_filename: '',
    keycap_3dmodel_xyz_offset: [0, 0, 0],
    keycap_3dmodel_xyz_rotation: [0, 0, 0],
    keycap_3dmodel_xyz_scale: [1, 1, 1],
    from: undefined,
    to: undefined,
    CENTERHOLE: { type: 'net', value: 'GND'},
    LEFTSTAB: { type: 'net', value: 'D1' },
    RIGHTSTAB: { type: 'net', value: 'D2' }
  },
  body: p => {
    const common_top = `
  (footprint "ceoloide:switch_choc_v1_v2"
    (layer "${p.side}.Cu")
    ${p.at}
    (property "Reference" "${p.ref}"
      (at 0 8.8 ${p.r})
      (layer "${p.side}.SilkS")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15)))
    )
    (attr exclude_from_pos_files exclude_from_bom${p.allow_soldermask_bridges ? ' allow_soldermask_bridges' : ''})

    ${''/* middle shaft hole */}
    ${p.include_plated_holes ? `
    (pad "" thru_hole circle (at 0 0 ${p.r}) (size ${p.choc_v2_support ? '5.3 5.3' : '3.7 3.7'}) (drill ${p.choc_v2_support ? '5' : '3.4'}) (layers "*.Cu" "*.Mask") ${p.include_centerhole_net ? p.CENTERHOLE : ''})
    `: `
    (pad "" np_thru_hole circle (at 0 0 ${p.r}) (size ${p.choc_v2_support ? '5 5' : '3.4 3.4'}) (drill ${p.choc_v2_support ? '5' : '3.4'}) (layers "*.Cu" "*.Mask"))
    `}
    `

    const choc_v1_stabilizers = `
    ${p.include_plated_holes ? `
    (pad "" thru_hole circle (at 5.5 0 ${p.r}) (size ${p.choc_v1_stabilizers_diameter + 0.3} ${p.choc_v1_stabilizers_diameter + 0.3}) (drill ${p.choc_v1_stabilizers_diameter}) (layers "*.Cu" "*.Mask"))
    (pad "" thru_hole circle (at -5.5 0 ${p.r}) (size ${p.choc_v1_stabilizers_diameter + 0.3} ${p.choc_v1_stabilizers_diameter + 0.3}) (drill ${p.choc_v1_stabilizers_diameter}) (layers "*.Cu" "*.Mask"))
    `: `
    (pad "" np_thru_hole circle (at 5.5 0 ${p.r}) (size ${p.choc_v1_stabilizers_diameter} ${p.choc_v1_stabilizers_diameter}) (drill ${p.choc_v1_stabilizers_diameter}) (layers "*.Cu" "*.Mask"))
    (pad "" np_thru_hole circle (at -5.5 0 ${p.r}) (size ${p.choc_v1_stabilizers_diameter} ${p.choc_v1_stabilizers_diameter}) (drill ${p.choc_v1_stabilizers_diameter}) (layers "*.Cu" "*.Mask"))
    `}
    `

    const corner_marks = `
    ${''/* corner marks - front */}
    (fp_line (start -7 -6) (end -7 -7) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start -7 7) (end -6 7) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start -6 -7) (end -7 -7) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start -7 7) (end -7 6) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start 7 6) (end 7 7) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start 7 -7) (end 6 -7) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start 6 7) (end 7 7) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start 7 -7) (end 7 -6) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    `

    const keycap_xo = 0.5 * p.keycap_width
    const keycap_yo = 0.5 * p.keycap_height
    const keycap_marks = `
    (fp_rect (start ${keycap_xo} ${keycap_yo}) (end ${-keycap_xo} ${-keycap_yo}) (layer "Dwgs.User") (stroke (width 0.15) (type solid)) (fill none))
    `

    const choc_v1_led_cutout_marks = `
    (fp_rect (start -2.65 6.325) (end 2.65 3.075) (layer "Dwgs.User") (width 0.15) (stroke (width 0.15) (type solid)) (fill none))
    `

    const choc_v2_led_cutout_marks = `
    (fp_rect (start -2.75 6.405) (end 2.75 3.455) (layer "Dwgs.User") (width 0.15) (stroke (width 0.15) (type solid)) (fill none))
    `

    const hotswap_common = `
    ${'' /* Middle Hole */}
    ${p.include_plated_holes ? `
    (pad ${p.reversible ? '""' : 1} thru_hole circle (at 0 -5.95 ${p.r}) (size 3.3 3.3) (drill 3) (layers "*.Cu" "*.Mask") ${p.reversible ? '' : p.from.str})
    `: `
    (pad "" np_thru_hole circle (at 0 -5.95 ${p.r}) (size 3 3) (drill 3) (layers "*.Cu" "*.Mask"))
    `}
    `

    const hotswap_back_pads_plated = `
    (pad "1" smd roundrect (at -2.648 -5.95 ${p.r}) (size 3.8 2.15) (layers "B.Cu") (roundrect_rratio 0.1) ${p.from.str})
    (pad "" smd roundrect (at -3.248 -5.95 ${p.r}) (size 2.6 2.15) (layers "B.Paste" "B.Mask") (roundrect_rratio 0.1))
    (pad "2" smd roundrect (at ${7.6475 - (2.6 - p.outer_pad_width_back) / 2} -3.75 ${p.r}) (size ${p.outer_pad_width_back + 1.2} 2.15) (layers "B.Cu") (roundrect_rratio 0.1) ${p.to.str})
    (pad "" smd roundrect (at ${8.2475 - (2.6 - p.outer_pad_width_back) / 2} -3.75 ${p.r}) (size ${p.outer_pad_width_back} 2.15) (layers "B.Paste" "B.Mask") (roundrect_rratio ${(2.15 / p.outer_pad_width_back) <= 1 ? 0.1 : 0.1 * (2.15 / p.outer_pad_width_back)}))
    `

    const hotswap_front_pads_plated = `
    (pad "1" smd roundrect (at 2.648 -5.95 ${p.r}) (size 3.8 2.15) (layers "F.Cu") (roundrect_rratio 0.1) ${p.from.str})
    (pad "" smd roundrect (at 3.248 -5.95 ${p.r}) (size 2.6 2.15) (layers "F.Paste" "F.Mask") (roundrect_rratio 0.1)) 
    (pad "2" smd roundrect (at ${-7.6475 + (2.6 - p.outer_pad_width_front) / 2} -3.75 ${p.r}) (size ${p.outer_pad_width_front + 1.2} 2.15) (layers "F.Cu") (roundrect_rratio 0.1) ${p.to.str})
    (pad "" smd roundrect (at ${-8.2475 + (2.6 - p.outer_pad_width_front) / 2} -3.75 ${p.r}) (size ${p.outer_pad_width_front} 2.15) (layers "F.Paste" "F.Mask") (roundrect_rratio ${(2.15 / p.outer_pad_width_front) <= 1 ? 0.1 : 0.1 * (2.15 / p.outer_pad_width_front)}))
    `

    const hotswap_back_pads_plated_reversible = `
    (pad "1" smd roundrect (at -3.245 -5.95 ${p.r}) (size 2.65 2.15) (layers "B.Cu" "B.Paste" "B.Mask") (roundrect_rratio 0.1) ${p.from.str})
    (pad "2" smd roundrect (at ${7.6475 - (2.6 - p.outer_pad_width_back) / 2} -3.75 ${p.r}) (size ${p.outer_pad_width_back + 1.2} 2.15) (layers "B.Cu") (roundrect_rratio 0.1) ${p.to.str})
    (pad "" smd roundrect (at ${8.2475 - (2.6 - p.outer_pad_width_back) / 2} -3.75 ${p.r}) (size ${p.outer_pad_width_back} 2.15) (layers "B.Paste" "B.Mask") (roundrect_rratio ${(2.15 / p.outer_pad_width_back) <= 1 ? 0.1 : 0.1 * (2.15 / p.outer_pad_width_back)}))
    `

    const hotswap_front_pads_plated_reversible = `
    (pad "2" smd roundrect (at 3.245 -5.95 ${p.r}) (size 2.65 2.15) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.1) ${p.to.str})
    (pad "1" smd roundrect (at ${-7.6475 + (2.6 - p.outer_pad_width_front) / 2} -3.75 ${p.r}) (size ${p.outer_pad_width_front + 1.2} 2.15) (layers "F.Cu") (roundrect_rratio 0.1) ${p.from.str})
    (pad "" smd roundrect (at ${-8.2475 + (2.6 - p.outer_pad_width_front) / 2} -3.75 ${p.r}) (size ${p.outer_pad_width_front} 2.15) (layers "F.Paste" "F.Mask") (roundrect_rratio ${(2.15 / p.outer_pad_width_front) <= 1 ? 0.1 : 0.1 * (2.15 / p.outer_pad_width_front)}))
    `

    const hotswap_front_pad_cutoff = `
    (pad "1" smd roundrect
      (at 3.275 -5.95 ${p.r})
      (size 2.6 2.6)
      (layers "F.Cu" "F.Paste" "F.Mask")
      (roundrect_rratio 0)
			(chamfer_ratio 0.455)
			(chamfer bottom_right)
      ${p.from.str}
    )
    `

    const hotswap_front_pad_full = `
    (pad "1" smd rect (at 3.275 -5.95 ${p.r}) (size 2.6 2.6) (layers "F.Cu" "F.Paste" "F.Mask") ${p.from.str})
    `

    const hotswap_back_pad_cutoff = `
    (pad "1" smd roundrect
      (at -3.275 -5.95 ${p.r})
      (size 2.6 2.6)
      (layers "B.Cu" "B.Paste" "B.Mask")
      (roundrect_rratio 0)
			(chamfer_ratio 0.455)
			(chamfer bottom_left)
      ${p.from.str}
    )
    `

    const hotswap_back_pad_full = `
    (pad "1" smd rect (at -3.275 -5.95 ${p.r}) (size 2.6 2.6) (layers "B.Cu" "B.Paste" "B.Mask") ${p.from.str})
    `

    const hotswap_back = `
    ${'' /* Silkscreen outline */}
    ${'' /* back top */}
    (fp_line (start -1.5 -8.2) (end -2 -7.7) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 1.5 -8.2) (end -1.5 -8.2) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 2 -7.7) (end 1.5 -8.2) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 2 -7.7) (end 2 -6.78) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 2.52 -6.2) (end 7 -6.2) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 7 -6.2) (end 7 -5.6) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
    (fp_arc (start 2.52 -6.2) (mid 2.139878 -6.382304) (end 2 -6.78) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
  
    ${'' /* back bottom */}
    (fp_line (start -1.5 -3.7) (end -2 -4.2) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 0.8 -3.7) (end -1.5 -3.7) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 2.5 -1.5) (end 2.5 -2.2) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 7 -1.5) (end 2.5 -1.5) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 7 -2) (end 7 -1.5) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
    (fp_arc (start 0.8 -3.7) (mid 1.956518 -3.312082) (end 2.5 -2.22) (layer "B.SilkS") (stroke (width 0.15) (type solid)))

    ${p.include_plated_holes ? `
    ${'' /* Side Hole */}
      ${p.reversible ? `
      (pad "2" thru_hole circle (at 5 -3.75 ${195 + p.r}) (size 3.3 3.3) (drill 3) (layers "*.Cu" "*.Mask") ${p.to.str})
      ${'' /* Pads */}
      ${hotswap_back_pads_plated_reversible}
      `:`
      (pad "2" thru_hole circle (at 5 -3.75 ${195 + p.r}) (size 3.3 3.3) (drill 3) (layers "*.Cu" "*.Mask") ${p.to.str})
      ${'' /* Pads */}
      ${hotswap_back_pads_plated}
      `}
    `: `
    ${'' /* Left Pad*/}
    ${p.reversible ? hotswap_back_pad_cutoff : hotswap_back_pad_full}

    ${'' /* Right Pad (not cut off) */}
    (pad "2" smd rect (at ${8.275 - (2.6 - p.outer_pad_width_back) / 2} -3.75 ${p.r}) (size ${p.outer_pad_width_back} 2.6) (layers "B.Cu" "B.Paste" "B.Mask") ${p.to.str})

    ${'' /* Side Hole */}
    (pad "" np_thru_hole circle (at 5 -3.75 ${195 + p.r}) (size 3 3) (drill 3) (layers "*.Cu" "*.Mask"))
    `}
    `

    const hotswap_front = `
    ${'' /* Silkscreen outline */}
    ${'' /* front top */}
    (fp_line (start -7 -5.6) (end -7 -6.2) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start -7 -6.2) (end -2.52 -6.2) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start -2 -6.78) (end -2 -7.7) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start -1.5 -8.2) (end -2 -7.7) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 1.5 -8.2) (end -1.5 -8.2) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 2 -7.7) (end 1.5 -8.2) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_arc (start -2 -6.78) (mid -2.139878 -6.382304) (end -2.52 -6.2) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
  
    ${'' /* front bottom */}
    (fp_line (start -7 -1.5) (end -7 -2) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start -2.5 -1.5) (end -7 -1.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start -2.5 -2.2) (end -2.5 -1.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 1.5 -3.7) (end -0.8 -3.7) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 2 -4.2) (end 1.5 -3.7) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_arc (start -2.5 -2.22) (mid -1.956518 -3.312082) (end -0.8 -3.7) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    
    ${p.include_plated_holes ? `
    ${'' /* Side Hole */}
    ${p.reversible ? `
    (pad "1" thru_hole circle (at -5 -3.75 ${195 + p.r}) (size 3.3 3.3) (drill 3) (layers "*.Cu" "*.Mask") ${p.from.str})
    ${'' /* Pads */}
    ${hotswap_front_pads_plated_reversible}
    `:`
    (pad "2" thru_hole circle (at -5 -3.75 ${195 + p.r}) (size 3.3 3.3) (drill 3) (layers "*.Cu" "*.Mask") ${p.to.str})
    ${'' /* Pads */}
    ${hotswap_front_pads_plated}
    `}
    `: `
    ${'' /* Side Hole */}
    (pad "" np_thru_hole circle (at -5 -3.75 ${195 + p.r}) (size 3 3) (drill 3) (layers "*.Cu" "*.Mask"))

    ${'' /* Right Pad (cut off) */}
    ${p.reversible ? hotswap_front_pad_cutoff : hotswap_front_pad_full}

    ${'' /* Left Pad (not cut off) */}
    (pad "2" smd rect (at ${-8.275 + (2.6 - p.outer_pad_width_front) / 2} -3.75 ${p.r}) (size ${p.outer_pad_width_front} 2.6) (layers "F.Cu" "F.Paste" "F.Mask") ${p.to.str})
    `}
    `

    // If both hotswap and solder are enabled, move the solder holes
    // "down" to the opposite side of the switch.
    // Since switches can be rotated by 90 degrees, this won't be a
    // problem as long as we switch the side the holes are on.
    let solder_offset_x_front = '-'
    let solder_offset_x_back = ''
    let solder_offset_y = '-'
    let stab_offset_x_front = ''
    let stab_offset_x_back = '-'
    let stab_offset_y = ''
    if (p.hotswap && p.solder) {
      solder_offset_x_front = ''
      solder_offset_x_back = '-'
      solder_offset_y = ''
      stab_offset_x_front = '-'
      stab_offset_x_back = ''
      stab_offset_y = ''
    }

    const solder_common = `
    (pad "2" thru_hole circle (at 0 ${solder_offset_y}5.9 ${195 + p.r}) (size 2.032 2.032) (drill 1.27) (layers "*.Cu" "*.Mask") ${p.from.str})
    `

    const solder_front = `
    (pad "1" thru_hole circle (at ${solder_offset_x_front}5 ${solder_offset_y}3.8 ${195 + p.r}) (size 2.032 2.032) (drill 1.27) (layers "*.Cu" "*.Mask") ${p.to.str})
    `
    
    const solder_back = `
    (pad "1" thru_hole circle (at ${solder_offset_x_back}5 ${solder_offset_y}3.8 ${195 + p.r}) (size 2.032 2.032) (drill 1.27) (layers "*.Cu" "*.Mask") ${p.to.str})
    `

    const oval_corner_stab_front = `
    (pad "" thru_hole oval (at ${stab_offset_x_front}5 ${stab_offset_y}5.15 ${p.r}) (size 2.4 1.2) (drill oval 1.6 0.4) (layers "*.Cu" "*.Mask") ${p.solder && p.hotswap ? p.to.str : p.include_stabilizer_nets ? p.RIGHTSTAB : ''})
    `

    const oval_corner_stab_back = `
    (pad "" thru_hole oval (at ${stab_offset_x_back}5 ${stab_offset_y}5.15 ${p.r}) (size 2.4 1.2) (drill oval 1.6 0.4) (layers "*.Cu" "*.Mask") ${p.solder && p.hotswap ? p.to.str : p.include_stabilizer_nets ? p.LEFTSTAB : ''})
    `

    const round_corner_stab_front = `
    (pad "" thru_hole circle (at ${stab_offset_x_front}5.00 ${stab_offset_y}5.15 ${p.r}) (size 1.9 1.9) (drill 1.6) (layers "*.Cu" "*.Mask") ${p.solder && p.hotswap ? p.to.str : p.include_stabilizer_nets ? p.RIGHTSTAB : ''})
    `

    const round_corner_stab_back = `
    (pad "" thru_hole circle (at ${stab_offset_x_back}5.00 ${stab_offset_y}5.15 ${p.r}) (size 1.9 1.9) (drill 1.6) (layers "*.Cu" "*.Mask") ${p.solder && p.hotswap ? p.to.str : p.include_stabilizer_nets ? p.LEFTSTAB : ''})
    `

    const switch_3dmodel = `
    (model ${p.switch_3dmodel_filename}
      (offset (xyz ${p.switch_3dmodel_xyz_offset[0]} ${p.switch_3dmodel_xyz_offset[1]} ${p.switch_3dmodel_xyz_offset[2]}))
      (scale (xyz ${p.switch_3dmodel_xyz_scale[0]} ${p.switch_3dmodel_xyz_scale[1]} ${p.switch_3dmodel_xyz_scale[2]}))
      (rotate (xyz ${p.switch_3dmodel_xyz_rotation[0]} ${p.switch_3dmodel_xyz_rotation[1]} ${p.switch_3dmodel_xyz_rotation[2]}))
    )
    `

    const hotswap_3dmodel = `
    (model ${p.hotswap_3dmodel_filename}
      (offset (xyz ${p.hotswap_3dmodel_xyz_offset[0]} ${p.hotswap_3dmodel_xyz_offset[1]} ${p.hotswap_3dmodel_xyz_offset[2]}))
      (scale (xyz ${p.hotswap_3dmodel_xyz_scale[0]} ${p.hotswap_3dmodel_xyz_scale[1]} ${p.hotswap_3dmodel_xyz_scale[2]}))
      (rotate (xyz ${p.hotswap_3dmodel_xyz_rotation[0]} ${p.hotswap_3dmodel_xyz_rotation[1]} ${p.hotswap_3dmodel_xyz_rotation[2]}))
    )
	  `

    const keycap_3dmodel = `
    (model ${p.keycap_3dmodel_filename}
      (offset (xyz ${p.keycap_3dmodel_xyz_offset[0]} ${p.keycap_3dmodel_xyz_offset[1]} ${p.keycap_3dmodel_xyz_offset[2]}))
      (scale (xyz ${p.keycap_3dmodel_xyz_scale[0]} ${p.keycap_3dmodel_xyz_scale[1]} ${p.keycap_3dmodel_xyz_scale[2]}))
      (rotate (xyz ${p.keycap_3dmodel_xyz_rotation[0]} ${p.keycap_3dmodel_xyz_rotation[1]} ${p.keycap_3dmodel_xyz_rotation[2]}))
    )
	  `

    const common_bottom = `
  )
    `

    let final = common_top
    if (p.choc_v1_support) {
      final += choc_v1_stabilizers
    }
    if (p.include_corner_marks) {
      final += corner_marks;
    }
    if (p.include_keycap) {
      final += keycap_marks
    }
    if (p.include_stabilizer_pad && p.choc_v2_support) {
      if (p.reversible || p.side == "F") {
        if (p.oval_stabilizer_pad) {
          final += oval_corner_stab_front
        } else {
          final += round_corner_stab_front
        }
      }
      if (p.reversible || p.side == "B") {
        if (p.oval_stabilizer_pad) {
          final += oval_corner_stab_back
        } else {
          final += round_corner_stab_back
        }
      }
    }
    if (p.include_choc_v1_led_cutout_marks) {
      final += choc_v1_led_cutout_marks
    }
    if (p.include_choc_v2_led_cutout_marks) {
      final += choc_v2_led_cutout_marks
    }
    if (p.hotswap) {
      final += hotswap_common
      if (p.reversible || p.side == "F") {
        final += hotswap_front
      }
      if (p.reversible || p.side == "B") {
        final += hotswap_back
      }
      if (p.hotswap_3dmodel_filename) {
        final += hotswap_3dmodel
      }
    }
    if (p.solder) {
      final += solder_common
      if (p.reversible || p.side == "F") {
        final += solder_front
      }
      if (p.reversible || p.side == "B") {
        final += solder_back
      }
    }

    if (p.switch_3dmodel_filename) {
      final += switch_3dmodel
    }

    if (p.keycap_3dmodel_filename) {
      final += keycap_3dmodel
    }

    final += common_bottom

    return final
  }
}

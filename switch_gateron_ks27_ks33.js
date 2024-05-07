// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: MIT
//
// To view a copy of this license, visit https://spdx.org/licenses/MIT.html, https://opensource.org/license/mit
//
// Authors: @nxtk
//
// Description:
//    Gateron LP KS27 (v1) P\N: KS-27H10B050NN + Gateron LP KS33 (v2) P\N: KS-33H10B050NN reversible and hotswappable footprint.
//    This includes support for NuPhy low profile switches Wisteria (T55), Aloe (L37), Daisy (L48), Cowberry, Moss
//    Hotswap socket: Gateron LP HS 2.0 P\N KS-2P02B01-02
//
//    With the set defaults it will include support for hotswap, single side (Back).
//
// Notes:
//   - Hotswap and solder can be used together. The solder holes will then be
//     added above the hotswap holes.
//   - Soldered reversible mode has alternate custom pads enabled by `include_custom_solder_pads` option.
//     Compatible with hotswap mode.
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
//    include_stem_outline: default is false
//      if true, will add switch stem outline
//    include_led_outline: default is false
//      if true, will add switch led cutout outline (changes alignment based on the `side` option)
//    include_socket_silks: default is false
//      if true, will add hotswap sockets silkscreens (follows `reversible` and `side` options)
//    include_socket_fabs: default is false
//      if true, will add hotswap socket outlines to *.Fab layers which might be helful for new users
//    include_custom_solder_pads: default is false
//      if true, replaces reversible solder pads with alternate version
//      (disabled in non reversible mode)
//    include_centerhole_net: default is false
//      if true, will add adjustable net to the center hole
//      CENTERHOLE: default is "GND"
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

module.exports = {
  params: {
    designator: 'S',
    side: 'B',
    reversible: false,
    solder: true,
    hotswap: true,
    keycap_width: 18,
    keycap_height: 18,
    include_corner_marks: false,
    include_centerhole_net: false,
    include_keycap: false,
    include_stem_outline: false,
    include_led_outline: false,
    include_socket_silks: false,
    include_socket_fabs: false,
    include_custom_solder_pads: false,
    allow_soldermask_bridges: true,
    outer_pad_width_front: 2.6,
    outer_pad_width_back: 2.6,
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
    CENTERHOLE: { type: 'net', value: 'GND' },
  },
  body: p => {
    const common_top = `
  (footprint "ceoloide:switch_gateron_ks27_ks33"
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
    (pad "" thru_hole circle (at 0 0 ${p.r}) (size 5.6 5.6) (drill 5.1) (layers "*.Cu" "*.Mask") ${p.include_centerhole_net ? p.CENTERHOLE : ''})
    `

    const corner_marks = `
    ${''/* corner marks - front */}
    (fp_line (start -7 -6) (end -7 -7) (stroke (width 0.15) (type solid)) (layer "Dwgs.User"))
    (fp_line (start -7 7) (end -7 6) (stroke (width 0.15) (type solid)) (layer "Dwgs.User"))
    (fp_line (start -7 7) (end -6 7) (stroke (width 0.15) (type solid)) (layer "Dwgs.User"))
    (fp_line (start -6 -7) (end -7 -7) (stroke (width 0.15) (type solid)) (layer "Dwgs.User"))
    (fp_line (start 6 7) (end 7 7) (stroke (width 0.15) (type solid)) (layer "Dwgs.User"))
    (fp_line (start 7 -7) (end 6 -7) (stroke (width 0.15) (type solid)) (layer "Dwgs.User"))
    (fp_line (start 7 -7) (end 7 -6) (stroke (width 0.15) (type solid)) (layer "Dwgs.User"))
    (fp_line (start 7 6) (end 7 7) (stroke (width 0.15) (type solid)) (layer "Dwgs.User"))
    `

    const led_outline = `
    ${''/* led outline - front */}
    ${p.side == 'B' ? `
    (fp_rect (start -3.2 -6.3) (end 1.8 -4.05) (stroke (width 0.15) (type solid)) (fill none) (layer "Dwgs.User"))
    `:`
    (fp_rect (start -1.8 -6.3) (end 3.2 -4.05) (stroke (width 0.15) (type solid)) (fill none) (layer "Dwgs.User"))
    `}
    `

    const stem_outline = `
    ${''/* stem outline - front */}
    (fp_poly (pts (xy -0.525791 -3.207186) (xy -0.869467 -3.131537) (xy -1.202949 -3.019174) (xy -1.522327 -2.871414) (xy -1.823858 -2.689989) (xy -2.104005 -2.477027) (xy -2.359485 -2.235023) (xy -2.389234 -2.2) (xy -4.7 -2.2) (xy -4.7 2.2) (xy -2.389234 2.2) (xy -2.359485 2.235023) (xy -2.104005 2.477027) (xy -1.823858 2.689989) (xy -1.522327 2.871414) (xy -1.202949 3.019174) (xy -0.869467 3.131537) (xy -0.525791 3.207186) (xy -0.175951 3.245234) (xy 0 3.245234) (xy 0 2.845178) (xy -0.165713 2.845178) (xy -0.494897 2.806702) (xy -0.817389 2.73027) (xy -1.128827 2.616916) (xy -1.425 2.468172) (xy -1.701902 2.286051) (xy -1.955789 2.073015) (xy -2.183227 1.831945) (xy -2.38114 1.566101) (xy -2.546853 1.279078) (xy -2.678124 0.974757) (xy -2.773178 0.657255) (xy -2.830729 0.330865) (xy -2.85 0) (xy -2.830729 -0.330865) (xy -2.773178 -0.657255) (xy -2.678124 -0.974757) (xy -2.546853 -1.279078) (xy -2.38114 -1.566101) (xy -2.183227 -1.831945) (xy -1.955789 -2.073015) (xy -1.701902 -2.286051) (xy -1.425 -2.468172) (xy -1.128827 -2.616916) (xy -0.817389 -2.73027) (xy -0.494897 -2.806702) (xy -0.165713 -2.845178) (xy 0 -2.845178) (xy 0 -3.245234) (xy -0.175951 -3.245234)) (stroke (width 0.001) (type solid)) (fill solid) (layer "Dwgs.User"))
    (fp_poly (pts (xy 0.525791 -3.207186) (xy 0.869467 -3.131537) (xy 1.202949 -3.019174) (xy 1.522327 -2.871414) (xy 1.823858 -2.689989) (xy 2.104005 -2.477027) (xy 2.359485 -2.235023) (xy 2.389234 -2.2) (xy 4.7 -2.2) (xy 4.7 2.2) (xy 2.389234 2.2) (xy 2.359485 2.235023) (xy 2.104005 2.477027) (xy 1.823858 2.689989) (xy 1.522327 2.871414) (xy 1.202949 3.019174) (xy 0.869467 3.131537) (xy 0.525791 3.207186) (xy 0.175951 3.245234) (xy 0 3.245234) (xy 0 2.845178) (xy 0.165713 2.845178) (xy 0.494897 2.806702) (xy 0.817389 2.73027) (xy 1.128827 2.616916) (xy 1.425 2.468172) (xy 1.701902 2.286051) (xy 1.955789 2.073015) (xy 2.183227 1.831945) (xy 2.38114 1.566101) (xy 2.546853 1.279078) (xy 2.678124 0.974757) (xy 2.773178 0.657255) (xy 2.830729 0.330865) (xy 2.85 0) (xy 2.830729 -0.330865) (xy 2.773178 -0.657255) (xy 2.678124 -0.974757) (xy 2.546853 -1.279078) (xy 2.38114 -1.566101) (xy 2.183227 -1.831945) (xy 1.955789 -2.073015) (xy 1.701902 -2.286051) (xy 1.425 -2.468172) (xy 1.128827 -2.616916) (xy 0.817389 -2.73027) (xy 0.494897 -2.806702) (xy 0.165713 -2.845178) (xy 0 -2.845178) (xy 0 -3.245234) (xy 0.175951 -3.245234)) (stroke (width 0.001) (type solid)) (fill solid) (layer "Dwgs.User"))
    `

    const stem_cross_outline = `
    ${''/* stem outline cross - front */}
    (fp_poly (pts (xy -0.55 -0.55) (xy -0.55 -2) (xy 0.55 -2) (xy 0.55 -0.55) (xy 2 -0.55) (xy 2 0.55) (xy 0.55 0.55) (xy 0.55 2) (xy -0.55 2) (xy -0.55 0.55) (xy -2 0.55) (xy -2 -0.55)) (stroke (width 0) (type solid)) (fill solid) (layer "Dwgs.User"))
    `


    const keycap_xo = 0.5 * p.keycap_width
    const keycap_yo = 0.5 * p.keycap_height
    const keycap_marks = `
    (fp_rect (start ${keycap_xo} ${keycap_yo}) (end ${-keycap_xo} ${-keycap_yo}) (layer "Dwgs.User") (stroke (width 0.15) (type solid)) (fill none))
    `

    const hotswap_fab_front = `
    (fp_line (start -6.65 6.525) (end -6.65 4.975) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_line (start -6.55 4.875) (end -5.025 4.875) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_line (start -5.025 4.875) (end -5.025 3.675) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_line (start -5.025 4.875) (end -5.025 6.625) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_line (start -5.025 6.625) (end -6.55 6.625) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_line (start -5.025 6.625) (end -5.025 7.825) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_line (start -4.925 3.575) (end 0.788397 3.575) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_line (start -4.925 7.925) (end -0.775 7.925) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_line (start -0.675 7.825) (end -0.675 7.325) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_line (start -0.475 7.125) (end 0.625 7.125) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_line (start 0.825 7.325) (end 0.825 7.825) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_line (start 0.925 7.925) (end 1.022371 7.925) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_line (start 2.642949 2.658975) (end 1.288397 3.441026) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_line (start 2.742949 7.008975) (end 1.272371 7.858013) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_line (start 6.725 2.525) (end 3.142949 2.525) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_line (start 6.725 6.875) (end 3.242949 6.875) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_line (start 6.825 3.825) (end 6.825 2.625) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_line (start 6.825 3.825) (end 8.35 3.825) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_line (start 6.825 5.575) (end 6.825 3.825) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_line (start 6.825 6.775) (end 6.825 5.575) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_line (start 8.35 5.575) (end 6.825 5.575) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_line (start 8.45 3.925) (end 8.45 5.475) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_arc (start -6.65 4.975) (mid -6.620711 4.904289) (end -6.55 4.875) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_arc (start -6.55 6.625) (mid -6.620711 6.595711) (end -6.65 6.525) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_arc (start -5.025 3.675) (mid -4.995711 3.604289) (end -4.925 3.575) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_arc (start -4.925 7.925) (mid -4.995711 7.895711) (end -5.025 7.825) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_arc (start -0.675 7.325) (mid -0.616421 7.183579) (end -0.475 7.125) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_arc (start -0.675 7.825) (mid -0.704289 7.895711) (end -0.775 7.925) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_arc (start 0.625 7.125) (mid 0.76642 7.183579) (end 0.825 7.325) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_arc (start 0.925 7.925) (mid 0.854288 7.895711) (end 0.825 7.825) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_arc (start 1.272371 7.858013) (mid 1.151778 7.907947) (end 1.022371 7.925) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_arc (start 1.288397 3.441026) (mid 1.047216 3.540926) (end 0.788397 3.575) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_arc (start 2.642949 2.658975) (mid 2.884134 2.559088) (end 3.142949 2.525) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_arc (start 2.742949 7.008975) (mid 2.984134 6.909088) (end 3.242949 6.875) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_arc (start 6.725 2.525) (mid 6.795709 2.55429) (end 6.825 2.625) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_arc (start 6.825 6.775) (mid 6.795711 6.845711) (end 6.725 6.875) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_arc (start 8.35 3.825) (mid 8.420709 3.85429) (end 8.45 3.925) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_arc (start 8.45 5.475) (mid 8.420711 5.545711) (end 8.35 5.575) (stroke (width 0.001) (type solid)) (layer "F.Fab"))
    (fp_circle (center -2.6 5.75) (end -1.1 5.75) (stroke (width 0.001) (type solid)) (fill none) (layer "F.Fab"))
    (fp_circle (center 4.4 4.7) (end 5.9 4.7) (stroke (width 0.001) (type solid)) (fill none) (layer "F.Fab"))
    `

    const hotswap_fab_back = `
    (fp_line (start -8.45 5.475) (end -8.45 3.925) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_line (start -8.35 3.825) (end -6.825 3.825) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_line (start -6.825 2.625) (end -6.825 3.825) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_line (start -6.825 3.825) (end -6.825 5.575) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_line (start -6.825 5.575) (end -8.35 5.575) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_line (start -6.825 5.575) (end -6.825 6.775) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_line (start -3.242949 6.875) (end -6.725 6.875) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_line (start -3.142949 2.525) (end -6.725 2.525) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_line (start -1.288397 3.441026) (end -2.642949 2.658975) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_line (start -1.272371 7.858013) (end -2.742949 7.008975) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_line (start -1.022371 7.925) (end -0.925 7.925) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_line (start -0.825 7.825) (end -0.825 7.325) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_line (start -0.788397 3.575) (end 4.925 3.575) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_line (start -0.625 7.125) (end 0.475 7.125) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_line (start 0.675 7.325) (end 0.675 7.825) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_line (start 0.775 7.925) (end 4.925 7.925) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_line (start 5.025 3.675) (end 5.025 4.875) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_line (start 5.025 4.875) (end 6.55 4.875) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_line (start 5.025 6.625) (end 5.025 4.875) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_line (start 5.025 7.825) (end 5.025 6.625) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_line (start 6.55 6.625) (end 5.025 6.625) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_line (start 6.65 4.975) (end 6.65 6.525) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_arc (start -8.45 3.925) (mid -8.420711 3.854289) (end -8.35 3.825) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_arc (start -8.35 5.575) (mid -8.420711 5.545711) (end -8.45 5.475) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_arc (start -6.825 2.625) (mid -6.795711 2.554289) (end -6.725 2.525) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_arc (start -6.725 6.875) (mid -6.795711 6.845711) (end -6.825 6.775) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_arc (start -3.242949 6.875) (mid -2.98413 6.909077) (end -2.742949 7.008975) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_arc (start -3.142949 2.525) (mid -2.88413 2.559077) (end -2.642949 2.658975) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_arc (start -1.022371 7.925) (mid -1.15178 7.907962) (end -1.272371 7.858013) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_arc (start -0.825 7.325) (mid -0.766421 7.183579) (end -0.625 7.125) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_arc (start -0.825 7.825) (mid -0.854289 7.895711) (end -0.925 7.925) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_arc (start -0.788397 3.575) (mid -1.047216 3.540927) (end -1.288397 3.441026) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_arc (start 0.475 7.125) (mid 0.616421 7.183579) (end 0.675 7.325) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_arc (start 0.775 7.925) (mid 0.704289 7.895711) (end 0.675 7.825) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_arc (start 4.925 3.575) (mid 4.995711 3.604289) (end 5.025 3.675) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_arc (start 5.025 7.825) (mid 4.995711 7.895711) (end 4.925 7.925) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_arc (start 6.55 4.875) (mid 6.620711 4.904289) (end 6.65 4.975) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_arc (start 6.65 6.525) (mid 6.620711 6.595711) (end 6.55 6.625) (stroke (width 0.001) (type solid)) (layer "B.Fab"))
    (fp_circle (center -4.4 4.7) (end -2.85 4.7) (stroke (width 0.001) (type solid)) (fill none) (layer "B.Fab"))
    (fp_circle (center 2.6 5.75) (end 4.15 5.75) (stroke (width 0.001) (type solid)) (fill none) (layer "B.Fab"))
    `

    const hotswap_silk_front = `
    (fp_line (start -5.025 7.825) (end -5.025 7.225) (stroke (width 0.15) (type solid)) (layer "F.SilkS"))
    (fp_line (start -4.325 7.925) (end -4.925 7.925) (stroke (width 0.15) (type solid)) (layer "F.SilkS"))
    (fp_line (start 0.788397 3.575) (end -0.75 3.575) (stroke (width 0.15) (type solid)) (layer "F.SilkS"))
    (fp_line (start 2.642949 2.658975) (end 1.288397 3.441026) (stroke (width 0.15) (type solid)) (layer "F.SilkS"))
    (fp_line (start 4.681346 2.525) (end 3.142949 2.525) (stroke (width 0.15) (type solid)) (layer "F.SilkS"))
    (fp_line (start 6.725 2.525) (end 6.125 2.525) (stroke (width 0.15) (type solid)) (layer "F.SilkS"))
    (fp_line (start 6.725 6.875) (end 6.125 6.875) (stroke (width 0.15) (type solid)) (layer "F.SilkS"))
    (fp_line (start 6.825 3.225) (end 6.825 2.625) (stroke (width 0.15) (type solid)) (layer "F.SilkS"))
    (fp_line (start 6.825 6.775) (end 6.825 6.175) (stroke (width 0.15) (type solid)) (layer "F.SilkS"))
    (fp_arc (start -4.925 7.925) (mid -4.995711 7.895711) (end -5.025 7.825) (stroke (width 0.15) (type solid)) (layer "F.SilkS"))
    (fp_arc (start 1.288397 3.441026) (mid 1.047216 3.540926) (end 0.788397 3.575) (stroke (width 0.15) (type solid)) (layer "F.SilkS"))
    (fp_arc (start 2.642949 2.658975) (mid 2.884131 2.559086) (end 3.142949 2.525) (stroke (width 0.15) (type solid)) (layer "F.SilkS"))
    (fp_arc (start 6.725 2.525) (mid 6.795711 2.554289) (end 6.825 2.625) (stroke (width 0.15) (type solid)) (layer "F.SilkS"))
    (fp_arc (start 6.825 6.775) (mid 6.795711 6.845711) (end 6.725 6.875) (stroke (width 0.15) (type solid)) (layer "F.SilkS"))
    
    ${p.reversible ? `` : `
    (fp_arc (start -5.025 3.675) (mid -4.995711 3.604289) (end -4.925 3.575) (stroke (width 0.15) (type solid)) (layer "F.SilkS"))
    (fp_line (start -5.025 4.275) (end -5.025 3.675) (stroke (width 0.15) (type solid)) (layer "F.SilkS"))
    (fp_line (start -4.325 3.575) (end -4.925 3.575) (stroke (width 0.15) (type solid)) (layer "F.SilkS"))
    `}
    `

    const hotswap_silk_back = `
    (fp_line (start -6.825 2.625) (end -6.825 3.225) (stroke (width 0.15) (type solid)) (layer "B.SilkS"))
    (fp_line (start -6.825 6.175) (end -6.825 6.775) (stroke (width 0.15) (type solid)) (layer "B.SilkS"))
    (fp_line (start -6.125 2.525) (end -6.725 2.525) (stroke (width 0.15) (type solid)) (layer "B.SilkS"))
    (fp_line (start -6.125 6.875) (end -6.725 6.875) (stroke (width 0.15) (type solid)) (layer "B.SilkS"))
    (fp_line (start -3.142949 2.525) (end -4.681346 2.525) (stroke (width 0.15) (type solid)) (layer "B.SilkS"))
    (fp_line (start -1.288397 3.441026) (end -2.642949 2.658975) (stroke (width 0.15) (type solid)) (layer "B.SilkS"))
    (fp_line (start 0.75 3.575) (end -0.788397 3.575) (stroke (width 0.15) (type solid)) (layer "B.SilkS"))
    (fp_line (start 4.925 7.925) (end 4.325 7.925) (stroke (width 0.15) (type solid)) (layer "B.SilkS"))
    (fp_line (start 5.025 7.225) (end 5.025 7.825) (stroke (width 0.15) (type solid)) (layer "B.SilkS"))
    (fp_arc (start -6.825 2.625) (mid -6.795711 2.554289) (end -6.725 2.525) (stroke (width 0.15) (type solid)) (layer "B.SilkS"))
    (fp_arc (start -6.725 6.875) (mid -6.795711 6.845711) (end -6.825 6.775) (stroke (width 0.15) (type solid)) (layer "B.SilkS"))
    (fp_arc (start -3.142949 2.525) (mid -2.884135 2.559092) (end -2.642949 2.658975) (stroke (width 0.15) (type solid)) (layer "B.SilkS"))
    (fp_arc (start -0.788397 3.575) (mid -1.047216 3.540926) (end -1.288397 3.441026) (stroke (width 0.15) (type solid)) (layer "B.SilkS"))
    (fp_arc (start 5.025 7.825) (mid 4.995711 7.895711) (end 4.925 7.925) (stroke (width 0.15) (type solid)) (layer "B.SilkS"))
    
    ${p.reversible ? `` : `
    (fp_arc (start 4.925 3.575) (mid 4.995711 3.604289) (end 5.025 3.675) (stroke (width 0.15) (type solid)) (layer "B.SilkS"))
    (fp_line (start 5.025 3.675) (end 5.025 4.275) (stroke (width 0.15) (type solid)) (layer "B.SilkS"))
    (fp_line (start 4.925 3.575) (end 4.325 3.575) (stroke (width 0.15) (type solid)) (layer "B.SilkS"))
    `}
    `

    const hotswap_front_full = `
    (pad "1" smd roundrect (at -5.55 5.75 ${p.r}) (size 4 2.5) (layers "F.Cu") (roundrect_rratio 0.1) ${p.from.str})
    (pad "" smd roundrect (at -6.25 5.75 ${p.r}) (size 2.6 2.5) (layers "F.Paste" "F.Mask") (roundrect_rratio 0.1))
    `

    const hotswap_back_full = `
    (pad "2" smd roundrect (at 5.55 5.75 ${p.r}) (size 4 2.5) (layers "B.Cu") (roundrect_rratio 0.1) ${p.to.str})
    (pad "" smd roundrect (at 6.25 5.75 ${p.r}) (size 2.6 2.5) (layers "B.Paste" "B.Mask") (roundrect_rratio 0.1))
    `

    const hotswap_front = `
    (pad ${p.reversible ? '""' : '"1"'} thru_hole circle (at -2.6 5.75 ${p.r}) (size 3.5 3.5) (drill 3) (layers "*.Cu" "*.Mask") ${p.from.str})
    (pad "2" thru_hole circle (at 4.4 4.7 ${p.r}) (size 3.5 3.5) (drill 3) (layers "*.Cu" "*.Mask") ${p.to.str})

    (pad "2" smd roundrect (at ${7.35 - (2.6 - p.outer_pad_width_front) / 2} 4.7 ${p.r}) (size ${p.outer_pad_width_front + 1.4} 2.5) (layers "F.Cu") (roundrect_rratio 0.1) ${p.to.str})
    (pad "" smd roundrect (at ${8.05 - (2.6 - p.outer_pad_width_front) / 2} 4.7 ${p.r}) (size ${p.outer_pad_width_front} 2.5) (layers "F.Paste" "F.Mask") (roundrect_rratio 0.1))

    ${!p.reversible ? hotswap_front_full
        : `(pad "1" smd roundrect (at -6.25 5.75 ${p.r}) (size 2.6 2.5) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.1) ${p.from.str})`}
    `

    const hotswap_back = `
    (pad "1" thru_hole circle (at -4.4 4.7 ${p.r}) (size 3.5 3.5) (drill 3) (layers "*.Cu" "*.Mask") ${p.from.str})
    (pad ${p.reversible ? '""' : '"2"'} thru_hole circle(at 2.6 5.75 ${p.r}) (size 3.5 3.5) (drill 3) (layers "*.Cu" "*.Mask") ${p.to.str})

    
    (pad "1" smd roundrect (at ${-7.35 + (2.6 - p.outer_pad_width_back) / 2} 4.7 ${p.r}) (size ${p.outer_pad_width_back + 1.4} 2.5) (layers "B.Cu") (roundrect_rratio 0.1) ${p.from.str})
    (pad "" smd roundrect (at ${-8.05 + (2.6 - p.outer_pad_width_back) / 2} 4.7 ${p.r}) (size ${p.outer_pad_width_back} 2.5) (layers "B.Paste" "B.Mask") (roundrect_rratio ${(2.5 / p.outer_pad_width_back) <= 1 ? 0.1 : 0.1 * (2.5 / p.outer_pad_width_back)}))
    
    ${!p.reversible ? hotswap_back_full
        : `(pad "2" smd roundrect (at 6.25 5.75 ${p.r}) (size 2.6 2.5) (layers "B.Cu" "B.Paste" "B.Mask") (roundrect_rratio 0.1) ${p.to.str})`}
    `


    // If both hotswap and solder are enabled, move the solder holes
    // "down" to the opposite side of the switch.
    // Since switches can be r3otated by 90 degrees, this won't be a
    // problem as long as we switch the side the holes are on.
    //let solder_offset_x_front = ''
    //let solder_offset_x_back = ''
    let solder_offset_y = ''
    if (p.hotswap && p.solder) {
      //solder_offset_x_front = ''
      //solder_offset_x_back = ''
      solder_offset_y = '-'
    }

    const solder_back = `
    (pad "1" thru_hole circle (at -2.6 ${solder_offset_y}5.75 ${p.r}) (size 2.1 2.1) (drill 1.25) (layers "*.Cu" "*.Mask") ${p.from.str})
    (pad "2" thru_hole circle (at 4.4 ${solder_offset_y}4.7 ${p.r}) (size 2.1 2.1) (drill 1.25) (layers "*.Cu" "*.Mask") ${p.to.str})
    `

    const solder_front = `
    (pad "1" thru_hole circle (at -4.4 ${solder_offset_y}4.7 ${p.r}) (size 2.1 2.1) (drill 1.25) (layers "*.Cu" "*.Mask") ${p.from.str})
    (pad "2" thru_hole circle (at 2.6 ${solder_offset_y}5.75 ${p.r}) (size 2.1 2.1) (drill 1.25) (layers "*.Cu" "*.Mask") ${p.to.str})
    `
    
    const solder_custom_reversible_top = `
    (pad "" thru_hole circle (at -4.4 -4.7) (size 1.8 1.8) (drill 1.25) (layers "*.Cu" "*.Mask") ${p.from.str})
    (pad "" thru_hole circle (at -2.6 -5.75) (size 1.8 1.8) (drill 1.25) (layers "*.Cu" "*.Mask") ${p.from.str})
    (pad "1" smd custom (at -2.6 -5.75) (size 1 1) (layers "F.Cu") (thermal_bridge_angle 90) (options (clearance outline) (anchor circle))
      (primitives (gr_poly (pts (xy -0.19509 -0.980785) (xy -0.382683 -0.92388) (xy -0.55557 -0.83147) (xy -2.35557 0.21853) (xy -2.507107 0.342893) (xy -2.63147 0.49443) (xy -2.72388 0.667317) (xy -2.780785 0.85491) (xy -2.8 1.05) (xy -2.780785 1.24509) (xy -2.72388 1.432683) (xy -2.63147 1.60557) (xy -2.507107 1.757107) (xy -2.35557 1.88147) (xy -2.182683 1.97388) (xy -1.99509 2.030785) (xy -1.8 2.05) (xy -1.60491 2.030785) (xy -1.417317 1.97388) (xy -1.24443 1.88147) (xy 0.55557 0.83147) (xy 0.707107 0.707107) (xy 0.83147 0.55557) (xy 0.92388 0.382683) (xy 0.980785 0.19509) (xy 1 0) (xy 0.980785 -0.19509) (xy 0.92388 -0.382683) (xy 0.83147 -0.55557) (xy 0.707107 -0.707107) (xy 0.55557 -0.83147) (xy 0.382683 -0.92388) (xy 0.19509 -0.980785) (xy 0 -1)) (width 0.1) (fill yes)))
      ${p.from.str})
    (pad "1" smd custom (at -2.6 -5.75) (size 1 1) (layers "B.Cu") (thermal_bridge_angle 90) (options (clearance outline) (anchor circle))
      (primitives (gr_poly (pts (xy -0.19509 -0.980785) (xy -0.382683 -0.92388) (xy -0.55557 -0.83147) (xy -2.35557 0.21853) (xy -2.507107 0.342893) (xy -2.63147 0.49443) (xy -2.72388 0.667317) (xy -2.780785 0.85491) (xy -2.8 1.05) (xy -2.780785 1.24509) (xy -2.72388 1.432683) (xy -2.63147 1.60557) (xy -2.507107 1.757107) (xy -2.35557 1.88147) (xy -2.182683 1.97388) (xy -1.99509 2.030785) (xy -1.8 2.05) (xy -1.60491 2.030785) (xy -1.417317 1.97388) (xy -1.24443 1.88147) (xy 0.55557 0.83147) (xy 0.707107 0.707107) (xy 0.83147 0.55557) (xy 0.92388 0.382683) (xy 0.980785 0.19509) (xy 1 0) (xy 0.980785 -0.19509) (xy 0.92388 -0.382683) (xy 0.83147 -0.55557) (xy 0.707107 -0.707107) (xy 0.55557 -0.83147) (xy 0.382683 -0.92388) (xy 0.19509 -0.980785) (xy 0 -1)) (width 0.1) (fill yes)))
      ${p.from.str})

    (pad "" thru_hole circle (at 2.6 -5.75) (size 1.8 1.8) (drill 1.25) (layers "*.Cu" "*.Mask") ${p.to.str})
    (pad "" thru_hole circle (at 4.4 -4.7) (size 1.8 1.8) (drill 1.25) (layers "*.Cu" "*.Mask") ${p.to.str})
    (pad "2" smd custom (at 2.6 -5.75) (size 1 1) (layers "F.Cu") (thermal_bridge_angle 90) (options (clearance outline) (anchor circle))
      (primitives (gr_poly (pts (xy 0.19509 -0.980785) (xy 0.382683 -0.92388) (xy 0.55557 -0.83147) (xy 2.35557 0.21853) (xy 2.507107 0.342893) (xy 2.63147 0.49443) (xy 2.72388 0.667317) (xy 2.780785 0.85491) (xy 2.8 1.05) (xy 2.780785 1.24509) (xy 2.72388 1.432683) (xy 2.63147 1.60557) (xy 2.507107 1.757107) (xy 2.35557 1.88147) (xy 2.182683 1.97388) (xy 1.99509 2.030785) (xy 1.8 2.05) (xy 1.60491 2.030785) (xy 1.417317 1.97388) (xy 1.24443 1.88147) (xy -0.55557 0.83147) (xy -0.707107 0.707107) (xy -0.83147 0.55557) (xy -0.92388 0.382683) (xy -0.980785 0.19509) (xy -1 0) (xy -0.980785 -0.19509) (xy -0.92388 -0.382683) (xy -0.83147 -0.55557) (xy -0.707107 -0.707107) (xy -0.55557 -0.83147) (xy -0.382683 -0.92388) (xy -0.19509 -0.980785) (xy 0 -1)) (width 0.1) (fill yes)))
      ${p.to.str})
    (pad "2" smd custom (at 2.6 -5.75) (size 1 1) (layers "B.Cu") (thermal_bridge_angle 90) (options (clearance outline) (anchor circle))
      (primitives (gr_poly (pts (xy 0.19509 -0.980785) (xy 0.382683 -0.92388) (xy 0.55557 -0.83147) (xy 2.35557 0.21853) (xy 2.507107 0.342893) (xy 2.63147 0.49443) (xy 2.72388 0.667317) (xy 2.780785 0.85491) (xy 2.8 1.05) (xy 2.780785 1.24509) (xy 2.72388 1.432683) (xy 2.63147 1.60557) (xy 2.507107 1.757107) (xy 2.35557 1.88147) (xy 2.182683 1.97388) (xy 1.99509 2.030785) (xy 1.8 2.05) (xy 1.60491 2.030785) (xy 1.417317 1.97388) (xy 1.24443 1.88147) (xy -0.55557 0.83147) (xy -0.707107 0.707107) (xy -0.83147 0.55557) (xy -0.92388 0.382683) (xy -0.980785 0.19509) (xy -1 0) (xy -0.980785 -0.19509) (xy -0.92388 -0.382683) (xy -0.83147 -0.55557) (xy -0.707107 -0.707107) (xy -0.55557 -0.83147) (xy -0.382683 -0.92388) (xy -0.19509 -0.980785) (xy 0 -1)) (width 0.1) (fill yes)))
      ${p.to.str})

    `

    const solder_custom_reversible_bottom = `
    (pad "" thru_hole circle (at -4.4 4.7) (size 1.8 1.8) (drill 1.25) (layers "*.Cu" "*.Mask") ${p.from.str})
    (pad "" thru_hole circle (at -2.6 5.75) (size 1.8 1.8) (drill 1.25) (layers "*.Cu" "*.Mask") ${p.from.str})
    (pad "1" smd custom (at -4.4 4.7) (size 1 1) (layers "F.Cu") (thermal_bridge_angle 90) (options (clearance outline) (anchor circle)) 
      (primitives (gr_poly (pts (xy 0.19509 -0.980785) (xy 0.382683 -0.92388) (xy 0.55557 -0.83147) (xy 2.35557 0.21853) (xy 2.507107 0.342893) (xy 2.63147 0.49443) (xy 2.72388 0.667317) (xy 2.780785 0.85491) (xy 2.8 1.05) (xy 2.780785 1.24509) (xy 2.72388 1.432683) (xy 2.63147 1.60557) (xy 2.507107 1.757107) (xy 2.35557 1.88147) (xy 2.182683 1.97388) (xy 1.99509 2.030785) (xy 1.8 2.05) (xy 1.60491 2.030785) (xy 1.417317 1.97388) (xy 1.24443 1.88147) (xy -0.55557 0.83147) (xy -0.707107 0.707107) (xy -0.83147 0.55557) (xy -0.92388 0.382683) (xy -0.980785 0.19509) (xy -1 0) (xy -0.980785 -0.19509) (xy -0.92388 -0.382683) (xy -0.83147 -0.55557) (xy -0.707107 -0.707107) (xy -0.55557 -0.83147) (xy -0.382683 -0.92388) (xy -0.19509 -0.980785) (xy 0 -1)) (width 0.1) (fill yes)))
       ${p.from.str})
    (pad "1" smd custom (at -4.4 4.7) (size 1 1) (layers "B.Cu") (thermal_bridge_angle 90) (options (clearance outline) (anchor circle)) 
      (primitives (gr_poly (pts (xy 0.19509 -0.980785) (xy 0.382683 -0.92388) (xy 0.55557 -0.83147) (xy 2.35557 0.21853) (xy 2.507107 0.342893) (xy 2.63147 0.49443) (xy 2.72388 0.667317) (xy 2.780785 0.85491) (xy 2.8 1.05) (xy 2.780785 1.24509) (xy 2.72388 1.432683) (xy 2.63147 1.60557) (xy 2.507107 1.757107) (xy 2.35557 1.88147) (xy 2.182683 1.97388) (xy 1.99509 2.030785) (xy 1.8 2.05) (xy 1.60491 2.030785) (xy 1.417317 1.97388) (xy 1.24443 1.88147) (xy -0.55557 0.83147) (xy -0.707107 0.707107) (xy -0.83147 0.55557) (xy -0.92388 0.382683) (xy -0.980785 0.19509) (xy -1 0) (xy -0.980785 -0.19509) (xy -0.92388 -0.382683) (xy -0.83147 -0.55557) (xy -0.707107 -0.707107) (xy -0.55557 -0.83147) (xy -0.382683 -0.92388) (xy -0.19509 -0.980785) (xy 0 -1)) (width 0.1) (fill yes)))
       ${p.from.str})

    (pad "" thru_hole circle (at 2.6 5.75) (size 1.8 1.8) (drill 1.25) (layers "*.Cu" "*.Mask") ${p.to.str})
    (pad "" thru_hole circle (at 4.4 4.7) (size 1.8 1.8) (drill 1.25) (layers "*.Cu" "*.Mask") ${p.to.str})
    (pad "2" smd custom (at 4.4 4.7) (size 1 1) (layers "F.Cu") (thermal_bridge_angle 90) (options (clearance outline) (anchor circle))
      (primitives (gr_poly (pts (xy -0.19509 -0.980785) (xy -0.382683 -0.92388) (xy -0.55557 -0.83147) (xy -2.35557 0.21853) (xy -2.507107 0.342893) (xy -2.63147 0.49443) (xy -2.72388 0.667317) (xy -2.780785 0.85491) (xy -2.8 1.05) (xy -2.780785 1.24509) (xy -2.72388 1.432683) (xy -2.63147 1.60557) (xy -2.507107 1.757107) (xy -2.35557 1.88147) (xy -2.182683 1.97388) (xy -1.99509 2.030785) (xy -1.8 2.05) (xy -1.60491 2.030785) (xy -1.417317 1.97388) (xy -1.24443 1.88147) (xy 0.55557 0.83147) (xy 0.707107 0.707107) (xy 0.83147 0.55557) (xy 0.92388 0.382683) (xy 0.980785 0.19509) (xy 1 0) (xy 0.980785 -0.19509) (xy 0.92388 -0.382683) (xy 0.83147 -0.55557) (xy 0.707107 -0.707107) (xy 0.55557 -0.83147) (xy 0.382683 -0.92388) (xy 0.19509 -0.980785) (xy 0 -1)) (width 0.1) (fill yes)))
      ${p.to.str})
    (pad "2" smd custom (at 4.4 4.7) (size 1 1) (layers "B.Cu") (thermal_bridge_angle 90) (options (clearance outline) (anchor circle)) 
      (primitives (gr_poly (pts (xy -0.19509 -0.980785) (xy -0.382683 -0.92388) (xy -0.55557 -0.83147) (xy -2.35557 0.21853) (xy -2.507107 0.342893) (xy -2.63147 0.49443) (xy -2.72388 0.667317) (xy -2.780785 0.85491) (xy -2.8 1.05) (xy -2.780785 1.24509) (xy -2.72388 1.432683) (xy -2.63147 1.60557) (xy -2.507107 1.757107) (xy -2.35557 1.88147) (xy -2.182683 1.97388) (xy -1.99509 2.030785) (xy -1.8 2.05) (xy -1.60491 2.030785) (xy -1.417317 1.97388) (xy -1.24443 1.88147) (xy 0.55557 0.83147) (xy 0.707107 0.707107) (xy 0.83147 0.55557) (xy 0.92388 0.382683) (xy 0.980785 0.19509) (xy 1 0) (xy 0.980785 -0.19509) (xy 0.92388 -0.382683) (xy 0.83147 -0.55557) (xy 0.707107 -0.707107) (xy 0.55557 -0.83147) (xy 0.382683 -0.92388) (xy 0.19509 -0.980785) (xy 0 -1)) (width 0.1) (fill yes)))
      ${p.to.str})
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

    if (p.include_corner_marks) {
      final += corner_marks;
    }

    if (p.include_keycap) {
      final += keycap_marks
    }

    if (p.include_led_outline) {
      final += led_outline
    }

    if (p.include_stem_outline) {
      final += stem_outline
      final += stem_cross_outline
    }

    if (p.hotswap) {
      if (p.reversible || p.side == "F") {
        final += hotswap_front

        if (p.include_socket_silks) {
          final += hotswap_silk_front
        }

        if (p.include_socket_fabs) {
          final += hotswap_fab_front
        }
      }

      if (p.reversible || p.side == "B") {
        final += hotswap_back

        if (p.include_socket_silks) {
          final += hotswap_silk_back
        }

        if (p.include_socket_fabs) {
          final += hotswap_fab_back
        }
      }

      if (p.hotswap_3dmodel_filename) {
        final += hotswap_3dmodel
      }
    }
      
    if (p.solder) {
      if (p.reversible && p.include_custom_solder_pads) {
        if (p.hotswap) {
          final += solder_custom_reversible_top
        } else {
          final += solder_custom_reversible_bottom
        }
      } else {
        if (p.reversible || p.side == "F") {
          final += solder_front
        }

        if (p.reversible || p.side == "B") {
          final += solder_back
        }
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

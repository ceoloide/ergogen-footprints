/*
Copyright (c) 2023 Marco Massarelli

SPDX-License-Identifier: MIT

To view a copy of this license, visit https://opensource.org/license/mit/

Author: @ceoloide

Description:
   Cherry MX compatible reversible and hotswappable footprint.

Notes:
- Hotswap and solder can be used together. The solder holes will then be
  added above the hotswap holes.

Nets:
   from: corresponds to pin 1
   to: corresponds to pin 2

Params:
  side: default is B for Back
    the side on which to place the single-side footprint and designator, either F or B
  reversible: default is false
    if true, the footprint will be placed on both sides so that the PCB can be
    reversible
  hotswap: default is true
    if true, will include holes and pads for Kailh choc hotswap sockets
  solder: default is false
    if true, will include holes to solder switches (works with hotswap too)
  outer_pad_width_front: default 2.6
  outer_pad_width_back: default 2.6
    Allows you to make the outer hotswap pads smaller to silence DRC
    warnings when the sockets are too close to the edge cuts. It's not
    recommended to go below 1.6mm to ensure the hotswap socket can be
    properly soldered.
  outer_pad_height: default 2.5 (mm)
    Allows you to make the outer hotswap pad vertically shorter, e.g. to make room for 
    encoder pads to be colocated with the switch (use 2.0mm for EC12).  
   stabilizers_diameter: default is 1.9 (mm)
     Allows you to narrow stabilizer / boss holes diameter for tighter fit, not
     recommended to set below 1.7mm.
  include_keycap: default is false
    if true, will add mx sized keycap box around the footprint (18mm)
  keycap_width: default is 18 (mm - defualt MX size)
    Allows you to adjust the height of the keycap outline.
  keycap_height: default is 18 (mm - default MX size)
    Allows you to adjust the width of the keycap outline. For example,
    to show a 1.5u outline for easier aligning.
  include_corner_marks: default is false
    if true, will add corner marks to indicate plate hole size and position
  include_silkscreen: default is true
    if true it will include the silkscreen. Recommended to be true to ensure connector
    polarity is not reversed, which can lead to shorting and damage to the MCU
  switch_3dmodel_filename: default is ''
    Allows you to specify the path to a 3D model STEP or WRL file to be
    used when rendering the PCB. Use the ${VAR_NAME} syntax to point to
    a KiCad configured path.
  switch_3dmodel_xyz_offset: default is [0, 0, 0]
    xyz offset (in mm), used to adjust the position of the 3d model
    relative the footprint.
  switch_3dmodel_xyz_scale: default is [1, 1, 1]
    xyz scale, used to adjust the size of the 3d model relative to its
    original size.
  switch_3dmodel_xyz_rotation: default is [0, 0, 0]
    xyz rotation (in degrees), used to adjust the orientation of the 3d
    model relative the footprint.
  hotswap_3dmodel_filename: default is ''
    Allows you to specify the path to a 3D model to be used when rendering
    the PCB. Allows for paths using a configured path by using the
    ${VAR_NAME} syntax.
  hotswap_3dmodel_xyz_offset: default is [0, 0, 0]
    xyz offset (in mm), used to adjust the position of the 3d model
    relative the footprint.
  hotswap_3dmodel_xyz_scale: default is [1, 1, 1]
    xyz scale, used to adjust the size of the 3d model relative its
    original size.
  hotswap_3dmodel_xyz_rotation: default is [0, 0, 0]
    xyz rotation (in degrees), used to adjust the orientation of the 3d
    model relative the footprint.
  keycap_3dmodel_filename: default is ''
    Allows you to specify the path to a 3D model STEP or WRL file to be
    used when rendering the PCB. Use the ${VAR_NAME} syntax to point to
    a KiCad configured path.
  keycap_3dmodel_xyz_offset: default is [0, 0, 0]
    xyz offset (in mm), used to adjust the position of the 3d model
    relative the footprint.
  keycap_3dmodel_xyz_scale: default is [1, 1, 1]
    xyz scale, used to adjust the size of the 3d model relative to its
    original size.
  keycap_3dmodel_xyz_rotation: default is [0, 0, 0]
    xyz rotation (in degrees), used to adjust the orientation of the 3d
    model relative the footprint.
*/

module.exports = {
  params: {
    designator: 'S',
    side: 'B',
    reversible: false,
    hotswap: true,
    solder: false,
    outer_pad_width_front: 2.6,
    outer_pad_width_back: 2.6,
    outer_pad_height: 2.5,
    stabilizers_diameter: 1.9,
    include_keycap: false,
    keycap_width: 18,
    keycap_height: 18,
    include_corner_marks: false,
    include_silkscreen: true,
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
    to: undefined
  },
  body: p => {
    const common_top = `
  (footprint "ceoloide:switch_mx"
    (layer "${p.side}.Cu")
    ${p.at}
    (property "Reference" "${p.ref}"
      (at 0 -7.5 180)
      (layer "${p.side}.SilkS")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15)))
    )
    
    (pad "" np_thru_hole circle (at 0 0 90) (size 4.1 4.1) (drill 4.1) (layers "*.Cu" "*.Mask"))
    (pad "" np_thru_hole circle (at 5.08 0 180) (size ${p.stabilizers_diameter} ${p.stabilizers_diameter}) (drill ${p.stabilizers_diameter}) (layers "*.Cu" "*.Mask"))
    (pad "" np_thru_hole circle (at -5.08 0 180) (size ${p.stabilizers_diameter} ${p.stabilizers_diameter}) (drill ${p.stabilizers_diameter}) (layers "*.Cu" "*.Mask"))
    `
    const corner_marks = `
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

    const hotswap_front = `
		(pad "" np_thru_hole circle (at -2.54 -5.08 180) (size 3 3) (drill 3) (layers "F&B.Cu" "*.Mask"))
		(pad "" np_thru_hole circle (at 3.81 -2.54 180) (size 3 3) (drill 3) (layers "F&B.Cu" "*.Mask"))
		(pad "1" smd rect (at 7.085 -2.54 ${p.r}) (size 2.55 ${p.outer_pad_height}) (layers "F.Cu" "F.Paste" "F.Mask") ${p.from})
		(pad "2" smd ${p.reversible ? 'roundrect' : 'rect'}
      (at -5.842 -5.08 ${p.r})
      (size 2.55 2.5)
      (layers "F.Cu" "F.Paste" "F.Mask")${p.reversible ? `
			(roundrect_rratio 0)
			(chamfer_ratio 0.2)
			(chamfer bottom_right)` : ''}
      ${p.to}
    )
    `

    const hotswap_back = `
		(pad "" np_thru_hole circle (at 2.54 -5.08 180) (size 3 3) (drill 3) (layers "F&B.Cu" "*.Mask"))
		(pad "" np_thru_hole circle (at -3.81 -2.54 180) (size 3 3) (drill 3) (layers "F&B.Cu" "*.Mask"))
		(pad "1" smd rect (at -7.085 -2.54 ${p.r}) (size 2.55 ${p.outer_pad_height}) (layers "B.Cu" "B.Paste" "B.Mask") ${p.from})
		(pad "2" smd ${p.reversible ? 'roundrect' : 'rect'}
      (at 5.842 -5.08 ${p.r})
      (size 2.55 2.5)
      (layers "B.Cu" "B.Paste" "B.Mask")${p.reversible ? `
			(roundrect_rratio 0)
			(chamfer_ratio 0.2)
			(chamfer bottom_left)` : ''}
      ${p.to})
    `

    const hotswap_silkscreen_back = `
		(fp_poly
			(pts
				(xy -3.6 -6.5) (xy -3.8 -6.5) (xy -4.1 -6.45) (xy -4.4 -6.35) (xy -4.6 -6.25) (xy -4.75 -6.15) (xy -4.95 -6)
				(xy -5.1 -5.85) (xy -5.25 -5.65) (xy -5.4 -5.4) (xy -5.5 -5) (xy -5.5 -4.6) (xy -5.35 -4.5) (xy -5.2 -4.4)
				(xy -4.75 -4.65) (xy -4.5 -4.75) (xy -4.05 -4.85) (xy -3.55 -4.85) (xy -2.95 -4.7) (xy -2.45 -4.4) (xy -2.15 -4.15)
        (xy -1.75 -3.6) (xy -1.55 -3.05) (xy -1.5 -2.6) (xy -1.25 -2.8) (xy -0.9 -2.9) (xy -0.4 -2.95) (xy 1.65 -2.95)
        (xy 1.2 -3.2) (xy 0.95 -3.4) (xy 0.65 -3.75) (xy 0.5 -4) (xy 0.35 -4.35) (xy 0.25 -4.75) (xy 0.25 -5.05)
        (xy 0.25 -5.4) (xy 0.3 -5.65) (xy 0.45 -6.05) (xy 0.75 -6.5)
			)
			(stroke (width 0.4) (type solid))
			(fill solid)
			(layer "B.SilkS")
		)
    `
    const hotswap_silkscreen_front = `
		(fp_poly
			(pts
				(xy 3.6 -6.5) (xy 3.8 -6.5) (xy 4.1 -6.45) (xy 4.4 -6.35) (xy 4.6 -6.25) (xy 4.75 -6.15) (xy 4.95 -6)
				(xy 5.1 -5.85) (xy 5.25 -5.65) (xy 5.4 -5.4) (xy 5.5 -5) (xy 5.5 -4.6) (xy 5.35 -4.5) (xy 5.2 -4.4)
				(xy 4.75 -4.65) (xy 4.5 -4.75) (xy 4.05 -4.85) (xy 3.55 -4.85) (xy 2.95 -4.7) (xy 2.45 -4.4) (xy 2.15 -4.15)
				(xy 1.75 -3.6) (xy 1.55 -3.05) (xy 1.5 -2.6) (xy 1.25 -2.8) (xy 0.9 -2.9) (xy 0.4 -2.95) (xy -1.65 -2.95)
				(xy -1.2 -3.2) (xy -0.95 -3.4) (xy -0.65 -3.75) (xy -0.5 -4) (xy -0.35 -4.35) (xy -0.25 -4.75) (xy -0.25 -5.05)
				(xy -0.25 -5.4) (xy -0.3 -5.65) (xy -0.45 -6.05) (xy -0.75 -6.5)
			)
			(stroke (width 0.4) (type solid))
			(fill solid)
			(layer "F.SilkS")
		)
    `
    const hotswap_silkscreen_reversible = `
		(fp_line (start 1.22 -3.77) (end 0 -2.52) (stroke (width 0.1) (type default)) (layer "B.SilkS"))
		(fp_line (start 0 -2.52) (end -1.88 -2.52) (stroke (width 0.1) (type default)) (layer "B.SilkS"))
		(fp_line (start -1.22 -3.77) (end 0 -2.52) (stroke (width 0.1) (type default)) (layer "F.SilkS"))
		(fp_line (start 0 -2.52) (end 1.88 -2.52) (stroke (width 0.1) (type default)) (layer "F.SilkS"))
    `

    const solder_front = `
    (pad "1" thru_hole circle (at ${p.solder && p.hotswap ? '' : '-'}2.54 ${p.solder && p.hotswap ? '' : '-'}5.08) (size 2.286 2.286) (drill 1.4986) (layers "F&B.Cu" "*.Mask") ${p.from})
    (pad "2" thru_hole circle (at ${p.solder && p.hotswap ? '-' : ''}3.81 ${p.solder && p.hotswap ? '' : '-'}2.54) (size 2.286 2.286) (drill 1.4986) (layers "F&B.Cu" "*.Mask") ${p.to})
    `
    const solder_back = `
    (pad "1" thru_hole circle (at ${p.solder && p.hotswap ? '-' : ''}2.54 ${p.solder && p.hotswap ? '' : '-'}5.08) (size 2.286 2.286) (drill 1.4986) (layers "F&B.Cu" "*.Mask") ${p.from})
    (pad "2" thru_hole circle (at ${p.solder && p.hotswap ? '' : '-'}3.81 ${p.solder && p.hotswap ? '' : '-'}2.54) (size 2.286 2.286) (drill 1.4986) (layers "F&B.Cu" "*.Mask") ${p.to})
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

    let final = common_top;
    if (p.include_corner_marks) {
      final += corner_marks;
    }
    if (p.include_keycap) {
      final += keycap_marks;
    }
    if (p.hotswap) {
      if (p.reversible || p.side == "F") {
        final += hotswap_front;
        if (p.include_silkscree && !p.reversible) {
          final += hotswap_silkscreen_front;
        }
      }
      if (p.reversible || p.side == "B") {
        final += hotswap_back;
        if (p.include_silkscreen && !p.reversible) {
          final += hotswap_silkscreen_back;
        }
      }
      if (p.hotswap_3dmodel_filename) {
        final += hotswap_3dmodel;
      }
      if (p.include_silkscreen && p.reversible) {
        final += hotswap_silkscreen_reversible;
      }
    }
    if (p.solder) {
      if (p.reversible || p.side == "F") {
        final += solder_front;
      }
      if (p.reversible || p.side == "B") {
        final += solder_back;
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

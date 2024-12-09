// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
//
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
//
// Authors: @ergogen + (@infused-kim, @ceoloide, @achamian improvements)
//
// Description:
//  Combined Thru-Hole and SMD diode footprint for SOD-123 package, like the Semtech 1N4148W
//  component sold by Typeractive.xyz or LCSC.
//
// Datasheet:
//  https://cdn.shopify.com/s/files/1/0618/5674/3655/files/Semtech-1N4148W.pdf?v=1670451309
//
// Params:
//    side: default is B for Back
//      the side on which to place the single-side footprint and designator, either F or B
//    reversible: default is false
//      if true, the footprint will be placed on both sides so that the PCB can be
//      reversible
//    include_thru_hole_smd_pads: default is false
//      if true, the reversible pads will include a thru-hole on the SMD pad to connect
//      front to back, for ease of routing. This may make SMD soldering slightly harder.
//    include_tht: default is false
//      if true it includes through-hole pads alongside SMD ones
//    diode_3dmodel_filename: default is ''
//      Allows you to specify the path to a 3D model STEP or WRL file to be
//      used when rendering the PCB. Use the ${VAR_NAME} syntax to point to
//      a KiCad configured path.
//    diode_3dmodel_xyz_offset: default is [0, 0, 0]
//      xyz offset (in mm), used to adjust the position of the 3d model
//      relative the footprint.
//    diode_3dmodel_xyz_scale: default is [1, 1, 1]
//      xyz scale, used to adjust the size of the 3d model relative to its
//      original size.
//    diode_3dmodel_xyz_rotation: default is [0, 0, 0]
//      xyz rotation (in degrees), used to adjust the orientation of the 3d
//      model relative the footprint.
//
// @infused-kim's improvements:
//  - Add option to hide thru-holes
//  - Add virtual attribute to silence DRC error
//
// @ceoloide's improvements:
//  - Add single side support
//  - Upgrade to KiCad 8
//
// @grazfather's improvements:
//  - Add support for switch 3D model
//
// @achamian's improvements:
//  - Add thru-hole SMD pads for ease of routing

module.exports = {
  params: {
    designator: 'D',
    side: 'B',
    reversible: false,
    include_tht: false,
    thru_hole_smd_pads: false,
    diode_3dmodel_filename: '',
    diode_3dmodel_xyz_offset: [0, 0, 0],
    diode_3dmodel_xyz_rotation: [0, 0, 0],
    diode_3dmodel_xyz_scale: [1, 1, 1],
    from: { type: 'net', value: undefined },
    to: { type: 'net', value: undefined }
  },
  body: p => {
    const standard_opening = `
    (footprint "ceoloide:diode_tht_sod123"
        (layer "${p.reversible ? 'F' : p.side}.Cu")
        ${p.at}
        (property "Reference" "${p.ref}"
            (at 0 0 ${p.r})
            (layer "${p.reversible ? 'F' : p.side}.SilkS")
            ${p.ref_hide}
            (effects (font (size 1 1) (thickness 0.15)))
        )
        `
    // This can be useful to avoid confusion from the fab, since via-in-pads are usually premium
    const thru_hole_smd_pads_description = `
      (property "Description" "Thru-hole SMD pads, *NOT* via-in-pad (do not plug or tent)."
        (at 0 0 0)
        (unlocked yes)
        (layer "F.Fab")
        (hide yes)
        (effects
          (font
            (size 1.27 1.27)
          )
        )
      )
    `
    const front_silk = `
        (fp_line (start 0.25 0) (end 0.75 0) (layer "F.SilkS") (stroke (width 0.1) (type solid)))
        (fp_line (start 0.25 0.4) (end -0.35 0) (layer "F.SilkS") (stroke (width 0.1) (type solid)))
        (fp_line (start 0.25 -0.4) (end 0.25 0.4) (layer "F.SilkS") (stroke (width 0.1) (type solid)))
        (fp_line (start -0.35 0) (end 0.25 -0.4) (layer "F.SilkS") (stroke (width 0.1) (type solid)))
        (fp_line (start -0.35 0) (end -0.35 0.55) (layer "F.SilkS") (stroke (width 0.1) (type solid)))
        (fp_line (start -0.35 0) (end -0.35 -0.55) (layer "F.SilkS") (stroke (width 0.1) (type solid)))
        (fp_line (start -0.75 0) (end -0.35 0) (layer "F.SilkS") (stroke (width 0.1) (type solid)))
        `

    const front_smd_pads = `
        (pad "1" smd rect (at -1.65 0 ${p.r}) (size 0.9 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${p.to.str})
        (pad "2" smd rect (at 1.65 0 ${p.r}) (size 0.9 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${p.from.str})
        `
    const back_silk = `
        (fp_line (start 0.25 0) (end 0.75 0) (layer "B.SilkS") (stroke (width 0.1) (type solid)))
        (fp_line (start 0.25 0.4) (end -0.35 0) (layer "B.SilkS") (stroke (width 0.1) (type solid)))
        (fp_line (start 0.25 -0.4) (end 0.25 0.4) (layer "B.SilkS") (stroke (width 0.1) (type solid)))
        (fp_line (start -0.35 0) (end 0.25 -0.4) (layer "B.SilkS") (stroke (width 0.1) (type solid)))
        (fp_line (start -0.35 0) (end -0.35 0.55) (layer "B.SilkS") (stroke (width 0.1) (type solid)))
        (fp_line (start -0.35 0) (end -0.35 -0.55) (layer "B.SilkS") (stroke (width 0.1) (type solid)))
        (fp_line (start -0.75 0) (end -0.35 0) (layer "B.SilkS") (stroke (width 0.1) (type solid)))
        `
    const back_smd_pads = `
        (pad "1" smd rect (at -1.65 0 ${p.r}) (size 0.9 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${p.to.str})
        (pad "2" smd rect (at 1.65 0 ${p.r}) (size 0.9 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${p.from.str})
        `
      
    const reversible_tht_pads = `
        (pad "1" thru_hole rect (at -1.65 0 ${p.r}) (size 0.9 1.2) (drill 0.3) (layers "*.Cu" "*.Paste" "*.Mask") ${p.to.str})
        (pad "2" thru_hole rect (at 1.65 0 ${p.r}) (size 0.9 1.2) (drill 0.3) (layers "*.Cu" "*.Paste" "*.Mask") ${p.from.str})
        `

    const tht = `
        (pad "1" thru_hole rect (at -3.81 0 ${p.r}) (size 1.778 1.778) (drill 0.9906) (layers "*.Cu" "*.Mask") ${p.to.str})
        (pad "2" thru_hole circle (at 3.81 0 ${p.r}) (size 1.905 1.905) (drill 0.9906) (layers "*.Cu" "*.Mask") ${p.from.str})
        `

    const diode_3dmodel = `
        (model ${p.diode_3dmodel_filename}
            (offset (xyz ${p.diode_3dmodel_xyz_offset[0]} ${p.diode_3dmodel_xyz_offset[1]} ${p.diode_3dmodel_xyz_offset[2]}))
            (scale (xyz ${p.diode_3dmodel_xyz_scale[0]} ${p.diode_3dmodel_xyz_scale[1]} ${p.diode_3dmodel_xyz_scale[2]}))
            (rotate (xyz ${p.diode_3dmodel_xyz_rotation[0]} ${p.diode_3dmodel_xyz_rotation[1]} ${p.diode_3dmodel_xyz_rotation[2]})))
        `
    const standard_closing = `
        )
        `

    let final = standard_opening;

    if (p.side == "F" || p.reversible) {
      final += front_silk;
      if(!p.include_thru_hole_smd_pads) {
        final += front_smd_pads;
      }
    }
    if (p.side == "B" || p.reversible) {
      final += back_silk;
      if(!p.include_thru_hole_smd_pads) {
        final += back_smd_pads;
      }
    }
    if (p.include_tht) {
      final += tht;
    }
    if (p.reversible && p.include_thru_hole_smd_pads) {
      final += thru_hole_smd_pads_description;
      final += reversible_tht_pads;
    }

    if (p.diode_3dmodel_filename) {
      final += diode_3dmodel
    }

    final += standard_closing;

    return final;
  }
}

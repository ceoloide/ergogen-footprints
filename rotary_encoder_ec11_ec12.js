/*
Copyright (c) 2023 Marco Massarelli

SPDX-License-Identifier: MIT

To view a copy of this license, visit https://opensource.org/license/mit/

Author: @ceoloide

Description:
  Reversible Alps EC11 / EC12 rotary encoder footprint with customization options to make it
  compatible with Cherry MX or Choc v1 / v2 footprints, when co-located.
  
  The Alps EC12 (EC12E2440301) has a short through-shaft model that is well suited for low
  profile keyboards, although it doesn't include a momentary switch.

Notes:
- The footprint can be co-located with a Cherry MX hotswap footprint, as long as the outermost
  hotswap pads are at most 2 mm tall, so that they won't overlap with the plate mount legs
  of the rotary encoder. The encoder mounting pads can be positioned 7.5mm instead of 5.6mm to
  avoid overlap with mounting pins.
- The footprint can be co-located with a Choc v1 / v2 hotswap footprint, as long as the encoder
  pads are positioned at leat 8.254 mm. If Choc v1 is co-located with the encoder, then mounting
  pads can be positioned 8.00mm instead of 5.6mm to avoid overlap with mounting pins. Choc v2
  don't have those pins, so wouldn't need the encoder mounting pads moved.
- The footprint is inherently reversible, no solder jumper needed. Make sure to invert the pin
  assignment for pad A and C in firmware, to ensure the encoder rotation is handled consistently.

Datasheet:
  https://www.soundwell.hk/ec12-rotary-encoder.html

Params:
  side: default is F for Front
    the side on which to place the single-side footprint and designator, either F or B
  reversible: default is false
    if true, the footprint silkscreen will be placed on both sides so that the PCB can be
    reversible. Pads are all THT, and only A and C need to be reversed in software.
  include_momentary_switch_pads: default is true
    if true, the footprint will include 2 extra pads to accommodate for momentary switch pins,
    normally found in EC11-compatible rotary encoders.
  include_plate_hole_marking: default is false
    if true, will add a shape to indicate plate hole size and position for the encoder. If the
    encoder is co-located with a switch, then the regular 14mm plate hole will be slightly
    larger and work well enough.
  include_silkscreen: default is true
    if true it will include the silkscreen.
  include_plated_mounting_holes: default is true
    If true, it will include plated mounting holes and their pads, instead of just mechanical
    NPTH for the mounting pins. The advantage of NPTH is that they can be more easily co-located
    with Cherry MX mounting pins, allowing the Cherry MX hotswap pads to be 2.3 mm tall instead of
    2.0 mmm.
  mounting_holes_position: default is 5.6 (mm)
    The distance in mm from the center of the footprint where to position the side mounting
    pads. The datasheet calls for 5.7mm, but wider position can be accommodated by bending
    legs slightly, while clearing up space for switch mounting pins (i.e. 7.5mm for Cherry,
    8mm for Choc v1, see notes).
  mounting_hole_width: default is 1.5 (mm)
    The width of the mounting holes, in mm. The datasheet calls for 1.4mm rectangular, so an
    extra mm is added for the oval shape. Note that the plated pad is made 0.3mm larger.
  mounting_hole_height: default is 2.3 (mm)
    The height of the mounting holes, in mm. The datasheet calls for 2.1mm rectangular, but users
    reported a very tight fit with 2.1 mm oval holes, so the default is slightly larger. If the
    footprint is not co-located with hotswap sockets, then 2.8 mm is a safe default, as it is the
    same value used in the Sofle and other keyboards. Note that the plated pad is made 0.3mm larger.
  encoder_pads_position: default is 7.5 (mm)
    The position of the encoder pads, in mm. The datasheet calls for 7.5mm, but this makes it
    impossible for the encoder to be co-located wtih Choc v1 / v2 hotswap pads, as it would overlap.
    Increasing the value will require the encoder pins to be slightly bent. For Choc v1 / v2 use 
    8.254 as a minimum.
  encoder_3dmodel_filename: default is ''
    Allows you to specify the path to a 3D model STEP or WRL file to be
    used when rendering the PCB. Use the ${VAR_NAME} syntax to point to
    a KiCad configured path.
  encoder_3dmodel_xyz_offset: default is [0, 0, 0]
    xyz offset (in mm), used to adjust the position of the 3d model
    relative the footprint.
  encoder_3dmodel_xyz_scale: default is [1, 1, 1]
    xyz scale, used to adjust the size of the 3d model relative to its
    original size.
  encoder_3dmodel_xyz_rotation: default is [0, 0, 0]
    xyz rotation (in degrees), used to adjust the orientation of the 3d
    model relative the footprint.
*/

module.exports = {
  params: {
    designator: 'RE',
    side: 'F',
    reversible: false,
    include_momentary_switch_pads: true,
    include_plate_hole_marking: false,
    include_silkscreen: true,
    include_plated_mounting_holes: true,
    mounting_holes_position: 5.6,
    mounting_holes_height: 2.3,
    mounting_holes_width: 1.5,
    encoder_pads_position: 7.5,
    encoder_3dmodel_filename: '',
    encoder_3dmodel_xyz_offset: [0, 0, 0],
    encoder_3dmodel_xyz_rotation: [0, 0, 0],
    encoder_3dmodel_xyz_scale: [1, 1, 1],
    S1: { type: 'net', value: '' },
    S2: { type: 'net', value: '' },
    A: { type: 'net', value: 'RE_A' },
    B: { type: 'net', value: 'GND' },
    C: { type: 'net', value: 'RE_C' },
  },
  body: p => {
    const common_top = `
  (footprint "ceoloide:rotary_encoder_ec11_ec12"
    (layer "${p.side}.Cu")
    ${p.at}
    (property "Reference" "${p.ref}"
      (at 0 -8.5)
      (layer "${p.side}.${p.include_silkscreen ? 'SilkS' : 'Fab'}")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15))${p.side == 'B' ? ' (justify mirror)' : ''})
    )${p.reversible && !p.ref_hide ? `
    (fp_text user "${p.ref}"
      (at 0 -8.5)
      (layer "${p.side == 'B' ? 'F' : 'B'}.${p.include_silkscreen ? 'SilkS' : 'Fab'}")
      (effects (font (size 1 1) (thickness 0.15))${p.side == 'F' ? ' (justify mirror)' : ''})
    )`:''}
    (attr through_hole)
    (pad "A" thru_hole oval (at 2.5 ${p.encoder_pads_position} ${p.r}) (size 1.6 1.1) (drill oval 1 0.5) (layers "*.Cu" "F.Mask") ${p.A})
    (pad "B" thru_hole oval (at 0 ${p.encoder_pads_position} ${p.r}) (size 1.6 1.1) (drill oval 1 0.5) (layers "*.Cu" "F.Mask") ${p.B})
    (pad "C" thru_hole oval (at -2.5 ${p.encoder_pads_position} ${p.r}) (size 1.6 1.1) (drill oval 1 0.5) (layers "*.Cu" "F.Mask") ${p.C})
    `
    const momentary_switch_pads = `
    (pad "S1" thru_hole oval (at -2.5 -7 ${p.r}) (size 1.6 1.1) (drill oval 1 0.5) (layers "*.Cu" "F.Mask") ${p.S1})
    (pad "S2" thru_hole oval (at 2.5 -7 ${p.r}) (size 1.6 1.1) (drill oval 1 0.5) (layers "*.Cu" "F.Mask") ${p.S2})
    `
    const plated_mp = `
    (pad "" thru_hole roundrect
      (at -${p.mounting_holes_position} 0 ${p.r - 90})
      (size ${p.mounting_holes_height+0.3} ${p.mounting_holes_width+0.3})
      (drill oval ${p.mounting_holes_height} ${p.mounting_holes_width})
      (layers "*.Cu" "*.Mask")
      (roundrect_rratio 0)
      (chamfer_ratio 0.2)
      (chamfer top_right top_left)
    )
    (pad "" thru_hole roundrect
      (at ${p.mounting_holes_position} 0 ${p.r - 90})
      (size ${p.mounting_holes_height+0.3} ${p.mounting_holes_width+0.3})
      (drill oval ${p.mounting_holes_height} ${p.mounting_holes_width})
      (layers "*.Cu" "*.Mask")
      (roundrect_rratio 0)
      (chamfer_ratio 0.2)
      (chamfer bottom_right bottom_left)
    )
    `
    const npth_mp = `
    (pad "" np_thru_hole oval
      (at -${p.mounting_holes_position} 0 ${p.r - 90})
      (size ${p.mounting_holes_height} ${p.mounting_holes_width})
      (drill oval ${p.mounting_holes_height} ${p.mounting_holes_width})
    )    
    (pad "" np_thru_hole oval
      (at ${p.mounting_holes_position} 0 ${p.r - 90})
      (size ${p.mounting_holes_height} ${p.mounting_holes_width})
      (drill oval ${p.mounting_holes_height} ${p.mounting_holes_width})
    )
    `
    const plate_hole = `
    (fp_rect (start -5.9 -6) (end 5.9 6) (layer "Dwgs.User") (stroke (width 0.15) (type solid)) (fill none))
    `
    const encoder_3dmodel = `
    (model ${p.encoder_3dmodel_filename}
      (offset (xyz ${p.encoder_3dmodel_xyz_offset[0]} ${p.encoder_3dmodel_xyz_offset[1]} ${p.encoder_3dmodel_xyz_offset[2]}))
      (scale (xyz ${p.encoder_3dmodel_xyz_scale[0]} ${p.encoder_3dmodel_xyz_scale[1]} ${p.encoder_3dmodel_xyz_scale[2]}))
      (rotate (xyz ${p.encoder_3dmodel_xyz_rotation[0]} ${p.encoder_3dmodel_xyz_rotation[1]} ${p.encoder_3dmodel_xyz_rotation[2]}))
    )
    `
    const common_bottom = `
  )
    `

    let final = common_top;
    if (p.include_momentary_switch_pads) {
      final += momentary_switch_pads;
    }
    if (p.include_plated_mounting_holes) {
      final += plated_mp;
    } else {
      final += npth_mp;
    }
    if (p.include_plate_hole_marking) {
      final += plate_hole;
    }
    if (p.encoder_3dmodel_filename) {
      final += encoder_3dmodel
    }
    final += common_bottom

    return final
  }
}
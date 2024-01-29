// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: MIT
//
// To view a copy of this license, visit https://opensource.org/license/mit/
//
// Author: @ceoloide
//
// Description:
//  A non-plated, mechanical through-hole to be used for screws, standoffs or
//  other mounting options. Both the drill size and pad size can be independently
//  defined.
//
// Params:
//    side: default is F for Front
//      the side on which to place the footprint and designator, either F or B
//    hole_size: default is 2.2mm for M2 screws
//      the size of the pad around the hole
//    hole_drill: default is 2.2mm for M2 screws
//      the size of the hole to drill

module.exports = {
  params: {
      designator: 'MH',
      side: 'F',
      hole_size: '2.2',
      hole_drill: '2.2',
  },
  body: p => `
  (module "ceoloide:mounting_hole_npth" (layer ${p.side}.Cu) (tedit 5F1B9159)
      ${p.at /* parametric position */}
      (fp_text reference "${p.ref}" (at 0 2.55) (layer ${p.side}.SilkS) ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15))))
      (pad "" np_thru_hole circle (at 0 0) (size ${p.hole_size} ${p.hole_size}) (drill ${p.hole_drill}) (layers *.Cu *.Mask))
  )
  `
}

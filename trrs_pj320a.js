// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: MIT
//
// To view a copy of this license, visit https://opensource.org/license/mit/
//
// Authors: @ergogen + @ceoloide improvements
//
// Description:
//  A reversible "PJ-320A" TRRS footprint similar to the one used on
//  the Corne keyboard, and available at LCSC. The footprint offers many
//  customization options.
//
//  Normal / single side
//     _________________
//    |   (B)   (C) (D)|_
//    |                | |
//    | (A)            |_|
//    |________________|
// 
//  Reversible
//     _________________
//    |   (B)   (C) (D)|_
//    | (A)            | |
//    | (A)            |_|
//    |___(B)___(C)_(D)|
//
// Reversible & symmetrical
//     _________________
//    | ( A ) (C)   (D)|_
//    |                |_|
//    |_( A )_(C)___(D)|
//
// Datasheet:
//  https://datasheet.lcsc.com/lcsc/2311241628_Hong-Cheng-HC-PJ-320A_C7501806.pdf
//
// Nets:
//    A: corresponds to pin 1
//    B: corresponds to pin 2
//    C: corresponds to pin 3 (pin 2 symmetrical)
//    D: corresponds to pin 4 (pin 3 symmetrical)
//
// Params:
//    side: default is F for Front
//      the side on which to place the single-side footprint and designator, either F or B
//    reversible: default is false
//      if true, the footprint will be placed on both sides so that the PCB can be
//      reversible
//    symmetric: default is false
//      if true, will only work if reversible is also true
//      this will cause the footprint to be symmetrical on each half, however
//      reducing the footprint to three pins, A, C, and D
//
// @ceoloide's improvements:
//  - Add oval pad when symmetrical

module.exports = {
  params: {
    designator: 'TRRS',
    side: 'F',
    reversible: false,
    symmetric: false,
    A: { type: 'net', value: 'A' },
    B: { type: 'net', value: 'B' },
    C: { type: 'net', value: 'C' },
    D: { type: 'net', value: 'D' },
  },
  body: p => {

    let footprint_name = "trrs_pj320a"
    if (p.reversible) {
      if (p.symmetric) {
        footprint_name += " (reversible, symmetric)"
      } else {
        footprint_name += " (reversible)"
      }
    }

    const standard_opening = `
      (module "ceoloide:${footprint_name}" (layer ${p.side}.Cu) (tedit 5970F8E5)

      ${p.at /* parametric position */}   

      ${'' /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 14.2) (layer ${p.side}.SilkS) ${p.ref_hide} (effects (font (size 1 1) (thickness 0.153))))
      (fp_text value TRRS-PJ-320A-dual (at 0 -5.6) (layer ${p.side}.Fab) (effects (font (size 1 1) (thickness 0.153))))

      ${''/* corner marks */}
      (fp_line (start 0.5 -2) (end -5.1 -2) (layer Dwgs.User) (width 0.15))
      (fp_line (start -5.1 0) (end -5.1 -2) (layer Dwgs.User) (width 0.15))
      (fp_line (start 0.5 0) (end 0.5 -2) (layer Dwgs.User) (width 0.15))
      (fp_line (start -5.35 0) (end -5.35 12.1) (layer Dwgs.User) (width 0.15))
      (fp_line (start 0.75 0) (end 0.75 12.1) (layer Dwgs.User) (width 0.15))
      (fp_line (start 0.75 12.1) (end -5.35 12.1) (layer Dwgs.User) (width 0.15))
      (fp_line (start 0.75 0) (end -5.35 0) (layer Dwgs.User) (width 0.15))
      `
    function stabilizers(def_pos) {
      return `
        (pad "" np_thru_hole circle (at ${def_pos} 8.6) (size 1.5 1.5) (drill 1.5) (layers *.Cu *.Mask))
        (pad "" np_thru_hole circle (at ${def_pos} 1.6) (size 1.5 1.5) (drill 1.5) (layers *.Cu *.Mask))
      `
    }
    function pins(def_neg, def_pos) {
      if (p.symmetric && p.reversible) {
        return `
          (pad 1 thru_hole oval (at ${def_pos} 10.75 ${p.rot}) (size 1.6 3.3) (drill oval 0.9 2.6) (layers *.Cu *.Mask) ${p.A.str})
          (pad 2 thru_hole oval (at ${def_pos} 6.2 ${p.rot}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.C.str})
          (pad 3 thru_hole oval (at ${def_pos} 3.2 ${p.rot}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.D.str})
        `
      } else {
        return `
          (pad 1 thru_hole oval (at ${def_neg} 11.3 ${p.rot}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.A.str})
          (pad 2 thru_hole oval (at ${def_pos} 10.2 ${p.rot}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.B.str})
          (pad 3 thru_hole oval (at ${def_pos} 6.2 ${p.rot}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.C.str})
          (pad 4 thru_hole oval (at ${def_pos} 3.2 ${p.rot}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers *.Cu *.Mask) ${p.D.str})
        `
      }
    }
    if (p.reversible & p.symmetric) {
      return `
        ${standard_opening}
        ${stabilizers('-2.3')}
        ${pins('0', '-4.6')}
        ${pins('-4.6', '0')}
        )
      `
    } else if (p.reversible) {
      return `
          ${standard_opening}
          ${stabilizers('-2.3')}
          ${stabilizers('0')}
          ${pins('-2.3', '2.3')}
          ${pins('0', '-4.6')}
          )
        `
    } else {
      return `
        ${standard_opening}
        ${stabilizers('-2.3')}
        ${pins('-4.6', '0')}
        )
      `
    }
  }
}
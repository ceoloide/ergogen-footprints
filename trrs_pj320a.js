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
//     ____________________
//    |   (TP)   (R2) (SL)|_
//    |                   | |
//    | (R1)              |_|
//    |___________________|
// 
//  Reversible
//     ____________________
//    |   (TP)   (R2) (SL)|_
//    | (R1)              | |
//    | (R1)              |_|
//    |___(TP)___(R2)_(SL)|
//
// Reversible & symmetrical
//     ___________________
//    | ( TP) (R2)   (SL)|_
//    |                  |_|
//    |_( TP)_(R2)___(SL)|
//
// Datasheet:
//  https://datasheet.lcsc.com/lcsc/2311241628_Hong-Cheng-HC-PJ-320A_C7501806.pdf
//
// Nets:
//    SL: corresponds to pin 2 (Sleeve)
//    R2: corresponds to pin 3 (Ring 2)
//    R1: corresponds to pin 1 (Ring 1)
//    TP: corresponds to pin 4 (Tip)
//
// Warning:
//    TRRS cables should never be hotswapped (removed or inserted when the MCU is turned on).
//    To minimize the chance of damaging the MCU, connect VCC to the tip (TP) and GND on the
//    sleeve (SL).
//
// Params:
//    side: default is F for Front
//      the side on which to place the single-side footprint and designator, either F or B
//    reversible: default is false
//      if true, the footprint will be placed on both sides so that the PCB can be
//      reversible
//    symmetric: default is false
//      if true, it will only work if reversible is also true. This will cause the
//      footprint to be symmetrical on each half, however reducing the footprint
//      to three pins: TP, R2, and SL
//
// @ceoloide's improvements:
//  - Add oval pad when symmetrical
//  - Adjust positioning to be symmetrical
//  - Revamp pinout and nets
//  - Upgrade to KiCad 8

module.exports = {
  params: {
    designator: 'TRRS',
    side: 'F',
    reversible: false,
    symmetric: false,
    TP: { type: 'net', value: 'TP' },
    R1: { type: 'net', value: 'R1' },
    R2: { type: 'net', value: 'R2' },
    SL: { type: 'net', value: 'SL' },
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
  (footprint "ceoloide:${footprint_name}"
    (layer "${p.side}.Cu")
    ${p.at}
    (property "Reference" "${p.ref}"
      (at 0 14.2 ${p.r})
      (layer "${p.side}.SilkS")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15)))
    )
    `
    function corner_marks(offset_x) {
      return `
    (fp_line (start ${2.8 + offset_x} -2) (end ${-2.8 + offset_x} -2) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start ${-2.8 + offset_x} 0) (end ${-2.8 + offset_x} -2) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start ${2.8 + offset_x} 0) (end ${2.8 + offset_x} -2) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start ${-3.05 + offset_x} 0) (end ${-3.05 + offset_x} 12.1) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start ${3.05 + offset_x} 0) (end ${3.05 + offset_x} 12.1) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start ${3.05 + offset_x} 12.1) (end ${-3.05 + offset_x} 12.1) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start ${3.05 + offset_x} 0) (end ${-3.05 + offset_x} 0) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
      `
    }
    function stabilizers(def_pos) {
      return `
    (pad "" np_thru_hole circle (at ${def_pos} 8.6 ${p.r}) (size 1.5 1.5) (drill 1.5) (layers "*.Cu" "*.Mask"))
    (pad "" np_thru_hole circle (at ${def_pos} 1.6 ${p.r}) (size 1.5 1.5) (drill 1.5) (layers "*.Cu" "*.Mask"))
      `
    }
    function pins(def_neg, def_pos) {
      if (p.symmetric && p.reversible) {
        return `
    (pad 2 thru_hole oval (at ${def_pos} 3.2 ${p.r}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers "*.Cu" "*.Mask") ${p.SL.str})
    (pad 3 thru_hole oval (at ${def_pos} 6.2 ${p.r}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers "*.Cu" "*.Mask") ${p.R2.str})
    (pad 4 thru_hole oval (at ${def_pos} 10.75 ${p.r}) (size 1.6 3.3) (drill oval 0.9 2.6) (layers "*.Cu" "*.Mask") ${p.TP.str})
        `
      } else {
        return `
    (pad 2 thru_hole oval (at ${def_pos} 3.2 ${p.r}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers "*.Cu" "*.Mask") ${p.SL.str})
    (pad 3 thru_hole oval (at ${def_pos} 6.2 ${p.r}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers "*.Cu" "*.Mask") ${p.R2.str})
    (pad 4 thru_hole oval (at ${def_pos} 10.2 ${p.r}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers "*.Cu" "*.Mask") ${p.TP.str})
    (pad 5 thru_hole oval (at ${def_neg} 11.3 ${p.r}) (size 1.6 2.2) (drill oval 0.9 1.5) (layers "*.Cu" "*.Mask") ${p.R1.str})
        `
      }
    }
    if (p.reversible & p.symmetric) {
      return `
    ${standard_opening}
    ${corner_marks(0)}
    ${stabilizers(0)}
    ${pins(2.3, -2.3)}
    ${pins(-2.3, 2.3)}
  )
      `
    } else if (p.reversible) {
      return `
    ${standard_opening}
    ${corner_marks(1.15)}
    ${stabilizers(-1.15)}
    ${stabilizers(1.15)}
    ${pins(-1.15, 3.45)}
    ${pins(1.15, -3.45)}
  )
      `
    } else {
      return `
    ${standard_opening}
    ${corner_marks(0)}
    ${stabilizers(0)}
    ${p.side == 'F' ? pins(-2.3, 2.3) : pins(2.3, -2.3) }
  )
    `
    }
  }
}

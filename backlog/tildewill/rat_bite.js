/*
Copyright (c) 2023 Marco Massarelli

SPDX-License-Identifier: MIT

To view a copy of this license, visit https://opensource.org/license/mit/

Author: @TildeWill
*/
module.exports = {
  params: {
    designator: 'RB', // for Rat Bite
  },
  body: p => {
    const footprint = `
  (module "zzkeeb:Hole_Breakaway-Tabs" (layer "F.Cu")
      ${p.at /* parametric position */}
      (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))

      (attr virtual)
      
      (fp_line (start -3 -0.2) (end 3 -0.2) (width 0.12) (layer "Dwgs.User") )
      (fp_line (start -3 0.2) (end 3 0.2) (width 0.12) (layer "Dwgs.User") )
      (pad "" np_thru_hole circle (at -2.375 0 90) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask") )
      (pad "" np_thru_hole circle (at -1.78125 0 90) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask") )
      (pad "" np_thru_hole circle (at -1.1875 0 90) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask") )
      (pad "" np_thru_hole circle (at -0.59375 0 90) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask") )
      (pad "" np_thru_hole circle (at 0 0 90) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask") )
      (pad "" np_thru_hole circle (at 0.59375 0 90) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask") )
      (pad "" np_thru_hole circle (at 1.1875 0 90) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask") )
      (pad "" np_thru_hole circle (at 1.78125 0 90) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask") )
      (pad "" np_thru_hole circle (at 2.375 0 90) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask") )
  )
  `
    return footprint;
  }
}
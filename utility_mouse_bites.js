// Copyright (c) 2023 Marco Massarelli
// SPDX-License-Identifier: MIT
// License: https://opensource.org/license/mit/
// Author: @TildeWill
//
// Description:
// Nine 0.3 mm non-plated holes on a 0.59375 mm pitch for a breakaway tab.
// Drawing lines mark the tab; they do not create a board outline.
//
// Nets:
// None.
//
// Params:
// designator: default "RB". Reference prefix.

module.exports = {
  params: {
    designator: 'RB', // for Rat Bite
  },
  body: p => {
    const common_start = `
      (footprint "ceoloide:utility_mouse_bites"
        (layer "F.Cu")
        ${p.at}
        (property "Reference" "${p.ref}" (at 0 0 ${p.r}) (layer "F.SilkS") ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
        (attr board_only exclude_from_pos_files exclude_from_bom)
    `;
    const pads = `
        (pad "" np_thru_hole circle (at -2.375 0 ${p.r + 90}) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask"))
        (pad "" np_thru_hole circle (at -1.78125 0 ${p.r + 90}) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask"))
        (pad "" np_thru_hole circle (at -1.1875 0 ${p.r + 90}) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask"))
        (pad "" np_thru_hole circle (at -0.59375 0 ${p.r + 90}) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask"))
        (pad "" np_thru_hole circle (at 0 0 ${p.r + 90}) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask"))
        (pad "" np_thru_hole circle (at 0.59375 0 ${p.r + 90}) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask"))
        (pad "" np_thru_hole circle (at 1.1875 0 ${p.r + 90}) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask"))
        (pad "" np_thru_hole circle (at 1.78125 0 ${p.r + 90}) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask"))
        (pad "" np_thru_hole circle (at 2.375 0 ${p.r + 90}) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask"))
    `;
    const drawings = `
        (fp_line (start -3 -0.2) (end 3 -0.2) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
        (fp_line (start -3 0.2) (end 3 0.2) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
    `;
    const common_end = ')';

    let final = common_start;
    final += pads;
    final += drawings;
    final += common_end;
    return final;
  },
};

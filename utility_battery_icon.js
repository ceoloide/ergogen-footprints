// Copyright (c) 2023 Marco Massarelli
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
// License: https://creativecommons.org/licenses/by-nc-sa/4.0/
// Author: @infused-kim
//
// Description:
// Positive and negative battery polarity symbols on silkscreen.
//
// Nets:
// None.
//
// Params:
// designator: default "ICON". Reference prefix.
// side: default "F". Placement face: 'F' or 'B'.
// reversible: default false. Emit the alternative mounting geometry as well.
// spacing: default 1. Additional gap between the polarity symbols in mm.

module.exports = {
  params: {
    designator: 'ICON',
    side: 'F',
    reversible: false,
    spacing: 1,
  },
  body: p => {
    if (!['F', 'B'].includes(p.side)) throw new Error('side must be F or B');
    const spacing_adj = p.spacing / 2;

    const common_start = `
      (footprint "ceoloide:utility_battery_icon" (layer "${p.side}.Cu")
        ${p.at}
        (attr board_only exclude_from_pos_files exclude_from_bom)
      (property "Reference" "${p.ref}" (at 0 3 ${p.r}) (layer "${p.side}.SilkS") ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15)) ${p.side == 'B' ? '(justify mirror)' : ''}))

    `;

    const front = `
          (fp_circle (center ${-0.55 - spacing_adj} 0) (end ${-0.05 - spacing_adj} 0) (layer "F.SilkS") (stroke (width 0.1) (type solid)) (fill none))
        (fp_line (start ${-0.55 - spacing_adj} -0.3) (end ${-0.55 - spacing_adj} 0.3) (layer "F.SilkS") (stroke (width 0.1) (type solid)))
        (fp_line (start ${-0.85 - spacing_adj} 0) (end ${-0.25 - spacing_adj} 0) (layer "F.SilkS") (stroke (width 0.1) (type solid)))

        (fp_circle (center ${0.55 + spacing_adj} 0) (end ${1.05 + spacing_adj} 0) (layer "F.SilkS") (stroke (width 0.1) (type solid)) (fill none))
        (fp_line (start ${0.25 + spacing_adj} 0) (end ${0.85 + spacing_adj} 0) (layer "F.SilkS") (stroke (width 0.1) (type solid)))
    `;

    const back = `
        (fp_circle (center ${-0.55 - spacing_adj} 0) (end ${-1.05 - spacing_adj} 0) (layer "B.SilkS") (stroke (width 0.1) (type solid)) (fill none))
        (fp_line (start ${-0.25 - spacing_adj} 0) (end ${-0.85 - spacing_adj} 0) (layer "B.SilkS") (stroke (width 0.1) (type solid)))

        (fp_circle (center ${0.55 + spacing_adj} 0) (end ${0.05 + spacing_adj} 0) (layer "B.SilkS") (stroke (width 0.1) (type solid)) (fill none))
        (fp_line (start ${0.55 + spacing_adj} -0.3) (end ${0.55 + spacing_adj} 0.3) (layer "B.SilkS") (stroke (width 0.1) (type solid)))
        (fp_line (start ${0.85 + spacing_adj} 0) (end ${0.25 + spacing_adj} 0) (layer "B.SilkS") (stroke (width 0.1) (type solid)))
    `;

    const common_end = `
    )
    `;

    let final = common_start;

    if (p.side == 'F' || p.reversible) {
      final += front;
    }
    if (p.side == 'B' || p.reversible) {
      final += back;
    }

    final += common_end;

    return final;
  },
};

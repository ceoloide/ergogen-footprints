// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
//
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
//
// Author: @infused-kim
//
// Description:
// Shows battery icons on the PCB silkscreen.

module.exports = {
  params: {
    designator: 'ICON',
    side: 'F',
    reverse: false,
    spacing: 1
  },
  body: p => {
    const spacing_adj = p.spacing / 2;

    const top = `
      (module icon_bat (layer F.Cu) (tedit 64461058)
        ${p.at /* parametric position */}
        (attr virtual)

    `;

    const front = `
        (fp_text reference "${p.ref}" (at 0 3 ${p.rot}) (layer F.SilkS) ${p.ref_hide}
          (effects (font (size 1 1) (thickness 0.15)))
        )
        (fp_circle (center ${-0.55 - spacing_adj} 0) (end ${-0.05 - spacing_adj} 0) (layer F.SilkS) (width 0.1))
        (fp_line (start ${-0.55 - spacing_adj} -0.3) (end ${-0.55 - spacing_adj} 0.3) (layer F.SilkS) (width 0.1))
        (fp_line (start ${-0.85 - spacing_adj} 0) (end ${-0.25 - spacing_adj} 0) (layer F.SilkS) (width 0.1))

        (fp_circle (center ${0.55 + spacing_adj} 0) (end ${1.05 + spacing_adj}  0) (layer F.SilkS) (width 0.1))
        (fp_line (start ${0.25 + spacing_adj} 0) (end ${0.85 + spacing_adj} 0) (layer F.SilkS) (width 0.1))
    `

    const back = `
        (fp_circle (center ${-0.55 - spacing_adj} 0) (end ${-1.05 - spacing_adj}  0) (layer B.SilkS) (width 0.1))
        (fp_line (start ${-0.25 - spacing_adj} 0) (end ${-0.85 - spacing_adj} 0) (layer B.SilkS) (width 0.1))

        (fp_circle (center ${0.55 + spacing_adj} 0) (end ${0.05 + spacing_adj} 0) (layer B.SilkS) (width 0.1))
        (fp_line (start ${0.55 + spacing_adj} -0.3) (end ${0.55 + spacing_adj} 0.3) (layer B.SilkS) (width 0.1))
        (fp_line (start ${0.85 + spacing_adj} 0) (end ${0.25 + spacing_adj} 0) (layer B.SilkS) (width 0.1))
    `

    const bottom = `
    )
    `

    let final = top;

    if (p.side == "F" || p.reverse) {
      final += front;
    }
    if (p.side == "B" || p.reverse) {
      final += back;
    }

    final += bottom;

    return final;
  }
}
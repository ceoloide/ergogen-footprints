// Copyright (c) 2023 Marco Massarelli
// SPDX-License-Identifier: MIT
// License: https://opensource.org/license/mit/
// Author: @ergogen / @MrZealot
//
// Description:
// Footprint-style tented plated hole, 0.6 mm copper / 0.3 mm drill.
// This is a through-hole pad, not a board-level KiCad via.
//
// Nets:
// net → plated pad 1.
//
// Params:
// designator: default "VIA". Reference prefix.
// Net defaults: net="required".

module.exports = {
  params: {
    designator: 'VIA',
    net: { type: 'net', value: undefined },
  },
  body: p => {
    const common_start = `
      (footprint "ceoloide:utility_via"
        (layer "F.Cu")
        ${p.at}
        (property "Reference" "${p.ref}" (at 0 1.4 ${p.r}) (layer "F.SilkS") ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15))))
        (property "Value" "VIA-0.6mm" (at 0 -1.4 ${p.r}) (layer "F.Fab") hide (effects (font (size 1 1) (thickness 0.15))))
    `;
    const pads = `
        (pad "1" thru_hole circle (at 0 0 ${p.r}) (size 0.6 0.6) (drill 0.3) (layers "*.Cu") (zone_connect 2) ${p.net.str})
    `;
    const common_end = ')';

    let final = common_start;
    final += pads;
    final += common_end;
    return final;
  },
};

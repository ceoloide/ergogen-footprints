// Copyright (c) 2023 Marco Massarelli
// SPDX-License-Identifier: MIT
// License: https://opensource.org/license/mit/
// Author: @ergogen / @MrZealot
//
// Description:
// Two rectangular solder-jumper pads, retaining the legacy paste openings.
//
// Nets:
// from → pad 1; to → pad 2.
//
// Params:
// designator: default "J". Reference prefix.
// side: default "F". Placement face: 'F' or 'B'.
// Net defaults: from="required", to="required".

module.exports = {
  params: {
    designator: 'J',
    side: 'F',
    from: { type: 'net', value: undefined },
    to: { type: 'net', value: undefined },
  },
  body: p => {
    const common_start = `
      (footprint "ceoloide:utility_solder_jumper"
        (layer "${p.side}.Cu")
        ${p.at}
        (property "Reference" "${p.ref}" (at 0 0 ${p.r}) (layer "${p.side}.SilkS") ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15)) ${p.side == 'B' ? '(justify mirror)' : ''}))
        (property "Value" "Jumper" (at 0 -7.3 ${p.r}) (layer "F.Fab") (effects (font (size 1 1) (thickness 0.15))))
    `;
    const pads = `
        (pad "1" smd rect (at -0.50038 0 ${p.r}) (size 0.635 1.143) (layers "${p.side}.Cu" "${p.side}.Paste" "${p.side}.Mask") (clearance 0.1905) ${p.from.str})
        (pad "2" smd rect (at 0.50038 0 ${p.r}) (size 0.635 1.143) (layers "${p.side}.Cu" "${p.side}.Paste" "${p.side}.Mask") (clearance 0.1905) ${p.to.str})
    `;
    const common_end = ')';

    let final = common_start;
    final += pads;
    final += common_end;
    return final;
  },
};

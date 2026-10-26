// Copyright (c) 2023 Marco Massarelli
// SPDX-License-Identifier: MIT
// License: https://opensource.org/license/mit/
// Author: @ergogen / @MrZealot
//
// Description:
// Alps switch contact holes and 14 mm corner marks. No hotswap socket.
//
// Nets:
// from → pad 1; to → pad 2.
//
// Params:
// designator: default "S". Reference prefix.
// Net defaults: from="required", to="required".

module.exports = {
  params: {
    designator: 'S',
    from: { type: 'net', value: undefined },
    to: { type: 'net', value: undefined },
  },
  body: p => {
    const common_start = `
      (footprint "ceoloide:switch_alps"
        (layer "F.Cu")
        ${p.at}
        (property "Reference" "${p.ref}" (at 0 0 ${p.r}) (layer "F.SilkS") ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
        (property "Value" "" (at 0 0 ${p.r}) (layer "F.SilkS") hide (effects (font (size 1.27 1.27) (thickness 0.15))))
    `;
    const pads = `
        (pad "1" thru_hole circle (at 2.5 -4.5 ${p.r}) (size 2.25 2.25) (drill 1.47) (layers "*.Cu" "*.Mask") ${p.from.str})
        (pad "2" thru_hole circle (at -2.5 -4 ${p.r}) (size 2.25 2.25) (drill 1.47) (layers "*.Cu" "*.Mask") ${p.to.str})
    `;
    const drawings = `
        (fp_line (start -7 -6) (end -7 -7) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
        (fp_line (start -7 7) (end -6 7) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
        (fp_line (start -6 -7) (end -7 -7) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
        (fp_line (start -7 7) (end -7 6) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
        (fp_line (start 7 6) (end 7 7) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
        (fp_line (start 7 -7) (end 6 -7) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
        (fp_line (start 6 7) (end 7 7) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
        (fp_line (start 7 -7) (end 7 -6) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    `;
    const common_end = ')';

    let final = common_start;
    final += pads;
    final += drawings;
    final += common_end;
    return final;
  },
};

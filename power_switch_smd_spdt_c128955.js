// Copyright (c) 2023 Marco Massarelli
// SPDX-License-Identifier: MIT
// License: https://opensource.org/license/mit/
// Author: @ergogen / @MrZealot
//
// Description:
// Legacy C128955 SPDT slide-switch land pattern, used as an on/off switch.
// Pad 3 and the four mounting tabs retain the source unassigned copper.
//
// Nets:
// from → pad 1; to → common pad 2.
//
// Params:
// designator: default "T". Reference prefix.
// side: default "F". Placement face: 'F' or 'B'.
// Net defaults: from="required", to="required".

module.exports = {
  params: {
    designator: 'T', // for Toggle
    side: 'F',
    from: { type: 'net', value: undefined },
    to: { type: 'net', value: undefined },
  },
  body: p => {
    if (!['F', 'B'].includes(p.side)) throw new Error('side must be F or B');
    const left = p.side == 'F' ? '-' : '';
    const right = p.side == 'F' ? '' : '-';

    const common_start = `
      (footprint "ceoloide:power_switch_smd_spdt_c128955"
        (layer "${p.side}.Cu")
        ${p.at}
        (property "Reference" "${p.ref}" (at 0 0 ${p.r}) (layer "${p.side}.SilkS") ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15)) ${p.side == 'B' ? '(justify mirror)' : ''}))
        (property "Value" "" (at 0 0 ${p.r}) (layer "F.SilkS") hide (effects (font (size 1.27 1.27) (thickness 0.15))))
    `;
    const pads = `
        (pad "" np_thru_hole circle (at 1.5 0 ${p.r}) (size 1 1) (drill 0.9) (layers "*.Cu" "*.Mask"))
        (pad "" np_thru_hole circle (at -1.5 0 ${p.r}) (size 1 1) (drill 0.9) (layers "*.Cu" "*.Mask"))
        (pad "1" smd rect (at ${right}2.25 2.075 ${p.r}) (size 0.9 1.25) (layers "${p.side}.Cu" "${p.side}.Paste" "${p.side}.Mask") ${p.from.str})
        (pad "2" smd rect (at ${left}0.75 2.075 ${p.r}) (size 0.9 1.25) (layers "${p.side}.Cu" "${p.side}.Paste" "${p.side}.Mask") ${p.to.str})
        (pad "3" smd rect (at ${left}2.25 2.075 ${p.r}) (size 0.9 1.25) (layers "${p.side}.Cu" "${p.side}.Paste" "${p.side}.Mask"))
        (pad "" smd rect (at 3.7 -1.1 ${p.r}) (size 0.9 0.9) (layers "${p.side}.Cu" "${p.side}.Paste" "${p.side}.Mask"))
        (pad "" smd rect (at 3.7 1.1 ${p.r}) (size 0.9 0.9) (layers "${p.side}.Cu" "${p.side}.Paste" "${p.side}.Mask"))
        (pad "" smd rect (at -3.7 1.1 ${p.r}) (size 0.9 0.9) (layers "${p.side}.Cu" "${p.side}.Paste" "${p.side}.Mask"))
        (pad "" smd rect (at -3.7 -1.1 ${p.r}) (size 0.9 0.9) (layers "${p.side}.Cu" "${p.side}.Paste" "${p.side}.Mask"))
    `;
    const silkscreen = `
        (fp_line (start 1.95 -1.35) (end -1.95 -1.35) (layer "${p.side}.SilkS") (stroke (width 0.15) (type solid)))
        (fp_line (start 0 -1.35) (end -3.3 -1.35) (layer "${p.side}.SilkS") (stroke (width 0.15) (type solid)))
        (fp_line (start -3.3 -1.35) (end -3.3 1.5) (layer "${p.side}.SilkS") (stroke (width 0.15) (type solid)))
        (fp_line (start -3.3 1.5) (end 3.3 1.5) (layer "${p.side}.SilkS") (stroke (width 0.15) (type solid)))
        (fp_line (start 3.3 1.5) (end 3.3 -1.35) (layer "${p.side}.SilkS") (stroke (width 0.15) (type solid)))
        (fp_line (start 0 -1.35) (end 3.3 -1.35) (layer "${p.side}.SilkS") (stroke (width 0.15) (type solid)))
    `;
    const drawings = `
        (fp_line (start -1.95 -3.85) (end 1.95 -3.85) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
        (fp_line (start 1.95 -3.85) (end 1.95 -1.35) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
        (fp_line (start -1.95 -1.35) (end -1.95 -3.85) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    `;
    const common_end = ')';

    let final = common_start;
    final += pads;
    final += silkscreen;
    final += drawings;
    final += common_end;
    return final;
  },
};

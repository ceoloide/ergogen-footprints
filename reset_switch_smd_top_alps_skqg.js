// Copyright (c) 2018 Bán Dénes
// SPDX-License-Identifier: MIT
// License: https://opensource.org/license/mit/
// Author: @ergogen / @MrZealot
//
// Description:
// Alps SKQGABE010-style top-actuated tactile switch from Ergogen core.
// This is different from the FSM8JH through-hole button in the backlog.
//
// Nets:
// from → both pad 1 terminals; to → both pad 2 terminals.
//
// Params:
// designator: default "B". Reference prefix.
// side: default "F". Placement face: 'F' or 'B'.
// Net defaults: from="required", to="required".

module.exports = {
  params: {
    designator: 'B', // for Button
    side: 'F',
    from: { type: 'net', value: undefined },
    to: { type: 'net', value: undefined },
  },
  body: p => {
    const common_start = `
      (footprint "ceoloide:reset_switch_smd_top_alps_skqg"
        (layer "${p.side}.Cu")
        (descr "Low-profile SMD Tactile Switch, https://www.e-switch.com/product-catalog/tact/product-lines/tl3342-series-low-profile-smt-tact-switch")
        (tags "SPST Tactile Switch")
        ${p.at}
        (property "Reference" "${p.ref}" (at 0 0 ${p.r}) (layer "${p.side}.SilkS") ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15)) ${p.side == 'B' ? '(justify mirror)' : ''}))
        (property "Value" "" (at 0 0 ${p.r}) (layer "${p.side}.SilkS") hide (effects (font (size 1.27 1.27) (thickness 0.15)) ${p.side == 'B' ? '(justify mirror)' : ''}))
    `;
    const pads = `
        (pad "1" smd rect (at -3.1 -1.85 ${p.r}) (size 1.8 1.1) (layers "${p.side}.Cu" "${p.side}.Paste" "${p.side}.Mask") ${p.from.str})
        (pad "1" smd rect (at 3.1 -1.85 ${p.r}) (size 1.8 1.1) (layers "${p.side}.Cu" "${p.side}.Paste" "${p.side}.Mask") ${p.from.str})
        (pad "2" smd rect (at -3.1 1.85 ${p.r}) (size 1.8 1.1) (layers "${p.side}.Cu" "${p.side}.Paste" "${p.side}.Mask") ${p.to.str})
        (pad "2" smd rect (at 3.1 1.85 ${p.r}) (size 1.8 1.1) (layers "${p.side}.Cu" "${p.side}.Paste" "${p.side}.Mask") ${p.to.str})
    `;
    const silkscreen = `
        (fp_line (start 2.75 1.25) (end 1.25 2.75) (layer "${p.side}.SilkS") (stroke (width 0.15) (type solid)))
        (fp_line (start 2.75 -1.25) (end 1.25 -2.75) (layer "${p.side}.SilkS") (stroke (width 0.15) (type solid)))
        (fp_line (start 2.75 -1.25) (end 2.75 1.25) (layer "${p.side}.SilkS") (stroke (width 0.15) (type solid)))
        (fp_line (start -1.25 2.75) (end 1.25 2.75) (layer "${p.side}.SilkS") (stroke (width 0.15) (type solid)))
        (fp_line (start -1.25 -2.75) (end 1.25 -2.75) (layer "${p.side}.SilkS") (stroke (width 0.15) (type solid)))
        (fp_line (start -2.75 1.25) (end -1.25 2.75) (layer "${p.side}.SilkS") (stroke (width 0.15) (type solid)))
        (fp_line (start -2.75 -1.25) (end -1.25 -2.75) (layer "${p.side}.SilkS") (stroke (width 0.15) (type solid)))
        (fp_line (start -2.75 -1.25) (end -2.75 1.25) (layer "${p.side}.SilkS") (stroke (width 0.15) (type solid)))
    `;
    const common_end = ')';

    let final = common_start;
    final += pads;
    final += silkscreen;
    final += common_end;
    return final;
  },
};

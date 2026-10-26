// Copyright (c) 2023 Marco Massarelli
// SPDX-License-Identifier: MIT
// License: https://opensource.org/license/mit/
// Author: @ergogen / @MrZealot
//
// Description:
// Legacy FSM8JH four-terminal through-hole tactile switch.
// Pads 1 and 2 carry the circuit nets; 3 and 4 retain the source unassigned pads.
//
// Nets:
// to → pad 1; from → pad 2. Pads 3/4 are unassigned.
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
    if (!['F', 'B'].includes(p.side)) throw new Error('side must be F or B');
    const side_sign = p.side == 'B' ? -1 : 1;
    const common_start = `
      (footprint "ceoloide:reset_switch_tht_fsm8jh"
        (layer "${p.side}.Cu")
        ${p.at}
        (descr "")
        (property "Reference" "${p.ref}" (at ${side_sign * -1.71258} -4.01401 ${p.r}) (layer "${p.side}.SilkS") ${p.ref_hide} (effects (font (size 0.801196850394 0.801196850394) (thickness 0.15)) ${p.side == 'B' ? '(justify mirror)' : ''}))
        (property "Value" "SW_FSM8JH" (at ${side_sign * 0.50808} 3.9377 ${p.r}) (layer "${p.side}.Fab") (effects (font (size 0.800141732283 0.800141732283) (thickness 0.15)) ${p.side == 'B' ? '(justify mirror)' : ''}))
    `;
    const pads = `
        (pad "1" thru_hole rect (at ${side_sign * -3.25} -2.25 ${p.r}) (size 1.498 1.498) (drill 0.99) (layers "*.Cu" "*.Mask") ${p.to.str})
        (pad "3" thru_hole circle (at ${side_sign * 3.25} -2.25 ${p.r}) (size 1.498 1.498) (drill 0.99) (layers "*.Cu" "*.Mask"))
        (pad "2" thru_hole circle (at ${side_sign * -3.25} 2.25 ${p.r}) (size 1.498 1.498) (drill 0.99) (layers "*.Cu" "*.Mask") ${p.from.str})
        (pad "4" thru_hole circle (at ${side_sign * 3.25} 2.25 ${p.r}) (size 1.498 1.498) (drill 0.99) (layers "*.Cu" "*.Mask"))
    `;
    const silkscreen = `
        (fp_line (start ${side_sign * -3.0} -1.0) (end ${side_sign * -3.0} 1.0) (layer "${p.side}.SilkS") (stroke (width 0.127) (type solid)))
        (fp_line (start ${side_sign * 3.0} -1.0) (end ${side_sign * 3.0} 1.0) (layer "${p.side}.SilkS") (stroke (width 0.127) (type solid)))
        (fp_line (start ${side_sign * -2.0} -3.0) (end ${side_sign * 2.0} -3.0) (layer "${p.side}.SilkS") (stroke (width 0.127) (type solid)))
        (fp_line (start ${side_sign * -2.0} 3.0) (end ${side_sign * 2.0} 3.0) (layer "${p.side}.SilkS") (stroke (width 0.127) (type solid)))
        (fp_circle (center ${side_sign * 0.0} 0.0) (end ${side_sign * 1.75} 0.0) (layer "${p.side}.SilkS") (stroke (width 0.127) (type solid)) (fill none))
        (fp_circle (center ${side_sign * -4.75} -2.25) (end ${side_sign * -4.55} -2.25) (layer "${p.side}.SilkS") (stroke (width 0.4) (type solid)) (fill none))
    `;
    const fabrication = `
        (fp_line (start ${side_sign * -2.995} -2.995) (end ${side_sign * -2.995} 2.995) (layer "${p.side}.Fab") (stroke (width 0.127) (type solid)))
        (fp_line (start ${side_sign * -2.995} 2.995) (end ${side_sign * 2.995} 2.995) (layer "${p.side}.Fab") (stroke (width 0.127) (type solid)))
        (fp_line (start ${side_sign * 2.995} 2.995) (end ${side_sign * 2.995} -2.995) (layer "${p.side}.Fab") (stroke (width 0.127) (type solid)))
        (fp_line (start ${side_sign * 2.995} -2.995) (end ${side_sign * -2.995} -2.995) (layer "${p.side}.Fab") (stroke (width 0.127) (type solid)))
        (fp_circle (center ${side_sign * 0.0} 0.0) (end ${side_sign * 1.75} 0.0) (layer "${p.side}.Fab") (stroke (width 0.127) (type solid)) (fill none))
        (fp_circle (center ${side_sign * -3.25} -2.25) (end ${side_sign * -3.05} -2.25) (layer "${p.side}.Fab") (stroke (width 0.4) (type solid)) (fill none))
    `;
    const courtyard = `
        (fp_line (start ${side_sign * -4.25} -3.25) (end ${side_sign * 4.25} -3.25) (layer "${p.side}.CrtYd") (stroke (width 0.05) (type solid)))
        (fp_line (start ${side_sign * 4.25} -3.25) (end ${side_sign * 4.25} 3.245) (layer "${p.side}.CrtYd") (stroke (width 0.05) (type solid)))
        (fp_line (start ${side_sign * 4.25} 3.245) (end ${side_sign * -4.25} 3.245) (layer "${p.side}.CrtYd") (stroke (width 0.05) (type solid)))
        (fp_line (start ${side_sign * -4.25} 3.245) (end ${side_sign * -4.25} -3.25) (layer "${p.side}.CrtYd") (stroke (width 0.05) (type solid)))
    `;
    const common_end = ')';

    let final = common_start;
    final += pads;
    final += silkscreen;
    final += fabrication;
    final += courtyard;
    final += common_end;
    return final;
  },
};

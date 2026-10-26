// Copyright (c) 2023 Marco Massarelli
// SPDX-License-Identifier: MIT
// License: https://opensource.org/license/mit/
// Author: @ergogen / @MrZealot
//
// Description:
// Panasonic EVQWGD001 horizontal rotary encoder and push switch.
// Reversible adds mirrored contacts and a second routed wheel opening.
// The inherited reversible layout has two copper-to-cutout clearance violations
// at S1. It needs a mechanical redesign before fabrication in reversible mode.
//
// Nets:
// from/to → S1/S2 push switch; A/B/C/D → encoder A/B/C/D.
// B is normally common ground; D is normally unused. Explicitly assign the intended nets.
//
// Params:
// designator: default "S". Reference prefix.
// reversible: default false. Emit the alternative mounting geometry as well.
// Net defaults: from="required", to="required", A="required", B="required", C="required", D="required".

module.exports = {
  params: {
    designator: 'S',
    reversible: false,
    from: { type: 'net', value: undefined },
    to: { type: 'net', value: undefined },
    A: { type: 'net', value: undefined },
    B: { type: 'net', value: undefined },
    C: { type: 'net', value: undefined },
    D: { type: 'net', value: undefined },
  },
  body: p => {
    const standard = `
      (footprint "ceoloide:rotary_encoder_panasonic_evqwgd001" (layer "F.Cu")
      ${p.at}
      (property "Reference" "${p.ref}" (at 0 0 ${p.r}) (layer "F.Fab") ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15))))
      (property "Value" "RollerEncoder_Panasonic_EVQWGD001" (at -0.1 9 ${p.r}) (layer "F.Fab") (effects (font (size 1 1) (thickness 0.15))))


      (fp_line (start -8.4 -6.4) (end 8.4 -6.4) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
      (fp_line (start 8.4 -6.4) (end 8.4 7.4) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
      (fp_line (start 8.4 7.4) (end -8.4 7.4) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
      (fp_line (start -8.4 7.4) (end -8.4 -6.4) (layer "Dwgs.User") (stroke (width 0.12) (type solid)))
    `;
    function pins(def_neg, def_pos) {
      return `

        (fp_line (start ${def_pos}9.8 7.3) (end ${def_pos}9.8 -6.3) (layer "Edge.Cuts") (stroke (width 0.15) (type solid)))
        (fp_line (start ${def_pos}7.4 -6.3) (end ${def_pos}7.4 7.3) (layer "Edge.Cuts") (stroke (width 0.15) (type solid)))
        (fp_line (start ${def_pos}9.5 -6.6) (end ${def_pos}7.7 -6.6) (layer "Edge.Cuts") (stroke (width 0.15) (type solid)))
        (fp_line (start ${def_pos}7.7 7.6) (end ${def_pos}9.5 7.6) (layer "Edge.Cuts") (stroke (width 0.15) (type solid)))
        (fp_arc (start ${def_pos}7.4 7.3) (mid ${def_pos}7.487868 7.512132) (end ${def_pos}7.7 7.6) (layer "Edge.Cuts") (stroke (width 0.15) (type solid)))
        (fp_arc (start ${def_pos}9.5 7.6) (mid ${def_pos}9.712132 7.512132) (end ${def_pos}9.8 7.3) (layer "Edge.Cuts") (stroke (width 0.15) (type solid)))
        (fp_arc (start ${def_pos}7.7 -6.6) (mid ${def_pos}7.487868 -6.512132) (end ${def_pos}7.4 -6.3) (layer "Edge.Cuts") (stroke (width 0.15) (type solid)))
        (fp_arc (start ${def_pos}9.8 -6.3) (mid ${def_pos}9.712132 -6.512132) (end ${def_pos}9.5 -6.6) (layer "Edge.Cuts") (stroke (width 0.15) (type solid)))


        (pad "S1" thru_hole circle (at ${def_neg}6.85 -6.2 ${p.r}) (size 1.6 1.6) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.from.str})
        (pad "S2" thru_hole circle (at ${def_neg}5 -6.2 ${p.r}) (size 1.6 1.6) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.to.str})
        (pad "A" thru_hole circle (at ${def_neg}5.625 -3.81 ${p.r}) (size 1.6 1.6) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.A.str})
        (pad "B" thru_hole circle (at ${def_neg}5.625 -1.27 ${p.r}) (size 1.6 1.6) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.B.str})
        (pad "C" thru_hole circle (at ${def_neg}5.625 1.27 ${p.r}) (size 1.6 1.6) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.C.str})
        (pad "D" thru_hole circle (at ${def_neg}5.625 3.81 ${p.r}) (size 1.6 1.6) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.D.str})


        (pad "" np_thru_hole circle (at ${def_neg}5.625 6.3 ${p.r}) (size 1.5 1.5) (drill 1.5) (layers "*.Cu" "*.Mask"))
      `;
    }
    if (p.reversible) {
      return `
      ${standard}
      ${pins('-', '')}
      ${pins('', '-')})
      `;
    } else {
      return `
      ${standard}
      ${pins('-', '')})
      `;
    }
  },
};

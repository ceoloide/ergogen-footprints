// Copyright (c) 2023 Marco Massarelli
// SPDX-License-Identifier: MIT
// License: https://opensource.org/license/mit/
// Author: @ergogen / @MrZealot
//
// Description:
// Kailh Choc Mini PG1232 switch with its routed central opening.
// Reversible adds mirrored contact holes; the central cutout and stabilizers are shared.
//
// Nets:
// from → pad 1; to → pad 2; stabilizers 3/4 are unassigned.
//
// Params:
// designator: default "S". Reference prefix.
// reversible: default false. Emit the alternative mounting geometry as well.
// include_keycap: default false. Include an 18 × 17 mm keycap outline on Dwgs.User.
// Net defaults: from="required", to="required".

module.exports = {
  params: {
    designator: 'S',
    reversible: false,
    include_keycap: false,
    from: { type: 'net', value: undefined },
    to: { type: 'net', value: undefined },
  },
  body: p => {
    const standard = `
      (footprint "ceoloide:switch_choc_mini" (layer "F.Cu")
      ${p.at}


      (property "Reference" "${p.ref}" (at 0 0 ${p.r}) (layer "F.SilkS") ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
      (property "Value" "Kailh_PG1232" (at 0 -7.3 ${p.r}) (layer "F.Fab") (effects (font (size 1 1) (thickness 0.15))))


      (fp_line (start -7.25 -6.75) (end -6.25 -6.75) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
      (fp_line (start -7.25 -6.75) (end -7.25 -5.75) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))

      (fp_line (start -7.25 6.75) (end -6.25 6.75) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
      (fp_line (start -7.25 6.75) (end -7.25 5.75) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))

      (fp_line (start 7.25 -6.75) (end 6.25 -6.75) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
      (fp_line (start 7.25 -6.75) (end 7.25 -5.75) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))

      (fp_line (start 7.25 6.75) (end 6.25 6.75) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
      (fp_line (start 7.25 6.75) (end 7.25 5.75) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))


      (fp_line (start 2.8 -5.35) (end -2.8 -5.35) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
      (fp_line (start -2.8 -3.2) (end 2.8 -3.2) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
      (fp_line (start 2.8 -3.2) (end 2.8 -5.35) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
      (fp_line (start -2.8 -3.2) (end -2.8 -5.35) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))


      (fp_line (start 2.25 2.6) (end 5.8 2.6) (layer "Edge.Cuts") (stroke (width 0.12) (type solid)))
      (fp_line (start -2.25 2.6) (end -5.8 2.6) (layer "Edge.Cuts") (stroke (width 0.12) (type solid)))
      (fp_line (start 2.25 3.6) (end 2.25 2.6) (layer "Edge.Cuts") (stroke (width 0.12) (type solid)))
      (fp_line (start -2.25 3.6) (end 2.25 3.6) (layer "Edge.Cuts") (stroke (width 0.12) (type solid)))
      (fp_line (start -2.25 2.6) (end -2.25 3.6) (layer "Edge.Cuts") (stroke (width 0.12) (type solid)))
      (fp_line (start -5.8 2.6) (end -5.8 -2.95) (layer "Edge.Cuts") (stroke (width 0.12) (type solid)))
      (fp_line (start 5.8 -2.95) (end 5.8 2.6) (layer "Edge.Cuts") (stroke (width 0.12) (type solid)))
      (fp_line (start -5.8 -2.95) (end 5.8 -2.95) (layer "Edge.Cuts") (stroke (width 0.12) (type solid)))


      (pad "3" thru_hole circle (at 5.3 -4.75 ${p.r}) (size 1.6 1.6) (drill 1.1) (layers "*.Cu" "*.Mask") (clearance 0.2))
      (pad "4" thru_hole circle (at -5.3 -4.75 ${p.r}) (size 1.6 1.6) (drill 1.1) (layers "*.Cu" "*.Mask") (clearance 0.2))
    `;
    const keycap = `

      (fp_line (start -9 -8.5) (end 9 -8.5) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
      (fp_line (start 9 -8.5) (end 9 8.5) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
      (fp_line (start 9 8.5) (end -9 8.5) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
      (fp_line (start -9 8.5) (end -9 -8.5) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
      `;
    function pins(def_neg, def_pos) {
      return `

      (pad "1" thru_hole circle (at ${def_neg}4.58 5.1 ${p.r}) (size 1.6 1.6) (drill 1.1) (layers "*.Cu" "*.Mask") ${p.from.str} (clearance 0.2))
      (pad "2" thru_hole circle (at ${def_pos}2 5.4 ${p.r}) (size 1.6 1.6) (drill 1.1) (layers "*.Cu" "*.Mask") ${p.to.str} (clearance 0.2))
      `;
    }
    if (p.reversible) {
      return `
        ${standard}
        ${p.include_keycap ? keycap : ''}
        ${pins('-', '')}
        ${pins('', '-')})

        `;
    } else {
      return `
        ${standard}
        ${p.include_keycap ? keycap : ''}
        ${pins('-', '')})
        `;
    }
  },
};

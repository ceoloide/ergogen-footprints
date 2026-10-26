// Copyright (c) 2023 Marco Massarelli
// SPDX-License-Identifier: MIT
// License: https://opensource.org/license/mit/
// Author: @ergogen / @MrZealot
//
// Description:
// Omron B3F-4055 tactile switch with locating bosses.
// Electrical holes are plated: the legacy NPTH pads lost their nets on save.
// Hole positions and 1.2 mm drills are retained. The 2.2 mm copper diameter is
// an explicit conversion choice, not a dimension specified by the source.
//
// Nets:
// from → pads 1/2; to → pads 3/4.
//
// Params:
// designator: default "S". Reference prefix.
// pad_size: default 2.2. Electrical copper diameter in mm; must exceed the 1.2 mm drill.
// Net defaults: from="required", to="required".
//
// Datasheet: https://omronfs.omron.com/en_US/ecb/products/pdf/en-b3f.pdf

module.exports = {
  params: {
    designator: 'S',
    pad_size: 2.2,
    from: { type: 'net', value: undefined },
    to: { type: 'net', value: undefined },
  },
  body: p => {
    if (p.pad_size <= 1.2) throw new Error('pad_size must exceed the 1.2 mm drill');
    const common_start = `
      (footprint "ceoloide:switch_omron_b3f_4055"
        (layer "F.Cu")
        ${p.at}
        (property "Reference" "${p.ref}" (at 0 0 ${p.r}) (layer "F.SilkS") ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
        (property "Value" "" (at 0 0 ${p.r}) (layer "F.SilkS") hide (effects (font (size 1.27 1.27) (thickness 0.15))))
    `;
    const pads = `
        (pad "" np_thru_hole circle (at 0 -4.5 ${p.r}) (size 1.8 1.8) (drill 1.8) (layers "*.Cu" "*.Mask"))
        (pad "" np_thru_hole circle (at 0 4.5 ${p.r}) (size 1.8 1.8) (drill 1.8) (layers "*.Cu" "*.Mask"))
        (pad "1" thru_hole circle (at 6.25 -2.5 ${p.r}) (size ${p.pad_size} ${p.pad_size}) (drill 1.2) (layers "*.Cu" "*.Mask") ${p.from.str})
        (pad "2" thru_hole circle (at -6.25 -2.5 ${p.r}) (size ${p.pad_size} ${p.pad_size}) (drill 1.2) (layers "*.Cu" "*.Mask") ${p.from.str})
        (pad "3" thru_hole circle (at 6.25 2.5 ${p.r}) (size ${p.pad_size} ${p.pad_size}) (drill 1.2) (layers "*.Cu" "*.Mask") ${p.to.str})
        (pad "4" thru_hole circle (at -6.25 2.5 ${p.r}) (size ${p.pad_size} ${p.pad_size}) (drill 1.2) (layers "*.Cu" "*.Mask") ${p.to.str})
    `;
    const drawings = `
        (fp_line (start -6 -6) (end 6 -6) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
        (fp_line (start 6 -6) (end 6 6) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
        (fp_line (start 6 6) (end -6 6) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
        (fp_line (start -6 6) (end -6 -6) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    `;
    const common_end = ')';

    let final = common_start;
    final += pads;
    final += drawings;
    final += common_end;
    return final;
  },
};

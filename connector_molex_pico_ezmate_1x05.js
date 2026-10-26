// Copyright (c) 2023 Marco Massarelli
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
// License: https://creativecommons.org/licenses/by-nc-sa/4.0/
// Author: @infused-kim
//
// Description:
// Five-position Molex Pico-EZmate connector, with mirrored pads on the back.
// Front/back SMD nets need board routing; reversible does not connect the faces.
//
// Nets:
// pad_1…pad_5 → matching numbered contact; MP pads are unassigned.
//
// Params:
// designator: default "CONN". Reference prefix.
// side: default "F". Placement face: 'F' or 'B'.
// reversible: default false. Emit the alternative mounting geometry as well.
// Net defaults: pad_1="CONN_1", pad_2="CONN_2", pad_3="CONN_3", pad_4="CONN_4", pad_5="CONN_5".

module.exports = {
  params: {
    designator: 'CONN',
    side: 'F',
    reversible: false,
    pad_1: { type: 'net', value: 'CONN_1' },
    pad_2: { type: 'net', value: 'CONN_2' },
    pad_3: { type: 'net', value: 'CONN_3' },
    pad_4: { type: 'net', value: 'CONN_4' },
    pad_5: { type: 'net', value: 'CONN_5' },
  },
  body: p => {
    if (!['F', 'B'].includes(p.side)) throw new Error('side must be F or B');
    const common_start = `
    (footprint "ceoloide:connector_molex_pico_ezmate_1x05" (layer "${p.side}.Cu")
      ${p.at}
      (attr smd)
      (property "Reference" "${p.ref}" (at 0 0.25 ${p.r}) (layer "${p.side}.SilkS") ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15)) ${p.side == 'B' ? '(justify mirror)' : ''}))

    `;

    const front = `
      (fp_line (start -2.96 -2.09) (end -2.96 -2.3) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
      (fp_line (start 4.01 1.24) (end 4.01 -2.09) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
      (fp_line (start 4.01 -2.09) (end 2.96 -2.09) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
      (fp_line (start -2.94 2.63) (end -2.44 2.63) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
      (fp_line (start -2.44 2.63) (end -2.14 2.13) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
      (fp_line (start -2.14 2.13) (end 2.14 2.13) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
      (fp_line (start 2.14 2.13) (end 2.44 2.63) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
      (fp_line (start 2.44 2.63) (end 2.94 2.63) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
      (fp_line (start -3.9 2.52) (end -2.55 2.52) (layer "F.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start -2.55 2.52) (end -2.25 2.02) (layer "F.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start -2.25 2.02) (end 2.25 2.02) (layer "F.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start 2.25 2.02) (end 2.55 2.52) (layer "F.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start 2.55 2.52) (end 3.9 2.52) (layer "F.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start -3.9 -1.98) (end -3.9 2.52) (layer "F.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start 3.9 -1.98) (end 3.9 2.52) (layer "F.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start -4.4 -2.8) (end -4.4 3.02) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
      (fp_line (start -4.4 3.02) (end 4.4 3.02) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
      (fp_line (start 4.4 3.02) (end 4.4 -2.8) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
      (fp_line (start 4.4 -2.8) (end -4.4 -2.8) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
      (fp_line (start -2.9 -1.98) (end -2.4 -1.272893) (layer "F.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start -2.4 -1.272893) (end -1.9 -1.98) (layer "F.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start -3.9 -1.98) (end 3.9 -1.98) (layer "F.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start -4.01 1.24) (end -4.01 -2.09) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
      (fp_line (start -4.01 -2.09) (end -2.96 -2.09) (layer "F.SilkS") (stroke (width 0.12) (type solid)))
      (fp_text user "${p.ref}" (at 0 0.27 ${p.r}) (layer "F.Fab")
        (effects (font (size 1 1) (thickness 0.15)))
      )
      (pad "1" smd roundrect (at -2.4 -1.875 ${p.r}) (size 0.6 0.85) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.25) ${p.pad_1.str})
      (pad "MP" smd roundrect (at 3.55 1.9 ${p.r}) (size 0.7 0.8) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.25))
      (pad "MP" smd roundrect (at -3.55 1.9 ${p.r}) (size 0.7 0.8) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.25))
      (pad "2" smd roundrect (at -1.2 -1.875 ${p.r}) (size 0.6 0.85) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.25) ${p.pad_2.str})
      (pad "4" smd roundrect (at 1.2 -1.875 ${p.r}) (size 0.6 0.85) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.25) ${p.pad_4.str})
      (pad "5" smd roundrect (at 2.4 -1.875 ${p.r}) (size 0.6 0.85) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.25) ${p.pad_5.str})
      (pad "3" smd roundrect (at 0 -1.875 ${p.r}) (size 0.6 0.85) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.25) ${p.pad_3.str})
    `;
    const back = `
      (fp_text user "${p.ref}" (at 0 0.27 ${180 + p.r}) (layer "B.Fab")
        (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
      )
      (fp_line (start 2.94 2.63) (end 2.44 2.63) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
      (fp_line (start -2.14 2.13) (end -2.44 2.63) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
      (fp_line (start -2.44 2.63) (end -2.94 2.63) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
      (fp_line (start 3.9 2.52) (end 2.55 2.52) (layer "B.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start 2.55 2.52) (end 2.25 2.02) (layer "B.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start 2.25 2.02) (end -2.25 2.02) (layer "B.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start -2.25 2.02) (end -2.55 2.52) (layer "B.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start 2.44 2.63) (end 2.14 2.13) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
      (fp_line (start 2.14 2.13) (end -2.14 2.13) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
      (fp_line (start 2.96 -2.09) (end 2.96 -2.3) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
      (fp_line (start -4.01 -2.09) (end -2.96 -2.09) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
      (fp_line (start -2.55 2.52) (end -3.9 2.52) (layer "B.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start 3.9 -1.98) (end 3.9 2.52) (layer "B.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start -3.9 -1.98) (end -3.9 2.52) (layer "B.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start 4.4 -2.8) (end 4.4 3.02) (layer "B.CrtYd") (stroke (width 0.05) (type solid)))
      (fp_line (start 4.4 3.02) (end -4.4 3.02) (layer "B.CrtYd") (stroke (width 0.05) (type solid)))
      (fp_line (start -4.4 3.02) (end -4.4 -2.8) (layer "B.CrtYd") (stroke (width 0.05) (type solid)))
      (fp_line (start -4.4 -2.8) (end 4.4 -2.8) (layer "B.CrtYd") (stroke (width 0.05) (type solid)))
      (fp_line (start 2.9 -1.98) (end 2.4 -1.272893) (layer "B.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start 2.4 -1.272893) (end 1.9 -1.98) (layer "B.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start 3.9 -1.98) (end -3.9 -1.98) (layer "B.Fab") (stroke (width 0.1) (type solid)))
      (fp_line (start 4.01 1.24) (end 4.01 -2.09) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
      (fp_line (start 4.01 -2.09) (end 2.96 -2.09) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
      (fp_line (start -4.01 1.24) (end -4.01 -2.09) (layer "B.SilkS") (stroke (width 0.12) (type solid)))
      (pad "3" smd roundrect (at 0 -1.875 ${180 + p.r}) (size 0.6 0.85) (layers "B.Cu" "B.Paste" "B.Mask") (roundrect_rratio 0.25) ${p.pad_3.str})
      (pad "MP" smd roundrect (at 3.55 1.9 ${180 + p.r}) (size 0.7 0.8) (layers "B.Cu" "B.Paste" "B.Mask") (roundrect_rratio 0.25))
      (pad "4" smd roundrect (at -1.2 -1.875 ${180 + p.r}) (size 0.6 0.85) (layers "B.Cu" "B.Paste" "B.Mask") (roundrect_rratio 0.25) ${p.pad_4.str})
      (pad "5" smd roundrect (at -2.4 -1.875 ${180 + p.r}) (size 0.6 0.85) (layers "B.Cu" "B.Paste" "B.Mask") (roundrect_rratio 0.25) ${p.pad_5.str})
      (pad "2" smd roundrect (at 1.2 -1.875 ${180 + p.r}) (size 0.6 0.85) (layers "B.Cu" "B.Paste" "B.Mask") (roundrect_rratio 0.25) ${p.pad_2.str})
      (pad "1" smd roundrect (at 2.4 -1.875 ${180 + p.r}) (size 0.6 0.85) (layers "B.Cu" "B.Paste" "B.Mask") (roundrect_rratio 0.25) ${p.pad_1.str})
      (pad "MP" smd roundrect (at -3.55 1.9 ${180 + p.r}) (size 0.7 0.8) (layers "B.Cu" "B.Paste" "B.Mask") (roundrect_rratio 0.25))
    `;

    const common_end = `
    )
    `;

    let final = common_start;

    if (p.side == 'F' || p.reversible) {
      final += front;
    }
    if (p.side == 'B' || p.reversible) {
      final += back;
    }

    final += common_end;

    return final;
  },
};

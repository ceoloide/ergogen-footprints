// Copyright (c) 2023 Marco Massarelli
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
// License: https://creativecommons.org/licenses/by-nc-sa/4.0/
// Author: @infused-kim
//
// Description:
// TrackPoint mounting holes with optional T430, X240 and T460s outlines.
//
// Nets:
// None.
//
// Params:
// designator: default "TP". Reference prefix.
// side: default "B". Placement face: 'F' or 'B'.
// reversible: default false. Emit the alternative mounting geometry as well.
// drill: default 5.5. Central TrackPoint hole diameter in mm (5.5 for X240; 3.5 for T430/T460s).
// outline: default 0.25. Radial copper margin beyond the central drill, in mm.
// show_outline_t430: default false. Include the T430 mechanical outline.
// show_outline_x240: default false. Include the X240 mechanical outline.
// show_outline_t460s: default false. Include the T460s mechanical outline.
// show_board: default false. Include the associated board outline for each selected TrackPoint model.

module.exports = {
  params: {
    designator: 'TP',
    side: 'B',
    reversible: false,

    // T430: 3.5
    // T460S (red one): 3.5
    // X240: 5.5
    drill: 5.5,
    outline: 0.25,

    show_outline_t430: false,
    show_outline_x240: false,
    show_outline_t460s: false,
    show_board: false,
  },
  body: p => {
    if (!['F', 'B'].includes(p.side)) throw new Error('side must be F or B');
    const common_start = `
      (footprint "ceoloide:mounting_trackpoint" (layer "${p.side}.Cu")
        ${p.at}
        (attr board_only exclude_from_pos_files exclude_from_bom)

        (property "Reference" "${p.ref}" (at 0 0 ${p.r}) (layer "${p.side}.SilkS") ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15)) ${p.side == 'B' ? '(justify mirror)' : ''}))
    `;

    const front = `
        (fp_circle (center 0 -9.5) (end -2.15 -9.5) (layer "F.CrtYd") (stroke (width 0.05) (type solid)) (fill none))
        (fp_circle (center 0 -9.5) (end -1.9 -9.5) (layer "Cmts.User") (stroke (width 0.15) (type solid)) (fill none))
        (fp_circle (center 0 9.5) (end -2.15 9.5) (layer "F.CrtYd") (stroke (width 0.05) (type solid)) (fill none))
        (fp_circle (center 0 9.5) (end -1.9 9.5) (layer "Cmts.User") (stroke (width 0.15) (type solid)) (fill none))
        (fp_circle (center 0 0) (end -3.95 0) (layer "F.CrtYd") (stroke (width 0.05) (type solid)) (fill none))
        (fp_circle (center 0 0) (end -3.7 0) (layer "Cmts.User") (stroke (width 0.15) (type solid)) (fill none))

        (fp_text user "${p.ref}" (at 0 0 ${p.r + 180}) (layer "F.Fab")
          (effects (font (size 1 1) (thickness 0.15)))
        )
    `;
    const back = `
        (fp_circle (center 0 0) (end -3.95 0) (layer "B.CrtYd") (stroke (width 0.05) (type solid)) (fill none))
        (fp_circle (center 0 0) (end -3.7 0) (layer "Cmts.User") (stroke (width 0.15) (type solid)) (fill none))
        (fp_circle (center 0 9.5) (end -2.15 9.5) (layer "B.CrtYd") (stroke (width 0.05) (type solid)) (fill none))
        (fp_circle (center 0 -9.5) (end -2.15 -9.5) (layer "B.CrtYd") (stroke (width 0.05) (type solid)) (fill none))
    `;

    const outline_t430_front = `
        (fp_line (start -4.5 -12.75) (end -9.5 -7.25) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start -9.5 7.25) (end -4.5 12.75) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 6.5 8) (end 6.5 -8) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 9.5 -8) (end 9.5 -12.75) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start -9.5 7.25) (end -9.5 -7.25) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 9.5 -12.75) (end -4.5 -12.75) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 9.5 12.75) (end -4.5 12.75) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 9.5 -8) (end 6.5 -8) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 9.5 8) (end 9.5 12.75) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 9.5 8) (end 6.5 8) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 8.5 5.5) (end 8.5 -5.5) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 8.5 -5.5) (end 6.5 -5.5) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 8.5 5.5) (end 6.5 5.5) (layer "F.Fab") (stroke (width 0.2) (type solid)))
    `;

    const outline_t430_back = `
        (fp_line (start -4.5 12.75) (end -9.5 7.25) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 9.5 -8) (end 9.5 -12.75) (layer "B.Fab") (stroke (width 0.12) (type solid)))
        (fp_line (start 9.5 8) (end 9.5 12.75) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 6.5 -8) (end 6.5 8) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 9.5 -12.75) (end -4.5 -12.75) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start -9.5 -7.25) (end -4.5 -12.75) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 9.5 -8) (end 6.5 -8) (layer "B.Fab") (stroke (width 0.12) (type solid)))
        (fp_line (start 9.5 8) (end 6.5 8) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start -9.5 -7.25) (end -9.5 7.25) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 9.5 12.75) (end -4.5 12.75) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 8.5 -5.5) (end 8.5 5.5) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 8.5 -5.5) (end 6.5 -5.5) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 8.5 5.5) (end 6.5 5.5) (layer "B.Fab") (stroke (width 0.2) (type solid)))
    `;

    const outline_x240_front = `
        (fp_line (start 12.25 -6.5) (end 6.75 -6.5) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 12.25 6.5) (end 6.75 6.5) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 12.25 6.5) (end 12.25 -6.5) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 6.75 11.5) (end -6.75 11.5) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 6.75 -11.5) (end -6.75 -11.5) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start -6.75 11.5) (end -6.75 -11.5) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 6.75 11.5) (end 6.75 -11.5) (layer "F.Fab") (stroke (width 0.2) (type solid)))
    `;

    const outline_x240_back = `
        (fp_line (start 12.25 -6.5) (end 6.75 -6.5) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 12.25 -6.5) (end 12.25 6.5) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 6.75 -11.5) (end -6.75 -11.5) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 6.75 11.5) (end -6.75 11.5) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start -6.75 -11.5) (end -6.75 11.5) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 6.75 -11.5) (end 6.75 11.5) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 12.25 6.5) (end 6.75 6.5) (layer "B.Fab") (stroke (width 0.2) (type solid)))
    `;

    const outline_x240_board = `
        (fp_line (start 39.25 12) (end 23.25 12) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
        (fp_line (start 23.25 5.5) (end 23.25 12) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
        (fp_line (start 23.25 -5.5) (end 23.25 5.5) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
        (fp_line (start 23.25 5.5) (end 12.25 5.5) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
        (fp_line (start 23.25 -5.5) (end 12.25 -5.5) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
        (fp_line (start 39.25 -22) (end 39.25 12) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
        (fp_line (start 39.25 -22) (end 23.25 -22) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
        (fp_line (start 23.25 -22) (end 23.25 -5.5) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
        (fp_line (start 12.25 -5.5) (end 12.25 5.5) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
    `;

    const outline_t460s_front = `
        (fp_line (start 2.75 6.5) (end 6.25 3) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 2.75 11.5) (end -2.75 11.5) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start -6.25 3) (end -6.25 -3) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 6.25 3) (end 6.25 -3) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 2.75 -11.5) (end -2.75 -11.5) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 2.75 6.5) (end 2.75 11.5) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start -2.75 6.5) (end -2.75 11.5) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start -2.75 -11.5) (end -2.75 -6.5) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 2.75 -11.5) (end 2.75 -6.5) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start -2.75 6.5) (end -6.25 3) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 6.25 -3) (end 2.75 -6.5) (layer "F.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start -6.25 -3) (end -2.75 -6.5) (layer "F.Fab") (stroke (width 0.2) (type solid)))
    `;

    const outline_t460s_back = `
        (fp_line (start -6.25 -3) (end -2.75 -6.5) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 6.25 -3) (end 2.75 -6.5) (layer "B.Fab") (stroke (width 0.2) (type solid)))

        (fp_line (start 2.75 6.5) (end 6.25 3) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start -2.75 6.5) (end -6.25 3) (layer "B.Fab") (stroke (width 0.2) (type solid)))

        (fp_line (start 6.25 3) (end 6.25 -3) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 2.75 11.5) (end -2.75 11.5) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start -6.25 3) (end -6.25 -3) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 2.75 -11.5) (end -2.75 -11.5) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start -2.75 6.5) (end -2.75 11.5) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 2.75 6.5) (end 2.75 11.5) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start -2.75 -11.5) (end -2.75 -6.5) (layer "B.Fab") (stroke (width 0.2) (type solid)))
        (fp_line (start 2.75 -11.5) (end 2.75 -6.5) (layer "B.Fab") (stroke (width 0.2) (type solid)))
    `;

    const outline_t460s_board = `
        (fp_line (start 38.25 12.25) (end 22.25 12.25) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
        (fp_line (start 22.25 2.75) (end 22.25 12.25) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
        (fp_line (start 22.25 -2.75) (end 22.25 2.75) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
        (fp_line (start 22.25 2.75) (end 6.25 2.75) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
        (fp_line (start 22.25 -2.75) (end 6.25 -2.75) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
        (fp_line (start 38.25 -22.25) (end 38.25 12.25) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
        (fp_line (start 38.25 -22.25) (end 22.25 -22.25) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
        (fp_line (start 22.25 -22.25) (end 22.25 -2.75) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
        (fp_line (start 6.25 -2.75) (end 6.25 2.75) (layer "Dwgs.User") (stroke (width 0.2) (type solid)))
    `;

    const size = p.drill + p.outline * 2;
    const common_end = `
        (pad "" thru_hole circle (at 0 -9.5 ${p.r + 180}) (size 3.8 3.8) (drill 2.2) (layers "*.Cu" "*.Mask"))
        (pad "1" np_thru_hole circle (at 0 0 ${p.r + 180}) (size ${size} ${size}) (drill ${p.drill}) (layers "*.Cu" "*.Mask"))
        (pad "" thru_hole circle (at 0 9.5 ${p.r + 180}) (size 3.8 3.8) (drill 2.2) (layers "*.Cu" "*.Mask"))
      )
    `;

    let final = common_start;

    if (p.side == 'F' || p.reversible) {
      final += front;

      if (p.show_outline_t430) {
        final += outline_t430_front;
      }
      if (p.show_outline_x240) {
        final += outline_x240_front;
      }
      if (p.show_outline_t460s) {
        final += outline_t460s_front;
      }
    }

    if (p.side == 'B' || p.reversible) {
      final += back;
      if (p.show_outline_t430) {
        final += outline_t430_back;
      }
      if (p.show_outline_x240) {
        final += outline_x240_back;
      }
      if (p.show_outline_t460s) {
        final += outline_t460s_back;
      }
    }

    if (p.show_board) {
      if (p.show_outline_x240) {
        final += outline_x240_board;
      }
      if (p.show_outline_t460s) {
        final += outline_t460s_board;
      }
    }

    final += common_end;

    return final;
  },
};

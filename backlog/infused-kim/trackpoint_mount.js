// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
//
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
//
// Author: @infused-kim
//
// Description:
// Adds mounting holes for a trackpoint to the PCB.
//
// Should be compatible with:
//  - Thinkpad T430
//  - Thinkpad T440 / X240
//
// Check this page for other models:
// https://deskthority.net/wiki/TrackPoint_Hardware

module.exports = {
  params: {
    designator: 'TP',
    side: 'B',
    reverse: false,

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
    const top = `
      (module trackpoint_mount_t430 (layer F.Cu) (tedit 6449FFC5)
        ${p.at /* parametric position */}
        (attr virtual)

        (fp_text reference "${p.ref}" (at 0 0) (layer ${p.side}.SilkS) ${p.ref_hide}
          (effects (font (size 1 1) (thickness 0.15)))
        )
    `;

    const front = `
        (fp_circle (center 0 -9.5) (end -2.15 -9.5) (layer F.CrtYd) (width 0.05))
        (fp_circle (center 0 -9.5) (end -1.9 -9.5) (layer Cmts.User) (width 0.15))
        (fp_circle (center 0 9.5) (end -2.15 9.5) (layer F.CrtYd) (width 0.05))
        (fp_circle (center 0 9.5) (end -1.9 9.5) (layer Cmts.User) (width 0.15))
        (fp_circle (center 0 0) (end -3.95 0) (layer F.CrtYd) (width 0.05))
        (fp_circle (center 0 0) (end -3.7 0) (layer Cmts.User) (width 0.15))

        (fp_text user %R (at 0 0 180) (layer F.Fab)
          (effects (font (size 1 1) (thickness 0.15)))
        )
    `
    const back = `
        (fp_circle (center 0 0) (end -3.95 0) (layer B.CrtYd) (width 0.05))
        (fp_circle (center 0 0) (end -3.7 0) (layer Cmts.User) (width 0.15))
        (fp_circle (center 0 9.5) (end -2.15 9.5) (layer B.CrtYd) (width 0.05))
        (fp_circle (center 0 -9.5) (end -2.15 -9.5) (layer B.CrtYd) (width 0.05))
    `

    const outline_t430_front = `
        (fp_line (start -4.5 -12.75) (end -9.5 -7.25) (layer F.Fab) (width 0.2))
        (fp_line (start -9.5 7.25) (end -4.5 12.75) (layer F.Fab) (width 0.2))
        (fp_line (start 6.5 8) (end 6.5 -8) (layer F.Fab) (width 0.2))
        (fp_line (start 9.5 -8) (end 9.5 -12.75) (layer F.Fab) (width 0.2))
        (fp_line (start -9.5 7.25) (end -9.5 -7.25) (layer F.Fab) (width 0.2))
        (fp_line (start 9.5 -12.75) (end -4.5 -12.75) (layer F.Fab) (width 0.2))
        (fp_line (start 9.5 12.75) (end -4.5 12.75) (layer F.Fab) (width 0.2))
        (fp_line (start 9.5 -8) (end 6.5 -8) (layer F.Fab) (width 0.2))
        (fp_line (start 9.5 8) (end 9.5 12.75) (layer F.Fab) (width 0.2))
        (fp_line (start 9.5 8) (end 6.5 8) (layer F.Fab) (width 0.2))
        (fp_line (start 8.5 5.5) (end 8.5 -5.5) (layer F.Fab) (width 0.2))
        (fp_line (start 8.5 -5.5) (end 6.5 -5.5) (layer F.Fab) (width 0.2))
        (fp_line (start 8.5 5.5) (end 6.5 5.5) (layer F.Fab) (width 0.2))
    `

    const outline_t430_back = `
        (fp_line (start -4.5 12.75) (end -9.5 7.25) (layer B.Fab) (width 0.2))
        (fp_line (start 9.5 -8) (end 9.5 -12.75) (layer B.Fab) (width 0.12))
        (fp_line (start 9.5 8) (end 9.5 12.75) (layer B.Fab) (width 0.2))
        (fp_line (start 6.5 -8) (end 6.5 8) (layer B.Fab) (width 0.2))
        (fp_line (start 9.5 -12.75) (end -4.5 -12.75) (layer B.Fab) (width 0.2))
        (fp_line (start -9.5 -7.25) (end -4.5 -12.75) (layer B.Fab) (width 0.2))
        (fp_line (start 9.5 -8) (end 6.5 -8) (layer B.Fab) (width 0.12))
        (fp_line (start 9.5 8) (end 6.5 8) (layer B.Fab) (width 0.2))
        (fp_line (start -9.5 -7.25) (end -9.5 7.25) (layer B.Fab) (width 0.2))
        (fp_line (start 9.5 12.75) (end -4.5 12.75) (layer B.Fab) (width 0.2))
        (fp_line (start 8.5 -5.5) (end 8.5 5.5) (layer B.Fab) (width 0.2))
        (fp_line (start 8.5 -5.5) (end 6.5 -5.5) (layer B.Fab) (width 0.2))
        (fp_line (start 8.5 5.5) (end 6.5 5.5) (layer B.Fab) (width 0.2))
    `

    const outline_x240_front = `
        (fp_line (start 12.25 -6.5) (end 6.75 -6.5) (layer F.Fab) (width 0.2))
        (fp_line (start 12.25 6.5) (end 6.75 6.5) (layer F.Fab) (width 0.2))
        (fp_line (start 12.25 6.5) (end 12.25 -6.5) (layer F.Fab) (width 0.2))
        (fp_line (start 6.75 11.5) (end -6.75 11.5) (layer F.Fab) (width 0.2))
        (fp_line (start 6.75 -11.5) (end -6.75 -11.5) (layer F.Fab) (width 0.2))
        (fp_line (start -6.75 11.5) (end -6.75 -11.5) (layer F.Fab) (width 0.2))
        (fp_line (start 6.75 11.5) (end 6.75 -11.5) (layer F.Fab) (width 0.2))
    `

    const outline_x240_back = `
        (fp_line (start 12.25 -6.5) (end 6.75 -6.5) (layer B.Fab) (width 0.2))
        (fp_line (start 12.25 -6.5) (end 12.25 6.5) (layer B.Fab) (width 0.2))
        (fp_line (start 6.75 -11.5) (end -6.75 -11.5) (layer B.Fab) (width 0.2))
        (fp_line (start 6.75 11.5) (end -6.75 11.5) (layer B.Fab) (width 0.2))
        (fp_line (start -6.75 -11.5) (end -6.75 11.5) (layer B.Fab) (width 0.2))
        (fp_line (start 6.75 -11.5) (end 6.75 11.5) (layer B.Fab) (width 0.2))
        (fp_line (start 12.25 6.5) (end 6.75 6.5) (layer B.Fab) (width 0.2))
    `

    const outline_x240_board = `
        (fp_line (start 39.25 12) (end 23.25 12) (layer Dwgs.User) (width 0.2))
        (fp_line (start 23.25 5.5) (end 23.25 12) (layer Dwgs.User) (width 0.2))
        (fp_line (start 23.25 -5.5) (end 23.25 5.5) (layer Dwgs.User) (width 0.2))
        (fp_line (start 23.25 5.5) (end 12.25 5.5) (layer Dwgs.User) (width 0.2))
        (fp_line (start 23.25 -5.5) (end 12.25 -5.5) (layer Dwgs.User) (width 0.2))
        (fp_line (start 39.25 -22) (end 39.25 12) (layer Dwgs.User) (width 0.2))
        (fp_line (start 39.25 -22) (end 23.25 -22) (layer Dwgs.User) (width 0.2))
        (fp_line (start 23.25 -22) (end 23.25 -5.5) (layer Dwgs.User) (width 0.2))
        (fp_line (start 12.25 -5.5) (end 12.25 5.5) (layer Dwgs.User) (width 0.2))
    `

    const outline_t460s_front = `
        (fp_line (start 2.75 6.5) (end 6.25 3) (layer F.Fab) (width 0.2))
        (fp_line (start 2.75 11.5) (end -2.75 11.5) (layer F.Fab) (width 0.2))
        (fp_line (start -6.25 3) (end -6.25 -3) (layer F.Fab) (width 0.2))
        (fp_line (start 6.25 3) (end 6.25 -3) (layer F.Fab) (width 0.2))
        (fp_line (start 2.75 -11.5) (end -2.75 -11.5) (layer F.Fab) (width 0.2))
        (fp_line (start 2.75 6.5) (end 2.75 11.5) (layer F.Fab) (width 0.2))
        (fp_line (start -2.75 6.5) (end -2.75 11.5) (layer F.Fab) (width 0.2))
        (fp_line (start -2.75 -11.5) (end -2.75 -6.5) (layer F.Fab) (width 0.2))
        (fp_line (start 2.75 -11.5) (end 2.75 -6.5) (layer F.Fab) (width 0.2))
        (fp_line (start -2.75 6.5) (end -6.25 3) (layer F.Fab) (width 0.2))
        (fp_line (start 6.25 -3) (end 2.75 -6.5) (layer F.Fab) (width 0.2))
        (fp_line (start -6.25 -3) (end -2.75 -6.5) (layer F.Fab) (width 0.2))
    `

    const outline_t460s_back = `
        (fp_line (start -6.25 -3) (end -2.75 -6.5) (layer B.Fab) (width 0.2))
        (fp_line (start 6.25 -3) (end 2.75 -6.5) (layer B.Fab) (width 0.2))

        (fp_line (start 2.75 6.5) (end 6.25 3) (layer B.Fab) (width 0.2))
        (fp_line (start -2.75 6.5) (end -6.25 3) (layer B.Fab) (width 0.2))

        (fp_line (start 6.25 3) (end 6.25 -3) (layer B.Fab) (width 0.2))
        (fp_line (start 2.75 11.5) (end -2.75 11.5) (layer B.Fab) (width 0.2))
        (fp_line (start -6.25 3) (end -6.25 -3) (layer B.Fab) (width 0.2))
        (fp_line (start 2.75 -11.5) (end -2.75 -11.5) (layer B.Fab) (width 0.2))
        (fp_line (start -2.75 6.5) (end -2.75 11.5) (layer B.Fab) (width 0.2))
        (fp_line (start 2.75 6.5) (end 2.75 11.5) (layer B.Fab) (width 0.2))
        (fp_line (start -2.75 -11.5) (end -2.75 -6.5) (layer B.Fab) (width 0.2))
        (fp_line (start 2.75 -11.5) (end 2.75 -6.5) (layer B.Fab) (width 0.2))
    `

    const outline_t460s_board = `
        (fp_line (start 38.25 12.25) (end 22.25 12.25) (layer Dwgs.User) (width 0.2))
        (fp_line (start 22.25 2.75) (end 22.25 12.25) (layer Dwgs.User) (width 0.2))
        (fp_line (start 22.25 -2.75) (end 22.25 2.75) (layer Dwgs.User) (width 0.2))
        (fp_line (start 22.25 2.75) (end 6.25 2.75) (layer Dwgs.User) (width 0.2))
        (fp_line (start 22.25 -2.75) (end 6.25 -2.75) (layer Dwgs.User) (width 0.2))
        (fp_line (start 38.25 -22.25) (end 38.25 12.25) (layer Dwgs.User) (width 0.2))
        (fp_line (start 38.25 -22.25) (end 22.25 -22.25) (layer Dwgs.User) (width 0.2))
        (fp_line (start 22.25 -22.25) (end 22.25 -2.75) (layer Dwgs.User) (width 0.2))
        (fp_line (start 6.25 -2.75) (end 6.25 2.75) (layer Dwgs.User) (width 0.2))
    `

    const size = p.drill + (p.outline * 2)
    const bottom = `
        (pad "" thru_hole circle (at 0 -9.5 180) (size 3.8 3.8) (drill 2.2) (layers *.Cu *.Mask))
        (pad 1 np_thru_hole circle (at 0 0 180) (size ${size} ${size}) (drill ${p.drill}) (layers *.Cu *.Mask))
        (pad "" thru_hole circle (at 0 9.5 180) (size 3.8 3.8) (drill 2.2) (layers *.Cu *.Mask))
      )
    `

    let final = top;

    if (p.side == "F" || p.reverse) {
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

    if (p.side == "B" || p.reverse) {
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
        final += outline_x240_board
      }
      if (p.show_outline_t460s) {
        final += outline_t460s_board
      }
    }

    final += bottom;

    return final;
  }
}
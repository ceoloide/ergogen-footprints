// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: MIT
//
// To view a copy of this license, visit https://opensource.org/license/mit/
//
// Author: @ceoloide
//
// Description:
//  A through-hole top-actuated momentary switch, the same used by the Corne keyboard and
//  compatible with "PTS636 S[L|M]43 LFS" tactile switches sold on LCSC.
//
// Datasheet:
//  https://datasheet.lcsc.com/lcsc/2110271930_C-K-PTS636SM43LFS_C2689636.pdf
//
// Params:
//    side: default is F for Front
//      the side on which to place the single-side footprint and designator, either F or B
//    reversible: default is false
//      if true, it will include silkscreen on both Front and Back, if silkscreen is included.
//      because the footprint is through-hole and because it's only connecting RST to GND, the
//      pads are reversible in any case.
//    include_silkscreen: default is true
//      if true it will include silkscreen markings

module.exports = {
  params: {
    designator: 'RST', // for Button
    side: 'F',
    reversible: false,
    include_silkscreen: true,
    from: { type: 'net', value: 'GND' },
    to: { type: 'net', value: 'RST' },
  },
  body: p => {
    const common_start = `
  (module "ceoloide:reset_switch_tht_top"
    (layer ${p.side}.Cu)
    ${p.at}
    (property "Reference" "${p.ref}"
      (at 0 2.55 ${90 + p.r})
      (layer "${p.side}.SilkS")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15)))
    )
        `
    const silkscreen_front = `
    (fp_text user "RST" (at 0 0 ${p.r}) (layer "F.SilkS") (effects (font (size 1 1) (thickness 0.15))))
    (fp_line (start -3 1.75) (end 3 1.75) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 3 1.75) (end 3 1.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start -3 1.75) (end -3 1.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start -3 -1.75) (end -3 -1.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start -3 -1.75) (end 3 -1.75) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 3 -1.75) (end 3 -1.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
        `
    const silkscreen_back = `
    (fp_text user "RST" (at 0 0 ${p.r}) (layer "B.SilkS") (effects (font (size 1 1) (thickness 0.15)) (justify mirror)))
    (fp_line (start 3 1.5) (end 3 1.75) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 3 1.75) (end -3 1.75) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start -3 1.75) (end -3 1.5) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start -3 -1.5) (end -3 -1.75) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start -3 -1.75) (end 3 -1.75) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
    (fp_line (start 3 -1.75) (end 3 -1.5) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
        `
    const common_end = `
    (pad "2" thru_hole circle (at -3.25 0 ${p.r}) (size 2 2) (drill 1.3) (layers "*.Cu" "*.Mask") ${p.from.str})
    (pad "1" thru_hole circle (at 3.25 0 ${p.r}) (size 2 2) (drill 1.3) (layers "*.Cu" "*.Mask") ${p.to.str})
  )
        `
    let final = common_start;
    if (p.side == "F" || p.reversible) {
      if (p.include_silkscreen) {
        final += silkscreen_front
      }
    }
    if (p.side == "B" || p.reversible) {
      if (p.include_silkscreen) {
        final += silkscreen_back
      }
    }
    final += common_end;
    return final;
  }
}

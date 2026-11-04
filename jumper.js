// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
//
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
//
// Author: @infused-kim + @ceoloide + @aevumdecessus improvements
//
// Description:
//  Reversible footprint for nice!view display. Includes an outline of the
//  display to make positioning easier.
//
//  Note that because the center pin is VCC on both sides, there is no associated jumper pad
//  in the reversible footprint.
//
//  In its default configuration, jumper pads are positioned above the pins, when the
//  component is oriented verically and pointing upwards, or left of the pins, when oriented
//  horizontally and oriented leftward. Jumper pads position can be inverted with a parameter.
//
//  In its default configuration, labels are positioned below the pins, when the
//  component is oriented verically and pointing upwards, or right of the pins, when oriented
//  horizontally and oriented leftward. Labels position can be inverted with a parameter.
//
// Pinout and schematics:
//  https://nicekeyboards.com/docs/nice-view/pinout-schematic
//
// Params:
//    side: default is F for Front
//      the side on which to place the single-side footprint and designator, either F or B
//
// @evumdecessus's improvements:
//  - Upgraded to KiCad 8 format
//

module.exports = {
  params: {
    designator: 'J',
    side: 'F',
    from: { type: 'net', value: undefined },
    to: { type: 'net', value: undefined }
  },
  body: p => {
    const standard_opening = `
    (footprint "ceoloide:jumper"
        (layer "${p.side}.Cu")
        ${p.at}
        (property "Reference" "${p.ref}"
            (at 0 0 ${p.r})
            (layer "${p.side}.SilkS")
            ${p.ref_hide}
            (effects (font (size 1 1) (thickness 0.15)))
        )
        `
    const front_jumpers = `
    (pad "1" smd rect (at -0.45 0 ${90 + p.r}) (size 1.2 0.6) (layers "${p.side}.Cu" "${p.side}.Paste" "${p.side}.Mask") ${p.from.str})
    (pad "2" smd rect (at 0.45 0 ${90 + p.r}) (size 1.2 0.6) (layers "${p.side}.Cu" "${p.side}.Paste" "${p.side}.Mask") ${p.to.str})
    `
    const back_jumpers = `
    (pad "1" smd rect (at -0.45 0 ${90 + p.r}) (size 1.2 0.6) (layers "${p.side}.Cu" "${p.side}.Paste" "${p.side}.Mask") ${p.from.str})
    (pad "2" smd rect (at 0.45 0 ${90 + p.r}) (size 1.2 0.6) (layers "${p.side}.Cu" "${p.side}.Paste" "${p.side}.Mask") ${p.to.str})
    `
    
    const standard_closing = `
    )
        `
    let final = standard_opening;

    if (p.side == "F") {
      final += front_jumpers;
    }
    if (p.side == "B") {
      final += back_jumpers;
    }
    final += standard_closing;
    return final;
  }
}

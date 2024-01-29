// Copyright (c) 2023 Marco Massarelli
//
// Licensed under CC BY-NC-SA 4.0. 
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
//
// Authors: @infused-kim + @ceoloide improvements
//
// Description:
//  Allows you to place text on the PCB's Silkscreen
//  layer, and optionally make it reversible on the
//  opposite side.
//
// Params:
//    reversible: default is false
//      Adds a mirrored text on the opposite side of the board
//    thickness: default is 0.15
//      The thickness of the stroke for the text
//    size: default is 1
//      The text size both vertical and horizontal
//    text:
//      The text to display
//
// @ceoloide's improvements:
//  - Add ability to set text on both sides
//  - Add ability to adjust font thickness and size

module.exports = {
  params: {
    designator: 'TXT',
    side: 'F',
    reversible: false,
    thickness: 0.15,
    size: 1,
    text: ''
  },
  body: p => {
    const generate_text = (side, mirror, thickness, size, text) => {
      const gr_text = `
      (gr_text "${text}" ${p.at} (layer ${side}.SilkS)
        (effects (font (size ${size} ${size}) (thickness ${thickness}))
        ${(mirror && side != p.side ? ` (justify mirror)` : ``)})
      )
      `
      return gr_text
    }

    let final = '';
    if(p.reversible) {
      final += generate_text(p.side, false, p.thickness, p.size, p.text);
      final += generate_text((p.side == 'F' ? 'B' : 'F'), true, p.thickness, p.size, p.text);
    } else {
      final += generate_text(p.side, false, p.thickness, p.size, p.text);
    }
    return final;
  }
}

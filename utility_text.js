// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
//
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
//
// Authors: @infused-kim + @ceoloide & @dieseltravis improvements
//
// Description:
//  Allows you to place text on the PCB's Silkscreen
//  layer, and optionally make it reversible on the
//  opposite side.
//
// Params:
//    side: default is F for Front
//      the side on which to place the single-side footprint and designator, either F or B
//    layer: default is 'SilkS' (Silkscreen layer)
//      the layer where the text will be placed, useful to have copper + soldermask texts
//    reversible: default is false
//      adds a mirrored text on the opposite side of the board with the same style and text
//    thickness: default is 0.15
//      set the thickness of the stroke for the text (only applicable to the default font)
//    width: default is 1
//      set the text width
//    height: default is 1
//      set the text height
//    mirrored: default is false
//      mirror the text, useful when text is added to the back. A reversible text is mirrored
//      by default on the backside.
//    knockout: default is false
//      add the knockout effect to the text
//    bold: default is false
//      adds bold effect to the text
//    italic: default is false
//      adds italics effect to the text
//    align: default is ''
//      control the alignment of the text (e.g. top left)
//    face: default is '' (KiCad Default)
//      control the font face applied to the text
//    text:
//      The text to display
//
// @ceoloide's improvements:
//  - Add ability to set text on both sides
//  - Add ability to adjust font thickness and size
//  - Add mirrored and knockout effects
//
// @diseltravis's improvements:
//  - Add option to customizer the font face
//  - Add option to set bold, italic font styles
//  - Add option to chose the layer where the text is added to

module.exports = {
  params: {
    designator: 'TXT',
    side: 'F',
    layer: 'SilkS',
    reversible: false,
    thickness: 0.15,
    height: 1,
    width: 1,
    mirrored: false,
    knockout: false,
    bold: false,
    italic: false,
    align: '',
    face: '',
    text: ''
  },
  body: p => {
    const generate_text = (side, layer, align, mirrored, thickness, height, width, text, face, bold, italic, knockout) => {
      let justify = `(justify ${align} ${mirrored ? 'mirror' : ''})`;
      const gr_text = `
  (gr_text "${text}"
    ${p.at}
    (layer "${side}.${layer}" ${knockout ? 'knockout' : ''})
    (effects
      (font ${face != '' ? '(face "' + face + '")' : ''}
        (size ${height} ${width})
        (thickness ${thickness})
        ${bold ? '(bold yes)' : ''}
        ${italic ? '(italic yes)' : ''}
      )
      ${align != '' || mirrored ? justify : ''}
    )
  )
      `;
      return gr_text;
    };

    let final = '';
    if (p.reversible) {
      final += generate_text('F', p.layer, p.align, false, p.thickness, p.height, p.width, p.text, p.face, p.bold, p.italic, p.knockout);
      final += generate_text('B', p.layer, p.align, true, p.thickness, p.height, p.width, p.text, p.face, p.bold, p.italic, p.knockout);
    } else {
      final += generate_text(p.side, p.layer, p.align, p.mirrored, p.thickness, p.height, p.width, p.text, p.face, p.bold, p.italic, p.knockout);
    }
    return final;
  }
};
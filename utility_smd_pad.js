// Copyright (c) 2023 Marco Massarelli
// SPDX-License-Identifier: MIT
// License: https://opensource.org/license/mit/
// Author: @ergogen / @MrZealot
//
// Description:
// Rectangular solder pad with an optional silkscreen label.
// Reversible adds an isolated pad on the opposite face; connect it with board routing.
//
// Nets:
// net → pad 1 on each selected face.
//
// Params:
// designator: default "PAD". Reference prefix.
// side: default "F". Placement face: 'F' or 'B'.
// reversible: default false. Emit the alternative mounting geometry as well.
// width: default 1. Pad width in mm.
// height: default 1. Pad height in mm.
// text: default "". Optional silkscreen label; empty string omits it.
// align: default "left". Label placement: 'left', 'right', 'up' or 'down', in local coordinates.
// mirrored: default "{{mirrored}}". Ergogen point metadata; reverses left/right label alignment for
//   mirrored points.
// Net defaults: net="required".

module.exports = {
  params: {
    designator: 'PAD',
    side: 'F',
    reversible: false,
    width: 1,
    height: 1,
    text: '',
    align: 'left',
    mirrored: { type: 'boolean', value: '{{mirrored}}' },
    net: { type: 'net', value: undefined },
  },
  body: p => {
    if (!['F', 'B'].includes(p.side)) throw new Error('side must be F or B');
    const layout = (toggle, side) => {
      if (!toggle) return '';
      let x = 0,
        y = 0;
      const mirror = side == 'B' ? '(justify mirror)' : '';
      const plus = (p.text.length + 1) * 0.5;
      let align = p.align;
      if (p.mirrored === true) {
        if (align == 'left') align = 'right';
        else if (align == 'right') align = 'left';
      }
      if (align == 'left') x -= p.width / 2 + plus;
      if (align == 'right') x += p.width / 2 + plus;
      if (align == 'up') y += p.height / 2 + plus;
      if (align == 'down') y -= p.height / 2 + plus;
      let text = '';
      if (p.text.length) {
        text = `(fp_text user ${JSON.stringify(p.text)} (at ${x} ${y} ${p.r}) (layer "${side}.SilkS") (effects (font (size 0.8 0.8) (thickness 0.15)) ${mirror}))`;
      }
      return `(pad "1" smd rect (at 0 0 ${p.r}) (size ${p.width} ${p.height}) (layers "${side}.Cu" "${side}.Paste" "${side}.Mask") ${p.net.str})\n${text}`;
    };

    return `

      (footprint "ceoloide:utility_smd_pad" (layer "${p.side}.Cu")

          ${p.at}


          (property "Reference" "${p.ref}" (at 0 0 ${p.r}) (layer "${p.side}.SilkS") ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15)) ${p.side == 'B' ? '(justify mirror)' : ''}))
          (property "Value" "" (at 0 0 ${p.r}) (layer "${p.side}.SilkS") hide (effects (font (size 1.27 1.27) (thickness 0.15)) ${p.side == 'B' ? '(justify mirror)' : ''}))


          ${layout(p.side == 'F' || p.reversible, 'F')}
          ${layout(p.side == 'B' || p.reversible, 'B')}

      )

      `;
  },
};

// Copyright (c) 2023 Marco Massarelli
// SPDX-License-Identifier: MIT
// License: https://opensource.org/license/mit/
// Author: @ergogen / @MrZealot
//
// Description:
// Legacy WS2812B dual land pattern, with 3.5 mm and 5 mm body outlines.
// Pin identities are mirrored on the back. Reversible adds both SMD faces,
// without automatic vias: route the faces explicitly. The legacy reversible
// variant placed different physical pins over each other; its vias are not copied.
//
// Nets:
// VCC → 1/11; dout → 2/22; GND → 3/33; din → 4/44.
//
// Params:
// designator: default "LED". Reference prefix.
// side: default "F". Placement face: 'F' or 'B'.
// reversible: default false. Emit the alternative mounting geometry as well.
// Net defaults: din="required", dout="required", VCC="VCC", GND="GND".

module.exports = {
  params: {
    designator: 'LED',
    side: 'F',
    reversible: false,
    din: { type: 'net', value: undefined },
    dout: { type: 'net', value: undefined },
    VCC: { type: 'net', value: 'VCC' },
    GND: { type: 'net', value: 'GND' },
  },
  body: p => {
    if (!['F', 'B'].includes(p.side)) throw new Error('side must be F or B');
    const common_start = `
      (footprint "ceoloide:led_ws2812b" (layer "${p.side}.Cu")
        ${p.at}
        (attr smd)
        (property "Reference" "${p.ref}" (at 0 0 ${p.r}) (layer "${p.side}.SilkS") ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15)) ${p.side == 'B' ? '(justify mirror)' : ''} ${p.side == 'B' ? '(justify mirror)' : ''}))
    `;
    const front = `
          (fp_line (start -1.75 -1.75) (end -1.75 1.75) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
          (fp_line (start -1.75 1.75) (end 1.75 1.75) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
          (fp_line (start 1.75 1.75) (end 1.75 -1.75) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
          (fp_line (start 1.75 -1.75) (end -1.75 -1.75) (layer "F.SilkS") (stroke (width 0.15) (type solid)))

          (fp_line (start -2.5 -2.5) (end -2.5 2.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
          (fp_line (start -2.5 2.5) (end 2.5 2.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
          (fp_line (start 2.5 2.5) (end 2.5 -2.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))
          (fp_line (start 2.5 -2.5) (end -2.5 -2.5) (layer "F.SilkS") (stroke (width 0.15) (type solid)))

          (fp_poly (pts (xy 4 2.2) (xy 4 0.375) (xy 5 1.2875)) (layer "F.SilkS") (stroke (width 0.1) (type solid)) (fill solid))

          (pad "1" smd rect (at -2.2 -0.875 ${p.r}) (size 2.6 1) (layers "F.Cu" "F.Paste" "F.Mask") ${p.VCC.str})
          (pad "2" smd rect (at -2.2 0.875 ${p.r}) (size 2.6 1) (layers "F.Cu" "F.Paste" "F.Mask") ${p.dout.str})
          (pad "3" smd rect (at 2.2 0.875 ${p.r}) (size 2.6 1) (layers "F.Cu" "F.Paste" "F.Mask") ${p.GND.str})
          (pad "4" smd rect (at 2.2 -0.875 ${p.r}) (size 2.6 1) (layers "F.Cu" "F.Paste" "F.Mask") ${p.din.str})

          (pad "11" smd rect (at -2.5 -1.6 ${p.r}) (size 2 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${p.VCC.str})
          (pad "22" smd rect (at -2.5 1.6 ${p.r}) (size 2 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${p.dout.str})
          (pad "33" smd rect (at 2.5 1.6 ${p.r}) (size 2 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${p.GND.str})
          (pad "44" smd rect (at 2.5 -1.6 ${p.r}) (size 2 1.2) (layers "F.Cu" "F.Paste" "F.Mask") ${p.din.str})
    `;
    const back = `
          (fp_line (start 1.75 -1.75) (end 1.75 1.75) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
          (fp_line (start 1.75 1.75) (end -1.75 1.75) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
          (fp_line (start -1.75 1.75) (end -1.75 -1.75) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
          (fp_line (start -1.75 -1.75) (end 1.75 -1.75) (layer "B.SilkS") (stroke (width 0.15) (type solid)))

          (fp_line (start 2.5 -2.5) (end 2.5 2.5) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
          (fp_line (start 2.5 2.5) (end -2.5 2.5) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
          (fp_line (start -2.5 2.5) (end -2.5 -2.5) (layer "B.SilkS") (stroke (width 0.15) (type solid)))
          (fp_line (start -2.5 -2.5) (end 2.5 -2.5) (layer "B.SilkS") (stroke (width 0.15) (type solid)))

          (fp_poly (pts (xy -4 2.2) (xy -4 0.375) (xy -5 1.2875)) (layer "B.SilkS") (stroke (width 0.1) (type solid)) (fill solid))

          (pad "1" smd rect (at 2.2 -0.875 ${p.r}) (size 2.6 1) (layers "B.Cu" "B.Paste" "B.Mask") ${p.VCC.str})
          (pad "2" smd rect (at 2.2 0.875 ${p.r}) (size 2.6 1) (layers "B.Cu" "B.Paste" "B.Mask") ${p.dout.str})
          (pad "3" smd rect (at -2.2 0.875 ${p.r}) (size 2.6 1) (layers "B.Cu" "B.Paste" "B.Mask") ${p.GND.str})
          (pad "4" smd rect (at -2.2 -0.875 ${p.r}) (size 2.6 1) (layers "B.Cu" "B.Paste" "B.Mask") ${p.din.str})

          (pad "11" smd rect (at 2.5 -1.6 ${p.r}) (size 2 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${p.VCC.str})
          (pad "22" smd rect (at 2.5 1.6 ${p.r}) (size 2 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${p.dout.str})
          (pad "33" smd rect (at -2.5 1.6 ${p.r}) (size 2 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${p.GND.str})
          (pad "44" smd rect (at -2.5 -1.6 ${p.r}) (size 2 1.2) (layers "B.Cu" "B.Paste" "B.Mask") ${p.din.str})
    `;
    const common_end = ')';
    let final = common_start;
    if (p.side == 'F' || p.reversible) final += front;
    if (p.side == 'B' || p.reversible) final += back;
    final += common_end;
    return final;
  },
};

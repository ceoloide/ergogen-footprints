// Copyright (c) 2023 Marco Massarelli
// SPDX-License-Identifier: MIT
// License: https://opensource.org/license/mit/
// Author: @TildeWill
//
// Description:
// Azoteq TPS65 hotbar connector pads at 2 mm pitch and trackpad corner marks.
// The back placement mirrors the pad row and labels while preserving pin identities.
//
// Nets:
// 0 SDA, 1 SCL, 2 VCC, 3 GND, 4 RST, 5 RDY.
// RST and RDY default to an empty net.
//
// Params:
// designator: default "TP". Reference prefix.
// side: default "F". Placement face: 'F' or 'B'.
// Net defaults: SDA="SDA", SCL="SCL", VCC="VCC", GND="GND", RST="", RDY="".

module.exports = {
  params: {
    designator: 'TP',
    side: 'F',
    SDA: { type: 'net', value: 'SDA' },
    SCL: { type: 'net', value: 'SCL' },
    VCC: { type: 'net', value: 'VCC' },
    GND: { type: 'net', value: 'GND' },
    RST: { type: 'net', value: '' },
    RDY: { type: 'net', value: '' },
  },
  body: p => {
    if (!['F', 'B'].includes(p.side)) throw new Error('side must be F or B');
    const side_sign = p.side == 'B' ? -1 : 1;
    const common_start = `
      (footprint "ceoloide:trackpad_azoteq_tps65"
        (layer "${p.side}.Cu")
        ${p.at}
        (attr board_only exclude_from_pos_files exclude_from_bom)
        (property "Reference" "${p.ref}" (at ${side_sign * 0} 0 ${p.r}) (layer "${p.side}.SilkS") ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15)) ${p.side == 'B' ? '(justify mirror)' : ''} ${p.side == 'B' ? '(justify mirror)' : ''}))
    `;
    const pads = `
        (pad "0" smd rect (at ${side_sign * -12.5} 17.5 ${p.r}) (size 1 3) (layers "${p.side}.Cu" "${p.side}.Mask" "${p.side}.Paste") ${p.SDA.str})
        (pad "1" smd rect (at ${side_sign * -10.5} 17.5 ${p.r}) (size 1 3) (layers "${p.side}.Cu" "${p.side}.Mask" "${p.side}.Paste") ${p.SCL.str})
        (pad "2" smd rect (at ${side_sign * -8.5} 17.5 ${p.r}) (size 1 3) (layers "${p.side}.Cu" "${p.side}.Mask" "${p.side}.Paste") ${p.VCC.str})
        (pad "3" smd rect (at ${side_sign * -6.5} 17.5 ${p.r}) (size 1 3) (layers "${p.side}.Cu" "${p.side}.Mask" "${p.side}.Paste") ${p.GND.str})
        (pad "4" smd rect (at ${side_sign * -4.5} 17.5 ${p.r}) (size 1 3) (layers "${p.side}.Cu" "${p.side}.Mask" "${p.side}.Paste") ${p.RST.str})
        (pad "5" smd rect (at ${side_sign * -2.5} 17.5 ${p.r}) (size 1 3) (layers "${p.side}.Cu" "${p.side}.Mask" "${p.side}.Paste") ${p.RDY.str})
    `;
    const silkscreen = `
        (fp_arc (start ${side_sign * -29.5} 24.5) (mid ${side_sign * -31.62132} 23.62132) (end ${side_sign * -32.5} 21.5) (layer "${p.side}.SilkS") (stroke (width 0.15) (type solid)))
        (fp_arc (start ${side_sign * 32.5} 21.5) (mid ${side_sign * 31.62132} 23.62132) (end ${side_sign * 29.5} 24.5) (layer "${p.side}.SilkS") (stroke (width 0.15) (type solid)))
        (fp_arc (start ${side_sign * 29.5} -24.5) (mid ${side_sign * 31.62132} -23.62132) (end ${side_sign * 32.5} -21.5) (layer "${p.side}.SilkS") (stroke (width 0.15) (type solid)))
        (fp_arc (start ${side_sign * -32.5} -21.5) (mid ${side_sign * -31.62132} -23.62132) (end ${side_sign * -29.5} -24.5) (layer "${p.side}.SilkS") (stroke (width 0.15) (type solid)))
        (fp_text user ${JSON.stringify(p.SDA.name)} (at ${side_sign * -12.5} 14.5 ${p.r + 90}) (layer "${p.side}.SilkS") (effects (font (size 0.6 0.6) (thickness 0.15)) ${p.side == 'B' ? '(justify mirror)' : ''} ${p.side == 'B' ? '(justify mirror)' : ''}))
        (fp_text user ${JSON.stringify(p.SCL.name)} (at ${side_sign * -10.5} 14.5 ${p.r + 90}) (layer "${p.side}.SilkS") (effects (font (size 0.6 0.6) (thickness 0.15)) ${p.side == 'B' ? '(justify mirror)' : ''} ${p.side == 'B' ? '(justify mirror)' : ''}))
        (fp_text user ${JSON.stringify(p.VCC.name)} (at ${side_sign * -8.5} 14.5 ${p.r + 90}) (layer "${p.side}.SilkS") (effects (font (size 0.6 0.6) (thickness 0.15)) ${p.side == 'B' ? '(justify mirror)' : ''} ${p.side == 'B' ? '(justify mirror)' : ''}))
        (fp_text user ${JSON.stringify(p.GND.name)} (at ${side_sign * -6.5} 14.5 ${p.r + 90}) (layer "${p.side}.SilkS") (effects (font (size 0.6 0.6) (thickness 0.15)) ${p.side == 'B' ? '(justify mirror)' : ''} ${p.side == 'B' ? '(justify mirror)' : ''}))
        (fp_text user ${JSON.stringify(p.RST.name)} (at ${side_sign * -4.5} 14.5 ${p.r + 90}) (layer "${p.side}.SilkS") (effects (font (size 0.6 0.6) (thickness 0.15)) ${p.side == 'B' ? '(justify mirror)' : ''} ${p.side == 'B' ? '(justify mirror)' : ''}))
        (fp_text user ${JSON.stringify(p.RDY.name)} (at ${side_sign * -2.5} 14.5 ${p.r + 90}) (layer "${p.side}.SilkS") (effects (font (size 0.6 0.6) (thickness 0.15)) ${p.side == 'B' ? '(justify mirror)' : ''} ${p.side == 'B' ? '(justify mirror)' : ''}))
    `;
    const common_end = ')';

    let final = common_start;
    final += pads;
    final += silkscreen;
    final += common_end;
    return final;
  },
};

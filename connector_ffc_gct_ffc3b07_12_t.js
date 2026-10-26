// Copyright (c) 2023 Marco Massarelli
// SPDX-License-Identifier: MIT
// License: https://opensource.org/license/mit/
// Author: @TildeWill
//
// Description:
// GCT FFC3B07-12-T, twelve-position FFC connector on the front face.
// Pitch is 1 mm; pin 1 is at local x=5.5 mm, y=-2.45 mm.
//
// Nets:
// P1…P12 → contacts 1…12; mounting tabs S1/S2 are unassigned.
//
// Params:
// designator: default "FFC". Reference prefix.
// Net defaults: P1="P1", P2="P2", P3="P3", P4="P4", P5="P5", P6="P6", P7="P7", P8="P8", P9="P9",
//   P10="P10", P11="P11", P12="P12".

module.exports = {
  params: {
    designator: 'FFC',
    P1: { type: 'net', value: 'P1' },
    P2: { type: 'net', value: 'P2' },
    P3: { type: 'net', value: 'P3' },
    P4: { type: 'net', value: 'P4' },
    P5: { type: 'net', value: 'P5' },
    P6: { type: 'net', value: 'P6' },
    P7: { type: 'net', value: 'P7' },
    P8: { type: 'net', value: 'P8' },
    P9: { type: 'net', value: 'P9' },
    P10: { type: 'net', value: 'P10' },
    P11: { type: 'net', value: 'P11' },
    P12: { type: 'net', value: 'P12' },
  },
  body: p => {
    const common_start = `
      (footprint "ceoloide:connector_ffc_gct_ffc3b07_12_t"
        (layer "F.Cu")
        (descr "tildewill:12 Position FFC, FPC Connector")
        ${p.at}
        (attr smd)
        (property "Reference" "${p.ref}" (at -6.575 -4.585 ${p.r}) (layer "F.SilkS") ${p.ref_hide} (effects (font (size 1.0 1.0) (thickness 0.15))))
        (property "Value" "GCT_FFC3B07-12-T" (at 0.41 5.165 ${p.r}) (layer "F.Fab") (effects (font (size 1.0 1.0) (thickness 0.15))))
    `;
    const pads = `
        (pad "S1" smd rect (at 8.25 0.0 ${p.r}) (size 2.5 2.8) (layers "F.Cu" "F.Mask" "F.Paste") (solder_mask_margin 0.102))
        (pad "1" smd rect (at 5.5 -2.45 ${p.r}) (size 0.6 1.7) (layers "F.Cu" "F.Mask" "F.Paste") (solder_mask_margin 0.102) ${p.P1.str})
        (pad "2" smd rect (at 4.5 -2.45 ${p.r}) (size 0.6 1.7) (layers "F.Cu" "F.Mask" "F.Paste") (solder_mask_margin 0.102) ${p.P2.str})
        (pad "3" smd rect (at 3.5 -2.45 ${p.r}) (size 0.6 1.7) (layers "F.Cu" "F.Mask" "F.Paste") (solder_mask_margin 0.102) ${p.P3.str})
        (pad "4" smd rect (at 2.5 -2.45 ${p.r}) (size 0.6 1.7) (layers "F.Cu" "F.Mask" "F.Paste") (solder_mask_margin 0.102) ${p.P4.str})
        (pad "5" smd rect (at 1.5 -2.45 ${p.r}) (size 0.6 1.7) (layers "F.Cu" "F.Mask" "F.Paste") (solder_mask_margin 0.102) ${p.P5.str})
        (pad "6" smd rect (at 0.5 -2.45 ${p.r}) (size 0.6 1.7) (layers "F.Cu" "F.Mask" "F.Paste") (solder_mask_margin 0.102) ${p.P6.str})
        (pad "7" smd rect (at -0.5 -2.45 ${p.r}) (size 0.6 1.7) (layers "F.Cu" "F.Mask" "F.Paste") (solder_mask_margin 0.102) ${p.P7.str})
        (pad "8" smd rect (at -1.5 -2.45 ${p.r}) (size 0.6 1.7) (layers "F.Cu" "F.Mask" "F.Paste") (solder_mask_margin 0.102) ${p.P8.str})
        (pad "9" smd rect (at -2.5 -2.45 ${p.r}) (size 0.6 1.7) (layers "F.Cu" "F.Mask" "F.Paste") (solder_mask_margin 0.102) ${p.P9.str})
        (pad "10" smd rect (at -3.5 -2.45 ${p.r}) (size 0.6 1.7) (layers "F.Cu" "F.Mask" "F.Paste") (solder_mask_margin 0.102) ${p.P10.str})
        (pad "11" smd rect (at -4.5 -2.45 ${p.r}) (size 0.6 1.7) (layers "F.Cu" "F.Mask" "F.Paste") (solder_mask_margin 0.102) ${p.P11.str})
        (pad "12" smd rect (at -5.5 -2.45 ${p.r}) (size 0.6 1.7) (layers "F.Cu" "F.Mask" "F.Paste") (solder_mask_margin 0.102) ${p.P12.str})
        (pad "S2" smd rect (at -8.25 0.0 ${p.r}) (size 2.5 2.8) (layers "F.Cu" "F.Mask" "F.Paste") (solder_mask_margin 0.102))
    `;
    const silkscreen = `
        (fp_line (start -9.5 1.8) (end -9.5 3.95) (layer "F.SilkS") (stroke (width 0.2) (type solid)))
        (fp_line (start -9.5 3.95) (end 9.5 3.95) (layer "F.SilkS") (stroke (width 0.2) (type solid)))
        (fp_line (start 9.5 3.95) (end 9.5 1.8) (layer "F.SilkS") (stroke (width 0.2) (type solid)))
        (fp_circle (center 5.5 -4.05) (end 5.6 -4.05) (layer "F.SilkS") (stroke (width 0.2) (type solid)) (fill none))
    `;
    const fabrication = `
        (fp_line (start -9.5 -1.35) (end 9.5 -1.35) (layer "F.Fab") (stroke (width 0.1) (type solid)))
        (fp_line (start 9.5 -1.35) (end 9.5 3.95) (layer "F.Fab") (stroke (width 0.1) (type solid)))
        (fp_line (start 9.5 3.95) (end -9.5 3.95) (layer "F.Fab") (stroke (width 0.1) (type solid)))
        (fp_line (start -9.5 3.95) (end -9.5 -1.35) (layer "F.Fab") (stroke (width 0.1) (type solid)))
        (fp_circle (center 5.5 -4.05) (end 5.6 -4.05) (layer "F.Fab") (stroke (width 0.2) (type solid)) (fill none))
    `;
    const courtyard = `
        (fp_line (start -9.75 -3.55) (end -9.75 4.2) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
        (fp_line (start -9.75 4.2) (end 9.75 4.2) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
        (fp_line (start 9.75 4.2) (end 9.75 -3.55) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
        (fp_line (start 9.75 -3.55) (end -9.75 -3.55) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
    `;
    const common_end = ')';

    let final = common_start;
    final += pads;
    final += silkscreen;
    final += fabrication;
    final += courtyard;
    final += common_end;
    return final;
  },
};

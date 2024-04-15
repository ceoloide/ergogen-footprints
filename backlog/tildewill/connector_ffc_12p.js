/*
Copyright (c) 2023 Marco Massarelli

SPDX-License-Identifier: MIT

To view a copy of this license, visit https://opensource.org/license/mit/

Author: @TildeWill
*/
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
    const footprint = `
    (module GCT_FFC3B07-12-T (layer F.Cu) (tedit 65F1514D)
      (descr "tildewill:12 Position FFC, FPC Connector")
      ${p.at /* parametric position */}
      (attr smd)
      (fp_text reference ${p.ref} (at -6.575 -4.585 0) (layer F.SilkS) ${p.ref_hide}
        (effects (font (size 1.0 1.0) (thickness 0.15)))
      )
      (fp_text value GCT_FFC3B07-12-T (at 0.41 5.165 0) (layer F.Fab)
        (effects (font (size 1.0 1.0) (thickness 0.15)))
      )
  (pad S1 smd rect (at 8.25 0.0  ${p.rot}) (size 2.5 2.8) (layers F.Cu F.Mask F.Paste) (solder_mask_margin 0.102))
  (pad 1 smd rect (at 5.5 -2.45 ${p.rot}) (size 0.6 1.7) (layers F.Cu F.Mask F.Paste) (solder_mask_margin 0.102) ${p.P1.str})
  (pad 2 smd rect (at 4.5 -2.45 ${p.rot}) (size 0.6 1.7) (layers F.Cu F.Mask F.Paste) (solder_mask_margin 0.102) ${p.P2.str})
  (pad 3 smd rect (at 3.5 -2.45 ${p.rot}) (size 0.6 1.7) (layers F.Cu F.Mask F.Paste) (solder_mask_margin 0.102) ${p.P3.str})
  (pad 4 smd rect (at 2.5 -2.45 ${p.rot}) (size 0.6 1.7) (layers F.Cu F.Mask F.Paste) (solder_mask_margin 0.102) ${p.P4.str})
  (pad 5 smd rect (at 1.5 -2.45 ${p.rot}) (size 0.6 1.7) (layers F.Cu F.Mask F.Paste) (solder_mask_margin 0.102) ${p.P5.str})
  (pad 6 smd rect (at 0.5 -2.45 ${p.rot}) (size 0.6 1.7) (layers F.Cu F.Mask F.Paste) (solder_mask_margin 0.102) ${p.P6.str})
  (pad 7 smd rect (at -0.5 -2.45 ${p.rot}) (size 0.6 1.7) (layers F.Cu F.Mask F.Paste) (solder_mask_margin 0.102) ${p.P7.str})
  (pad 8 smd rect (at -1.5 -2.45 ${p.rot}) (size 0.6 1.7) (layers F.Cu F.Mask F.Paste) (solder_mask_margin 0.102) ${p.P8.str})
  (pad 9 smd rect (at -2.5 -2.45 ${p.rot}) (size 0.6 1.7) (layers F.Cu F.Mask F.Paste) (solder_mask_margin 0.102) ${p.P9.str})
  (pad 10 smd rect (at -3.5 -2.45 ${p.rot}) (size 0.6 1.7) (layers F.Cu F.Mask F.Paste) (solder_mask_margin 0.102) ${p.P10.str})
  (pad 11 smd rect (at -4.5 -2.45 ${p.rot}) (size 0.6 1.7) (layers F.Cu F.Mask F.Paste) (solder_mask_margin 0.102) ${p.P11.str})
  (pad 12 smd rect (at -5.5 -2.45 ${p.rot}) (size 0.6 1.7) (layers F.Cu F.Mask F.Paste) (solder_mask_margin 0.102) ${p.P12.str})
  (pad S2 smd rect (at -8.25 0.0 ${p.rot}) (size 2.5 2.8) (layers F.Cu F.Mask F.Paste) (solder_mask_margin 0.102))
  (fp_line (start -9.5 -1.35) (end 9.5 -1.35) (layer F.Fab) (width 0.1))
  (fp_line (start 9.5 -1.35) (end 9.5 3.95) (layer F.Fab) (width 0.1))
  (fp_line (start 9.5 3.95) (end -9.5 3.95) (layer F.Fab) (width 0.1))
  (fp_line (start -9.5 3.95) (end -9.5 -1.35) (layer F.Fab) (width 0.1))
  (fp_line (start -9.5 1.8) (end -9.5 3.95) (layer F.SilkS) (width 0.2))
  (fp_line (start -9.5 3.95) (end 9.5 3.95) (layer F.SilkS) (width 0.2))
  (fp_line (start 9.5 3.95) (end 9.5 1.8) (layer F.SilkS) (width 0.2))
  (fp_line (start -9.75 -3.55) (end -9.75 4.2) (layer F.CrtYd) (width 0.05))
  (fp_line (start -9.75 4.2) (end 9.75 4.2) (layer F.CrtYd) (width 0.05))
  (fp_line (start 9.75 4.2) (end 9.75 -3.55) (layer F.CrtYd) (width 0.05))
  (fp_line (start 9.75 -3.55) (end -9.75 -3.55) (layer F.CrtYd) (width 0.05))
  (fp_circle (center 5.5 -4.05) (end 5.6 -4.05) (layer F.Fab) (width 0.2))
  (fp_circle (center 5.5 -4.05) (end 5.6 -4.05) (layer F.SilkS) (width 0.2))
    )
    `
    return footprint;
  }
}
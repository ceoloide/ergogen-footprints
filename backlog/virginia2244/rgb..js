/*
Copyright (c) 2023 Marco Massarelli

SPDX-License-Identifier: MIT

To view a copy of this license, visit https://opensource.org/license/mit/

Author: @Virginia2244
*/

module.exports = {
  params: {
    designator: 'LED',
    side: 'F',
    reverse: false,
    din: undefined,
    dout: undefined,
    VCC: { type: 'net', value: 'VCC' },
    GND: { type: 'net', value: 'GND' }
  },
  body: p => {
    const standard = `
    
    (module WS2812B (layer F.Cu) (tedit 53BEE615)

        ${p.at /* parametric position */}

        ${'' /* footprint reference */}
        (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
        (fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))

        (fp_line (start -1.75 -1.75) (end -1.75 1.75) (layer ${p.side}.SilkS) (width 0.15))
        (fp_line (start -1.75 1.75) (end 1.75 1.75) (layer ${p.side}.SilkS) (width 0.15))
        (fp_line (start 1.75 1.75) (end 1.75 -1.75) (layer ${p.side}.SilkS) (width 0.15))
        (fp_line (start 1.75 -1.75) (end -1.75 -1.75) (layer ${p.side}.SilkS) (width 0.15))

        (fp_line (start -2.5 -2.5) (end -2.5 2.5) (layer ${p.side}.SilkS) (width 0.15))
        (fp_line (start -2.5 2.5) (end 2.5 2.5) (layer ${p.side}.SilkS) (width 0.15))
        (fp_line (start 2.5 2.5) (end 2.5 -2.5) (layer ${p.side}.SilkS) (width 0.15))
        (fp_line (start 2.5 -2.5) (end -2.5 -2.5) (layer ${p.side}.SilkS) (width 0.15))

        (fp_poly (pts (xy 4 2.2) (xy 4 0.375) (xy 5 1.2875)) (layer ${p.side}.SilkS) (width 0.1))

        (pad 1 smd rect (at -2.2 -0.875 ${p.rot}) (size 2.6 1) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${p.VCC.str})
        (pad 2 smd rect (at -2.2 0.875 ${p.rot}) (size 2.6 1) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${p.dout.str})
        (pad 3 smd rect (at 2.2 0.875 ${p.rot}) (size 2.6 1) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${p.GND.str})
        (pad 4 smd rect (at 2.2 -0.875 ${p.rot}) (size 2.6 1) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${p.din.str})

        (pad 11 smd rect (at -2.5 -1.6 ${p.rot}) (size 2 1.2) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${p.VCC.str})
        (pad 22 smd rect (at -2.5 1.6 ${p.rot}) (size 2 1.2) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${p.dout.str})
        (pad 33 smd rect (at 2.5 1.6 ${p.rot}) (size 2 1.2) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${p.GND.str})
        (pad 44 smd rect (at 2.5 -1.6 ${p.rot}) (size 2 1.2) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${p.din.str})
        
    )

`
    const double_sided = `
    
(module WS2812B (layer F.Cu) (tedit 53BEE615)

    ${p.at /* parametric position */}

    ${'' /* footprint reference */}
    (fp_text reference '${p.ref}' (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
    (fp_text value '' (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))

    (fp_line (start -1.75 -1.75) (end -1.75 1.75) (layer F.SilkS) (width 0.15))
    (fp_line (start -1.75 1.75) (end 1.75 1.75) (layer F.SilkS) (width 0.15))
    (fp_line (start 1.75 1.75) (end 1.75 -1.75) (layer F.SilkS) (width 0.15))
    (fp_line (start 1.75 -1.75) (end -1.75 -1.75) (layer F.SilkS) (width 0.15))

    (fp_line (start -2.5 -2.5) (end -2.5 2.5) (layer F.SilkS) (width 0.15))
    (fp_line (start -2.5 2.5) (end 2.5 2.5) (layer F.SilkS) (width 0.15))
    (fp_line (start 2.5 2.5) (end 2.5 -2.5) (layer F.SilkS) (width 0.15))
    (fp_line (start 2.5 -2.5) (end -2.5 -2.5) (layer F.SilkS) (width 0.15))

    (fp_poly (pts (xy 4 2.2) (xy 4 0.375) (xy 5 1.2875)) (layer F.SilkS) (width 0.1))

    (pad 1 smd rect (at -2.2 -0.875 ${p.rot}) (size 2.6 1) (layers F.Cu F.Paste F.Mask) ${p.VCC.str})
    (pad 2 smd rect (at -2.2 0.875 ${p.rot}) (size 2.6 1) (layers F.Cu F.Paste F.Mask) ${p.dout.str})
    (pad 3 smd rect (at 2.2 0.875 ${p.rot}) (size 2.6 1) (layers F.Cu F.Paste F.Mask) ${p.GND.str})
    (pad 4 smd rect (at 2.2 -0.875 ${p.rot}) (size 2.6 1) (layers F.Cu F.Paste F.Mask) ${p.din.str})

    (pad 11 smd rect (at -2.5 -1.6 ${p.rot}) (size 2 1.2) (layers F.Cu F.Paste F.Mask) ${p.VCC.str})
    (pad 22 smd rect (at -2.5 1.6 ${p.rot}) (size 2 1.2) (layers F.Cu F.Paste F.Mask) ${p.dout.str})
    (pad 33 smd rect (at 2.5 1.6 ${p.rot}) (size 2 1.2) (layers F.Cu F.Paste F.Mask) ${p.GND.str})
    (pad 44 smd rect (at 2.5 -1.6 ${p.rot}) (size 2 1.2) (layers F.Cu F.Paste F.Mask) ${p.din.str})
    




    (fp_line (start -1.75 -1.75) (end -1.75 1.75) (layer B.SilkS) (width 0.15))
    (fp_line (start -1.75 1.75) (end 1.75 1.75) (layer B.SilkS) (width 0.15))
    (fp_line (start 1.75 1.75) (end 1.75 -1.75) (layer B.SilkS) (width 0.15))
    (fp_line (start 1.75 -1.75) (end -1.75 -1.75) (layer B.SilkS) (width 0.15))

    (fp_line (start -2.5 -2.5) (end -2.5 2.5) (layer B.SilkS) (width 0.15))
    (fp_line (start -2.5 2.5) (end 2.5 2.5) (layer B.SilkS) (width 0.15))
    (fp_line (start 2.5 2.5) (end 2.5 -2.5) (layer B.SilkS) (width 0.15))
    (fp_line (start 2.5 -2.5) (end -2.5 -2.5) (layer B.SilkS) (width 0.15))

    (fp_poly (pts (xy 4 2.2) (xy 4 0.375) (xy 5 1.2875)) (layer B.SilkS) (width 0.1))

    (pad 5 smd rect (at -2.2 -0.875 ${p.rot}) (size 2.6 1) (layers B.Cu B.Paste B.Mask) ${p.VCC.str})
    (pad 6 smd rect (at -2.2 0.875 ${p.rot}) (size 2.6 1) (layers B.Cu B.Paste B.Mask) ${p.dout.str})
    (pad 7 smd rect (at 2.2 0.875 ${p.rot}) (size 2.6 1) (layers B.Cu B.Paste B.Mask) ${p.GND.str})
    (pad 8 smd rect (at 2.2 -0.875 ${p.rot}) (size 2.6 1) (layers B.Cu B.Paste B.Mask) ${p.din.str})

    (pad 12 smd rect (at -2.5 -1.6 ${p.rot}) (size 2 1.2) (layers B.Cu B.Paste B.Mask) ${p.VCC.str})
    (pad 23 smd rect (at -2.5 1.6 ${p.rot}) (size 2 1.2) (layers B.Cu B.Paste B.Mask) ${p.dout.str})
    (pad 34 smd rect (at 2.5 1.6 ${p.rot}) (size 2 1.2) (layers B.Cu B.Paste B.Mask) ${p.GND.str})
    (pad 45 smd rect (at 2.5 -1.6 ${p.rot}) (size 2 1.2) (layers B.Cu B.Paste B.Mask) ${p.din.str})


    (pad 50 thru_hole circle (at -2.5 -1.6) (size 0.8 0.8) (drill 0.4) (layers *.Cu *.Mask) ${p.VCC.str})
    (pad 51 thru_hole circle (at -2.5 1.6) (size 0.8 0.8) (drill 0.4) (layers *.Cu *.Mask) ${p.dout.str})
    (pad 52 thru_hole circle (at 2.5 1.6) (size 0.8 0.8) (drill 0.4) (layers *.Cu *.Mask) ${p.GND.str})
    (pad 53 thru_hole circle (at 2.5 -1.6) (size 0.8 0.8) (drill 0.4) (layers *.Cu *.Mask) ${p.din.str})
      
)
`
    if (p.reverse) {
      return `
            ${double_sided}
          `
    } else {
      return `
            ${standard}
      `
    }
  }
}
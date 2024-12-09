module.exports = {
    params: {
        designator: 'LED',
        side: 'F',
        reversible: false,
        din: undefined,
        dout: undefined,
        VCC: {type: 'net', value: 'VCC'},
        GND: {type: 'net', value: 'GND'}
    },
    body: p => {
        const reverse_side = p.side == 'F' ? 'B' : 'F'
        const common_start = `
        (module WS2812B (layer F.Cu) (tedit 53BEE615)

            ${p.at /* parametric position */}

            ${'' /* footprint reference */}
            (property "Reference" "${p.ref}" (at 0 0 ${90 + p.r}) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
            (property "Value" "WS2812B" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))
        	(attr smd)
            `
        const front_content = `
            (fp_line (start -3.75 -2.5) (end -3.75 2.5) (layer F.SilkS) (width 0.15))
            (fp_line (start -3.75 2.5) (end 3.75 2.5) (layer F.SilkS) (width 0.15))
            (fp_line (start 3.75 2.5) (end 3.75 -2.5) (layer F.SilkS) (width 0.15))
            (fp_line (start 3.75 -2.5) (end -3.75 -2.5) (layer F.SilkS) (width 0.15))

            (fp_line (start -4 -3) (end -4 3) (layer F.SilkS) (width 0.15))
            (fp_line (start -4 3) (end 4 3) (layer F.SilkS) (width 0.15))
            (fp_line (start 4 3) (end 4 -3) (layer F.SilkS) (width 0.15))
            (fp_line (start 4 -3) (end -4 -3) (layer F.SilkS) (width 0.15))

            (fp_poly (pts (xy 3 3) (xy 4 3) (xy 4 2)) (layer F.SilkS) (width 0.1))
            
            (pad 1 smd rect (at -2.2 -0.875 ${p.r}) (size 2.6 1) (layers F.Cu F.Paste F.Mask) ${p.VCC})
            (pad 2 smd rect (at -2.2 0.875 ${p.r}) (size 2.6 1) (layers F.Cu F.Paste F.Mask) ${p.dout})
            (pad 3 smd rect (at 2.2 0.875 ${p.r}) (size 2.6 1) (layers F.Cu F.Paste F.Mask) ${p.GND})
            (pad 4 smd rect (at 2.2 -0.875 ${p.r}) (size 2.6 1) (layers F.Cu F.Paste F.Mask) ${p.din})

            (pad 11 smd rect (at -2.5 -1.6 ${p.r}) (size 2 1.2) (layers F.Cu F.Paste F.Mask) ${p.VCC})
            (pad 22 smd rect (at -2.5 1.6 ${p.r}) (size 2 1.2) (layers F.Cu F.Paste F.Mask) ${p.dout})
            (pad 33 smd rect (at 2.5 1.6 ${p.r}) (size 2 1.2) (layers F.Cu F.Paste F.Mask) ${p.GND})
            (pad 44 smd rect (at 2.5 -1.6 ${p.r}) (size 2 1.2) (layers F.Cu F.Paste F.Mask) ${p.din})
        `
        const common_end = `
        )
        `
        const back_content = `
            (fp_text user "${p.ref}" (at 0 0 ${90 + p.r}) (layer B.SilkS) (effects (font (size 1.27 1.27) (thickness 0.15)) (justify mirror)))
            (fp_line (start -3.75 -2.5) (end -3.75 2.5) (layer B.SilkS) (width 0.15))
            (fp_line (start -3.75 2.5) (end 3.75 2.5) (layer B.SilkS) (width 0.15))
            (fp_line (start 3.75 2.5) (end 3.75 -2.5) (layer B.SilkS) (width 0.15))
            (fp_line (start 3.75 -2.5) (end -3.75 -2.5) (layer B.SilkS) (width 0.15))

            (fp_line (start -4 -3) (end -4 3) (layer B.SilkS) (width 0.15))
            (fp_line (start -4 3) (end 4 3) (layer B.SilkS) (width 0.15))
            (fp_line (start 4 3) (end 4 -3) (layer B.SilkS) (width 0.15))
            (fp_line (start 4 -3) (end -4 -3) (layer B.SilkS) (width 0.15))

            (fp_poly (pts (xy 3 -3) (xy 4 -3) (xy 4 -2)) (layer B.SilkS) (width 0.1))

            (pad 1 smd rect (at -2.2 -0.875 ${p.r}) (size 2.6 1) (layers B.Cu B.Paste B.Mask) ${p.dout})
            (pad 2 smd rect (at -2.2 0.875 ${p.r}) (size 2.6 1) (layers B.Cu B.Paste B.Mask) ${p.VCC})
            (pad 3 smd rect (at 2.2 0.875 ${p.r}) (size 2.6 1) (layers B.Cu B.Paste B.Mask) ${p.din})
            (pad 4 smd rect (at 2.2 -0.875 ${p.r}) (size 2.6 1) (layers B.Cu B.Paste B.Mask) ${p.GND})

            (pad 11 smd rect (at -2.5 -1.6 ${p.r}) (size 2 1.2) (layers B.Cu B.Paste B.Mask) ${p.dout})
            (pad 22 smd rect (at -2.5 1.6 ${p.r}) (size 2 1.2) (layers B.Cu B.Paste B.Mask) ${p.VCC})
            (pad 33 smd rect (at 2.5 1.6 ${p.r}) (size 2 1.2) (layers B.Cu B.Paste B.Mask) ${p.din})
            (pad 44 smd rect (at 2.5 -1.6 ${p.r}) (size 2 1.2) (layers B.Cu B.Paste B.Mask) ${p.GND})
        `

        let final = common_start;
        if (p.reversible || p.side == 'F') {
            final += front_content
        }

        if (p.reversible || p.side == 'B') {
            final += back_content
        }

        final += common_end;
        return final;
    }
}
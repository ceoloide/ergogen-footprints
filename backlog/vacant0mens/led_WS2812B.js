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
            (fp_text reference "${p.ref}" (at 0 0 ${90 + p.r}) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
            (fp_text value "" (at 0 0) (layer ${p.side}.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))

            (fp_line (start -2.5 -2.5) (end -2.5 2.5) (layer ${p.side}.SilkS) (width 0.15))
            (fp_line (start -2.5 2.5) (end 2.5 2.5) (layer ${p.side}.SilkS) (width 0.15))
            (fp_line (start 2.5 2.5) (end 2.5 -2.5) (layer ${p.side}.SilkS) (width 0.15))
            (fp_line (start 2.5 -2.5) (end -2.5 -2.5) (layer ${p.side}.SilkS) (width 0.15))

            (fp_line (start -3.5 -3) (end -3.5 3) (layer ${p.side}.SilkS) (width 0.15))
            (fp_line (start -3.5 3) (end 3.5 3) (layer ${p.side}.SilkS) (width 0.15))
            (fp_line (start 3.5 3) (end 3.5 -3) (layer ${p.side}.SilkS) (width 0.15))
            (fp_line (start 3.5 -3) (end -3.5 -3) (layer ${p.side}.SilkS) (width 0.15))

            (fp_poly (pts (xy 3.5 3) (xy 3.5 2) (xy 2 3)) (layer ${p.side}.SilkS) (width 0.1))
            
            (pad 1 smd rect (at -2.2 -0.875 ${p.r}) (size 2.6 1) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${p.VCC})
            (pad 2 smd rect (at -2.2 0.875 ${p.r}) (size 2.6 1) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${p.dout})
            (pad 3 smd rect (at 2.2 0.875 ${p.r}) (size 2.6 1) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${p.GND})
            (pad 4 smd rect (at 2.2 -0.875 ${p.r}) (size 2.6 1) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${p.din})

            (pad 11 smd rect (at -2.5 -1.6 ${p.r}) (size 2 1.2) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${p.VCC})
            (pad 22 smd rect (at -2.5 1.6 ${p.r}) (size 2 1.2) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${p.dout})
            (pad 33 smd rect (at 2.5 1.6 ${p.r}) (size 2 1.2) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${p.GND})
            (pad 44 smd rect (at 2.5 -1.6 ${p.r}) (size 2 1.2) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${p.din})
        `
        const common_end = `
        )
        `
        const reverse_content = `
            (fp_text value "%R" (at 0 1.2 ${90 + p.r}) (layer B.SilkS) (effects (font (size 1 1) (thickness 0.15)) (justify mirror)))
            (fp_line (start -2.5 -2.5) (end -2.5 2.5) (layer ${reverse_side}.SilkS) (width 0.15))
            (fp_line (start -2.5 2.5) (end 2.5 2.5) (layer ${reverse_side}.SilkS) (width 0.15))
            (fp_line (start 2.5 2.5) (end 2.5 -2.5) (layer ${reverse_side}.SilkS) (width 0.15))
            (fp_line (start 2.5 -2.5) (end -2.5 -2.5) (layer ${reverse_side}.SilkS) (width 0.15))

            (fp_line (start -3.5 -3) (end -3.5 3) (layer ${reverse_side}.SilkS) (width 0.15))
            (fp_line (start -3.5 3) (end 3.5 3) (layer ${reverse_side}.SilkS) (width 0.15))
            (fp_line (start 3.5 3) (end 3.5 -3) (layer ${reverse_side}.SilkS) (width 0.15))
            (fp_line (start 3.5 -3) (end -3.5 -3) (layer ${reverse_side}.SilkS) (width 0.15))

            (fp_poly (pts (xy 3.5 3) (xy 3.5 2) (xy 2 3)) (layer ${reverse_side}.SilkS) (width 0.1))

            (pad 1 smd rect (at -2.2 -0.875 ${p.r}) (size 2.6 1) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${p.VCC})
            (pad 2 smd rect (at -2.2 0.875 ${p.r}) (size 2.6 1) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${p.dout})
            (pad 3 smd rect (at 2.2 0.875 ${p.r}) (size 2.6 1) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${p.GND})
            (pad 4 smd rect (at 2.2 -0.875 ${p.r}) (size 2.6 1) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${p.din})

            (pad 11 smd rect (at -2.5 -1.6 ${p.r}) (size 2 1.2) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${p.VCC})
            (pad 22 smd rect (at -2.5 1.6 ${p.r}) (size 2 1.2) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${p.dout})
            (pad 33 smd rect (at 2.5 1.6 ${p.r}) (size 2 1.2) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${p.GND})
            (pad 44 smd rect (at 2.5 -1.6 ${p.r}) (size 2 1.2) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${p.din})
        `

        let final = common_start;

        if (p.reversible) {
            final += reverse_content
        }

        final += common_end;
        return final;
    }
}
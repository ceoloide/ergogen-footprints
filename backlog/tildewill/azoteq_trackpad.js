/*
Copyright (c) 2023 Marco Massarelli

SPDX-License-Identifier: MIT

To view a copy of this license, visit https://opensource.org/license/mit/

Author: @TildeWill

Footprint for the Azoteq TPS65 Trackpad
The Azoteq line has what they call a "hotbar" which has 2.00mm pitch that I find a lot easier to deal with than the FFC connector
This footprint includes a silk for the trackpad itself and six solder pads to match up to the six pads on the "hotbar"
It is designed to be soldered to 6P, SMD, right angle, PH 2.00mm sockets like these: https://www.aliexpress.us/item/3256802928739446.html
Then connected to the trackpad using a 6P, PH 2.0mm, same side, 10cm-long, Double Head Terminal Wire like this one: https://www.aliexpress.us/item/3256805957087430.html

In my experience, you only need the first four pins, SDA, SCL, VCC, and GND to get the trackpad to work with QMK, so 4P connectors and cable could be substituted
*/
module.exports = {
  params: {
    designator: 'TP',
    side: "F",
    SDA: { type: 'net', value: 'SDA' },
    SCL: { type: 'net', value: 'SCL' },
    VCC: { type: 'net', value: 'VCC' },
    GND: { type: 'net', value: 'GND' },
    RST: { type: 'net', value: '' },
    RDY: { type: 'net', value: '' }
  },
  body: p => {
    const footprint = `
          (module TPS65 (layer F.Cu) (tedit 5DD50112)
          ${p.at /* parametric position */}
          (attr virtual)
          (fp_text reference "${p.ref}" (at 0 0) (layer ${p.side}.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))

          ${''/* corner marks */}
          (fp_arc (start -29.5 21.5) (end -29.5 24.5) (angle 90) (layer F.SilkS) (width 0.15)) ${'' /*bottom left*/}
          (fp_arc (start 29.5 21.5) (end 32.5 21.5) (angle 90) (layer F.SilkS) (width 0.15)) ${'' /*bottom right*/}
          (fp_arc (start 29.5 -21.5) (end 29.5 -24.5) (angle 90) (layer F.SilkS) (width 0.15)) ${'' /*top right*/}
          (fp_arc (start -29.5 -21.5) (end -32.5 -21.5) (angle 90) (layer F.SilkS) (width 0.15)) ${'' /*top left*/}
          
          ${''/* pads */}
          (fp_text user "${p.SDA.name}" (at -12.5 14.5 ${p.rot + 90}) (layer ${p.side}.SilkS) (effects (font (size 0.6 0.6) (thickness 0.15))))
          (pad 0 smd rect (at -12.5 17.5 ${p.rot}) (size 1 3) (layers ${p.side}.Cu ${p.side}.Mask ${p.side}.Paste) ${p.SDA.str})
          (fp_text user "${p.SCL.name}" (at -10.5 14.5 ${p.rot + 90}) (layer ${p.side}.SilkS) (effects (font (size 0.6 0.6) (thickness 0.15))))
          (pad 1 smd rect (at -10.5 17.5 ${p.rot}) (size 1 3) (layers ${p.side}.Cu ${p.side}.Mask ${p.side}.Paste) ${p.SCL.str})
          (fp_text user "${p.VCC.name}" (at -8.5 14.5 ${p.rot + 90}) (layer ${p.side}.SilkS) (effects (font (size 0.6 0.6) (thickness 0.15))))
          (pad 2 smd rect (at -8.5 17.5 ${p.rot}) (size 1 3) (layers ${p.side}.Cu ${p.side}.Mask ${p.side}.Paste) ${p.VCC.str})
          (fp_text user "${p.GND.name}" (at -6.5 14.5 ${p.rot + 90}) (layer ${p.side}.SilkS) (effects (font (size 0.6 0.6) (thickness 0.15))))
          (pad 3 smd rect (at -6.5 17.5 ${p.rot}) (size 1 3) (layers ${p.side}.Cu ${p.side}.Mask ${p.side}.Paste) ${p.GND.str})
          (fp_text user "${p.RST.name}" (at -4.5 14.5 ${p.rot + 90}) (layer ${p.side}.SilkS) (effects (font (size 0.6 0.6) (thickness 0.15))))
          (pad 4 smd rect (at -4.5 17.5 ${p.rot}) (size 1 3) (layers ${p.side}.Cu ${p.side}.Mask ${p.side}.Paste) ${p.RST.str})
          (fp_text user "${p.RDY.name}" (at -2.5 14.5 ${p.rot + 90}) (layer ${p.side}.SilkS) (effects (font (size 0.6 0.6) (thickness 0.15))))
          (pad 5 smd rect (at -2.5 17.5 ${p.rot}) (size 1 3) (layers ${p.side}.Cu ${p.side}.Mask ${p.side}.Paste) ${p.RDY.str})
          )
      
      `
    return footprint;
  }
}
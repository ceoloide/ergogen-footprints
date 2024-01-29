// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: MIT
//
// To view a copy of this license, visit https://opensource.org/license/mit/
//
// Author: @ceoloide
//
// Description:
//   SMD side-operated momentary switch, compatible with Panasonic EVQ-PU[A|C|J|L]02K
//   as sold on Typeractive.xyz and LCSC. These switches are shorter than the height of hotswap
//   sockets, so they can be mounted on the same side.
//
// Datasheet:
//   https://cdn.shopify.com/s/files/1/0618/5674/3655/files/PANASONIC-EVQPUC02K.pdf?v=1670451309
//
// Nets:
//    from: corresponds to pin 1 and 3
//    to: corresponds to pin 2 and 4
//
// Params:
//    side: default is F for Front
//      the side on which to place the single-side footprint and designator, either F or B
//    reversible: default is false
//      if true, it will include pads on both Front and Back to make the footprint reversible
//    include_bosses: default is false
//      if true it will include two mechanical NPTH for the switches that have them (EVQ-PUC02K
//      and EVQ-PUL02K)
//    include_silkscreen: default is true
//      if true it will include silkscreen markings
//    include_courtyard: default is false
//      if true it will include the part courtyard

module.exports = {
    params: {
      designator: 'RST',
      side: 'F',
      reversible: false,
      include_bosses: false,
      include_silkscreen: true,
      include_courtyard: false,
      from: {type: 'net', value: 'GND'},
      to: {type: 'net', value: 'RST'},
    },
    body: p => {
      const common_start = `
        (module "ceoloide:reset_button_smd_side" (layer ${p.side}.Cu) (tedit 64473C6F)
          ${p.at /* parametric position */}
          (attr smd)
          (fp_text value "reset_button_smd_side" (at 0 2.5 ${p.rot}) (layer ${p.side}.Fab)
            (effects (font (size 1 1) (thickness 0.15)))
          )
          (fp_line (start -2.35 -1.75) (end -2.35 1.75) (width 0.1) (layer "Dwgs.User"))
          (fp_line (start -2.35 -1.75) (end 2.35 -1.75) (width 0.1) (layer "Dwgs.User"))
          (fp_line (start -2.35 1.75) (end 2.35 1.75) (width 0.1) (layer "Dwgs.User"))
          (fp_line (start -1.3 -2.75) (end -1.3 -1.75) (width 0.1) (layer "Dwgs.User"))
          (fp_line (start -1.3 -2.75) (end 1.3 -2.75) (width 0.1) (layer "Dwgs.User"))
          (fp_line (start 1.3 -2.75) (end 1.3 -1.75) (width 0.1) (layer "Dwgs.User"))
          (fp_line (start 2.35 -1.75) (end 2.35 1.75) (width 0.1) (layer "Dwgs.User"))
      `
      const silkscreen_front = `
        (fp_text reference "${p.ref}" (at 0 0 ${p.rot}) (layer F.SilkS) ${p.ref_hide}
          (effects (font (size 1 1) (thickness 0.15)))
        )
        (fp_line (start -2.35 -1.5) (end -2.35 -1.75) (width 0.1) (layer "F.SilkS"))
        (fp_line (start -2.35 1.5) (end -2.35 1.75) (width 0.1) (layer "F.SilkS"))
        (fp_line (start -2.1 -1.75) (end -2.35 -1.75) (width 0.1) (layer "F.SilkS"))
        (fp_line (start -2.1 1.75) (end -2.35 1.75) (width 0.1) (layer "F.SilkS"))
        (fp_line (start 2.1 -1.75) (end 2.35 -1.75) (width 0.1) (layer "F.SilkS"))
        (fp_line (start 2.1 1.75) (end 2.35 1.75) (width 0.1) (layer "F.SilkS"))
        (fp_line (start 2.35 -1.5) (end 2.35 -1.75) (width 0.1) (layer "F.SilkS"))
        (fp_line (start 2.35 1.5) (end 2.35 1.75) (width 0.1) (layer "F.SilkS"))
      `
      const silkscreen_back = `
        (fp_text reference "${p.ref}" (at 0 0 ${p.rot}) (layer B.SilkS) ${p.ref_hide}
          (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
        )
        (fp_line (start -2.35 -1.5) (end -2.35 -1.75) (width 0.1) (layer "B.SilkS"))
        (fp_line (start -2.35 1.5) (end -2.35 1.75) (width 0.1) (layer "B.SilkS"))
        (fp_line (start -2.1 -1.75) (end -2.35 -1.75) (width 0.1) (layer "B.SilkS"))
        (fp_line (start -2.1 1.75) (end -2.35 1.75) (width 0.1) (layer "B.SilkS"))
        (fp_line (start 2.1 -1.75) (end 2.35 -1.75) (width 0.1) (layer "B.SilkS"))
        (fp_line (start 2.1 1.75) (end 2.35 1.75) (width 0.1) (layer "B.SilkS"))
        (fp_line (start 2.35 -1.5) (end 2.35 -1.75) (width 0.1) (layer "B.SilkS"))
        (fp_line (start 2.35 1.5) (end 2.35 1.75) (width 0.1) (layer "B.SilkS"))
      `
      const pads_front = `
        (pad "1" smd rect (at 2.625 -0.85 ${180 + p.rot}) (size 1.55 1) (layers "F.Cu" "F.Paste" "F.Mask") ${p.from.str})
        (pad "2" smd rect (at 2.625 0.85 ${180 + p.rot}) (size 1.55 1) (layers "F.Cu" "F.Paste" "F.Mask") ${p.to.str})
        (pad "3" smd rect (at -2.625 -0.85 ${180 + p.rot}) (size 1.55 1) (layers "F.Cu" "F.Paste" "F.Mask") ${p.from.str})
        (pad "4" smd rect (at -2.625 0.85 ${180 + p.rot}) (size 1.55 1) (layers "F.Cu" "F.Paste" "F.Mask") ${p.to.str})
      `
      const pads_back = `
        (pad "1" smd rect (at -2.625 -0.85 ${180 + p.rot}) (size 1.55 1) (layers "B.Cu" "B.Paste" "B.Mask") ${p.from.str})
        (pad "2" smd rect (at -2.625 0.85 ${180 + p.rot}) (size 1.55 1) (layers "B.Cu" "B.Paste" "B.Mask") ${p.to.str})
        (pad "3" smd rect (at 2.625 -0.85 ${180 + p.rot}) (size 1.55 1) (layers "B.Cu" "B.Paste" "B.Mask") ${p.from.str})
        (pad "4" smd rect (at 2.625 0.85 ${180 + p.rot}) (size 1.55 1) (layers "B.Cu" "B.Paste" "B.Mask") ${p.to.str})
      `
      const courtyard_front = `
        (fp_line (start -2.36 -1.75) (end -2.36 1.75) (width 0.05) (layer "F.CrtYd"))
        (fp_line (start -2.36 -1.75) (end 2.36 -1.75) (width 0.05) (layer "F.CrtYd"))
        (fp_line (start 2.36 -1.75) (end 2.36 1.75) (width 0.05) (layer "F.CrtYd"))
        (fp_line (start 2.36 1.75) (end -2.36 1.75) (width 0.05) (layer "F.CrtYd"))
      `
      const courtyard_back = `
        (fp_line (start -2.36 -1.75) (end -2.36 1.75) (width 0.05) (layer "B.CrtYd"))
        (fp_line (start -2.36 1.75) (end 2.36 1.75) (width 0.05) (layer "B.CrtYd"))
        (fp_line (start 2.36 -1.75) (end -2.36 -1.75) (width 0.05) (layer "B.CrtYd"))
        (fp_line (start 2.36 -1.75) (end 2.36 1.75) (width 0.05) (layer "B.CrtYd"))
      `
      const bosses = `
        (pad "" np_thru_hole circle (at 0 -1.375 ${180 + p.rot}) (size 0.75 0.75) (drill 0.75) (layers "*.Cu" "*.Mask"))
        (pad "" np_thru_hole circle (at 0 1.375 ${180 + p.rot}) (size 0.75 0.75) (drill 0.75) (layers "*.Cu" "*.Mask"))
      `
      const common_end = `
      )
      `

      let final = common_start;
      if(p.include_bosses){
        final += bosses
      }
      if(p.side == "F" || p.reversible) {
        final += pads_front
        if(p.include_silkscreen){
          final += silkscreen_front
        }
        if(p.include_courtyard){
          final += courtyard_front
        }
      }
      if(p.side == "B" || p.reversible) {
        final += pads_back
        if(p.include_silkscreen){
          final += silkscreen_back
        }
        if(p.include_courtyard){
          final += courtyard_back
        }
      }

      final += common_end;

      return final;
    }
 }

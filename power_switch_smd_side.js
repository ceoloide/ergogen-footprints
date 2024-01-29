// Copyright (c) 2023 Marco Massarelli
//
// Licensed under CC BY-NC-SA 4.0. 
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
//
// Authors: @infused-kim + @ceoloide improvements
//
// Description:
//  SMD side-operated on-off switch, compatible with Alps SSSS811101 as sold on
//  Typeractive.xyz and LCSC. These switches are shorter than the height of hotswap sockets,
//  so they can be mounted on the same side.
//
//  Should be compatible with:
//    - G-Switch MK-12C02-G015 (untested)
//    - PCM12SMTR (untested)
//
// Datasheet:
//   https://cdn.shopify.com/s/files/1/0618/5674/3655/files/ALPS-SSSS811101.pdf?v=1670451309
//
// Nets:
//    from: corresponds to pin 1 on the Front and 3 on the back
//    to: corresponds to pin 2 on both sides
//
// Params:
//    side: default is F for Front
//      the side on which to place the single-side footprint and designator, either F (Front)
//      or B (Back)
//    reversible: default is false
//      if true, it will include pads on both Front and Back to make the footprint reversible
//    invert_behavior: default is false
//      if true, pin 3 will connect to the "from" net, and if false it will connect to pin 1,
//      effectively inverting the behavior of the switch.
//    include_silkscreen: default is true
//      if true it will include silkscreen markings, which is recommended to know which side
//      connects Bat+ to RAW.
//    include_courtyard: default is false
//      if true it will include the courtyard around the component
//
// @ceoloide's improvements:
//  - Add ability to set text on both sides
//  - Add ability to adjust font thickness and size
//  - Add ability to invert switch behavior / pin connections
//  - Invert behavior on opposite layer to maintain consistency
//  - Add on/off silkscreen to aid operation

module.exports = {
  params: {
    designator: 'PWR',
    side: 'F',
    reversible: false,
    invert_behavior: true,
    include_silkscreen: true,
    include_courtyard: false,
    from: {type: 'net', value: 'BAT_P'},
    to: {type: 'net', value: 'RAW'},
  },
  body: p => {
    const common_start = `
      (module "ceoloide:power_switch_smd_side" (layer ${p.side}.Cu) (tedit 64473C6F)
        ${p.at /* parametric position */}
        (attr smd)
        (fp_text value "reset_button" (at 0 2.5 ${p.rot}) (layer ${p.side}.Fab)
          (effects (font (size 1 1) (thickness 0.15)))
        )
    `
    const silkscreen_front = `
        (fp_text reference "${p.ref}" (at -3.6 0 ${-90 + p.rot}) (layer F.SilkS) ${p.ref_hide}
          (effects (font (size 1 1) (thickness 0.15)))
        )
        (fp_text user "ON" (at 0 ${p.invert_behavior ? '-' : ''}4.5 ${p.rot}) (layer "F.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify ${p.invert_behavior ? 'bottom' : 'top'}))
        )
        (fp_text user "OFF" (at 0 ${p.invert_behavior ? '' : '-'}4.5 ${p.rot}) (layer "F.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify ${p.invert_behavior ? 'top' : 'bottom'}))
        )
        (fp_line (start 0.415 -3.45) (end -0.375 -3.45) (layer F.SilkS) (width 0.12))
        (fp_line (start -0.375 3.45) (end 0.415 3.45) (layer F.SilkS) (width 0.12))
        (fp_line (start -1.425 1.6) (end -1.425 -0.1) (layer F.SilkS) (width 0.12))
        (fp_line (start 1.425 2.85) (end 1.425 -2.85) (layer F.SilkS) (width 0.12))
        (fp_line (start -1.425 -1.4) (end -1.425 -1.6) (layer F.SilkS) (width 0.12))
    `
    const silkscreen_back = `
        (fp_text user "${p.ref}" (at -3.5 0 ${90 + p.rot}) (layer B.SilkS) ${p.ref_hide}
          (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
        )
        (fp_text user "ON" (at 0 ${p.invert_behavior ? '-' : ''}4.5 ${p.rot}) (layer "B.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify ${p.invert_behavior ? 'bottom' : 'top'} mirror))
        )
        (fp_text user "OFF" (at 0 ${p.invert_behavior ? '' : '-'}4.5 ${p.rot}) (layer "B.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify ${p.invert_behavior ? 'top' : 'bottom'} mirror))
        )
        (fp_line (start -1.425 1.4) (end -1.425 1.6) (layer B.SilkS) (width 0.12))
        (fp_line (start 0.415 3.45) (end -0.375 3.45) (layer B.SilkS) (width 0.12))
        (fp_line (start -0.375 -3.45) (end 0.415 -3.45) (layer B.SilkS) (width 0.12))
        (fp_line (start -1.425 -1.6) (end -1.425 0.1) (layer B.SilkS) (width 0.12))
        (fp_line (start 1.425 -2.85) (end 1.425 2.85) (layer B.SilkS) (width 0.12))
    `
    const courtyard_front = `
        (fp_line (start 1.795 4.4) (end -2.755 4.4) (layer F.CrtYd) (width 0.05))
        (fp_line (start 1.795 1.65) (end 1.795 4.4) (layer F.CrtYd) (width 0.05))
        (fp_line (start 3.095 1.65) (end 1.795 1.65) (layer F.CrtYd) (width 0.05))
        (fp_line (start 3.095 -1.65) (end 3.095 1.65) (layer F.CrtYd) (width 0.05))
        (fp_line (start 1.795 -1.65) (end 3.095 -1.65) (layer F.CrtYd) (width 0.05))
        (fp_line (start 1.795 -4.4) (end 1.795 -1.65) (layer F.CrtYd) (width 0.05))
        (fp_line (start -2.755 -4.4) (end 1.795 -4.4) (layer F.CrtYd) (width 0.05))
        (fp_line (start -2.755 4.4) (end -2.755 -4.4) (layer F.CrtYd) (width 0.05))
    `
    const courtyard_back = `
        (fp_line (start -2.755 -4.4) (end -2.755 4.4) (layer B.CrtYd) (width 0.05))
        (fp_line (start 3.095 1.65) (end 3.095 -1.65) (layer B.CrtYd) (width 0.05))
        (fp_line (start 1.795 1.65) (end 3.095 1.65) (layer B.CrtYd) (width 0.05))
        (fp_line (start 1.795 -4.4) (end -2.755 -4.4) (layer B.CrtYd) (width 0.05))
        (fp_line (start 1.795 -1.65) (end 1.795 -4.4) (layer B.CrtYd) (width 0.05))
        (fp_line (start 3.095 -1.65) (end 1.795 -1.65) (layer B.CrtYd) (width 0.05))
        (fp_line (start 1.795 4.4) (end 1.795 1.65) (layer B.CrtYd) (width 0.05))
        (fp_line (start -2.755 4.4) (end 1.795 4.4) (layer B.CrtYd) (width 0.05))
    `

    const pads_front = `
        (fp_line (start -1.305 -3.35) (end -1.305 3.35) (layer F.Fab) (width 0.1))
        (fp_line (start 1.295 -3.35) (end -1.305 -3.35) (layer F.Fab) (width 0.1))
        (fp_line (start 1.295 3.35) (end 1.295 -3.35) (layer F.Fab) (width 0.1))
        (fp_line (start -1.305 3.35) (end 1.295 3.35) (layer F.Fab) (width 0.1))
        (fp_line (start 2.595 0.1) (end 1.295 0.1) (layer F.Fab) (width 0.1))
        (fp_line (start 2.645 0.15) (end 2.595 0.1) (layer F.Fab) (width 0.1))
        (fp_line (start 2.845 0.35) (end 2.645 0.15) (layer F.Fab) (width 0.1))
        (fp_line (start 2.845 1.2) (end 2.845 0.35) (layer F.Fab) (width 0.1))
        (fp_line (start 2.645 1.4) (end 2.845 1.2) (layer F.Fab) (width 0.1))
        (fp_line (start 1.345 1.4) (end 2.645 1.4) (layer F.Fab) (width 0.1))
        (pad "" smd rect (at 1.125 -3.65 ${90 + p.rot}) (size 1 0.8) (layers F.Cu F.Paste F.Mask))
        (pad "" smd rect (at -1.085 -3.65 ${90 + p.rot}) (size 1 0.8) (layers F.Cu F.Paste F.Mask))
        (pad "" smd rect (at -1.085 3.65 ${90 + p.rot}) (size 1 0.8) (layers F.Cu F.Paste F.Mask))
        (pad "" smd rect (at 1.125 3.65 ${90 + p.rot}) (size 1 0.8) (layers F.Cu F.Paste F.Mask))
        (pad 1 smd rect (at -1.735 2.25 ${90 + p.rot}) (size 0.7 1.5) (layers F.Cu F.Paste F.Mask) ${p.invert_behavior ? '' : p.from.str})
        (pad 2 smd rect (at -1.735 -0.75 ${90 + p.rot}) (size 0.7 1.5) (layers F.Cu F.Paste F.Mask) ${p.to.str})
        (pad 3 smd rect (at -1.735 -2.25 ${90 + p.rot}) (size 0.7 1.5) (layers F.Cu F.Paste F.Mask) ${p.invert_behavior ? p.from.str : ''})

    `
    const pads_back = `
        (fp_line (start 2.595 -0.1) (end 1.295 -0.1) (layer B.Fab) (width 0.1))
        (fp_line (start -1.305 3.35) (end -1.305 -3.35) (layer B.Fab) (width 0.1))
        (fp_line (start 2.645 -0.15) (end 2.595 -0.1) (layer B.Fab) (width 0.1))
        (fp_line (start 2.845 -1.2) (end 2.845 -0.35) (layer B.Fab) (width 0.1))
        (fp_line (start 1.345 -1.4) (end 2.645 -1.4) (layer B.Fab) (width 0.1))
        (fp_line (start 2.845 -0.35) (end 2.645 -0.15) (layer B.Fab) (width 0.1))
        (fp_line (start 2.645 -1.4) (end 2.845 -1.2) (layer B.Fab) (width 0.1))
        (fp_line (start 1.295 -3.35) (end 1.295 3.35) (layer B.Fab) (width 0.1))
        (fp_line (start 1.295 3.35) (end -1.305 3.35) (layer B.Fab) (width 0.1))
        (fp_line (start -1.305 -3.35) (end 1.295 -3.35) (layer B.Fab) (width 0.1))
        (pad "" smd rect (at -1.085 -3.65 ${270 + p.rot}) (size 1 0.8) (layers B.Cu B.Paste B.Mask))
        (pad "" smd rect (at 1.125 -3.65 ${270 + p.rot}) (size 1 0.8) (layers B.Cu B.Paste B.Mask))
        (pad "" smd rect (at -1.085 3.65 ${270 + p.rot}) (size 1 0.8) (layers B.Cu B.Paste B.Mask))
        (pad "" smd rect (at 1.125 3.65 ${270 + p.rot}) (size 1 0.8) (layers B.Cu B.Paste B.Mask))
        (pad 1 smd rect (at -1.735 -2.25 ${270 + p.rot}) (size 0.7 1.5) (layers B.Cu B.Paste B.Mask) ${p.invert_behavior ? p.from.str : ''})
        (pad 2 smd rect (at -1.735 0.75 ${270 + p.rot}) (size 0.7 1.5) (layers B.Cu B.Paste B.Mask) ${p.to.str})
        (pad 3 smd rect (at -1.735 2.25 ${270 + p.rot}) (size 0.7 1.5) (layers B.Cu B.Paste B.Mask) ${p.invert_behavior ? '' : p.from.str})
      `
    const common_end = `
      (pad "" np_thru_hole circle (at 0.025 -1.5 ${90 + p.rot}) (size 0.9 0.9) (drill 0.9) (layers *.Cu *.Mask))
      (pad "" np_thru_hole circle (at 0.025 1.5 ${90 + p.rot}) (size 0.9 0.9) (drill 0.9) (layers *.Cu *.Mask))
    )
    `

    let final = common_start;
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

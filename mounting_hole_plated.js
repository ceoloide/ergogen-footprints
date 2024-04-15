// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
//
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
//
// Author: @infused-kim + @ceoloide improvements
//
// Description:
//  A simple mounting hole with plated rim.
//
//  Note that some fine details may be lost depending on scale and fab capabilities.
//
// Params:
//    side: default is F for Front
//      The side on which to place the mounting hole.
//    outline: default is 0.8 (mm)
//      The width of the gold rim around the hole, in mm.
//    drill: default is 2.2 (mm / M2 screw)
//      The actual size for the hole. If drill_y is defined, it represents the
//      horizontal width of an oval hole, in mm.
//    drill_y: default is 0 (mm)
//      The vertical height of an oval hole, in mm.
//    include_courtyard: default is true
//      if true it will include the part courtyard
//
//  @ceoloide's improvements:
//    - Upgrade to KiCad 8
//    - Minor footprint restructure

module.exports = {
  params: {
    designator: 'H',
    side: 'F',
    outline: 0.8,
    drill: 2.2,
    drill_y: 0,
    include_courtyard: true,
  },
  body: p => {
    if (p.drill_y == 0) {
      p.drill_y = p.drill
    }

    const size_x = p.drill + p.outline * 2;
    const size_y = p.drill_y + p.outline * 2;

    const courtyard_offset = 0.25;
    const courtyard_x = size_x / 2 + courtyard_offset;
    const courtyard_y = size_y / 2 + courtyard_offset;

    const top = `
  (footprint "ceoloide:mounting_hole_plated"
    (layer "${p.side}.Cu")
    ${p.at}
    (property "Reference" "${p.ref}"
      (at 0 3 ${p.r})
      (layer "${p.side}.SilkS")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15)))
    )
    `

    const pad_circle = `
    (pad "" thru_hole circle (at 0 0 ${p.r}) (size ${size_x} ${size_y}) (drill ${p.drill}) (layers "*.Cu" "*.Mask"))
    `
    const courtyard_circle = `
    (fp_circle (center 0 0) (end -${courtyard_x} 0) (layer "F.CrtYd") (stroke (width 0.05) (type solid)) (fill none))
    (fp_circle (center 0 0) (end -${courtyard_x} 0) (layer "B.CrtYd") (stroke (width 0.05) (type solid)) (fill none))
    `
    const pad_oval = `
    (pad "" thru_hole oval (at 0 0 ${p.r}) (size ${size_x} ${size_y}) (drill oval ${p.drill} ${p.drill_y}) (layers "*.Cu" "*.Mask"))
    `
    const courtyard_oval = `
    (fp_line (start ${courtyard_x} -${courtyard_y}) (end ${courtyard_x} ${courtyard_y}) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start -${courtyard_x} -${courtyard_y}) (end -${courtyard_x} ${courtyard_y}) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start -${courtyard_x} ${courtyard_y}) (end ${courtyard_x} ${courtyard_y}) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start -${courtyard_x} -${courtyard_y}) (end ${courtyard_x} -${courtyard_y}) (layer "F.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start -${courtyard_x} ${courtyard_y}) (end ${courtyard_x} ${courtyard_y}) (layer "B.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start -${courtyard_x} ${courtyard_y}) (end -${courtyard_x} -${courtyard_y}) (layer "B.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start -${courtyard_x} -${courtyard_y}) (end ${courtyard_x} -${courtyard_y}) (layer "B.CrtYd") (stroke (width 0.05) (type solid)))
    (fp_line (start ${courtyard_x} ${courtyard_y}) (end ${courtyard_x} -${courtyard_y}) (layer "B.CrtYd") (stroke (width 0.05) (type solid)))
    `

    const bottom = `
  )
    `

    let final = top
    if (size_x == size_y) {
      final += pad_circle
      final += courtyard_circle
    } else {
      final += pad_oval
      final += courtyard_oval
    }

    final += bottom

    return final
  }
}
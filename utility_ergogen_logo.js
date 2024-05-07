// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: MIT
//
// To view a copy of this license, visit https://opensource.org/license/mit/
//
// Author: @dieseltravis + @ceoloide improvements
//
// Description:
//  A 5mm x 5mmm Ergogen logo that can be scaled and assigned to any layer of your board.
//  Make sure to add it to your board and spread the love <3
//
//  Note that some fine details may be lost depending on scale and fab capabilities.
//
// Params:
//    side: default is F for Front
//      the side on which to place the logo. When the backside is selected, the logo will
//      be mirrored automatically
//    layer: default is 'SilkS' (Silkscreen layer)
//      the layer where the logo will be placed, useful to have copper + soldermask texts
//    reversible: default is false
//      adds the logo on both sides, taking care of mirroring the backside
//    scale: default is 1.0 (100%)
//      the scale ratio to apply to the logo, to make it bigger or smaller
//
// @ceoloide's improvements:
//  - Mirror the logo when added to the back layer
//  - Add reversible option to add the logo on both layers
//  - Ensure numbers have at most 6 decimals (KiCad max precision)
//  - Upgrade to KiCad 8

module.exports = {
  params: {
    designator: 'LOGO',
    side: 'F',
    layer: 'SilkS',
    reversible: false,
    scale: 1.0,
  },
  body: p => {
    const scaled_point = (x, y, scale, mirrored) => {
      let scaled_x = x * scale * (mirrored ? -1.0 : 1.0)
      let scaled_y = y * scale
      return `(xy ${scaled_x.toFixed(6)} ${scaled_y.toFixed(6)})`
    }
    const fp_poly = (side, layer, scale, mirrored) => {
      const s = scale
      const m = mirrored
      return `
    (fp_poly 
      (pts
          ${scaled_point(2.501231, 0, s, m)} ${scaled_point(2.501231, 2.501231, s, m)} ${scaled_point(0, 2.501231, s, m)} ${scaled_point(-2.50123, 2.501231, s, m)} ${scaled_point(-2.50123, 1.013088, s, m)}
          ${scaled_point(-1.738355, 1.013088, s, m)} ${scaled_point(-0.021885, 1.009917, s, m)} ${scaled_point(1.694584, 1.006746, s, m)} ${scaled_point(1.697905, 0.662827, s, m)} ${scaled_point(1.701225, 0.318907, s, m)}
          ${scaled_point(1.52891, 0.490867, s, m)} ${scaled_point(1.356594, 0.662827, s, m)} ${scaled_point(-0.19088, 0.662827, s, m)} ${scaled_point(-1.738355, 0.662827, s, m)} ${scaled_point(-1.738355, 0.837957, s, m)}
          ${scaled_point(-1.738355, 1.013088, s, m)} ${scaled_point(-2.50123, 1.013088, s, m)} ${scaled_point(-2.50123, 0.150074, s, m)} ${scaled_point(-1.394101, 0.150074, s, m)} ${scaled_point(-0.637478, 0.150074, s, m)}
          ${scaled_point(0.119144, 0.150074, s, m)} ${scaled_point(0.293895, -0.025012, s, m)} ${scaled_point(0.468646, -0.200098, s, m)} ${scaled_point(-0.287976, -0.200098, s, m)} ${scaled_point(-1.044599, -0.200098, s, m)}
          ${scaled_point(-1.21935, -0.025012, s, m)} ${scaled_point(-1.394101, 0.150074, s, m)} ${scaled_point(-2.50123, 0.150074, s, m)} ${scaled_point(-2.50123, 0, s, m)} ${scaled_point(-2.50123, -1.063023, s, m)}
          ${scaled_point(-1.738355, -1.063023, s, m)} ${scaled_point(-1.738355, -0.887937, s, m)} ${scaled_point(-1.738355, -0.71285, s, m)} ${scaled_point(-0.190545, -0.71285, s, m)} ${scaled_point(1.357266, -0.71285, s, m)}
          ${scaled_point(1.525751, -0.544017, s, m)} ${scaled_point(1.578342, -0.491483, s, m)} ${scaled_point(1.624575, -0.445614, s, m)} ${scaled_point(1.661679, -0.409133, s, m)} ${scaled_point(1.686885, -0.384763, s, m)}
          ${scaled_point(1.697422, -0.375226, s, m)} ${scaled_point(1.697537, -0.375184, s, m)} ${scaled_point(1.698399, -0.387158, s, m)} ${scaled_point(1.699177, -0.420952, s, m)} ${scaled_point(1.69984, -0.473372, s, m)}
          ${scaled_point(1.700359, -0.541225, s, m)} ${scaled_point(1.700701, -0.62132, s, m)} ${scaled_point(1.700836, -0.710463, s, m)} ${scaled_point(1.700837, -0.719103, s, m)} ${scaled_point(1.700837, -1.063023, s, m)}
          ${scaled_point(-0.018759, -1.063023, s, m)} ${scaled_point(-1.738355, -1.063023, s, m)} ${scaled_point(-2.50123, -1.063023, s, m)} ${scaled_point(-2.50123, -2.50123, s, m)} ${scaled_point(0, -2.50123, s, m)}
          ${scaled_point(2.501231, -2.50123, s, m)}
      )
			(stroke
				(width 0.01)
				(type solid)
			)
			(fill solid)
      (layer "${side}.${layer}")
    )
      `
    }
    const common_top = `
  (footprint "ceoloide:utility_ergogen_logo"
    (layer "${p.side}.Cu")
    ${p.at}
    (property "Reference" "${p.ref}"
      (at ${p.scale * 4.572} 0 ${p.r})
      (layer "${p.side}.Fab")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15)))
    )
		(attr exclude_from_pos_files exclude_from_bom)
    `
    const common_bottom = `
  )
    `
    let ergogen_log_fp = common_top
    if (p.reversible) {
      ergogen_log_fp += fp_poly('F', p.layer, p.scale, false)
      ergogen_log_fp += fp_poly('B', p.layer, p.scale, true)
    } else {
      ergogen_log_fp += fp_poly(p.side, p.layer, p.scale, p.side == 'B')
    }
    ergogen_log_fp += common_bottom
    return ergogen_log_fp
  }
};

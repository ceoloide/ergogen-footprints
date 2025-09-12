// Copyright (c) 2024 Marco Massarelli
//
// SPDX-License-Identifier: MIT
//
// To view a copy of this license, visit https://opensource.org/license/mit/
//
// Author: @ceoloide
//
// Description:
//  A KiCad native keepout zone, also known as a rule area. It can be used to
//  prevent traces, vias, and copper pours from being placed in a certain area.
//
// Params:
//    side: default is 'F&B' for both Front and Back
//      the side on which to place the keepout zone, either 'F' for Front, 'B'
//      for Back, or 'F&B' for both.
//    name: default is '' (no name)
//      an optional name to give to the rule area.
//    locked: default is false
//      if true it will lock the resulting rule area.
//    corner_smoothing: default is chamfer
//      allows to specify the type of corner smoothing ('none', 'chamfer',
//      'fillet').
//    smoothing_radius: default is 0.5
//      the radius of the corner smoothing, valid when 'chamfer' or
//      'fillet' are selected.
//    keepout_traces: default is true
//      if true it will prevent traces from being routed in the area.
//    keepout_vias: default is true
//      if true it will prevent vias from being placed in the area.
//    keepout_copperpour: default is true
//      if true it will prevent copper pours from filling the area.
//    points:
//      an array containing the polygon points of the keepout area, in
//      xy coordinates relative to the PCB.
//    corner_1_offset: default is [0, 0]
//      the offset of the first corner of a rectangle, used if `points` is not
//      provided.
//    corner_2_offset:
//      the offset of the second corner of a rectangle, used if `points` is not
//      provided. If not specified, it will be the mirrored version of corner 1.
//    corner_3_offset:
//      the offset of the third corner of a rectangle, used if `points` is not
//      provided. If not specified, it will be the mirrored version of corner 1.
//    corner_4_offset:
//      the offset of the fourth corner of a rectangle, used if `points` is not
//      provided. If not specified, it will be the mirrored version of corner 1.

module.exports = {
  params: {
    side: 'F&B',
    name: '',
    locked: false,
    corner_smoothing: 'chamfer',
    smoothing_radius: 0.5,
    keepout_traces: true,
    keepout_vias: true,
    keepout_copperpour: true,
    points: undefined,
    corner_1_offset: [0, 0],
    corner_2_offset: undefined,
    corner_3_offset: undefined,
    corner_4_offset: undefined,
  },
  body: p => {
    let local_points = p.points;
    if (!local_points) {
      const c1 = p.corner_1_offset;
      const c2 = p.corner_2_offset || [-c1[0], c1[1]];
      const c3 = p.corner_3_offset || [-c1[0], -c1[1]];
      const c4 = p.corner_4_offset || [c1[0], -c1[1]];
      local_points = [c1, c2, c3, c4];
    }

    let polygon_pts = ''
    for (let i = 0; i < local_points.length; i++) {
      polygon_pts += `(xy ${local_points[i][0]} ${local_points[i][1]}) `
    }

    const layers = p.side.split('&').map(s => `${s}.Cu`).join(' ')

    return `
  (rule_area
    (locked ${p.locked ? 'yes' : 'no'})
    (layers ${layers})
    ${p.name ? '(name "' + p.name + '")' : ''}
    (keepout
      (tracks ${p.keepout_traces ? 'not_allowed' : 'allowed'})
      (vias ${p.keepout_vias ? 'not_allowed' : 'allowed'})
      (copperpour ${p.keepout_copperpour ? 'not_allowed' : 'allowed'})
    )
    (polygon
      (pts
        ${polygon_pts}
      )
      ${p.corner_smoothing != '' ? `(corner_smoothing ${p.corner_smoothing})` : ''}
      ${p.corner_smoothing != '' ? `(radius ${p.smoothing_radius})` : ''}
    )
  )
    `
  }
}

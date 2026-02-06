// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: MIT
//
// To view a copy of this license, visit https://opensource.org/license/mit/
//
// Author: @ceoloide
//
// Description:
//  A KiCad native keepout zone.
//
// Params:
//    side: default is 'F&B' for both Front and Back
//      the side on which to place the keepout zone, either 'F' for Front, 'B'
//      for Back, or 'F&B' for both.
//    name: default is '' (no name)
//      an optional name to give to the zone.
//    locked: default is false
//      if true it will lock the resulting keepout zone.
//    tracks_allowed: default is true
//      if true, tracks are allowed in the keepout zone.
//    vias_allowed: default is true
//      if true, vias are allowed in the keepout zone.
//    pads_allowed: default is true
//      if true, pads are allowed in the keepout zone.
//    copperpour_allowed: default is true
//      if true, copper pours are allowed in the keepout zone.
//    footprints_allowed: default is true
//      if true, footprints are allowed in the keepout zone.
//    outline_type: default is 'edge'
//      the type of outline to use for the keepout zone, either 'none' to just
//      display a line, 'edge' to display a hatch pattern at the edge, or `full`
//      to display a full hatch pattern.
//    hatch_pitch: default is 1
//      the pitch (distance between display lines) of the hatch pattern (in mm).
//      Must be below 2mm.
//    points: default is [[0,0],[420,0],[420,297],[0,297]]
//      an array containing the polygon points of the filled area, in
//      xy coordinates relative to the PCB. The default is a square area of
//      420x297mm^2 located at (0,0) xy coordinates, essentially filling the
//      entire "PCB sheet" area.

module.exports = {
  params: {
    side: 'F&B',
    name: '',
    locked: false,
    tracks_allowed: true,
    vias_allowed: true,
    pads_allowed: true,
    copperpour_allowed: true,
    footprints_allowed: true,
    outline_type: 'edge',
    hatch_pitch: 1,
    points: [[0, 0], [420, 0], [420, 297], [0, 297]],
  },
  body: p => {
    if (p.hatch_pitch < 0 || p.hatch_pitch > 2) {
      throw new Error(
        'Parameter hatch_pitch must be a positive number below 2mm to avoid KiCad issues. Current value: ' + p.hatch_pitch + 'mm'
      );
    }
    let polygon_pts = ''
    for (let i = 0; i < p.points.length; i++) {
      polygon_pts += `(xy ${p.points[i][0]} ${p.points[i][1]}) `
    }
    return `
  (zone
    (net 0)
    (net_name "")
    (locked ${p.locked ? 'yes' : 'no'})
    (layers "${p.side}.Cu")
    ${p.name ? '(name "' + p.name + '")' : ''}
		(hatch ${p.outline_type} ${p.hatch_pitch})
    (connect_pads
      (clearance 0)
    )
    (min_thickness 0.25)
    (filled_areas_thickness no)
		(keepout
			(tracks ${p.tracks_allowed ? 'allowed' : 'not_allowed'})
			(vias ${p.vias_allowed ? 'allowed' : 'not_allowed'})
			(pads ${p.pads_allowed ? 'allowed' : 'not_allowed'})
			(copperpour ${p.copperpour_allowed ? 'allowed' : 'not_allowed'})
			(footprints ${p.footprints_allowed ? 'allowed' : 'not_allowed'})
		)
		(fill
			(thermal_gap 0.5)
			(thermal_bridge_width 0.5)
		)
    (polygon
      (pts
        ${polygon_pts}
      )
    )
  )
    `
  }
}

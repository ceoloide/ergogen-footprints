// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: MIT
//
// To view a copy of this license, visit https://opensource.org/license/mit/
//
// Author: @ceoloide
//
// Description:
//  A KiCad native filled zone, for example a copper fill or hatch pattern.
//
// NOTE: Filled zones need to be calculated at least once or they'll result
//       empty.
//
// Params:
//    side: default is 'F&B' for both Front and Back
//      the side on which to place the filled zone, either 'F' for Front, 'B'
//      for Back, or 'F&B' for both.
//    name: default is '' (no name)
//      an optional name to give to the zone.
//    priority: default is 0
//      an optional priority to give to the zone
//    locked: default is false
//      if true it will lock the resulting fill.
//    corner_smoothing: default is chamfer
//      allows to specify the type of corner smoothing ('none', 'chamfer',
//      'fillet').
//    smoothing_radius: default is 0.5
//      the radius of the corner smoothing, valid when 'chamfer' or
//      'fillet' are selected.
//    net: default is GND
//      the net connected to this filled zone, for example GND
//    pad_clearance: default is 0.508
//      the electrical clearance to be applied (in mm). KiCad default
//      is 0.508.
//    min_thickness: default is 0.25
//      the minimum thickness of the zone areas (in mm). KiCad default
//      is 0.25 to match default net properties. It shouldn't be lowered
//      below 0.127 (the min width JLCPCB handles).
//    connect_pads: default is ''
//      whether pads should be connected, one of '' (thermal reliefs), 
//      'yes' (solid connection), 'thru_hole_only', or 'no'.
//    thermal_gap: default is 0.5
//      the thermal relief gap (in mm), with KiCad default being 0.5
//    thermal_bridge_width: default is 0.5
//      the thermal relief spoke width (in mm), with KiCad default being 0.5
//    remove_islands: default is 'never'
//      whether to remove islands, one of 'never', 'always', or 'below_area_limit'
//    min_island_size: default is 5
//      the min island size in mm^2 to be kept if island should be removed below
//      a given area limit.
//    fill_type: default is 'solid'
//      the type of fill, either 'solid' or 'hatch'
//    hatch_thickness: default is 1
//      the thickness of the hatch pattern (in mm)
//    hatch_gap: default is 1.5
//      the hatch gap size (in mm)
//    hatch_orientation: default is 0
//      the orientation of the htach pattern (in degrees)
//    hatch_smoothing_level: default is 0
//      the level of smoothing to apply to the hatch pattern algorithm,
//      between 0 and 3
//    hatch_smoothing_value: default is 0.1
//      the smoothing value used by the hatch smoothing algorithm,
//      bertween 0.0 and 1.0
//    points: default is [[0,0],[420,0],[420,297],[0,297]]
//      an array containing the polygon points of the filled area, in
//      xy coordinates relative to the PCB. The default is a square area of
//      420x297mm^2 located at (0,0) xy coordinates, essentially filling the
//      entire "PCB sheet" area.

module.exports = {
  params: {
    side: 'F',
    net: { type: 'net', value: 'GND' },
    name: '',
    priority: 0,
    locked: false,
    corner_smoothing: 'chamfer',
    smoothing_radius: 0.5,
    connect_pads: '',
    pad_clearance: 0.508,
    min_thickness: 0.25,
    thermal_gap: 0.5,
    thermal_bridge_width: 0.5,
    remove_islands: 'never',
    min_island_size: 5,
    fill_type: 'solid',
    hatch_thickness: 1,
    hatch_gap: 1.5,
    hatch_orientation: 0,
    hatch_smoothing_level: 0,
    hatch_smoothing_value: 0.1,
    points: [[0, 0], [420, 0], [420, 297], [0, 297]],
  },
  body: p => {
    let polygon_pts = ''
    for (let i = 0; i < p.points.length; i++) {
      polygon_pts += `(xy ${p.points[i][0]} ${p.points[i][1]}) `
    }
    return `
  (zone
    (net ${p.net.index})
    (net_name "${p.net.name}")
    (locked ${p.locked ? 'yes' : 'no'})
    (layers "${p.side}.Cu")
    ${p.name ? '(name "' + p.name + '")' : ''}
    (hatch edge 0.5)
    ${p.prority > 0 ? '(priority ' + p.priority + ')' : ''}
    (connect_pads ${p.connect_pads}
      (clearance ${p.pad_clearance})
    )
    (min_thickness ${p.min_thickness})
    (filled_areas_thickness no)
    (fill 
      ${p.fill_type == 'solid' ? 'yes' : '(mode ' + p.fill_type + ')'}
      (thermal_gap ${p.thermal_gap})
      (thermal_bridge_width ${p.thermal_bridge_width})
      ${p.corner_smoothing != '' ? '(smoothing ' + p.corner_smoothing + ')' : ''}
      ${p.corner_smoothing != '' ? '(radius ' + p.smoothing_radius + ')' : ''}
      ${p.remove_islands == 'always' ? '' : '(island_removal_mode ' + (p.remove_islands == 'never' ? 1 : 2) + ')'}
      ${p.remove_islands == 'always' ? '' : '(island_area_min ' + p.min_island_size + ')'}
      ${p.fill_type == 'solid' ? '' : '(hatch_thickness ' + p.hatch_thickness + ')'}
      ${p.fill_type == 'solid' ? '' : '(hatch_gap ' + p.hatch_gap + ')'}
      ${p.fill_type == 'solid' ? '' : '(hatch_orientation ' + p.hatch_orientation + ')'}
      ${p.fill_type == 'solid' || p.hatch_smoothing_level < 1 ? '' : '(hatch_smoothing_level ' + p.hatch_smoothing_level + ')'}
      ${p.fill_type == 'solid' || p.hatch_smoothing_level < 1 ? '' : '(hatch_smoothing_value ' + p.hatch_smoothing_value + ')'}
      ${p.fill_type == 'solid' ? '' : '(hatch_border_algorithm hatch_thickness)'}
      ${p.fill_type == 'solid' ? '' : '(hatch_min_hole_area 0.3)'}
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

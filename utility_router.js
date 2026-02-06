// Copyright (c) 2025 Marco Massarelli
//
// SPDX-License-Identifier: MIT
//
// To view a copy of this license, visit https://opensource.org/license/mit/
//
// Author: @yanshay + @ceoloide improvements
//
// Description:
//   This footprint provides basic routing capabilities including laying routes (traces) and vias.
//
//   It is useful especially since there are tens of keys per keyboard which have exact same routing
//   and whenever a change needs to be made to Ergogen config, rerouting is required. This footprint
//   allows compact routing declaration in Ergogen directly.
//
//   For a more complete description, consult the original documentation at: https://github.com/yanshay/ergogen-stuff/blob/main/docs/router.md
//
//   A KiCad Plugin exists in order to facilitate the configuration of this footprint: 
//  
// Example:
//  row_route:
//    what: ceoloide/utility_router
//    where: true
//    params:
//    net: "{{row_net}}"
//    route: "f(-8.275,5.1)(-8.275,7.26)"
//
//  row_route2:
//    what: ceoloide/utility_router
//    where: true
//    params:
//    net: "{{row_net}}"
//    route: "f(-8.275 5.1) (-8.275 7.26)"
//
// Params:
//    net: default is no net
//      allows specifying a net for all routes in this footprint. To route multiple different nets,
//      you would need several different footprint configurations. However, if this parameter is left
//      to the default value then KiCad will fill in the missing nets when a file is opened in KiCad.
//      Support for multiple nets is included, but depends on an unmerged Ergogen PR. For details see
//      https://github.com/ergogen/ergogen/pull/109
//    width: default 0.250mm
//      the default trace width to be used.  Not recommended to go below 0.15mm (JLCPC min is 0.127mm).
//    via_size: default is 0.6
//      allows to define the size of the via. Not recommended below 0.56 (JLCPCB minimum),
//      or above 0.8 (KiCad default), to avoid overlap or DRC errors
//    via_drill: default is 0.3
//      allows to define the size of the drill. Not recommended below 0.3 (JLCPCB minimum),
//      or above 0.4 (KiCad default), to avoid overlap or DRC errors 
//    locked: default is false
//      sets the traces and vias as locked in KiCad. Locked objects may not be manipulated
//      or moved, and cannot be selected unless the Locked Items option is enabled in the
//      Selection Filter panel in KiCad. Useful for a faster workflow. If using autorouting
//      solutions like Freerouting, locking can prevent the traces and vias from being
//      replaced.
//    routes: default empty / no routes
//      an array of routes based on the syntax described below, each stands by its own except they all
//      share other params (net, ...)
//    route: default empty / no route
//      allows adding a single route using the syntax described below, but on a single row and in a more
//      concise format
//
// Route syntax:
//  A route is a string that describe how to route using one letter commands and positions. It follows to
//  some extent KiCad key presses to make it easy to remember. Valid commands are as follows:
//    
//    b - route on the back layer - there is no default layer to avoid mistakes
//    f - route on the front layer
//    v - place a via and switch layer
//    x or | - start a new route (if layer is set, stays on the same layer, just like in KiCad)
//    (x_pos,y_pos) - route to the given position (relative to the Ergogen point). If it is the first
//      occurrence in the route or if after x command then it places the cursor in the specific point.
//    <net_name> - the name of a net to use for the following segment. Currently unsupported in mainline
//      Ergogen, until https://github.com/ergogen/ergogen/pull/109 is merged.
//
// @morrijr's improvements:
//  - ',' between x and y, is now optional
//  - Spaces between coordinates are now allowed
// @ceoloide's improvements:
//  - Replace `get_at_coordinates` and `adjust_point` with native Ergogen `eaxy()`
//  - Refresh `via` and `segment` syntax to align with KiCad 8
//
// Special credit to @infused-kim for the adjust_point() function in the original code.
 
module.exports = {
  params: {
    net: { type: "net", value: "" },
    width: { type: "number", value: 0.25 },
    via_size: { type: "number", value: 0.6 },
    via_drill: { type: "number", value: 0.3 },
    locked: false,
    routes: { type: "array", value: [] },
    route: { type: "string", value: "" },
  },

  body: (p) => {
    /*
    Reference (KiCad 8):
    
    (segment
      (start 108.8 108)
      (end 109.7 108)
      (width 0.2)
      (locked yes)
      (layer "F.Cu")
      (net 0)
    )
      */
    const get_segment = (start, end, layer, net) => {
      if (!layer) {
        throw new Error(
          "Can't place segment before layer is set, use 'f' or 'b', to set starting layer"
        )
      }
      return `
  (segment
    (start ${p.eaxy(start[0], start[1])}) 
    (end ${p.eaxy(end[0], end[1])})
    (width ${p.width})
    (locked ${p.locked ? 'yes' : 'no'})
    (layer ${layer})
    (net ${net})
  )`
    }

    /*
    Reference (KiCad 8):

    (via
      (at -7.775 -5.95)
      (size 0.6)
      (drill 0.3)
      (layers "F.Cu" "B.Cu")
      (locked yes)
      (net 2)
    )
    */
    const get_via = (pos, net) => {
      if (!pos) {
        throw new Error(
          "Can't place via when position is not set, use (x,y) to set position"
        )
      }
      return `
  (via
    (at ${p.eaxy(pos[0], pos[1])})
    (size ${p.via_size})
    (drill ${p.via_drill})
    (layers "F.Cu" "B.Cu")
    (locked ${p.locked ? 'yes' : 'no'})
    (net ${net})
  )`
    }

    const parse_tuple = (t) => {
      let str_tuple = JSON.parse(
        t.replace(/ /g, ',') // replace spaces with commas
        .replace(/[,]+/g, ',') // replace multiple commas with a single comma
        .replace(/\([,]*/g, "[") // replace opening parenthesis (and any leading comma's) with a bracket
        .replace(/[,]*\)/g, "]")) // replace closing parenthesis (and any trailing comma's) with a bracket
      let num_tuple = str_tuple.map((v) => Number(v))
      if (isNaN(num_tuple[0] || isNaN(num_tuple[1]))) {
        throw new Error(`Invalid position encountered: ${str_tuple}`)
      }
      return num_tuple
    }

    const get_traces = (route, net) => {
      let traces = ""
      let layer = undefined
      let start = undefined // [x, y]

      for (let i = 0; i < route.length; i++) {
        let command = route[i].toLowerCase()
        switch (command) {
          case "f":
            layer = "F.Cu"
            break
          case "b":
            layer = "B.Cu"
            break
          case "v":
            traces = traces + get_via(start, net) + "\n"
            switch (layer) {
              case "F.Cu":
                layer = "B.Cu"
                break
              case "B.Cu":
                layer = "F.Cu"
                break
            }
            break
          case "(":
            let tuple_str = "("
            let parenthesis_idx = i
            for (i = i + 1; i < route.length; i++) {
              let ch = route[i]
              tuple_str += ch
              if (route[i] == ")") {
                break
              }
              if (i > route.length) {
                throw new Error(
                  `Unclosed position parenthesis in ${route} at character position ${parenthesis_idx}`
                )
              }
            }
            let pos = parse_tuple(tuple_str)
            if (start) {
              traces = traces + get_segment(start, pos, layer, net) + "\n"
            }
            start = pos
            break
          case "<":
            if(typeof p.global_net !== 'Function') {
              throw new Error(
                `Global nets are not yet supported (character position ${i}). See https://github.com/ergogen/ergogen/pull/109`
              )
            }
            let net_name = ""
            let lt_idx = i
            for (i = i + 1; i < route.length; i++) {
              let ch = route[i]
              if (route[i] == ">") {
                break
              }
              net_name += ch
              if (i > route.length) {
                throw new Error(
                  `Unclosed net parenthesis in ${route} at character position ${lt_idx}`
                )
              }
            }
            net = p.global_net(net_name)
          case "x":
          case "|":
            start = undefined
            break
          case " ":
            break // ignore spaces between coordinates
          default:
            throw new Error(`Unsupported character '${command}' at position ${i}.`)
        }
      }

      return traces
    }

    const get_routes_traces = (routes, net) => {
      let routes_traces = routes.reduce((acc_traces, route) => {
        return acc_traces + get_traces(route, net)
      }, "")
      return routes_traces
    }

    let combined_traces = ""
    if (p.route) {
      combined_traces += get_traces(p.route, p.net.index)
    }
    if (p.routes) {
      combined_traces += get_routes_traces(p.routes, p.net.index)
    }

    return combined_traces
  },
}

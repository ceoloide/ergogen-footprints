// Router Footprint for ErgoGen
// Version: 1.0
// Designed and Implemented by @yanshay
// https://github.com/yanshay/ergogen-stuff 
// This file is under /blob/main/footprints/router.js

// Snippets of code used here were taken from https://github.com/infused-kim/kb_ergogen_fp and modified (adjust_point)
// Credits goes to Github infused-kim, Thanks!

module.exports = {
  params: {
    net: { type: "net", value: "" },
    width: { type: "number", value: 0.25 },
    route: { type: "string", value: "" },
    routes: { type: "array", value: [] },
    via_size: { type: "number", value: 0.8 },
    via_drill: { type: "number", value: 0.4 },
    locked: false,
  },

  body: (p) => {
    const get_at_coordinates = () => {
      const pattern = /\(at (-?[\d\.]*) (-?[\d\.]*) (-?[\d\.]*)\)/
      const matches = p.at.match(pattern)
      if (matches && matches.length == 4) {
        return [
          parseFloat(matches[1]),
          parseFloat(matches[2]),
          parseFloat(matches[3]),
        ]
      } else {
        return null
      }
    }

    const adjust_point = (x, y) => {
      const at_l = get_at_coordinates()
      if (at_l == null) {
        throw new Error(`Could not get x and y coordinates from p.at: ${p.at}`)
      }
      const at_x = at_l[0]
      const at_y = at_l[1]
      const at_angle = at_l[2]

      const radians = (Math.PI / 180) * at_angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = cos * x + sin * y + at_x,
        ny = cos * y - sin * x + at_y

      const point_str = `${nx.toFixed(5)/1} ${ny.toFixed(5)/1}` // the division by 1 is to remove trailing zeros
      return point_str
    }

    // (segment (start 108.8 108) (end 109.7 108) (width 0.2) (layer "F.Cu") (net 0))
    const get_segment = (start, end, layer, net) => {
      if (!layer) {
        throw new Error(
          "Can't place segment before layer is set, use 'f' or 'b', to set starting layer"
        )
      }
      return `(segment ${locked}(start ${adjust_point(
        start[0],
        start[1]
      )}) (end ${adjust_point(end[0], end[1])}) (width ${
        p.width
      }) (layer ${layer}) (net ${net}))`
    }

    // (via (at 108.8 108) (size 0.8) (drill 0.4) (layers "F.Cu" "B.Cu") (net 0))
    const get_via = (pos, net) => {
      if (!pos) {
        throw new Error(
          "Can't place via when position is not set, use (x,y) to set position"
        )
      }
      return `(via ${locked}(at ${adjust_point(pos[0], pos[1])}) (size ${
        p.via_size
      }) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") (net ${net}))`
    }

    const parse_tuple = (t) => {
      let str_tuple = JSON.parse(t.replace(/\(/g, "[").replace(/\)/g, "]"))
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
        ch = route[i].toLowerCase()
        switch (ch) {
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
          default:
            throw new Error(`Unsupported character '${ch}' at position ${i}.`)
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
    let locked = p.locked ? 'locked ' : ''
    if (p.route) {
      combined_traces += get_traces(p.route, p.net.index)
    }
    if (p.routes) {
      combined_traces += get_routes_traces(p.routes, p.net.index)
    }

    return combined_traces
  },
}

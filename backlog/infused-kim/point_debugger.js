// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
//
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
//
// Author: @infused-kim
//
// Description:
// Adds tiny x and y arrows at the origin of points to help with the debugging
// of complex layouts.
//
// This will only show arrows for actual points you define. So if you draw an
// outline without defining points, then they won't show up.
//
// Usage:
// You can make enabling and disabling easy with ergogen's preprocessor:
//
// ```js
// settings:
//   point_debugger:
//     enabled: false
// [...]
// pcbs:
//   your_keyboard:
//     footprints:
//       point_debugger:
//         what: infused-kim/point_debugger
//         where: true
//         params:
//           $extends: settings.point_debugger
// ```
//
// Showing the point name:
// The footprint supports showing the name of the point when you zoom in, but
// the latest version of ergogen (4.0.4) does not make the name available to
// the footprint.
//
// Until this gets merged, you can use the ergogen fork from this PR:
// https://github.com/ergogen/ergogen/pull/103

module.exports = {
  params: {
    designator: 'P',
    enabled: true,
  },
  body: p => {
    if (p.enabled == false) {
      return '';
    }

    const top = `
          (module point_debugger (layer F.Cu) (tedit 64B42FA5)
              ${p.at /* parametric position */}
              (fp_text reference ${p.ref}"(at 0 2) (layer F.SilkS) ${p.ref_hide}
                  (effects (font (size 1 1) (thickness 0.15)))
              )
              (fp_line (start -0.6 0) (end 0.6 0) (layer Dwgs.User) (width 0.05))
              (fp_line (start 0 -0.6) (end 0 0.6) (layer Dwgs.User) (width 0.05))
              (fp_line (start 0.6 0) (end 0.5 -0.1) (layer Dwgs.User) (width 0.05))
              (fp_line (start 0.6 0) (end 0.5 0.1) (layer Dwgs.User) (width 0.05))
              (fp_line (start 0 -0.6) (end 0.1 -0.5) (layer Dwgs.User) (width 0.05))
              (fp_line (start 0 -0.6) (end -0.1 -0.5) (layer Dwgs.User) (width 0.05))
      `

    const bottom = `
          )
      `

    let final = top;

    // point is a property that is not available to footprints as of
    // ergogen 4.0.4. I have submitted a PR to add it and until then
    // my custom fork needs to be used if you want to see it.
    if ('point' in p) {
      final += `
                  (fp_text user ${p.point.meta.name} (at -0.3 -0.05 ${p.rot}) (layer Dwgs.User)
                      (effects (font (size 0.0254 0.0254) (thickness 0.001)))
                  )
          `;
    }

    final += bottom;

    return final;
  }
}
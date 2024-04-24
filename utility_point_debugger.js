/*
Copyright (c) 2023 Marco Massarelli

SPDX-License-Identifier: CC-BY-NC-SA-4.0

To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/

Author: @infused-kim + @ceoloide improvements

Description:
  Adds tiny x and y arrows at the origin of points to help with the debugging
  of complex layouts.

  This will only show arrows for actual points you define. So if you draw an
  outline without defining points, then they won't show up.

Usage:
  ou can make enabling and disabling easy with ergogen's preprocessor:

  ```js
  settings:
    point_debugger:
      enabled: false
  [...]
  pcbs:
    your_keyboard:
      footprints:
        point_debugger:
          what: infused-kim/point_debugger
          where: true
          params:
            $extends: settings.point_debugger
  ```

Showing the point name:
  The footprint supports showing the name of the point when you zoom in, but
  the latest version of ergogen (4.1.0) does not make the name available to
  the footprint.

  Until this gets merged, you can use the ergogen fork from this PR:
  https://github.com/ergogen/ergogen/pull/103
  
Params:
  enabled: default is true
    Whether to include or not the point debugger footprint

@ceoloide' improvements
  - Upgrade to KiCad 8 
*/
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
  (footprint "ceoloide:utility_point_debugger"
    (layer "F.Cu")
    ${p.at}
    (property "Reference" "${p.ref}"
      (at 0 2)
      (layer "Dwgs.User")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15)))
    )
    (fp_line (start -0.6 0) (end 0.6 0) (layer "Dwgs.User") (stroke (width 0.05) (type solid)))
    (fp_line (start 0 -0.6) (end 0 0.6) (layer "Dwgs.User") (stroke (width 0.05) (type solid)))
    (fp_line (start 0.6 0) (end 0.5 -0.1) (layer "Dwgs.User") (stroke (width 0.05) (type solid)))
    (fp_line (start 0.6 0) (end 0.5 0.1) (layer "Dwgs.User") (stroke (width 0.05) (type solid)))
    (fp_line (start 0 -0.6) (end 0.1 -0.5) (layer "Dwgs.User") (stroke (width 0.05) (type solid)))
    (fp_line (start 0 -0.6) (end -0.1 -0.5) (layer "Dwgs.User") (stroke (width 0.05) (type solid)))
      `

    const bottom = `
  )
      `

    let final = top;

    if ('point' in p) { // Only available from commit #852c100
      final += ` 
    (fp_text user "${p.point.meta.name}"
      (at -0.3 -0.05 ${p.r})
      (layer "Dwgs.User")
      (effects (font (size 0.0254 0.0254) (thickness 0.001)))
    )
      `;
    }

    final += bottom;

    return final;
  }
}
/*
Copyright (c) 2023 Marco Massarelli

SPDX-License-Identifier: MIT

To view a copy of this license, visit https://opensource.org/license/mit/

Author: @ergogen / @MrZealot
*/
module.exports = {
  params: {
    designator: 'B', // for Button
    side: 'F',
    from: undefined,
    to: undefined
  },
  body: p => {
    const footprint = `
    (module SW_FSM8JH (layer ${p.side}.Cu) (tedit 659AFCD2)
      ${p.at /* parametric position */}
      (descr "")
      (fp_text reference ${p.ref} (at -1.71258 -4.01401 0) (layer ${p.side}.SilkS)
        (effects (font (size 0.801196850394 0.801196850394) (thickness 0.15)))
      )
      (fp_text value SW_FSM8JH (at 0.50808 3.9377 0) (layer ${p.side}.Fab)
        (effects (font (size 0.800141732283 0.800141732283) (thickness 0.15)))
      )
      (pad 1 thru_hole rect (at -3.25 -2.25) (size 1.498 1.498) (drill 0.99) (layers *.Cu *.Mask) ${p.to.str})
      (pad 3 thru_hole circle (at 3.25 -2.25) (size 1.498 1.498) (drill 0.99) (layers *.Cu *.Mask))
      (pad 2 thru_hole circle (at -3.25 2.25) (size 1.498 1.498) (drill 0.99) (layers *.Cu *.Mask) ${p.from.str})
      (pad 4 thru_hole circle (at 3.25 2.25) (size 1.498 1.498) (drill 0.99) (layers *.Cu *.Mask))
      (fp_line (start -2.995 -2.995) (end -2.995 2.995) (layer ${p.side}.Fab) (width 0.127))
      (fp_line (start -2.995 2.995) (end 2.995 2.995) (layer ${p.side}.Fab) (width 0.127))
      (fp_line (start 2.995 2.995) (end 2.995 -2.995) (layer ${p.side}.Fab) (width 0.127))
      (fp_line (start 2.995 -2.995) (end -2.995 -2.995) (layer ${p.side}.Fab) (width 0.127))
      (fp_circle (center 0.0 0.0) (end 1.75 0.0) (layer ${p.side}.Fab) (width 0.127))
      (fp_line (start -3.0 -1.0) (end -3.0 1.0) (layer ${p.side}.SilkS) (width 0.127))
      (fp_line (start 3.0 -1.0) (end 3.0 1.0) (layer ${p.side}.SilkS) (width 0.127))
      (fp_line (start -2.0 -3.0) (end 2.0 -3.0) (layer ${p.side}.SilkS) (width 0.127))
      (fp_line (start -2.0 3.0) (end 2.0 3.0) (layer ${p.side}.SilkS) (width 0.127))
      (fp_circle (center 0.0 0.0) (end 1.75 0.0) (layer ${p.side}.SilkS) (width 0.127))
      (fp_line (start -4.25 -3.25) (end 4.25 -3.25) (layer ${p.side}.CrtYd) (width 0.05))
      (fp_line (start 4.25 -3.25) (end 4.25 3.245) (layer ${p.side}.CrtYd) (width 0.05))
      (fp_line (start 4.25 3.245) (end -4.25 3.245) (layer ${p.side}.CrtYd) (width 0.05))
      (fp_line (start -4.25 3.245) (end -4.25 -3.25) (layer ${p.side}.CrtYd) (width 0.05))
      (fp_circle (center -4.75 -2.25) (end -4.55 -2.25) (layer ${p.side}.SilkS) (width 0.4))
      (fp_circle (center -3.25 -2.25) (end -3.05 -2.25) (layer ${p.side}.Fab) (width 0.4))
    )
    
    `
    return footprint;
  }
}
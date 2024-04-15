/*
Copyright (c) 2023 Marco Massarelli

SPDX-License-Identifier: MIT

To view a copy of this license, visit https://opensource.org/license/mit/

Author: @Virginia2244

Description:
  A reversable footprint for the elite-c microcontroller.

Datasheet: (really just a wiki but it was the closest I could find)
  https://deskthority.net/wiki/Elite-C

Params
  reversable: default is false
    When enabled the PCB is reversable
  label: default is true
    Turns on and off the elite-c label
  instructions: default is true
    turns on and off the instructions about which side to solder the
  jumpers traces: default is true
    Turns on and off auto tracing for the reversable pins
  reversable_pins: default is 5
    How many pins need to be reversable? Only the top 5 need to
    be reversable because they aren't GPIO. After that the pins are changable in
    the firmware.
*/


module.exports = {
  params: {
    reversable: { type: 'boolean', value: false },
    label: { type: 'boolean', value: true },
    instructions: { type: 'boolean', value: true },
    traces: { type: 'boolean', value: true },
    reversable_pins: { type: 'boolean', value: 5 },

    D3: { type: 'net', value: 'D3' },
    D2: { type: 'net', value: 'D2' },
    D1: { type: 'net', value: 'D1' },
    D0: { type: 'net', value: 'D0' },
    D4: { type: 'net', value: 'D4' },
    C6: { type: 'net', value: 'C6' },
    D7: { type: 'net', value: 'D7' },
    E6: { type: 'net', value: 'E6' },
    B4: { type: 'net', value: 'B4' },
    B5: { type: 'net', value: 'B5' },

    B0: { type: 'net', value: 'B0' },
    F4: { type: 'net', value: 'F4' },
    F5: { type: 'net', value: 'F5' },
    F6: { type: 'net', value: 'F6' },
    F7: { type: 'net', value: 'F7' },
    B1: { type: 'net', value: 'B1' },
    B3: { type: 'net', value: 'B3' },
    B2: { type: 'net', value: 'B2' },
    B6: { type: 'net', value: 'B6' },

    VBUS: { type: 'net', value: 'VBUS' },
    GND: { type: 'net', value: 'GND' },
    RST: { type: 'net', value: 'RST' },
    VCC: { type: 'net', value: 'VCC' },

    B7: { type: 'net', value: 'B7' },
    D5: { type: 'net', value: 'D5' },
    C7: { type: 'net', value: 'C7' },
    F1: { type: 'net', value: 'F1' },
    F0: { type: 'net', value: 'F0' },

  },
  body: p => {
    /* Putting the nets into an array so that it can be itterated through */
    const pin_nets = [
      [`${p.VBUS.str}`, `${p.VBUS.str}`],
      [`${p.D3.str}`, `${p.B0.str}`],
      [`${p.D2.str}`, `${p.GND.str}`],
      [`${p.GND.str}`, `${p.RST.str}`],
      [`${p.GND.str}`, `${p.VCC.str}`],
      [`${p.D1.str}`, `${p.F4.str}`],
      [`${p.D0.str}`, `${p.F5.str}`],
      [`${p.D4.str}`, `${p.F6.str}`],
      [`${p.C6.str}`, `${p.F7.str}`],
      [`${p.D7.str}`, `${p.B1.str}`],
      [`${p.E6.str}`, `${p.B3.str}`],
      [`${p.B4.str}`, `${p.B2.str}`],
      [`${p.B5.str}`, `${p.B6.str}`],
    ]

    /*These constants are the magic of this code, they allow us to adjust almost everything important aspect of the microcontroller.
    The reason this is helpfull is that if you don't want to use a Seeed Xiao you can easily adjust the paramiters to make a different microcontroller.
    
    top_left_pin: This is the position of the top left pin of the microcontroller.
    top_right_pin: This is the position of the top right pin of the microcontroller.
    pin_dist: The distance in between each pin horizontaly
    total_pin_num: The total number of pins the microcontroller has. This number must be divisable by two.
    pin_to_male_pad: The distance from the pin on the microcontroller to the male pad.
    pin_to_female_pad: The distance from the pin on te microcontroller to the female pad.
    pin_to_via: the distance from the pin on the microcontroller to the via.
    */
    const spacing = {
      top_left_pin: { x: -7.62, y: -16.51 },
      top_right_pin: { x: 7.62, y: -16.51 },
      pin_dist: 2.54,
      total_pin_num: 26, //Must be an even number
      pin_to_male_pad: 2,
      pin_to_female_pad: 2.845,
      pin_to_via: 4.358,
    }

    /*The other distances needed to make the traces work. This is basically just two points. 
    
    top_left      top_right
      ^              ^
      /``````````````\
     [] 0             O []
         \............../
          ^             ^
    bottom_left   bottom_right

    The number is the distance from the pin to the corner of the trace. */
    const trace_spacing = {
      top_left: { x: 3.6, y: .85 },
      top_right: { x: 5.2, y: .85 },
      bottom_left: { x: 5.2, y: .85 },
      bottom_right: { x: 3.6, y: .85 },
    }

    /*Generates the through holes on sides of the microcontroller*/
    const get_thru_hole = () => {
      let thru_hole = ''
      /* Starts at the top two microcontrollers and goes down. 
      It makes the nets of each pin internal if it suposed to be a reversable pin otherwise it takes from the pin_nets values.*/
      for (let i = 0; i < spacing.total_pin_num / 2; i++) {
        // Only place a pin hole for the top VCC if it reversavle
        if (i == 0) {
          thru_hole += p.reversable ? `(pad ${i} thru_hole oval (at ${spacing.top_left_pin.x}  ${spacing.top_left_pin.y + (i) * spacing.pin_dist}  ${p.rot})       (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) 
            ${pin_nets[i][0]})\n` : ``

          thru_hole += `(pad ${spacing.total_pin_num - 1 - i} thru_hole oval (at ${spacing.top_right_pin.x} ${spacing.top_right_pin.y + (i) * spacing.pin_dist} ${180 + p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${pin_nets[i][1]})\n`
          continue;
        }
        thru_hole += `(pad ${i}                             thru_hole oval (at ${spacing.top_left_pin.x}  ${spacing.top_left_pin.y + (i) * spacing.pin_dist}  ${p.rot})       (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.reversable && (i < p.reversable_pins) ? p.local_net(i).str : pin_nets[i][0]})\n`

        thru_hole += `(pad ${spacing.total_pin_num - 1 - i} thru_hole oval (at ${spacing.top_right_pin.x} ${spacing.top_right_pin.y + (i) * spacing.pin_dist} ${180 + p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.reversable && (i < p.reversable_pins) ? p.local_net(spacing.total_pin_num - 1 - i).str : pin_nets[i][1]})\n`
      }
      return thru_hole
    }

    /* Adds the bottom row of pins */
    const through_hole_bottom = `
      (pad 30  thru_hole oval  (at -5.08 13.97) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.Mask) ${p.B7.str})
      (pad 29  thru_hole oval  (at -2.54 13.97) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.Mask) ${p.D5.str})
      (pad 28  thru_hole oval  (at  0    13.97) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.Mask) ${p.C7.str})
      (pad 27  thru_hole oval  (at  2.54 13.97) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.Mask) ${p.F1.str})
      (pad 26  thru_hole oval  (at  5.08 13.97) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.Mask) ${p.F0.str})
`

    /*I made the male pad and female pads that I stole from infused-kim at https://nilnil.notion.site/Convert-Kicad-Footprints-to-Ergogen-8340ce87ad554c69af4e3f92bc9a0898
    into constants so that I didn't have to copy and paste them a million times in get_solder_pads. Changing these will change the shape of the pads in the reversable footprint.
    
          |`````\                 \```````|
    Male: |      >        Female:   >     |
          |...../                 /.......|
    */
    const male_pad = `
      (zone_connect 2)
      (options (clearance outline) (anchor rect))
      (primitives
        (gr_poly 
          (pts
            (xy -0.5 -0.625) 
            (xy -0.25 -0.625) 
            (xy 0.25 0) 
            (xy -0.25 0.625) 
            (xy -0.5 0.625)
          ) 
          (width 0) (fill yes))
        )
      )\n`
    const female_pad = `
      (zone_connect 2)
      (options (clearance outline) (anchor rect))
      (primitives
        (gr_poly 
          (pts
            (xy -0.65 -0.625) 
            (xy 0.5 -0.625) 
            (xy 0.5 0.625) 
            (xy -0.65 0.625) 
            (xy -0.15 0)
          ) 
          (width 0) (fill yes))
        )
      )\n`

    /*This generates all of the solder pads that make the reversable footprints possible.*/
    const get_solder_pads = () => {
      let solder_pads = ''

      /*It starts with making the first row then itterates down.
      Front means the front layer of the pcb while back means the back layer of the pcb.
      left and right mean the left and right side of the microcontroller*/
      for (let i = 0; ((i < (p.reversable_pins)) && (i < (spacing.total_pin_num / 2 - 1))); i++) {
        //Left VIAS
        solder_pads += `\t\t(pad ${i} thru_hole circle (at ${spacing.top_left_pin.x + spacing.pin_to_via} ${spacing.top_left_pin.y + (i) * spacing.pin_dist}) (size 0.8 0.8) (drill 0.4) (layers *.Cu *.Mask) ${pin_nets[i][0]})\n`

        //Left Front male
        solder_pads += `\t\t(pad ${i} smd custom (at ${spacing.top_left_pin.x + spacing.pin_to_male_pad} ${spacing.top_left_pin.y + (i) * spacing.pin_dist} ${p.rot}) (size 0.2 0.2) (layers F.Cu F.Mask) ${p.local_net(i).str}`
        solder_pads += male_pad

        //Left Front female
        solder_pads += `\t\t(pad ${spacing.total_pin_num - 1 - i} smd custom (at ${spacing.top_left_pin.x + spacing.pin_to_female_pad} ${spacing.top_left_pin.y + (i) * spacing.pin_dist} ${p.rot}) (size 0.2 0.2) (layers F.Cu F.Mask) ${pin_nets[i][1]}`
        solder_pads += female_pad

        //Left Back male
        solder_pads += `\t\t(pad ${i} smd custom (at ${spacing.top_left_pin.x + spacing.pin_to_male_pad} ${spacing.top_left_pin.y + (i) * spacing.pin_dist} ${p.rot}) (size 0.2 0.2) (layers B.Cu B.Mask) ${p.local_net(i).str}`
        solder_pads += male_pad

        //Left Back female
        solder_pads += `\t\t(pad ${i} smd custom (at ${spacing.top_left_pin.x + spacing.pin_to_female_pad} ${spacing.top_left_pin.y + (i) * spacing.pin_dist} ${p.rot}) (size 0.2 0.2) (layers B.Cu B.Mask) ${pin_nets[i][0]}`
        solder_pads += female_pad


        //Right VIAS
        solder_pads += `\t\t(pad ${spacing.total_pin_num - 1 - i} thru_hole circle (at ${spacing.top_right_pin.x - spacing.pin_to_via} ${spacing.top_right_pin.y + (i) * spacing.pin_dist}) (size 0.8 0.8) (drill 0.4) (layers *.Cu *.Mask) ${pin_nets[i][1]})\n`

        //Right Back male
        solder_pads += `\t\t(pad ${spacing.total_pin_num - 1 - i} smd custom (at ${spacing.top_right_pin.x - spacing.pin_to_male_pad} ${spacing.top_right_pin.y + (i) * spacing.pin_dist} ${180 + p.rot}) (size 0.2 0.2) (layers B.Cu B.Mask) ${p.local_net(spacing.total_pin_num - 1 - i).str}`
        solder_pads += male_pad

        //Right Back female
        solder_pads += `\t\t(pad ${spacing.total_pin_num - 1 - i} smd custom (at ${spacing.top_right_pin.x - spacing.pin_to_female_pad} ${spacing.top_right_pin.y + (i) * spacing.pin_dist} ${180 + p.rot}) (size 0.2 0.2) (layers B.Cu B.Mask) ${pin_nets[i][1]}`
        solder_pads += female_pad

        //Right Front female
        solder_pads += `\t\t(pad ${i} smd custom (at ${spacing.top_right_pin.x - spacing.pin_to_female_pad} ${spacing.top_right_pin.y + (i) * spacing.pin_dist} ${180 + p.rot}) (size 0.2 0.2) (layers F.Cu F.Mask) ${pin_nets[i][0]}`
        solder_pads += female_pad

        //Right Front male
        solder_pads += `\t\t(pad ${spacing.total_pin_num - 1 - i} smd custom (at ${spacing.top_right_pin.x - spacing.pin_to_male_pad} ${spacing.top_right_pin.y + (i) * spacing.pin_dist} ${180 + p.rot}) (size 0.2 0.2) (layers F.Cu F.Mask) ${p.local_net(spacing.total_pin_num - 1 - i).str}`
        solder_pads += male_pad
      }
      return solder_pads
    }

    /*I stole get_at_coordinates() and adjust_point() from infused-kim's guide at https://nilnil.notion.site/Convert-Kicad-Footprints-to-Ergogen-8340ce87ad554c69af4e3f92bc9a0898
    I have no idea how it works. I am pretty sure that it interfaces with the other ergogen code in fancy ways.
    I do know that get_at_coordinates() is a helper funciton for adjust_point*/
    const get_at_coordinates = () => {
      const pattern = /\(at (-?[\d\.]*) (-?[\d\.]*) (-?[\d\.]*)\)/;
      const matches = p.at.match(pattern);
      if (matches && matches.length == 4) {
        return [parseFloat(matches[1]), parseFloat(matches[2]), parseFloat(matches[3])];
      } else {
        return null;
      }
    }

    /*Call adjust_point if you want to make something move that is outisde of the main body of the footprint. Aka after the ')' in the return statement*/
    const adjust_point = (x, y) => {
      const at_l = get_at_coordinates();
      if (at_l == null) {
        throw new Error(
          `Could not get x and y coordinates from p.at: ${p.at}`
        );
      }
      const at_x = at_l[0];
      const at_y = at_l[1];
      const at_angle = at_l[2];
      const adj_x = at_x + x;
      const adj_y = at_y + y;

      const radians = (Math.PI / 180) * at_angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (adj_x - at_x)) + (sin * (adj_y - at_y)) + at_x,
        ny = (cos * (adj_y - at_y)) - (sin * (adj_x - at_x)) + at_y;

      const point_str = `${nx.toFixed(2)} ${ny.toFixed(2)}`;
      return point_str;
    }

    /*This generates traces that connect all the internal peices that should be connected*/
    const get_traces = () => {
      let traces = ``
      /*Starts by generating all of the traces for one row, then itterates down all of the pins.*/
      for (let i = 0; ((i < (p.reversable_pins)) && (i < (spacing.total_pin_num / 2 - 1))); i++) {
        /* Left pin to Right male pad F and B*/
        traces += `\t(segment (start ${adjust_point(spacing.top_left_pin.x + spacing.pin_to_male_pad, spacing.top_left_pin.y + i * spacing.pin_dist)}) (end ${adjust_point(spacing.top_left_pin.x, spacing.top_left_pin.y + i * spacing.pin_dist)}) (width 0.25) (layer "F.Cu"))`
        traces += `\t(segment (start ${adjust_point(spacing.top_left_pin.x + spacing.pin_to_male_pad, spacing.top_left_pin.y + i * spacing.pin_dist)}) (end ${adjust_point(spacing.top_left_pin.x, spacing.top_left_pin.y + i * spacing.pin_dist)}) (width 0.25) (layer "B.Cu"))`
        /* Right pin to Right male pad F and B*/
        traces += `\t(segment (start ${adjust_point(spacing.top_right_pin.x - spacing.pin_to_male_pad, spacing.top_right_pin.y + i * spacing.pin_dist)}) (end ${adjust_point(spacing.top_right_pin.x, spacing.top_right_pin.y + i * spacing.pin_dist)}) (width 0.25) (layer "F.Cu"))`
        traces += `\t(segment (start ${adjust_point(spacing.top_right_pin.x - spacing.pin_to_male_pad, spacing.top_right_pin.y + i * spacing.pin_dist)}) (end ${adjust_point(spacing.top_right_pin.x, spacing.top_right_pin.y + i * spacing.pin_dist)}) (width 0.25) (layer "B.Cu"))`

        /*Left female pad to right via F*/
        traces += `\t(segment (start ${adjust_point(spacing.top_left_pin.x + spacing.pin_to_female_pad, spacing.top_left_pin.y + i * spacing.pin_dist)}) (end ${adjust_point(spacing.top_left_pin.x + trace_spacing.top_left.x, spacing.top_left_pin.y - trace_spacing.top_left.y + i * spacing.pin_dist)}) (width 0.25) (layer "F.Cu"))`
        traces += `\t(segment (start ${adjust_point(spacing.top_left_pin.x + trace_spacing.top_left.x, spacing.top_left_pin.y - trace_spacing.top_left.y + i * spacing.pin_dist)}) (end ${adjust_point(spacing.top_right_pin.x - trace_spacing.top_right.x, spacing.top_right_pin.y - trace_spacing.top_right.y + i * spacing.pin_dist)}) (width 0.25) (layer "F.Cu"))`
        traces += `\t(segment (start ${adjust_point(spacing.top_right_pin.x - trace_spacing.top_right.x, spacing.top_right_pin.y - trace_spacing.top_right.y + i * spacing.pin_dist)}) (end ${adjust_point(spacing.top_right_pin.x - spacing.pin_to_via, spacing.top_right_pin.y + i * spacing.pin_dist)})  (width 0.25) (layer "F.Cu"))`

        /*Right female pad to left via F*/
        traces += `\t(segment (start ${adjust_point(spacing.top_right_pin.x - spacing.pin_to_female_pad, spacing.top_right_pin.y + i * spacing.pin_dist)})   (end ${adjust_point(spacing.top_right_pin.x - trace_spacing.bottom_right.x, spacing.top_right_pin.y + trace_spacing.bottom_right.y + i * spacing.pin_dist)})   (width 0.25) (layer "F.Cu"))`
        traces += `\t(segment (start ${adjust_point(spacing.top_right_pin.x - trace_spacing.bottom_right.x, spacing.top_right_pin.y + trace_spacing.bottom_right.y + i * spacing.pin_dist)})   (end ${adjust_point(spacing.top_left_pin.x + trace_spacing.bottom_left.x, spacing.top_left_pin.y + trace_spacing.bottom_left.y + i * spacing.pin_dist)}) (width 0.25) (layer "F.Cu"))`
        traces += `\t(segment (start ${adjust_point(spacing.top_left_pin.x + trace_spacing.bottom_left.x, spacing.top_left_pin.y + trace_spacing.bottom_left.y + i * spacing.pin_dist)}) (end ${adjust_point(spacing.top_left_pin.x + spacing.pin_to_via, spacing.top_left_pin.y + i * spacing.pin_dist)})  (width 0.25) (layer "F.Cu"))`

        /*Left female pad to left via B*/
        traces += `\t(segment (start ${adjust_point(spacing.top_left_pin.x + spacing.pin_to_female_pad, spacing.top_left_pin.y + i * spacing.pin_dist)}) (end ${adjust_point(spacing.top_left_pin.x + spacing.pin_to_via, spacing.top_left_pin.y + i * spacing.pin_dist)}) (width 0.25) (layer "B.Cu"))`

        /*Right female pad to right via B*/
        traces += `\t(segment (start ${adjust_point(spacing.top_right_pin.x - spacing.pin_to_female_pad, spacing.top_right_pin.y + i * spacing.pin_dist)}) (end ${adjust_point(spacing.top_right_pin.x - spacing.pin_to_via, spacing.top_right_pin.y + i * spacing.pin_dist)}) (width 0.25) (layer "B.Cu"))`
      }
      return traces
    }

    /* Adding lables on the front side of the pcb */
    const lable_txt = `
      ${'' /*Lettering on the silkscreen*/}
      (fp_text user "elite-c" (at 0 -20 ${p.rot}) (layer F.SilkS)
        (effects (font (size 1 1) (thickness 0.15)))
      )
      `

    /* Adds lables on the back side of the pcb */
    const reversable_lable_txt = `
      ${'' /*Lettering on the silkscreen*/}
      (fp_text user "elite-c" (at 0 -20 ${p.rot}) (layer B.SilkS)
        (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
      )
      `

    /* Instructions about which side the solder should be on. */
    const instructions = `
          (fp_text user "R. Side - Jumper Here" (at 0 18 ${p.rot}) (layer F.SilkS)
            (effects (font (size 1 1) (thickness 0.15)))
          )
          (fp_text user "L. Side - Jumper Here" (at 0 18 ${p.rot}) (layer B.SilkS)
            (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
          )
      `

    /* Code for hte reversable footprints */
    const standard = `
      (module Elite-C ${p.at /* parametric position */} (layer F.Cu) (tedit 5BDF551E)

      (fp_line (start  8.89  -15.24)  (end  8.89   15.24)  (layer F.SilkS) (width 0.381))
      (fp_line (start  8.89   15.24)  (end -8.89   15.24)  (layer F.SilkS) (width 0.381))
      (fp_line (start -8.89   15.24)  (end -8.89  -15.24)  (layer F.SilkS) (width 0.381))
      (fp_line (start  6.35  -15.24)  (end  6.35  -12.7)   (layer F.SilkS) (width 0.381))
      (fp_line (start  6.35  -12.7 )  (end  8.89  -12.7)   (layer F.SilkS) (width 0.381))
      (fp_line (start -8.89   15.24)  (end -8.89  -17.78)  (layer B.SilkS) (width 0.381))
      (fp_line (start  8.89   15.24)  (end -8.89   15.24)  (layer B.SilkS) (width 0.381))
      (fp_line (start  8.89  -17.78)  (end  8.89   15.24)  (layer B.SilkS) (width 0.381))
      (fp_line (start -8.89  -17.78)  (end  8.89  -17.78)  (layer B.SilkS) (width 0.381))
      (fp_line (start -8.89  -15.24)  (end -8.89  -17.78)  (layer F.SilkS) (width 0.381))
      (fp_line (start -8.89  -17.78)  (end  8.89  -17.78)  (layer F.SilkS) (width 0.381))
      (fp_line (start  8.89  -17.78)  (end  8.89  -15.24)  (layer F.SilkS) (width 0.381))
      (fp_line (start -3.556 -14.224) (end  3.81  -14.224) (layer Dwgs.User) (width 0.2))
      (fp_line (start  3.81  -14.224) (end  3.81  -19.304) (layer Dwgs.User) (width 0.2))
      (fp_line (start  3.81  -19.304) (end -3.556 -19.304) (layer Dwgs.User) (width 0.2))
      (fp_line (start -3.556 -19.304) (end -3.556 -14.224) (layer Dwgs.User) (width 0.2))
      (fp_line (start  6.35  -15.24)  (end  8.89  -15.24)  (layer B.SilkS) (width 0.381))
      (fp_line (start  6.35  -15.24)  (end  8.89  -15.24)  (layer F.SilkS) (width 0.381))

${'' /*Getting the through holes*/}
${get_thru_hole()}
${through_hole_bottom}
`

    /* The code for the reversable footprint */
    const reversable_txt = `
      (module elite-c ${p.at /* parametric position */} (layer F.Cu) (tedit 5BDF551E)
            
      
      (fp_line (start  8.89  -15.24)  (end  8.89   15.24)  (layer F.SilkS) (width 0.381))
      (fp_line (start  8.89   15.24)  (end -8.89   15.24)  (layer F.SilkS) (width 0.381))
      (fp_line (start -8.89   15.24)  (end -8.89  -15.24)  (layer F.SilkS) (width 0.381))
      (fp_line (start  6.35  -15.24)  (end  6.35  -12.7)   (layer F.SilkS) (width 0.381))
      (fp_line (start  6.35  -12.7 )  (end  8.89  -12.7)   (layer F.SilkS) (width 0.381))
      (fp_line (start -8.89   15.24)  (end -8.89  -17.78)  (layer B.SilkS) (width 0.381))
      (fp_line (start  8.89   15.24)  (end -8.89   15.24)  (layer B.SilkS) (width 0.381))
      (fp_line (start  8.89  -17.78)  (end  8.89   15.24)  (layer B.SilkS) (width 0.381))
      (fp_line (start -8.89  -17.78)  (end  8.89  -17.78)  (layer B.SilkS) (width 0.381))
      (fp_line (start -8.89  -15.24)  (end -8.89  -17.78)  (layer F.SilkS) (width 0.381))
      (fp_line (start -8.89  -17.78)  (end  8.89  -17.78)  (layer F.SilkS) (width 0.381))
      (fp_line (start  8.89  -17.78)  (end  8.89  -15.24)  (layer F.SilkS) (width 0.381))
      (fp_line (start -3.556 -14.224) (end  3.81  -14.224) (layer Dwgs.User) (width 0.2))
      (fp_line (start  3.81  -14.224) (end  3.81  -19.304) (layer Dwgs.User) (width 0.2))
      (fp_line (start  3.81  -19.304) (end -3.556 -19.304) (layer Dwgs.User) (width 0.2))
      (fp_line (start -3.556 -19.304) (end -3.556 -14.224) (layer Dwgs.User) (width 0.2))
      (fp_line (start  6.35  -15.24)  (end  8.89  -15.24)  (layer B.SilkS) (width 0.381))
      (fp_line (start  6.35  -15.24)  (end  8.89  -15.24)  (layer F.SilkS) (width 0.381))
    ${'' /*Getting the through holes*/}
    ${get_thru_hole()}
    ${through_hole_bottom}

    ${'' /*Getting the solder pads*/}
    ${get_solder_pads()}      

    ${'' /* Getting the lables */}
    ${p.label ? reversable_lable_txt : ''}

    ${'' /* Getting the instructions */}
    ${p.instructions ? instructions : ''}

      `

    return `
        ${p.reversable ? reversable_txt : standard}
        ${p.label ? lable_txt : ''}
				)
        ${p.traces ? (p.reversable ? get_traces() : '') : ''}
      `
  }
}

/*
Copyright (c) 2023 Marco Massarelli

SPDX-License-Identifier: MIT

To view a copy of this license, visit https://opensource.org/license/mit/

Author: @Virginia2244
*/
module.exports = {
  params: {
    reversable: { type: 'boolean', value: true },
    label: { type: 'boolean', value: true },
    instructions: { type: 'boolean', value: true },
    traces: { type: 'boolean', value: true },
    view: { type: 'boolean', value: true },

    P006: { type: 'net', value: 'P006' },
    P008: { type: 'net', value: 'P008' },
    P017: { type: 'net', value: 'P017' },
    P020: { type: 'net', value: 'P020' },
    P022: { type: 'net', value: 'P022' },
    P024: { type: 'net', value: 'P024' },
    P100: { type: 'net', value: 'P100' },
    P011: { type: 'net', value: 'P011' },
    P104: { type: 'net', value: 'P104' },
    P106: { type: 'net', value: 'P106' },

    P031: { type: 'net', value: 'P031' },
    P029: { type: 'net', value: 'P029' },
    P002: { type: 'net', value: 'P002' },
    P115: { type: 'net', value: 'P115' },
    P113: { type: 'net', value: 'P113' },
    P111: { type: 'net', value: 'P111' },
    P010: { type: 'net', value: 'P010' },
    P009: { type: 'net', value: 'P009' },

    BPOS: { type: 'net', value: 'BPOS' },
    BNEG: { type: 'net', value: 'BNEG' },
    RAW: { type: 'net', value: 'RAW' },
    GND: { type: 'net', value: 'GND' },
    RST: { type: 'net', value: 'RST' },
    VCC: { type: 'net', value: 'VCC' },

    P101: { type: 'net', value: 'P101' },
    P102: { type: 'net', value: 'P102' },
    P107: { type: 'net', value: 'P107' },




  },
  body: p => {
    /* Putting the nets into an array so that it can be itterated through */
    const pin_nets = [
      [`${p.BNEG.str}`, `${p.BPOS.str}`],
      [`${p.P006.str}`, `${p.RAW.str}`],
      [`${p.P008.str}`, `${p.GND.str}`],
      [`${p.GND.str}`, `${p.RST.str}`],
      [`${p.GND.str}`, `${p.VCC.str}`],
      [`${p.P017.str}`, `${p.P031.str}`],
      [`${p.P020.str}`, `${p.P029.str}`],
      [`${p.P022.str}`, `${p.P002.str}`],
      [`${p.P024.str}`, `${p.P115.str}`],
      [`${p.P100.str}`, `${p.P113.str}`],
      [`${p.P011.str}`, `${p.P111.str}`],
      [`${p.P104.str}`, `${p.P010.str}`],
      [`${p.P106.str}`, `${p.P009.str}`],
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
      top_left_pin: { x: -7.62, y: -15.24 },
      top_right_pin: { x: 7.62, y: -15.24 },
      pin_dist: 2.54,
      total_pin_num: 26, // Must be divisable by 2
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

    The number is the distance from the pin to the corner of the trace.
    */
    const trace_spacing = {
      top_left: { x: 3.6, y: .85 },
      top_right: { x: 5.2, y: .85 },
      bottom_left: { x: 5.2, y: .85 },
      bottom_right: { x: 3.6, y: .85 },
    }

    /*Generates all of the through holes on the microcontroller*/
    const get_thru_hole = () => {
      let thru_hole = ''
      /* Starts at the top two microcontrollers and goes down. 
      It makes the nets internal if it reversable and straight to the pin_nets if not.*/
      for (let i = 0; i < spacing.total_pin_num / 2; i++) {
        thru_hole += `(pad ${i}                             thru_hole oval (at ${spacing.top_left_pin.x}  ${spacing.top_left_pin.y + (i) * spacing.pin_dist}  ${p.rot})       (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.reversable ? p.local_net(i).str : pin_nets[i][0]})\n`
        thru_hole += `(pad ${spacing.total_pin_num - 1 - i} thru_hole oval (at ${spacing.top_right_pin.x} ${spacing.top_right_pin.y + (i) * spacing.pin_dist} ${180 + p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.reversable ? p.local_net(spacing.total_pin_num - 1 - i).str : pin_nets[i][1]})\n`
      }
      return thru_hole
    }

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
      for (let i = 0; i < (spacing.total_pin_num / 2); i++) {
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
      for (let i = 0; i < (spacing.total_pin_num / 2); i++) {
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
    (fp_text user "nice_nano" (at 0 -20 ${p.rot}) (layer F.SilkS)
      (effects (font (size 1 1) (thickness 0.15)))
    )
    `

    /* Adds lables on the back side of the pcb */
    const reversable_lable_txt = `
    ${'' /*Lettering on the silkscreen*/}
    (fp_text user "nice_nano" (at 0 -20 ${p.rot}) (layer B.SilkS)
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

    /* Solder pads for the nice!view */
    const view_solder_pads = `
    (pad 26 thru_hole oval (at -5.08  10.16  ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P101.str})
    (pad 27 thru_hole oval (at -2.54  10.16  ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P102.str})
    (pad 28 thru_hole oval (at  0     10.16  ${p.rot}) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${p.P107.str})
    `

    /* Code for hte reversable footprints */
    const standard = `
    (module nice_nano ${p.at /* parametric position */} (layer F.Cu) (tedit 64CF2E17)

    
    (fp_line (start 6.29 -11.43) (end 8.95 -11.43) (layer F.SilkS) (width 0.12))
    (fp_line (start 6.29 -14.03) (end 8.95 -14.03) (layer F.SilkS) (width 0.12))
    (fp_line (start 6.29 -14.03) (end 6.29 16.57) (layer F.SilkS) (width 0.12))
    (fp_line (start 6.29 16.57) (end 8.95 16.57) (layer F.SilkS) (width 0.12))
    (fp_line (start 8.95 -14.03) (end 8.95 16.57) (layer F.SilkS) (width 0.12))
    (fp_line (start 3.556 -18.034) (end 3.556 -16.51) (layer Dwgs.User) (width 0.15))
    (fp_line (start 8.89 16.51) (end 8.89 -14.03) (layer F.CrtYd) (width 0.15))
    (fp_line (start 8.89 -14.03) (end -8.89 -14.03) (layer F.CrtYd) (width 0.15))
    (fp_line (start -8.89 -14.03) (end -8.89 16.51) (layer F.CrtYd) (width 0.15))
    (fp_line (start -8.89 16.51) (end 8.89 16.51) (layer F.CrtYd) (width 0.15))
    (fp_line (start -3.81 -16.51) (end -3.81 -18.034) (layer Dwgs.User) (width 0.15))
    (fp_line (start -3.81 -18.034) (end 3.556 -18.034) (layer Dwgs.User) (width 0.15))
    (fp_line (start -8.95 -14.03) (end -6.29 -14.03) (layer F.SilkS) (width 0.12))
    (fp_line (start -8.95 -14.03) (end -8.95 16.57) (layer F.SilkS) (width 0.12))
    (fp_line (start -8.95 16.57) (end -6.29 16.57) (layer F.SilkS) (width 0.12))
    (fp_line (start -6.29 -14.03) (end -6.29 16.57) (layer F.SilkS) (width 0.12))
    (fp_line (start -8.89 -16.51) (end 8.89 -16.51) (layer F.Fab) (width 0.12))
    (fp_line (start -8.89 -16.51) (end -8.89 -14) (layer F.Fab) (width 0.12))
    (fp_line (start 8.89 -16.51) (end 8.89 -14) (layer F.Fab) (width 0.12))

${'' /*Getting the through holes*/}
${get_thru_hole()}

${''}
${p.view ? view_solder_pads : ''}

`

    /* The code for the reversable footprint */
    const reversable_txt = `
    (module nice_nano ${p.at /* parametric position */} (layer F.Cu) (tedit 64CF2E17)
          
    
    (fp_line (start 6.29 -11.43) (end 8.95 -11.43) (layer F.SilkS) (width 0.12))
    (fp_line (start -8.95 -11.43) (end -6.29 -11.43) (layer B.SilkS) (width 0.12))
    (fp_line (start 6.29 -14.03) (end 8.95 -14.03) (layer F.SilkS) (width 0.12))
    (fp_line (start 6.29 -14.03) (end 6.29 16.57) (layer F.SilkS) (width 0.12))
    (fp_line (start 6.29 16.57) (end 8.95 16.57) (layer F.SilkS) (width 0.12))
    (fp_line (start 8.95 -14.03) (end 8.95 16.57) (layer F.SilkS) (width 0.12))
    (fp_line (start 3.556 -18.034) (end 3.556 -16.51) (layer Dwgs.User) (width 0.15))
    (fp_line (start 8.89 16.51) (end 8.89 -14.03) (layer F.CrtYd) (width 0.15))
    (fp_line (start 8.89 -14.03) (end -8.89 -14.03) (layer F.CrtYd) (width 0.15))
    (fp_line (start -8.89 -14.03) (end -8.89 16.51) (layer F.CrtYd) (width 0.15))
    (fp_line (start -8.89 16.51) (end 8.89 16.51) (layer F.CrtYd) (width 0.15))
    (fp_line (start -3.81 -16.51) (end -3.81 -18.034) (layer Dwgs.User) (width 0.15))
    (fp_line (start -3.81 -18.034) (end 3.556 -18.034) (layer Dwgs.User) (width 0.15))
    (fp_line (start -8.95 -14.03) (end -6.29 -14.03) (layer F.SilkS) (width 0.12))
    (fp_line (start -8.95 -14.03) (end -8.95 16.57) (layer F.SilkS) (width 0.12))
    (fp_line (start -8.95 16.57) (end -6.29 16.57) (layer F.SilkS) (width 0.12))
    (fp_line (start -6.29 -14.03) (end -6.29 16.57) (layer F.SilkS) (width 0.12))
    (fp_line (start -6.29 -14.03) (end -8.95 -14.03) (layer B.SilkS) (width 0.12))
    (fp_line (start -6.29 -14.03) (end -6.29 16.57) (layer B.SilkS) (width 0.12))
    (fp_line (start -6.29 16.57) (end -8.95 16.57) (layer B.SilkS) (width 0.12))
    (fp_line (start -8.95 -14.03) (end -8.95 16.57) (layer B.SilkS) (width 0.12))
    (fp_line (start -8.89 16.51) (end -8.89 -14.03) (layer B.CrtYd) (width 0.15))
    (fp_line (start -8.89 -14.03) (end 8.89 -14.03) (layer B.CrtYd) (width 0.15))
    (fp_line (start 8.89 -14.03) (end 8.89 16.51) (layer B.CrtYd) (width 0.15))
    (fp_line (start 8.89 16.51) (end -8.89 16.51) (layer B.CrtYd) (width 0.15))
    (fp_line (start 8.95 -14.03) (end 6.29 -14.03) (layer B.SilkS) (width 0.12))
    (fp_line (start 8.95 -14.03) (end 8.95 16.57) (layer B.SilkS) (width 0.12))
    (fp_line (start 8.95 16.57) (end 6.29 16.57) (layer B.SilkS) (width 0.12))
    (fp_line (start 6.29 -14.03) (end 6.29 16.57) (layer B.SilkS) (width 0.12))
    (fp_line (start -8.89 -16.51) (end 8.89 -16.51) (layer F.Fab) (width 0.12))
    (fp_line (start -8.89 -16.51) (end -8.89 -14) (layer F.Fab) (width 0.12))
    (fp_line (start 8.89 -16.51) (end 8.89 -14) (layer F.Fab) (width 0.12))
    (fp_line (start -8.89 -16.5) (end -8.89 -13.99) (layer B.Fab) (width 0.12))
    (fp_line (start 8.89 -16.51) (end 8.89 -14) (layer B.Fab) (width 0.12))
    (fp_line (start -8.89 -16.51) (end 8.89 -16.51) (layer B.Fab) (width 0.12))

  ${'' /*Getting the through holes*/}
  ${get_thru_hole()}

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
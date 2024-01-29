// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: MIT
//
// To view a copy of this license, visit https://opensource.org/license/mit/
//
// Description:
//  A combined reversible footprint for either SSD1306 OLED display, nice!view display, or
//  both at the same time.
//
// Pinout and schematics for the nice!view:
//  https://nicekeyboards.com/docs/nice-view/pinout-schematic
//
// Params:
//    side: default is F for Front
//      the side on which to place the single-side footprint and designator, either F or B.
//    reversible: default is false
//      if true, the footprint will be placed on both sides so that the PCB can be
//      reversible.
//    include_traces: default is true
//      if true it will include traces that connect the jumper pads to the through-holes for
//      the display.
//    gnd_trace_width: default is 0.250mm
//      allows to override the GND trace width. Not recommended to go below 0.25mm (JLCPC
//      min is 0.127mm).
//    vcc_trace_width: default is 0.250mm
//      allows to override the VCC trace width. Not recommended to go below 0.25mm (JLCPC
//      min is 0.127mm).
//    signal_trace_width: default is 0.250mm
//      allows to override the trace width that connects the jumper pads to the MOSI / SDA,
//      SCK / SCL, and CS pins. Not recommended to go below 0.15mm (JLCPC min is 0.127mm).
//    display_type: default is 'both'
//      allows to chose what display to support in the footprint, and it can either be 'both'
//      to have pins for both the nice!view or SSD1306 OLED displays, 'nice_view' to have the
//      pins for the nice!view display only, or 'ssd1306' for the SSD1306 OLED display only.

module.exports = {
  params: {
    designator: 'DISP',
    side: 'F',
    reversible: false,
    include_traces_vias: true, // Only valid if reversible is True
    gnd_trace_width: 0.25,
    vcc_trace_width: 0.25,
    signal_trace_width: 0.25,
    display_type: 'both', // Any of ssd1306, nice_view, both
    P1: {type: 'net', value: 'GND'},
    P2: {type: 'net', value: 'VCC'},
    P3: {type: 'net', value: 'SCL'},  // SCK / SCL
    P4: {type: 'net', value: 'SDA'},  // MOSI / SDA
    P5: {type: 'net', value: 'CS'},
  },
  body: p => {

    const get_at_coordinates = () => {
        const pattern = /\(at (-?[\d\.]*) (-?[\d\.]*) (-?[\d\.]*)\)/;
        const matches = p.at.match(pattern);
        if (matches && matches.length == 4) {
            return [parseFloat(matches[1]), parseFloat(matches[2]), parseFloat(matches[3])];
        } else {
            return null;
        }
    }

    const adjust_point = (x, y) => {
        const at_l = get_at_coordinates();
        if(at_l == null) {
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

        const point_str = `${nx.toFixed(3)} ${ny.toFixed(3)}`;
        return point_str;
    }
    
    let dst_nets = [
      p.P1.str, // GND
      p.P2.str, // VCC
      p.P3.str, // SCL / SCK
      p.P4.str, // SDA / MOSI
      p.P5.str, // CS
    ];
    local_nets = [
      p.local_net("1").str,
      p.local_net("2").str,
      p.local_net("3").str,
      p.local_net("4").str,
      p.local_net("5").str,
    ];

    let socket_nets = dst_nets;
    if(p.reversible) {
      socket_nets = local_nets;
    } else if(p.side == 'B') {
      socket_nets = dst_nets.slice().reverse();
    }
    
    let jumpers_front_top = dst_nets;
    let jumpers_front_bottom = local_nets;
    let jumpers_back_top = dst_nets;
    let jumpers_back_bottom = local_nets.slice().reverse();
    
    const standard_opening = `
    (module "ceoloide:display_ssd1306_nice_view" (layer ${p.side}.Cu) (tedit 5B24D78E)
      ${p.at /* parametric position */}
      (descr "Solder-jumper reversible footprint for both nice!view (SPI) and SSD1306 (I2C) displays")
      (fp_text reference "${p.ref}" (at 0 5.6 ${p.rot}) (layer ${p.side}.SilkS) ${p.ref_hide}
        (effects (font (size 1 1) (thickness 0.15)))
      )
    `
    const oled_standard = `
      (fp_line (start -5.99 -34.338) (end 6.01 -34.338)
        (width 0.12) (layer "Dwgs.User"))
      (fp_line (start -5.99 -32.088) (end 6.01 -32.088)
        (width 0.12) (layer "Dwgs.User"))
      (fp_line (start -5.99 -2.088) (end 6.01 -2.088)
        (width 0.12) (layer "Dwgs.User"))
      (fp_line (start -5.99 3.662) (end -5.99 -34.338)
        (width 0.12) (layer "Dwgs.User"))
      (fp_line (start -5.99 3.662) (end 6.01 3.662)
        (width 0.12) (layer "Dwgs.User"))
      (fp_line (start -3.77 -3.398) (end -3.77 -25.778)
        (width 0.12) (layer "Dwgs.User"))
      (fp_line (start -3.77 -3.398) (end 1.75 -3.398)
        (width 0.12) (layer "Dwgs.User"))
      (fp_line (start 1.75 -25.778) (end -3.77 -25.778)
        (width 0.12) (layer "Dwgs.User"))
      (fp_line (start 1.75 -3.398) (end 1.75 -25.778)
        (width 0.12) (layer "Dwgs.User"))
      (fp_line (start 6.01 -34.338) (end 6.01 3.662)
        (width 0.12) (layer "Dwgs.User"))
    `
    const oled_front = `
      (fp_text user "VCC" (at 1.27 -4.138 ${90 + p.rot}) (layer "F.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right))
      )
      (fp_text user "SCL" (at -1.27 -4.064 ${90 + p.rot}) (layer "F.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right))
      )
      (fp_text user "SDA" (at -3.81 -4.064 ${90 + p.rot}) (layer "F.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right))
      )
      (fp_text user "GND" (at 3.81 -4.238 ${90 + p.rot}) (layer "F.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right))
      )
      (pad 4 thru_hole circle (at -3.81 2.062 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${p.P4.str})
      (pad 3 thru_hole circle (at -1.27 2.062 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${p.P3.str})
      (pad 2 thru_hole circle (at 1.27 2.062 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${p.P2.str})
      (pad 1 thru_hole circle (at 3.81 2.062 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${p.P1.str})
    `
    const oled_back = `
      (fp_text user "SCL" (at 1.2 -1.37 ${270 + p.rot}) (layer "B.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right mirror))
      )
      (fp_text user "SDA" (at 3.74 -1.26 ${270 + p.rot}) (layer "B.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right mirror))
      )
      (fp_text user "VCC" (at -1.34 -1.37 ${270 + p.rot}) (layer "B.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right mirror))
      )
      (fp_text user "GND" (at -3.9 -1.26 ${270 + p.rot}) (layer "B.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right mirror))
      )
      (pad 1 thru_hole circle (at -3.81 2.062 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${p.P1.str})
      (pad 2 thru_hole circle (at -1.27 2.062 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${p.P2.str})
      (pad 3 thru_hole circle (at 1.27 2.062 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${p.P3.str})
      (pad 4 thru_hole circle (at 3.81 2.062 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${p.P4.str})
    `
    const oled_reversible_pads = `
      (pad 4 thru_hole circle (at -3.81 2.062 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${socket_nets[3]})
      (pad 3 thru_hole circle (at -1.27 2.062 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${socket_nets[2]})
      (pad 2 thru_hole circle (at 1.27 2.062 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${socket_nets[1]})
      (pad 1 thru_hole circle (at 3.81 2.062 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${socket_nets[0]})
    `
    const oled_reversible_solder_bridges = `
      (fp_text user "VCC" (at 1.27 -4.138 ${90 + p.rot}) (layer "F.SilkS")
        (effects (font (size 1 1) (thickness 0.15)) (justify right))
      )
      (fp_text user "SCL" (at -1.27 -4.064 ${90 + p.rot}) (layer "F.SilkS")
        (effects (font (size 1 1) (thickness 0.15)) (justify right))
      )
      (fp_text user "SDA" (at -3.81 -4.064 ${90 + p.rot}) (layer "F.SilkS")
        (effects (font (size 1 1) (thickness 0.15)) (justify right))
      )
      (fp_text user "GND" (at 3.81 -4.238 ${90 + p.rot}) (layer "F.SilkS")
        (effects (font (size 1 1) (thickness 0.15)) (justify right))
      )
      (fp_text user "SCL" (at 1.2 -1.37 ${270 + p.rot}) (layer "B.SilkS")
        (effects (font (size 1 1) (thickness 0.15)) (justify right mirror))
      )
      (fp_text user "SDA" (at 3.74 -1.26 ${270 + p.rot}) (layer "B.SilkS")
        (effects (font (size 1 1) (thickness 0.15)) (justify right mirror))
      )
      (fp_text user "VCC" (at -1.34 -1.37 ${270 + p.rot}) (layer "B.SilkS")
        (effects (font (size 1 1) (thickness 0.15)) (justify right mirror))
      )
      (fp_text user "GND" (at -3.9 -1.26 ${270 + p.rot}) (layer "B.SilkS")
        (effects (font (size 1 1) (thickness 0.15)) (justify right mirror))
      )
      (pad 11 smd custom (at -3.81 0.254 ${180 + p.rot}) (size 0.1 0.1) (layers "F.Cu" "F.Mask")
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 -0.4)
              (xy -0.6 -0.4)
              (xy -0.6 -0.2)
              (xy 0 0.4)
              (xy 0.6 -0.2)
            )
            (width 0))
        ) ${jumpers_front_bottom[3]})
      (pad 21 smd custom (at -3.81 0.254 ${180 + p.rot}) (size 0.1 0.1) (layers "B.Cu" "B.Mask")
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 -0.4)
              (xy -0.6 -0.4)
              (xy -0.6 -0.2)
              (xy 0 0.4)
              (xy 0.6 -0.2)
            )
            (width 0))
        ) ${jumpers_back_bottom[1]})
      (pad 12 smd custom (at -1.27 0.254 ${180 + p.rot}) (size 0.1 0.1) (layers "F.Cu" "F.Mask")
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 -0.4)
              (xy -0.6 -0.4)
              (xy -0.6 -0.2)
              (xy 0 0.4)
              (xy 0.6 -0.2)
            )
            (width 0))
        ) ${jumpers_front_bottom[2]})
      (pad 22 smd custom (at -1.27 0.254 ${180 + p.rot}) (size 0.1 0.1) (layers "B.Cu" "B.Mask")
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 -0.4)
              (xy -0.6 -0.4)
              (xy -0.6 -0.2)
              (xy 0 0.4)
              (xy 0.6 -0.2)
            )
            (width 0))
        ) ${jumpers_back_bottom[2]})
      (pad 13 smd custom (at 1.27 0.254 ${180 + p.rot}) (size 0.1 0.1) (layers "F.Cu" "F.Mask")
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 -0.4)
              (xy -0.6 -0.4)
              (xy -0.6 -0.2)
              (xy 0 0.4)
              (xy 0.6 -0.2)
            )
            (width 0))
        ) ${jumpers_front_bottom[1]})
      (pad 23 smd custom (at 1.27 0.254 ${180 + p.rot}) (size 0.1 0.1) (layers "B.Cu" "B.Mask")
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 -0.4)
              (xy -0.6 -0.4)
              (xy -0.6 -0.2)
              (xy 0 0.4)
              (xy 0.6 -0.2)
            )
            (width 0))
        ) ${jumpers_back_bottom[3]})
      (pad 14 smd custom (at 3.81 0.254 ${180 + p.rot}) (size 0.1 0.1) (layers "F.Cu" "F.Mask")
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 -0.4)
              (xy -0.6 -0.4)
              (xy -0.6 -0.2)
              (xy 0 0.4)
              (xy 0.6 -0.2)
            )
            (width 0))
        ) ${jumpers_front_bottom[0]})
      (pad 24 smd custom (at 3.81 0.254 ${180 + p.rot}) (size 0.1 0.1) (layers "B.Cu" "B.Mask")
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 -0.4)
              (xy -0.6 -0.4)
              (xy -0.6 -0.2)
              (xy 0 0.4)
              (xy 0.6 -0.2)
            )
            (width 0))
        ) ${jumpers_back_bottom[4]})
      (pad 31 smd custom (at 3.81 -0.762 ${180 + p.rot}) (size 1.2 0.5) (layers "F.Cu" "F.Mask") ${p.P1.str}
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 0)
              (xy -0.6 0)
              (xy -0.6 -1)
              (xy 0 -0.4)
              (xy 0.6 -1)
            )
            (width 0))
        ))
      (pad 41 smd custom (at -3.81 -0.762 ${180 + p.rot}) (size 1.2 0.5) (layers "B.Cu" "B.Mask") ${p.P1.str}
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 0)
              (xy -0.6 0)
              (xy -0.6 -1)
              (xy 0 -0.4)
              (xy 0.6 -1)
            )
            (width 0))
        ))
      (pad 32 smd custom (at 1.27 -0.762 ${180 + p.rot}) (size 1.2 0.5) (layers "F.Cu" "F.Mask") ${p.P2.str}
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 0)
              (xy -0.6 0)
              (xy -0.6 -1)
              (xy 0 -0.4)
              (xy 0.6 -1)
            )
            (width 0))
        ))
      (pad 42 smd custom (at -1.27 -0.762 ${180 + p.rot}) (size 1.2 0.5) (layers "B.Cu" "B.Mask") ${p.P2.str}
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 0)
              (xy -0.6 0)
              (xy -0.6 -1)
              (xy 0 -0.4)
              (xy 0.6 -1)
            )
            (width 0))
        ))
      (pad 33 smd custom (at -1.27 -0.762 ${180 + p.rot}) (size 1.2 0.5) (layers "F.Cu" "F.Mask") ${p.P3.str}
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 0)
              (xy -0.6 0)
              (xy -0.6 -1)
              (xy 0 -0.4)
              (xy 0.6 -1)
            )
            (width 0))
        ))
      (pad 43 smd custom (at 1.27 -0.762 ${180 + p.rot}) (size 1.2 0.5) (layers "B.Cu" "B.Mask") ${p.P3.str}
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 0)
              (xy -0.6 0)
              (xy -0.6 -1)
              (xy 0 -0.4)
              (xy 0.6 -1)
            )
            (width 0))
        ))
      (pad 34 smd custom (at -3.81 -0.762 ${180 + p.rot}) (size 1.2 0.5) (layers "F.Cu" "F.Mask") ${p.P4.str}
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 0)
              (xy -0.6 0)
              (xy -0.6 -1)
              (xy 0 -0.4)
              (xy 0.6 -1)
            )
            (width 0))
        ))
      (pad 44 smd custom (at 3.81 -0.762 ${180 + p.rot}) (size 1.2 0.5) (layers "B.Cu" "B.Mask") ${p.P4.str}
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 0)
              (xy -0.6 0)
              (xy -0.6 -1)
              (xy 0 -0.4)
              (xy 0.6 -1)
            )
            (width 0))
        ))
    `
    const nice_view_standard = `
    `
    const nice_view_front = `
      (fp_text user "GND" (at 2.54 -6.24 ${90 + p.rot}) (layer "F.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right))
      )
      (fp_text user "MOSI/SDA" (at -5.1 -10.64 ${90 + p.rot}) (layer "F.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right))
      )
      (fp_text user "VCC" (at 0 -6.14 ${90 + p.rot}) (layer "F.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right))
      )
      (fp_text user "CS" (at 5.1 -5.14 ${90 + p.rot}) (layer "F.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right))
      )
      (fp_text user "SCK/SCL" (at -2.54 -9.94 ${90 + p.rot}) (layer "F.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right))
      )
      (pad 4 thru_hole circle (at -5.08 0 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${p.P4.str})
      (pad 3 thru_hole circle (at -2.54 0 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${p.P3.str})
      (pad 2 thru_hole circle (at 0 0 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${p.P2.str})
      (pad 1 thru_hole circle (at 2.54 0 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${p.P1.str})
      (pad 5 thru_hole circle (at 5.08 0 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${p.P5.str})
    `
    const nice_view_back = `
      (fp_text user "CS" (at -5.17 -5.14 ${-90 + p.rot}) (layer "B.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right mirror))
      )
      (fp_text user "MOSI/SDA" (at 5.03 -10.64 ${-90 + p.rot}) (layer "B.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right mirror))
      )
      (fp_text user "VCC" (at -0.07 -6.14 ${-90 + p.rot}) (layer "B.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right mirror))
      )
      (fp_text user "SCK/SCL" (at 2.47 -9.94 ${-90 + p.rot}) (layer "B.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right mirror))
      )
      (fp_text user "GND" (at -2.61 -6.24 ${-90 + p.rot}) (layer "B.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right mirror))
      )
      (pad 5 thru_hole circle (at -5.08 0 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${p.P5.str})
      (pad 1 thru_hole circle (at -2.54 0 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${p.P1.str})
      (pad 2 thru_hole circle (at 0 0 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${p.P2.str})
      (pad 3 thru_hole circle (at 2.54 0 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${p.P3.str})
      (pad 4 thru_hole circle (at 5.08 0 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask") ${p.P4.str})
    `
    const nice_view_reversible = `
      (fp_text user "CS" (at -5.17 -5.14 ${-90 + p.rot}) (layer "B.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right mirror))
      )
      (fp_text user "MOSI/SDA" (at 5.03 -10.64 ${-90 + p.rot}) (layer "B.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right mirror))
      )
      (fp_text user "VCC" (at -0.07 -6.14 ${-90 + p.rot}) (layer "B.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right mirror))
      )
      (fp_text user "SCK/SCL" (at 2.47 -9.94 ${-90 + p.rot}) (layer "B.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right mirror))
      )
      (fp_text user "GND" (at -2.61 -6.24 ${-90 + p.rot}) (layer "B.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right mirror))
      )
      (fp_text user "GND" (at 2.54 -6.24 ${90 + p.rot}) (layer "F.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right))
      )
      (fp_text user "MOSI/SDA" (at -5.1 -10.64 ${90 + p.rot}) (layer "F.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right))
      )
      (fp_text user "VCC" (at 0 -6.14 ${90 + p.rot}) (layer "F.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right))
      )
      (fp_text user "CS" (at 5.1 -5.14 ${90 + p.rot}) (layer "F.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right))
      )
      (fp_text user "SCK/SCL" (at -2.54 -9.94 ${90 + p.rot}) (layer "F.SilkS")
          (effects (font (size 1 1) (thickness 0.15)) (justify right))
      )
      (fp_line (start -5.08 -1.748) (end -5.08 -0.8763)
        (width 0.2) (layer "F.Cu"))
      (fp_line (start -2.54 -1.748) (end -2.54 -0.8763)
        (width 0.2) (layer "F.Cu"))
      (fp_line (start 0 -1.748) (end 0 -0.8763)
        (width 0.2) (layer "F.Cu"))
      (fp_line (start 2.54 -1.748) (end 2.54 -0.8763)
        (width 0.2) (layer "F.Cu"))
      (fp_line (start 5.08 -1.748) (end 5.08 -0.8763)
        (width 0.2) (layer "F.Cu"))
      (fp_line (start -5.08 -1.748) (end -5.08 -0.8763)
        (width 0.2) (layer "B.Cu"))
      (fp_line (start -2.54 -1.748) (end -2.54 -0.8763)
        (width 0.2) (layer "B.Cu"))
      (fp_line (start 0 -1.748) (end 0 -0.8763)
        (width 0.2) (layer "B.Cu"))
      (fp_line (start 2.54 -1.748) (end 2.54 -0.8763)
        (width 0.2) (layer "B.Cu"))
      (fp_line (start 5.08 -1.748) (end 5.08 -0.8763)
        (width 0.2) (layer "B.Cu"))
      (pad "" smd custom (at -5.08 -1.748 ${180 + p.rot}) (size 0.1 0.1) (layers "F.Cu" "F.Mask")
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 -0.4)
              (xy -0.6 -0.4)
              (xy -0.6 -0.2)
              (xy 0 0.4)
              (xy 0.6 -0.2)
            )
            (width 0))
        ))
      (pad "" smd custom (at -5.08 -1.748 ${180 + p.rot}) (size 0.1 0.1) (layers "B.Cu" "B.Mask")
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 -0.4)
              (xy -0.6 -0.4)
              (xy -0.6 -0.2)
              (xy 0 0.4)
              (xy 0.6 -0.2)
            )
            (width 0))
        ))
      (pad "" thru_hole circle (at -5.08 0 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask"))
      (pad "" smd custom (at -2.54 -1.748 ${180 + p.rot}) (size 0.1 0.1) (layers "F.Cu" "F.Mask")
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 -0.4)
              (xy -0.6 -0.4)
              (xy -0.6 -0.2)
              (xy 0 0.4)
              (xy 0.6 -0.2)
            )
            (width 0))
        ))
      (pad "" smd custom (at -2.54 -1.748 ${180 + p.rot}) (size 0.1 0.1) (layers "B.Cu" "B.Mask")
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 -0.4)
              (xy -0.6 -0.4)
              (xy -0.6 -0.2)
              (xy 0 0.4)
              (xy 0.6 -0.2)
            )
            (width 0))
        ))
      (pad "" thru_hole circle (at -2.54 0 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask"))
      (pad "" smd custom (at 0 -1.748 ${180 + p.rot}) (size 0.1 0.1) (layers "F.Cu" "F.Mask")
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 -0.4)
              (xy -0.6 -0.4)
              (xy -0.6 -0.2)
              (xy 0 0.4)
              (xy 0.6 -0.2)
            )
            (width 0))
        ))
      (pad "" smd custom (at 0 -1.748 ${180 + p.rot}) (size 0.1 0.1) (layers "B.Cu" "B.Mask")
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 -0.4)
              (xy -0.6 -0.4)
              (xy -0.6 -0.2)
              (xy 0 0.4)
              (xy 0.6 -0.2)
            )
            (width 0))
        ))
      (pad "" thru_hole circle (at 0 0 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask"))
      (pad "" smd custom (at 2.54 -1.748 ${180 + p.rot}) (size 0.1 0.1) (layers "F.Cu" "F.Mask")
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 -0.4)
              (xy -0.6 -0.4)
              (xy -0.6 -0.2)
              (xy 0 0.4)
              (xy 0.6 -0.2)
            )
            (width 0))
        ))
      (pad "" smd custom (at 2.54 -1.748 ${180 + p.rot}) (size 0.1 0.1) (layers "B.Cu" "B.Mask")
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 -0.4)
              (xy -0.6 -0.4)
              (xy -0.6 -0.2)
              (xy 0 0.4)
              (xy 0.6 -0.2)
            )
            (width 0))
        ))
      (pad "" thru_hole circle (at 2.54 0 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask"))
      (pad "" smd custom (at 5.08 -1.748 ${180 + p.rot}) (size 0.1 0.1) (layers "F.Cu" "F.Mask")
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 -0.4)
              (xy -0.6 -0.4)
              (xy -0.6 -0.2)
              (xy 0 0.4)
              (xy 0.6 -0.2)
            )
            (width 0))
        ))
      (pad "" smd custom (at 5.08 -1.748 ${180 + p.rot}) (size 0.1 0.1) (layers "B.Cu" "B.Mask")
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 -0.4)
              (xy -0.6 -0.4)
              (xy -0.6 -0.2)
              (xy 0 0.4)
              (xy 0.6 -0.2)
            )
            (width 0))
        ))
      (pad "" thru_hole circle (at 5.08 0 ${p.rot}) (size 1.7526 1.7526) (drill 1.0922) (layers "*.Cu" "*.Mask"))
      (pad 5 smd custom (at -5.08 -2.764 ${180 + p.rot}) (size 1.2 0.5) (layers "B.Cu" "B.Mask") ${p.P5.str}
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 0)
              (xy -0.6 0)
              (xy -0.6 -1)
              (xy 0 -0.4)
              (xy 0.6 -1)
            )
            (width 0))
        ))
      (pad 1 smd custom (at 2.54 -2.764 ${180 + p.rot}) (size 1.2 0.5) (layers "F.Cu" "F.Mask") ${p.P1.str}
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 0)
              (xy -0.6 0)
              (xy -0.6 -1)
              (xy 0 -0.4)
              (xy 0.6 -1)
            )
            (width 0))
        ))
      (pad 1 smd custom (at -2.54 -2.764 ${180 + p.rot}) (size 1.2 0.5) (layers "B.Cu" "B.Mask") ${p.P1.str}
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 0)
              (xy -0.6 0)
              (xy -0.6 -1)
              (xy 0 -0.4)
              (xy 0.6 -1)
            )
            (width 0))
        ))
      (pad 2 smd custom (at 0 -2.764 ${180 + p.rot}) (size 1.2 0.5) (layers "F.Cu" "F.Mask") ${p.P2.str}
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 0)
              (xy -0.6 0)
              (xy -0.6 -1)
              (xy 0 -0.4)
              (xy 0.6 -1)
            )
            (width 0))
        ))
      (pad 3 smd custom (at -2.54 -2.764 ${180 + p.rot}) (size 1.2 0.5) (layers "F.Cu" "F.Mask") ${p.P3.str}
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 0)
              (xy -0.6 0)
              (xy -0.6 -1)
              (xy 0 -0.4)
              (xy 0.6 -1)
            )
            (width 0))
        ))
      (pad 2 smd custom (at 0 -2.764 ${180 + p.rot}) (size 1.2 0.5) (layers "B.Cu" "B.Mask") ${p.P2.str}
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 0)
              (xy -0.6 0)
              (xy -0.6 -1)
              (xy 0 -0.4)
              (xy 0.6 -1)
            )
            (width 0))
        ))
      (pad 4 smd custom (at -5.08 -2.764 ${180 + p.rot}) (size 1.2 0.5) (layers "F.Cu" "F.Mask") ${p.P4.str}
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 0)
              (xy -0.6 0)
              (xy -0.6 -1)
              (xy 0 -0.4)
              (xy 0.6 -1)
            )
            (width 0))
        ))
      (pad 3 smd custom (at 2.54 -2.764 ${180 + p.rot}) (size 1.2 0.5) (layers "B.Cu" "B.Mask") ${p.P3.str}
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 0)
              (xy -0.6 0)
              (xy -0.6 -1)
              (xy 0 -0.4)
              (xy 0.6 -1)
            )
            (width 0))
        ))
      (pad 4 smd custom (at 5.08 -2.764 ${180 + p.rot}) (size 1.2 0.5) (layers "B.Cu" "B.Mask") ${p.P4.str}
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 0)
              (xy -0.6 0)
              (xy -0.6 -1)
              (xy 0 -0.4)
              (xy 0.6 -1)
            )
            (width 0))
        ))
      (pad 5 smd custom (at 5.08 -2.764 ${180 + p.rot}) (size 1.2 0.5) (layers "F.Cu" "F.Mask") ${p.P5.str}
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly
            (pts
              (xy 0.6 0)
              (xy -0.6 0)
              (xy -0.6 -1)
              (xy 0 -0.4)
              (xy 0.6 -1)
            )
            (width 0))
        ))
    `
    const both_connections = `
      (fp_line (start -5.08 -1.748) (end -5.08 -0.8763)
        (width 0.2) (layer "F.Cu"))
      (fp_line (start -5.08 -1.748) (end -3.7846 -0.4526)
        (width 0.2) (layer "F.Cu"))
      (fp_line (start -3.7846 -0.4526) (end -3.7846 1.1857)
        (width 0.2) (layer "F.Cu"))
      (fp_line (start -2.54 -1.748) (end -2.54 -0.8763)
        (width 0.2) (layer "F.Cu"))
      (fp_line (start -2.54 -1.748) (end -1.2446 -0.4526)
        (width 0.2) (layer "F.Cu"))
      (fp_line (start -1.2446 -0.4526) (end -1.2446 1.1857)
        (width 0.2) (layer "F.Cu"))
      (fp_line (start 0 -1.748) (end 0 -0.8763)
        (width 0.2) (layer "F.Cu"))
      (fp_line (start 0 -1.748) (end 1.2954 -0.4526)
        (width 0.2) (layer "F.Cu"))
      (fp_line (start 1.2954 -0.4526) (end 1.2954 1.1857)
        (width 0.2) (layer "F.Cu"))
      (fp_line (start 2.54 -1.748) (end 2.54 -0.8763)
        (width 0.2) (layer "F.Cu"))
      (fp_line (start 2.54 -1.748) (end 3.8354 -0.4526)
        (width 0.2) (layer "F.Cu"))
      (fp_line (start 3.8354 -0.4526) (end 3.8354 1.1857)
        (width 0.2) (layer "F.Cu"))
      (fp_line (start 5.08 -1.748) (end 5.08 -0.8763)
        (width 0.2) (layer "F.Cu"))
      (fp_line (start -5.08 -1.748) (end -5.08 -0.8763)
        (width 0.2) (layer "B.Cu"))
      (fp_line (start -3.7846 -0.4526) (end -3.7846 1.1857)
        (width 0.2) (layer "B.Cu"))
      (fp_line (start -3.7846 -0.4526) (end -2.4892 -1.748)
        (width 0.2) (layer "B.Cu"))
      (fp_line (start -2.54 -1.748) (end -2.54 -0.8763)
        (width 0.2) (layer "B.Cu"))
      (fp_line (start -1.2446 -0.4526) (end -1.2446 1.1857)
        (width 0.2) (layer "B.Cu"))
      (fp_line (start -1.2446 -0.4526) (end 0.0508 -1.748)
        (width 0.2) (layer "B.Cu"))
      (fp_line (start 0 -1.748) (end 0 -0.8763)
        (width 0.2) (layer "B.Cu"))
      (fp_line (start 1.2954 -0.4526) (end 1.2954 1.1857)
        (width 0.2) (layer "B.Cu"))
      (fp_line (start 1.2954 -0.4526) (end 2.5908 -1.748)
        (width 0.2) (layer "B.Cu"))
      (fp_line (start 2.54 -1.748) (end 2.54 -0.8763)
        (width 0.2) (layer "B.Cu"))
      (fp_line (start 3.8354 -0.4526) (end 3.8354 1.1857)
        (width 0.2) (layer "B.Cu"))
      (fp_line (start 3.8354 -0.4526) (end 5.1308 -1.748)
        (width 0.2) (layer "B.Cu"))
      (fp_line (start 5.08 -1.748) (end 5.08 -0.8763)
        (width 0.2) (layer "B.Cu"))
    `
    const standard_closing = `
    )
    `

    const oled_reversible_traces = ` 
    (segment (start ${ adjust_point(-3.81, 0.256)}) (end ${ adjust_point(-3.81, 2.066)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${p.local_net("4").index}))
    (segment (start ${ adjust_point(-1.27, 0.256)}) (end ${ adjust_point(-1.27, 2.066)}) (width ${p.signal_trace_width}) (layer "F.Cu") (net ${p.local_net("3").index}))
    (segment (start ${ adjust_point(1.27, 0.256)}) (end ${ adjust_point(1.27, 2.066)}) (width ${p.vcc_trace_width}) (layer "F.Cu") (net ${p.local_net("2").index}))
    (segment (start ${ adjust_point(3.81, 0.256)}) (end ${ adjust_point(3.81, 2.066)}) (width ${p.gnd_trace_width}) (layer "F.Cu") (net ${p.local_net("1").index}))
    (segment (start ${ adjust_point(-3.81, 0.256)}) (end ${ adjust_point(-3.81, 2.066)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${p.local_net("4").index}))
    (segment (start ${ adjust_point(-1.27, 0.256)}) (end ${ adjust_point(-1.27, 2.066)}) (width ${p.signal_trace_width}) (layer "B.Cu") (net ${p.local_net("3").index}))
    (segment (start ${ adjust_point(1.27, 0.256)}) (end ${ adjust_point(1.27, 2.066)}) (width ${p.vcc_trace_width}) (layer "B.Cu") (net ${p.local_net("2").index}))
    (segment (start ${ adjust_point(3.81, 0.256)}) (end ${ adjust_point(3.81, 2.066)}) (width ${p.gnd_trace_width}) (layer "B.Cu") (net ${p.local_net("1").index}))
    `

    const nice_view_reversible_traces = ` 
    `

    const both_reversible_traces = ` 
    `

    let final = standard_opening;

    if(p.display_type == "ssd1306"){
      final += oled_standard;
      if(p.reversible) {
        final += oled_reversible_pads;
        final += oled_reversible_solder_bridges;
      } else {
        if(p.side == "F") {
          final += oled_front;
        }
        if(p.side == "B") {
          final += oled_back;
        }
      }
    } else if(p.display_type == "nice_view"){
      final += nice_view_standard;
      if(p.reversible) {
        final += nice_view_reversible;
      } else {
        if(p.side == "F") {
          final += nice_view_front;
        }
        if(p.side == "B") {
          final += nice_view_back;
        }
      }
    } else if(p.display_type == "both"){
      final += oled_standard;
      final += nice_view_standard;
      if(p.reversible) {
        final += oled_reversible_pads;
        final += nice_view_reversible;
        final += both_connections;
      } else {
        if(p.side == "F") {
          final += oled_front;
          final += nice_view_front;
        }
        if(p.side == "B") {
          final += oled_back;
          final += nice_view_back;
        }
      }
    }

    final += standard_closing;

    if(p.reversible && p.include_traces) {
      if(p.display_type == "ssd1306") {
        final += oled_reversible_traces;
      } else if(p.display_type == "nice_view") {
        final += nice_view_reversible_traces;
      } else if(p.display_type == "both") {
        final += both_reversible_traces;
      }
    }  

    return final;
  }
}
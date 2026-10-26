// Copyright (c) 2023 Marco Massarelli
// SPDX-License-Identifier: MIT
// License: https://opensource.org/license/mit/
// Author: @TildeWill
//
// Description:
// Twelve-pin magnetic VIK keyboard connector, with fixed through-hole pinout.
// The legacy side option was unused and is omitted; the pinout is not reversible.
//
// Nets:
// 1 V3V, 2 GND, 3 SDA, 4 SCL, 5 RGB_LED_OUT, 6 V5V,
// 7 GPIO1, 8 MOSI, 9 GPIO2, 10 SPI_CS, 11 MISO, 12 SCLK.
//
// Params:
// designator: default "VIK". Reference prefix.
// Net defaults: V3V="V3V", GND="GND", SDA="SDA", SCL="SCL", RGB_LED_OUT="RGB_LED_OUT", V5V="V5V",
//   GPIO1="GPIO1", MOSI="MOSI", GPIO2="GPIO2", SPI_CS="SPI_CS", MISO="MISO", SCLK="SCLK".

module.exports = {
  params: {
    designator: 'VIK',
    V3V: { type: 'net', value: 'V3V' },
    GND: { type: 'net', value: 'GND' },
    SDA: { type: 'net', value: 'SDA' },
    SCL: { type: 'net', value: 'SCL' },
    RGB_LED_OUT: { type: 'net', value: 'RGB_LED_OUT' },
    V5V: { type: 'net', value: 'V5V' },
    GPIO1: { type: 'net', value: 'GPIO1' },
    MOSI: { type: 'net', value: 'MOSI' },
    GPIO2: { type: 'net', value: 'GPIO2' },
    SPI_CS: { type: 'net', value: 'SPI_CS' },
    MISO: { type: 'net', value: 'MISO' },
    SCLK: { type: 'net', value: 'SCLK' },
  },
  body: p => {
    const common_start = `
      (footprint "ceoloide:connector_magnetic_vik"
        (layer "F.Cu")
        ${p.at}
        (attr board_only exclude_from_pos_files exclude_from_bom)
        (property "Reference" "${p.ref}" (at 0.17 -10.05 ${p.r + 90}) (layer "Dwgs.User") ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15))))
        (property "Value" "Connector_VIK-keyboard" (at 0 -12 ${p.r + 90}) (layer "F.Fab") hide (effects (font (size 1 1) (thickness 0.15))))
    `;
    const pads = `
        (pad "1" thru_hole circle (at -1.1 5.5 ${p.r + 270}) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.V3V.str})
        (pad "2" thru_hole circle (at 1.1 5.5 ${p.r + 270}) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.GND.str})
        (pad "3" thru_hole circle (at -1.1 3.3 ${p.r + 270}) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.SDA.str})
        (pad "4" thru_hole circle (at 1.1 3.3 ${p.r + 270}) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.SCL.str})
        (pad "5" thru_hole circle (at -1.1 1.1 ${p.r + 270}) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.RGB_LED_OUT.str})
        (pad "6" thru_hole circle (at 1.1 1.1 ${p.r + 270}) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.V5V.str})
        (pad "7" thru_hole circle (at -1.1 -1.1 ${p.r + 270}) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.GPIO1.str})
        (pad "8" thru_hole circle (at 1.1 -1.1 ${p.r + 270}) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.MOSI.str})
        (pad "9" thru_hole circle (at -1.1 -3.3 ${p.r + 270}) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.GPIO2.str})
        (pad "10" thru_hole circle (at 1.1 -3.3 ${p.r + 270}) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.SPI_CS.str})
        (pad "11" thru_hole circle (at -1.1 -5.5 ${p.r + 270}) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.MISO.str})
        (pad "12" thru_hole circle (at 1.1 -5.5 ${p.r + 270}) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.SCLK.str})
    `;
    const silkscreen = `
        (fp_circle (center -2.5 6.5) (end -2.7 6.5) (layer "B.SilkS") (stroke (width 0.1) (type solid)) (fill none))
        (fp_circle (center -2.5 6.5) (end -2.25 6.5) (layer "F.SilkS") (stroke (width 0.1) (type solid)) (fill none))
        (fp_circle (center 0 0) (end 23 0) (layer "F.SilkS") (stroke (width 0.1) (type solid)) (fill none))
        (fp_circle (center 0 0) (end 27.5 0) (layer "F.SilkS") (stroke (width 0.1) (type solid)) (fill none))
    `;
    const common_end = ')';

    let final = common_start;
    final += pads;
    final += silkscreen;
    final += common_end;
    return final;
  },
};

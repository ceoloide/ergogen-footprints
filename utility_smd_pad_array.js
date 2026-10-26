// Copyright (c) 2023 Marco Massarelli
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
// License: https://creativecommons.org/licenses/by-nc-sa/4.0/
// Author: @infused-kim
//
// Description:
// One to six rectangular solder pads centered in a row.
// Opposite-face pads require routing or vias to connect them.
//
// Nets:
// net_1…net_6 → pads 1…6; only the requested count is emitted.
//
// Params:
// designator: default "PAD". Reference prefix.
// side: default "F". Placement face: 'F' or 'B'.
// reversible: default false. Emit the alternative mounting geometry as well.
// width: default 1.25. Pad width in mm.
// height: default 2.5. Pad height in mm.
// space: default 2. Gap parameter in mm: array pitch is pad width plus space.
// mirror_back: default true. Reverse the array order on the back face while retaining each pad identity.
// pads: default 2. Number of solder pads, 1–6; larger values are capped at six.
// label_1: default "". Optional label for array position 1.
// label_2: default "". Optional label for array position 2.
// label_3: default "". Optional label for array position 3.
// label_4: default "". Optional label for array position 4.
// label_5: default "". Optional label for array position 5.
// label_6: default "". Optional label for array position 6.
// label_at_bottom: default false. Place labels below the array instead of above it.
// Net defaults: net_1="PAD_1", net_2="PAD_2", net_3="PAD_3", net_4="PAD_4", net_5="PAD_5", net_6="PAD_6".

module.exports = {
  params: {
    designator: 'PAD',
    side: 'F',
    reversible: false,
    width: 1.25,
    height: 2.5,
    space: 2,
    mirror_back: true,
    pads: 2,
    net_1: { type: 'net', value: 'PAD_1' },
    net_2: { type: 'net', value: 'PAD_2' },
    net_3: { type: 'net', value: 'PAD_3' },
    net_4: { type: 'net', value: 'PAD_4' },
    net_5: { type: 'net', value: 'PAD_5' },
    net_6: { type: 'net', value: 'PAD_6' },
    label_1: '',
    label_2: '',
    label_3: '',
    label_4: '',
    label_5: '',
    label_6: '',
    label_at_bottom: false,
  },
  body: p => {
    if (!['F', 'B'].includes(p.side)) throw new Error('side must be F or B');
    const gen_nets = p => {
      const all_nets = [
        p.net_1.str,
        p.net_2.str,
        p.net_3.str,
        p.net_4.str,
        p.net_5.str,
        p.net_6.str,
      ];
      const all_labels = [p.label_1, p.label_2, p.label_3, p.label_4, p.label_5, p.label_6];

      let pad_cnt = p.pads;
      if (pad_cnt > all_nets.length || pad_cnt > all_labels.length) {
        pad_cnt = Math.min(all_nets.length, all_labels.length);
      }

      let nets = [];
      for (let i = 0; i < pad_cnt; i++) {
        let net = [all_nets[i], all_labels[i]];
        nets.push(net);
      }

      return nets;
    };

    const gen_pad = (
      pad_idx,
      pad_cnt,
      net_str,
      net_label,
      width,
      height,
      space,
      rot,
      layer,
      label_at_bottom,
      mirrored_order = false,
    ) => {
      // Calculate the pad position from center
      const pos_x_raw = (width + space) * pad_idx;

      // Adjust it so that the pads are centered in the middle
      const pos_x = pos_x_raw - ((width + space) * (pad_cnt - 1)) / 2;

      let label_pos_y = -1 * (height / 2 + 0.2);
      let label_justify_direction = 'left';
      if (label_at_bottom) {
        label_pos_y = label_pos_y * -1;
        label_justify_direction = 'right';
      }

      if (label_at_bottom == false || layer == 'B') {
        if ((rot > 0 && rot <= 180) || rot <= -180) {
          label_justify_direction = 'right';
        } else {
          label_justify_direction = 'left';
        }
      } else {
        if ((rot > 0 && rot <= 180) || rot <= -180) {
          label_justify_direction = 'left';
        } else {
          label_justify_direction = 'right';
        }
      }

      let justify_mirror = '';
      if (layer == 'B') {
        justify_mirror = 'mirror';
      }

      let label_justify = '';
      if (justify_mirror != '' || label_justify_direction != '') {
        label_justify = `(justify ${label_justify_direction} ${justify_mirror})`;
      }

      let pad = `
              (pad "${mirrored_order ? pad_cnt - pad_idx : pad_idx + 1}" smd rect (at ${pos_x} 0 ${rot}) (size ${width} ${height}) (layers "${layer}.Cu" "${layer}.Paste" "${layer}.Mask") ${net_str})
          `;

      if (net_label) {
        pad += `
              (fp_text user ${JSON.stringify(net_label)} (at ${pos_x} ${label_pos_y} ${90 + rot}) (layer "${layer}.SilkS")
                (effects (font (size 1 1) (thickness 0.1)) ${label_justify})
              )
            `;
      }

      return pad;
    };

    const gen_pads = (nets, width, height, space, rot, layer, label_at_bottom, mirror) => {
      if (mirror) {
        nets = nets.slice().reverse();
      }

      let pads = '';
      for (let [net_idx, net] of nets.entries()) {
        const net_str = net[0];
        const net_label = net[1];

        const pad = gen_pad(
          net_idx,
          nets.length,
          net_str,
          net_label,
          width,
          height,
          space,
          rot,
          layer,
          label_at_bottom,
          mirror,
        );

        pads += pad;
      }

      return pads;
    };

    if (!Number.isInteger(p.pads) || p.pads < 1)
      throw new Error('Array count must be a positive integer');
    const nets = gen_nets(p);

    let pads_front = '';
    if (p.side == 'F' || p.reversible) {
      pads_front = gen_pads(nets, p.width, p.height, p.space, p.r, 'F', p.label_at_bottom, false);
    }

    let pads_back = '';
    if (p.side == 'B' || p.reversible) {
      pads_back = gen_pads(
        nets,
        p.width,
        p.height,
        p.space,
        p.r,
        'B',
        p.label_at_bottom,
        p.mirror_back,
      );
    }
    const fp = `
        (footprint "ceoloide:utility_smd_pad_array" (layer "${p.side}.Cu")
          ${p.at}
          (attr smd)

          (property "Reference" "${p.ref}" (at 0 2.2 ${p.r}) (layer "${p.side}.SilkS") ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15)) ${p.side == 'B' ? '(justify mirror)' : ''}))
          ${pads_front}
          ${pads_back}
        )
      `;

    return fp;
  },
};

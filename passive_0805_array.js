// Copyright (c) 2023 Marco Massarelli
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
// License: https://creativecommons.org/licenses/by-nc-sa/4.0/
// Author: @infused-kim
//
// Description:
// One to six 0805 two-terminal land patterns centered in a row.
// Opposite-face pads require routing or vias to connect them.
//
// Nets:
// net_N_from → pad 2N−1 at y=+0.9125; net_N_to → pad 2N at y=−0.9125.
// swap_pad_direction exchanges these two nets.
//
// Params:
// designator: default "SMD". Reference prefix.
// side: default "F". Placement face: 'F' or 'B'.
// reversible: default false. Emit the alternative mounting geometry as well.
// space: default 2. Gap parameter in mm: array pitch is pad width plus space.
// mirror_back: default true. Reverse the array order on the back face while retaining each pad identity.
// swap_pad_direction: default false. Exchange from/to nets within each 0805 component on both faces.
// components: default 2. Number of 0805 components, 1–6; larger values are capped at six.
// label_1: default "". Optional label for array position 1.
// label_2: default "". Optional label for array position 2.
// label_3: default "". Optional label for array position 3.
// label_4: default "". Optional label for array position 4.
// label_5: default "". Optional label for array position 5.
// label_6: default "". Optional label for array position 6.
// label_at_bottom: default false. Place labels below the array instead of above it.
// Net defaults: net_1_from="SMD_1_F", net_1_to="SMD_1_T", net_2_from="SMD_2_F", net_2_to="SMD_2_T",
//   net_3_from="SMD_3_F", net_3_to="SMD_3_T", net_4_from="SMD_4_F", net_4_to="SMD_4_T",
//   net_5_from="SMD_5_F", net_5_to="SMD_5_T", net_6_from="SMD_6_F", net_6_to="SMD_6_T".

module.exports = {
  params: {
    designator: 'SMD',
    side: 'F',
    reversible: false,
    space: 2,
    mirror_back: true,
    swap_pad_direction: false,
    components: 2,
    net_1_from: { type: 'net', value: 'SMD_1_F' },
    net_1_to: { type: 'net', value: 'SMD_1_T' },
    net_2_from: { type: 'net', value: 'SMD_2_F' },
    net_2_to: { type: 'net', value: 'SMD_2_T' },
    net_3_from: { type: 'net', value: 'SMD_3_F' },
    net_3_to: { type: 'net', value: 'SMD_3_T' },
    net_4_from: { type: 'net', value: 'SMD_4_F' },
    net_4_to: { type: 'net', value: 'SMD_4_T' },
    net_5_from: { type: 'net', value: 'SMD_5_F' },
    net_5_to: { type: 'net', value: 'SMD_5_T' },
    net_6_from: { type: 'net', value: 'SMD_6_F' },
    net_6_to: { type: 'net', value: 'SMD_6_T' },
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
      const all_nets_from = [
        p.net_1_from.str,
        p.net_2_from.str,
        p.net_3_from.str,
        p.net_4_from.str,
        p.net_5_from.str,
        p.net_6_from.str,
      ];
      const all_nets_to = [
        p.net_1_to.str,
        p.net_2_to.str,
        p.net_3_to.str,
        p.net_4_to.str,
        p.net_5_to.str,
        p.net_6_to.str,
      ];
      const all_labels = [p.label_1, p.label_2, p.label_3, p.label_4, p.label_5, p.label_6];

      let pad_cnt = p.components;
      if (
        pad_cnt > all_nets_from.length ||
        pad_cnt > all_nets_to.length ||
        pad_cnt > all_labels.length
      ) {
        pad_cnt = Math.min(all_nets_from.length, all_nets_to.length, all_labels.length);
      }

      let nets = [];
      for (let i = 0; i < pad_cnt; i++) {
        let net = [all_nets_from[i], all_nets_to[i], all_labels[i]];
        nets.push(net);
      }

      return nets;
    };

    const gen_pad = (
      pad_idx,
      pad_cnt,
      net_from,
      net_to,
      net_label,
      space,
      rot,
      layer,
      label_at_bottom,
      mirrored_order = false,
    ) => {
      const width = 1.025;
      const height = 3.36;

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

      let label_fab_justify = '';
      if (justify_mirror) {
        label_fab_justify = `(justify ${justify_mirror})`;
      }

      const pad_num = (mirrored_order ? pad_cnt - 1 - pad_idx : pad_idx) * 2 + 1;
      let pad = `
              (fp_line (start ${0.625 + pos_x} -1) (end ${0.625 + pos_x} 1) (layer "${layer}.Fab") (stroke (width 0.1) (type solid)))
              (fp_line (start ${-0.625 + pos_x} -1) (end ${0.625 + pos_x} -1) (layer "${layer}.Fab") (stroke (width 0.1) (type solid)))
              (fp_line (start ${-0.625 + pos_x} 1) (end ${-0.625 + pos_x} -1) (layer "${layer}.Fab") (stroke (width 0.1) (type solid)))
              (fp_line (start ${0.625 + pos_x} 1) (end ${-0.625 + pos_x} 1) (layer "${layer}.Fab") (stroke (width 0.1) (type solid)))

              (fp_line (start ${0.95 + pos_x} -1.68) (end ${0.95 + pos_x} 1.68) (layer "${layer}.CrtYd") (stroke (width 0.05) (type solid)))
              (fp_line (start ${-0.95 + pos_x} -1.68) (end ${0.95 + pos_x} -1.68) (layer "${layer}.CrtYd") (stroke (width 0.05) (type solid)))
              (fp_line (start ${-0.95 + pos_x} 1.68) (end ${-0.95 + pos_x} -1.68) (layer "${layer}.CrtYd") (stroke (width 0.05) (type solid)))
              (fp_line (start ${0.95 + pos_x} 1.68) (end ${-0.95 + pos_x} 1.68) (layer "${layer}.CrtYd") (stroke (width 0.05) (type solid)))

              (fp_line (start ${0.735 + pos_x} 0.227064) (end ${0.735 + pos_x} -0.227064) (layer "${layer}.SilkS") (stroke (width 0.12) (type solid)))
              (fp_line (start ${-0.735 + pos_x} 0.227064) (end ${-0.735 + pos_x} -0.227064) (layer "${layer}.SilkS") (stroke (width 0.12) (type solid)))

              (pad "${pad_num}" smd roundrect (at ${0 + pos_x} 0.9125 ${90 + rot}) (size 1.025 1.4) (layers "${layer}.Cu" "${layer}.Paste" "${layer}.Mask") (roundrect_rratio 0.243902) ${net_from})
              (pad "${pad_num + 1}" smd roundrect (at ${0 + pos_x} -0.9125 ${90 + rot}) (size 1.025 1.4) (layers "${layer}.Cu" "${layer}.Paste" "${layer}.Mask") (roundrect_rratio 0.243902) ${net_to})
          `;

      if (net_label) {
        pad += `
            (fp_text user ${JSON.stringify(net_label)} (at ${0 + pos_x} 0 ${90 + rot}) (layer "${layer}.Fab")
              (effects (font (size 0.5 0.5) (thickness 0.08)) ${label_fab_justify})
            )
            (fp_text user ${JSON.stringify(net_label)} (at ${pos_x} ${label_pos_y} ${90 + rot}) (layer "${layer}.SilkS")
                (effects (font (size 1 1) (thickness 0.1)) ${label_justify})
              )
            `;
      }

      return pad;
    };

    const gen_pads = (nets, space, rot, layer, label_at_bottom, mirror, swap_pad_direction) => {
      if (mirror) {
        nets = nets.slice().reverse();
      }

      let pads = '';
      for (let [net_idx, net] of nets.entries()) {
        let net_from = net[0];
        let net_to = net[1];
        const net_label = net[2];

        if (swap_pad_direction) {
          net_from = net[1];
          net_to = net[0];
        }

        const pad = gen_pad(
          net_idx,
          nets.length,
          net_from,
          net_to,
          net_label,
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

    if (!Number.isInteger(p.components) || p.components < 1)
      throw new Error('Array count must be a positive integer');
    const nets = gen_nets(p);

    let pads_front = '';
    if (p.side == 'F' || p.reversible) {
      pads_front = gen_pads(
        nets,
        p.space,
        p.r,
        'F',
        p.label_at_bottom,
        false,
        p.swap_pad_direction,
      );
    }

    let pads_back = '';
    if (p.side == 'B' || p.reversible) {
      pads_back = gen_pads(
        nets,
        p.space,
        p.r,
        'B',
        p.label_at_bottom,
        p.mirror_back,
        p.swap_pad_direction,
      );
    }
    const fp = `
        (footprint "ceoloide:passive_0805_array" (layer "${p.side}.Cu")
          ${p.at}
          (attr smd)

          (property "Reference" "${p.ref}" (at 0 3 ${p.r}) (layer "${p.side}.SilkS") ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15)) ${p.side == 'B' ? '(justify mirror)' : ''}))
          ${pads_front}
          ${pads_back}
        )
      `;

    return fp;
  },
};

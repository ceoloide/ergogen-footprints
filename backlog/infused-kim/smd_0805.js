// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
//
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
//
// Author: @infused-kim
//
// Description:
// Let's you place multiple SMD 0805 components, such as resistors and
// capacitors.
//
// Fully reversible and component order is mirrored on the back.

module.exports = {
  params: {
    designator: 'SMD',
    side: 'F',
    reverse: true,
    space: 2,
    mirror: true,
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

    const gen_nets = (p) => {
      const all_nets_from = [
        p.net_1_from.str, p.net_2_from.str, p.net_3_from.str,
        p.net_4_from.str, p.net_5_from.str, p.net_6_from.str,
      ];
      const all_nets_to = [
        p.net_1_to.str, p.net_2_to.str, p.net_3_to.str,
        p.net_4_to.str, p.net_5_to.str, p.net_6_to.str,
      ];
      const all_labels = [
        p.label_1, p.label_2, p.label_3,
        p.label_4, p.label_5, p.label_6,
      ];

      pad_cnt = p.components;
      if (pad_cnt > all_nets_from.length || pad_cnt > all_nets_to.length ||
        pad_cnt > all_labels.length) {
        pad_cnt = Math.min(
          all_nets_from.length, all_nets_to.length, all_labels.length
        );
      }

      let nets = [];
      for (let i = 0; i < pad_cnt; i++) {
        let net = [
          all_nets_from[i],
          all_nets_to[i],
          all_labels[i],
        ];
        nets.push(net);
      }

      return nets;
    }

    const gen_pad = (pad_idx, pad_cnt, net_from, net_to, net_label, space, rot, layer, label_at_bottom) => {
      const width = 1.025;
      const height = 3.36;

      // Calculate the pad position from center
      const pos_x_raw = (width + space) * pad_idx;

      // Adjust it so that the pads are centered in the middle
      const pos_x = (
        pos_x_raw - (width + space) * (pad_cnt - 1) / 2
      );

      let label_pos_y = -1 * (height / 2 + 0.2);
      let label_justify_direction = "left";
      if (label_at_bottom) {
        label_pos_y = label_pos_y * -1;
        label_justify_direction = "right";
      }

      if (label_at_bottom == false || layer == 'B') {
        if ((rot > 0 && rot <= 180) || (rot <= -180)) {
          label_justify_direction = "right";
        } else {
          label_justify_direction = "left";
        }
      } else {
        if ((rot > 0 && rot <= 180) || (rot <= -180)) {
          label_justify_direction = "left";
        } else {
          label_justify_direction = "right";
        }
      }

      let justify_mirror = '';
      if (layer == 'B') {
        justify_mirror = 'mirror'
      }

      let label_justify = '';
      if (justify_mirror != '' || label_justify_direction != '') {
        label_justify = `(justify ${label_justify_direction} ${justify_mirror})`;
      }

      let label_fab_justify = '';
      if (justify_mirror) {
        label_fab_justify = `(justify ${justify_mirror})`;
      }

      const pad_num = pad_idx * 2 + 1;
      let pad = `
              (fp_line (start ${0.625 + pos_x} -1) (end ${0.625 + pos_x} 1) (layer ${layer}.Fab) (width 0.1))
              (fp_line (start ${-0.625 + pos_x} -1) (end ${0.625 + pos_x} -1) (layer ${layer}.Fab) (width 0.1))
              (fp_line (start ${-0.625 + pos_x} 1) (end ${-0.625 + pos_x} -1) (layer ${layer}.Fab) (width 0.1))
              (fp_line (start ${0.625 + pos_x} 1) (end ${-0.625 + pos_x} 1) (layer ${layer}.Fab) (width 0.1))

              (fp_line (start ${0.95 + pos_x} -1.68) (end ${0.95 + pos_x} 1.68) (layer ${layer}.CrtYd) (width 0.05))
              (fp_line (start ${-0.95 + pos_x} -1.68) (end ${0.95 + pos_x} -1.68) (layer ${layer}.CrtYd) (width 0.05))
              (fp_line (start ${-0.95 + pos_x} 1.68) (end ${-0.95 + pos_x} -1.68) (layer ${layer}.CrtYd) (width 0.05))
              (fp_line (start ${0.95 + pos_x} 1.68) (end ${-0.95 + pos_x} 1.68) (layer ${layer}.CrtYd) (width 0.05))

              (fp_line (start ${0.735 + pos_x} 0.227064) (end ${0.735 + pos_x} -0.227064) (layer ${layer}.SilkS) (width 0.12))
              (fp_line (start ${-0.735 + pos_x} 0.227064) (end ${-0.735 + pos_x} -0.227064) (layer ${layer}.SilkS) (width 0.12))

              (pad ${pad_num} smd roundrect (at ${0 + pos_x} 0.9125 ${90 + rot}) (size 1.025 1.4) (layers ${layer}.Cu ${layer}.Paste ${layer}.Mask) (roundrect_rratio 0.243902) ${net_from})
              (pad ${pad_num + 1} smd roundrect (at ${0 + pos_x} -0.9125 ${90 + rot}) (size 1.025 1.4) (layers ${layer}.Cu ${layer}.Paste ${layer}.Mask) (roundrect_rratio 0.243902) ${net_to})
          `

      if (net_label) {
        pad += `
            (fp_text user "${net_label}" (at ${0 + pos_x} 0 ${90 + rot}) (layer ${layer}.Fab)
              (effects (font (size 0.5 0.5) (thickness 0.08)) ${label_fab_justify})
            )
            (fp_text user "${net_label}" (at ${pos_x} ${label_pos_y} ${90 + rot}) (layer ${layer}.SilkS)
                (effects (font (size 1 1) (thickness 0.1)) ${label_justify})
              )
            `
      }

      return pad;
    }

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
          swap_pad_direction,
        );

        pads += pad;
      }

      return pads;
    }

    const nets = gen_nets(p);

    let pads_front = '';
    if (p.side == 'F' || p.reverse) {
      pads_front = gen_pads(
        nets,
        p.space, p.rot, "F",
        p.label_at_bottom, false, p.swap_pad_direction,
      );
    }

    let pads_back = '';
    if (p.side == 'B' || p.reverse) {
      pads_back = gen_pads(
        nets,
        p.space, p.rot, "B",
        p.label_at_bottom, p.mirror, p.swap_pad_direction,
      );
    }
    const fp = `
        (module smd_805 (layer F.Cu) (tedit 6446BF3D)
          ${p.at /* parametric position */}
          (attr smd)

          (fp_text reference "${p.ref}" (at 0 3) (layer F.SilkS) ${p.ref_hide}
            (effects (font (size 1 1) (thickness 0.15)))
          )
          ${pads_front}
          ${pads_back}
        )
      `

    return fp;
  }
}
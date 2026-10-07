const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {generate, parse} = require('./helpers');
const {audit} = require('./trace-geometry');

const routingOptions = [
  'reversible', 'include_traces', 'include_traces_vias', 'use_rectangular_jumpers',
  'hotswap_pads_same_side', 'include_plated_holes', 'solder', 'hotswap',
  'include_tht', 'invert_jumpers_position', 'only_required_jumpers', 'reverse_mount',
  'include_stabilizer_nets', 'include_centerhole_net', 'include_extra_pins',
  'include_thru_hole_smd_pads', 'choc_v1_support', 'choc_v2_support',
  'include_stabilizer_pad', 'oval_stabilizer_pad', 'include_custom_solder_pads',
];

for (const file of fs.readdirSync(path.resolve(__dirname, '..')).filter(file => file.endsWith('.js'))) {
  test(`${file}: pad-center audit across routing variants, sides and rotations`, () => {
    const params = require(path.resolve(__dirname, '..', file)).params;
    const names = routingOptions.filter(key => key in params);
    for (let mask = 0; mask < 2 ** names.length; mask++) {
      const options = Object.fromEntries(names.map((key, i) => [key, !!(mask & (1 << i))]));
      for (const side of 'FB') {
        for (const r of [0, 90, 37]) {
          const result = audit(parse(generate(file, {...options, side, r, x: 123.4, y: -56.7})));
          assert.deepEqual(result.issues, [], `${file} ${JSON.stringify({...options, side, r})}`);
          for (const pad of result.pads) assert.ok(pad.center.every(Number.isFinite));
        }
      }
    }
  });
}

for (const file of ['mcu_nice_nano.js', 'mcu_supermini_nrf52840.js', 'switch_mx.js', 'switch_choc_v1_v2.js', 'diode_tht_sod123.js']) {
  test(`${file}: non-default dimensions retain center connections`, () => {
    for (const use_rectangular_jumpers of [false, true]) {
      for (const hotswap_pads_same_side of [false, true]) {
        for (const outer_pad_width of [1.2, 1.6, 3]) {
          const result = audit(parse(generate(file, {
            reversible: true, include_traces_vias: true, include_traces: true,
            use_rectangular_jumpers, hotswap_pads_same_side,
            outer_pad_width_front: outer_pad_width, outer_pad_width_back: outer_pad_width, outer_pad_height: 2.2,
            trace_width: 0.15, via_size: 0.6, include_tht: false, trace_distance: -1.1,
            r: 37, x: 100, y: 80,
          })));
          assert.deepEqual(result.issues, [], `${file}: pad width ${outer_pad_width}, same-side ${hotswap_pads_same_side}`);
        }
      }
    }
  });
}

const fixture = (segments, shape = 'rect', layers = '"F.Cu"', extras = '') => parse(`
  (footprint "fixture" (at 0 0 0)
    (pad "1" smd ${shape} (at 0 0 0) (size 2 2) (layers ${layers}) (net 1 "test") ${extras}))
  ${segments}`);
const segment = (a, b, layer = 'F.Cu', net = 1) =>
  `(segment (start ${a}) (end ${b}) (width 0.2) (layer "${layer}") (net ${net}))`;

test('audit detects an unsplit center even when another segment ends there', () => {
  assert.equal(audit(fixture(segment('-3 0', '3 0') + segment('0 0', '0 3'))).issues[0].type, 'split');
  assert.deepEqual(audit(fixture(segment('-3 0', '0 0') + segment('0 0', '3 0'))).issues, []);
});
test('audit detects pad-area entry and accepts a center extension', () => {
  const entering = segment('3 0.5', '0 0.5');
  assert.equal(audit(fixture(entering)).issues[0].type, 'center');
  assert.deepEqual(audit(fixture(entering + segment('0 0.5', '0 0'))).issues, []);
});
test('audit accounts for track width when copper touches a pad', () => {
  assert.equal(audit(fixture(segment('-3 1.05', '3 1.05'))).issues[0].type, 'center');
});
test('audit respects copper layers and detects wrong nets', () => {
  assert.deepEqual(audit(fixture(segment('-3 0', '3 0', 'B.Cu'))).issues, []);
  assert.equal(audit(fixture(segment('-3 0', '0 0', 'F.Cu', 2))).issues[0].type, 'wrong-net');
});
test('audit checks custom polygons outside the anchor', () => {
  const custom = '(options (anchor rect)) (primitives (gr_poly (pts (xy 2 2) (xy 4 2) (xy 4 4) (xy 2 4)) (width 0) (fill yes)))';
  assert.equal(audit(fixture(segment('5 3', '3 3'), 'custom', '"F.Cu"', custom)).issues[0].type, 'center');
});

test('utility router emits the requested route vertices and layers', () => {
  const nodes = parse(generate('utility_router.js', {route: 'f(0,0)(2,0)v b(2,2)', r: 37}));
  const result = audit(nodes);
  assert.equal(result.segments.length, 2);
  assert.deepEqual(result.issues, []);
});

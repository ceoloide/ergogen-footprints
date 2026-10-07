const {test} = require('node:test');
const assert = require('node:assert/strict');
const {generate, parse, field} = require('./helpers');

for (const file of ['battery_connector_jst_ph_2.js', 'mcu_nice_nano.js', 'mcu_supermini_nrf52840.js']) {
  for (const r of [0, 90, 37]) {
    test(`${file}: rectangular jumpers at ${r} degrees preserve nets and layers`, () => {
      const pads = rectangular => parse(generate(file, {reversible: true, use_rectangular_jumpers: rectangular, r}))[0]
        .filter(node => node[0] === 'pad' && node[2] === 'smd');
      const chevrons = pads(false), rectangles = pads(true);
      assert.equal(rectangles.length, chevrons.length);
      assert.ok(rectangles.length > 0);
      for (let i = 0; i < rectangles.length; i++) {
        assert.equal(rectangles[i][3], 'rect');
        assert.deepEqual(field(rectangles[i], 'size'), ['size', '0.6', '1.2']);
        assert.equal(rectangles[i][1], chevrons[i][1]);
        assert.deepEqual(field(rectangles[i], 'net'), field(chevrons[i], 'net'));
        assert.deepEqual([...field(rectangles[i], 'layers')].sort(), [...field(chevrons[i], 'layers')].sort());
      }
    });
  }
  test(`${file}: rectangular option has no effect when not reversible`, () => {
    assert.equal(generate(file), generate(file, {use_rectangular_jumpers: true}));
  });
}

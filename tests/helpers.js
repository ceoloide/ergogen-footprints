const path = require('node:path');

// Minimal Ergogen parameter context; net objects stringify like Ergogen nets.
const generate = (file, overrides = {}) => {
  const footprint = require(path.resolve(__dirname, '..', file));
  const nets = new Map();
  const net = name => {
    if (!nets.has(name)) {
      const index = nets.size + 1;
      nets.set(name, {name, index, str: `(net ${index} "${name}")`, toString() { return this.str; }});
    }
    return nets.get(name);
  };
  const p = Object.fromEntries(Object.entries(footprint.params).map(([key, value]) =>
    [key, value && typeof value === 'object' && 'type' in value
      ? value.type === 'net' ? net(value.value || key) : value.value
      : value === undefined ? net(key) : value]));
  Object.assign(p, {r: 0, ref: 'TEST', ref_hide: '', point: {meta: {name: 'test'}}}, overrides);
  const x = overrides.x || 0, y = overrides.y || 0;
  p.at = `(at ${x} ${y} ${p.r})`;
  p.local_net = name => net(`local_${name}`);
  p.eaxy = (px, py) => {
    const a = p.r * Math.PI / 180;
    return `${x + px * Math.cos(a) + py * Math.sin(a)} ${y - px * Math.sin(a) + py * Math.cos(a)}`;
  };
  return footprint.body(p);
};

const parse = source => {
  const root = [], stack = [root];
  for (const token of source.match(/"(?:\\.|[^"\\])*"|[^\s()]+|[()]/g) || []) {
    if (token === '(') {
      const child = [];
      stack.at(-1).push(child);
      stack.push(child);
    } else if (token === ')') {
      if (stack.length === 1) throw new Error('Unexpected closing parenthesis');
      stack.pop();
    } else stack.at(-1).push(token.startsWith('"') ? JSON.parse(token) : token);
  }
  if (stack.length !== 1) throw new Error('Unclosed S-expression');
  return root;
};
const field = (node, name) => node.find(value => Array.isArray(value) && value[0] === name);
module.exports = {generate, parse, field};

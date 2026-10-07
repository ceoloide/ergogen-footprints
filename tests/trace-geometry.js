const {field} = require('./helpers');
const EPS = 1e-6;
const xy = node => node.slice(1, 3).map(Number);
const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const project = (point, a, b) => {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const t = Math.max(0, Math.min(1, ((point[0] - a[0]) * dx + (point[1] - a[1]) * dy) / (dx * dx + dy * dy)));
  return [a[0] + t * dx, a[1] + t * dy];
};
const rotate = (point, degrees, offset = [0, 0]) => {
  const a = degrees * Math.PI / 180;
  return [offset[0] + point[0] * Math.cos(a) + point[1] * Math.sin(a), offset[1] - point[0] * Math.sin(a) + point[1] * Math.cos(a)];
};
const inside = (point, polygon) => {
  let result = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[i], b = polygon[j];
    if ((a[1] > point[1]) !== (b[1] > point[1]) && point[0] < (b[0] - a[0]) * (point[1] - a[1]) / (b[1] - a[1]) + a[0]) result = !result;
  }
  return result;
};
const cross = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
const lineDistance = (a, b, c, d) => {
  if (cross(a, b, c) * cross(a, b, d) < 0 && cross(c, d, a) * cross(c, d, b) < 0) return 0;
  return Math.min(distance(a, project(a, c, d)), distance(b, project(b, c, d)), distance(c, project(c, a, b)), distance(d, project(d, a, b)));
};

const audit = nodes => {
  const pads = [], segments = nodes.filter(n => n[0] === 'segment'), issues = [];
  for (const footprint of nodes.filter(n => n[0] === 'footprint')) {
    const at = field(footprint, 'at'), origin = xy(at), rotation = Number(at[3] || 0);
    for (const pad of footprint.filter(n => n[0] === 'pad' && n[2] !== 'np_thru_hole')) {
      const at = field(pad, 'at'), size = xy(field(pad, 'size'));
      const center = rotate(xy(at), rotation, origin), angle = Number(at[3] || 0);
      const polygons = [];
      if (pad[3] === 'custom') {
        for (const primitive of field(pad, 'primitives').slice(1)) {
          if (primitive[0] !== 'gr_poly') throw new Error(`Unsupported custom primitive ${primitive[0]}`);
          polygons.push(field(primitive, 'pts').slice(1).map(xy));
        }
      }
      // The anchor also contributes copper to custom pads.
      const shape = pad[3] === 'custom' ? field(pad, 'options').find(n => n[0] === 'anchor')[1] : pad[3];
      if (shape === 'rect' || shape === 'roundrect') {
        const [w, h] = size.map(n => n / 2);
        const ratio = Number(field(pad, 'roundrect_rratio')?.[1] || 0);
        const radius = Math.min(...size) * ratio;
        const chamfer = Number(field(pad, 'chamfer_ratio')?.[1] || 0) * Math.min(...size);
        const corners = [[w, h, 'bottom_right'], [-w, h, 'bottom_left'], [-w, -h, 'top_left'], [w, -h, 'top_right']];
        const poly = [];
        for (let i = 0; i < 4; i++) {
          const [cx, cy, name] = corners[i];
          if (chamfer && field(pad, 'chamfer')?.includes(name)) {
            const prev = corners[(i + 3) % 4], next = corners[(i + 1) % 4];
            poly.push([cx + Math.sign(prev[0] - cx) * chamfer, cy + Math.sign(prev[1] - cy) * chamfer], [cx + Math.sign(next[0] - cx) * chamfer, cy + Math.sign(next[1] - cy) * chamfer]);
          } else if (radius) {
            for (let j = 0; j <= 16; j++) {
              const a = (i * 90 + j * 90 / 16) * Math.PI / 180;
              poly.push([Math.sign(cx) * (w - radius) + radius * Math.cos(a), Math.sign(cy) * (h - radius) + radius * Math.sin(a)]);
            }
          } else poly.push([cx, cy]);
        }
        polygons.push(poly);
      } else if (shape === 'circle' || shape === 'oval') {
        const radius = Math.min(...size) / 2;
        polygons.push(Array.from({length: 128}, (_, i) => {
          const a = i * 2 * Math.PI / 128;
          return [radius * Math.cos(a) + Math.sign(Math.cos(a)) * (size[0] / 2 - radius), radius * Math.sin(a) + Math.sign(Math.sin(a)) * (size[1] / 2 - radius)];
        }));
      } else throw new Error(`Unsupported pad shape ${shape}`);
      pads.push({id: pad[1], center, net: field(pad, 'net')?.[1], layers: field(pad, 'layers').slice(1), polygons: polygons.map(poly => poly.map(pt => rotate(pt, angle, center)))});
    }
  }
  for (const pad of pads) {
    const points = pad.polygons.flat();
    pad.bounds = [Math.min(...points.map(p => p[0])), Math.min(...points.map(p => p[1])), Math.max(...points.map(p => p[0])), Math.max(...points.map(p => p[1]))];
  }
  for (const segment of segments) {
    const a = xy(field(segment, 'start')), b = xy(field(segment, 'end')), layer = field(segment, 'layer')[1], net = field(segment, 'net')?.[1];
    if (distance(a, b) < EPS) { issues.push({type: 'zero-length', a, b}); continue; }
    for (const pad of pads) {
      if (!pad.layers.includes(layer) && !pad.layers.includes('*.Cu') && !pad.layers.includes('F&B.Cu')) continue;
      const width = Number(field(segment, 'width')[1]);
      if (Math.max(a[0], b[0]) + width / 2 + EPS < pad.bounds[0] || Math.min(a[0], b[0]) - width / 2 - EPS > pad.bounds[2] ||
          Math.max(a[1], b[1]) + width / 2 + EPS < pad.bounds[1] || Math.min(a[1], b[1]) - width / 2 - EPS > pad.bounds[3]) continue;
      const touches = pad.polygons.some(poly => inside(a, poly) || inside(b, poly) || poly.some((pt, i) => lineDistance(a, b, pt, poly[(i + 1) % poly.length]) <= width / 2 + EPS));
      if (net && net !== pad.net) {
        if (touches) issues.push({type: 'wrong-net', pad: pad.id, center: pad.center, a, b, layer});
        continue;
      }
      const nearest = project(pad.center, a, b);
      if (distance(nearest, pad.center) < EPS) {
        if (distance(a, pad.center) > EPS && distance(b, pad.center) > EPS) issues.push({type: 'split', pad: pad.id, center: pad.center, a, b, layer});
      } else {
        if (touches) {
          // Several segments can enter a pad as part of one route. Require an
          // explicit center connection on the same layer and net in that route.
          const connected = segments.some(s => field(s, 'layer')[1] === layer && field(s, 'net')?.[1] === net &&
            [xy(field(s, 'start')), xy(field(s, 'end'))].some(pt => distance(pt, pad.center) < EPS));
          if (!connected) issues.push({type: 'center', pad: pad.id, center: pad.center, a, b, layer});
        }
      }
    }
  }
  return {pads, segments, issues};
};
module.exports = {audit};

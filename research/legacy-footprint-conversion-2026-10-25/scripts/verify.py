import json,math,collections,sys
from pathlib import Path
r=Path(sys.argv[1]);data=json.loads((r/'native9.json').read_text())['cases'];fail=[];checks=0
for row in data:
 checks+=1
 if not row['reference']:fail.append((row['file'],row['name'],'Missing reference'))
 for t in row['tracks']:
  checks+=1
  if not t['netcode']:fail.append((row['file'],row['name'],'Unnetted track'))
 # A pad number must identify the same circuit net on each face.
 nets=collections.defaultdict(set)
 for p in row['pads']:
  if p['number'] and p['net']:nets[p['number']].add(p['net'])
 for number,ns in nets.items():
  checks+=1
  if len(ns)>1:fail.append((row['file'],row['name'],'Pad '+number+' has multiple nets '+str(ns)))
 if row['rotation']:
  base=next(c for c in data if c['file']==row['file'] and c['name']==('reversible_on' if 'reversible' in row['params'] else 'default'))
  a=math.radians(row['angle']);cx,cy=row['position']
  expected=[]
  for p in base['pads']:
   x,y=p['position'];expected.append((p['number'],p['net'],x*math.cos(a)+y*math.sin(a)+cx,y*math.cos(a)-x*math.sin(a)+cy,(p['angle']+row['angle'])%180))
  for p in row['pads']:
   checks+=1
   matches=[e for e in expected if e[:2]==(p['number'],p['net']) and math.dist(e[2:4],p['position'])<.00001 and min(abs(e[4]-p['angle']%180),180-abs(e[4]-p['angle']%180))<.00001]
   if not matches:fail.append((row['file'],row['name'],'Pad transform '+str(p)))
  # All segment endpoints obey the same transform, and preserve nets.
  for t in base['tracks']:
   checks+=1
   def tr(pt):x,y=pt;return [x*math.cos(a)+y*math.sin(a)+cx,y*math.cos(a)-x*math.sin(a)+cy]
   if not any(u['net']==t['net'] and u['layer']==t['layer'] and math.dist(u['start'],tr(t['start']))<.001 and math.dist(u['end'],tr(t['end']))<.001 for u in row['tracks']):fail.append((row['file'],row['name'],'Track transform'))
print('Assertions',checks,'failures',len(fail));print('\n'.join(map(str,fail[:20])))
(r/'assertions.json').write_text(json.dumps({'checks':checks,'failures':fail},indent=2))

# Check that each generated routing component reaches at least two pad centers
# on the same net. Open jumper gaps intentionally remain separate components.
routed_components = 0
routing_failures = []
for row in data:
    remaining = list(row['tracks'])
    while remaining:
        first = remaining.pop()
        points = [first['start'], first['end']]
        changed = True
        while changed:
            changed = False
            for track in remaining[:]:
                if track['net'] != first['net'] or track['layer'] != first['layer']:
                    continue
                if any(math.dist(a, b) < .00001 for a in points for b in [track['start'], track['end']]):
                    points.extend([track['start'], track['end']])
                    remaining.remove(track)
                    changed = True
        pads = [pad for pad in row['pads'] if pad['net'] == first['net'] and
                any(math.dist(pad['position'], point) < .00001 for point in points)]
        routed_components += 1
        if len(pads) < 2:
            routing_failures.append([row['file'], row['name'], first['net']])
(r/'connectivity.json').write_text(json.dumps({'components_checked': routed_components, 'failures': routing_failures}, indent=2))
print('Routed components', routed_components, 'failures', len(routing_failures))
sys.exit(bool(fail or routing_failures))

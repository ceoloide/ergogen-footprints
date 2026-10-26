import pcbnew,json,sys,math
from pathlib import Path
r=Path(sys.argv[1]);rows=json.loads((r/'modern.json').read_text());res=[]
for row in rows:
 d=Path(row['directory']);b=pcbnew.LoadBoard(str(d/'original.kicad_pcb'));fps=list(b.GetFootprints());assert len(fps)==1,(row['file'],row['name'],len(fps));f=fps[0]
 out={**{k:row[k] for k in ['file','name','rotation','params']},'position':[pcbnew.ToMM(f.GetPosition().x),pcbnew.ToMM(f.GetPosition().y)],'angle':f.GetOrientationDegrees(),'reference':f.GetReference(),'pads':[],'tracks':[]}
 for p in f.Pads():
  out['pads'].append({'number':p.GetNumber(),'position':[pcbnew.ToMM(p.GetPosition().x),pcbnew.ToMM(p.GetPosition().y)],'angle':p.GetOrientationDegrees(),'net':p.GetNetname(),'netcode':p.GetNetCode(),'size':[pcbnew.ToMM(p.GetSize().x),pcbnew.ToMM(p.GetSize().y)],'drill':[pcbnew.ToMM(p.GetDrillSize().x),pcbnew.ToMM(p.GetDrillSize().y)]})
 for t in b.GetTracks():out['tracks'].append({'start':[pcbnew.ToMM(t.GetStart().x),pcbnew.ToMM(t.GetStart().y)],'end':[pcbnew.ToMM(t.GetEnd().x),pcbnew.ToMM(t.GetEnd().y)],'net':t.GetNetname(),'netcode':t.GetNetCode(),'layer':t.GetLayerName()})
 if int(pcbnew.Version().split('.')[0])==9:
  pcbnew.SaveBoard(str(d/'kicad9.kicad_pcb'),b)
  import re
  (d/'normalized.kicad_pcb').write_text(re.sub(r'\s*\((?:uuid|tstamp|tedit)\s+[^)]+\)','',(d/'kicad9.kicad_pcb').read_text()))
 res.append(out)
(r/('native'+pcbnew.Version().split('.')[0]+'.json')).write_text(json.dumps({'version':pcbnew.Version(),'cases':res},indent=2));print(pcbnew.Version(),len(res),'boards loaded')

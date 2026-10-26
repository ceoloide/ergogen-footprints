"""Extract rendering bounds using KiCad's PCB API; original source stays unchanged."""
import pcbnew,json,pathlib,hashlib
BASE=pathlib.Path(__file__).resolve().parents[2]; OUT=BASE/'visuals'; ROOT=pathlib.Path('/tmp/keyboard-footprint-survey'); CACHE=pathlib.Path('/tmp/footprint-visuals');CACHE.mkdir(exist_ok=True)
rows=json.loads((BASE/'manifest.json').read_text()); boards={};entries=[];errors=[]
def box(b):return [pcbnew.ToMM(v) for v in (b.GetX(),b.GetY(),b.GetWidth(),b.GetHeight())]
def load(repo,path,altium=False):
 key=repo+'/'+path
 if key in boards:return boards[key]
 src=ROOT/repo.replace('/','__')/'source'/path
 if altium:
  b=pcbnew.PCB_IO_MGR.Load(pcbnew.PCB_IO_MGR.ALTIUM_DESIGNER,str(src));dst=CACHE/(hashlib.sha256(key.encode()).hexdigest()[:12]+'.kicad_pcb');pcbnew.SaveBoard(str(dst),b);render=str(dst)
 else:b=pcbnew.LoadBoard(str(src));render=str(src)
 info={'id':hashlib.sha256(key.encode()).hexdigest()[:12],'source':str(src),'render_source':render,'repo':repo,'path':path,'bounds':box(b.ComputeBoundingBox()),'footprints':[],'altium_import':altium}
 for fp in b.GetFootprints():
  info['footprints'].append({'reference':fp.GetReference(),'name':str(fp.GetFPID().GetLibItemName()),'full_name':(str(fp.GetFPID().GetLibNickname())+':'+str(fp.GetFPID().GetLibItemName())).lstrip(':'),'bounds':box(fp.GetBoundingBox(False,False)),'side':'B' if fp.IsFlipped() else 'F','pads':fp.GetPadCount(),'position':[pcbnew.ToMM(fp.GetPosition().x),pcbnew.ToMM(fp.GetPosition().y)]})
 boards[key]=info;print('Inspected',repo,path,flush=True);return info
for row in rows:
 try:
  b=load(row['representative_repo'],row['board_path']);matches=[f for f in b['footprints'] if f['full_name']==row['footprint'] or f['name']==row['footprint'].split(':')[-1]]
  use=next(u for u in row['uses'] if u['repo']==row['representative_repo'] and u['board']==row['board_path']);ref=use['instances'][0]['reference'];fp=next((f for f in matches if f['reference']==ref),matches[0] if matches else None);assert fp,row['footprint']
  entries.append({**row,'board_id':b['id'],'placement':fp,'format':'KiCad'})
 except Exception as e:errors.append([row['id'],str(e)]);print('ERROR',row['id'],str(e),flush=True)
(OUT/'render-metadata.json').write_text(json.dumps({'renderer':pcbnew.GetBuildVersion(),'boards':list(boards.values()),'entries':entries,'errors':errors},indent=2));print('Boards:',len(boards),'Entries:',len(entries),'Errors:',errors,flush=True)

"""Render KiCad SVG plots into annotated, geometrically scaled PNG board crops."""
from pathlib import Path
import json,subprocess,concurrent.futures,re,math,io,multiprocessing
import cairosvg
from PIL import Image,ImageDraw,ImageFont
BASE=Path(__file__).resolve().parents[2];OUT=BASE/'visuals';CACHE=Path('/tmp/footprint-visuals');IMAGES=OUT/'images';IMAGES.mkdir(exist_ok=True)
meta=json.loads((OUT/'render-metadata.json').read_text());boards={b['id']:b for b in meta['boards']};font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',18)
def window(bounds,aspect,pad):
 x,y,w,h=bounds;w=max(w,1)+2*pad;h=max(h,1)+2*pad
 if w/h<aspect:w=h*aspect
 else:h=w/aspect
 return [x+bounds[2]/2-w/2,y+bounds[3]/2-h/2,w,h]
def png(svg,bounds,size):
 x,y,w,h=bounds
 s=re.sub(r'width="[^"]+" height="[^"]+" viewBox="[^"]+"',f'width="{size[0]}" height="{size[1]}" viewBox="{x} {y} {w} {h}"',svg,count=1)
 return Image.open(io.BytesIO(cairosvg.svg2png(bytestring=s.encode(),background_color='#101a27',output_width=size[0],output_height=size[1]))).convert('RGB')
def plot(pair):
 bid,side=pair;b=boards[bid];dest=CACHE/f'{bid}-{side}.svg';layers=f'{side}.Cu,{side}.Silkscreen,Edge.Cuts'
 if not dest.exists():
  r=subprocess.run(['kicad-cli','pcb','export','svg','--mode-single','--exclude-drawing-sheet','--page-size-mode','1','--layers',layers,'-o',str(dest),b['render_source']],capture_output=True,text=True,timeout=180)
  if r.returncode:raise RuntimeError(r.stderr+r.stdout)
 bounds=window(b['bounds'],1.6,3)
 if (CACHE/f'{bid}-{side}-overview.png').exists():return pair,bounds
 svg=dest.read_text();im=png(svg,bounds,(960,600));im.save(CACHE/f'{bid}-{side}-overview.png');return pair,bounds
pairs=sorted(set((r['board_id'],r['placement']['side']) for r in meta['entries']))
with concurrent.futures.ProcessPoolExecutor(max_workers=4,mp_context=multiprocessing.get_context('fork')) as ex:
 overview={}
 for pair,bounds in ex.map(plot,pairs):
  overview[pair]=bounds
  print('Board plots ready:',len(overview),'/',len(pairs),flush=True)
print('Rendered',len(pairs),'board-side plots',flush=True)
def render(row):
 if all((IMAGES/f'{row["id"]}-{kind}.png').exists() for kind in ['detail','board']):return row['id']
 bid=row['board_id'];f=row['placement'];side=f['side'];svg=(CACHE/f'{bid}-{side}.svg').read_text();bbox=f['bounds'];size=(1000,700);win=window(bbox,size[0]/size[1],max(1.5,max(bbox[2:])*0.18));im=png(svg,win,size);d=ImageDraw.Draw(im)
 def rect(bounds,win,size):
  x,y,w,h=bounds;a,b,c,e=win
  return [(x-a)*size[0]/c,(y-b)*size[1]/e,(x+w-a)*size[0]/c,(y+h-b)*size[1]/e]
 target=rect(bbox,win,size);d.rectangle(target,outline='#64e6d2',width=2)
 # Scale bar uses the exact plot viewBox, independent of zoom.
 desired=win[2]*.18;p=10**math.floor(math.log10(desired));length=max(v*p for v in [0.1,0.2,0.5,1,2,5] if v*p<=desired);px=length/win[2]*size[0]
 d.rounded_rectangle((14,644,240,686),radius=7,fill='#101a27');d.line((28,668,28+px,668),fill='white',width=3);d.text((40+px,653),f'{length:g} mm',fill='white',font=font)
 im.save(IMAGES/f'{row["id"]}-detail.png',optimize=True)
 ov=Image.open(CACHE/f'{bid}-{side}-overview.png').copy();d=ImageDraw.Draw(ov);r=rect(bbox,overview[(bid,side)],ov.size);cx=(r[0]+r[2])/2;cy=(r[1]+r[3])/2
 r=[min(r[0],cx-7),min(r[1],cy-7),max(r[2],cx+7),max(r[3],cy+7)];d.rectangle(r,outline='#64e6d2',width=4);d.ellipse((cx-4,cy-4,cx+4,cy+4),fill='#64e6d2');ov.save(IMAGES/f'{row["id"]}-board.png',optimize=True)
 return row['id']
with concurrent.futures.ProcessPoolExecutor(max_workers=4,mp_context=multiprocessing.get_context('fork')) as ex:
 for i,r in enumerate(ex.map(render,meta['entries']),1):
  if i%20==0:print('Images ready:',i,'/',len(meta['entries']),flush=True)
print('All images complete',flush=True)

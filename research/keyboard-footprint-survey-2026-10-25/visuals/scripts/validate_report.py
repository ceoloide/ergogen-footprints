from pathlib import Path
import json,hashlib,datetime,collections
from html.parser import HTMLParser
from urllib.parse import unquote,urlparse
from PIL import Image,ImageDraw,ImageFont
from playwright.sync_api import sync_playwright
OUT=Path(__file__).resolve().parents[1];meta=json.loads((OUT/'render-metadata.json').read_text());rows=meta['entries'];assert len(rows)==210 and not meta['errors'],meta['errors']
class Links(HTMLParser):
 def handle_starttag(self,tag,attrs):
  for k,v in attrs:
   if k not in ('href','src') or not v or v.startswith('#') or urlparse(v).scheme:continue
   assert (OUT/unquote(v.split('#')[0])).exists(),v
Links().feed((OUT/'index.html').read_text())
checks=[]
for r in rows:
 for kind,size in [('detail',(1000,700)),('board',(960,600))]:
  p=OUT/'images'/f'{r["id"]}-{kind}.png'
  with Image.open(p) as im:
   assert im.size==size,(str(p),im.size);assert len(im.getcolors(im.width*im.height))>10,str(p)
  checks.append({'file':str(p.relative_to(OUT)),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'size':list(size)})
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/google-chrome',headless=True,args=['--no-sandbox']);page=browser.new_page(viewport={'width':1440,'height':1100},device_scale_factor=1);errors=[];page.on('pageerror',lambda e:errors.append(str(e)));page.goto((OUT/'index.html').as_uri());page.wait_for_load_state('networkidle');assert page.locator('.card').count()==210
 page.screenshot(path=str(OUT/'report-preview.png'))
 page.locator('#search').fill('XIAO');assert page.locator('.card:visible').count()==1
 page.locator('.card:visible .detail').click();assert page.locator('dialog').is_visible();assert page.locator('#large').evaluate('(img)=>img.complete && img.naturalWidth>0');page.locator('#close').click()
 page.locator('#reset').click()
 page.locator('#format').select_option('review');assert page.locator('.card:visible').count()==1
 page.locator('#reset').click();page.locator('#family').select_option('NPTH slotted mounting hole');assert page.locator('.card:visible').count()==1
 page.locator('#reset').click();page.locator('#project').select_option('GEIGEIGEIST/TOTEM');assert page.locator('.card:visible').count()>0
 page.locator('#search').fill('does-not-exist-xyzz');assert page.locator('#empty').is_visible()
 page.locator('#reset').click();page.set_viewport_size({'width':390,'height':844});page.screenshot(path=str(OUT/'report-mobile-preview.png'));assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'), 'Mobile horizontal overflow'
 assert not errors,errors
 browser.close()
selected=['F001','F002','F003','F004','F014','F052','F102','F110','F133','F179','F196','F209','F210','F015','F024','F011']
canvas=Image.new('RGB',(1400,1100),'#f3f2eb');d=ImageDraw.Draw(canvas);font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',14)
for i,id in enumerate(selected):
 r=next(r for r in rows if r['id']==id);im=Image.open(OUT/'images'/f'{id}-detail.png');im.thumbnail((340,238));x=(i%4)*350;y=(i//4)*275;canvas.paste(im,(x,y));d.text((x+5,y+241),id+' '+r['family'][:31],fill='#182c29',font=font)
canvas.save(OUT/'contact-sheet.png')
(OUT/'validation.json').write_text(json.dumps({'checked_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'entries':210,'images':420,'placement_errors':meta['errors'],'checks':['PNG dimensions and nonblank image content','All 210 cards rendered','Search, family, project and format filters','Review-only filter','Image enlargement dialog','Empty-results message','390px mobile viewport without horizontal overflow','No browser JavaScript errors'],'files':checks},indent=2));print('Validated 420 images and report controls; screenshots saved.')

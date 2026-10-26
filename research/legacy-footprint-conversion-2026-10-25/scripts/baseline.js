const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const root = path.resolve(process.argv[2]);
const runtime = path.resolve(process.argv[3]);
const ergogen = require(runtime + '/ergogen');
const yaml = require(runtime + '/js-yaml');
const files = [];
function walk(dir) { for (const name of fs.readdirSync(dir)) {const p = path.join(dir, name);if (fs.statSync(p).isDirectory()) walk(p);else if(name.endsWith('.js') && name !== 'index.js')files.push(p);}}
walk(root + '/backlog'); walk(root + '/ergogen/src/footprints');
(async () => {
 const rows=[];
 for(const file of files) {
  const relative=path.relative(root,file),id=relative.replace(/\.js$/,'').replaceAll('/','__'),fp=require(file);
  const params={};
  for(const [key,value] of Object.entries(fp.params)) {
   if(value===undefined || value?.type==='net')params[key]='TEST_'+key;
   if(key==='mirrored')params[key]=false;
  }
  const definitions=Object.fromEntries(Object.entries(fp.params).map(([k,v])=>[k,v===undefined?{type:'net',required:true}:v]));
  const row={id,source:relative,sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),params:definitions,cases:[]};
  ergogen.inject(id,fp);
  const variants=[['default',{}]];
  if('side' in fp.params)variants.push(['front',{side:'F'}],['back',{side:'B'}]);
  for(const [key,value] of Object.entries(fp.params)) {
   const def=value?.type==='boolean'?value.value:value;
   if(typeof def==='boolean' && key!=='mirrored')variants.push([key+'_on',{[key]:true}],[key+'_off',{[key]:false}]);
  }
  if('reversable_pins' in fp.params)variants.push(['all_pins',{reversable:true,reversable_pins:100}]);
  if('pads' in fp.params)variants.push(['six_pads',{pads:6,label_1:'ONE',label_6:'SIX'}]);
  if('components' in fp.params)variants.push(['six_components',{components:6,label_1:'ONE',label_6:'SIX'}]);
  if('text' in fp.params)variants.push(['label',{text:'PAD',width:2,height:3,align:'right'}]);
  const seen=new Set();
  for(const [name,options] of variants){
   const signature=JSON.stringify(options); if(seen.has(signature))continue;seen.add(signature);
   const config={points:{zones:{origin:{anchor:{shift:[0,0]},columns:{only:{}},rows:{only:{}}}}},pcbs:{test:{template:'kicad5',references:true,footprints:{test:{what:id,where:true,params:{...params,...options}}}}}};
   const dest=path.join(root,'baseline',id,name);fs.mkdirSync(dest,{recursive:true});fs.writeFileSync(dest+'/config.yaml',yaml.safeDump(config));
   const item={name,params:{...params,...options},directory:path.relative(root,dest)};
   try {const result=await ergogen.process(yaml.safeDump(config));fs.writeFileSync(dest+'/original.kicad_pcb',result.pcbs.test);item.generated=true;}catch(e){item.error=e.message;}
   row.cases.push(item);
  }
  rows.push(row);console.log(id,row.cases.filter(c=>c.generated).length+'/'+row.cases.length);
 }
 fs.writeFileSync(root+'/inventory.json',JSON.stringify({runtime:ergogen.version,rows},null,2));
})();

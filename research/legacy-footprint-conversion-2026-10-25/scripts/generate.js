if (process.argv.length < 4) throw new Error('Usage: node generate.js /path/to/node_modules /tmp/output');
const fs=require('fs'),path=require('path');
const runtime=path.resolve(process.argv[2]);
const ergogen=require(runtime+'/ergogen'),yaml=require(runtime+'/js-yaml');
const root=path.resolve(process.argv[3]);
const source=path.resolve(__dirname,'../../..');
(async()=>{
 let rows=[];
 for(const file of require(path.resolve(__dirname,'../manifest.json')).sources.filter(r=>r.disposition==='new').map(r=>r.target)){
  const fp=require(path.join(source,file)),id=file.slice(0,-3);ergogen.inject(id,fp);
  const params={};for(const [key,v] of Object.entries(fp.params)){if(v?.type==='net') params[key]='TEST_'+key;if(key==='mirrored')params[key]=false;}
  let variants=[['default',{}]];
  if('side' in fp.params)variants.push(['front',{side:'F'}],['back',{side:'B'}]);
  for(const [key,v] of Object.entries(fp.params))if(typeof v==='boolean')variants.push([key+'_on',{[key]:true}],[key+'_off',{[key]:false}]);
  if('reversible_rows' in fp.params)variants.push(['all_rows',{reversible:true,reversible_rows:100}],['no_rows',{reversible:true,reversible_rows:0}]);
  if('pads' in fp.params) variants.push(['six_pads',{pads:6,reversible:true,label_1:'One "1"',label_6:'Six'}]);
  if('components' in fp.params) variants.push(['six_components',{components:6,reversible:true,label_1:'One "1"',label_6:'Six'}]);
  if('text' in fp.params)variants.push(['label',{text:'Pad "1"',width:2,height:3}]);
  const all_flags=Object.fromEntries(Object.entries(fp.params).filter(([k,v])=>typeof v==='boolean').map(([k,v])=>[k,true]));
  variants.push(['combined_flags',all_flags]);
  if('pads' in fp.params) variants.push(['capped_count',{pads:100,reversible:true}]);
  if('components' in fp.params) variants.push(['capped_count',{components:100,reversible:true}]);
  const tests=[...variants.map(([name,opts])=>({name,opts,r:0,x:0,y:0})),...[90,27].map(r=>({name:'rotated_'+r,opts:('reversible' in fp.params?{reversible:true}:{}),r,x:43.25,y:-28.75}))];
  for(const t of tests){
   const config={points:{zones:{origin:{anchor:{shift:[t.x,t.y],rotate:t.r},columns:{only:{}},rows:{only:{}}}}},pcbs:{test:{template:'kicad8',references:true,footprints:{test:{what:id,where:true,params:{...params,...t.opts}}}}}};
   const dir=root+'/modern/'+id+'/'+t.name;fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(dir+'/config.yaml',yaml.safeDump(config));
   const row={file,name:t.name,params:{...params,...t.opts},directory:dir,rotation:t.r};
   try{const res=await ergogen.process(yaml.safeDump(config));fs.writeFileSync(dir+'/original.kicad_pcb',res.pcbs.test);row.generated=true;}catch(e){row.error=e.message;console.log(id,t.name,e.message);}
   rows.push(row);
  }
 }
 fs.writeFileSync(root+'/modern.json',JSON.stringify(rows,null,2));console.log(rows.length,rows.filter(r=>r.generated).length);
})();

// Emergency offline preview: reuse the archived Practice 09 React and icon runtime,
// transpile current application sources with TypeScript, and inline archived CSS.
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const base = process.argv[2];
const output = process.argv[3];
const assets = path.join(base,'assets');
const bundle = fs.readFileSync(path.join(assets,fs.readdirSync(assets).find(n=>n.endsWith('.js'))),'utf8');
const boundary = bundle.indexOf(',Kd=1440;');
if(boundary<0) throw Error('Archived runtime marker not found');
const prefix = bundle.slice(0,boundary)+';';
const css = fs.readFileSync(path.join(assets,fs.readdirSync(assets).find(n=>n.endsWith('.css'))),'utf8');
const files=['src/utils/time.ts','src/utils/availability.ts','src/data/roomFixture.ts','src/utils/explanation.ts','src/App.tsx'];
const source = files.map(f=>fs.readFileSync(f,'utf8').replace(/^import\s[\s\S]*?from\s+['"][^'"]+['"];\s*/gm,'').replace(/\bexport\s+(?:default\s+)?/g,'')).join('\n');
const result = ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.React,module:ts.ModuleKind.None},reportDiagnostics:true});
if(result.diagnostics.some(d=>d.category===ts.DiagnosticCategory.Error)) throw Error('Transpilation failed');
const app='(()=>{const React=ae; const {useMemo,useState}=React; const Building2=$d,CalendarDays=Ad,CheckCircle2=Vd,XCircle=Bd,Clock=Hd,LockOpen=Wd,Lock=Qd;'+result.outputText+'\noc(document.getElementById("root")).render(React.createElement(React.StrictMode,null,React.createElement(App)));})();';
fs.writeFileSync(output,'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Smart Campus Room Availability Checker</title><style>'+css+'</style></head><body><div id="root"></div><script>'+prefix+app+'</script></body></html>');

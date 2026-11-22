// Rebuild the one-file offline mock from current source and the archived Practice 11
// browser-only React/icon/CSS runtime already embedded in this HTML. This is NOT
// a substitute for a normal npm/Vite production build.
const fs = require('node:fs');
const path = require('node:path');
let ts;
try { ts = require('typescript'); }
catch {
  // Fallback only for educational environments with a global TypeScript install.
  ts = require(path.join(path.dirname(process.execPath), '../lib/node_modules/typescript'));
}
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'smart-campus-preview.html');
const oldHtml = fs.readFileSync(output, 'utf8');
const boundary = oldHtml.indexOf('(()=>{const React=ae;');
if (boundary < 0 || !oldHtml.includes('oc(document.getElementById("root"))')) {
  throw new Error('The bundled Practice 11 browser runtime was not found: cannot rebuild safely.');
}
const files = [
  'src/utils/time.ts',
  'src/utils/availability.ts',
  'src/data/roomFixture.ts',
  'src/utils/explanation.ts',
  'src/App.tsx',
];
const source = files.map(f => fs.readFileSync(path.join(root, f), 'utf8')
  .replace(/^import\s[\s\S]*?from\s+['"][^'"]+['"];\s*/gm, '')
  .replace(/\bexport\s+(?:default\s+)?/g, '')
).join('\n');
const result = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.React, module: ts.ModuleKind.None },
  reportDiagnostics: true,
});
const errors = result.diagnostics?.filter(d => d.category === ts.DiagnosticCategory.Error) || [];
if (errors.length) throw new Error(`TypeScript transpilation had ${errors.length} errors.`);
const wrapper = '(()=>{const React=ae; const {useMemo,useState}=React; const Building2=$d,CalendarDays=Ad,CheckCircle2=Vd,XCircle=Bd,Clock=Hd,LockOpen=Wd,Lock=Qd;'
  + result.outputText
  + '\noc(document.getElementById("root")).render(React.createElement(React.StrictMode,null,React.createElement(App)));})();';
const html = oldHtml.slice(0, boundary) + wrapper + '</script></body></html>';
fs.writeFileSync(output, html);
console.log(`Rebuilt offline preview from ${files.length} current source modules: ${html.length} bytes`);

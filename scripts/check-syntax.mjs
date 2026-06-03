import fs from 'fs';
import path from 'path';
import ts from 'typescript';
const root = path.resolve(new URL('..', import.meta.url).pathname);
const files = [];
function walk(dir){ for (const name of fs.readdirSync(dir)){ if (['node_modules', '.npm-cache', 'dist'].includes(name)) continue; const full = path.join(dir,name); const stat = fs.statSync(full); if(stat.isDirectory()) walk(full); else if(/\.tsx?$/.test(full)) files.push(full); }}
walk(root);
let failed = false;
for (const file of files){
  const code = fs.readFileSync(file,'utf8');
  const result = ts.transpileModule(code,{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020},reportDiagnostics:true});
  const errors = (result.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error);
  if(errors.length){ failed = true; console.log(file); for(const e of errors) console.log(ts.flattenDiagnosticMessageText(e.messageText,'\n')); }
}
if(failed) process.exit(1);
console.log('syntax check passed for '+files.length+' TypeScript files');

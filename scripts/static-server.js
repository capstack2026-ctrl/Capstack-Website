const { createReadStream, existsSync, statSync } = require('node:fs');
const { createServer } = require('node:http');
const { extname, join, normalize, resolve, sep } = require('node:path');

const root = resolve(__dirname, '..');
const port = Number(process.env.PORT || 3000);
const types = { '.css': 'text/css', '.html': 'text/html', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon' };
const sendFile = (response, file, status = 200) => { response.writeHead(status, { 'Content-Type': `${types[extname(file).toLowerCase()] || 'application/octet-stream'}; charset=utf-8` }); createReadStream(file).pipe(response); };

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const requested = resolve(root, `.${normalize(pathname)}`);
  if (requested !== root && !requested.startsWith(`${root}${sep}`)) { response.writeHead(403); response.end('Forbidden'); return; }
  const file = existsSync(requested) && statSync(requested).isDirectory() ? join(requested, 'index.html') : requested;
  if (existsSync(file) && statSync(file).isFile()) { sendFile(response, file); return; }
  if (extname(pathname)) { response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); response.end('Not found'); return; }
  sendFile(response, join(root, '404.html'), 404);
}).listen(port, () => console.log(`CAPSTACK static server: http://localhost:${port}`));

import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";
import process from "node:process";
import { fileURLToPath, URL } from "node:url";

const HOST = "127.0.0.1";
const PORT = Number.parseInt(process.env.PORT ?? "5500", 10);
const WEB_ROOT = resolve(fileURLToPath(new URL("../web-app/", import.meta.url)));
const CONTENT_TYPES = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"]
]);

function resolveRequestPath(requestUrl) {
  const url = new URL(requestUrl ?? "/", `http://${HOST}:${PORT}`);
  const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const filePath = resolve(WEB_ROOT, `.${pathname}`);
  return filePath.startsWith(`${WEB_ROOT}${sep}`) ? filePath : undefined;
}

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end("Method not allowed");
    return;
  }

  let filePath;
  try {
    filePath = resolveRequestPath(request.url);
  } catch (_error) {
    response.writeHead(400);
    response.end("Bad request");
    return;
  }

  if (!filePath) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const fileInfo = await stat(filePath);
    if (!fileInfo.isFile()) throw new Error("Not a file");
    const contentType =
      CONTENT_TYPES.get(extname(filePath).toLowerCase()) ?? "application/octet-stream";

    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type": contentType
    });
    if (request.method === "HEAD") {
      response.end();
      return;
    }
    createReadStream(filePath).pipe(response);
  } catch (_error) {
    response.writeHead(404);
    response.end("Not found");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Realmline is running at http://${HOST}:${PORT}/index.html`);
});

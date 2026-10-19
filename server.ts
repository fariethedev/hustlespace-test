import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import * as fs from "node:fs";
import * as path from "node:path";
import { URL } from "node:url";

const PORT = Number(process.env.PORT || 4173);
const ROOT = path.resolve(__dirname, "..");

type Listing = {
  title: string;
  maker: string;
  category: "Services" | "Goods" | "Events";
  price: string;
  description: string;
  symbol: string;
  visual: string;
};

// Fictional catalog data only. This server deliberately has no database,
// authentication, cookies, request logging, uploads, or write endpoints.
const LISTINGS: Listing[] = [
  { title: "Brand moodboard", maker: "Studio Sol", category: "Services", price: "€85", description: "A bright visual direction for your next small idea.", symbol: "✷", visual: "visual-1" },
  { title: "Hand-thrown cups", maker: "Marta Clay", category: "Goods", price: "€28", description: "Small-batch ceramics with a little bit of wobble.", symbol: "◒", visual: "visual-2" },
  { title: "Night drawing club", maker: "The Blue Room", category: "Events", price: "€12", description: "A relaxed evening of prompts, music, and making.", symbol: "✎", visual: "visual-3" },
  { title: "Portrait session", maker: "Ari Frame", category: "Services", price: "€120", description: "Natural portraits for people building something new.", symbol: "◉", visual: "visual-4" },
  { title: "Printed tote set", maker: "Common Thread", category: "Goods", price: "€19", description: "Two screen-printed totes for everyday errands.", symbol: "▱", visual: "visual-5" },
  { title: "Sunday supper", maker: "Nia Cooks", category: "Events", price: "€35", description: "A fictional shared table with a seasonal menu.", symbol: "✺", visual: "visual-6" },
];

function sendJson(res: ServerResponse, status: number, value: unknown): void {
  const body = JSON.stringify(value);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store",
  });
  res.end(body);
}

function serveStatic(res: ServerResponse, pathname: string): void {
  const requested = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.resolve(ROOT, `.${requested}`);
  if (!filePath.startsWith(ROOT + path.sep)) {
    sendJson(res, 403, { error: "Forbidden" });
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      sendJson(res, 404, { error: "Not found" });
      return;
    }
    const contentTypes: Record<string, string> = { ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".html": "text/html; charset=utf-8" };
    res.writeHead(200, { "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream" });
    res.end(data);
  });
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const url = new URL(req.url ?? "/", `http://${req.headers.host || "localhost"}`);

  if (url.pathname.startsWith("/api/")) {
    if (req.method !== "GET") {
      req.resume();
      sendJson(res, 405, { error: "This review prototype has no write API." });
      return;
    }
    if (url.pathname === "/api/health") {
      sendJson(res, 200, { ok: true, mode: "fictional-demo", persistence: false });
      return;
    }
    if (url.pathname === "/api/categories") {
      sendJson(res, 200, ["All", "Services", "Goods", "Events"]);
      return;
    }
    if (url.pathname === "/api/listings") {
      sendJson(res, 200, LISTINGS);
      return;
    }
    sendJson(res, 404, { error: "Unknown demo endpoint" });
    return;
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    req.resume();
    sendJson(res, 405, { error: "Only read-only demo pages are available." });
    return;
  }
  serveStatic(res, url.pathname);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`HustleUP Test mock backend: http://127.0.0.1:${PORT}`);
});

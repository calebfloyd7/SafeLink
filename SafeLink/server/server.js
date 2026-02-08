import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

function lexicalUrlScore(rawUrl) {
  // Normalize inside the scorer so it always works
  let input = String(rawUrl || "").trim();
  if (input && !/^https?:\/\//i.test(input)) input = "https://" + input;

  let u;
  try {
    u = new URL(input);
  } catch {
    return { score: 0, reasons: ["invalid_url"] };
  }


  let score = 0;
  const reasons = [];

  const host = u.hostname.toLowerCase();
  const full = input.toLowerCase();
  const pathQuery = (u.pathname + " " + u.search).toLowerCase();

  // http vs https
  if (u.protocol === "http:") {
    score += 10;
    reasons.push("http_not_https");
  }

  // IP address host
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) {
    score += 25;
    reasons.push("ip_address_host");
  }

  // Punycode
  if (host.includes("xn--")) {
    score += 30;
    reasons.push("punycode_host");
  }

  // Subdomains
  const labels = host.split(".");
  if (labels.length >= 5) {
    score += 15;
    reasons.push("many_subdomains");
  }

  // Hyphens + length
  const hyphens = (host.match(/-/g) || []).length;
  if (hyphens >= 3) {
    score += 10;
    reasons.push("many_hyphens");
  }

  if (host.length >= 35) {
    score += 10;
    reasons.push("long_host");
  }

  // @ trick
  if (full.includes("@")) {
    score += 40;
    reasons.push("contains_at_symbol");
  }

  // URL length
  if (rawUrl.length >= 100) {
    score += 10;
    reasons.push("long_url");
  }
  if (rawUrl.length >= 160) {
    score += 20;
    reasons.push("very_long_url");
  }

  // Keywords
  const keywords = [
    "login","signin","verify","security","update",
    "reset","password","billing","account",
    "unlock","confirm","wallet"
  ];

  // Check keywords in host and path+query.
  for (const k of keywords) {
    if (host.includes(k)) {
      score += 15;
      reasons.push(`keyword_in_host:${k}`);
    } else if (pathQuery.includes(k)) {
      score += 8;
      reasons.push(`keyword_in_path:${k}`);
    }
  }

  // Redirect params
  const redirectParams = new Set(["redirect","url","next","continue","return","dest"]);
  for (const [k] of u.searchParams.entries()) {
    if (redirectParams.has(k.toLowerCase())) {
      score += 15;
      reasons.push(`redirect_param:${k.toLowerCase()}`);
    }
  }

  return {
    score: Math.min(score, 100),
    reasons
  };
}

// Load environment variables from .env file.
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/scan", (req, res) => {
  const { url } = req.body;

  // Normalize input so URL() doesn't fail if user forgot https://
  let input = (url || "").trim();
  if (input && !/^https?:\/\//i.test(input)) {
    input = "https://" + input;
  }

  const lexical = lexicalUrlScore(input);

  const risk =
    lexical.score >= 70 ? "High" :
    lexical.score >= 30 ? "Medium" :
    "Low";

    return res.json({
    originalUrl: url,
    normalizedUrl: String(url || "").trim().match(/^https?:\/\//i)
      ? String(url || "").trim()
        : "https://" + String(url || "").trim(),
    score: lexical.score,
    risk,
    reasons: lexical.reasons
  });
});



app.listen(3000, () => {
    console.log("Server running on port 3000");
});
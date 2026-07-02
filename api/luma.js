const LUMA_KEY = "luma-api-c81OFScGkVsMajg-Cg1wtwCC1ZF6wzwLAP7e7og8qCY";
const BASE = "https://api.lumalabs.ai/dream-machine/v1/generations";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const isGet = req.method === "GET";
    const genId = req.query?.id;

    const url = isGet ? `${BASE}/${genId}` : BASE;

    const fetchOpts = {
      method: isGet ? "GET" : "POST",
      headers: {
        "Authorization": `Bearer ${LUMA_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    };

    if (!isGet) {
      fetchOpts.body = JSON.stringify(req.body);
    }

    const lumaRes = await fetch(url, fetchOpts);
    const data = await lumaRes.json();

    return res.status(lumaRes.status).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
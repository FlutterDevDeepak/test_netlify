export default async (request, context) => {
  const ua = request.headers.get("user-agent") || "";
  const TARGET = "https://influbot.ai/joypareek";
  const SAFARI_TARGET = TARGET.replace("https://", "x-safari-https://");

  const isInstagram = ua.includes("Instagram");
  const isFB = ua.includes("FBAN") || ua.includes("FBAV");
  const isIOS = /iphone|ipad|ipod/i.test(ua);
  const isAndroid = /android/i.test(ua);
  const isInApp = isInstagram || isFB || ua.includes("TikTok");

  if (isAndroid && isInApp) {
    const intentUrl = `intent://influbot.ai/joypareek#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(TARGET)};end`;
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
    <script>window.location.href = "${intentUrl}";<\/script>
    </head><body><a href="${intentUrl}">Tap to open</a></body></html>`;
    return new Response(html, { headers: { "Content-Type": "text/html" }});
  }

  if (isIOS && isInApp) {
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>influbot.ai</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      font-family: -apple-system, sans-serif;
      background: linear-gradient(135deg, #667eea, #764ba2);
      min-height: 100vh;
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
    }
    .card {
      background: white; border-radius: 24px; padding: 40px 24px;
      max-width: 320px; width: 100%; text-align: center;
    }
    h1 { font-size: 20px; color: #111; margin-bottom: 8px; }
    p { color: #888; font-size: 14px; margin-bottom: 28px; }
    a.btn {
      display: block;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white; border-radius: 14px;
      padding: 16px; font-size: 16px; font-weight: 600;
      text-decoration: none;
    }
  </style>
</head>
<body>
<div class="card">
  <h1>🤖 influbot.ai</h1>
  <p>Tap below to open in Safari</p>
  <a class="btn" href="${SAFARI_TARGET}" id="btn">Open in Safari</a>
</div>
<script>
  // x-safari-https:// is the correct iOS URL scheme to force open Safari
  window.location.href = "${SAFARI_TARGET}";
</script>
</body>
</html>`;
    return new Response(html, { headers: { "Content-Type": "text/html" }});
  }

  return Response.redirect(TARGET, 302);
};

export const config = { path: "/" };
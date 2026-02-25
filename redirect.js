export default async (request, context) => {
  const ua = request.headers.get("user-agent") || "";
  const TARGET = "https://influbot.ai/joypareek";

  const isInstagram = ua.includes("Instagram");
  const isFB = ua.includes("FBAN") || ua.includes("FBAV");
  const isIOS = /iphone|ipad|ipod/i.test(ua);
  const isAndroid = /android/i.test(ua);
  const isInApp = isInstagram || isFB || ua.includes("TikTok");

  // Android in-app: serve a page that uses intent URL
  if (isAndroid && isInApp) {
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
    <title>Opening...</title></head><body>
    <script>
      window.location.href = "intent://influbot.ai/joypareek#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(TARGET)};end";
    </script>
    <p><a href="${TARGET}">Tap here to open</a></p>
    </body></html>`;
    return new Response(html, {
      headers: { "Content-Type": "text/html" }
    });
  }

  // iOS in-app: serve as attachment — forces iOS out of webview into Safari
  if (isIOS && isInApp) {
    const html = `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"/>
    <meta http-equiv="refresh" content="0;url=${TARGET}"/>
    <title>Opening...</title></head>
    <body>
    <p>Opening <a href="${TARGET}">influbot.ai</a>...</p>
    </body></html>`;
    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": 'attachment; filename="open.html"',
      }
    });
  }

  // Everyone else: just redirect directly
  return Response.redirect(TARGET, 302);
};

export const config = { path: "/" };

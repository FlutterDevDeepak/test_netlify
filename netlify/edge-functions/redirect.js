export default async (request, context) => {
  const ua = request.headers.get("user-agent") || "";
  const TARGET = "https://influbot.ai/joypareek";

  const isInstagram = ua.includes("Instagram");
  const isFB = ua.includes("FBAN") || ua.includes("FBAV");
  const isIOS = /iphone|ipad|ipod/i.test(ua);
  const isAndroid = /android/i.test(ua);
  const isInApp = isInstagram || isFB || ua.includes("TikTok");

  // Android in-app: intent URL opens Chrome directly
  if (isAndroid && isInApp) {
    const intentUrl = `intent://influbot.ai/joypareek#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(TARGET)};end`;
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
    <title>Opening...</title>
    <script>window.location.href = "${intentUrl}";<\/script>
    </head><body><a href="${intentUrl}">Tap to open</a></body></html>`;
    return new Response(html, {
      headers: { "Content-Type": "text/html" }
    });
  }

  // iOS in-app: serve as PDF — iOS cannot open PDF in Instagram webview
  // so it hands off to Safari which then follows the meta refresh
  if (isIOS && isInApp) {
    // Redirect to a /go path which serves the PDF trick
    return Response.redirect(new URL("/go", request.url).toString(), 302);
  }

  // Everyone else: direct redirect
  return Response.redirect(TARGET, 302);
};

export const config = { path: "/" };
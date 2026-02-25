export default async (request, context) => {
  const TARGET = "https://influbot.ai/joypareek";
  const ua = request.headers.get("user-agent") || "";
  const isIOS = /iphone|ipad|ipod/i.test(ua);

  if (isIOS) {
    const html = `<!DOCTYPE html><html><head>
    <meta charset="UTF-8"/>
    <meta http-equiv="refresh" content="0;url=${TARGET}"/>
    <title>Redirecting...</title>
    </head><body>
    <p>Opening <a href="${TARGET}">influbot.ai</a>...</p>
    </body></html>`;

    return new Response(html, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": 'attachment; filename="open.html"',
        "X-Content-Type-Options": "nosniff",
      }
    });
  }

  return Response.redirect(TARGET, 302);
};

export const config = { path: "/go" };
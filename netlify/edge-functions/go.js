export default async (request, context) => {
  const url = new URL(request.url);
  const username = url.pathname.split("/go/")[1];

  const target = `https://redirecttestnew.netlify.app/${username}`;
  const ua = request.headers.get("user-agent") || "";

  const isInstagram = ua.includes("Instagram");

  if (!isInstagram) {
    return Response.redirect(target, 302);
  }

  // Instagram detected → serve gateway HTML
  return new Response(`
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Opening...</title>
    <style>
      body {
        margin:0;
        height:100vh;
        display:flex;
        align-items:center;
        justify-content:center;
        font-family:sans-serif;
        text-align:center;
      }
      button {
        margin-top:20px;
        padding:15px 25px;
        font-size:16px;
        border-radius:8px;
        border:none;
        background:black;
        color:white;
      }
    </style>
  </head>
  <body>

  <div>
    <h2>Tap to Continue</h2>
    <button onclick="openNow()">Open Chat</button>
  </div>

  <script>
    const TARGET = "${target}";

    function openNow() {
      const ua = navigator.userAgent;

      if (/iPhone|iPad|iPod/i.test(ua)) {
        window.location = "x-safari-" + TARGET;
        setTimeout(() => {
          window.open(TARGET, "_blank");
        }, 800);
      } 
      else if (/Android/i.test(ua)) {
        const clean = TARGET.replace("https://", "");
        window.location =
          "intent://" +
          clean +
          "#Intent;scheme=https;package=com.android.chrome;end";
      }
      else {
        window.location = TARGET;
      }
    }

    document.body.addEventListener("click", function handler(){
      openNow();
      document.body.removeEventListener("click", handler);
    });
  </script>

  </body>
  </html>
  `, {
    headers: { "content-type": "text/html" }
  });
};
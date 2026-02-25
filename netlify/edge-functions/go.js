export default async (request, context) => {
  const TARGET = "https://influbot.ai/joypareek";
  const ua = request.headers.get("user-agent") || "";
  const isIOS = /iphone|ipad|ipod/i.test(ua);

  if (isIOS) {
    // Serve as a calendar file — iOS hands .ics to Calendar app
    // which breaks out of Instagram webview completely
    // The URL field in the event opens in Safari
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//influbot//redirect//EN",
      "BEGIN:VEVENT",
      "DTSTART:20260101T000000Z",
      "DTEND:20260101T010000Z",
      "SUMMARY:Open influbot.ai",
      "URL:" + TARGET,
      "DESCRIPTION:" + TARGET,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    return new Response(ics, {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": 'attachment; filename="open.ics"',
      }
    });
  }

  return Response.redirect(TARGET, 302);
};

export const config = { path: "/go" };
const fetch = require("node-fetch");

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  if (body.message && body.message.text === "/start") {

    const chatId = body.message.chat.id;

    await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: "Tap below to open secure page:",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Open Secure Page",
                url: "https://influbot.ai/joypareek"
              }
            ]
          ]
        }
      })
    });
  }

  return {
    statusCode: 200,
    body: "ok"
  };
};
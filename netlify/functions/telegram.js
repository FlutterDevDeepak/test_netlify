exports.handler = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 200,
        body: "No body"
      };
    }

    const data = JSON.parse(event.body);

    if (data.message && data.message.text === "/start") {

      const chatId = data.message.chat.id;

      await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
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

  } catch (error) {
    return {
      statusCode: 200,
      body: "Error: " + error.message
    };
  }
};
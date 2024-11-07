const axios = require("axios");

// Replace with your bot token from BotFather
const token = process.env.TELEGRAM_API_TOKEN;

// Construct the URL to make the request
const url = `https://api.telegram.org/bot${token}/getChatMemberCount?chat_id={channelName}`;

export async function getSubscriberCount(channelName: string) {
  try {
    // Send the GET request to Telegram Bot API
    const response = await axios.get(
      url.replace("{channelName}", `@${channelName}`)
    );

    // Check if the response is successful
    if (response.data.ok) {
      const subscriberCount = response.data.result;
      console.log(`Subscriber count: ${subscriberCount}`);
      return subscriberCount;
    } else {
      console.log("Error:", response.data.description);
      return 0;
    }
  } catch (error) {
    console.error("Error fetching subscriber count:", error);
    return 0;
  }
}

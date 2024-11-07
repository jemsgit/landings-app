import path from "path";
import { Api } from "telegram";
import { getTelegramClient } from "./telegram-client";
import fs from "fs";

export async function fetchLastPostsFromTelegram(
  channelUsername: string,
  limit = 6
) {
  const client = await getTelegramClient();

  try {
    const entity = await client.getEntity(channelUsername);

    const messages = await client.getMessages(entity, { limit });

    let posts = [];
    const mediaDir = path.join(process.cwd(), "public/media", channelUsername);

    if (!fs.existsSync(mediaDir)) {
      fs.mkdirSync(mediaDir, { recursive: true });
    }

    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];

      let mediaUrls = [];
      if (msg.media) {
        mediaUrls = [];

        // Check if the media is a photo
        if (msg.media instanceof Api.MessageMediaPhoto) {
          const fileName = `media_${i}.jpg`;
          const filePath = path.join(mediaDir, fileName);
          await client.downloadMedia(msg.media, {
            thumb: 1,
            outputFile: filePath,
          });

          mediaUrls.push(path.join("/media", channelUsername, fileName));
        }
      }

      posts.push({
        text: msg.message,
        date: new Date(msg.date * 1000).toLocaleDateString(),
        media: mediaUrls,
      });
    }

    return posts;
  } catch (error) {
    console.error("Error fetching posts from Telegram:", error);
    return [];
  }
}

export async function fetchChannelInfo(channelUsername: string) {
  const client = await getTelegramClient();

  try {
    const entity = (await client.getEntity(channelUsername)) as Api.Channel;

    const mediaDir = path.join(process.cwd(), "public/media", channelUsername);

    if (!fs.existsSync(mediaDir)) {
      fs.mkdirSync(mediaDir, { recursive: true });
    }

    const avatarFilePath = path.join(
      process.cwd(),
      "public/media",
      channelUsername,
      "avatar.jpg"
    );

    await client.downloadProfilePhoto(entity, {
      outputFile: avatarFilePath,
    });

    return {
      title: entity.title,
      username: entity.username,
      avatarUrl: path.join("/media", channelUsername, "avatar.jpg"),
    };
  } catch (error) {
    console.error("Error fetching channel info:", error);
    return null;
  }
}

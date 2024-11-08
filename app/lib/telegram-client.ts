// telegramClient.ts

import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";

const apiId = parseInt(process.env.API_ID as string);
const apiHash = process.env.API_HASH as string;
const apiSession = process.env.API_SESSION as string;
const stringSession = new StringSession(apiSession);

let client: TelegramClient | null = new TelegramClient(
  stringSession,
  apiId,
  apiHash,
  {
    connectionRetries: 5,
  }
);

export async function getTelegramClient() {
  if (!client) {
    client = new TelegramClient(stringSession, apiId, apiHash, {
      connectionRetries: 5,
    });
  }

  if (!client.connected) {
    await client.start({
      phoneNumber: async () => {
        throw new Error("Phone number is required.");
      },
      password: async () => {
        throw new Error("Password is required.");
      },
      phoneCode: async () => {
        throw new Error("Phone code is required.");
      },
      onError: (err) => console.error("Telegram Client Error:", err),
    });
  }

  return client;
}

/**
 * Send messages and images via node-telegram-bot-api.
 */

import TelegramBot, {
  type SendMessageOptions,
  type SendPhotoOptions,
} from "node-telegram-bot-api";

/**
 * Send a text message.
 */
export async function sendMessage(
  botToken: string,
  chatId: string,
  text: string,
  _attachmentUrl?: string,
): Promise<void> {
  const bot = new TelegramBot(botToken, { polling: false });

  const opts: SendMessageOptions = {
    parse_mode: "HTML",
    disable_web_page_preview: true,
  };

  await bot.sendMessage(chatId, text, opts);
}

export async function sendScheduleImage(
  botToken: string,
  chatId: string,
  caption: string,
  imageBuffer: Buffer,
): Promise<void> {
  const bot = new TelegramBot(botToken, { polling: false });

  const opts: SendPhotoOptions = {
    caption,
    parse_mode: "HTML",
  };

  const fileOptions = {
    filename: "schedule.png",
    contentType: "image/png",
  };

  await bot.sendPhoto(chatId, imageBuffer, opts, fileOptions);
}

import "./telegram-env";
import {
  loadOldSchedule,
  loadSchedule,
  loadScheduleImageBuffer,
  saveNewState,
} from "./loe";
import { sendScheduleImage } from "./telegram";

async function main() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN as string;
  const chatId = process.env.TELEGRAM_CHAT_ID as string;

  const schedule = await loadSchedule();
  const oldSchedule = await loadOldSchedule();

  let scheduleChanged = false;

  if (schedule.Today != "" && schedule.Today != oldSchedule.Today) {
    const imageBuffer = await loadScheduleImageBuffer(schedule.Today);
    await sendScheduleImage(
      botToken,
      chatId,
      "Оновлений графік на сьогодні",
      imageBuffer,
    );
    scheduleChanged = true;

    console.log("Schedule changed for today");
  }

  if (schedule.Tomorrow != "" && schedule.Tomorrow != oldSchedule.Tomorrow) {
    const imageBuffer = await loadScheduleImageBuffer(schedule.Tomorrow);
    await sendScheduleImage(
      botToken,
      chatId,
      "Оновлений графік на завтра",
      imageBuffer,
    );
    scheduleChanged = true;

    console.log("Schedule changed for tomorrow");
  }

  if (scheduleChanged) {
    await saveNewState(schedule);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

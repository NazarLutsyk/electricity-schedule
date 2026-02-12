# electricity-schedule

Checks the Lviv electricity schedule and sends new Today/Tomorrow images to Telegram when they change.

## Setup

Install dependencies:

```bash
bun install
```

Configure environment (see `.env.example`):

- `TELEGRAM_BOT_TOKEN` – Telegram bot token
- `TELEGRAM_CHAT_ID` – Chat ID to send messages to

Run locally:

```bash
bun run start
```

State is stored in `state.json` so the script only sends when the schedule actually changes.

## GitHub Actions (cron)

A workflow runs every 10 minutes, persists state in the repo, and only commits when `state.json` changes.

1. Add repository secrets:
   - **TELEGRAM_BOT_TOKEN** – your bot token
   - **TELEGRAM_CHAT_ID** – target chat ID

2. Ensure `state.json` is committed (it is not in `.gitignore`) so the workflow has initial state. If missing, the first run will create it and push it.

3. The workflow is in `.github/workflows/schedule.yml`. You can also trigger it manually via **Actions → Schedule check → Run workflow**.

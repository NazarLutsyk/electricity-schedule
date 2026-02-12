/**
 * Set before loading node-telegram-bot-api so its file-sending behavior
 * uses the new defaults and deprecation warnings are not shown.
 */
process.env.NTBA_FIX_350 = "1";

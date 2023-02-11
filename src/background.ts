import browser from "webextension-polyfill";
import { type ExtensionMessage } from "./types";

function isValidMessage(message: unknown): message is ExtensionMessage {
  return message instanceof Object && "type" in message && "value" in message;
}

browser.runtime.onMessage.addListener(async (message, sender) => {
  if (!isValidMessage(message)) return;

  if (message.type === "setBadgeText") {
    browser.action.setBadgeBackgroundColor({ color: "#C1133D" });
    browser.action.setBadgeText({
      tabId: sender.tab?.id,
      text: message.value,
    });
  }

  return true;
});

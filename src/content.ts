import browser from "webextension-polyfill";
import { type ExtensionMessage } from "./types";

const walker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_TEXT,
  (node) =>
    node.textContent ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
);

let replaced = 0;

while (walker.nextNode()) {
  walker.currentNode.textContent = walker.currentNode.textContent!.replace(
    /ohio/gi,
    () => {
      replaced++;
      return "****";
    }
  );
}

if (replaced > 0) {
  browser.runtime.sendMessage({
    type: "setBadgeText",
    value: replaced.toString(),
  } satisfies ExtensionMessage);
}

import browser from "webextension-polyfill";
import { type ExtensionMessage } from "./types";

const ohioRegex = /ohio/gi;

function censor(node: Node) {
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, (node) =>
    node.textContent ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
  );

  let replaced = 0;

  while (walker.nextNode()) {
    walker.currentNode.textContent &&= walker.currentNode.textContent.replace(
      ohioRegex,
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

  browser.storage.local.get("blocked").then(({ blocked }) => {
    browser.storage.local.set({ blocked: (blocked || 0) + replaced });
  });
}

censor(document);

const observer = new MutationObserver((mutationList) => {
  mutationList
    .flatMap(({ addedNodes }) =>
      [...addedNodes].filter(
        ({ textContent }) => textContent && ohioRegex.test(textContent)
      )
    )
    .forEach((node) => {
      censor(node);
    });
});

observer.observe(document, {
  subtree: true,
  childList: true,
});

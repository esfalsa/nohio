const walker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_TEXT,
  (node) =>
    node.textContent ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
);

while (walker.nextNode()) {
  walker.currentNode.textContent = walker.currentNode.textContent!.replace(
    /ohio/gi,
    "****"
  );
}

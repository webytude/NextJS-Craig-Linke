export function renderRichText(node) {
  if (!node) return "";
  if (typeof node === "string") return node;

  if (node.type === "paragraph") {
    return node.children?.map((c, i) => c.text || "").join(" ") || "";
  }

  return "";
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function truncate(text, length = 120) {
  if (!text) return "";
  return text.length > length ? text.slice(0, length) + "…" : text;
}

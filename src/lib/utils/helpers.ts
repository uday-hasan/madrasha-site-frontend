export function formatBanglaDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("bn-BD", options);
}

export function toBanglaNumber(num: number | string): string {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/[0-9]/g, (d) => banglaDigits[parseInt(d)]);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function slugify(text: string): string {
  // Preserves Unicode (Bangla) characters while replacing spaces and special punctuation
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "")
    .replace(/--+/g, "-")
    .trim();
}

export function generateMetaDescription(content: string, length = 155): string {
  const stripped = content.replace(/[#*_]/g, "");
  return truncateText(stripped, length);
}

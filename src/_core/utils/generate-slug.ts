export function generateSlug(title: string, withSlug: boolean = true): string {
  const cleaned = title
    .replace(/[(){}[\],.]+/g, "")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .toLowerCase();

  const slug = cleaned.trim().replace(/\s+/g, "-").replace(/-+/g, "-");

  if (withSlug) {
    const hash = Math.random().toString(36).substring(2, 6);

    return `${slug}-${hash}`;
  }

  return slug;
}

export function cleanParams<T extends object>(obj?: T): Partial<T> {
  if (!obj) return {};

  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) =>
        value !== undefined &&
        value !== null &&
        !(typeof value === "string" && value.trim() === "")
    )
  ) as Partial<T>;
}
export function generateUniqueId(): string {
  const randomPart = Math.random().toString(36).substring(2, 8);
  const timestampPart = Date.now().toString(36).substring(4);
  return randomPart + timestampPart;
}

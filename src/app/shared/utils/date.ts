/** "2026-10-01" → "01/10/2026". No usa Date para evitar corrimientos por zona horaria. */
export function formatIsoDate(iso: string): string {
  const [year, month, day] = iso.split('-');
  return `${day}/${month}/${year}`;
}

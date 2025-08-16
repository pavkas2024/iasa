export default function parseDate(dateStr?: string): number {
    if (!dateStr) return 0;
    const [day, month, year] = dateStr.split('.').map(Number);
    return new Date(year, month - 1, day).getTime(); // month - 1 бо JS рахує місяці з 0
  }
  
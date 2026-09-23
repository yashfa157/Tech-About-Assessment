export function formatPKR(amount: number) {
  const formatted = new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 0,
  }).format(amount);

  return `PKR ${formatted}`;
}

export function formatTime(date: string) {
  const match = date.match(/T(\d{2}):(\d{2}).*([+-]\d{2}:\d{2})$/);

  if (!match) {
    return date;
  }

  const [, hour, minute, offset] = match;

  const formattedTime = new Intl.DateTimeFormat("en-PK", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  }).format(new Date(Date.UTC(2000, 0, 1, Number(hour), Number(minute))));

  return `${formattedTime} UTC${offset}`;
}

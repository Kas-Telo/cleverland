export const getDateWithTimezone = (date: Date, timezone: number) =>
  new Date(date.setHours(date.getHours() + timezone)).toISOString();

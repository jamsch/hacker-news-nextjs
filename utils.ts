const units: { unit: number; name: Intl.RelativeTimeFormatUnit }[] = [
  { unit: 1, name: "second" },
  { unit: 60, name: "minute" },
  { unit: 60 * 60, name: "hour" },
  { unit: 60 * 60 * 24, name: "day" },
  { unit: 60 * 60 * 24 * 7, name: "week" },
  { unit: 60 * 60 * 24 * 30, name: "month" },
  { unit: 60 * 60 * 24 * 400, name: "year" },
];

export function formatRelativeTime(timestamp: number, reference = new Date().getTime(), language = "en") {
  const delta = Math.round((timestamp * 1000 - reference) / 1000);

  const { unit, name } = (() => {
    for (let i = 1; i < units.length; i++) {
      const unit = units[i];
      if (Math.abs(delta) <= unit.unit) {
        return units[i - 1];
      }
    }
    return units[0];
  })();

  return new Intl.RelativeTimeFormat(language, {
    style: "long",
    numeric: "auto",
  }).format(Math.floor(delta / unit), name);
}

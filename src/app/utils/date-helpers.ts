export const formatDate = (date: Date, locale: string) => {
  return date.toLocaleString(locale, { timeZoneName: 'short' });
};

export const pluralize = (count: number, options: string[]): string => {
  const n = count % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return options[2];
  if (n1 > 1 && n1 < 5) return options[1];
  if (n1 === 1) return options[0];
  return options[2];
};

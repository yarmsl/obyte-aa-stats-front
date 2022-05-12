export const usd = (value: number, fraction = 0): string =>
  value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction,
  });

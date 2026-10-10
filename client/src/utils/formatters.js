// Approximate exchange rates relative to USD (update periodically)
export const EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  CHF: 0.89,
  AED: 3.67,
  INR: 84.10,
};

export const CURRENCY_LOCALES = {
  USD: 'en-US',
  EUR: 'de-DE',
  GBP: 'en-GB',
  CHF: 'de-CH',
  AED: 'ar-AE',
  INR: 'en-IN',
};

export const convertCurrency = (amountInUSD, toCurrency) => {
  const rate = EXCHANGE_RATES[toCurrency] || 1;
  return Math.round(amountInUSD * rate);
};

export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === undefined || amount === null) return '$0';
  const locale = CURRENCY_LOCALES[currency] || 'en-US';
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (e) {
    return `${amount.toLocaleString()}`;
  }
};

export const formatDate = (dateString, options = {}) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const defaultOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  };
  return date.toLocaleDateString('en-US', defaultOptions);
};

export const formatDuration = (minutes) => {
  if (!minutes) return '0h 0m';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const formatPoints = (points) => {
  if (!points) return '0';
  return new Intl.NumberFormat('en-US').format(points);
};

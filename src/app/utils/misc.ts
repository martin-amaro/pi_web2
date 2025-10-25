export const generatePassword = (len: number) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let hash = "";
  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    hash += chars[randomIndex];
  }
  return hash;
};

export const formatCurrency = (amount: number, locale = 'es-CO', currency = 'COP') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
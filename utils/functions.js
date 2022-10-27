export function getCoef(currency, method, platform, data) {
  const coef =
    data[method === "easy" ? 0 : 1].data[platform === "ps4" ? 1 : 0]
      .pricePerCurrencyMap[`${currency}`];
  return coef;
}

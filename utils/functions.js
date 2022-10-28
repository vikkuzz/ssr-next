export function getCoef(currency, method, platform, data) {
  const coef =
    data[method === "easy" ? 0 : 1].data[platform === "ps4" ? 1 : 0]
      .pricePerCurrencyMap[`${currency}`];
  return coef;
}

export function getDiscCoef(currentCoins, currentDisc, coef) {
  let discount = 1;
  let currentCoef;
  for (let i = 0; i < currentDisc.length; i++) {
    if (currentDisc[i].limitSumCoins <= currentCoins) {
      discount = currentDisc[i].discountPercent;
      currentCoef = coef - (coef / 100) * discount;
      break;
    } else {
      currentCoef = coef;
    }
  }
  return currentCoef;
}

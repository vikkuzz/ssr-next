export function getCoef(currency, method, platform, data) {
    const coef =
        data[method === 'easy' ? 0 : 1].data[platform === 'ps4' ? 1 : 0]
            .pricePerCurrencyMap[`${currency}`];
    return coef;
}

export function getDiscCoef(coef, percentDiscount) {
    let currentCoef = 1;

    if (percentDiscount > 1) {
        currentCoef = coef - (coef / 100) * percentDiscount;
    } else {
        currentCoef = coef;
    }

    return currentCoef;
}

export function getDiscount(arr, value) {
    let percentDisc = 1;
    let result = arr.filter((el) => el.limitSumCoins <= value);
    result = result[result.length - 1];
    if (value >= 20000000) {
        percentDisc = 15;
    } else if (value < 800000) {
        percentDisc = 1;
    } else {
        percentDisc = result.discountPercent;
    }
    return percentDisc;
}

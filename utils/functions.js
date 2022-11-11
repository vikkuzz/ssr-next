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
export const getDeliveryTime = (amount, method, platform, short = false) => {
    if (amount >= 1000 && amount <= 299999) {
        if (method === 'easy') {
            if (platform === 'ps4') {
                return {
                    type: `deliveryMinutes${short ? 'Short' : ''}`,
                    time: ['15', '30'],
                };
            } else if (platform === 'xbox') {
                return {
                    type: `deliveryMinutes${short ? 'Short' : ''}`,
                    time: ['15', '30'],
                };
            }
        } else if (method === 'manual') {
            if (platform === 'ps4') {
                return {
                    type: `deliveryMinutes${short ? 'Short' : ''}`,
                    time: ['25', '35'],
                };
            } else if (platform === 'xbox') {
                return {
                    type: `deliveryMinutes${short ? 'Short' : ''}`,
                    time: ['25', '35'],
                };
            }
        }
    } else if (amount >= 300000 && amount <= 799999) {
        if (method === 'easy') {
            if (platform === 'ps4') {
                return {
                    type: `deliveryMinutes${short ? 'Short' : ''}`,
                    time: ['30', '50'],
                };
            } else if (platform === 'xbox') {
                return {
                    type: `deliveryMinutes${short ? 'Short' : ''}`,
                    time: ['30', '50'],
                };
            }
        } else if (method === 'manual') {
            if (platform === 'ps4') {
                return {
                    type: `deliveryMinutes${short ? 'Short' : ''}`,
                    time: ['35', '55'],
                };
            } else if (platform === 'xbox') {
                return {
                    type: `deliveryMinutes${short ? 'Short' : ''}`,
                    time: ['35', '55'],
                };
            }
        }
    } else if (amount >= 800000 && amount <= 1499999) {
        if (method === 'easy') {
            if (platform === 'ps4') {
                return {
                    type: `deliveryMinutes${short ? 'Short' : ''}`,
                    time: ['50', '80'],
                };
            } else if (platform === 'xbox') {
                return {
                    type: `deliveryMinutes${short ? 'Short' : ''}`,
                    time: ['50', '80'],
                };
            }
        } else if (method === 'manual') {
            if (platform === 'ps4') {
                return {
                    type: `deliveryHours${short ? 'Short' : ''}`,
                    time: ['1', '1.5'],
                };
            } else if (platform === 'xbox') {
                return {
                    type: `deliveryHours${short ? 'Short' : ''}`,
                    time: ['1', '1.5'],
                };
            }
        }
    } else if (amount >= 1500000 && amount <= 2999999) {
        if (method === 'easy') {
            if (platform === 'ps4') {
                return {
                    type: `deliveryHours${short ? 'Short' : ''}`,
                    time: ['1.5', '3'],
                };
            } else if (platform === 'xbox') {
                return {
                    type: `deliveryHours${short ? 'Short' : ''}`,
                    time: ['1.5', '3'],
                };
            }
        } else if (method === 'manual') {
            if (platform === 'ps4') {
                return {
                    type: `deliveryHours${short ? 'Short' : ''}`,
                    time: ['1.5', '3'],
                };
            } else if (platform === 'xbox') {
                return {
                    type: `deliveryHours${short ? 'Short' : ''}`,
                    time: ['1.5', '3'],
                };
            }
        }
    } else if (amount >= 3000000 && amount <= 4999999) {
        if (method === 'easy') {
            if (platform === 'ps4') {
                return {
                    type: `deliveryHours${short ? 'Short' : ''}`,
                    time: ['3', '5'],
                };
            } else if (platform === 'xbox') {
                return {
                    type: `deliveryHours${short ? 'Short' : ''}`,
                    time: ['3', '5'],
                };
            }
        } else if (method === 'manual') {
            if (platform === 'ps4') {
                return {
                    type: `deliveryHours${short ? 'Short' : ''}`,
                    time: ['3', '5'],
                };
            } else if (platform === 'xbox') {
                return {
                    type: `deliveryHours${short ? 'Short' : ''}`,
                    time: ['3', '5'],
                };
            }
        }
    } else if (amount >= 5000000 && amount <= 1000000000) {
        if (method === 'easy') {
            if (platform === 'ps4') {
                return {
                    type: `deliveryHours${short ? 'Short' : ''}`,
                    time: ['5', '10'],
                };
            } else if (platform === 'xbox') {
                return {
                    type: `deliveryHours${short ? 'Short' : ''}`,
                    time: ['5', '10'],
                };
            }
        } else if (method === 'manual') {
            if (platform === 'ps4') {
                return {
                    type: `deliveryHours${short ? 'Short' : ''}`,
                    time: ['5', '10'],
                };
            } else if (platform === 'xbox') {
                return {
                    type: `deliveryHours${short ? 'Short' : ''}`,
                    time: ['5', '10'],
                };
            }
        }
    }
};

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
    console.log(value);
    let percentDisc = 1;
    let result = arr.filter((el) => el.limitSumCoins <= value);
    console.log(result);
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

export function bodyFixPosition() {
    setTimeout(function () {
        /* Ставим необходимую задержку, чтобы не было «конфликта» в случае, если функция фиксации вызывается сразу после расфиксации (расфиксация отменяет действия расфиксации из-за одновременного действия) */

        if (!document.body.hasAttribute('data-body-scroll-fix')) {
            // Получаем позицию прокрутки
            let scrollPosition =
                window.pageYOffset || document.documentElement.scrollTop;
            console.log('fix');
            // Ставим нужные стили
            document.body.setAttribute('data-body-scroll-fix', scrollPosition); // Cтавим атрибут со значением прокрутки
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = '-' + scrollPosition + 'px';
            document.body.style.left = '0';
            document.body.style.width = '100%';
        }
    }, 15); /* Можно задержку ещё меньше, но у меня работало хорошо именно с этим значением на всех устройствах и браузерах */
}

// 2. Расфиксация <body>
export function bodyUnfixPosition() {
    if (document.body.hasAttribute('data-body-scroll-fix')) {
        // Получаем позицию прокрутки из атрибута
        let scrollPosition = document.body.getAttribute('data-body-scroll-fix');
        console.log('unfix');
        // Удаляем атрибут
        document.body.removeAttribute('data-body-scroll-fix');

        // Удаляем ненужные стили
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.width = '';

        // Прокручиваем страницу на полученное из атрибута значение
        window.scroll(0, scrollPosition);
    }
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
export function getCoords(elem) {
    // crossbrowser version
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var docEl = document.documentElement;
    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;
    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;
    return { top: Math.round(top), left: Math.round(left) };
}

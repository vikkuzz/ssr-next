export default class Api {
    baseAddress = 'https://royalfut.com/';

    getStock = async () => {
        let urlForStock =
            window.location.origin.indexOf('localhost') >= 0 ||
            window.location.origin.indexOf('vercel') >= 0 ||
            window.location.origin.indexOf('192.168') >= 0 ||
            window.location.origin.indexOf('linestest.com') >= 0 ||
            window.location.origin.indexOf('ngrok.io') >= 0 ||
            window.location.origin.indexOf('bs-local.com') >= 0
                ? 'https://royalfut.com'
                : window.location.origin;

        const res = await fetch(`${urlForStock}/api/stock`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: '{"ip": ""}',
        });
        const result = await res.json();
        return result;
    };

    updateOrder = async (
        orderId,
        token,
        platform,
        method,
        amount,
        currency,
        promoCode = null
    ) => {
        let urlForCoupon = 'https://royalfut.com';

        const res = await fetch(`${urlForCoupon}/api/order/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify({
                platform: platform,
                deliveryMethod: method,
                coinCount: amount,
                currency: currency,
                promoCode: promoCode,
            }),
        });
        const result = await res.json();
        return result;
    };

    prePay = async (
        paymentMethod = '',
        token,
        orderId,
        locale,
        platform,
        deliveryMethod,
        price,
        amount,
        coupon = null,
        email
    ) => {
        console.log(paymentMethod);
        let urlForOrder = 'https://royalfut.com/api/order';
        let currentUrl = window.location.href;
        let localeLang = locale;
        const analytic = {
            id: orderId,
            platform: platform, // ps or xbox
            method: deliveryMethod, // комфортный или па
            price: price, // цена за 1 монету в евро//deliveryMethods[platform==='Easy'?0:1].data[1].pricePerCurrencyMap.EUR
            amount: amount, // количество монет
            coupon: coupon, // купон
            email: email,
        };

        //analytics.sendPayment(analytic);

        let settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
            data: JSON.stringify({
                paymentMethod: paymentMethod,
            }),
        };

        let url = `${urlForOrder}/${orderId}/prepay`;

        let suburl = `/${paymentMethod}`;

        switch (paymentMethod) {
            case 'acquiring':
                suburl = '';
                settings.data = JSON.stringify({
                    successUrl: `${window.location.origin}${localeLang}/profile/?id=${orderId}#orders`,
                    failUrl: currentUrl + '#from-acquiring',
                });
                break;
            case 'payop':
                settings.data = JSON.stringify({
                    paymentMethod: null,
                });
                break;
            case 'apple':
                break;
            case 'bitcoin':
                suburl = '/bitcoin';
                settings.data = JSON.stringify({
                    successUrl: `${window.location.origin}${localeLang}/profile/?id=${orderId}#orders`,
                    failUrl: currentUrl + '#from-acquiring',
                });
                break;
            case 'usdt':
                suburl = '/usdtether';
                settings.data = JSON.stringify({
                    successUrl: `${window.location.origin}${localeLang}/profile/?id=${orderId}#orders`,
                    failUrl: currentUrl + '#from-acquiring',
                });
                break;
            case 'etherium':
                suburl = '/etherium';
                settings.data = JSON.stringify({
                    successUrl: `${window.location.origin}${localeLang}/profile/?id=${orderId}#orders`,
                    failUrl: currentUrl + '#from-acquiring',
                });
                break;

            default:
                break;
        }

        settings.url = `${url}${suburl}`;

        const res = await fetch(`${settings.url}`, {
            method: 'POST',
            headers: settings.headers,
            body: settings.data,
        });
        const result = await res.json();
        return result;
    };

    createOrder = async (
        token,
        platform,
        method,
        currency,
        coinCount,
        clientId
    ) => {
        const getCookie = (name) => {
            let nameEQ = `${name}=`;
            let ca = document.cookie.split(';');
            console.log(ca);

            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];

                while (c.charAt(0) === ' ') {
                    c = c.substring(1, c.length);
                }

                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }

            return null;
        };

        const res = await fetch(`https://royalfut.com/api/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify({
                platform: platform,
                deliveryMethod: method,
                currency: currency,
                coinCount: coinCount,
                client_id: getCookie('_ga'),
            }),
        });
        const result = await res.json();
        return result;
    };

    getCriptorates = async (currency) => {
        let urlForStock = 'https://royalfut.com/api/cryptorates/';

        const res = await fetch(`${urlForStock}${currency}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await res.json();
        return result;
    };

    getOrders = async (token) => {
        let urlForStock = 'https://royalfut.com/api/order';

        const res = await fetch(`${urlForStock}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        });
        const result = await res.json();
        return result;
    };

    registration = async (userEmail, userPass) => {
        console.log('apiapi');
        let headers = {
            'Content-Type': 'application/json',
        };
        const res = await fetch(`${this.baseAddress}api/users`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                user: {
                    userLocale: 'ru',
                    region: 'RU',
                    email: userEmail,
                    password: userPass,
                    signUpCheck: 'on',
                },
            }),
        });
        const result = await res.json();
        return result;
    };
    login = async (userEmail, userPass) => {
        console.log('login');
        let headers = {
            'Content-Type': 'application/json',
        };
        const res = await fetch(`${this.baseAddress}api/users/login`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                user: {
                    userLocale: 'ru',
                    region: 'RU',
                    email: userEmail,
                    password: userPass,
                },
            }),
        });
        const result = await res.json();
        return result;
    };
}

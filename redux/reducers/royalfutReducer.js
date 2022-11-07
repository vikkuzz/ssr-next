import SecureLS from 'secure-ls';
import currency from '../../data-elements/currency';
import flagLangs from '../../data-elements/countries';

const ISSERVER = typeof window === 'undefined'; //чтоб не было ошибки на сервере об отсутствии локалстора
let ls = null;

if (!ISSERVER) {
    ls = new SecureLS();
}
const initialState = {
    loginModal: false,
    isAuth: false,
    loginMenu: {
        registration: true,
        login: false,
    },
    user: {},
    errorMessage: '',
    locale: {},
    currency: {
        currency: '$',
        title: 'USD',
        id: '0',
        country: '',
    },
    stock: {
        deliveryMethods: [
            {
                type: 'Easy',
                data: [
                    {
                        platform: 'xbox',
                        pricePerCurrencyMap: {
                            RUB: 0.004821,
                            USD: 0.000078,
                            EUR: 0.000077,
                            GBP: 0.000064,
                            SAR: 0.00294,
                            AED: 0.000287,
                            CAD: 0.0001,
                            BRL: 0.000407,
                            SEK: 0.000802,
                            NOK: 0.000764,
                        },
                    },
                    {
                        platform: 'ps4',
                        pricePerCurrencyMap: {
                            USD: 0.000052,
                            EUR: 0.000051,
                            GBP: 0.000043,
                            SAR: 0.00195,
                            AED: 0.00019,
                            CAD: 0.000067,
                            BRL: 0.000269,
                            SEK: 0.000531,
                            NOK: 0.000506,
                            RUB: 0.003193,
                        },
                    },
                ],
            },
            {
                type: 'Manual',
                data: [
                    {
                        platform: 'xbox',
                        pricePerCurrencyMap: {
                            RUB: 0.008139,
                            USD: 0.000132,
                            EUR: 0.00013,
                            GBP: 0.000109,
                            SAR: 0.00496,
                            AED: 0.000485,
                            CAD: 0.000169,
                            BRL: 0.000687,
                            SEK: 0.001354,
                            NOK: 0.00129,
                        },
                    },
                    {
                        platform: 'ps4',
                        pricePerCurrencyMap: {
                            RUB: 0.004821,
                            USD: 0.000078,
                            EUR: 0.000077,
                            GBP: 0.000064,
                            SAR: 0.00294,
                            AED: 0.000287,
                            CAD: 0.0001,
                            BRL: 0.000407,
                            SEK: 0.000802,
                            NOK: 0.000764,
                        },
                    },
                ],
            },
        ],
        currency: 'RUB',
        locale: 'RU',
        region: 'RU',
        minLimitSumCoins: 100000,
        maxLimitSumCoins: 10000000,
        discount: [
            {
                limitSumCoins: 20000000,
                limitSumView: '20M',
                discountPercent: 15,
            },
            {
                limitSumCoins: 10000000,
                limitSumView: '10M',
                discountPercent: 7,
            },
            {
                limitSumCoins: 5000000,
                limitSumView: '5M',
                discountPercent: 5,
            },
            {
                limitSumCoins: 4000000,
                limitSumView: '4M',
                discountPercent: 4,
            },
            {
                limitSumCoins: 1000000,
                limitSumView: '1M',
                discountPercent: 3,
            },
            {
                limitSumCoins: 800000,
                limitSumView: '800K',
                discountPercent: 3,
            },
        ],
        lastRefreshedDate: '2022-10-10T10:01:20.452736',
        paypalEnabled: false,
        rate: '4.5',
        reviews: '212',
        provider: 'Fairtobot',
    },
    platform: {
        xbox: false,
        ps: true,
    },
    method: {
        easy: true,
        manual: false,
    },
    coins: {
        coef: '',
        amount: '',
        price: '',
        fullprice: '',
    },
    order: {},
    cryptoLimits: {},
    createOrder: {},
};

const royalfutReducer = (state = initialState, action) => {
    console.log(action);

    let localState = null;
    if (ls?.get('localState')) {
        localState = ls.get('localState');
    }

    switch (action.type) {
        case 'ORDER':
            ls.set('localState', {
                ...state,
                ...localState,
                createOrder: {},
                order: action.data,
            });
            return { ...state, ...localState, order: action.data };

        case 'NAME_PAYMENT_METHOD':
            ls.set('localState', {
                ...state,
                ...localState,
                createOrder: {},
            });
            return { ...state, ...localState, paymentMethod: action.data };

        case 'USER_CREATE_ORDER':
            ls.set('localState', {
                ...state,
                ...localState,
                createOrder: {},
                createOrder: action.data,
            });
            return { ...state, ...localState, createOrder: action.data };

        case 'GET_CRYPTO_LIMITS':
            ls.set('localState', {
                ...state,
                ...localState,
                createOrder: {},
                cryptoLimits: action.data,
            });
            return { ...state, ...localState, cryptoLimits: action.data };

        case 'CURRENT_CURRENCY':
            let userCurrency = currency.filter(
                (el) => el.title.toLowerCase() == action.data.toLowerCase()
            )[0];
            ls.set('localState', {
                ...state,
                ...localState,
                createOrder: {},
                currency: userCurrency,
            });
            return { ...state, ...localState, currency: userCurrency };

        case 'CURRENT_CURRENCY':
            ls.set('localState', {
                ...state,
                ...localState,
                createOrder: {},
                cryptoLimits: action.data,
            });
            return { ...state, ...localState, cryptoLimits: action.data };

        case 'CHANGE_PLATFORM':
            let platform = state.platform;
            if (action.data == 'ps') {
                platform = {
                    ps: true,
                    xbox: false,
                };
            } else {
                platform = {
                    ps: false,
                    xbox: true,
                };
            }
            ls.set('localState', {
                ...state,
                ...localState,
                createOrder: {},
                platform: platform,
            });
            return { ...state, ...localState, platform: platform };

        case 'CHANGE_METHOD':
            let method = state.method;
            if (action.data == 'easy') {
                method = {
                    easy: true,
                    manual: false,
                };
            } else {
                method = {
                    easy: false,
                    manual: true,
                };
            }
            ls.set('localState', {
                ...state,
                ...localState,
                createOrder: {},
                method: method,
            });
            return { ...state, ...localState, method: method };

        case 'CURRENT_LANG':
            console.log(action.data);
            let currentLang = flagLangs.filter(
                (el) => el.title.toLowerCase() === action.data.toLowerCase()
            )[0];
            ls.set('localState', {
                ...state,
                ...localState,
                createOrder: {},
                locale: currentLang,
            });
            return { ...state, ...localState, locale: currentLang };

        case 'LOGIN_MODAL':
            action.data
                ? (document.querySelector('body').style.overflowY = 'hidden')
                : (document.querySelector('body').style.overflowY = 'auto');
            return { ...state, loginModal: action.data };

        case 'COINS':
            ls.set('localState', {
                ...state,
                ...localState,
                createOrder: {},
                coins: action.data,
            });
            return {
                ...state,
                ...localState,
                coins: action.data,
                order: { coins: action.data },
            };

        case 'GET_STOCK':
            if (Object.keys(state.locale).length === 0) {
                localState = {
                    ...state,
                    locale: flagLangs.filter(
                        (el) => el.title == action.data.locale.toLowerCase()
                    )[0] || {
                        url: 'img/flag/UK-lang.svg',
                        title: 'en',
                        id: '0',
                        country: 'English',
                    },
                    currency: currency.filter(
                        (el) =>
                            el.title.toUpperCase() ==
                            action.data.currency.toUpperCase()
                    )[0] || {
                        currency: '$',
                        title: 'USD',
                        id: '0',
                        country: '',
                    },
                    ...localState,
                    createOrder: {},
                    stock: action.data,
                };
            }
            ls.set('localState', localState);
            return { ...state, ...localState };

        case 'LOGIN':
            return {
                ...state,
                loginMenu: { registration: false, login: true },
            };

        case 'REGISTRATION':
            console.log(action.data);
            return {
                ...state,
                loginMenu: { registration: true, login: false },
            };

        case 'USER':
            ls.set('localState', {
                ...state,
                isAuth: true,
                user: { ...action.data },
                loginModal: false,
                loginMenu: {
                    registration: false,
                    login: false,
                },
            });
            document.querySelector('body').style.overflowY = 'auto';
            return {
                ...state,
                isAuth: true,
                user: { ...action.data },
                loginModal: false,
                loginMenu: {
                    registration: false,
                    login: false,
                },
            };

        case 'USER_LOGOUT':
            ls.set('localState', {
                ...state,
                isAuth: false,
                user: {},
                loginModal: false,
                loginMenu: {
                    registration: false,
                    login: true,
                },
            });

            return {
                ...state,
                isAuth: false,
                user: {},
                loginModal: false,
                loginMenu: {
                    registration: false,
                    login: true,
                },
            };

        case 'CATCH_ERROR':
            return { ...state, errorMessage: action.data };

        default:
            return { ...state };
    }
};

export default royalfutReducer;

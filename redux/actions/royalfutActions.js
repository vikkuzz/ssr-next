export const loginModal = (data) => ({ type: 'LOGIN_MODAL', data });
export const loginClick = () => ({ type: 'LOGIN' });
export const registrationClick = () => ({ type: 'REGISTRATION' });
export const user = (data) => ({ type: 'USER', data });
export const userlogout = () => ({ type: 'USER_LOGOUT' });
export const catcherror = (data) => ({ type: 'CATCH_ERROR', data });
export const stock = (data) => ({ type: 'GET_STOCK', data });
export const currentCurrency = (data) => ({ type: 'CURRENT_CURRENCY', data });
export const currentLang = (data) => ({ type: 'CURRENT_LANG', data });
export const changePlatform = (data) => ({ type: 'CHANGE_PLATFORM', data });
export const changeMethod = (data) => ({ type: 'CHANGE_METHOD', data });
export const coins = (data) => ({ type: 'COINS', data });
export const order = (data) => ({ type: 'ORDER', data });
export const getCriptoLimits = (data) => ({ type: 'GET_CRYPTO_LIMITS', data });
export const userCreateOrder = (data) => ({ type: 'USER_CREATE_ORDER', data });
export const changeDir = (data) => ({ type: 'CHANGE_DIR', data });
export const getAllOrders = (data) => ({ type: 'GET_ALL_ORDERS', data });
export const loginModalFromMain = (data) => ({
    type: 'LOGIN_MODAL_FROM_MAIN',
    data,
});
export const namePaymentMethod = (data) => ({
    type: 'NAME_PAYMENT_METHOD',
    data,
});

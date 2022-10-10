export const loginModal = (data) => ({ type: "LOGIN_MODAL", data });
export const loginClick = () => ({ type: "LOGIN" });
export const registrationClick = () => ({ type: "REGISTRATION" });
export const user = (data) => ({ type: "USER", data });
export const userlogout = () => ({ type: "USER_LOGOUT" });
export const catcherror = (data) => ({ type: "CATCH_ERROR", data });
export const stock = (data) => ({ type: "GET_STOCK", data });
export const currentCurrency = (data) => ({ type: "CURRENT_CURRENCY", data });

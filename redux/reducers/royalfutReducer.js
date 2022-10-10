const initialState = {
  loginModal: false,
  isAuth: false,
  loginMenu: {
    registration: true,
    login: false,
  },
  user: {},
  errorMessage: "",
  locale: {},
  currency: {},
  stock: {
    deliveryMethods: [
      {
        type: "Easy",
        data: [
          {
            platform: "xbox",
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
            platform: "ps4",
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
        type: "Manual",
        data: [
          {
            platform: "xbox",
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
            platform: "ps4",
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
    currency: "RUB",
    locale: "RU",
    region: "RU",
    minLimitSumCoins: 100000,
    maxLimitSumCoins: 10000000,
    discount: [
      {
        limitSumCoins: 20000000,
        limitSumView: "20M",
        discountPercent: 15,
      },
      {
        limitSumCoins: 10000000,
        limitSumView: "10M",
        discountPercent: 7,
      },
      {
        limitSumCoins: 5000000,
        limitSumView: "5M",
        discountPercent: 5,
      },
      {
        limitSumCoins: 4000000,
        limitSumView: "4M",
        discountPercent: 4,
      },
      {
        limitSumCoins: 1000000,
        limitSumView: "1M",
        discountPercent: 3,
      },
      {
        limitSumCoins: 800000,
        limitSumView: "800K",
        discountPercent: 3,
      },
    ],
    lastRefreshedDate: "2022-10-10T10:01:20.452736",
    paypalEnabled: false,
    rate: "4.5",
    reviews: "212",
    provider: "Fairtobot",
  },
};

const royalfutReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "CURRENT_CURRENCY":
      console.log(action.data);
      return { ...state, currency: action.data };
    case "LOGIN_MODAL":
      console.log(action.data);
      return { ...state, loginModal: action.data };
    case "GET_STOCK":
      console.log(action.data);
      return { ...state, stock: action.data };

    case "LOGIN":
      return { ...state, loginMenu: { registration: false, login: true } };
    case "REGISTRATION":
      console.log(action.data);
      return { ...state, loginMenu: { registration: true, login: false } };
    case "USER":
      console.log(action.data);
      return {
        ...state,
        isAuth: true,
        user: { ...action.data },
        loginMenu: {
          registration: false,
          login: false,
        },
      };
    case "USER_LOGOUT":
      return {
        ...state,
        isAuth: false,
        user: {},
        loginMenu: {
          registration: false,
          login: true,
        },
      };
    case "CATCH_ERROR":
      console.log(action.data);
      return { ...state, errorMessage: action.data };

    default:
      return { ...state };
  }
};

export default royalfutReducer;

const initialState = {
  loginModal: false,
  isAuth: false,
  loginMenu: {
    registration: true,
    login: false,
  },
  user: {},
};

const royalfutReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "LOGIN_MODAL":
      console.log(action.data);
      return { ...state, loginModal: action.data };
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

    default:
      return { ...state };
  }
};

export default royalfutReducer;

const initialState = {
  loginModal: false,
  isAuth: false,
};

const royalfutReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "LOGIN_MODAL":
      console.log(action.data);
      return { ...state, loginModal: action.data };

    default:
      return { ...state };
  }
};

export default royalfutReducer;

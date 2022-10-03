const initialState = {
  loginModal: false,
};

const royalfutReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "LOGIN_MODAL":
      console.log(action.data);
      return { ...state, loginModal: action.data };
    case "CHANGE_SIZE":
      console.log(action.data);
      return { ...state, size: action.data };

    default:
      return { ...state };
  }
};

export default royalfutReducer;

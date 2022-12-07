// import { createStore, applyMiddleware, compose } from "redux";

// import thunk from "redux-thunk";

// import reducer from "./redux/reducers";

// const composeEnhancers =
//   typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

// export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import royalfutReducer from "./redux/reducers/royalfutReducer";
// export default configureStore({
//   reducer: {
//     royalfutReducer: royalfutReducer,
//   },
// });

import {
    Action,
    AnyAction,
    combineReducers,
    configureStore,
    ThunkAction,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import royalfutReducer from './redux/reducers/royalfutReducer';
const combinedReducer = combineReducers({
    royalfutReducer: royalfutReducer,
});

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

export const makeStore = () =>
    configureStore({
        reducer,
    });

export const wrapper = createWrapper(makeStore, { debug: true });

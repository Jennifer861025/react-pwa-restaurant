import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import {
  SET_USER,
  SET_COUPON,
  BEGIN_DATA_REQUEST,
  SUCCESS_DATA_REQUEST,
  FAIL_DATA_REQUEST,
} from './actionType';

export const StoreContext = createContext();

const initialState = {
  userName: null,
  userPhone: null,
  coupon: [],
  requestdata: { loading: false, error: null },
};

function reducer(state, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userName: action.payload.name,
        userPhone: action.payload.phone,
      };
    case SET_COUPON:
      return {
        ...state,
        coupon: action.payload,
      };
    case BEGIN_DATA_REQUEST:
      return {
        ...state,
        requestdata: { ...state.requestdata, loading: true },
      };
    case SUCCESS_DATA_REQUEST:
      return {
        ...state,
        requestdata: { ...state.requestdata, loading: false },
      };
    case FAIL_DATA_REQUEST:
      return {
        ...state,
        requestdata: {
          ...state.requestdata,
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
}

StoreProvider.propTypes = {
  children: PropTypes.object,
};

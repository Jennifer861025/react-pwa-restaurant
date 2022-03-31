import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import {
  SET_USER,
  SET_RESERVATION_DATA,
  SET_WAITNUM,
  SET_COUPON,
  BEGIN_DATA_REQUEST,
  SUCCESS_DATA_REQUEST,
  FAIL_DATA_REQUEST,
  CANT_FIND_DATA,
} from './actionType';

export const StoreContext = createContext();

const initialState = {
  userName: null,
  userPhone: null,
  reservationData: { date: null, peopleNum: null, tableNum: null },
  waitData: { waitNum: null, waitLastNum: null },
  waitNum: null,
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
    case SET_RESERVATION_DATA:
      return {
        ...state,
        reservationData: {
          ...state.reservationData,
          date: action.payload.date,
          peopleNum: action.payload.peopleNum,
          tableNum: action.payload.tableNum,
        },
      };
    case SET_WAITNUM:
      return {
        ...state,
        waitData: {
          ...state.waitData,
          waitNum: action.payload.waitNum,
          waitLastNum: action.payload.waitLastNum,
        },
      };
    case SET_COUPON:
      return {
        ...state,
        coupon: action.payload,
      };
    case BEGIN_DATA_REQUEST:
      return {
        ...state,
        requestdata: { ...state.requestdata, loading: true, error: null },
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
    case CANT_FIND_DATA:
      return {
        ...state,
        requestdata: {
          ...state.requestdata,
          loading: false,
          error: true,
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

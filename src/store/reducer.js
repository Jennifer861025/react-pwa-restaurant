import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

// import {

// } from './actionTypes';

export const StoreContext = createContext();

const initialState = {};

function reducer(state, action) {
  switch (action.type) {
    // case SET_ADDITIONALBOX:
    //   return {
    //     ...state,
    //     additionalBox: action.payload,
    //   };
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

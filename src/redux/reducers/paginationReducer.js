import {
    SET_CURRENT_PAGE,
    UPDATE_PRODUCT_LIST,
    ENABLE_PREV_BUTTON,
    ENABLE_NEXT_BUTTON,
    DISABLE_PREV_BUTTON,
    DISABLE_NEXT_BUTTON,
  } from '../actions/paginationActions.js';
  
  const initialState = {
    currentPage: 1,
    products: [],
    prevButtonDisabled: false,
    nextButtonDisabled: false,
  };
  
  const paginationReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_CURRENT_PAGE:
        return { ...state, currentPage: action.payload };
      case UPDATE_PRODUCT_LIST:
        return { ...state, products: action.payload };
      case ENABLE_PREV_BUTTON:
        return { ...state, prevButtonDisabled: false };
      case ENABLE_NEXT_BUTTON:
        return { ...state, nextButtonDisabled: false };
      case DISABLE_PREV_BUTTON:
        return { ...state, prevButtonDisabled: true };
      case DISABLE_NEXT_BUTTON:
        return { ...state, nextButtonDisabled: true };
      default:
        return state;
    }
  };
  
  export default paginationReducer;
  
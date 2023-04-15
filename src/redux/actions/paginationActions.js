// Action types
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const UPDATE_PRODUCT_LIST = 'UPDATE_PRODUCT_LIST';
export const ENABLE_PREV_BUTTON = 'ENABLE_PREV_BUTTON';
export const ENABLE_NEXT_BUTTON = 'ENABLE_NEXT_BUTTON';
export const DISABLE_PREV_BUTTON = 'DISABLE_PREV_BUTTON';
export const DISABLE_NEXT_BUTTON = 'DISABLE_NEXT_BUTTON';

// Action creators
export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  payload: currentPage,
});

export const updateProductList = (products) => ({
  type: UPDATE_PRODUCT_LIST,
  payload: products,
});

export const enablePrevButton = () => ({
  type: ENABLE_PREV_BUTTON,
});

export const enableNextButton = () => ({
  type: ENABLE_NEXT_BUTTON,
});

export const disablePrevButton = () => ({
  type: DISABLE_PREV_BUTTON,
});

export const disableNextButton = () => ({
  type: DISABLE_NEXT_BUTTON,
});

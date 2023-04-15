// Action type
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';

// Action creator to set search results
export const setSearchResults = (results) => ({
    type: SET_SEARCH_RESULTS,
    payload: results,
});

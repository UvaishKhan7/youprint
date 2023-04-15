// Initial state for search results
const initialState = {
    results: [],
  };
  
  // Reducer to handle search results state
  const searchResultsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SEARCH_RESULTS':
        return { ...state, results: action.payload };
      default:
        return state;
    }
  };
  
  export default searchResultsReducer;
  
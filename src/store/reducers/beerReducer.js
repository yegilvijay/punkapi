import { FETCH_API_DATA } from '../types';

const initialState = {
  data: [],
  currentPage:1,
  totalPages:8,
  isLoading: false,
};

const beerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_API_DATA:
      return {
        ...state,
        data: action.payload.data,
        currentPage:action.payload.currentPage,
        totalPages:action.payload.totalPages,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default beerReducer;

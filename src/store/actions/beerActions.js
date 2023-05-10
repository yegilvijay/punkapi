import axios from 'axios';
import { FETCH_API_DATA } from '../types';

export const fetchApiData = (page, month, filterOption ) => {
  return async (dispatch, getState) => {
  
    try {
      console.log( "fetch",page, month, getState().beer)

      // Check if data is already cached in the Redux store
      const cachedData = getState().beer.data;
      if (cachedData.length > 0) {
        // If data is already cached, return it without making an API call
        dispatch({
          type: FETCH_API_DATA,
          payload: {
            data: cachedData,
          },
        });
        return;
      }

      const filterParam = month ? `&brewed_after=${month}` : '';
      const response = await axios.get(
        `https://api.punkapi.com/v2/beers?page=${page}&per_page=10${filterParam}`
      );

      console.log(response);
      dispatch({
        type: FETCH_API_DATA,
        payload: {
          data: response.data,
          currentPage: page,
          totalPages : 8,
        },
      });
    } catch (error) {
      console.error('Error fetching API data:', error);
    }
  };
};


// function paginated_fetch(
//   url = is_required("url"), // Improvised required argument in JS
//   page = 1,
//   previousResponse = []
// ) {
//   return fetch(`${url}&page=${page}`) // Append the page number to the base URL
//     .then(response => response.json())
//     .then(newResponse => {
//       const response = [...previousResponse, ...newResponse]; // Combine the two arrays

//       if (newResponse.length !== 0) {
//         page++;

//         return paginated_fetch(url, page, response);
//       }

//       return response;
//     });
// }
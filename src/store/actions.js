import { REQUEST_RESTAURANTS_SUCCESS, REQUEST_RESTAURANTS_FAIL } from './constants';

export const requestRestaurants = (city, offset) => (dispatch) => {
  fetch(`https://sleepy-river-73437.herokuapp.com/api/search?location=${city}&offset=${offset}`)
    .then(response => response.json())
    .then(restaurants =>
      dispatch({
        type: REQUEST_RESTAURANTS_SUCCESS,
        payload: restaurants
      }))
    .catch(error =>
      dispatch({
        type: REQUEST_RESTAURANTS_FAIL,
        payload: error
      }))
}

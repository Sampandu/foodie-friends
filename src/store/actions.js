import { REQUEST_RESTAURANTS_SUCCESS, REQUEST_RESTAURANTS_FAIL } from './constants';

export const requestRestaurants = (city, offset, latitude, longitude) => (dispatch) => {
  console.log('city', city)
  console.log('offset', offset)
  console.log('latitude', latitude)
  console.log('longitude', longitude)

  fetch(`http://localhost:3000/api/search?location=${city}&offset=${offset}&latitude=${latitude}&longitude=${longitude}`)
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

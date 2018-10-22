import { REQUEST_RESTAURANTS_SUCCESS, REQUEST_RESTAURANTS_FAIL } from './constants';

const initialStateRestaurants = {
  restaurants: []
}

export const requestRestaurants = (state=initialStateRestaurants, action={}) => {
  switch(action.type) {
    case REQUEST_RESTAURANTS_SUCCESS:
      return {...state, restaurants: action.payload}
    case REQUEST_RESTAURANTS_FAIL:
      return {...state, error: action.payload}
    default:
      return state
  }
}


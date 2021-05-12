import * as actionTypes from '../actions/actionTypes';
import axiosClient from '../../API/axios-client';

const initialState = {
  access_token: null,
  error: false
}

const setAxiosHeader = (token) => {
  axiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACCESS_TOKEN:
      return {
        ...state,
        access_token: action.access_token,
        error: false
      }
    case actionTypes.SET_API_ERROR:
      return {
        ...state,
        access_token: null,
        error: true
      }
    case actionTypes.SET_AXIOS_HEADER:
      setAxiosHeader(action.token);
      return {
        ...state,
        error: false
      }
    default:
      return state;
  }
}

export default reducer;
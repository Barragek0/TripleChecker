import * as actionTypes from './actionTypes';
import oauthClient from '../../API/oauthClient';
import axiosClient from '../../API/axios-client';

export const setAccessToken = (token) => {
  return {
    type: actionTypes.SET_ACCESS_TOKEN,
    access_token: token
  }
}

export const setApiError = () => {
  return {
    type: actionTypes.SET_API_ERROR
  }
}

export const setAxiosHeader = (token) => {
  return {
    type: actionTypes.SET_AXIOS_HEADER,
    token: token
  }
}

export const getAccessToken = () => {
  return dispatch => {
    oauthClient.credentials.getToken()
      .then(response => {
        dispatch(setAccessToken(response.accessToken))
        dispatch(setAxiosHeader(response.accessToken))
      })
      .catch(error => {
        console.log(error);
        dispatch(setApiError());
      })
  }
}

export const storeMinionData = (data) => {
  return {
    type: actionTypes.SET_MINION_DATA,
    data: data
  }
}

export const storeUnavailableMinions = (data) => {
  return {
    type: actionTypes.STORE_UNAVAILABLE_MINIONS,
    data: data
  }
}

export const incrementApiCount = () => {
  return {
    type: actionTypes.INCREMENT_API_COUNT
  }
}

// outdated action creator from pre-refactor to account for no neutral minion type.
export const getMinionData = (tier, availableTypes) => {
  return dispatch => {
    const battlegroundsMinionUrl = 'https://us.api.blizzard.com/hearthstone/cards?locale=en_US&gameMode=battlegrounds&tier=';

    let tierToSearch = parseInt(tier) + 1;
    if (tier === 6) {tierToSearch = 6}
    const tierSpecificUrl = battlegroundsMinionUrl + tierToSearch;

    for (let index in availableTypes) {
      const typeSpecificUrl = tierSpecificUrl + '&minionType=' + availableTypes[index].toLowerCase();
      axiosClient.get(typeSpecificUrl)
        .then(response => {
          console.log(response);
          dispatch(storeMinionData(response.data));
          dispatch(incrementApiCount());
        })
        .catch(error => {
          console.log(error);
          dispatch(setApiError());
        })
    }
  }
}

export const getUnavailableMinions = (tier, unavailableTypes) => {
  return dispatch => {
    let tierToSearch = parseInt(tier) + 1;
    if (tier === 6) {tierToSearch = 6}
    const battlegroundsTypeUrl = 'https://us.api.blizzard.com/hearthstone/cards?locale=en_US&gameMode=battlegrounds&tier=' + tierToSearch + '&minionType=';

    for (let index in unavailableTypes) {
      const typeSpecificUrl = battlegroundsTypeUrl + unavailableTypes[index].toLowerCase();
      axiosClient.get(typeSpecificUrl)
        .then(response => {
          console.log(response);
          dispatch(storeUnavailableMinions(response.data));
          dispatch(incrementApiCount());
        })
        .catch(error => {
          console.log(error);
          dispatch(setApiError());
        })
    }
  }
}


export const newGetMinionData = (tier, unavailableTypes) => {
  return dispatch => {
    dispatch(getUnavailableMinions(tier, unavailableTypes));
    
    const battlegroundsMinionUrl = 'https://us.api.blizzard.com/hearthstone/cards?locale=en_US&gameMode=battlegrounds&tier=';
    let tierToSearch = parseInt(tier) + 1;
    if (tier === 6) {tierToSearch = 6}
    const tierSpecificUrl = battlegroundsMinionUrl + tierToSearch;

    axiosClient.get(tierSpecificUrl)
      .then(response => {
        console.log(response);
        dispatch(storeMinionData(response.data));
        dispatch(incrementApiCount());
      })
      .catch(error => {
        dispatch(setApiError());
      })
  }
}


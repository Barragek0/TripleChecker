import  * as actionTypes from '../actions/actionTypes';

const initialState = {
  init: false,
  tier: null,
  minions: [],
  selectedMinions: [],
  unavailableTypes: [],
  typesConfirmed: false,
  minionsConfirmed: false,
  minionResponses: 0,
  unavailableMinions: []
}

const minionClickedHandler = (state, action) => {
  if (state.selectedMinions.includes(action.id)) {
    const newSelectedMinions = state.selectedMinions.filter(id => id !== action.id)
    return {...state,
    selectedMinions: newSelectedMinions
    }
  } else {
    return {
      ...state,
      selectedMinions: state.selectedMinions.concat(action.id)
    } 
  }
}

const typeClickedHandler = (state, action) => {
  if (!state.unavailableTypes.includes(action.minionType)) {
    return {
      ...state,
      unavailableTypes: state.unavailableTypes.concat(action.minionType)
    }
  } else {
    const newUnavailableTypes = state.unavailableTypes.filter(type => type !== action.minionType)
    return {
      ...state,
      unavailableTypes: newUnavailableTypes
    }
  }
}

const confirmTypesHandler = (state, action) => {
  if (state.typesConfirmed === false) {
    return {
      ...state,
      typesConfirmed: true
    }
  } else {
    return {
      ...state,
      typesConfirmed: false,
      unavailableTypes: [],
      tier: null,
      minions: [],
      selectedMinions: [],
      minionsConfirmed: false,
      minionResponses: 0,
      unavailableMinions: []
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_CALCULATOR:
      return {
        ...state,
        init: true
      }
    case actionTypes.SET_TIER:
      return {
        ...state,
        tier: action.tier
      }
    case actionTypes.SET_MINION_DATA:
      return {
        ...state,
        minions: state.minions.concat(action.data.cards)
      }
    case actionTypes.STORE_UNAVAILABLE_MINIONS:
      return {
        ...state,
        unavailableMinions: state.unavailableMinions.concat(action.data.cards)
      }
    case actionTypes.RESET_TIER:
      return {
        ...state,
        tier: null,
        minions: [],
        selectedMinions: [],
        minionsConfirmed: false,
        minionResponses: 0
      }
    case actionTypes.CLICK_TYPE:
      return typeClickedHandler(state, action);
    case actionTypes.CONFIRM_TYPES:
      return confirmTypesHandler(state, action);
    case actionTypes.CLICK_MINION:
      return minionClickedHandler(state, action);
    case actionTypes.CONFIRM_MINIONS:
      return {
        ...state,
        minionsConfirmed: true
      }
      case actionTypes.INCREMENT_API_COUNT:
        return {
          ...state,
          minionResponses: state.minionResponses + 1
        }
    default:
      return state;
  }
}

export default reducer;
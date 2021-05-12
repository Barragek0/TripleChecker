import * as actionTypes from './actionTypes';

export const initCalculator = () => {
  return {
    type: actionTypes.INIT_CALCULATOR
  }
}

export const setTier = (tierToSet) => {
  return {
    type: actionTypes.SET_TIER,
    tier: tierToSet
  }
}

export const resetTier = () => {
  return {
    type: actionTypes.RESET_TIER
  }
}

export const clickMinion = (id) => {
  return {
    type: actionTypes.CLICK_MINION,
    id: id
  }
}

export const clickType = (minionType) => {
  return {
    type: actionTypes.CLICK_TYPE,
    minionType: minionType
  }
}

export const confirmTypes = () => {
  return {
    type: actionTypes.CONFIRM_TYPES
  }
}

export const confirmMinions = () => {
  return {
    type: actionTypes.CONFIRM_MINIONS
  }
}
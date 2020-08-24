/* eslint-disable no-param-reassign */
// import axios from 'axios'
// import * as types from '../mutationTypes';

// initial state
const state = {
  urbanAgglomerationData: {
    customerFlowList: {},
    commutingModeList: [],
    selectList: [],
    selectValue1: [],
    selectValue2: []

  }
}
// actions
const actions = {}

// mutations
const mutations = {
  SET_CUSTOMER: (state, customerFlowList) => {
    state.urbanAgglomerationData.customerFlowList = customerFlowList
  },
  SET_COMMUTING: (state, commutingModeList) => {
    state.urbanAgglomerationData.commutingModeList = commutingModeList
  },
  SET_SELECTLIST: (state, subSelectList) => {
    state.urbanAgglomerationData.selectList = subSelectList
  },
  SET_SELECTVALUE1: (state, subSelectList) => {
    state.urbanAgglomerationData.selectValue1 = subSelectList
  },
  SET_SELECTVALUE2: (state, subSelectList) => {
    state.urbanAgglomerationData.selectValue2 = subSelectList
  }
}

const urbanAgglomeration = {
  namespaced: true,
  state: state,
  actions,
  mutations
}
export default urbanAgglomeration

import types from '../mutationTypes';

// mutations
const mutations = {
  [types.GET_PROCESS_IDS]: (state, payload) => {
      state.set('processOptions', state.processOptions);
  },
  [types.GET_PROCESS_AUDITORS]: (state, payload) => {
    state.set('auditorOptions', state.auditorOptions);
  },
  [types.GET_PROCESS_LIST_DETAIL]: (state, payload) => {
    state.set('auditorOptions', state.auditorOptions);
  },
  [types.UPDATE_PROCESS_STATUS]: (state, payload) => {

  },
};
export default mutations;

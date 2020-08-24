import axios from 'axios';
const actions = {
  getProcessIds({ commit, state }, payload) {
    console.error('getProcessIds payload', payload);
    axios.get('/audit/process/getProcessIds', {
      params: {
        query: payload.query
      }
    }).then(function (response) {
        console.error(response);
        if(response.code === 1) {
          commit('GET_PROCESS_IDS', response.data || []);
        } else {

        }
      })
      .catch(function (error) {
        console.log(error);
      })
  },
  changeNavStatus({ commit, state }, payload){
    commit('CHANGE_NAV_STATUS',payload)
  }
};
export default actions;
import axios from 'axios';


// actions
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
  getAuditors({ commit, state }, payload) {
    axios.get('/audit/process/getAuditors', {
      params: {
        query: payload.query
      }
    }).then(function (response) {
      console.error(response);
      if(response.code === 1) {
        commit('GET_PROCESS_AUDITORS', response.data || []);
      } else {

      }
    })
      .catch(function (error) {
        console.log(error);
      })
  },
  getProcessList({ commit, state }, payload) {
    axios.post('/audit/process/getProcessList', payload)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  getProcessListDetal({ commit, state }, payload) {
    axios.get('/audit/process/getProcessListDetail', {
      params: {
        id: payload.id
      }
    }).then(function (response) {
      console.error(response);
      if(response.code === 1) {
        commit('GET_PROCESS_LIST_DETAIL', response.data || []);
      } else {

      }
    })
      .catch(function (error) {
        console.log(error);
      })
  },
  confirmProcessNode({ commit, state }, payload) {
    axios.post('/audit/process/confirmProcessNode', payload)
      .then(function (response) {
        if(response.code === 1) {
          commit('UPDATE_PROCESS_STATUS', response.data || []);
        } else {

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};
export default actions;

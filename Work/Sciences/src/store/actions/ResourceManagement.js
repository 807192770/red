import axios from 'axios';
const actions = {
  deleteRow({ commit, state }, payload){
    commit('DELETE_ROW',payload)
  }
};
export default actions;

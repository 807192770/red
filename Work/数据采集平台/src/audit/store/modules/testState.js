import actions from '../actions/testActions';
import mutations from '../mutations/testMutations';

const state = {
  items: [1,2,3,4,5],
}

// getters
const getters = {
  cartProducts: rootState => rootState,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

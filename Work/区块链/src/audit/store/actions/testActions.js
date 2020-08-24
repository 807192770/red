// actions
const actions = {
  test({ commit, state }, products) {
    commit('setCheckoutStatus', { state, products });
  },
};
export default actions;

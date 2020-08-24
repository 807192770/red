// mutations
const mutations = {
  test(state, { id }) {
    state.items.push({
      quantity: id,
    });
  },
};
export default mutations;

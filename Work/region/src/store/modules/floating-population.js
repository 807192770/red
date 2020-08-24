const state = {
  floatingPopulation: {
    moveOutNum: [],
    cumulative: [],
    ranking: [],
    contrast: [],
    rankingTwo: []
  }
}
const actions = {}
const mutations = {
  SET_MOVEOUTNUM: (state, moveOutNum) => {
    state.floatingPopulation.moveOutNum = moveOutNum
  },
  SET_CUMULATIVE: (state, cumulative) => {
    state.floatingPopulation.cumulative = cumulative
  },
  SET_RANKING: (state, ranking) => {
    state.floatingPopulation.ranking = ranking
  },
  SET_RANKINGTWO: (state, rankingTwo) => {
    state.floatingPopulation.rankingTwo = rankingTwo
  },
  SET_CONTRAST: (state, contrast) => {
    state.floatingPopulation.contrast = contrast
  }
}

const floatingPopulation = {
  state: state,
  actions: actions,
  mutations: mutations
}
export default floatingPopulation

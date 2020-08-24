const state = {
  regionEmergency: {
    evacuate: [],
    frequency: [],
    query: [],
    shortMessage: [],
    regionMap: []
  }
}
const actions = {}
const mutations = {
  SET_EVACUATE: (state, evacuate) => {
    state.regionEmergency.evacuate = evacuate
  },
  SET_FREQUENCY: (state, frequency) => {
    state.regionEmergency.frequency = frequency
  },
  SET_QUERY: (state, query) => {
    state.regionEmergency.query = query
  },
  SET_SHORTMESSAGE: (state, shortMessage) => {
    state.regionEmergency.shortMessage = shortMessage
  },
  SET_REGIONMAP: (state, regionMap) => {
    state.regionEmergency.regionMap = regionMap
  }
}

const regionEmergency = {
  state: state,
  actions: actions,
  mutations: mutations
}
export default regionEmergency

const state = {
  roadMonitoring: {
    monitoringFlow: {},
    realMonitoring: {},
    flowRanking: [],
    roadMonitoring: {},
    changeRode: [],
    forecast:[]
  }
}
const actions = {}
const mutations = {
  SET_MONITORINGFLOW: (state, monitoringFlow) => {
    // console.log(state, monitoringFlow, 3333)
    state.roadMonitoring.monitoringFlow = monitoringFlow
  },
  SET_REALMONITORING: (state, realMonitoring) => {
    state.roadMonitoring.realMonitoring = realMonitoring
  },
  SET_FLOWRANKING: (state, flowRanking) => {
    state.roadMonitoring.flowRanking = flowRanking
  },
  SET_ROADMONITORING: (state, roadMonitoring) => {
    state.roadMonitoring.roadMonitoring = roadMonitoring
  },
  SET_CHANGEROAD: (state, changeRode) => {
    state.roadMonitoring.changeRode = changeRode
  },
  SET_FORECAST:(state, forecast)=>{
    state.roadMonitoring.forecast = forecast
  }
}

const roadMonitoring = {
  state: state,
  actions: actions,
  mutations: mutations
}
export default roadMonitoring

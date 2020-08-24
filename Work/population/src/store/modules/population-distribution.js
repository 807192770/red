
const state = {
  regionPopulation:{
    heatMap:[],
    lengthTime:[],
    populationType:[],
    genderAge:{},
    numberOfUsers:[],
    totalUsers:[],
    homeOfNumber:[],
    currentPopulation:[],
    totalNumber:0
  }
}
const actions = {
  
}
const mutations = {
  
  SET_AGE: (state, genderAge) => {
    state.regionPopulation.genderAge = genderAge
  },
  SET_USERS: (state, numberOfUsers) => {
    state.regionPopulation.numberOfUsers = numberOfUsers
  },
  SET_TOTALUSERS: (state, totalUsers) => {
    state.regionPopulation.totalUsers = totalUsers
  },
  SET_TYPE: (state, populationType) => {
    state.regionPopulation.populationType = populationType
  },
  SET_HEATMAP: (state, heatMap) => {
    state.regionPopulation.heatMap = heatMap
  },
  SET_LENGTHTIME: (state, lengthTime) => {
    state.regionPopulation.lengthTime = lengthTime
  },
  SET_HOMENUMBER: (state, homeOfNumber) => {
    state.regionPopulation.homeOfNumber = homeOfNumber
  },
  SET_CURRENTPOPULATION: (state, currentPopulation) => {
    state.regionPopulation.currentPopulation = currentPopulation
  },
  SET_TOTALNUMBER: (state, totalNumber) => {
    state.regionPopulation.totalNumber = totalNumber
  },
}

const populationDistuibution = {
  state:state,
  actions:actions,
  mutations:mutations,
}
export default populationDistuibution
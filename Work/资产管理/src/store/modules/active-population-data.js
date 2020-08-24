
const state = {
  activePopulation: {
      genderAge: {},
      genderAgeRegion: {
        xAxis: ["<18", "18-24", "25-30", "31-40", "41-50", "51-60", ">60",],
        male: ['180', '190', '200', '220', '190', '180', '170',],
        female: ['180', '190', '200', '220', '190', '180', '170',],
      },
      populationOrigin: [],
      ageList: [{
        value: 19043,
        name: '流动人口'
      },
      {
        value: 310567,
        name: '常住人口'
      },
      ],
      carList: [],
      otherProvinces: [],
      originList: [],
      activeList: [],
      mapList: [],
      mapMappingList: new Map(),
      populationType: [],
      treeList: [],
      mapCrumb: {},
      populationNumber:[],
      populationNumberList:new Map(),
    }
}

// mutations
const mutations = {

  SET_AGE: (state, genderAge) => {
    state.activePopulation.genderAge = genderAge
  },
  SET_ORIGIN: (state, populationOrigin) => {
    state.activePopulation.populationOrigin = populationOrigin
  },
  SET_TABLE: (state, carList) => {
    state.activePopulation.carList = carList
  },
  SET_OTHERPROVINCES: (state, otherProvinces) => {
    state.activePopulation.otherProvinces = otherProvinces
  },
  SET_ROAM: (state, originList) => {
    state.activePopulation.originList = originList
  },
  SET_ACTIVE: (state, activeList) => {
    state.activePopulation.activeList = activeList
  },
  SET_MAP: (state, mapList) => {
    var s = state.activePopulation
    mapList.forEach((element) => {
      s.mapMappingList.set(element.region_id, element);
    })
    var resultMapList = []
    s.mapMappingList.forEach(function (value, key, map) {
      resultMapList.push(value)
    })
    console.log("resultMapList",resultMapList)
    s.mapList = resultMapList
  },
  SET_TYPE: (state, populationType) => {
    state.activePopulation.populationType = populationType
  },
  SET_TREE: (state, treeList) => {
    state.activePopulation.treeList = treeList
  },
  SET_CRUMB: (state, mapCrumb) => {
    state.activePopulation.mapCrumb = mapCrumb
  },
  SET_POPULATIONNUMBER: (state, populationNumber) => {
    // state.activePopulation.populationNumber = populationNumber
    var s = state.activePopulation
    populationNumber.forEach((element) => {
      s.populationNumberList.set(element.region_id, element);
    })
    var resultMapList = []
    s.populationNumberList.forEach(function (value, key, map) {
      resultMapList.push(value)
    })
    s.populationNumber = resultMapList
  },
};
// actions
const actions = {

};

const active = {
  state,
  actions,
  mutations,
}
export default active

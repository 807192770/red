
const state = {
  xionganActive: {
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

  SET_XIONGAN_ACTIVE_AGE: (state, genderAge) => {
    state.xionganActive.genderAge = genderAge
  },
  SET_XIONGAN_ACTIVE_ORIGIN: (state, populationOrigin) => {
    state.xionganActive.populationOrigin = populationOrigin
  },
  SET_XIONGAN_ACTIVE_TABLE: (state, carList) => {
    state.xionganActive.carList = carList
  },
  SET_XIONGAN_ACTIVE_OTHERPROVINCES: (state, otherProvinces) => {
    state.xionganActive.otherProvinces = otherProvinces
  },
  SET_XIONGAN_ACTIVE_ROAM: (state, originList) => {
    state.xionganActive.originList = originList
  },
  SET_XIONGAN_ACTIVE_ACTIVE: (state, activeList) => {
    state.xionganActive.activeList = activeList
  },
  SET_XIONGAN_ACTIVE_MAP: (state, mapList) => {
    var s = state.xionganActive
    mapList.forEach((element) => {
      s.mapMappingList.set(element.region_id, element);
    })
    var resultMapList = []
    s.mapMappingList.forEach(function (value, key, map) {
      resultMapList.push(value)
    })
    // console.log("resultMapList",resultMapList)
    s.mapList = resultMapList
  },
  SET_XIONGAN_ACTIVE_TYPE: (state, populationType) => {
    state.xionganActive.populationType = populationType
  },
  SET_XIONGAN_ACTIVE_TREE: (state, treeList) => {
    state.xionganActive.treeList = treeList
  },
  SET_XIONGAN_ACTIVE_CRUMB: (state, mapCrumb) => {
    state.xionganActive.mapCrumb = mapCrumb
  },
  SET_XIONGAN_ACTIVE_POPULATIONNUMBER: (state, populationNumber) => {
    // state.xionganActive.populationNumber = populationNumber
    var s = state.xionganActive
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

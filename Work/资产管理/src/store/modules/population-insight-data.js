const state = {
  populationInsight:{
    peopleType: [],//人口类型
    genderAge:{},//性别及年龄
    numOwn: {
      pro:[],interPro:[],inter:[]
    },//号码归属地top10
    commutingRadius: [],//通勤半径
    commutingTime:[] ,//通勤时长
    hobby:{indicator:[],ydata:[]},//兴趣爱好
    populationChange: {},//人口数量变化
    mapList:[],//地图数据
    treeList:[] ,//城市列表
    mapCrumb:{},//选择项
  }
};

// mutations
const mutations = {
  SET_POPULATION_TYPE: (state, peopleType) => {
    state.populationInsight.peopleType = peopleType;
  },
  SET_POPULATION_GENDER: (state, genderAge) => {
    state.populationInsight.genderAge = genderAge;
  },
  SET_POPULATION_NUM: (state, numOwn) => {
    state.populationInsight.numOwn = numOwn;
  },
  SET_POPULATION_RADIUS: (state, commutingRadius) => {
    state.populationInsight.commutingRadius = commutingRadius;
  },
  SET_POPULATION_TIME: (state, commutingTime) => {
    state.populationInsight.commutingTime = commutingTime;
  },
  SET_POPULATION_HOBBY: (state, hobby) => {
    state.populationInsight.hobby = hobby;
  },
  SET_POPULATION_CHANGE: (state, populationChange) => {
    state.populationInsight.populationChange = populationChange;
  },
  SET_POPULATION_MAP:(state, mapList) => {
    state.populationInsight.mapList = mapList;
  },
  SET_POPULATION_CRUMB: (state, mapCrumb) => {
    state.populationInsight.mapCrumb = mapCrumb
  },
  SET_POPULATION_TREE: (state, treeList) => {
    state.populationInsight.treeList = treeList
  },
};
// actions
const actions = {

};

const active = {
  state,
  actions,
  mutations,
};
export default active

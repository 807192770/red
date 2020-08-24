import permanent from "./modules/permanent-population";

const getters = {
  commuteTimeList: state => state.active.activePopulation.commuteTimeList,
  originList: state => state.active.activePopulation.originList,
  agelist: state => state.active.activePopulation.agelist,
  carList: state => state.active.activePopulation.carList,
  genderAge: state => state.active.activePopulation.genderAge,
  populationOrigin: state => state.active.activePopulation.populationOrigin,
  otherProvinces: state => state.active.activePopulation.otherProvinces,
  activeList: state => state.active.activePopulation.activeList,
  mapList: state => state.active.activePopulation.mapList,
  populationType: state => state.active.activePopulation.populationType,
  treeList: state => state.active.activePopulation.treeList,
  mapCrumb: state => state.active.activePopulation.mapCrumb,
  populationNumber: state => state.active.activePopulation.populationNumber,

  numberOfUsers: state => state.populationDistuibution.regionPopulation.numberOfUsers,
  heatMap: state => state.populationDistuibution.regionPopulation.heatMap,
  lengthTime: state => state.populationDistuibution.regionPopulation.lengthTime,
  populationType: state => state.populationDistuibution.regionPopulation.populationType,
  genderAge: state => state.populationDistuibution.regionPopulation.genderAge,
  totalUsers: state => state.populationDistuibution.regionPopulation.totalUsers,
  homeOfNumber: state => state.populationDistuibution.regionPopulation.homeOfNumber,
  currentPopulation: state => state.populationDistuibution.regionPopulation.currentPopulation,
  totalNumber: state => state.populationDistuibution.regionPopulation.totalNumber,
  // sidebar: state => state.app.sidebar,
  // language: state => state.app.language,
  // size: state => state.app.size,
  // device: state => state.app.device,
  // visitedViews: state => state.tagsView.visitedViews, //配置多标签页面
  // cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  // permission_routers: state => state.permission.routers,
  // addRouters: state => state.permission.addRouters
  // 城市群
  customerFlowList: state => state.urbanAgglomeration.urbanAgglomerationData.customerFlowList,
  commutingModeList: state => state.urbanAgglomeration.urbanAgglomerationData.commutingModeList,
  selectList: state => state.urbanAgglomeration.urbanAgglomerationData.selectList,
  selectValue1: state => state.urbanAgglomeration.urbanAgglomerationData.selectValue1,
  selectValue2: state => state.urbanAgglomeration.urbanAgglomerationData.selectValue2,
  fakeMapData: state => state.urbanAgglomeration.urbanAgglomerationData.fakeMapData,
  // 流动人口
  visitedDays: state => state.floatingPopulation.floatingPopulationData.visitedDays,
  areaAllData: state => state.floatingPopulation.floatingPopulationData.areaAllData,


  // 区域人口洞察
  populGenderAge: state => state.populationInsight.populationInsight.genderAge,
  populPeopleType: state => state.populationInsight.populationInsight.peopleType,
  populNumOwn: state => state.populationInsight.populationInsight.numOwn,
  populCommutingRadius: state => state.populationInsight.populationInsight.commutingRadius,
  populCommutingTime: state => state.populationInsight.populationInsight.commutingTime,
  populHobby: state => state.populationInsight.populationInsight.hobby,
  populPopulationChange: state => state.populationInsight.populationInsight.populationChange,
  populTreeList: state => state.populationInsight.populationInsight.treeList,
  populMapList: state => state.populationInsight.populationInsight.mapList,

  //职住人口分析
  tabMenu: state => state.permanent.permanentData.tabMenu,
  professionResideMove: state => state.permanent.permanentData.professionResideMove,
  permanentProfessionData: state => state.permanent.permanentData.professionResideMoveData
};
export default getters

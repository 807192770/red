const getters = {
  numberOfUsers: state => state.populationDistuibution.regionPopulation.numberOfUsers,
  heatMap: state => state.populationDistuibution.regionPopulation.heatMap,
  lengthTime: state => state.populationDistuibution.regionPopulation.lengthTime,
  populationType: state => state.populationDistuibution.regionPopulation.populationType,
  genderAge: state => state.populationDistuibution.regionPopulation.genderAge,
  totalUsers: state => state.populationDistuibution.regionPopulation.totalUsers,
  homeOfNumber: state => state.populationDistuibution.regionPopulation.homeOfNumber,
  currentPopulation: state => state.populationDistuibution.regionPopulation.currentPopulation,
  totalNumber: state => state.populationDistuibution.regionPopulation.totalNumber,
  moveOutNum: state => state.floatingPopulation.floatingPopulation.moveOutNum,
  cumulative: state => state.floatingPopulation.floatingPopulation.cumulative,
  ranking: state => state.floatingPopulation.floatingPopulation.ranking,
  rankingTwo: state => state.floatingPopulation.floatingPopulation.rankingTwo,
  contrast: state => state.floatingPopulation.floatingPopulation.contrast
}
export default getters

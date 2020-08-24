
const state = {
  permanentData:{
    tabMenu:0,//0 职住移动规律 1 工作的分布 2 居住地分布
    professionResideMove:[],
    professionResideMoveData:[]
  }
};
const actions = {

};
const mutations = {
  SET_TABMENU: (state, tabMenu) => {
    state.permanentData.tabMenu = tabMenu
  },
  SET_MOVE: (state, professionResideMove) => {
    state.permanentData.professionResideMove = professionResideMove
  },
  SET_PERMANENT_PROFESSION:(state, professionResideMoveData) =>{
    state.permanentData.professionResideMoveData = professionResideMoveData;
  }
};

const permanent = {
  state:state,
  actions:actions,
  mutations:mutations,
};
export default permanent

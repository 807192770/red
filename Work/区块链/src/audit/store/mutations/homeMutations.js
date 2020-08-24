
// mutations
const mutations = {
    GET_ORGANIZATION_1: (state, payload) => {
        state.dutyData1 = payload
    },
    GET_ORGANIZATION_2: (state, payload) => {
        state.dutyData2 = payload
    },
    GET_ORGANIZATION_3: (state, payload) => {
        state.dutyData3 = payload
    },
    GET_APPLY_STATICS: (state, payload) => {
        state.applyData = payload
    },
    GET_ALL_RECORDS: (state, payload) => {
        state.interfaceData = payload
    },
    GET_COUNT: (state, payload) => {
        // ???????
        state.historyData = payload
    },
    GET_RECENT_THIRTY_DAYS: (state, payload) => {
        state.secureData = payload
    },
    GET_TT_COUNT: (state, payload) => {
        state.historyData = payload
    },
    GET_LOGGED_USER_TOTAL_NUM: (state, payload) => {
        state.LoggedUserTotalNum = payload
    },
    GET_USER_TOTAL_NUM: (state, payload) => {
        state.UserTotalNum = payload
    },
    GET_BLOCKHEIGHT: (state, payload) => {
        state.historyData = payload
    }
};
export default mutations;
import Vue from 'vue';
import { GetOrganization, GetApplyStatics, GetAllRecords, GetCount, GetRecentThirtyDays, GetTxCount, GetLoggedUserTotalNum, GetUserTotalNum, GetBlockHeight } from "@/api/home";


// 首页 actions
const actions = {
  getOrganization({ commit, state }, payload) {
    // 获取职责目录、数据目录、信息系统
    return new Promise((res, rej) => {
      GetOrganization(payload)
        .then(response => {
          let data = response.body;
          res(response);
          commit(`GET_ORGANIZATION_${payload.type}`, data || {});
        })
        .catch(error => {
          console.log(error);
        });
    })

  },
  getApplyStatics({ commit, state }, payload) {
    // 获取申请统计
    return new Promise((res, rej) => {
      GetApplyStatics(payload)
        .then(response => {
          let data = response.body;
          res(response);
          commit('GET_APPLY_STATICS', data || {});
        })
        .catch(error => {
          console.log(error);
        });
    })
  },
  getAllRecords({ commit, state }, payload) {
    // 获取接口状态
    return new Promise((res, rej) => {
      GetAllRecords(payload)
        .then(response => {
          let data = response.body;
          res(response);
          commit('GET_ALL_RECORDS', data || {});
        })
        .catch(error => {
          console.log(error);
        });
    })
  },
  getCount({ commit, state }, payload) {
    // 获取消费请求态势
    return new Promise((res, rej) => {
      GetCount(payload)
        .then(response => {
          let data = response.body;
          res(response);
          commit('GET_COUNT', data || {});
        })
        .catch(error => {
          console.log(error);
        });
    })
  },
  getRecentThirtyDays({ commit, state }, payload) {
    // 获取整体态势
    return new Promise((res, rej) => {
      GetRecentThirtyDays(payload)
        .then(response => {
          let data = response.body;
          res(response);
          commit('GET_RECENT_THIRTY_DAYS', data || {});
        })
        .catch(error => {
          console.log(error);
        });
    });
  },
  getTxCount({ commit, state }, payload) {
    // 获取目录区块交易总数
    return new Promise((res, rej) => {
      GetTxCount(payload)
        .then(response => {
          let data = response.body;
          res(response);
          commit('GET_TT_COUNT', data || {});
        })
        .catch(error => {
          console.log(error);
        });
    });
  },
  getLoggedUserTotalNum({ commit, state }, payload) {
    // 获取当前登录用户数
    return new Promise((res, rej) => {
      GetLoggedUserTotalNum(payload)
        .then(response => {
          let data = response.body;
          res(response);
          commit('GET_LOGGED_USER_TOTAL_NUM', data || {});
        })
        .catch(error => {
          console.log(error);
        });
    });
  },
  getUserTotalNum({ commit, state }, payload) {
    // 获取用户总数
    return new Promise((res, rej) => {
      GetUserTotalNum(payload)
        .then(response => {
          let data = response.body;
          res(response);
          commit('GET_USER_TOTAL_NUM', data || {});
        })
        .catch(error => {
          console.log(error);
        });
    });
  },
  getBlockHeight({ commit, state }, payload) {
    // 获取目录区块高度
    return new Promise((res, rej) => {
      GetBlockHeight(payload)
        .then(response => {
          let data = response.body;
          res(response);
          commit('GET_BLOCKHEIGHT', data || {});
        })
        .catch(error => {
          console.log(error);
        });
    });
  },
};
export default actions;

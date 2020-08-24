import Vue from 'vue';
import { OrderApproval, GetAppToDoOrder, GetAppHistory, GetAppDetail, RollBackOrder, GetAppDoneOrder, CancelFinishedOrder, BatchOrderApproval } from "@/api/applicationManage";
// 申请管理 actions
const actions = {
  // 我的申请 start
  getAppHistory({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      GetAppHistory(payload)
        .then(response => {
          resolve(response);
          let data = response.body;
          
          commit('GET_APP_HISTORY', data || {});
        })
        .catch(error => {
          // console.log(error);
        });
    })
  },
  getAppDetail({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      GetAppDetail(payload)
        .then(response => {
          let data = response.body;
          commit('GET_APP_DETAILS', data || {});
          resolve(response);
        })
        .catch(error => {
          console.log(error);
        });
    })

  },
  rollBackOrder({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      RollBackOrder(payload)
        .then(response => {
          if (response.head.code == '000000') {
            Vue.prototype.$message.success('撤回成功！');
            resolve(response);
          }
        })
        .catch(error => {
          Vue.prototype.$message.error('撤回失败！');
        });
    })

  },
  cancelFinishedOrder({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      CancelFinishedOrder(payload)
        .then(response => {
          if (response.head.code == '000000') {
            Vue.prototype.$message.success('取消权限成功！');
            resolve(response);
          }
        })
        .catch(error => {
          Vue.prototype.$message.error('取消权限失败！');
        });
    })

  },
  // 我的申请 end
  // 我的已办 start
  getAppDoneOrder({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      GetAppDoneOrder(payload)
        .then(response => {
          let data = response.body;
          commit('GET_APP_DONE_ORDER', data || {});
          resolve(response);
        })
        .catch(error => {
          console.log(error);
        });
    })

  },
  // 我的已办 end
  // 我的待办 start
  getToDoOrder({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      GetAppToDoOrder(payload)
        .then(response => {
          let data = response.body;
          commit('GET_TO_DO_ORDER', data || {});
          resolve(response);
        })
        .catch(error => {
          console.log(error);
        });
    });
  },
  batchOrderApproval({ commit, state }, payload) {
    // 订单批量审批
    return new Promise((resolve, reject) => {
      BatchOrderApproval(payload)
        .then(response => {
          Vue.prototype.$message.success(response.head.msg);
          commit('CHANGE_LOADING', false)
          resolve(response);
        })
        .catch(error => {
          console.log(error);
        });
    });
  },
  orderApproval({ commit, state }, payload) {
    // 订单审批
    return new Promise((resolve, reject) => {
    OrderApproval(payload)
      .then(response => {
        Vue.prototype.$message.success(response.head.msg);
        commit('CHANGE_LOADING', false)
        resolve(response);
      })
      .catch(error => {
        console.log(error);
      });
    });
  },
};
export default actions;

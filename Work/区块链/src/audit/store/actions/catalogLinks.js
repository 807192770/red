import Vue from 'vue';
import {GetQueryNodes,GetQuerySpecifiedNode,GetSubmitOrder,GetCancelPermission} from "@/api/catalogChain";
// 我的目录链 actions
const actions = {
  getQueryNodes({ commit, state }, payload) {
    // 获取目录树
    return new Promise((resolve, reject) => {
      GetQueryNodes(payload)
        .then(response => {
          resolve(response);
          let data = response.body;
        })
        .catch(error => {
          // console.log(error);
        });
    })
  },
  getQuerySpecifiedNode({ commit, state }, payload) {
    // 根据子节点获取目录树
    return new Promise((resolve, reject) => {
      GetQuerySpecifiedNode(payload)
        .then(response => {
          resolve(response);
          let data = response.body;
          
        })
        .catch(error => {
          // console.log(error);
        });
    })
  },
  getSubmitOrder({ commit, state }, payload) {
    // 申请权限
    return new Promise((resolve, reject) => {
      GetSubmitOrder(payload)
        .then(response => {
          resolve(response);
          let data = response.body;
          
        })
        .catch(error => {
          // console.log(error);
        });
    })
  },
  getCancelPermission({ commit, state }, payload) {
    // 取消权限
    return new Promise((resolve, reject) => {
      GetCancelPermission(payload)
        .then(response => {
          resolve(response);
          let data = response.body;
          
        })
        .catch(error => {
          // console.log(error);
        });
    })
  },
};
export default actions;

import actions from '../actions/homeActions';
import mutations from '../mutations/homeMutations';

const state = {
 
  catalogData: [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其它',
      value: 5,
    },
  ],
  infoSysData: [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其它',
      value: 5,
    },
  ],
  dutyData1: [
    // {
    //   body: {
    //     "count": 5,
    //     "organizationVoList": [
    //       {
    //         "orgName": "河南省濮阳市濮阳县商务局办公系统",
    //         "item": 1,
    //         "scale": 0.2
    //       },
    //       {
    //         "orgName": "河南公安局",
    //         "item": 4,
    //         "scale": 0.8
    //       }
    //     ]
    //   }
    // }
  ],
  dutyData2: [],
  dutyData3: [],
  applyData: {
    // 申请统计
    "proceedCount": 1,// 已处理
    "waitForProceedCount": 27,//待处理
    "refuseCount": 1 // 已拒绝
  },
  interfaceData: [
    {
      "id": 1,
      "nodeName": "财政局",
      "nodeNode": "03871996",
      "status": 1
    },
    {
      "id": 2,
      "nodeName": "交通局",
      "nodeNode": "03871911",
      "status": 1
    },
    {
      "id": 3,
      "nodeName": "水利局",
      "nodeNode": "81229379",
      "status": 1
    },
    {
      "id": 4,
      "nodeName": "卫健局",
      "nodeNode": "12345568",
      "status": 1
    },
    {
      "id": 5,
      "nodeName": "人社局",
      "nodeNode": "26542919",
      "status": 0
    }
  ],
  secureData: [
    // 整体态势
    {
      "time": "2020-05-14",
      "type0num": 1,
      "type1num": 2
    },
    {
      "time": "2020-05-15",
      "type0num": 2,
      "type1num": 3
    },
    {
      "time": "2020-05-16",
      "type0num": 3,
      "type1num": 4
    },
    {
      "time": "2020-05-17",
      "type0num": 4,
      "type1num": 5
    },
    {
      "time": "2020-05-18",
      "type0num": 5,
      "type1num": 6
    },
    {
      "time": "2020-05-19",
      "type0num": 6,
      "type1num": 7
    },
    {
      "time": "2020-05-20",
      "type0num": 7,
      "type1num": 8
    },
    {
      "time": "2020-05-21",
      "type0num": 8,
      "type1num": 9
    },
    {
      "time": "2020-05-22",
      "type0num": 9,
      "type1num": 10
    },
    {
      "time": "2020-05-23",
      "type0num": 10,
      "type1num": 11
    },
    {
      "time": "2020-05-24",
      "type0num": 11,
      "type1num": 12
    },
    {
      "time": "2020-05-25",
      "type0num": 12,
      "type1num": 13
    },
    {
      "time": "2020-05-26",
      "type0num": 13,
      "type1num": 14
    },
    {
      "time": "2020-05-27",
      "type0num": 14,
      "type1num": 15
    },
    {
      "time": "2020-05-28",
      "type0num": 15,
      "type1num": 16
    },
    {
      "time": "2020-05-29",
      "type0num": 16,
      "type1num": 17
    },
    {
      "time": "2020-05-30",
      "type0num": 17,
      "type1num": 18
    },
    {
      "time": "2020-05-31",
      "type0num": 18,
      "type1num": 19
    },
    {
      "time": "2020-06-01",
      "type0num": 11,
      "type1num": 12
    },
    {
      "time": "2020-06-02",
      "type0num": 12,
      "type1num": 13
    },
    {
      "time": "2020-06-03",
      "type0num": 13,
      "type1num": 14
    },
    {
      "time": "2020-06-04",
      "type0num": 1,
      "type1num": 0
    },
    {
      "time": "2020-06-05",
      "type0num": 11,
      "type1num": 12
    },
    {
      "time": "2020-06-06",
      "type0num": 12,
      "type1num": 13
    },
    {
      "time": "2020-06-07",
      "type0num": 13,
      "type1num": 14
    },
    {
      "time": "2020-06-08",
      "type0num": 1,
      "type1num": 0
    },
    {
      "time": "2020-06-09",
      "type0num": 11,
      "type1num": 12
    },
    {
      "time": "2020-06-10",
      "type0num": 12,
      "type1num": 13
    },
    {
      "time": "2020-06-11",
      "type0num": 13,
      "type1num": 14
    },
    {
      "time": "2020-06-12",
      "type0num": 1,
      "type1num": 0
    },
    {
      "time": "2020-06-13",
      "type0num": 1,
      "type1num": 0
    }
  ],
  LoggedUserTotalNum:0,
  UserTotalNum:0,
};

// getters
const getters = {
  cartProducts: rootState => rootState,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

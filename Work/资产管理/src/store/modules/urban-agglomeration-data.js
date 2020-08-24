/* eslint-disable no-param-reassign */
// import axios from 'axios'
// import * as types from '../mutationTypes';

// initial state
const state = {
  urbanAgglomerationData: {
    customerFlowList: {},
    commutingModeList: [],
    selectList:[],
    selectValue1:[],
    selectValue2:[],
    fakeMapData: [
      {
        'citys': [{
          'name': '张家界',
          'value': [110.46601, 29.136923, 0],
          'symbolSize': '7'
        }, {
          'name': '常德',
          'value': [111.698629, 29.056127, 0],
          'symbolSize': '5'
        }, {
          'name': '岳阳',
          'value': [113.133618, 29.378927, 1],
          'symbolSize': '6'
        }, {
          'name': '益阳',
          'value': [112.342534, 28.586251, 1],
          'symbolSize': '3'
        }, {
          'name': '怀化',
          'value': [110.006077, 27.62374, 2],
          'symbolSize': '3'
        }, {
          'name': '娄底',
          'value': [111.992985, 27.75476, 2],
          'symbolSize': '5'
        }, {
          'name': '长沙',
          'value': [112.942171, 28.237535, 4],
          'symbolSize': '8'
        }, {
          'name': '邵阳',
          'value': [111.441066, 27.279059, 4],
          'symbolSize': '3'
        }, {
          'name': '永州',
          'value': [111.606642, 26.454044, 2],
          'symbolSize': '5'
        }, {
          'name': '郴州',
          'value': [113.023234, 25.806347, 3],
          'symbolSize': '3'
        }, {
          'name': '衡阳',
          'value': [112.600096, 26.933294, 3],
          'symbolSize': '4'
        }, {
          'name': '湘潭',
          'value': [112.949889, 27.841581, 4],
          'symbolSize': '5'
        }, {
          'name': '株洲',
          'value': [113.138461, 27.841581, 4],
          'symbolSize': 4
        }],
        'moveLines': [{
          'fromName': '永州',
          'toName': '张家界',
          'coords': [
            [111.606642, 26.454044],
            [110.46601, 29.136923]
          ],
          'value': 100,
          lineStyle: {
            normal: {
                // color: "red",
                width: 2,
                // type: "dashed",
                curveness: 0.1
            }
        }
        }, {
          'fromName': '长沙',
          'toName': '永州',
          'coords': [
            [112.942171, 28.237535],
            [111.606642, 26.454044]
          ],
          'value': 100,
          lineStyle: {
            normal: {
                // color: "red",
                width: 2,
                // type: "dashed",
                curveness: 0.1
            }
        }
        }, {
          'fromName': '永州',
          'toName': '怀化',
          'coords': [
            [111.606642, 26.454044],
            [110.006077, 27.62374]
          ],
          'value': 100,
          lineStyle: {
            normal: {
                // color: "red",
                width: 2,
                // type: "dashed",
                curveness: 0.1
            }
        }
        }, {
          'fromName': '怀化',
          'toName': '衡阳',
          'coords': [
            [110.006077, 27.62374],
            [112.600096, 26.933294]
          ],
          'value': 300,
          lineStyle: {
            normal: {
                // color: "red",
                width: 2,
                // type: "dashed",
                curveness: 0.1
            }
        }
        }, {
          'fromName': '怀化',
          'toName': '株洲',
          'coords': [
            [110.006077, 27.62374],
            [113.138461, 27.841581]
          ],
          'value': 300,
          lineStyle: {
            normal: {
                // color: "red",
                width: 2,
                // type: "dashed",
                curveness: 0.1
            }
        }
        }, {
          'fromName': '株洲',
          'toName': '常德',
          'coords': [
            [113.138461, 27.841581],
            [111.698629, 29.056127]
          ],
          'value': 500,
          lineStyle: {
            normal: {
                // color: "red",
                width: 2,
                // type: "dashed",
                curveness: 0.1
            }
        }
        }, {
          'fromName': '常德',
          'toName': '岳阳',
          'coords': [
            [111.698629, 29.056127],
            [113.133618, 29.378927]
          ],
          'value': 900,
          lineStyle: {
            normal: {
                // color: "red",
                width: 2,
                // type: "dashed",
                curveness: 0.1
            }
        }
        }, {
          'fromName': '邵阳',
          'toName': '岳阳',
          'coords': [
            [111.441066, 27.279059],
            [113.133618, 29.378927]
          ],
          'value': '1000',
          lineStyle: {
            normal: {
              width: 6,
            }
          },
        }, {
          'fromName': '娄底',
          'toName': '邵阳',
          'coords': [
            [111.992985, 27.75476],
            [111.441066, 27.279059]
          ],
          'value': '1000',
          lineStyle: {
            normal: {
              width: 6,
            }
          },
        }, {
          'fromName': '长沙',
          'toName': '娄底',
          'coords': [
            [112.942171, 28.237535],
            [111.992985, 27.75476]
          ],
          'value': '1000',
          lineStyle: {
            normal: {
              width: 6,
            }
          },
        }, {
          'fromName': '长沙',
          'toName': '郴州',
          'coords': [
            [112.942171, 28.237535],
            [113.023234, 25.806347]
          ],
          'value': '800',
          lineStyle: {
            normal: {
              width: 6,
            }
          },
        }, {
          'fromName': '张家界',
          'toName': '永州',
          'coords': [
            [110.46601, 29.136923],
            [111.606642, 26.454044]
          ],
          'value': '750',
          lineStyle: {
            normal: {
              width: 6,
            }
          },
        }, {
          'fromName': '张家界',
          'toName': '岳阳',
          'coords': [
            [110.46601, 29.136923],
            [113.133618, 29.378927]
          ],
          'value': '950'
        }, {
          'fromName': '张家界',
          'toName': '益阳',
          'coords': [
            [110.46601, 29.136923],
            [112.342534, 28.586251]
          ],
          'value': '28'
        }, {
          'fromName': '张家界',
          'toName': '常德',
          'coords': [
            [110.46601, 29.136923],
            [111.698629, 29.056127]
          ],
          'value': '19'
        }, {
          'fromName': '张家界',
          'toName': '怀化',
          'coords': [
            [110.46601, 29.136923],
            [110.006077, 27.62374]
          ],
          'value': '80'
        }, {
          'fromName': '益阳',
          'toName': '岳阳',
          'coords': [
            [112.342534, 28.586251],
            [113.133618, 29.378927]
          ],
          'value': '170'
        }, {
          'fromName': '郴州',
          'toName': '娄底',
          'coords': [
            [113.023234, 25.806347],
            [111.992985, 27.75476]
          ],
          'value': '990'
        }, {
          'fromName': '郴州',
          'toName': '怀化',
          'coords': [
            [113.023234, 25.806347],
            [110.006077, 27.62374]
          ],
          'value': '200'
        }, {
          'fromName': '郴州',
          'toName': '岳阳',
          'coords': [
            [113.023234, 25.806347],
            [113.133618, 29.378927]
          ],
          'value': '190'
        }, {
          'fromName': '张家界',
          'toName': '娄底',
          'coords': [
            [110.46601, 29.136923],
            [111.992985, 27.75476]
          ],
          'value': '990'
        }]
      }
    ],
  }
}
// actions
const actions = {}

// mutations
const mutations = {
  SET_CUSTOMER: (state, customerFlowList) => {
    state.urbanAgglomerationData.customerFlowList = customerFlowList
  },
  SET_COMMUTING: (state, commutingModeList) => {
    state.urbanAgglomerationData.commutingModeList = commutingModeList
  },
  SET_SELECTLIST: (state, subSelectList) => {
    state.urbanAgglomerationData.selectList = subSelectList
  },
  SET_SELECTVALUE1: (state, subSelectList) => {
    state.urbanAgglomerationData.selectValue1 = subSelectList
  },
  SET_SELECTVALUE2: (state, subSelectList) => {
    state.urbanAgglomerationData.selectValue2 = subSelectList
  },
}

const urbanAgglomeration = {
  namespaced: true,
  state: state,
  actions,
  mutations
}
export default urbanAgglomeration

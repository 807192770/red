import actions from '../actions/catalogLinks';
import mutations from '../mutations/catalogLinks';

const state = {
  catalog: {
    id: 0,
    label: "公安局",
    checked: true,
    identification: "institution",
    children: [
      {
        id: 2,
        label: "身份信息管理处",
        checked: true,
        identification: "organize",
        children: [
          {
            id: 5,
            label: "UserBase数据库",
            checked: true,
            identification: "dataBase",
            children: [
              {
                id: 9,
                label: "UserBase表",
                checked: true,
                identification: "libraryTable",
                children: [
                  {
                    id: 11,
                    label: "姓名",
                    checked: true,
                    identification: "field"
                  },
                  {
                    id: 12,
                    label: "身份证号码",
                    checked: true,
                    identification: "field"
                  },
                  {
                    id: 13,
                    label: "性别",
                    checked: true,
                    identification: "field"
                  },
                  {
                    id: 14,
                    label: "出生日期",
                    checked: true,
                    identification: "field"
                  },
                  {
                    id: 15,
                    label: "民族",
                    checked: true,
                    identification: "field"
                  }
                ]
              },
              {
                id: 10,
                label: "UserHabit表",
                identification: "libraryTable",
                checked: true,
                children: [
                  {
                    id: 16,
                    label: "姓名",
                    checked: true,
                    identification: "field"
                  },
                  {
                    id: 17,
                    label: "身份证号码",
                    checked: true,
                    identification: "field"
                  },
                  {
                    id: 18,
                    label: "性别",
                    checked: true,
                    identification: "field"
                  },
                  {
                    id: 19,
                    label: "出生日期",
                    checked: true,
                    identification: "field"
                  },
                  {
                    id: 20,
                    label: "民族",
                    checked: true,
                    identification: "field"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 3,
        label: "户籍信息管理处",
        checked: true,
        identification: "organize",
        children: [
          {
            id: 7,
            label: "UserLocatione数据库",
            checked: true,
            identification: "dataBase",
            children: [
              {
                id: 21,
                label: "UserLocation表",
                identification: "libraryTable",
                checked: true,
                children: [
                  {
                    id: 22,
                    label: "姓名",
                    checked: true,
                    identification: "field"
                  },
                  {
                    id: 23,
                    label: "身份证号码",
                    checked: true,
                    identification: "field"
                  },
                  {
                    id: 24,
                    label: "户籍",
                    checked: true,
                    identification: "field"
                  }
                ]
              }
            ]
          },
          {
            id: 8,
            label: "UserLocatione表",
            identification: "dataBase",
            checked: true
          }
        ]
      }
    ]
  },
};

// getters
const getters = {
  processOptions: state => state.processOptions,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

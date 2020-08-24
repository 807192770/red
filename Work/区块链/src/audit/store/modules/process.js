import actions from '../actions/process';
import mutations from '../mutations/process';

const state = {
  processOptions: [
    {
      value: '1',
      label: 'PE0010001'
    }, {
      value: '2',
      label: 'PE0010002'
    }, {
      value: '3',
      label: 'PE0010003'
    }, {
      value: '4',
      label: 'PE0010004'
    }, {
      value: '5',
      label: 'PE0010005'
    }],
  statusOptions: [
    {
      value: '1',
      label: '全部'
    }, {
      value: '2',
      label: '待审批'
    }, {
      value: '3',
      label: '审批通过'
    }, {
      value: '4',
      label: '审批驳回'
    }
  ],
  auditorOptions: [
    {
      value: 'wangxiaolong',
      label: '王小龙'
    }, {
      value: 'zhangmanli',
      label: '张曼丽'
    }, {
      value: 'liqianqian',
      label: '李茜茜'
    }, {
      value: 'wangxiaowu',
      label: '王小五'
    }, {
      value: 'gaoqian',
      label: '高倩'
    }
  ],
  processList: [
    {
      proId: 'PE0010001',
      eventId: 'E001',
      eventName: '申请电脑、显示器',
      status: '审批中',
      auditor: 'wangxiaolong',
      applicant: 'wangsnasn',
      msg: '申请搜索权限按钮权限',

    }, {
      proId: 'PE0010001',
      eventId: 'E001',
      eventName: '申请电脑、显示器',
      status: '审批中',
      auditor: 'zhanglan',
      applicant: 'wangsnasn',
      msg: '申请搜索权限按钮权限',

    }, {
      proId: 'PE0010001',
      eventId: 'E001',
      eventName: '申请电脑、显示器',
      status: '审批中',
      auditor: 'zhanglan',
      applicant: 'wangsnasn',
      msg: '申请搜索权限按钮权限',

    }, {
      proId: 'PE0010001',
      eventId: 'E001',
      eventName: '申请电脑、显示器',
      status: '审批中',
      auditor: 'zhanglan',
      applicant: 'wangsnasn',
      msg: '申请搜索权限按钮权限',

    }
  ],
  currentListDetail: {
    eventId: '1',
    id: '002',
    applicant: '张厘米',
    applicantMis:'wangxiaolong',
    applyMsg: '我想要申请一个惠普的电脑，目前由于我想要申请一个惠普的电脑，目前由于我想要申请一个惠普的电脑，目前由于我想要申请一个惠普的电脑，目前由于我想要申请一个惠普的电脑，目前由于',
    auditMsg: '',
    currentNode: '003',
    steps: [
      {
        nodeId: '001',
        nodeName: '直接经理审批',
        auditor: '吴丽密',
        auditorMis: 'wulimi001',
        status: 1, // 1表示已经审批，0表示等待审批,
        auditCode: 1, // 1表示审批通过， 2表示驳回， 0表示空
        pre: null,
        next: '002'
      },
      {
        nodeId: '002',
        nodeName: '部门经理审批',
        auditor: '张厘米',
        auditorMis: 'wulimi001',
        status: 1, // 1表示已经审批，0表示等待审批,
        auditCode: 2, // 1表示审批通过， 2表示驳回， 0表示空
        pre: '001',
        next: '003'
      },
      {
        nodeId: '003',
        nodeName: '财务审批',
        auditor: '刘敏',
        auditorMis: 'liumin001',
        status: 0, // 1表示已经审批，0表示等待审批,
        auditCode: 0, // 1表示审批通过， 2表示驳回， 0表示空
        pre: '002',
        next: '04'
      },
      {
        nodeId: '004',
        nodeName: 'HRBP审批',
        auditor: '王茜茜',
        auditorMis: 'wangxixi001',
        status: 0, // 1表示已经审批，0表示等待审批,
        auditCode: 0, // 1表示审批通过， 2表示驳回， 0表示空
        pre: '005',
        next: null
      },
    ],
  }
}

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

<template>
  <div class="major-info">
    <!-- 设备信息 -->
    <el-form
      ref="majorForm"
      size="small"
      class="details-box"
      :model="majorInfo"
      label-position="top"
    >
      <el-row :gutter="20" class="row-item">
        <el-col :span="8">
          <el-form-item label="设备编号">
            <el-input v-model="majorInfo.terNum" disabled style="width:100%"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
          <el-form-item label="设备状态">
            <el-input v-model="majorInfo.deviceStatus" disabled style="width:100%"></el-input>
          </el-form-item>
        </el-col>-->
        <el-col :span="8">
          <el-form-item label="钳头采样间隔">
            <el-select
              style="width:75%"
              clearable
              filterable
              v-model="majorInfo.CHSI"
              placeholder="请选择钳头采样间隔"
            >
              <el-option label="连续" :value="1"></el-option>
              <el-option label="2s" :value="2"></el-option>
              <el-option label="3s" :value="3"></el-option>
              <el-option label="5s" :value="5"></el-option>
              <el-option label="10s" :value="10"></el-option>
            </el-select>

            <el-tooltip class="item" effect="dark" content="点击下发" placement="top">
              <el-button
                icon="el-icon-s-promotion"
                type="primary"
                size="mini"
                class="ctrl-btn"
                @click="addTSTMD('jaw_interval',['interval'])"
                circle
              ></el-button>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="量程">
            <el-select
              style="width:75%"
              clearable
              filterable
              v-model="majorInfo.range"
              placeholder="请选择量程"
            >
              <el-option label="5A" :value="10"></el-option>
              <el-option label="100A" :value="20"></el-option>
            </el-select>
            <el-tooltip class="item" effect="dark" content="点击下发" placement="top">
              <el-button
                icon="el-icon-s-promotion"
                type="primary"
                size="mini"
                class="ctrl-btn"
                @click="addTSTMD('set_work_mode',['workMode','lineMode','range'])"
                circle
              ></el-button>
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="row-item">
        <el-col :span="8">
          <el-form-item label="4G工作模式">
            <el-select
              style="width:75%"
              clearable
              filterable
              v-model="majorInfo.FGWorkingMode"
              placeholder="请选择4G工作模式"
            >
              <el-option label="常开" :value="1"></el-option>
              <el-option label="间歇" :value="2"></el-option>
            </el-select>
            <el-tooltip class="item" effect="dark" content="点击下发" placement="top">
              <el-button
                icon="el-icon-s-promotion"
                type="primary"
                size="mini"
                class="ctrl-btn"
                @click="addTSTMD('set_fourG',['fourGMode'])"
                circle
              ></el-button>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="PT变比">
            <el-input v-model="majorInfo.PTChangeRatio" style="width:75%"></el-input>
            <el-tooltip class="item" effect="dark" content="点击下发" placement="top">
              <el-button
                icon="el-icon-s-promotion"
                type="primary"
                size="mini"
                class="ctrl-btn"
                @click="addTSTMD('set_pct_value',['pt','ct'])"
                circle
              ></el-button>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="CT变比">
            <el-input v-model="majorInfo.CTChangeRatio" style="width:75%"></el-input>
            <el-tooltip class="item" effect="dark" content="点击下发" placement="top">
              <el-button
                icon="el-icon-s-promotion"
                type="primary"
                size="mini"
                class="ctrl-btn"
                @click="addTSTMD('set_pct_value',['pt','ct'])"
                circle
              ></el-button>
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="row-item">
        <el-col :span="12">
          <el-form-item label="工作模式">
            <el-select
              style="width:41%"
              clearable
              filterable
              v-model="majorInfo.workingModeA"
              placeholder="请选择工作模式"
            >
              <el-option label="电量模式" :value="1"></el-option>
              <el-option label="电流模式" :value="2"></el-option>
            </el-select>
            <el-select
              style="width:41%"
              clearable
              filterable
              v-model="majorInfo.workingModeB"
              placeholder="请选择终端模式"
            >
              <el-option label="终端模式" :value="1"></el-option>
              <el-option label="无终端模式" :value="2"></el-option>
            </el-select>

            <el-tooltip class="item" effect="dark" content="点击下发" placement="top">
              <el-button
                icon="el-icon-s-promotion"
                type="primary"
                size="mini"
                class="ctrl-btn"
                @click="addTSTMD('set_work_mode',['workMode','lineMode','range'])"
                circle
              ></el-button>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="接线方式">
            <el-select
              style="width:41%"
              clearable
              filterable
              v-model="majorInfo.wiringModeA"
              placeholder="请选择接线方式"
            >
              <el-option label="三相三线" :value="2"></el-option>
              <el-option label="三相四线" :value="1"></el-option>
            </el-select>
            <el-select
              style="width:41%"
              clearable
              filterable
              v-model="majorInfo.wiringModeB"
              placeholder="请选择接线方式"
            >
              <el-option label="高供高计" :value="0"></el-option>
              <el-option label="高供低计" :value="5"></el-option>
            </el-select>
            <el-tooltip class="item" effect="dark" content="点击下发" placement="top">
              <el-button
                icon="el-icon-s-promotion"
                type="primary"
                size="mini"
                class="ctrl-btn"
                @click="addTSTMD('set_work_mode',['workMode','lineMode','range'])"
                circle
              ></el-button>
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="row-item">
        <el-col :span="24">
          <el-form-item label="高压钳表编号">
            <el-row :gutter="20" class="row-item" type="flex">
              <el-col :span="8" class="sub-item">
                <label for>A相</label>
                <el-input style="width:80%" v-model="majorInfo.HPCAPN" v-popover:popoverA></el-input>
                <el-popover ref="popoverA" placement="top" trigger="focus" effect="dark">
                  <b>请勿填写前4位英文编号</b>
                </el-popover>
              </el-col>
              <el-col :span="8" class="sub-item">
                <label for>B相</label>
                <el-input style="width:80%" v-model="majorInfo.HPCBPN" v-popover:popoverB></el-input>
                <el-popover ref="popoverB" placement="top" trigger="focus" effect="dark">
                  <b>请勿填写前4位英文编号</b>
                </el-popover>
              </el-col>
              <el-col :span="8" class="sub-item">
                <label for>C相</label>
                <el-input style="width:80%" v-model="majorInfo.HPCCPN" v-popover:popoverC></el-input>
                <el-popover ref="popoverC" placement="top" trigger="focus" effect="dark">
                  <b>请勿填写前4位英文编号</b>
                </el-popover>
              </el-col>
              <el-col :span="2" class="sub-item">
                <span style="width:100%">
                  <el-tooltip class="item" effect="dark" content="点击下发" placement="top">
                    <el-button
                      icon="el-icon-s-promotion"
                      type="primary"
                      size="mini"
                      class="ctrl-btn"
                      @click="setJawNum('set_jaw_num')"
                      circle
                    ></el-button>
                  </el-tooltip>
                </span>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="row-item">
        <el-col :span="24">
          <el-form-item label="钳头设定状态">
            <el-row :gutter="20" class="row-item" type="flex">
              <el-col :span="8" class="sub-item">
                <label for>A相</label>
                <el-switch
                  v-model="majorInfo.HPCAPS"
                  class="demo-switch"
                  active-color="#5D77E4"
                  active-text="启"
                  :active-value="1"
                  inactive-color="#f85955"
                  inactive-text="停"
                  :inactive-value="2"
                />
              </el-col>
              <el-col :span="8" class="sub-item">
                <label for>B相</label>
                <el-switch
                  v-model="majorInfo.HPCBPS"
                  class="demo-switch"
                  active-color="#5D77E4"
                  active-text="启"
                  :active-value="1"
                  inactive-color="#f85955"
                  inactive-text="停"
                  :inactive-value="2"
                />
              </el-col>
              <el-col :span="8" class="sub-item">
                <label for>C相</label>
                <el-switch
                  v-model="majorInfo.HPCCPS"
                  class="demo-switch"
                  active-color="#5D77E4"
                  active-text="启"
                  :active-value="1"
                  inactive-color="#f85955"
                  inactive-text="停"
                  :inactive-value="2"
                />
              </el-col>
              <el-col :span="2" class="sub-item">
                <span style="width:100%">
                  <el-tooltip class="item" effect="dark" content="点击下发" placement="top">
                    <el-button
                      icon="el-icon-s-promotion"
                      type="primary"
                      size="mini"
                      class="ctrl-btn"
                      @click="setJawStatus('jaw_no')"
                      circle
                    ></el-button>
                  </el-tooltip>
                </span>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" class="row-item" justify="space-between">
        <el-col :span="24">
          <el-form-item label="设备操作" class="hid-label">
            <el-tooltip class="item" effect="dark" content="设备操作" placement="top">
              <el-button
                type="danger"
                size="mini"
                class="ctrl-btn"
                icon="el-icon-s-tools"
                circle
                @click="ctrlDialog"
              ></el-button>
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      title="功能操作"
      class="ctrl-handle"
      :visible.sync="ctrlDialogVisible"
      width="25%"
      append-to-body
    >
      <div class="content">
        <span class="item">
          <el-button type="primary" @click="handle('adjust_time',null,null)">设备校时</el-button>
        </span>
        <span class="item">
          <el-button type="cyan" @click="handle('dev_init',100,'设备初始化')">设备初始化</el-button>
        </span>
        <span class="item">
          <el-button type="warning" @click="handle('dev_restart',null,'设备重启')">重 启</el-button>
        </span>
        <span class="item">
          <el-button type="danger" @click="handle('del_dev_data',null,'删除主机数据')">删除主机数据</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GetDeviceOperate } from "../../../api/deviceManagement";
import { assign } from "@/utils/validate";
export default {
  name: "data-alarm",
  data() {
    return {
      majorInfo: {
        deviceStatus: "", //设备状态
        terNum: "", //设备编号
        CHSI: 0, //钳头采样间隔
        HPCAPN: "", //A相高压钳表编号
        HPCBPN: "", //B相高压钳表编号
        HPCCPN: "", //C相高压钳表编号
        HPCAPS: false, //A相钳头设定状态
        HPCBPS: false, //B相钳头设定状态
        HPCCPS: false, //C相钳头设定状态
        workingModeA: 0, //工作模式A
        workingModeB: 0, //工作模式B
        workingModeAll: "", //工作模式拼接
        wiringModeA: 0, //接线方式A
        wiringModeB: 0, //接线方式B
        wiringModeAll: "", //接线方式拼接
        FGWorkingMode: 0, //4G工作模式
        PTChangeRatio: 0.0, //PT变比
        CTChangeRatio: 0.0, //CT变比
        range: 0, //量程
      },
      ctrlDialogVisible: false,
    };
  },
  props: ["allDeviceInfo", "onlineStatus", "systemTaskId"],
  watch: {
    allDeviceInfo: {
      handler(n, o) {
        this.initData();
      },
      deep: true,
    },
  },
  mounted() {},
  methods: {
    initData() {
      console.log(this.allDeviceInfo);
      this.majorInfo.deviceStatus = this.onlineStatus;
      this.majorInfo.terNum = this.allDeviceInfo.deviceNo;
      this.majorInfo.CHSI = this.allDeviceInfo.intervalTime;
      this.majorInfo.HPCAPN = this.allDeviceInfo.aJaw.slice(4);
      this.majorInfo.HPCBPN = this.allDeviceInfo.bJaw.slice(4);
      this.majorInfo.HPCCPN = this.allDeviceInfo.cJaw.slice(4);
      this.majorInfo.HPCAPS = this.allDeviceInfo.aSwitchStatus;
      this.majorInfo.HPCBPS = this.allDeviceInfo.bSwitchStatus;
      this.majorInfo.HPCCPS = this.allDeviceInfo.cSwitchStatus;
      this.majorInfo.workingModeA = this.allDeviceInfo.workMode;
      this.majorInfo.workingModeB = this.allDeviceInfo.clientMode;
      this.majorInfo.wiringModeA = this.allDeviceInfo.lineMode;
      this.majorInfo.wiringModeB = this.allDeviceInfo.measureMode;
      this.majorInfo.FGWorkingMode = this.allDeviceInfo.fourGMode;
      this.majorInfo.PTChangeRatio = (+this.allDeviceInfo.pt).toFixed(1);
      this.majorInfo.CTChangeRatio = (+this.allDeviceInfo.ct).toFixed(1);
      this.majorInfo.range = this.allDeviceInfo.measureRange;
    },
    addTSTMD(field, param) {
      // 除高压钳表编号、钳头设定状态 指令下发
      let par = {
        cmd: field,
        param: {},
        dno: this.allDeviceInfo.deviceNo,
        taskId: this.systemTaskId,
      };

      this.majorInfo.PTChangeRatio = (+this.majorInfo.PTChangeRatio).toFixed(1);
      this.majorInfo.CTChangeRatio = (+this.majorInfo.CTChangeRatio).toFixed(1);
      // 新增枚举
      this.majorInfo.workingModeAll =
        this.majorInfo.workingModeB + "" + this.majorInfo.workingModeA;
      this.majorInfo.wiringModeAll =
        this.majorInfo.wiringModeB + "" + this.majorInfo.wiringModeA;
      // par 枚举
      let obj = {
        interval: "CHSI",
        lineMode: "wiringModeAll",
        range: "range",
        workMode: "workingModeAll",
        ct: "CTChangeRatio",
        pt: "PTChangeRatio",
        fourGMode: "FGWorkingMode",
      };
      param.forEach((el) => {
        par.param[el] = this.majorInfo[obj[el]];
      });
      this.getDeviceOperate(par);
    },
    setJawNum(field) {
      // 高压钳表编号 指令下发
      let par = {
        cmd: field,
        dno: this.allDeviceInfo.deviceNo,
        taskId: this.systemTaskId,
      };
      let param = {
        jawCount: 0,
      };
      assign(param, "jawNo1", `GYQA${this.majorInfo.HPCAPN}`);
      assign(param, "jawNo2", `GYQA${this.majorInfo.HPCBPN}`);
      assign(param, "jawNo3", `GYQA${this.majorInfo.HPCCPN}`);
      param.jawCount = Object.keys(param).length - 1;
      //console.log(Object.keys(param).length);
      console.log(param);
      if (Object.keys(param).length > 1) {
        par.param = param;
      }
      this.getDeviceOperate(par);
    },
    setJawStatus(field) {
      // 钳头设定状态 指令下发
      let par = {
        cmd: field,
        dno: this.allDeviceInfo.deviceNo,
        taskId: this.systemTaskId,
        param: {
          jawStatus1: this.majorInfo.HPCAPS,
          jawStatus2: this.majorInfo.HPCBPS,
          jawStatus3: this.majorInfo.HPCCPS,
        },
      };
      this.getDeviceOperate(par);
    },
    ctrlDialog() {
      this.ctrlDialogVisible = true;
    },
    handle(field, num, tips) {
      // 设备校时、重启、删除主机数据
      let par = {
        cmd: field,
        dno: this.allDeviceInfo.deviceNo,
        taskId: this.systemTaskId,
      };
      if (num != null) {
        //设备初始化
        par.param = {
          iWarnValue: num,
        };
      }
      if (field != "adjust_time") {
        // 破坏性操作 提醒信息
        this.$confirm(`此操作将${tips}, 是否继续?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            GetDeviceOperate(par)
              .then((r) => {
                console.log(r);
                if (r.code == 200) {
                  this.$message.success("操作成功");
                  this.ctrlDialogVisible = false;
                } else {
                  this.$message.error(r.msg);
                }
              })
              .catch((e) => {
                console.log(e);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作",
            });
          });
      } else {
        GetDeviceOperate(par)
          .then((r) => {
            console.log(r);
            if (r.code == 200) {
              this.$message.success("操作成功");
              this.ctrlDialogVisible = false;
            } else {
              this.$message.error(r.msg);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },

    getDeviceOperate(par) {
      // 指令下发到后端
      console.log(par);
      GetDeviceOperate(par)
        .then((r) => {
          console.log(r);
          if (r.code == 200) {
            this.$message.success("指令下发成功");
          } else {
            this.$message.error(r.msg);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
<style lang='scss' scoped>
.major-info {
  width: 100%;
  .ctrl-btn {
    float: right;
  }
  .sub-item {
    display: flex;
    align-items: center;
    label {
      width: 35px;
    }
    .demo-switch {
      margin-left: 15%;
    }
  }
}
.ctrl-handle {
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    button {
      width: 150px;
      margin: 10px;
    }
  }
}
</style>

<template>
  <div class="loss-analysis">
    <!--  损耗分析 -->
    <el-form ref="queryForm" :inline="true" :model="queryForm" class="query-box" size="small">
      <el-row class="row-item">
        <el-col :span="14">
          <el-form-item label="结算日期" prop="createTime">
            <el-date-picker v-if="field=='volume'" v-model="setData" :picker-options="pickerDataOptions"
              value-format="yyyy-MM-dd" unlink-panels type="daterange" align="right" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" @change="getAnalyzeByQuery()" />
            <el-date-picker v-else v-model="queryForm.setTime" :picker-options="pickerOptions" value-format="yyyy-MM-dd"
              align="right" type="date" placeholder="选择日期" @change="getAnalyzeByQuery()" />
          </el-form-item>
          <el-form-item>
            <el-select v-model="queryForm.taskID" filterable clearable placeholder="请选择任务"
              @change="getAnalyzeByQuery()">
              <el-option v-for="(it, index) in taskNameList" :label="it.name" :value="it.id" :key="index" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-radio-group v-if="field == 'loss' || field == 'power'" v-model="queryForm.dimension" class="ml20"
              @change="getAnalyzeByQuery()">
              <el-radio v-if="addDataCode==1" :label="1">1小时</el-radio>
              <el-radio v-if="addDataCode==1" :label="2">4小时</el-radio>
              <el-radio :label="3">一天</el-radio>
              <el-radio :label="4">三天</el-radio>
              <el-radio :label="5">七天</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <span v-if="field =='volume'">
              变压器型号：{{taskInfo.transfomerType}}
              <i class="ml5">变压器容量：{{taskInfo.transformerVolume + " KVA "}}</i>
            </span>
          </el-form-item>
        </el-col>
        <el-col :span="10" class="tr">
          <el-row :gutter="10" type="flex" justify="space-between">
            <el-col :span="5">
              <el-button v-if="addDataCode==0" class="btn" size="small" type="warning" @click="addData()">参数输入
              </el-button>
            </el-col>
            <el-col :span="19" class="row-btn">
              <el-button :class="{ cur:current[0]}" size="small" class="danger btn" type="danger"
                @click="onSubmit('loss',0)">损失率分析</el-button>
              <el-button :class="{ cur:current[1]}" size="small" class="primary btn" type="primary"
                @click="onSubmit('power',1)">电能分析</el-button>
              <el-button :class="{ cur:current[2]}" size="small" class="cyan btn" type="cyan"
                @click="onSubmit('current',2)">电流分析</el-button>
              <el-button v-if="temperatureFlag" :class="{ cur:current[3]}" size="small" class="warning btn"
                type="warning" @click="onSubmit('volume',3)">容量监测</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
    <!-- 内容区 -->
    <section class="content">
      <div v-show="tableDataLength">
        <lineInfo :charts-data="chartsData" :field="field" :cycle="cycle" child-id="active-power" />
        <div :is="currentView" :table-data="tableData" :field="field" :cycle="cycle" />
        <lineInfoVol2 v-if="field=='volume'" :table-data="tableData2" :field="field" :cycle="cycle"
          child-id="active-volume" />
      </div>
      <div v-show="addDataCode==0&&!tableDataLength" class="none">
        <div>
          <img :src="require('../../assets/images/arrow.png')" alt />
          <span class="mt20">请点击上方按钮 参数输入</span>
        </div>
      </div>
      <div v-show="noData&&!tableDataLength" class="no-data">
        <img :src="require('../../assets/images/noData.png')" alt />
      </div>
    </section>
    <div class="pop-container">
      <el-dialog :visible.sync="dialogVisible" :width="dialogWidth" :close-on-click-modal="false" title="参数输入">
        <div class="content">
          <suppData :dialog-data="dialogData" @initWidth="initWidth" @closeDialog="closeDialog"
            @getAnalyzeByQuery="getAnalyzeByQuery" />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import lineInfo from "./subView/lineInfo";
import tableInfo from "./subView/tableInfo";
import tableInfoCur from "./subView/tableInfoCur";
import lineInfoVol from "./subView/lineInfoVol";
import lineInfoVol2 from "./subView/lineInfoVol2";
import suppData from "./subView/suppData";
import { parseTime } from "@/utils/validate";
import { GetTaskRunning } from "../../api/taskManagement";
import {
  GetAnalyzeById,
  GetAnalyzeInput,
  GetAnalyzeByQuery,
} from "../../api/dataAnalysis";
export default {
  name: "LossAnalysis",
  components: {
    lineInfo,
    tableInfo,
    tableInfoCur,
    lineInfoVol,
    lineInfoVol2,
    suppData,
  },
  data() {
    return {
      queryForm: {
        setTime: "",
        begin: "",
        taskID: "",
        dimension: 3,
        metric: "loss",
      },
      setData: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      currentView: "tableInfo",
      pickerDataOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      dialogVisible: false,
      taskNameList: [],
      temperatureFlag: 0,
      noData: true,
      dialogWidth: "34%",
      field: "loss",
      tableData: [],
      tableData2: [],
      chartsData: [],
      dialogData: {},
      cycle: 1,
      addDataCode: 1,
      tableDataLength: false,
      current: [true, false, false, false],
      taskInfo: {},
    };
  },
  watch: {
    "queryForm.taskID": {
      handler(n, o) {
        if (n != o) {
          this.queryForm.dimension = 3;
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.getTaskList();
    this.initDate();
    this.initWidth(2);
    this.$route.query.id ? this.getAnalyzeById() : (this.noData = true);
  },
  methods: {
    initDate() {
      // 获取当前日期
      this.queryForm.setTime = parseTime(new Date().getTime(), "{y}-{m}-{d}");
      this.setData = [
        parseTime(new Date().getTime() - 3600 * 1000 * 24 * 7, "{y}-{m}-{d}"),
        parseTime(new Date().getTime(), "{y}-{m}-{d}"),
      ];
    },
    getTaskList() {
      // 获取任务名称下拉
      GetTaskRunning()
        .then((r) => {
          this.taskNameList = r;
          if (this.$route.query.id) {
            this.queryForm.taskID = parseInt(this.$route.query.id);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getAnalyzeById() {
      // id 查询
      GetAnalyzeById(this.$route.query.id)
        .then((r) => {
          if (r.code == 200) {
            // temperature 容量监测tab 1 显示 0 不显示
            this.temperatureFlag = r.data.temperature;
            this.taskInfo = r.data.task;
            // 从含有容量监测跳转到不含容量监测权限的任务时 重新/点击损失率/分析按钮
            if (this.temperatureFlag == 0 && this.field == "volume") {
              this.onSubmit("loss", 0);
            }
            this.tableData = [];
            this.tableData2 = [];
            this.chartsData = {};
            this.addDataCode = r.data.code;
            if (r.data.code == 0) {
              // 输入数据
              this.noData = false;
              if (r.data.tableData.length > 0) {
                this.tableData =
                  this.field == "volume" ? r.data.chart2 : r.data.tableData;
                this.tableData2 = r.data.chart3;
                this.chartsData = r.data.chart;
                this.tableDataLength = true;
              } else {
                // 没有数据
                this.tableDataLength = false;
              }
              this.dialogData = r.data.input;
            } else if (r.data.code == -1) {
              // 数据不完整
              this.noData = true;
              if (r.data.tableData.length > 0) {
                // 暂停
                this.tableData =
                  this.field == "volume" ? r.data.chart2 : r.data.tableData;
                this.tableData2 = r.data.chart3;
                this.chartsData = r.data.chart;
                // 暂停
                this.tableDataLength = true;
              } else {
                this.tableDataLength = false;
                this.$message.warning("数据不完整");
              }
            } else {
              // 正常数据
              this.tableData = [];
              this.chartsData = {};
              this.noData = false;
              this.tableDataLength = true;
              // 容量监测是chart2 否则是tableData
              this.tableData =
                this.field == "volume" ? r.data.chart2 : r.data.tableData;
              this.tableData2 = r.data.chart3;
              this.chartsData = r.data.chart;
            }
          } else {
            this.noData = true;
            this.queryForm.dimension = 3;
            this.$message.error(r.msg);
            this.addDataCode = -2;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getAnalyzeByQuery() {
      // 参数查询
      this.cycle = this.queryForm.dimension;
      if (this.field == "volume") {
        if (this.setData.length == 0) {
          this.$message.warning("请选择时间");
          return;
        }
        var par = {
          begin: this.setData[0],
          dimension: this.queryForm.dimension,
          taskId: this.queryForm.taskID,
          forDate: this.setData[1],
          metric: this.queryForm.metric,
        };
      } else {
        if (this.queryForm.setTime == null) {
          this.$message.warning("请选择时间");
          return;
        }
        var par = {
          begin: this.queryForm.begin,
          dimension: this.queryForm.dimension,
          taskId: this.queryForm.taskID,
          forDate: this.queryForm.setTime,
          metric: this.queryForm.metric,
        };
      }
      GetAnalyzeByQuery(par)
        .then((r) => {
          if (r.code == 200) {
            this.temperatureFlag = r.data.temperature;
            this.taskInfo = r.data.task;

            if (this.temperatureFlag == 0 && this.field == "volume") {
              this.onSubmit("loss", 0);
            }

            this.tableData = [];
            this.chartsData = {};
            this.tableData2 = [];
            this.addDataCode = r.data.code;
            if (r.data.code == 0) {
              // 可输入
              console.log(r.data.code);
              this.noData = false;
              if (r.data.tableData.length > 0) {
                this.tableData =
                  this.field == "volume" ? r.data.chart2 : r.data.tableData;
                this.tableData2 = r.data.chart3;
                this.chartsData = r.data.chart;
                this.tableDataLength = true;
              } else {
                this.tableDataLength = false;
              }
              this.dialogData = r.data.input;
            } else if (r.data.code == -1) {
              // 数据不完整
              console.log(r.data.code);
              this.noData = true;
              if (r.data.tableData.length > 0) {
                // 暂停
                this.tableData =
                  this.field == "volume" ? r.data.chart2 : r.data.tableData;
                this.tableData2 = r.data.chart3;
                this.chartsData = r.data.chart;
                // 暂停
                this.tableDataLength = true;
              } else {
                this.tableDataLength = false;
                this.$message.warning("数据不完整");
              }
            } else {
              // ok
              console.log(r.data.code);
              this.tableData = [];
              this.chartsData = {};
              this.noData = false;
              this.tableDataLength = true;
              this.tableData =
                this.field == "volume" ? r.data.chart2 : r.data.tableData;
              this.tableData2 = r.data.chart3;
              this.chartsData = r.data.chart;
            }
          } else {
            console.log("500");
            this.noData = true;
            this.queryForm.dimension = 3;
            this.$message.warning(r.msg);
            this.addDataCode = -2;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addData() {
      this.dialogVisible = true;
    },
    onSubmit(field, index) {
      // 初始化 电流和容量监测.
      this.queryForm.metric = field;
      this.field = field;
      this.current = [false, false, false, false];
      this.current[index] = true;
      switch (field) {
        case "current":
          this.queryForm.dimension = 0;
          this.currentView = "tableInfoCur";
          break;
        case "volume":
          this.queryForm.dimension = 1;
          this.queryForm.begin = this.setData[0];
          this.queryForm.setTime = this.setData[1];
          this.currentView = "lineInfoVol";
          break;
        case "loss":
        case "power":
          console.log(this.queryForm.dimension);
          if (!this.queryForm.dimension) {
            this.queryForm.dimension = 3;
          }
          this.currentView = "tableInfo";
          break;
      }
      this.getAnalyzeByQuery();
    },
    initWidth(data) {
      const dialogWidthList1280 = {
        item2: "52%",
        item3: "59%",
        item4: "66%",
        item5: "73%",
        item6: "80%",
        item7: "87%",
        item8: "94%",
      };
      const dialogWidthList1440 = {
        item2: "44%",
        item3: "51%",
        item4: "58%",
        item5: "65%",
        item6: "72%",
        item7: "79%",
        item8: "83%",
      };
      const dialogWidthList1680 = {
        item2: "39%",
        item3: "43%",
        item4: "49%",
        item5: "55%",
        item6: "61%",
        item7: "67%",
        item8: "73%",
      };
      const dialogWidthList1920 = {
        item2: "34%",
        item3: "39%",
        item4: "43%",
        item5: "48%",
        item6: "53%",
        item7: "58%",
        item8: "63%",
      };
      let dialogWidthList;
      if (document.body.offsetWidth >= 1920) {
        dialogWidthList = dialogWidthList1920;
      } else if (
        document.body.offsetWidth >= 1680 &&
        document.body.offsetWidth < 1920
      ) {
        dialogWidthList = dialogWidthList1680;
      } else if (
        document.body.offsetWidth >= 1440 &&
        document.body.offsetWidth < 1680
      ) {
        dialogWidthList = dialogWidthList1440;
      } else if (
        document.body.offsetWidth >= 1280 &&
        document.body.offsetWidth < 1440
      ) {
        dialogWidthList = dialogWidthList1280;
      } else if (document.body.offsetWidth < 1280) {
        dialogWidthList = dialogWidthList1280;
      }

      this.dialogWidth = dialogWidthList["item" + data];
    },
    closeDialog(data) {
      this.dialogVisible = data;
    },
  },
};
</script>
<style lang='scss' scoped>
.loss-analysis {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  .query-box {
    background: #fff;
    padding: 20px 20px 5px 20px;
    margin-bottom: 10px;
    .row-btn {
      display: flex;
      justify-content: center;
      .btn {
        padding: 9px 15px;
        margin: 0px 5px 10px 0;
      }
      .danger.cur {
        color: #f85955 !important;
        background: #fff !important;
        border-color: #f85955 !important;
      }
      .primary.cur {
        color: #5d77e4 !important;
        background: #fff !important;
        border-color: #5d77e4 !important;
      }
      .cyan.cur {
        color: #2a8dff !important;
        background: #fff !important;
        border-color: #2a8dff !important;
      }
      .warning.cur {
        color: #ffa400 !important;
        background: #fff !important;
        border-color: #ffa400 !important;
      }
    }
  }
  .content {
    flex: 1 1 auto;
    min-height: 0;
    background: #fff;
    .no-data {
      padding: 20px;
      height: 100%;
      text-align: center;
    }
    .none {
      z-index: 999;
      background: #fff;
      padding: 20px;
      height: 100%;

      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 20%;
        img {
          width: 125px;
        }
        span {
          font-size: 20px;
        }
      }
    }
  }
}
</style>


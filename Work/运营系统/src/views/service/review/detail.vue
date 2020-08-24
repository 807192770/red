<template>
  <div class="app-container">
    <section class="content">
      <el-row class="header" type="flex" justify="space-around">
        <el-col :span="10">
          <el-form :model="task" :inline="true">【{{task.name}}】检测报告</el-form>
        </el-col>
        <el-col :span="10">
          <el-form :model="report" :inline="true">申请日期：{{ (report.applyTime || '').slice(0,10) }}</el-form>
        </el-col>
      </el-row>
      <lineInfo :charts-data="lossChart" :field="f_loss" child-id="loss_chart" :cycle="c_loss" />
      <lineInfo :charts-data="powerChart" :field="f_power" child-id="pwer_chart" :cycle="c_power" />
      <lineInfo
        :charts-data="currentChart"
        :field="f_current"
        child-id="current_chart"
        :cycle="c_current"
      />
      <lineInfo
        :charts-data="volumeChart"
        :field="f_volume"
        child-id="volume_chart"
        :cycle="c_volume"
      />
      <el-form label-width="100px" size="small">
        <el-row class="list">
          <el-col :span="12" class="item">
            <el-form-item label="分析结果">
              <el-input
                type="textarea"
                :rows="4"
                label="分析结果"
                placeholder="请输入分析结果"
                v-model="report.analyze"
                maxlength="200"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="item">
            <el-form-item label="专家建议">
              <el-input
                type="textarea"
                :rows="4"
                label="专家建议"
                placeholder="请输入专家建议"
                v-model="report.expert"
                maxlength="200"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="24" class="tr">
          <el-button type="primary" size="small" @click="saveReport()">保存</el-button>
          <el-button type="success" size="small" @click="releaseReport()">发布</el-button>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import lineInfo from "./subView/lineInfo";
import Editor from "@/components/Editor";
import Cookies from "js-cookie";
import { assign } from "@/utils/validate";
import { DetailReport, ReleaseReport, SaveReport } from "@/api/service/list.js";
export default {
  name: "detail",
  components: {
    lineInfo,
    Editor,
  },
  data() {
    return {
      f_loss: "loss",
      f_power: "power",
      f_current: "current",
      f_volume: "volume",
      c_loss: 3,
      c_power: 3,
      c_current: 0,
      c_volume: 1,
      task: {},
      report: {},
      lossChart: {},
      powerChart: {},
      currentChart: {},
      volumeChart: {},
    };
  },
  created() {
    this.handleDetails();
  },
  methods: {
    /** 查询某个报告的详情 */
    handleDetails() {
      let par = {};
      assign(par, "id", this.$route.query.id);
      DetailReport(par).then((response) => {
        if (response.code == 200) {
          this.task = response.data.task;
          this.report = response.data.report;
          this.lossChart = response.data.lossChart;
          this.powerChart = response.data.powerChart;
          this.currentChart = response.data.currentChart;
          this.volumeChart = response.data.volumeChart;
        }
        //console.log(response.data);
      });
    },
    /** 保存报告 */
    saveReport() {
      let par = {};
      assign(par, "analyze", this.report.analyze);
      assign(par, "expert", this.report.expert);
      assign(par, "id", this.report.id);
      assign(par, "uid", Cookies.get("uid"));
      SaveReport(par).then((response) => {
        if (response.code == 200) {
          this.msgSuccess(response.data);
        }
      });
    },
    /** 保存报告 */
    releaseReport() {
      let par = {};
      assign(par, "rid", this.report.id);
      assign(par, "uid", Cookies.get("uid"));
      ReleaseReport(par).then((response) => {
        if (response.code == 200) {
          this.msgSuccess(response.data);
        }
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.header {
  padding: 10px 5px;
  background: #f5f5f5;
  border-radius: 5px;

  .el-form {
    line-height: 40px;
  }
}
.list {
  .item {
    margin: 15px 0;
  }
}
.tr {
  text-align: right;
}
</style>

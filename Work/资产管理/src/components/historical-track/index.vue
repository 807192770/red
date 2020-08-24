<template>
  <div class="historical-track">
    <!-- 历史轨迹 -->
    <div class="main">
      <div class="list">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="标签ID：">
            <el-input v-model="formLabelAlign.ID"></el-input>
          </el-form-item>
          <el-form-item label="起止时间：">
            <div class="block">
              <el-date-picker v-model="value" type="daterange" align="right" unlink-panels range-separator="至"
                start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="显示状态：">
            <el-radio v-model="radio" label="1">倍速播放</el-radio>
            <el-radio v-model="radio" label="2">轨迹显示</el-radio>
          </el-form-item>
          <el-button type="primary" @click="start()" size="small" style="width:100%;">开始</el-button>
        </el-form>
      </div> 
      <div class="map">
        <div class="map-content">
          <!-- 寅时地图 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        labelPosition: "top",
        formLabelAlign: {
          ID: ""
        },
        pickerOptions: {
          shortcuts: [{
              text: "最近一周",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近三个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              }
            }
          ]
        },
        value: "",
        radio: "1"
      };
    },

    components: {},

    mounted() {},

    methods: {
      getMapLine() {
        var params = {
          task: "cityGroupContanctPeople",
          statisDate: this.day
        };
        getCityAnalysisGroup(params).then(response => {
          sessionStorage.setItem("mapLineData", JSON.stringify(response.data));
          this.mapAllData = response.data;
        });
      },
      start() {
        console.log("start");
      }
    }
  };

</script>
<style lang='scss' scoped>
  .historical-track {
    display: flex;
    justify-content: center;

    .main {
      width: 80%;
      display: flex;

      .list /deep/ {
        flex: 0.45;
        height: 100%;
        background: white;
        padding: 20px 17px;

        .el-date-editor {
          width: 100% !important;

          .el-range-separator {
            width: 8% !important;
          }
        }
      }

      .map {
        margin-left: 30px;
        flex: 1;
        height: 720px;
        background: white;
      }
    }
  }

</style>

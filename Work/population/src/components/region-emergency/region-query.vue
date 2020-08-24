<template>
  <!-- 快捷查询 -->
  <div :id="id">
    <div class="query-table">
      <div class="btn-left">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          :start-placeholder="this.startTime.slice(0, 4) + '-' + this.startTime.slice(4, 6)+ '-' + this.startTime.slice(6)"
          :end-placeholder="this.endTime.slice(0, 4) + '-' + this.endTime.slice(4, 6)+ '-' + this.endTime.slice(6)"
          value-format="yyyyMMdd"
          size="mini"
          :picker-options="pickerOptions0"
        ></el-date-picker>
        <span class="sure" @click="dateSend()">确定</span>
      </div>
      <el-table
        :data="tableData"
        :height="height+'rem'"
        :cell-style="{padding:'2px'}"
        :header-cell-style="{'background-color': '#182E4D','color': '#2181EA','border-bottom':  '1px solid #214470'}"
      >
        <el-table-column prop="events_type" label="应急事件" width="90px" align="center"></el-table-column>
        <el-table-column prop="events_date" label="发生时间" width="150px" align="center"></el-table-column>
        <el-table-column prop="msg_num" label="短信发送" align="center"></el-table-column>
        <el-table-column prop="msg_success_num" label="发送成功" align="center"></el-table-column>
        <el-table-column prop="msg_fail_num" label="发送失败" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>


<script>
import echarts from "echarts";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      id: "query-table-bar",
      tableData: [],
      value1: ["20190901", "20190909"],
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      }
    };
  },
  props: {
    dataList: {},
    count: {
      // type: Number,
      // default: 0
    },
    height: {
      // type: Number,
      // default: 0
    },
    startTime: {},
    endTime: {}
  },
  computed: {
    ...mapGetters(["query"])
  },
  watch: {
    dataList(val) {
      this.tableData = val;
    },
    height(val) {
      this.height = val;
    },
    startTime(val) {
      this.startTime = val;
    },
    endTime(val) {
      this.endTime = val;
    }
  },
  mounted() {
    this.id = this.id + "1";
    if (!this.count) {
      this.id = this.id + "0";
    }
    this.tableData = this.dataList;
  },
  components: {},
  methods: {
    dateSend() {
      this.$emit("getQuery");
      // console.log(this)
    }
  }
};
</script>
<style lang="scss">
.query-table .el-range-input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #fff;
}
.query-table .el-range-input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #fff;
}
.query-table .el-range-input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #fff;
}
.query-table .el-range-input::-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #fff;
}
.query-table {
  .el-table {
    width: 100%;
    font-size: 0.12rem;
    margin: 0.6rem 0 0.15rem 0;
    border: none !important;
    .el-table__body-wrapper {
      height: 100%;
      background-color: #1c2b42;
    }
    tr {
      background: #1c2b42;
      color: #fff;
    }
    td {
      background: #1c2b42;
      padding: 0;
    }
    th {
      border: none !important;
      background: #1c2b42;
    }
    .el-table--border,
    .el-table--group {
      border: none;
    }
    .el-table__header-wrapper th:nth-last-of-type(2) {
      border-right: none;
    }
    .el-table--border td:nth-last-of-type(1) {
      border-right: none;
    }
    .el-table--border::after,
    .el-table--group::after {
      width: 0;
    }
    .el-table__body-wrapper::-webkit-scrollbar {
      //滚动条样式
      width: 0.02rem;
      height: 0.02rem;
      background: #182e4d !important;
    }
    .el-table__body-wrapper::-webkit-scrollbar-thumb {
      // 滚动条小方块
      border-radius: 3px;
      background: #1475e8;
      width: 0.02rem;
      height: 0.02rem;
    }
    .el-table__body-wrapper::-webkit-scrollbar-track {
      // 滚动条里面轨道
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 3px;
      background: #1c2b42 !important;
    }
  }
  .el-table th {
    padding: 0 !important;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #182e4d;
  }
  .el-table td,
  .building-top .el-table th.is-leaf {
    border-bottom: 1px solid #214470;
  }
  .gutter {
    display: block !important;
    height: 0.58rem;
    background: #182e4d !important;
  }
  .el-table::before {
    // width: 0 !important;
    height: 0 !important;
  }
  .el-date-editor {
    background: #18273d;
    border: 0;
    width: 3.5rem !important;
    .el-range__icon,
    .el-range__icon::before {
      position: relative;
      top: -10%;
      font-size: 0.18rem;
      color: #4b8cd3;
      margin-right: 0.05rem;
    }
    .el-icon-circle-close,
    .el-icon-circle-close::before {
      position: relative;
      top: -7%;
      left: -7%;
      color: #fff;
      font-size: 0.14rem;
    }
    .el-range-input {
      width: 1.2rem;
      height: 0.28rem;
      background: #1b3251;
      border: 1px solid #4b8cd3;
      border-radius: 2px;
      text-align: left;
      padding-left: 0.16rem;
      color: #fff;
      font-size: 0.14rem;
    }
    .el-range-separator {
      padding: 0;
      color: #fff;
      margin: 0 0.1rem;
    }
  }
}
</style>

<style lang="scss" scoped>
.query-table {
  // width: 5.6rem;
  height: 2.03rem;
  position: relative;
  .btn-left {
    width: 100%;
    position: absolute;
    top: -22%;
    display: inline-block;
    height: 0.35rem;
    z-index: 2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .sure {
      display: inline-block;
      width: 0.5rem;
      height: 0.31rem;
      line-height: 0.33rem;
      text-align: center;
      background-color: #4b8cd3;
      border-radius: 2px;
      cursor: pointer;
    }
    .range_icon {
      display: inline-block;
      width: 0.18rem;
      height: 0.16rem;
      position: relative;
      left: -23%;
      font-size: 0.18rem;
      color: #fff;
    }
  }
}
</style>
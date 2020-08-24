<template>
  <div class="region-emergency">
    <div class="content">
      <div class="left">
        <div class="top-map">
          <search :getValues="getValues" />
          <region-map @showDanger="showDanger" :data="regionMap" @dateValue="dateValue" />
        </div>
        <region-bg :titlename="titlename[3]" @showbigpicture="showbigpicture(3)">
          <region-short-message :height="height" :dataList="shortMessage"></region-short-message>
        </region-bg>
      </div>
      <div class="right">
        <region-bg :titlename="titlename[0]" @showbigpicture="showbigpicture(0)">
          <region-evacuate :flag="flag" :height="height" :dataList="evacuate" ref="evacuate"></region-evacuate>
        </region-bg>
        <region-bg :titlename="titlename[1]" @showbigpicture="showbigpicture(1)">
          <region-frequency :height="height" :dataList="frequency"></region-frequency>
        </region-bg>
        <region-bg :titlename="titlename[2]" @showbigpicture="showbigpicture(2)">
          <region-query
            :height="heightQuery"
            :dataList="query"
            @getQuery="this.getQuery"
            ref="queryMessage"
            :startTime="start_time"
            :endTime="end_time"
          ></region-query>
        </region-bg>
      </div>
      <open-region v-show="isshowshadow" @closebigpicture="closebigpicture(1)" :title="title">
        <div
          :is="currentView"
          ref="queryMessageOpen"
          @getQuery="this.getQuery"
          :dataList="currentData"
          :count="count"
          :height="heightRegionQuery"
          :flag="flag"
          :startTime="start_time"
          :endTime="end_time"
        ></div>
      </open-region>
      <open-message
        :height="heightTotal"
        :count="count"
        v-show="isshowDanger"
        @closeDanger="closeDanger"
        ref="message"
        :flag="flag"
      />
    </div>
  </div>
</template>

<script>
import regionBg from "../../base/region-bg";
import regionEvacuate from "./region-evacuate";
import regionFrequency from "./region-frequency";
import regionQuery from "./region-query";
import regionShortMessage from "./region-short-message";
import openRegion from "./open-region";
// import search from "./search";
import regionMap from "./region-map";
import openMessage from "./open-message";
import { mapGetters } from "vuex";
import search from "./search";
import "../../assets/css/font_f8j4mugndf/iconfont.css";
import { getRegionalEmergencyDisasterWarning } from "../../api/population-distribution";
import {
  getRegionalEmergency,
  getDisasterWarningMap
} from "../../api/population-distribution";

export default {
  data() {
    return {
      isshowshadow: false,
      isshowDanger: false,
      count: 0,
      titlename: [
        "预警前后区域人口数量变化",
        "应急事件发生次数累计 ",
        "预警短信发送快捷查询",
        "预警短信发送统计"
      ],
      height: 0,
      heightTotal: 0,
      heightQuery: 1.9,
      heightRegionQuery: 0,
      totalNumber: 0,
      title: "",
      currentView: "",
      currentData: "",
      heightOpen: 0,
      newtime: "",
      region_id: "0311",
      data_type: "custom",
      current_time: "",
      start_time: "20190901",
      end_time: "20190909",
      events_date: "",
      time: "",
      flag: false,
      messageTime: ""
    };
  },

  components: {
    regionBg,
    regionEvacuate,
    regionFrequency,
    regionQuery,
    regionMap,
    regionShortMessage,
    openRegion,
    openMessage,
    search
  },

  computed: {
    ...mapGetters([
      "evacuate",
      "frequency",
      "query",
      "shortMessage",
      "regionMap"
    ])
  },

  mounted() {
    var screenHeight = window.screen.height;
    this.height = 2.37;
    this.heightOpen = 5.5;
    this.heightQuery = 1.9;
    this.heightRegionQuery = 4.95;
    this.heightTotal = screenHeight;
    this.realTimeDate();
    this.getShortMessage();
    this.getFrequency();
    this.getQuery();
    this.getTime();
  },
  created() {
    // this.getQuery();
  },
  methods: {
    getTime() {
      var currentHours = new Date().getHours(); //获取当前小时数(0-23)
      var currentMinutes = new Date().getMinutes(); //获取当前分钟数(0-59)
      var currentSeconds = new Date().getSeconds(); //获取当前秒数(0-59)
      if (currentHours < 10) {
        currentHours = "0" + currentHours;
      }
      if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
      }
      if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
      }
      //this.time = "20190830" + currentHours + currentMinutes + currentSeconds;
      this.time = "20190830161500";
      this.getEvacuate(this.time);
      this.getRegionMap(this.time);
    },
    getValues(val) {
      var changeFullYear = val.getFullYear();
      var changeMonth = val.getMonth() + 1;
      var changeDate = val.getDate();
      var changeHours = val.getHours();
      var changeMinutes = val.getMinutes();
      var changeSeconds = val.getSeconds();
      if (changeMonth < 10) {
        changeMonth = "0" + changeMonth;
      }
      if (changeDate < 10) {
        changeDate = "0" + changeDate;
      }
      if (changeHours < 10) {
        changeHours = "0" + changeHours;
      }
      if (changeMinutes < 10) {
        changeMinutes = "0" + changeMinutes;
      }
      if (changeSeconds < 10) {
        changeSeconds = "0" + changeSeconds;
      }
      this.time =
        changeFullYear +
        changeMonth +
        changeDate +
        changeHours +
        changeMinutes +
        changeSeconds;
      this.getEvacuate(this.time);
      this.getRegionMap(this.time);
    },
    dateValue(val) {
      this.time = val;
      this.getShortMessage();
      this.getFrequency();
      this.getQuery();
      this.getEvacuate();
    },
    getEvacuate(time) {
      // 疏散前后人口数量变化
      let params = {
        region_id: this.region_id,
        current_time: time,
        task: "populationChangeRegionalEmergency"
      };
      getRegionalEmergency(params).then(response => {
        if (response) {
          let data = response.data.data;
          let userNumber = {};
          let xAxis = [];
          let yData = [];
          data &&
            data.forEach(element => {
              xAxis.push(element.currentTime);
              yData.push(element.total_number);
            });
          userNumber.xAxis = xAxis;
          userNumber.yData = yData;
          this.$store.commit("SET_EVACUATE", userNumber);
        }
      });
    },
    getFrequency() {
      // 应急事件发生次数累计
      let params = {
        region_id: this.region_id,
        task: "eventFrequencyRegionalEmergency",
        current_time: this.events_date
      };
      getRegionalEmergency(params).then(response => {
        if (response) {
          let data = response.data;
          this.$store.commit("SET_FREQUENCY", data);
        }
      });
    },
    getQuery() {
      // 快捷查询
      if (!this.$refs.queryMessage.value1 == "" && !this.isshowshadow) {
        this.start_time = this.$refs.queryMessage.value1[0];
        this.end_time = this.$refs.queryMessage.value1[1];
      } else if (
        this.$refs.queryMessageOpen &&
        !this.$refs.queryMessageOpen.value1 == "" &&
        this.isshowshadow
      ) {
        this.start_time = this.$refs.queryMessageOpen.value1[0];
        this.end_time = this.$refs.queryMessageOpen.value1[1];
      } else {
        this.start_time = "20190901";
        this.end_time = "20190909";
      }
      let params = {
        region_id: this.region_id,
        task: "quickQueryRegionalEmergency",
        data_type: this.data_type,
        start_time: this.start_time,
        end_time: this.end_time
      };
      getRegionalEmergency(params).then(response => {
        if (response) {
          let data = response.data.data;
          if (this.isshowshadow) {
            this.currentData = data;
          } else {
            this.$store.commit("SET_QUERY", data);
          }
        }
      });
    },
    getShortMessage() {
      // 短信发送统计
      let params = {
        region_id: this.region_id,
        task: "messageCountRegionalEmergency",
        current_time: this.events_date
      };
      getRegionalEmergency(params).then(response => {
        if (response) {
          let data = response.data.data;
          let num =
            response.data &&
            response.data.total &&
            response.data.total[0].msg_num;
          let userNumber = {};
          let xAxis = [];
          let yData = [];
          data &&
            data.forEach(element => {
              let arr = [];
              xAxis.push(element.msg_send_date);
              yData.push(element.msg_num);
            });
          userNumber.source = xAxis;
          userNumber.yData = yData;
          userNumber.num = num;
          this.$store.commit("SET_SHORTMESSAGE", userNumber);
        }
      });
    },
    getRegionMap(time) {
      //热图数据
      var params = {
        region_id: this.region_id,
        // current_time: this.time,
        current_time: time,
        task: "centerCoordinatesAndTotalPopulation"
      };
      getRegionalEmergencyDisasterWarning(params).then(response => {
        var data = response.data.data;
        this.$store.commit("SET_REGIONMAP", data);
      });
    },
    getMessage() {
      let events_type = this.$refs.message.events_type;
      let events_date = this.$refs.message.events_date;
      let events_address = this.$refs.message.events_address;
      let msg_content = this.$refs.message.msg_content;
      let msg_num = this.$refs.message.msg_num;
      var params = {
        region_id: this.region_id,
        type: "sdk",
        events_date: events_date,
        task: "sendSMS",
        events_type: events_type,
        events_address: events_address,
        msg_content: msg_content,
        msg_num: msg_num
      };
      getRegionalEmergencyDisasterWarning(params).then(response => {});
    },
    realTimeDate() {
      // 时间处理
      Date.prototype.pattern = function(fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
          "H+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds() //秒
        };
        var week = {
          "0": "星期日",
          "1": "星期一",
          "2": "星期二",
          "3": "星期三",
          "4": "星期四",
          "5": "星期五",
          "6": "星期六"
        };
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        }
        if (/(E+)/.test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? "" : "") : "") +
              week[this.getDay() + ""]
          );
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
          }
        }
        return fmt;
      };
      this.newtime = new Date().pattern("yyyy-MM-dd  hh:mm:ss EEE");
      this.events_date = new Date().pattern("yyyyMMdd");
      // this.time = new Date().pattern("yyyyMMddHHmmss");
    },
    showbigpicture(val) {
      //表格弹框
      this.count++;
      this.isshowshadow = true;
      this.$refs.evacuate.echartsinit();
      switch (val) {
        case 0:
          this.currentView = "regionEvacuate";
          this.currentData = this.evacuate;
          this.title = this.titlename[0];
          break;
        case 1:
          this.currentView = "regionFrequency";
          this.currentData = this.frequency;
          this.title = this.titlename[1];
          break;
        case 2:
          this.currentView = "regionQuery";
          this.currentData = this.query;
          this.title = this.titlename[2];
          this.getQuery();
          break;
        case 3:
          this.currentView = "regionShortMessage";
          this.currentData = this.shortMessage;
          this.title = this.titlename[3];
          break;
      }
    },
    closebigpicture() {
      this.isshowshadow = false;
    },
    showDanger(val) {
      this.isshowDanger = val;
    },
    closeDanger(val) {
      this.isshowDanger = val;
    },
    showEarlyWarning(val) {
      this.flag = val;
    }
  }
};
</script>
<style lang='scss' scoped>
.region-emergency {
  .content {
    display: flex;
    .left {
      width: 12.8rem;
      padding-right: 0.08rem;
      .top-map {
        width: 100%;
        margin-bottom: 0.08rem;
        position: relative;
      }
    }
    .right {
      width: 5.8rem;
    }
  }
}
</style>
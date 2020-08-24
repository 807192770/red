<template>
  <div class="urban-agglomeration">
    <!-- 区域道路监控 -->
    <div class="left">
      <search :getValues="getValues" />
      <roadMonitoring lat="27.954129" lng="109.599638" :dataList="roadMonitoringList"></roadMonitoring>
    </div>
    <div class="right">
      <monitoring-bg :titlename="titlename[0]" @showbigpicture="showbigpicture(0)">
        <monitoringFlow
          :current="current"
          :addClass="addClass"
          :dataList="monitoringFlowList"
          :changeValue="changeValue"
          :height="height"
          :changeRodeList="changeRodeList"
          :forecastList="forecastList"
        />
        <!-- <population-table :dataList="totalUsers" :flag="1" :height="height"/> -->
      </monitoring-bg>
      <monitoring-bg :titlename="titlename[1]" @showbigpicture="showbigpicture(1)">
        <flowRanking
          :dataList="flowRankingList.slice(0, 5)"
          :flowRankingHeight="flowRankingHeight"
          :size="size"
          :height="height"
        ></flowRanking>
      </monitoring-bg>
      <monitoring-bg :titlename="titlename[2]" @showbigpicture="showbigpicture(2)">
        <realMonitoring :dataList="realMonitoringList" :height="height"></realMonitoring>
      </monitoring-bg>
    </div>
    <open-monitoring v-show="isshowshadow" @closebigpicture="closebigpicture(1)" :title="title">
      <div
        :is="currentView"
        :dataList="currentData"
        :count="count"
        :height="heightOpen"
        :flowRankingHeight="flowRankingHeightOpen"
        :changeValue="changeValue"
        :current="currentOpen"
        :addClass="addClass"
        :changeRodeList="changeRodeListOpen"
        :forecastList="forecastList"
        :size="sizeOpen"
      ></div>
    </open-monitoring>
  </div>
</template>

<script>
import monitoringBg from "../../base/monitoring-bg";
import monitoringFlow from "./monitoring-flow";
import flowRanking from "./flow-ranking";
import realMonitoring from "./real-monitoring";
import openMonitoring from "./open-monitoring";
// import populationTable from "./population-table";
import roadMonitoring from "./road-monitoring";
// import selectResgion from "./select-resgion";
import search from "./search";
import { mapGetters } from "vuex";
import {
  getMonitoringFlow,
  getFlowRanking,
  getRealMonitoring,
  getRoadMonitoring,
  getChangeRoad,
  getForecastData
} from "../../api/road-monitoring";
export default {
  data() {
    return {
      isshowshadow: false,
      count: 0,
      titlename: [
        "重要卡口人流量监控与预测",
        "重要卡口人流量排行TOP5",
        "重要路段实时流量监控"
      ],
      currentView: "",
      currentData: "",
      height: "",
      heightOpen: "",
      flowRankingHeight: "",
      flowRankingHeightOpen: "",
      title: "",
      current: 0,
      data_type: 0,
      currentOpen: 0,
      size: "",
      sizeOpen: "",
      time: "",
      // roadMonitoringData: {
      //   lng: null,
      //   lat: null,
      //   address: null,
      //   nearestJunction: null,
      //   nearestRoad: null,
      //   nearestPOI: null
      // },
      data: ["卡口人数", "流入", "流出"],
      pass_type: "会展中心站",
      changeRodeListOpen: ""
    };
  },

  components: {
    monitoringBg,
    monitoringFlow,
    // selectResgion,
    flowRanking,
    openMonitoring,
    roadMonitoring,
    search,
    realMonitoring
  },

  computed: {
    ...mapGetters([
      "monitoringFlowList",
      "realMonitoringList",
      "flowRankingList",
      "roadMonitoringList",
      "changeRodeList",
      "forecastList"
    ])
  },

  mounted() {
    var screenHeight = window.screen.height;
    this.height = 2.28;
    this.heightOpen = 5.52;
    this.flowRankingHeight = "0.32rem";
    this.flowRankingHeightOpen = "0.92rem";
    this.size = "0.12rem";
    this.sizeOpen = "0.16rem";
    this.nowTimes();
    // this.getRoadChange();
    // this.getForecast();
    // this.getMonitoring();
    // this.getRanking();
    // this.getTrafficMonitoring();
    // this.getRegionalMonitoring();
    this.getTime();
    // console.log(this.time,"qwewqewqewqewqe")
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
      this.time = "20190830003000";
      this.getRoadChange(this.time);
      this.getForecast(this.time);
      this.getMonitoring(this.time);
      this.getRanking(this.time);
      this.getTrafficMonitoring(this.time);
      this.getRegionalMonitoring(this.time);
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
      this.getRoadChange(this.time);
      this.getForecast(this.time);
      this.getMonitoring(this.time);
      this.getRanking(this.time);
      this.getTrafficMonitoring(this.time);
      this.getRegionalMonitoring(this.time);
      // console.log(this.time, 77777777);
    },
    changeValue(e, echartsinit) {
      this.pass_type = e;
      echartsinit();
      this.getForecast(this.time);
      this.getMonitoring(this.time);
    },
    addClass(index, echartsinit) {
      // console.log(this.isshowshadow)
      if(this.isshowshadow){
        this.currentOpen = index;
      }else{
        this.current = index;
      }
       //获取点击对象
      this.data_type = index;
      this.getForecast(this.time);
      this.getMonitoring(this.time);
      echartsinit();
    },
    showbigpicture(val) {
      this.count++;
      this.isshowshadow = true;
      this.title = this.titlename[val];
      switch (val) {
        case 0:
          this.currentView = "monitoringFlow";
          this.currentData = this.monitoringFlowList;
          this.changeRodeListOpen = this.changeRodeList;
          break;
        case 1:
          this.currentView = "flowRanking";
          this.currentData = this.flowRankingList.slice(0, 5);

          break;
        case 2:
          this.currentView = "realMonitoring";
          this.currentData = this.realMonitoringList;
          break;
      }
    },
    closebigpicture() {
      this.isshowshadow = false;
    },
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      this.nowTime =
        year + "年" + month + "月" + date + "日" + " " + hh + ":" + mm;
    },
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 30 * 1000);
    },
    // roadMonitoringMap(data) {
    //   this.roadMonitoringData = {
    //     lng: data.position.lng,
    //     lat: data.position.lat,
    //     address: data.address,
    //     nearestJunction: data.nearestJunction,
    //     nearestRoad: data.nearestRoad,
    //     nearestPOI: data.nearestPOI
    //   };
    // },
    getRoadChange(time) {
      // this.getTime();
      var changeRodeList = [];
      var params = {
        region_id: "0311",
        time: time,
        task: "regionPassType"
      };
      getChangeRoad(params).then(response => {
        response.data.dataPass.forEach((item, index) => {
          changeRodeList.push({
            value: item.tra_pass_id,
            label: item.tra_pass_id
          });
        });
        // console.log(changeRodeList, 4747474747474);
        this.$store.commit("SET_CHANGEROAD", changeRodeList);
      });
    },
    //预测数据
    getForecast(time) {
      // this.getTime();
      var ForecastList = {
        data: [],
        xAxisData: []
      };
      var params = {
        region_id: "0311",
        time: time,
        task: "regionPassPopulationForecast",
        data_type: 0,
        pass_type: this.pass_type
      };
      getForecastData(params).then(response => {
        let data = response.data.data;
        ForecastList.data.push(data[0].pre_value1, data[1].pre_value2);
        ForecastList.xAxisData.push(data[0].pre_time1, data[1].pre_time2);
        this.$store.commit("SET_FORECAST", ForecastList);
      });
    },
    getMonitoring(time) {
      // this.getTime();
      // 重要卡口人流量监控与预测
      var monitoringFlowList = {
        name: "",
        data: [],
        xAxisData: []
      };
      var params = {
        region_id: "0311",
        time: time,
        task: "regionPassPopulation",
        data_type: this.data_type,
        pass_type: this.pass_type
      };
      getMonitoringFlow(params).then(response => {
        var list = [];
        var list1 = [];
        monitoringFlowList.name = this.data[this.data_type];
        response.data.data.forEach((item, index) => {
          list.push(item.num);
          list1.push(item.time);
        });
        monitoringFlowList.data = list;
        monitoringFlowList.xAxisData = list1;
        if (this.isshowshadow) {
          this.currentData = monitoringFlowList;
        } else {
          this.$store.commit("SET_MONITORINGFLOW", monitoringFlowList);
        }
      });
    },
    getRanking(time) {
      // this.getTime();
      // 重点卡口人流量排行TOP5
      var flowRankingList = [];
      var params = {
        region_id: "0311",
        time: time,
        task: "regionPassRankingPopulation"
      };
      getFlowRanking(params).then(response => {
        flowRankingList = response.data.data;
        this.$store.commit("SET_FLOWRANKING", flowRankingList);
      });
    },
    getTrafficMonitoring(time) {
      // this.getTime();
      // 重要路段实时流量监控
      var realMonitoringList = {
        roadName: [],
        dataAll: []
      };
      var params = {
        region_id: "0311",
        time: time,
        task: "regionRoadMonitoringPopulation"
      };
      getRealMonitoring(params).then(response => {
        response.data.data.forEach((item, index) => {
          realMonitoringList.roadName.push(item.road_name);
          realMonitoringList.dataAll.push(item.road_flow);
        });
        this.$store.commit("SET_REALMONITORING", realMonitoringList);
      });
    },
    getRegionalMonitoring(time) {
      // this.getTime();
      // 当前区域道路监控
      var roadMonitoringList = {
        brokenLine: [],
        totalList: [],
        rectangleList: {
          southWest: [],
          northEast: []
        },
        bayonetInformation: {
          roadName: [],
          bayonetName: [],
          totalNumber: [],
          inflowNumber: [],
          outflowNumber: []
        }
      };
      var params = {
        region_id: "0311",
        time: time,
        task: "regionRoadMonitoringOD"
      };
      // getRoadMonitoring(params).then(response => {
      //     console.log(response.data, 32323223)
      //   });
      
        getRoadMonitoring(params).then(response => {
          response.data.dataRoda.forEach((item, index) => {
            roadMonitoringList.brokenLine = item.road_lon_lat;
            roadMonitoringList.bayonetInformation.roadName.push(item.road_name);
          });
          response.data.dataPass.forEach((item, index) => {
            roadMonitoringList.rectangleList.southWest.push([
              item.relate_maxlon,
              item.relate_maxlat
            ]);
            roadMonitoringList.rectangleList.northEast.push([
              item.relate_minlon,
              item.relate_minlat
            ]);
            roadMonitoringList.bayonetInformation.bayonetName.push(
              item.tra_pass_id
            );
            roadMonitoringList.bayonetInformation.totalNumber.push(
              item.current_num
            );
            roadMonitoringList.bayonetInformation.inflowNumber.push(
              item.in_num
            );
            roadMonitoringList.bayonetInformation.outflowNumber.push(
              item.out_num
            );
          });
          roadMonitoringList.dataPass = response.data.dataPass;
          roadMonitoringList.totalList = response.data.total;
          this.$store.commit("SET_ROADMONITORING", roadMonitoringList);
          window.localStorage.setItem(
            "roadDataPass",
            JSON.stringify(roadMonitoringList)
          );
        });
      }
  }
};
</script>
<style lang='scss' scoped>
.urban-agglomeration {
  display: flex;
  .left {
    flex: 0.8;
    position: relative;
  }
  .right {
    flex: 0.45;
    margin-left: 0.15rem;
  }
}
.el-select {
  margin-bottom: 0.1rem;
}
.left-choice {
  span {
    font-size: 0.2rem;
    margin-right: 0.2rem;
  }
}
</style>

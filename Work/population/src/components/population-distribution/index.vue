<template>
  <div class="population-distribution">
    <div class="left">
      <base-bg :titlename="titlename[1]" @showbigpicture="showbigpicture(1)">
        <population-origin :dataList="populationType" :height="height" />
      </base-bg>
      <base-bg :titlename="titlename[2]" @showbigpicture="showbigpicture(2)">
        <doughnut-chart :dataList="lengthTime" :height="height" />
      </base-bg>
      <base-bg :titlename="titlename[0]" @showbigpicture="showbigpicture(0)">
        <gender-age :dataList="genderAge" :height="height" />
      </base-bg>
    </div>
    <div class="middle">
      <search :totalNumber="totalNumber" />
      <heat-map :height="heightMiddle" @showDanger="showDanger" :data="heatMap" />
      <base-bg :titlename="titlename[6]" @showbigpicture="showbigpicture(6)">
        <line-chart :height="heightMiddle" :flag="1" :dataList="numberOfUsers" />
      </base-bg>
    </div>
    <div class="right">
      <base-bg :titlename="titlename[3]" @showbigpicture="showbigpicture(3)">
        <population-table :dataList="totalUsers" :flag="1" :height="height" />
      </base-bg>
      <base-bg :titlename="titlename[4]" @showbigpicture="showbigpicture(4)">
        <bar-chart :dataList="homeOfNumber" :flag="1" :height="height" />
      </base-bg>
      <base-bg :titlename="titlename[5]" @showbigpicture="showbigpicture(5)">
        <provincial-number :dataList="currentPopulation" :flag="1" :height="height" />
      </base-bg>
    </div>
    <open-details v-show="isshowshadow" @closebigpicture="closebigpicture(1)" :title="title">
      <div :is="currentView" :dataList="currentData" :count="count" :height="heightOpen"></div>
    </open-details>
    <danger :height="heightTotal" :count="count" v-show="isshowDanger" @closeDanger="closeDanger" />
  </div>
</template>

<script>
import baseBg from "../../base/base-bg";
import barChart from "./bar-chart";
import genderAge from "./gender-age";
import populationOrigin from "./population-origin";
import doughnutChart from "./doughnut-chart";
import populationTable from "./population-table";
import provincialNumber from "./provincial-number";
import lineChart from "./line-chart";
import heatMap from "./map";
import search from "./search";
import progressBar from "./progress";
import openDetails from "./open-details";
import danger from "./danger";
import { mapGetters } from "vuex";
import { getRegionPopulation } from "../../api/population-distribution";
export default {
  data() {
    return {
      isshowshadow: false,
      count: 0,
      titlename: [
        "性别及年龄",
        "人口类型",
        "驻留时长",
        "用户量监控",
        "号码归属地TOP10",
        "当前人口分布地TOP10",
        "近7天区域承载用户量"
      ],
      showList: [false, false, false, false, false, false, false],
      currentView: "",
      currentData: "",
      title: "",
      height: 0,
      heightMiddle: 0,
      heightOpen: 0,
      heightTotal: 0,
      isshowDanger: false,
      region_id: 100,
      time:'20160617114500'
    };
  },

  components: {
    baseBg,
    barChart,
    genderAge,
    populationOrigin,
    doughnutChart,
    populationTable,
    provincialNumber,
    lineChart,
    heatMap,
    search,
    openDetails,
    progressBar,
    danger
  },

  computed: {
    ...mapGetters([
      "numberOfUsers",
      "genderAge",
      "lengthTime",
      "heatMap",
      "populationType",
      "totalUsers",
      "homeOfNumber",
      "currentPopulation",
      "totalNumber"
    ])
  },

  mounted() {
    var screenHeight = window.screen.height;
    this.height = (screenHeight - 370) / 3;
    this.heightMiddle = screenHeight - 391;
    this.heightOpen = screenHeight * 0.43;
    this.heightTotal = screenHeight;
    this.getHeatMap();
    this.getPopulationClassification();
    this.getSexualAndAge();
    this.getLengthTime();
    this.getHomeOfNumber();
    this.getUserCapacity();
    this.getCurrentPopulationDistribution();
    this.getPopulationTotalMonitor();
    this.getTotalNumber();
  },

  methods: {
    getHeatMap() {
      //热图数据
      var params = {
        region_id: this.region_id,
        time: this.time,
        task: "centerCoordinatesAndTotalPopulation"
      };
      getRegionPopulation(params).then(response => {
        var data = response.data.data;
        this.$store.commit("SET_HEATMAP", data);
      });
    },
    getTotalNumber() {
      //人口总数
      var params = {
        region_id: this.region_id,
        time: this.time,
        task: "totalPeopleNumber"
      };
      getRegionPopulation(params).then(response => {
        if (response) {
          var data = response.data.data[0].number;
          this.$store.commit("SET_TOTALNUMBER", data);
        }
        // console.log(data)
      });
    },
    getPopulationClassification() {
      //人口类型
      var params = {
        region_id: this.region_id,
        time: this.time,
        task: "populationClassification"
      };
      getRegionPopulation(params).then(response => {
        var data = response.data.data[0];
        var typeData = [
          { name: "流动人数", value: data.visitor_num },
          { name: "居住人数", value: data.resident_num },
          { name: "工作人数", value: data.work_num }
        ];
        // console.log(typeData)
        this.$store.commit("SET_TYPE", typeData);
      });
    },
    getSexualAndAge() {
      //性别及年龄
      var params = {
        region_id: this.region_id,
        time: this.time,
        task: "sexualAndAge"
      };
      getRegionPopulation(params).then(response => {
        var data = response.data.data;
        var genderAge = {};
        var xAxis = [];
        var male = [];
        var female = [];
        data.forEach(element => {
          if (element.age_class == "24") {
            element.age_class = "<24";
          } else if (element.age_class == "60") {
            element.age_class = ">60";
          }
          xAxis.push(element.age_class);
          male.push(element.male);
          female.push(element.female);
          genderAge.xAxis = xAxis;
          genderAge.male = male;
          genderAge.female = female;
        });
        this.$store.commit("SET_AGE", genderAge);
      });
    },
    getLengthTime() {
      //驻留时长
      var params = {
        region_id: this.region_id,
        time: this.time,
        task: "residentTime"
      };
      getRegionPopulation(params).then(response => {
        var data = response.data.data;
        data.forEach(element => {
          element.name = element.name.slice(2);
        });
        this.$store.commit("SET_LENGTHTIME", data);
      });
    },
    getHomeOfNumber() {
      //号码归属地
      var params = {
        region_id: this.region_id,
        time: this.time,
        task: "homeOfNumber"
      };
      getRegionPopulation(params).then(response => {
        var data = response.data.data;
        // console.log(data)
        this.$store.commit("SET_HOMENUMBER", data);
      });
    },
    getUserCapacity() {
      //近7天用户承载量
      var params = {
        region_id: this.region_id,
        time: this.time,
        task: "userCapacity"
      };
      getRegionPopulation(params).then(response => {
        var data = response.data.data;
        var usersNumber = {};
        var xAxis = [];
        var yData = [];
        data.forEach(element => {
          xAxis.push(element.statis_date);
          yData.push(element.subs_num);
        });
        usersNumber.xAxis = xAxis;
        usersNumber.yData = yData;
        this.$store.commit("SET_USERS", usersNumber);
      });
    },
    getCurrentPopulationDistribution() {
      //当前人口分布地
      var params = {
        region_id: this.region_id,
        time: this.time,
        task: "currentPopulationDistribution"
      };
      getRegionPopulation(params).then(response => {
        var data = response.data.data;
        // console.log(data)
        this.$store.commit("SET_CURRENTPOPULATION", data);
      });
    },
    getPopulationTotalMonitor() {
      //用户总量监控
      var params = {
        region_id: this.region_id,
        time: this.time,
        task: "populationTotalMonitor"
      };
      getRegionPopulation(params).then(response => {
        var data = response.data.data;
        // console.log(data)
        this.$store.commit("SET_TOTALUSERS", data);
      });
    },
    showDanger(val) {
      this.isshowDanger = val;
    },
    closeDanger(val) {
      this.isshowDanger = val;
    },
    showbigpicture(val) {
      this.count++;
      this.isshowshadow = true;
      switch (val) {
        case 0:
          this.currentView = "genderAge";
          this.currentData = this.genderAge;
          this.title = this.titlename[0];
          break;
        case 1:
          this.currentView = "populationOrigin";
          this.currentData = this.populationType;
          this.title = this.titlename[1];
          break;
        case 2:
          this.currentView = "doughnutChart";
          this.currentData = this.lengthTime;
          this.title = this.titlename[2];
          break;
        case 3:
          this.currentView = "populationTable";
          this.currentData = this.totalUsers;
          this.title = this.titlename[3];
          break;
        case 4:
          this.currentView = "barChart";
          this.currentData = this.homeOfNumber;
          this.title = "号码归属地";
          break;
        case 5:
          this.currentView = "provincialNumber";
          this.currentData = this.currentPopulation;
          this.title = "当前人口分布地";
          break;
        case 6:
          this.currentView = "lineChart";
          this.title = this.titlename[6];
          this.currentData = this.numberOfUsers;
          break;
      }
    },
    closebigpicture() {
      this.isshowshadow = false;
    }
  }
};
</script>
<style lang='scss' scoped>
.population-distribution {
  background-color: #020d19;
  display: flex;
  .left {
    flex: 0.44;
  }
  .middle {
    flex: 1;
    padding: 0 15px;
  }
  .right {
    flex: 0.44;
  }
}
</style>
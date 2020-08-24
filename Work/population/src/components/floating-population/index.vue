<template>
  <div class="floating-population">
    <!-- 流动人口分析 -->
    <div class="left">
      <base-bg :titlename="titlename[2]" @showbigpicture="showbigpicture(0)">
        <doughnutChart :height="height" :dataList="doughnutChartList" />
      </base-bg>
      <base-bg :titlename="titlename[3]" @showbigpicture="showbigpicture(0)">
        <doughnutSex :height="height" :dataList="doughnutSexList" />
      </base-bg>
    </div>
    <div class="middle">
      <selectMain @dateValue="dateValue"></selectMain>
      <cityMap :mapData="mapData" :mapName="mapName"></cityMap>
      <base-bg :titlename="titlename[4]" @showbigpicture="showbigpicture(0)">
        <lineChart :dataList="lineData" />
      </base-bg>
    </div>
    <div class="right">
      <base-bg :titlename="titlename[0]" @showbigpicture="showbigpicture(0)">
        <origin :height="height" :flag="0" :dataList="ranking" :tableOpenHeight="tableHeight" />
      </base-bg>
      <base-bg :titlename="titlename[1]" @showbigpicture="showbigpicture(1)">
        <days :dataList="analysisData" :height="height" :flag="0" />
      </base-bg>
    </div>
    <open-details v-show="isshowshadow" @closebigpicture="closebigpicture(1)" :title="title">
      <div
        :is="currentView"
        :dataList="currentData"
        :flag="1"
        :count="count"
        :height="heightOpen"
        :tableOpenHeight="tableOpenHeight"
      ></div>
    </open-details>
  </div>
</template>

<script>
import $ from "jquery";
import baseBg from "../../base/base-bg";
import origin from "./population-origin";
import days from "./visited-days";
import openDetails from "./open-details";
import doughnutChart from "./doughnut-chart.vue";
import doughnutSex from "./doughnut-sex.vue";
import lineChart from "./line-chart.vue";
import cityMap from "./map";
// import cityMap from './map-hebei';
import selectMain from "./select-main";
import { getFloatingPopulationAnalysis } from "../../api/floating-population";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isshowshadow: false,
      count: 0,
      titlename: [
        "流动人口来源地TOP10",
        "访客访问天数对比分析",
        "人口年龄结构",
        "人口性别结构",
        "人口总量波动"
      ],
      currentView: "",
      currentData: {},
      heightOpen: 0,
      height: 0,
      tableOpenHeight: 0,
      tableHeight: 0,
      title: "",
      day: "20160618",
      rankingData: [],
      analysis: [],
      num: 0,
      jsonName: [
        "centerFloatingPopulationAnalysis.json",
        "centerFloatingPopulationAnalysis-hebei.json"
      ],
      mapNames: ["china", "hebei"],
      mapName: "china",
      lineData: {
        data1: [1854803, 1852097, 1888086, 2089634, 2106701, 2031994, 2234857],
        data2: [981090, 984343, 988583, 992871, 991580, 990579, 995774],
        data3: [873713, 867754, 899503, 1096763, 1115121, 1041416, 1239083]
      },
      lineDatas: [
        {
          data1: [
            1854803,
            1852097,
            1888086,
            2089634,
            2106701,
            2031994,
            2234857
          ],
          data2: [981090, 984343, 988583, 992871, 991580, 990579, 995774],
          data3: [873713, 867754, 899503, 1096763, 1115121, 1041416, 1239083]
        },
        {
          data1: [
            1851801,
            1852097,
            1888086,
            2089634,
            2106701,
            2031994,
            2234857
          ],
          data2: [981090, 984343, 988583, 992871, 991580, 990579, 995774],
          data3: [873713, 867754, 899503, 1096763, 1115121, 1041416, 1239083]
        }
      ],
      doughnutChartList: [
        { value: 9247, name: "10-19岁" },
        { value: 135600, name: "20-29岁" },
        { value: 289380, name: "30-39岁" },
        { value: 239996, name: "40-49岁" },
        { value: 169729, name: "50-59岁" },
        { value: 113250, name: "60岁以上" }
      ],
      doughnutChartLists: [
        [
          { value: 9247, name: "10-19岁" },
          { value: 135600, name: "20-29岁" },
          { value: 289380, name: "30-39岁" },
          { value: 239996, name: "40-49岁" },
          { value: 169729, name: "50-59岁" },
          { value: 113250, name: "60岁以上" }
        ],
        [
          { value: 4979, name: "10-19岁" },
          { value: 125914, name: "20-29岁" },
          { value: 268710, name: "30-39岁" },
          { value: 239996, name: "40-49岁" },
          { value: 91392, name: "50-59岁" },
          { value: 60981, name: "60岁以上" }
        ]
      ],
      doughnutSexList: [
        { value: 611877, name: "男" },
        { value: 342153, name: "女" }
      ],
      doughnutSexLists: [
        [{ value: 611877, name: "男" }, { value: 342153, name: "女" }],
        [{ value: 455923, name: "男" }, { value: 336049, name: "女" }]
      ]
    };
  },
  components: {
    baseBg,
    origin,
    days,
    cityMap,
    openDetails,
    selectMain,
    doughnutChart,
    doughnutSex,
    lineChart
  },

  computed: {
    ...mapGetters(["ranking", "mapData", "analysisData"])
  },

  mounted() {
    this.height = 3.8;
    this.heightOpen = 5.6;
    this.tableOpenHeight = 490;
    this.tableHeight = 3.5;
    setTimeout(() => {
      this.refleshMapData();
    }, 500);
    setInterval(() => {
      this.refleshMapData();
    }, 5000);
    // this.getData()
    // this.getCenterFloatingPopulationAnalysis()
    // this.getComparativePeoplesAndRateByDays()
  },

  methods: {
    refleshMapData() {
      if (this.num < this.jsonName.length - 1) {
        this.num++;
      } else {
        this.num = 0;
      }
      this.lineData = [];
      setTimeout(() => {
        this.lineData = this.lineDatas[this.num];
        this.doughnutChartList = this.doughnutChartLists[this.num];
        this.doughnutSexList = this.doughnutSexLists[this.num];
      }, 500);
      this.mapName = this.mapNames[this.num];
      this.getData(this.jsonName[this.num]);
    },
    getData(val) {
      $.get(this.$filePrefixJson + val, Json => {
        this.rankingData = Json.ranking;
        var mapData = {
          coordinate: Json.coordinate,
          place: Json.place,
          num: Json.ranking
        };
        this.rankingData.forEach(function(item, index) {
          item.id = index + 1;
        });
        this.$store.commit("floatingPopulation/SET_RANKING", this.rankingData);
        this.$store.commit("floatingPopulation/SET_MAPDATA", mapData);
      });
      $.get(
        this.$filePrefixJson + "comparativePeoplesAndRateByDays.json",
        Json => {
          this.analysis = Json.data;
          this.$store.commit("floatingPopulation/SET_ANALYSISdATA", Json.data);
        }
      );
    },
    dateValue(data) {
      this.day = data;
      this.getCenterFloatingPopulationAnalysis();
      this.getComparativePeoplesAndRateByDays();
    },
    getCenterFloatingPopulationAnalysis() {
      // 来源地排行榜
      var params = {
        task: "centerFloatingPopulationAnalysis",
        statis_date: this.day
      };
      getFloatingPopulationAnalysis(params).then(response => {
        this.rankingData = response.data.ranking;
        var mapData = {
          coordinate: response.data.coordinate,
          place: response.data.place,
          num: response.data.ranking
        };
        this.rankingData.forEach(function(item, index) {
          item.id = index + 1;
        });
        this.$store.commit("floatingPopulation/SET_RANKING", this.rankingData);
        this.$store.commit("floatingPopulation/SET_MAPDATA", mapData);
      });
    },
    getComparativePeoplesAndRateByDays() {
      // 访客访问天数对比分析
      var params = {
        task: "comparativePeoplesAndRateByDays",
        statis_date: this.day
      };
      getFloatingPopulationAnalysis(params).then(response => {
        this.analysis = response.data.data;
        this.$store.commit(
          "floatingPopulation/SET_ANALYSISdATA",
          response.data.data
        );
      });
    },
    showbigpicture(val) {
      this.count++;
      this.isshowshadow = true;
      switch (val) {
        case 0:
          this.currentView = "origin";
          this.title = "流动人口来源地";
          this.currentData = this.rankingData;
          break;
        case 1:
          this.currentView = "days";
          this.currentData = this.analysis;
          this.title = this.titlename[1];
          break;
      }
    },
    closebigpicture() {
      this.isshowshadow = false;
    }
  }

  // methods: {
  //   showbigpicture(val) {
  //     this.count++;
  //     this.isshowshadow = true

  //     switch (val) {
  //       case 0:
  //         this.currentView = 'origin'
  //          this.title = '流动人口来源地';
  //         break;
  //       case 1:
  //         this.currentView = 'days'
  //         this.currentData = this.visitedDays
  //          this.title = this.titlename[1];
  //         break;
  //     }
  //   },
  //   closebigpicture() {
  //     this.isshowshadow = false
  //   },
  // }
};
</script>
<style lang='scss' scoped>
.floating-population {
  display: flex;
  background-color: #020d19;

  .left {
    flex: 0.23;
    margin-right: 15px;
  }
  .middle {
    flex: 0.52;
  }
  .right {
    flex: 0.25;
    margin-left: 15px;
    overflow-x: hidden;
  }
}
</style>

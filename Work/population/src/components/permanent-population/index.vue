<template>
  <div class="permanent-population">
    <div class="left">
      <search  @dateValue="dateValue"></search>
      <map-grid :height="heightTotal" :dataList="professionResideMoveData" :population="populationData"></map-grid>
    </div>

    <div class="right">
      <base-bg :titlename="titlename[0]" @showbigpicture="showbigpicture(0)">
        <two-year :height="height" :dataList="twoYearOftenPeopleData"></two-year>
      </base-bg>

      <base-bg :titlename="titlename[1]" @showbigpicture="showbigpicture(1)">
        <regional-population :height="height" :dataList="homeWorkRatioData"></regional-population>
      </base-bg>

      <base-bg :titlename="titlename[2]" @showbigpicture="showbigpicture(2)">
        <vs-lastyear :height="height" :dataList="vsLastYearData"></vs-lastyear>
      </base-bg>
    </div>

    <open-details v-show="isshowshadow" @closebigpicture="closebigpicture(1)" :title="title">
      <div :is="currentView" :flag="1" :dataList="currentData" :count="count" :height="heightOpen"></div>
    </open-details>
  </div>
</template>

<script>
import $ from "jquery";
import baseBg from "../../base/base-bg";
import openDetails from "./open-details";
import twoYear from "./two-year";
import regionalPopulation from "./regional-population";
import vsLastyear from "./vs-lastyear";
// import mapGrid from "./map";
import mapGrid from "./3dmap";
import search from "./search";
import {mapGetters} from 'vuex'
import { getProfessionResidePopulation } from "../../api/permanent-population";

export default {
  data() {
    return {
      isshowshadow: false,
      count: 0,
      titlename: [
        "近2年常驻人口同比分析",
        "本月各区县人口数量对比",
        "本月各区县常驻人口数量与去年当月同比"
      ],
      showList: [false, false, false],
      currentView: "",
      currentData: "",
      title: "",
      height: 0,
      heightTotal: 0,
      heightOpen: 0,
      time: '20190920',
      region_id:'130100-1-1',
      twoYearOftenPeopleData:[],//近2年常驻人口同比分析
      populationData:{ //人口数据
        work:0,
        home:0,
        resident:0,
      },
      homeWorkRatioData:[],//本月各区县人口数量对比
      vsLastYearData:[],//本月区域常驻人口数量与去年当月同比
      professionResideMoveData:[], //职住移动规律数据,工作地分布数据，居住地分布数据
      data_type:'', //  2:  1：工作地分布
    };
  },

  components: {
    baseBg,
    twoYear,
    regionalPopulation,
    vsLastyear,
    mapGrid,
    search,
    openDetails
  },

  computed: {
    ...mapGetters([
      'tabMenu',"professionResideMove"
    ]),
  },
  watch: {
    tabMenu(index) {
      // console.log(index)
      if(index == 1) {
        this.data_type = '1';
        this.getHomeWorkDistribution();
      }else if(index == 2) {
        this.data_type = '2';
        this.getHomeWorkDistribution();
      }else if(index == 0) {
        this.getProfessionResideMove();
      }
    },
    professionResideMove(val) {
      this.professionResideMoveData = val;
      console.log(val)
    }
  },
  created() {

  },
  mounted() {

    this.height = 2.3;
    this.heightTotal = 9;
    this.heightOpen = 5.6;
    this.getData()
    // this.getTwoYearOftenPeople();
    // this.getHomeWorkRatio();
    // this.getThisYearAndLastYearRatioToOften();
    // this.getProfessionResideMove();
    // this.getPopulationData();
  },

  methods: {
    getData() {
      $.get(this.$filePrefixJson + 'twoYearOftenPeople.json',(Json) => {
        this.twoYearOftenPeopleData = Json.data
      })
      $.get(this.$filePrefixJson + 'homeWorkRatio.json',(Json) => {
        this.homeWorkRatioData = Json.data
        this.homeWorkRatioData.forEach((item) => {
          item.region_name = item.region_name.substr(3);
        })
      })
      $.get(this.$filePrefixJson + 'thisYearAndLastYearRatioToOften.json',(Json) => {
        this.vsLastYearData = Json.data
      })
    },
    dateValue(val) {
      //时间搜索
      this.time = val;
      this.getProfessionResideMove();
    },
    //  获取人口数据
    getPopulationData() {
      var params ={
        time:'20190820',
        // time:this.time,
        task:'homeWorkPopulationType',
      };
      getProfessionResidePopulation(params).then(response => {
        this.populationData = response.data.data[0];
      })
    },
    //近2年常驻人口同比分析
    getTwoYearOftenPeople() {
      var params ={
        // time:this.time,
        time:'20190820',
        task:'twoYearOftenPeople',
      };
      getProfessionResidePopulation(params).then(response => {
        this.twoYearOftenPeopleData = response.data.data;
        // console.log(data)
      })
    },
    //本月各区县人口数量对比
    getHomeWorkRatio() {
      var params ={
        // time:this.time,
        time:'20190820',
        task:'homeWorkRatio',
      };
      getProfessionResidePopulation(params).then(response => {
        this.homeWorkRatioData = response.data.data;
        this.homeWorkRatioData.forEach((item) => {
          item.region_name = item.region_name.substr(3);
        })
        // console.log(data)
      })
    },
    //本月区域常驻人口数量与去年当月同比
    getThisYearAndLastYearRatioToOften() {
      var params ={
        // time:this.time,
        time:'20190802',
        task:'thisYearAndLastYearRatioToOften',
      };
      getProfessionResidePopulation(params).then(response => {
        this.vsLastYearData = response.data.data
        // console.log(data)
      })
    },
    //地图
    getProfessionResideMove() {
      var params ={
        time:this.time,
        //  statis_date:this.time,
        task:'professionResideMove',
        region_id: this.region_id,
      };
      getProfessionResidePopulation(params).then(response => {
        this.professionResideMoveData = response.data.data;
        // this.$store.commit('SET_MOVE', data)
        sessionStorage.setItem("moveData", JSON.stringify(data));
      })
    },
    //工作地分布
    getHomeWorkDistribution() {
      var params ={
        // time:this.time,
        time:'20190820',
        task:'homeWorkDistribution',
        region_id: this.region_id,
        data_type: this.data_type
      }
      getProfessionResidePopulation(params).then(response => {
        this.professionResideMoveData = response.data.data;
        // console.log(data)
      });
    },
    showbigpicture(val) {
      this.count++;
      this.isshowshadow = true;
      switch (val) {
        case 0:
          this.currentView = "twoYear";
          this.currentData = this.twoYearOftenPeopleData;
          this.title = this.titlename[0];
          break;
        case 1:
          this.currentView = "regionalPopulation";
          this.currentData = this.homeWorkRatioData;
          this.title = this.titlename[1];
          break;
        case 2:
          this.currentView = "vsLastyear";
          this.currentData = this.vsLastYearData;
          this.title = this.titlename[2];
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
.permanent-population {
  display: flex;
  background-color: #020d19;
  .left {
    flex: 1;

  }
  .right {
    flex: 0.48;
    margin-left: 15px;
  }
}
</style>

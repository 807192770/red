<template>
  <div class="population-insight">
    <div class="center">
      <div class="center-left">
        <base-bg :titlename="titlename[0]" @showbigpicture="showbigpicture(0)">
          <people-type :height="height" :dataList="populPeopleType"/>
        </base-bg>
        <base-bg :titlename="titlename[1]" @showbigpicture="showbigpicture(1)">
           <gender-age  :height="height" :dataList="populGenderAge"/>
        </base-bg>
        <base-bg :titlename="titlename[2]" @showbigpicture="showbigpicture(2)">
          <num-own  :height="height" :dataList="populNumOwn"/>
        </base-bg>
      </div>
      <div class="center-middle">
        <search-i @dateValue="dateValue" :dataList="populTreeList" @regionValue="regionValue"></search-i>
        <mapI :dataList="populMapList" :height="heightTotal" :customId="customid"/>
        <base-bg :titlename="titlename[6]" @showbigpicture="showbigpicture(6)">
          <population-change :height="heightLine" :flag="1" :dataList="populPopulationChange"/>
        </base-bg>
      </div>
      <div class="center-right">
        <base-bg :titlename="titlename[3]" @showbigpicture="showbigpicture(3)">
          <commuting-radius ref="comumtRadius" :height="height" @getCommutingRadius1="getCommutingRadius1" :dataList="radiusData1"/>
        </base-bg>
        <base-bg :titlename="titlename[4]" @showbigpicture="showbigpicture(4)">
         <commuting-time ref="comumtTime" :height="height" @getCommutingTime1="getCommutingTime1" :dataList="timeData1"/>
        </base-bg>
        <base-bg :titlename="titlename[5]" @showbigpicture="showbigpicture(5)">
         <hobby :height="height" :dataList="populHobby"/>
        </base-bg>
      </div>
    </div>
    <open-details v-show="isshowshadow" @closebigpicture="closebigpicture(1)" :title="title">
      <div :is="currentView" ref="openDetail" :randomData="isCommut" :dataList="currentData" :cummutData="timeData" :radiusData="radiusData" :count="count" :height="heightOpen" @getCommutingTime="getCommutingTime" @getCommutingRadius="getCommutingRadius"></div>
    </open-details>
  </div>
</template>

<script>
import baseBg from "../../base/base-bg";
import openDetails from "./open-details";
import genderAge from "./gender-age";
import peopleType from "./people-type";
import numOwn from "./num-own";
import commutingRadius from "./commuting-radius";
import populationChange from "./population-change";
// import mapI from "./map";
// import mapI from "./map-3d";
import mapI from "./map-3d-gd";
import searchI from "./search";
import commutingTime from "./commuting-time";
import hobby from "./hobby"
import { mapGetters } from "vuex";
import { getPopulationInsight } from "../../api/population-insight";
export default {
  data() {
    return {
      isshowshadow: false,
      count: 0,
      titlename: [
        "常驻人口类型",
        "性别及年龄",
        "号码归属地TOP10",
        "通勤半径",
        "通勤时长",
        "兴趣爱好",
        "人口数量变化",
        "号码归属地"
      ],
      showList: [false, false, false, false, false, false, false],
      currentView: "",
      currentData: "",
      title: "",
      height: 0,
      heightMiddle: 0,
      heightOpen: 0,
      heightTotal: 0,
      heightLine: 0,
      isshowDanger: false,
      region_id: '130100-1-1',
      region_type:1,
      time:'20190920',
      // time: "20160617114500",
      customid:'130100-1',
      timeData:[],
      timeData1:[],
      radiusData:[],
      radiusData1:[],
      isCommut: false,//展示大框标志
    };
  },

  components: {
    baseBg,
    openDetails,
    peopleType,
    genderAge,
    numOwn,
    commutingRadius,
    populationChange,
    mapI,
    searchI,
    commutingTime,
    hobby
  },

  computed: {
    ...mapGetters([
      'populGenderAge',
      'populPeopleType',
      'populNumOwn',
      'populHobby',
      'populPopulationChange',
      'populMapList',
      'populTreeList'
    ])
  },
  created(){

  },
  mounted() {
    this.height = 2.30;
    this.heightOpen = 5.6;
    this.heightLine = 1.50;
    this.heightTotal = 6.4;

    this.getPeopleType();
    this.getGenderAge();
    this.getOwnNum();
    this.getCommutingTime('1');
    this.getCommutingTime1('1');
    this.getCommutingRadius('1');
    this.getCommutingRadius1('1');
    this.getHobby();
    this.getPopulationChange();
    this.getMapData();
    this.getTreeList();
  },
  methods: {
    // 搜索条目-地区选择
    regionValue(val){
      console.log("regionValue",val);
      this.customid = val;
      this.getPeopleType();
      this.getGenderAge();
      this.getOwnNum();
      // 初始化通勤时间+通勤半径
      this.getCommutingTime('1');
      this.getCommutingTime1('1');
      this.getCommutingRadius('1');
      this.getCommutingRadius1('1');
      this.$refs.comumtTime.ttime = '1';
      this.$refs.comumtRadius.rtime = '1';
      if(this.$refs.openDetail){
        this.$refs.openDetail.ttime = '1';
        this.$refs.openDetail.rtime = '1';
      }
      this.getHobby();
      this.getPopulationChange();
      this.getMapData();
    },
    // 搜索条目-时间选择
    dateValue(val) {
      console.log("dateValue",val);
      this.time = val;
      this.getPeopleType();
      this.getGenderAge();
      this.getOwnNum();
      // 初始化通勤时间+通勤半径
      this.getCommutingTime('1');
      this.getCommutingTime1('1');
      this.getCommutingRadius('1');
      this.getCommutingRadius1('1');
      this.$refs.comumtTime.ttime = '1';
      this.$refs.comumtRadius.rtime = '1';
      if(this.$refs.openDetail){
        this.$refs.openDetail.ttime = '1';
        this.$refs.openDetail.rtime = '1';
      }

      this.getHobby();
      this.getPopulationChange();
      this.getMapData();
    },
    showbigpicture(val) {
      this.count++;
      this.isshowshadow = true;
      switch (val) {
        case 0:
          this.currentView = "peopleType";
          this.currentData = this.populPeopleType;
          this.title = this.titlename[0];
          break;
        case 1:
          this.currentView = "genderAge";
          this.currentData = this.populGenderAge;
          this.title = this.titlename[1];
          break;
        case 2:
          this.currentView = "numOwn";
          this.currentData = this.populNumOwn;
          this.title = this.titlename[7];
          break;
        case 3:
          this.currentView = "commutingRadius";
          this.currentData = this.radiusData;
          this.title = this.titlename[3];
          this.isCommut = Math.random();
          break;
        case 4:
          this.currentView = "commutingTime";
          this.currentData = this.timeData;
          this.title =this.titlename[4];
          this.isCommut = Math.random();
          break;
        case 5:
          this.currentView = "hobby";
          this.currentData = this.populHobby;
          this.title =this.titlename[5];
          break;
        case 6:
          this.currentView = "populationChange";
          this.title = this.titlename[6];
          this.currentData = this.populPopulationChange;
          break;
      }
    },
    closebigpicture() {
      this.isshowshadow = false;
    },
    //  获取城市列表
    getTreeList() {
      let params ={
        task:'areaIdAndName',
      };
      getPopulationInsight(params).then(response => {
        let data = response.data.data;
        this.$store.commit('SET_POPULATION_TREE', data);
      })
    },
    //获取地图数据
    getMapData() {
      let params ={
        task:'professionResideAnalyze',
        region_id: this.region_id,
        customid: this.customid,
        time: this.time
      };
      getPopulationInsight(params).then(response => {
        let data = response.data;
        this.$store.commit('SET_POPULATION_MAP', data);
      })
    },
    //获取人口类型
    getPeopleType(){
      let params ={
        customid:this.customid,
        time:this.time,
        task:'populationType',
      };
      getPopulationInsight(params).then(response => {
        let peopleType = response.data.data;
        this.$store.commit('SET_POPULATION_TYPE', peopleType);
      })
    },
    // 获取性别及年龄
    getGenderAge(){
      let params ={
        customid:this.customid,
        time:this.time,
        task:'professionSexaulAndAge',
      };
      getPopulationInsight(params).then(response => {
        let data = response.data.data;
        let xAxis = [],male = [], female = [];
        data.forEach(item =>{
          if(item.age_class === '18') {
            item.age_class = '<19'
          }else if(item.age_class === '61') {
            item.age_class = '>60'
          }
          xAxis.push(item.age_class);
          male.push({value: item.male, z: item.male_rate});
          female.push({value: item.female, z: item.female_rate});
        });
        this.$store.commit('SET_POPULATION_GENDER', {xAxis, male, female});
      })
    },
    // 号码归属地top10
    getOwnNum(){
      let params ={
        customid:this.customid,
        time:this.time,
        task:'professionHomeOfNumber',
      };
      getPopulationInsight(params).then(response => {
        let data = response.data.data,pro = [],interPro = [],inter = [];
        data.forEach(item => {
          if(item.data_type === '本省'){
            pro.push({name: item.home_name,value: item.total_num});
          }else if(item.data_type === '省际'){
            interPro.push({name: item.home_name,value: item.total_num});
          }else {
            inter.push({name: item.home_name,value: item.total_num});
          }
        });
        this.$store.commit('SET_POPULATION_NUM', {pro,interPro,inter});
      })
    },
    // 通勤半径
    getCommutingRadius(val){
      let params ={
        customid:this.customid,
        time:this.time,
        data_type: val,
        task:'commuteDisc',
      };
      getPopulationInsight(params).then(response => {
        let data = response.data.data;
        this.radiusData = data.map(item => {
          return {name : item.commuteDisc, value : Number(item.total_num)}
        });
      })
    },
    // 通勤半径1
    getCommutingRadius1(val){
      let params ={
        customid:this.customid,
        time:this.time,
        data_type: val,
        task:'commuteDisc',
      };
      getPopulationInsight(params).then(response => {
        let data = response.data.data;
        this.radiusData1 = data.map(item => {
          return {name : item.commuteDisc, value : Number(item.total_num)}
        });
      })
    },
    // 通勤时长
    getCommutingTime(val){
      let params ={
        customid:this.customid,
        time:this.time,
        data_type: val,
        task:'commuteTime',
      };
      getPopulationInsight(params).then(response => {
        let data = response.data.data;
        this.timeData = data.map(item => {
          return {name : item.commuteTime, value : Number(item.total_num)}
        });
      })
    },
    // 通勤时长1
    getCommutingTime1(val){
      let params ={
        customid:this.customid,
        time:this.time,
        data_type: val,
        task:'commuteTime',
      };
      getPopulationInsight(params).then(response => {
        let data = response.data.data;
        this.timeData1 = data.map(item => {
          return {name : item.commuteTime, value : Number(item.total_num)}
        });
      })
    },
    // 兴趣爱好
    getHobby(){
      let params ={
        customid:this.customid,
        time:this.time,
        task:'interestPreference',
      };
      getPopulationInsight(params).then(response => {
        let data = response.data.data;
        this.$store.commit('SET_POPULATION_HOBBY', data);
      })
    },
    // 人口数量变化
    getPopulationChange(){
      let params ={
        customid:this.customid,
        time:this.time,
        task:'populationQuantityChange',
      };
      getPopulationInsight(params).then(response => {
        let data = response.data.data;
        let xAxis = [];
        let yAxis = data.map(item => {
          xAxis.push(item.statis_date);
          return Number(item.total_num);
        });
        this.$store.commit('SET_POPULATION_CHANGE', {yAxis,xAxis});
      })
    }
  }
};
</script>
<style lang='scss' scoped>
.population-insight {
  background-color: #020d19;
  display: block;
  .top{
    width: 100%;
    height: 50px;
  }
  .center {
    background-color: #020d19;
    width: 100%;
    display: flex;
    .center-left {
      flex: 0.44;
    }
    .center-middle {
      flex: 1;
      padding: 0 15px;
    }
    .center-right {
      flex: 0.44;
    }
  }
}
</style>

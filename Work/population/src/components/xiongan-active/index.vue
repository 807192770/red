<template>
  <div class="xiongan-active">
    <div class="left" id="left">
      <base-bg :titlename="titlename[0]" @showbigpicture="showbigpicture(0)">
        <gender-age :dataList="xionganActiveGenderAge" :height="height" />
      </base-bg>
      <base-bg :titlename="titlename[1]" @showbigpicture="showbigpicture(1)">
        <population-origin :dataList="xionganActivePopulationOrigin" :height="height" :flag="1" />
      </base-bg>
      <base-bg :titlename="titlename[2]" @showbigpicture="showbigpicture(2)" >
        <doughnut-chart :dataList="xionganActivePopulationType" :height="height" :flag="1" />
      </base-bg>
    </div>
    <div class="middle">
      <search :dataList="xionganActiveTreeList" @regionMes="regionMes" @regionMapMes="regionMapMes" @dateValue="dateValue"/>
      <hunan-map :dataList="xionganActiveMapList" @regionMes="regionMes" @regionMapMes="regionMapMes" :height="heightTotal"/>
      <base-bg :titlename="titlename[6]" @showbigpicture="showbigpicture(6)" >
        <line-chart :dataList="xionganActiveActiveList" :height="heightLine" :flag="1" />
      </base-bg>
    </div>
    <div class="right">
      <base-bg :titlename="titlename[3]" @showbigpicture="showbigpicture(3)">
        <population-table :dataList="xionganActiveCarList" :flag="1" :height="height" />
      </base-bg>
      <base-bg :titlename="titlename[4]" @showbigpicture="showbigpicture(4)">
        <bar-chart :dataList="xionganActiveOtherProvinces" :flag="1" :height="height"/>
      </base-bg>
      <base-bg :titlename="titlename[5]" @showbigpicture="showbigpicture(5)" >
        <provincial-number :dataList="xionganActiveOriginList" :flag="1" :height="height"/>
      </base-bg>
    </div>
    <!-- <open-details v-show="isshowshadow" @closebigpicture="closebigpicture(0)">
      <gender-age :genderAge="genderAge" :count="count" />
    </open-details> -->
    <open-details v-show="isshowshadow" @closebigpicture="closebigpicture(1)" :title="title">
      <div :is="currentView" :dataList="currentData" :count="count" :height="heightOpen"></div>
    </open-details>
  </div>
</template>

<script>
import baseBg from '../../base/base-bg'
import barChart from './bar-chart'
import genderAge from './gender-age'
import genderAgeOther from './gender-age-other'
import populationOrigin from './population-origin'
import doughnutChart from './doughnut-chart'
import populationTable from './population-table'
import populationTableOther from './population-table-other'
import provincialNumber from './provincial-number'
import lineChart from './line-chart'
import hunanMap from './map'
import search from './search'
import openDetails from './open-details'
import noData from '../../base/no-data/no-data'
import {mapGetters} from 'vuex'
import { getXionganActive } from '../../api/xiongan-active'
export default {
  data () {
    return {
      isshowshadow:false,
      count:0,
      titlename:['性别及年龄', '人口来源地', '人口类型', '区域人口数量及密度TOP5', '外省号码TOP10', '国际漫游人员来源地TOP5', '近7天活跃人口数量'],
      showList:[false,false,false,false,false,false,false],
      currentView:"",
      currentData:"",
      title:'',
      region_id:"336",
      region_type:1,
      day:'20190920',
      height:0,
      heightTotal:0,
      heightOpen:0,
      heightLine:0,
      // genderAge:{},
    };
  },

  components: {
    baseBg,
    barChart,
    genderAge,
    genderAgeOther,
    populationOrigin,
    doughnutChart,
    populationTable,
    provincialNumber,
    lineChart,
    hunanMap,
    search,
    openDetails,
    populationTableOther,
    noData
  },

  computed: {
    ...mapGetters([
      'xionganActiveGenderAge',
      'xionganActiveCommuteTimeList',
      'xionganActiveOriginList',
      'xionganActiveOtherProvinces',
      'xionganActiveAgelist',
      'xionganActiveCarList',
      'xionganActivePopulationOrigin',
      'xionganActiveActiveList',
      'xionganActiveMapList',
      'xionganActivePopulationType',
      'xionganActiveTreeList'
    ]),
  },

  mounted() {
  	// this.height = (window.screen.height - 370) / 3
  	// this.heightTotal = window.screen.height - 271
    // this.heightOpen = window.screen.height * 0.43

  	this.height = 2.30
  	// this.heightTotal = 5.5
    this.heightOpen = 5.6
    this.heightLine = 1.50
    this.getAgeList()
    this.getOriginList()
    this.getTypeList()
    this.getDensityList()
    this.getOtherProvincesList()
    this.getRoamList()
    this.getMapList()
    this.getChangeList()
    this.getTreeList()
    this.getPopulationNumber()
  },

  methods: {
  	dateValue(val) {
      console.log("dateValue")
  		this.day = val
      this.getAgeList()
      this.getOriginList()
      this.getTypeList()
      this.getDensityList()
      this.getOtherProvincesList()
      this.getRoamList()
      this.getChangeList()
      this.getTreeList()
      this.getMapList()
      this.getPopulationNumber()
  	},
  	regionMapMes(val) {
      console.log("regionMapMes")
  		this.region_id = val.region_id;
      this.region_type = val.region_type;
      this.getMapList()
      this.getPopulationNumber()
  	},
    regionMes(val) {
      console.log("regionMes")
      this.region_id = val.region_id;
      this.region_type = val.region_type;
      this.getAgeList()
      this.getOriginList()
      this.getTypeList()
      this.getDensityList()
      this.getOtherProvincesList()
      this.getRoamList()
      this.getChangeList()
      this.getTreeList()
    },
    getAgeList() {
      var params ={
        region_id:this.region_id,
        day:this.day,
        task:'sexualAndAge',
      }
      getXionganActive(params).then(response => {
        var data = response.data.data
        var genderAge = {}
        var xAxis = []
        var male = []
        var female = []
        data.forEach(element => {
          if(element.age_class == '18') {
            element.age_class = '<19'
          }else if(element.age_class == '61') {
            element.age_class = '>60'
          }
          xAxis.push(element.age_class)
          male.push(element.male)
          female.push(element.female)
          genderAge.xAxis = xAxis
          genderAge.male = male
          genderAge.female = female
        });
        this.$store.commit('SET_XIONGAN_ACTIVE_AGE', genderAge)
        // this.genderAge = genderAge
    //  console.log(genderAge)
      })
    },
    getOriginList() {
      var params ={
        region_id:this.region_id,
        day:this.day,
        task:'msisdnOrigin',
      }
      getXionganActive(params).then(response => {
        var data = response.data.data[0]
//      console.log(data)
        var originListp = []
        var originObj = {}
        if(data) {
        if(data.region_type == '1') {
           originListp[0] = {name:'本省', value:data.local_prov}
           originListp[1] = {name:'省际', value:data.other_prov}
        }else if(data.region_type == '2') {
           originListp[0] = {name:'本市', value:data.local_city}
           originListp[1] = {name:'本省外市', value:data.local_prov}
           originListp[2] = {name:'省际', value:data.other_prov}
        }else if(data.region_type == '3') {
           originListp[0] = {name:'本市', value:data.local_city}
           originListp[1] = {name:'本省外市', value:data.local_prov}
           originListp[2] = {name:'省际', value:data.other_prov}
        }

        }
        this.$store.commit('SET_XIONGAN_ACTIVE_ORIGIN', originListp)
      })
    },
    getTypeList() {
      var params ={
        region_id:this.region_id,
        day:this.day,
        task:'resideFloat',
      }
      getXionganActive(params).then(response => {
        var data = response.data.data[0]
        // console.log(data)
        if(data) {
	        var dataReset = []
	        dataReset[0] = {name:"常驻人口", value: data.reside_num}
	        dataReset[1] = {name:"流动人口", value: data.float_num}
          this.$store.commit('SET_XIONGAN_ACTIVE_TYPE', dataReset)
        }else {
          this.$store.commit('SET_XIONGAN_ACTIVE_TYPE', [])
        }
//      console.log(dataReset)
      })
    },
    getDensityList() {
      var params ={
        region_id:this.region_id,
        day:this.day,
        region_type:this.region_type + 2,
        task:'density',
      }
      getXionganActive(params).then(response => {
        var data = response.data.data
        this.$store.commit('SET_XIONGAN_ACTIVE_TABLE', data)
//      console.log(response.data.data)
      })
    },
    getPopulationNumber() {
      var params ={
        region_id:this.region_id,
        day:this.day,
        task:'populationNumber',
        region_type:this.region_type + 1,
      }
      getXionganActive(params).then(response => {
        var data = response.data.data
        this.$store.commit('SET_XIONGAN_ACTIVE_POPULATIONNUMBER', data)
        // console.log(response.data.data)
      })
    },
    getOtherProvincesList() {
      var params ={
        region_id:this.region_id,
        day:this.day,
        task:'domesticRoamIn',
      }
      getXionganActive(params).then(response => {
        var data = response.data.data
        this.$store.commit('SET_XIONGAN_ACTIVE_OTHERPROVINCES', data)
//      console.log(response.data.data)
      })
    },
    getRoamList() {
      var params ={
        region_id:this.region_id,
        day:this.day,
        task:'foreignRoamIn',
      }
      getXionganActive(params).then(response => {
        var data = response.data.data
        this.$store.commit('SET_XIONGAN_ACTIVE_ROAM', data)
//      console.log(response.data.data)
      })
    },
    getMapList() {
      var params ={
        region_id:this.region_id,
        day:this.day,
        task:'map',
      }
      getXionganActive(params).then(response => {
        var data = response.data.data
        this.$store.commit('SET_XIONGAN_ACTIVE_MAP', data)
      })
    },
    getChangeList() {
      var params ={
        region_id:this.region_id,
        day:this.day,//20160621
        task:'activityPeople',
      }
      getXionganActive(params).then(response => {
        var data = response.data.data
        this.$store.commit('SET_XIONGAN_ACTIVE_ACTIVE', data)
//      console.log(response.data.data)
      })
    },
    getTreeList() {
      var params ={
        task:'cityTree',
      }
      getXionganActive(params).then(response => {
        var data = response.data.data
        data.forEach((element)=> {
          element.isShowCity = false
          element.region_type = '1'
          element.children.forEach((el)=> {
            el.isShowCounty = false
          })
        })
        this.$store.commit('SET_XIONGAN_ACTIVE_TREE', data)
      })
    },
    showbigpicture(val) {
      this.count++;
      this.isshowshadow = true
      switch(val){
        case 0 :
          this.currentView = 'genderAgeOther'
          this.currentData = this.xionganActiveGenderAge
          this.title = this.titlename[0]
          break;
        case 1 :
          this.currentView = 'populationOrigin'
          this.currentData = this.xionganActivePopulationOrigin
          this.title = this.titlename[1]
          break;
        case 2 :
          this.currentView = 'doughnutChart'
          this.currentData = this.xionganActivePopulationType
          this.title = this.titlename[2]
          break;
        case 3 :
          this.currentView = 'populationTableOther'
          this.currentData = this.xionganActiveCarList
          this.title = '区域人口数量及密度'
          break;
        case 4 :
          this.currentView = 'barChart'
          this.currentData = this.xionganActiveOtherProvinces
          this.title = '外省号码'
          break;
        case 5 :
          this.currentView = 'provincialNumber'
          this.currentData = this.xionganActiveOriginList
          this.title = '国际漫游人员来源地'
          break;
        case 6 :
          this.currentView = 'lineChart'
          this.title = this.titlename[6]
          this.currentData = this.xionganActiveActiveList
          break;
      }
    },
    closebigpicture() {
      this.isshowshadow = false
    }
  }
}

</script>
<style lang='scss' scoped>
.xiongan-active{
  display: flex;
  background-color: #020d19;
  .left{
    flex: 0.45;
  }
  .middle{
    flex: 1;
    padding:0 15px;
    position: relative;
  }
  .right{
    flex: 0.45;
  }
}
</style>

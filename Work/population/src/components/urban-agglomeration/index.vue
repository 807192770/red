<template>
  <div class="urban-agglomeration">
    <!-- 城市群分析 -->
    <div class="left">
      <selectMain @dateValue='dateValue'></selectMain>
      <cityMap :mapData='mapAllData'></cityMap>
    </div>
    <div class="right">
      <base-bg :titlename="titlename[0]" @showbigpicture="showbigpicture(0)">
        <urbanMix :dataList="urbanMixList" :height="height" :flag="0" />
      </base-bg>
      <base-bg :titlename="titlename[1]" @showbigpicture="showbigpicture(1)">
        <customerFlow :subSelectList='subSelectList' @getGrandSonData="getGrandSonData" :height="selectHeight"
          :flag="0">
        </customerFlow>
      </base-bg>
      <base-bg :titlename="titlename[2]" @showbigpicture="showbigpicture(2)">
        <commutingMode @getGrandSonData="getGrandSonData2" :subSelectList='subSelectList' :height="selectHeight"
          :flag="0">
        </commutingMode>
      </base-bg>
    </div>
    <open-details v-show="isshowshadow" @closebigpicture="closebigpicture(1)" :title="title">
      <div :is="currentView" :dataList="currentData" :flag="1" :count="count" :height="heightOpen"
        @getGrandSonData="eventFlag" :subSelectList='subSelectList'>
      </div>
    </open-details>
  </div>
</template>

<script>
import baseBg from '../../base/base-bg';
import urbanMix from './urban-mix';
import cityMap from './map3d';
import customerFlow from './customer-flow1';
import commutingMode from './commuting-mode1';
import openDetails from './open-details';
import selectMain from './select-main';
import {
  getCityAnalysisGroup
} from '../../api/urban-agglomeration';
import contactPeopleData from './jsonData/cityGroupRanking.json'
import customerFlowListData from './jsonData/cityGroupPassengerFlow.json'
import cityGroupTotalCityData from './jsonData/cityGroupTotalCity.json'
import cityGroupTraveModeData from './jsonData/cityGroupTravelMode.json'

export default {
  data() {
    return {
      isshowshadow: false,
      count: 0,
      titlename: ['活跃城市组合TOP5', '活跃城市客流量', '城市客流交通方式'],
      currentView: '',
      currentData: {},
      heightOpen: 0,
      height: 0,
      selectHeight: 0,
      title: '',
      mapAllData: '',
      urbanMixList: '',
      subSelectList: [],
      customerFlowList: '',
      commutingModeList: '',
      eventFlag: '',
      day: '20190922'
    };
  },

  components: {
    baseBg,
    urbanMix,
    cityMap,
    customerFlow,
    commutingMode,
    openDetails,
    selectMain
  },

  mounted() {
    this.height = 2.35
    this.selectHeight = 1.92
    this.heightOpen = 5.6
    this.getMapLine()
    this.getUrbanMix()
    this.getSubSelect()
  },

  methods: {
    getMapLine() {
      // 地图城市&&连线
      var params = {
        task: 'cityGroupContanctPeople',
        statisDate: this.day
        // statisDate: '20190923'
      }
      getCityAnalysisGroup(params).then(response => {
        sessionStorage.setItem("mapLineData", JSON.stringify(response.data));
        this.mapAllData = response.data
      })
    },
    getUrbanMix() {
      // 城市组合
      var params = {
        task: 'cityGroupRanking',
        statisDate: this.day
        // statisDate: '20190923'
      }

      this.urbanMixList = contactPeopleData.contactPeople
      // getCityAnalysisGroup(params).then(response => {
      //   this.urbanMixList = response.data.contactPeople
      // })
    },
    getSubSelect() {
      // subSelect
  
        this.subSelectList = cityGroupTotalCityData
        this.getCustomerFlow(cityGroupTotalCityData.maxCityPassengerFlow, cityGroupTotalCityData.secondCityPassengerFlow)
        this.getCommutingMode(cityGroupTotalCityData.maxCityPassengerFlow, cityGroupTotalCityData.secondCityPassengerFlow)

        var selectList = cityGroupTotalCityData.data
        var selectValue = [cityGroupTotalCityData.maxCityPassengerFlow, cityGroupTotalCityData.secondCityPassengerFlow]

        this.$store.commit('urbanAgglomeration/SET_SELECTLIST', selectList)
        this.$store.commit('urbanAgglomeration/SET_SELECTVALUE1', selectValue)
        this.$store.commit('urbanAgglomeration/SET_SELECTVALUE2', selectValue)
    },
    getCustomerFlow(val, val2) {
        this.customerFlowList = customerFlowListData
        this.$store.commit('urbanAgglomeration/SET_CUSTOMER', customerFlowListData)
    },
    getCommutingMode(val, val2) {
      // 城市客流交通方式
        this.commutingModeList = cityGroupTraveModeData.data
        this.$store.commit('urbanAgglomeration/SET_COMMUTING', cityGroupTraveModeData.data)
    },
    showbigpicture(val) {
      this.count++;
      this.isshowshadow = true

      switch (val) {
        case 0:
          this.currentView = 'urbanMix';
          this.currentData = this.urbanMixList;
           this.title = '活跃城市组合';
          break;
        case 1:
          this.currentView = 'customerFlow';
          this.currentData = this.customerFlowList;
          this.eventFlag = this.getGrandSonData;
           this.title = this.titlename[1];
          break;
        case 2:
          this.currentView = 'commutingMode';
          this.currentData = this.commutingModeList;
          this.eventFlag = this.getGrandSonData2;
           this.title = this.titlename[2];
          break;
      }
    },
    closebigpicture() {
      this.isshowshadow = false;
    },
    getGrandSonData(val) {
      this.getCustomerFlow(val.valueFrom, val.valueTo)
      var selectValue = [val.valueFrom, val.valueTo]
      this.$store.commit('urbanAgglomeration/SET_SELECTVALUE1', selectValue)
    },
    getGrandSonData2(val) {
      this.getCommutingMode(val.valueFrom, val.valueTo)
      var selectValue = [val.valueFrom, val.valueTo]
      this.$store.commit('urbanAgglomeration/SET_SELECTVALUE2', selectValue)
    },
    dateValue(data) {
      this.day = data;
      this.getMapLine()
      this.getUrbanMix()
      this.getSubSelect()
    }
  }
}

</script>
<style lang='scss' scoped>
  .urban-agglomeration {
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

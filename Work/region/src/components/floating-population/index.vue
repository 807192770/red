<template>
  <div class="floating-population">
    <div class="left">
      <div class="btn-box">
        <div class="move-in btn active" @click="moveIn" ref="moveOne">迁入</div>
        <div class="move-out btn" @click="moveOut" ref="moveTwo">迁出</div>
      </div>
      <div class="out-people">
        <p>
          凤凰古镇{{ isLock? titlename[3]:titlenameOne[3] }}人数
          <span>(人)</span>
        </p>
        <strong>{{totalNumber}}</strong>
      </div>
      <div class="total">
        <p>地域人口总数量(人)</p>
        <div class="legend">
          <div class="line_text">
            <span>0</span>
            <span class="center_line">{{ min_legend }}</span>
            <span class="center_line">{{ less_legend }}</span>
            <span>{{ max_Legend }}</span>
          </div>
          <div class="line">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <img src="../../assets/images/population-total.png" alt="地域人口总数量" />
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="title-btn">
        <span class="title_top">top&nbsp;:&nbsp;</span>
        <el-select v-model="value" placeholder="10" size="mini" @change="cong">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div class="l-btn">
          <i class="iconfont">&#xe651;</i>
          <div class="region">
            <span>区域名称</span>
          </div>
        </div>
        <div class="r-btn">
          <i class="iconfont">&#xe601;</i>
          <div class="date">
            <span>2016-06-17</span>
          </div>
        </div>
      </div>
      <div class="map">
        <population-map :dataList="moveOutNum" />
      </div>
    </div>
    <div class="right">
      <floating-bg
        :titlename="isLock? titlename[0]:titlenameOne[0]"
        @showbigpicture="showbigpicture(0)"
      >
        <population-cumulative :dataList="cumulative" :height="height"></population-cumulative>
      </floating-bg>
      <floating-bg
        :titlename="isLock? titlename[1]:titlenameOne[1]"
        @showbigpicture="showbigpicture(1)"
      >
        <population-ranking :dataList="ranking" :height="height" />
      </floating-bg>
      <floating-bg
        :titlename="isLock? titlename[2]:titlenameOne[2]"
        @showbigpicture="showbigpicture(2)"
      >
        <population-contrast :dataList="contrast" :height="height" />
      </floating-bg>
      <open-floating v-show="isshowshadow" @closebigpicture="closebigpicture(1)" :title="title">
        <div :is="currentView" :dataList="currentData" :count="count" :height="heightOpen">
          <population-ranking-two :dataList="contrast" :height="height" />
        </div>
      </open-floating>
    </div>
  </div>
</template>

<script>
import floatingBg from "../../base/floating-bg";
import populationCumulative from "./population-cumulative";
import populationRanking from "./population-ranking";
import populationRankingTwo from "./population-ranking-two";
import populationContrast from "./population-contrast";
import openFloating from "./open-floating";
import search from "./search";
import populationMap from "./population-map";
import { mapGetters } from "vuex";
import "../../assets/css/font_f8j4mugndf/iconfont.css";
import { getMobilityPopulation } from "../../api/population-distribution";

export default {
  data() {
    return {
      isLock: true,
      isshowshadow: false,
      count: 0,
      titlename: [
        "当天迁入人口累计",
        "人口来源地排行",
        "近7天迁入用户量对比",
        "迁入"
      ],
      titlenameOne: [
        "当天迁出人口累计",
        "人口去向地排行",
        "近7天迁出用户量对比",
        "迁出"
      ],
      height: 0,
      totalNumber: 0,
      region_id: 100,
      data_type: 0,
      time: 20160617111500,
      title: "",
      currentView: "",
      currentData: "",
      heightOpen: 0,
      value: "10",
      options: [
        {
          value: "10",
          label: "10"
        },
        {
          value: "30",
          label: "30"
        },
        {
          value: "50",
          label: "50"
        },
        {
          value: "1000",
          label: "所有"
        }
      ],
      min_legend: 10, // 图例范围
      less_legend: 50,
      max_Legend: 100
    };
  },

  components: {
    floatingBg,
    populationCumulative,
    populationRanking,
    populationRankingTwo,
    populationContrast,
    populationMap,
    openFloating,
    search
  },

  computed: {
    ...mapGetters([
      "populationType",
      "moveOutNum",
      "cumulative",
      "ranking",
      "rankingTwo",
      "contrast"
    ])
  },

  mounted() {
    let screenHeight = window.screen.height;
    let screenWidth = window.screen.width;
    // console.log(window.screen.width);
    this.height = (screenHeight - 370) / 3;
    this.heightOpen = screenHeight * 0.43;
    this.getMoveOutNum();
    this.getCumulative();
    this.getRanking();
    this.getRankingTwo();
    this.getContrast();
  },

  methods: {
    cong() {
      // 地图数据
      this.getMoveOutNum();
    },
    moveIn() {
      this.isLock = true;
      this.data_type = 0;
      this.getMoveOutNum();
      this.getCumulative();
      this.getRanking();
      this.getRankingTwo();
      this.getContrast();
      // console.log(this.data_type);
      let In = this.$refs.moveOne;
      let Out = this.$refs.moveTwo;
      In.classList.add("active");
      Out.classList.remove("active");
    },
    moveOut() {
      this.isLock = false;
      this.data_type = 2;
      this.getMoveOutNum();
      this.getCumulative();
      this.getRanking();
      this.getRankingTwo();
      this.getContrast();
      // console.log(this.data_type);
      let In = this.$refs.moveOne;
      let Out = this.$refs.moveTwo;
      Out.classList.add("active");
      In.classList.remove("active");
    },
    getMoveOutNum(num) {
      //迁出人口总数
      let params = {
        region_id: this.region_id,
        time: this.time,
        task: "mobilityPopulationOD",
        data_type: this.data_type
      };

      getMobilityPopulation(params).then(response => {
        // console.log(response.data)
        if (response) {
          let data = response.data.data;

          // console.log(data);
          let newData1 = [];
          let newData2 = [];
          let obj = {};
          data.forEach(element => {
            let adLongitude = [];
            let reLongitude = [];
            adLongitude.push(
              element.adLongitude,
              element.adLatitude,
              element.adName,
              element.countNum
            );
            reLongitude.push(
              element.regionLongitude,
              element.regionLatitude,
              element.regionName,
              element.countNum
            );
            if (this.data_type == 2) {
              newData2.push({
                name: element.regionName,
                value: reLongitude,
                fromName: element.adName,
                toName: element.regionName
              });
            } else {
              newData2.push({
                name: element.adName,
                value: adLongitude,
                fromName: element.adName,
                toName: element.regionName
              });
            }
            // console.log(this.value);
            // if(this.value == "") {
            //   newData2 = newData2.slice(0,10);
            // }else {
            newData2 = newData2.slice(0, this.value);
            // }
            // console.log(newData2)
            obj.newData2 = newData2;
          });
          data.forEach(element => {
            let regionLongitude = [];
            let adLongitude = [];
            let newCoords = [];
            adLongitude.push(element.adLongitude, element.adLatitude);
            regionLongitude.push(
              element.regionLongitude,
              element.regionLatitude
            );
            newCoords.push(adLongitude, regionLongitude);
            if (this.data_type == 2) {
              newData1.push({
                fromName: element.adName,
                toName: element.regionName,
                coords: newCoords,
                countNum: element.countNum
              });
            } else {
              newData1.push({
                fromName: element.adName,
                toName: element.regionName,
                coords: newCoords,
                countNum: element.countNum
              });
            }
            // if(this.value == "") {
            //   newData1 = newData1.slice(0,10);
            // }else {
            newData1 = newData1.slice(0, this.value);
            // }
            // console.log(newData1);
            obj.newData1 = newData1;
          });
          obj.min_legend = this.min_legend;
          obj.less_legend = this.less_legend;
          obj.max_Legend = this.max_Legend;
          this.totalNumber = response.data.total[0].total_number;
          this.$store.commit("SET_MOVEOUTNUM", obj);
        }
      });
    },
    getCumulative() {
      // 当天迁出人口累计
      let params = {
        region_id: this.region_id,
        time: this.time,
        task: "currentMobilityPopulation",
        data_type: this.data_type
      };
      getMobilityPopulation(params).then(response => {
        // console.log(response.data.data)
        if (response) {
          let data = response.data.data;
          let userNumber = {};
          let xAxis = [];
          let yData = [];
          data.forEach(element => {
            xAxis.push(element.count_num);
            yData.push(element.time);
          });
          userNumber.xAxis = xAxis;
          userNumber.yData = yData;
          // console.log(userNumber);
          this.$store.commit("SET_CUMULATIVE", userNumber);
        }
        // console.log(data);
      });
    },
    getRanking() {
      // 迁出排行
      let params = {
        region_id: this.region_id,
        time: this.time,
        task: "SourceOfPopulationAndLeave",
        data_type: this.data_type
      };
      getMobilityPopulation(params).then(response => {
        // console.log(response.data.data)
        if (response) {
          let data = response.data.data;
          let userNumber = {};
          let xAxis = [];
          let yData = [];
          data.forEach(element => {
            xAxis.push(element.areaName);
            yData.push(element.countNum);
          });
          if (this.isshowshadow) {
            xAxis = xAxis.slice(0, 20);
            yData = yData.slice(0, 20);
            userNumber.xAxis = xAxis;
            userNumber.yData = yData;
            this.$store.commit("SET_RANKINGTWO", userNumber);
          } else {
            xAxis = xAxis.slice(0, 10);
            yData = yData.slice(0, 10);
            userNumber.xAxis = xAxis;
            userNumber.yData = yData;
            // console.log(userNumber);
            this.$store.commit("SET_RANKING", userNumber);
          }
          // console.log(xAxis);
          // console.log(yData);
        }
        // console.log(data);
      });
    },
    getRankingTwo() {
      // 迁出排行
      let params = {
        region_id: this.region_id,
        time: this.time,
        task: "SourceOfPopulationAndLeave",
        data_type: this.data_type
      };
      getMobilityPopulation(params).then(response => {
        // console.log(response.data.data)
        if (response) {
          let data = response.data.data;
          let userNumber = {};
          let xAxis = [];
          let yData = [];
          data.forEach(element => {
            xAxis.push(element.areaName);
            yData.push(element.countNum);
          });
          xAxis = xAxis.slice(0, 20);
          yData = yData.slice(0, 20);
          userNumber.xAxis = xAxis;
          userNumber.yData = yData;
          this.$store.commit("SET_RANKINGTWO", userNumber);
          // console.log(xAxis);
          // console.log(yData);
        }
        // console.log(data);
      });
    },
    getContrast() {
      // 近七天变化量
      let params = {
        region_id: this.region_id,
        time: this.time,
        task: "nearSevenDaysMobilityPopulation",
        data_type: this.data_type
      };
      getMobilityPopulation(params).then(response => {
        // console.log(response.data.data)
        if (response) {
          let data = response.data.data;
          let userNumber = {};
          let xAxis = [];
          let yData = [];
          data.forEach(element => {
            xAxis.push(element.statis_date);
            yData.push(element.subs_num);
          });
          userNumber.xAxis = xAxis;
          userNumber.yData = yData;
          // console.log(userNumber);
          this.$store.commit("SET_CONTRAST", userNumber);
        }
        // console.log(data);
      });
    },
    showbigpicture(val) {
      this.count++;
      this.isshowshadow = true;
      switch (val) {
        case 0:
          this.currentView = "populationCumulative";
          this.currentData = this.cumulative;
          this.title = this.isLock ? this.titlename[0] : this.titlenameOne[0];
          break;
        case 1:
          this.currentView = "populationRankingTwo";
          this.currentData = this.rankingTwo;
          this.title = this.isLock ? this.titlename[1] : this.titlenameOne[1];
          break;
        case 2:
          this.currentView = "populationContrast";
          this.currentData = this.contrast;
          this.title = this.isLock ? this.titlename[2] : this.titlenameOne[2];
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
.floating-population {
  display: flex;
  .left {
    flex: 0.58;
    .btn-box {
      display: flex;
      margin-left: 0.64rem;
      .btn {
        width: 1rem;
        height: 0.44rem;
        border: 1px solid #2181ea;
        font-size: 0.2rem;
        color: #2181ea;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 0.1rem;
        cursor: pointer;
      }
      .active {
        background: #1475e8;
        color: #ffffff;
        border: none;
      }
    }
    .out-people {
      margin-top: 1.53rem;
      padding-left: 0.9rem;
      p {
        height: 0.38rem;
        font-size: 0.4rem;
        margin-bottom: 0.31rem;
        // padding-left: 0.9rem;
        span {
          font-size: 0.2rem;
        }
      }
      strong {
        font-size: 1.04rem;
        font-weight: 700;
        padding-left: 0.06rem;
      }
    }
    .total {
      width: 2.8rem;
      height: 0.72rem;
      margin-top: 1.28rem;
      margin-left: 0.88rem;
      p {
        padding-left: 0.16rem;
        margin-bottom: 0.14rem;
        font-size: 0.16rem;
        color: #a5a7ae;
      }
      .legend {
        padding: 0.14rem 0.2rem;
        background-image: linear-gradient(
          90deg,
          rgba(183, 202, 231, 0.07) 0%,
          rgba(183, 202, 231, 0.11) 24%,
          rgba(183, 202, 231, 0.14) 48%,
          rgba(183, 202, 231, 0.07) 100%
        );
        .line_text {
          display: flex;
          justify-content: space-between;
          .center_line {
            margin-left: 0.15rem;
          }
        }
        .line {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.07rem;
          margin-top: 0.04rem;
          padding: 0 0.03rem;
          span {
            display: inline-block;
            width: 1px;
            height: 0.1rem;
            background: #999;
          }
        }
        img {
          width: 100%;
        }
      }
    }
  }
  .middle {
    flex: 1;
    padding: 0 0.15rem;
    .title-btn {
      display: flex;
      justify-content: flex-end;
      color: #3fd9ff;
      .title_top {
        font-size: 0.22rem;
        height: 0.36rem;
        line-height: 0.3rem;
      }
      /deep/ .el-select {
        width: 1.06rem;
        height: 0.36rem;
        margin-right: 0.4rem;
        border-radius: 0;
        .el-input {
          .el-input__inner {
            background: rgba(183, 202, 231, 0.1);
            border-radius: 0;
            border: none;
            color: #3fd9ff;
          }
          .el-input__icon::before {
            color: #3fd9ff;
            content: "\e78f";
            font-size: 0.2rem;
          }
        }
      }
      .l-btn {
        position: relative;
        i {
          width: 0.14rem;
          height: 0.2rem;
          position: absolute;
          left: -0.15rem;
          top: 52%;
          transform: translate(-50%, -50%);
        }
        .region {
          display: inline-block;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 0.88rem;
          height: 0.36rem;
          background: rgba(183, 202, 231, 0.1);
          span {
            height: 0.16rem;
          }
        }
      }
      .r-btn {
        position: relative;
        margin-left: 0.58rem;
        i {
          width: 0.14rem;
          height: 0.16rem;
          position: absolute;
          left: -0.17rem;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .date {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 1.06rem;
          height: 0.36rem;
          background: rgba(183, 202, 231, 0.1);
          span {
            height: 0.12rem;
          }
        }
      }
    }
  }
  .right {
    flex: 0.6;
    // base-bg {
    //   background-image: linear-gradient(
    //     90deg,
    //     rgba(183, 202, 231, 0.07) 0%,
    //     rgba(183, 202, 231, 0.11) 24%,
    //     rgba(183, 202, 231, 0.14) 48%,
    //     rgba(183, 202, 231, 0.07) 100%
    //   );
    // }
    border-radius: 0.4rem;
  }
}
</style>
<style lang="scss">
.el-select-dropdown {
  border:none !important;
  background: rgba(183, 202, 231, 0.3) !important;
  // color: #3fd9ff !important;
}
.el-select-dropdown__item {
  color: #3fd9ff !important;
}
.el-select-dropdown__item.hover,.el-select-dropdown__item:hover {
  background: rgba(183, 202, 231, 0.4) !important;
}
.popper__arrow::after {
  border-bottom-color: #1E2E5D !important;
  top: 0 !important;
}
</style>
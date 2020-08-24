<template>
  <div class="search">
    <div class="search-box">
      <div class="area-box">
        <div class="area-box-city">
          <i class="el-icon-location-outline icon"></i>
          <!-- <img src="../../assets/images/qurt_center_location.png" alt=""> -->
          <div class="area">正定</div>
        </div>
        <div class="area-box-time icon">
          <!-- <i class="el-icon-date icon"></i> -->
          <!-- <img src="../../assets/images/qurt_center_calender.png" alt=""> -->
          <!-- <div class="time">{{time}}</div> -->
          <el-date-picker
            v-model="value"
            type="datetime"
            readonly
            :placeholder="defaultDates"
            default-value="2016-6-17"
            :default-time="times"
            style="height:0.36rem;background: #12213f;color: #3fd9ff;"
            :picker-options="pickerOptions"
            @change="getValues"
          ></el-date-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      times: "",
      defaultDates: "",
      pickerOptions: {
        disabledDate(time) {
          let startDate = new Date("2019/08/29 8:00:00").getTime();
          let endDate = new Date("2019/08/30 23:59:59").getTime();
          // let curDate = new Date().getTime();
          // // console.log(curDate)
          // let three = 90 * 24 * 3600 * 1000;
          // let threeMonths = curDate - three;
          return time.getTime() < startDate || time.getTime() > endDate;
        }
      }
    };
  },
  props: ["getValues"],
  watch: {
    // getValues(val) {
    //   console.log(val, 5666666666)
    // }
  },
  components: {},

  computed: {},

  mounted() {
    this.getTimes();
  },
  methods: {
    getTimes() {
      var currentHours = new Date().getHours(); //获取当前小时数(0-23)
      var currentMinutes = new Date().getMinutes(); //获取当前分钟数(0-59)
      var currentSeconds = new Date().getSeconds(); //获取当前秒数(0-59)
      // console.log(currentHours, currentMinutes, currentSeconds)
      if (currentHours < 10) {
        currentHours = "0" + currentHours;
      }
      if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
      }
      if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
      }
      this.times = currentHours + ":" + currentMinutes + ":" + currentSeconds;
      this.defaultDates = "2019-08-30" + " " + this.times;
    }
  }
};
</script>
<style>
.search-box .el-input__inner::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #3fd9ff;
}
.search-box .el-input__inner:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #3fd9ff;
}
.search-box .el-input__inner::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #3fd9ff;
}
.search-box .el-input__inner::-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #3fd9ff;
}
.search-box .el-input__inner {
  color: #3fd9ff !important;
  height: 0.36rem;
  border-radius: 0;
  background-color: #12213f;
  border: 1px solid #12213f;
}
.el-input__icon {
  line-height: 0.36rem !important;
  color: #3fd9ff;
}
</style>

<style lang='scss' scoped>
.search {
  position: absolute;
  right: 24px;
  top: 24px;
  z-index: 999;
}
// .search-box .el-input__inner {
//   color: #3fd9ff;
//   height: 0.36rem;
//   background: #213044;
//   border: 1px solid #213044;
// }
.search-box {
  display: flex;
  justify-content: flex-end;
  .area-box {
    justify-content: flex-start;
    //  width: 315px;
    .area-box-city {
      display: flex;
      float: left;
      margin-left: 0.1rem;
      align-items: center;
      img {
        width: 0.15rem;
        height: 0.22rem;
        vertical-align: "10px";
      }
      .icon {
        font-size: 0.22rem;
        color: #3fd9ff;
      }
    }
    .area-box-time {
      display: flex;
      float: left;
      margin-left: 0.1rem;
      align-items: center;
      // img {
      //   width: 0.15rem;
      //   height: 0.22rem;
      //   vertical-align: "10px";
      // }
      // .icon {
      //   font-size: 0.18rem;
      //   color: #3fd9ff;
      // }
    }
  }
  .area {
    // width: 106px;
    height: 0.36rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #12213f;
    color: #3fd9ff;
    margin-left: 0.1rem;
    padding: 0 0.15rem;
  }
  // .time {
  //   // width: 106px;
  //   height: 0.36rem;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   background: #12213f;
  //   color: #3fd9ff;
  //   margin-left: 0.1rem;
  //   padding: 0 0.15rem;
  // }
  // .tabs {
  //   display: flex;
  //   font-size: 12px;
  //   align-items: center;
  //   li {
  //     padding: 10px 20px;
  //     border: 1px solid #1c3a66;
  //     color: #5976a1;
  //     margin-right: 10px;
  //     border-radius: 2px;
  //     cursor: pointer;
  //     &.current {
  //       background-color: #2181ea;
  //       border: 1px solid #2181ea;
  //       color: #ffffff;
  //     }
  //   }
  // }
}
// .population-all {
//   margin-left: 0.32rem;
//   height: 1.2rem;
//   padding-top: 0.2rem;
//   .population-all-box {
//     float: left;
//   }
//   .population-all-city {
//     font-size: 0.4rem;
//     margin-bottom: 0.12rem;
//   }
//   .population-all-people {
//     font-size: 0.2px;
//   }
//   .population-all-number {
//     float: left;
//     font-size: 0.77rem;
//     margin-left: 0.2rem;
//   }
// }
// .popper__arrow /deep/ {
//   display: none;
// }
.el-button--mini,
.el-button--mini.is-round,
span {
  display: none;
}
</style>
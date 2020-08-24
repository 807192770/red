<template>
  <div class="monitoring-flow">
    <!-- 重要卡口人流量监控与预测 -->
    <div class="monitoring-flow-top">
      <ul class="monitoring-flow-tab">
        <li
          v-for="(item, index) in this.data"
          v-bind:key="index"
          v-bind:class="{ bg:index==current}"
          @click="addClass(index, echartsinit)"
        >{{item}}</li>
      </ul>
      <div class="bayonet-monitor">
        <el-select v-model="value" :placeholder="placeholder" @change="changeValue($event, echartsinit)">
          <el-option
            v-for="item in this.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div :id="id" class="monitoring-flow-bar"></div>
  </div>
</template>

<script>
import echarts from "echarts";
// import selectBayonet from "./select-bayonet";
export default {
  name: "monitoring-flow",
  data() {
    return {
      id: "monitoring-flow-bar",
      list: "1",
      numberOfJacks: [],
      data: ["卡口人数", "流入", "流出"],
      options: this.changeRodeList,
      value: "会展中心站",
      placeholder:'会展中心站',
      newforecastList:"",
    };
  },
  components: {
    // selectBayonet
  },
  props: {
    dataList: {
      type: Object,
      default: {}
    },
    addClass: {
      type: Function
      // default: 0
    },
    changeValue: {
      type: Function
      // default: 0
    },
    count: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 0
    },
    height: {
      // type: Number,
      // default: 0
    },
    changeRodeList: {
      type: Array,
      // default: 0
    },
    forecastList:{
      // type: Object,
      // default: {}
    }
  },
  watch: {
    dataList(val) {
      this.dataList = val
      this.$nextTick(() => {
        this.echartsinit();
      })
    },
    forecastList(val){
      this.newforecastList = val
      this.$nextTick(() => {
        this.echartsinit();
      })
    },
    changeRodeList(val){
      this.options = val
      this.placeholder = val[0].label
    }
  },
  mounted() {
    this.echartsinit();
    if (!this.count) {
      this.id = this.id + "1";
    } else {
      this.id = this.id + "0";
    }
    this.$nextTick(() => {
      this.echartsinit();
    });
  },

  methods: {
    echartsinit() {
      let arr = []
      if(this.dataList && this.dataList.data && this.dataList.data.length){
        arr.length = this.dataList.data.length
        arr[arr.length-1]=this.dataList.data[arr.length-1]
        this.forecastList.data && arr.push(this.forecastList.data[0],this.forecastList.data[1])
      }
      let dataArr = this.dataList.xAxisData && JSON.parse(JSON.stringify(this.dataList.xAxisData))
      dataArr && this.forecastList.xAxisData && dataArr.push(this.forecastList.xAxisData[0],this.forecastList.xAxisData[1])
      var that = this;
      var dom = document.getElementById(this.id);
      dom.style.height = this.height + "rem";
      var myChart = echarts.init(dom);
      var option = {
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            return (
              params[0].name +
              "<br />" +
              '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#1369de"></span>' +
              params[0].seriesName +
              "&nbsp" +
              ":" +
              "&nbsp" +
              params[0].data +
              "<br />" + 
              '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#1369de"></span>' + 
              "地点" + 
              "&nbsp" +
              ":" +
              "&nbsp" +
              that.value
            );
          }
        },
        grid: {
          left: "5%",
          right: "4%",
          bottom: "15%",
          top: "25%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          // boundaryGap: false,
          data: dataArr,
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: "#ffffff"
            },
          },
          axisLine: {
            lineStyle: {
              color: "#214470"
            }
          }
        },
        yAxis: {
          show: true,
          name: "人数",
          nameLocation: "end",
          nameTextStyle: {  
            color: "#2765A6",
            fontSize: 13,
            padding: [0, 50, 0, 0]
          },
          type: "value",
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: "#ffffff"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#214470"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#214470"
            }
          },
          axisTick: {
            show: false
          },
        },
        series: [
          {
            name: this.dataList.name,
            type: "line",
            symbolSize: 8,
            symbol: "circle",
            data: this.dataList.data,
            itemStyle: {
              normal: {
                color: "#2181EA" // 会设置点和线的颜色，所以需要下面定制 line
              }
            },
            lineStyle: {
              type:'solid',
              normal: {
                color: "#2181EA" // 线条颜色
              }
            }
          },
          {
            name: this.dataList.name,
            type: "line",
            symbolSize: 8,
            smooth:false,   //关键点，为true是不支持虚线，实线就用true
            itemStyle:{
              normal:{
                lineStyle:{
                  width:2,
                  color:'#2181EA',
                  type:'dotted'  //'dotted'虚线 'solid'实线
                }
              }
            },
            // symbol: "circle",
            data: arr,
          }
        ]
      };
      myChart.setOption(option, true);
    },
    confirm() {
      // console.log(this.dataList);
    }
  }
};
</script>
<style lang='scss' scoped>
.monitoring-flow {
  display: flex;
  flex-direction: column;
  .monitoring-flow-top {
    width: 100%;
    // height:0.3rem;
    display: flex;
    justify-content: space-between;
    .monitoring-flow-tab {
      display: flex;
      justify-content: space-between;
      // margin-top: 0.2rem;
      li {
        display: flex;
        align-items: center;
        justify-content: center;
        // padding: 0.05rem 0.06rem;
        // width: 0.48rem;
        // height: 0.22rem;
        padding: 0.05rem 0.15rem;
        border: 1px solid #2181ea;
        box-sizing: border-box;
        border-radius: 2px;
        // text-align: center;
        // line-height: 22px;
        margin: 0 0.1rem;
        // text-align: center;
        // line-height: 0.22rem;
        cursor: pointer;

      }
      li:first-of-type {
        // width: 0.68rem;
      }
    }
  }
  .monitoring-flow-bar {
    width: 100%;
    height: 2.3rem;
    // margin-top: 0.5rem;
    padding-bottom: 0.2rem;
  }

  select::-ms-expand {
    display: none;
  }
}

.bg {
  color: #2181ea;
}
</style>
<style lang='scss'>
.bayonet-monitor {
  .el-select {
    .el-input__inner {
      background: #213148;
      border: 1px solid #4b8cd3;
      padding: 0.07rem 0;
      // width: 1.9rem;
      height: 0.35rem;
      color: #fff;
      text-align: center;
    }
    // .el-select__caret::before,
    // .el-select__caret::after {
    //   vertical-align: middle;
    //   // position: absolute;
    //   // botto:0%;
    //   // right: 30%;
    // }
    .el-input__icon {
      height: 100%;
    }
  }
  input[type="text"],
  input[type="date"] {
    background: #fff;
    /* padding: .375rem .75rem; */
  }
  select,
  input[type="text"],
  input[type="date"] {
    padding: 0;
    border-radius: 2px;
  }
}
</style>
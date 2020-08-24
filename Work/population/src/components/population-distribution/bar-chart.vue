<template>
  <div id="barChart">
    <div :id="id" class="bar"></div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "barChart",
  data() {
    return {
      id: "bar",
      xData:[],
      legendName:[],
      xAxisArr:[]
    };
  },
  // props: ['dataList'],
  props: {
    dataList: {
      // type: Object,
      // default: {}
    },
    count: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    flag:{

    }
  },
  watch: {
    dataList(val) {
      // console.log(val);
      this.resetData(val);
      if (!this.count) {
      this.id = this.id + "0";
    } else {
      this.id = this.id + "1";
    }
    this.$nextTick(() => {
      this.echartsinit();
    });
    }
  },
  computed: {},
  mounted() {
    this.resetData(this.dataList)
    if (!this.count) {
      this.id = this.id + "0";
    } else {
      this.id = this.id + "1";
    }
    this.$nextTick(() => {
      this.echartsinit();
    });
  },
  components: {},
  methods: {
    resetData(val) {
      // console.log(val)
      var xAxisArr = [];
      var legendName = [];
      var xData = [];
      // for (var key in obj) {
        val.forEach(element => {
        var legendObj = {};
        var xDataObj = {
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 1,
                    color: "#0e6ae1"
                  },
                  {
                    offset: 0,
                    color: "#07aae0"
                  }
                ]),
                barBorderRadius: [2, 2, 0, 0]
              }
            }
          }
        var xAxisObj = {}
        var xAxis = [];
        xDataObj.name = element.name;
        xAxisObj.name = element.name;
        legendObj.name = element.name;
        legendObj.icon = "none";
        var arr = [];
        element.data.forEach(el => {
          xAxis.push(el.location_name);
          arr.push(el.subs_num);
        });
        if (this.flag == 1) {
          xAxis = xAxis.slice(0, 10);
          arr = arr.slice(0, 10);
        }
        xAxisObj.data = xAxis
        xAxisArr.push(xAxis)
        xDataObj.data = arr;
        legendName.push(legendObj);
        xData.push(xDataObj);
      // }
      // console.log(xData);
      // console.log(legendName);
      // console.log(xAxisArr);
      });
      this.xData = xData
      this.legendName = legendName
      this.xAxisArr = xAxisArr
    },
    echartsinit() {
      var that = this;
      var dom = document.getElementById(this.id);
      dom.style.height = this.height + "px";
      var myChart = echarts.init(dom);
      // console.log(this.xAxisArr[0])
      var option = {
        calculable: true,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          textStyle: {
            color: "#90979c"
          },
          x: "right",
          y: "top",
          selectedMode: "single",
          itemGap: -5,
          itemWidth:10,
          inactiveColor: "#415d8a",
          textStyle: {
            color: "#05deff",
            borderColor: "#415d8a",
            borderWidth: "1", 
            padding: [6, 10]
          },
          data: that.legendName
        },
        grid: {
          left: "0",
          right: "4%",
          bottom: "5%",
          top: "20%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: that.xAxisArr[0],
          axisLabel: {
            interval: 0,
            rotate:40,
            textStyle: {
              fontSize: 12,
              color: "#ffffff"
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#214470"
            }
          }
        },
        yAxis: {
          position: "top",
          type: "value",
          name: "人数(人)",
          nameTextStyle: { color: "#415d8a" },
          boundaryGap: [0, 0.01],
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: "#ffffff"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#163460"
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#214470"
            }
          }
        },
        series: that.xData
      };
      myChart.on("legendselectchanged", obj => {
        var options = myChart.getOption();
        var data = []
        if(obj.name == '本市') {
          data = that.xAxisArr[0]
        }else if(obj.name == '本省外市') {
          data = that.xAxisArr[1]
        }else if(obj.name == '省际') {
          data = that.xAxisArr[2]
        }else if(obj.name == '国际') {
          data = that.xAxisArr[3]
        }
        options.xAxis[0].data = data;
        myChart.setOption(options, true);
      });
      myChart.setOption(option, true);
    }
  }
};
</script>

<style lang="scss" scoped>
#barChart {
  .bar {
  }
}
</style>
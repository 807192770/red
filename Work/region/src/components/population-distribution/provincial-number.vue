<template>
  <div id="provincial-number">
    <div :id="id" class="provincial-number-bar"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "provincial-number",
  data() {
    return {
      id: "provincial-number-bar",
      xData: [],
      legendName: [],
      xAxisArr: []
    };
  },
  // props: ["dataList"],
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
    flag: {

    }
  },
  watch: {
    dataList(val) {
      this.resetData(val);
      if (!this.count) {
        this.id = this.id + "0";
      } else {
        this.id = this.id + "1";
      }
      this.$nextTick(() => {
        this.echartsinit();
      });
    },
    count(val) {
      if (val > 0) {
        this.id = "provincial-number-bar";
        this.id = this.id + "1";
        this.$nextTick(() => {
          this.echartsinit();
        });
      }
    }
  },
  computed: {},
  mounted() {
    this.resetData(this.dataList);
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
              color: "#ff324f",
              barBorderRadius: [2, 2, 0, 0]
            }
          }
        };
        var xAxisObj = {};
        var xAxis = [];
        xDataObj.name = element.name;
        xAxisObj.name = element.name;
        legendObj.name = element.name;
        legendObj.icon = "none";
        var arr = [];
        element.data.forEach(el => {
          xAxis.push(el.area_name);
          arr.push(el.attr_num);
        });
        xAxisObj.data = xAxis;
        if (this.flag == 1) {
          xAxis = xAxis.slice(0, 10);
          arr = arr.slice(0, 10);
        }else {
          xAxis = xAxis.slice(0, 20);
          arr = arr.slice(0, 20);
        }
        xAxisArr.push(xAxis);
        xDataObj.data = arr;
        legendName.push(legendObj);
        xData.push(xDataObj);
      // }
      // console.log(xData);
      // console.log(legendName);
      // console.log(xAxisArr);
      });
      this.xData = xData;
      this.legendName = legendName;
      this.xAxisArr = xAxisArr;
    },
    echartsinit() {
      var that = this;
      var dom = document.getElementById(this.id);
      dom.style.height = this.height + "rem";
      let htmlFontSize = this.$htmlFontSize
      var myChart = echarts.init(dom);
      var option = {
        calculable: true,
        tooltip: {
          trigger: "axis",
          formatter: "{b} : {c}(人)",
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
          itemGap: -0.05*htmlFontSize,
          itemWidth:0.1*htmlFontSize,
          inactiveColor: "#415d8a",
          textStyle: {
            color: "#05deff",
            borderColor: "#415d8a",
            borderWidth: "1",
            padding: [0.06*htmlFontSize, 0.1*htmlFontSize]
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
            interval: 2,
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
        if(obj.name == '居住地') {
          data = that.xAxisArr[0]
        }else if(obj.name == '工作地') {
          data = that.xAxisArr[1]
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
#provincial-number {
  .provincial-number-bar {
    height: 2.37rem;
  }
}
</style>
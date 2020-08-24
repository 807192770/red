<template>
  <div id="population-contrast">
    <div :id="id" class="population-contrast-bar"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "population-contrast",
  data() {
    return {
      id: "population-contrast-bar",
      colorArr: ["#136ee2", "#14a2dd", "#ff324f"]
    };
  },
  props: {
    dataList: {},
    count: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  watch: {
    dataList(val) {
      // console.log(val)
      this.data = val;
      this.$nextTick(() => {
        this.echartsinit();
      });
    }
  },
  computed: {},
  mounted() {
    this.data = this.dataList;
    this.id = this.id + "1";
    if (!this.count) {
      this.id = this.id + "0";
    }
    this.$nextTick(() => {
      this.echartsinit();
    });
  },
  components: {},
  methods: {
    echartsinit() {
      let that = this;
      let dom = document.getElementById(this.id);
      dom.style.height = this.height + "px";
      let myChart = echarts.init(dom);
      let xAxisdata = this.data.xAxis;
      let yAxisdata = this.data.yData;
      // console.log(xAxisdata);
      let option = {
        // color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          // formatter:function(axis) {

          // },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow' | 'dotted'
            lineStyle: {
              color:["rgba(245,245,245,0.2)"]
            }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "6%",
          top: "35",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: xAxisdata, 
          axisLabel: {
            interval: 1, //此处关键， 设置文本标签全部显示
            // inside:false,
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
          },
        },
        yAxis: {
          name: "人数(人)",
          type: "value",
          data:yAxisdata,
          // max:"450",
          // min:"200",
          nameTextStyle: { color: "#415d8a" },
          axisLabel: {
            interval: 2,
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
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#163460"
            }
          }
        },
        series: [
          {
            name: "人数",
            type: "line",
            barWidth: "30%",
            data: yAxisdata,
            default: 'auto',
            symbolSize:10,
            symbol: 'circle',
            itemStyle: {
              // color:"#102239",
              normal: {
                color:"#05deff",
                borderWidth: 50,
                lineStyle: {
                  // color:"red"
                  color: "#1463c2",
                }
              }
            }
          }
        ]
      };
      myChart.setOption(option, true);
    }
  }
};
</script>

<style lang="scss" scoped>
#population-contrast {
  width: 100%;
  .title-head {
    color: #fff;
  }
}
</style>
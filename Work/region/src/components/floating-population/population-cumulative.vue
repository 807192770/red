<template>
  <div id="population-cumulative">
    <div :id="id" class="population-cumulative-bar"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "population-cumulative",
  data() {
    return {
      id: "population-cumulative-bar",
      // colorArr: ["#136ee2", "#14a2dd", "#ff324f"]
    };
  },
  props: {
    dataList: {

    },
    count: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
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
      // console.log(this.data);
      // console.log(xAxisdata);
      // console.log(yAxisdata);
      let option = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: {
              color:["rgba(245,245,245,0.2)"]
            }
          }
        },
        grid: {
          left: "3%",
          right: "7%",
          bottom: "6%",
          top: "35",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data:yAxisdata, 
          axisLabel: {
            // inside:false,
            interval: 10,
            showMaxLabel:true,
            textStyle: {
              fontSize: 12,
              color: "#ffffff"
            }
          },
          axisTick: {
            show: true
          },
          axisLine: {
            lineStyle: {
              color: "#214470"
            }
          },
        },
        yAxis: {
          name: "人口数量(人)",
          type: "value",
          data:yAxisdata,
          // max:"1200",
          // min:"200",
          scale:true,
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
            symbol: "none",
            barWidth: "30%",
            // data: [820, 932, 901, 934, 720, 1130, 1020],
            data:xAxisdata,
            smooth: true,
            default: 'auto',
            // itemStyle: {
            //   normal: {
            //     color:"#000",
            //     lineStyle: {
            //       color:"red"
            //     }
            //   }
            // }
          }
        ]
      };
      myChart.setOption(option, true);
    }
  }
};
</script>

<style lang="scss" scoped>
#population-cumulative {
  width: 100%;
  .title-head {
    color: #fff;
  }
}
</style>
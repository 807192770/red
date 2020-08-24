<template>
  <div :id="id" class="line-chart"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "line-chart",
  data() {
    return {
      id: "line-chart",
      data: []
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
    flag: {
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
      this.data = val;
      if (!this.count) {
        this.id = this.id + "0";
      } else {
        this.id = this.id + "1";
      }
      this.$nextTick(() => {
        this.echartsinit();
      });
    },
    // count(val) {
    //   if (val > 0) {
    //     this.id = "bar";
    //     this.id = this.id + "1";
    //     this.$nextTick(() => {
    //       this.echartsinit();
    //     });
    //   }
    // }
  },
  computed: {},
  mounted() {
    this.data = this.dataList;
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
    echartsinit() {
      var that = this;
      var dom = document.getElementById(this.id);
      dom.style.height = this.height + "rem";
      var xAxis = this.data.xAxis;
      var yData = this.data.yData;
      var myChart = echarts.init(dom);
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "none" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: "category",
          data: xAxis, // 要传
          axisLabel: {
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
        grid: {
          left: "1%",
          right: "1%",
          bottom: "0",
          top: "12%",
          containLabel: true
        },
        yAxis: {
          type: "value",
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
        series: [
          {
            data: yData,
            type: "line",
            symbol: "emptyCircle", //设定为实心点
            symbolSize: 10, //设定实心点的大小
            color: ["#2cc2ff"],
            center: ["40%", "50%"]
          }
        ]
      };
      myChart.setOption(option, true);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>



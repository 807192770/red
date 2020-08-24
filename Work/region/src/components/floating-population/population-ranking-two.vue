<template>
  <div id="population-ranking-two">
    <div :id="id" class="population-ranking-two"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "population-ranking-two",
  data() {
    return {
      id: "population-ranking-two"
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
      // console.log(val);
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
      let dom = document.getElementById(this.id);
      dom.style.height = this.height + "px";
      let myChart = echarts.init(dom);
      let xAxisdata = this.data.xAxis;
      let yAxisdata = this.data.yData;
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
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
            interval: 2, //此处关键,设置文本标签全部显示
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
          }
        },
        yAxis: {
          name: "人数(人)",
          type: "value",
          data: yAxisdata,
          // max: "1000",
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
            type: "bar",
            barWidth: "30%",
            barGap: "-100%",
            barCategoryGap: "40%",
            default: "auto",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#ff324f" },
                  { offset: 1, color: "#0e6ae1" }
                ])
              }
            },
            data: yAxisdata
          }
        ]
      };
      myChart.setOption(option, true);
    }
  }
};
</script>

<style lang="scss" scoped>
#population-ranking-two {
  width: 100%;
}
</style>
<template>
  <div id="commuting-mode">
    <!-- 重要路段实时流量监控 -->
    <!-- <selectMode @confirm='confirm' :data='list'/> -->
    <div :id="id" class="commuting-mode-bar"></div>
  </div>
</template>

<script>
import echarts from "echarts";
//   import selectMode from './select-sub'
export default {
  name: "commuting-mode",
  data() {
    return {
      id: "commuting-mode-bar",
      list: "2"
    };
  },
  components: {
    //   selectMode
  },
  props: {
    dataList: {
      type: Object,
      default: {}
    },
    count: {
      type: Number,
      default: 0
    },
    height: {
      // type: Number,
      // default: 0
    }
  },
  watch: {
    dataList(val) {
      this.dataList = val;
      this.id = "commuting-mode-bar";
      this.id = this.id + "1";
      this.$nextTick(() => {
        this.echartsinit();
      });
    }
  },

  mounted() {
    this.echartsinit();
    if (this.count) {
      this.id = this.id + "0";
    } else {
      this.id = this.id + "1";
    }
    this.$nextTick(() => {
      this.echartsinit();
    });
  },

  methods: {
    echartsinit() {
      var that = this;
      var dom = document.getElementById(this.id);
      dom.style.height = this.height + "rem";
      var myChart = echarts.init(dom);
      var col = "linear-gradient(180deg, #05DEFF 0%, #2181EA 100%)";
      var option = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: "20%",
          left: "5%",
          right: "3%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.dataList.roadName,
            axisLabel: {
              textStyle: {
                fontSize: 12,
                color: "#ffffff"
              },
              interval: 0
            },
            axisLine: {
              lineStyle: {
                color: "#214470"
              }
            }
          }
        ],
        yAxis: [
          {
            name: "人数",
            type: "value",
            nameLocation: "end",
            nameTextStyle: {
              color: "#2765A6",
              fontSize: 13,
              padding: [0, 40, 0, 0]
            },
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
            }
          }
        ],
        series: [
          {
            type: "bar",
            barWidth: "12px",
            data: this.dataList.dataAll,
            itemStyle: {
              normal: {
                barBorderRadius: 8,
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    { offset: 0, color: "#05DEFF" },
                    { offset: 1, color: "#2181EA" }
                  ] // 会设置点和线的颜色，所以需要下面定制 line
                )
              }
            }
          }
        ]
      };
      myChart.setOption(option, true);
    },
    confirm() {
      console.log("1");
    }
  }
};
</script>
<style lang='scss' scoped>
#commuting-mode {
  width: 100%;
  .commuting-mode-bar {
    width: 100%;
    height: 2.2rem;
  }
}
</style>
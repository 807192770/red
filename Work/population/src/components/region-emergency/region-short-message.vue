<template>
<!-- 短信发送统计 -->
  <div id="region-short-message">
    <p class="messageTitle">
      累计发送：
      <span class="data">{{ message_num }}</span>(条)
    </p>
    <div :id="id" class="region-short-message-bar"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "region-short-message",
  data() {
    return {
      id: "region-short-message",
      message_num: ""
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
      this.data = val;
      this.message_num = this.data.num;
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
      dom.style.height = this.height + "rem";
      let myChart = echarts.init(dom);
      this.message_num = this.data.num;
      let xAxisdata = this.data.source;
      let yAxisdata = this.data.yData;
      let option = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            // console.log(params)
            return (
              params[0].name +
              "<br />" +
              '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#1369de"></span>' +
              params[0].seriesName +
              "&nbsp" +
              ":" +
              "&nbsp" +
              params[0].data
            );
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "", // 默认为直线，可选为：'line' | 'shadow'
            textStyle: {
              color: "#fff"
            }
          }
        },
        // tooltip: {
        //   // trigger: "item",
        //   formatter: function(params) {
        //     return (
        //       params.seriesName +
        //       "<br />" +
        //       '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#1369de"></span>' +
        //       params.name +
        //       "&nbsp" +
        //       ":" +
        //       "&nbsp" +
        //       params.data
        //     );
        //   },
        //   axisPointer: {
        //     type: "shadow"
        //   }
        // },
        grid: {
          left: "5%",
          right: "6%",
          bottom: "6%",
          top: "35",
          containLabel: true
        },
        calculable: true,
        xAxis: {
          type: "category",
          data: xAxisdata,
          axisLabel: {
            interval: 1,
            // inside:false,
            showMaxLabel: true,
            textStyle: {
              fontSize: 12,
              color: "#fff"
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
          name: "条数",
          type: "value",
          data: yAxisdata,
          scale: true,
          nameTextStyle: { color: "#415d8a",padding: [0, 40, 0, 0] },
          axisLabel: {
            interval: 1,
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
            name: "条数",
            type: "bar",
            // stack: "总量",
            barMaxWidth: 35,
            barGap: "10%",
            barWidth: "12%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#05DEFF"
                  },
                  {
                    offset: 1,
                    color: "#2181EA"
                  }
                ])
              }
            },
            data: yAxisdata
          },
          {
            name: "总数",
            type: "line",
            // stack: "总量",
            symbolSize: 12,
            symbol: "circle",
            barWidth: "30%",
            itemStyle: {
              normal: {
                color: "#F45B5B",
                borderWidth:5,
                borderColor:"#15243A"
              }
            },
            lineStyle: {
              normal: {
                color: "rgba(244,91,91,0.2)" // 线条颜色
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
#region-short-message {
  // width: 12.8rem;
  position: relative;
  margin-top: 0.2rem;
  .messageTitle {
    position: absolute;
    right: 7%;
    // top:5%;
    .data {
      display: inline-block;
      width: 0.5rem;
      text-align: center;
      margin-right: 0.1rem;
    }
  }
}
</style>
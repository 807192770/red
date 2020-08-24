<template>
  <!-- 应急事件发生次数累计 -->
  <div id="region-frequency">
    <div :id="id" class="region-frequency-bar"></div>
    <!-- <div class="time-axis"></div> -->
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "region-frequency",
  data() {
    return {
      id: "region-frequency-bar"
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
      dom.style.height = this.height + "rem";
      let myChart = echarts.init(dom);
      let data_natural = this.data.data_natural;
      let data_other = this.data.data_other;
      let legendData = [];
      let xAxis = [];
      let yAxis = [];
      let data = [];
      let series = [];
      let color = [
        "#EDD762",
        "#2181EA",
        "#DB9F68",
        "#6951FF",
        "#F45B5B",
        "#FF8C21",
        "#3ED9F0",
        "#2C6BA6",
        "#AD9E86",
        "#B23232",
        "#27908A"
      ];
      for (let i in data_natural) {
        legendData.push(data_natural[i].events_type);
        xAxis.push(data_natural[i].events_num);
      }
      for (let i = 0; i < xAxis.length; i++) {
        switch (i) {
          case 0:
            data.push(["", xAxis[i]]);
            break;
          case 1:
            data.push(["", xAxis[i]]);
            break;
          case 2:
            data.push(["", xAxis[i]]);
            break;
          case 3:
            data.push(["", xAxis[i]]);
            break;
          case 4:
            data.push(["", xAxis[i]]);
            break;
          case 5:
            data.push(["", xAxis[i]]);
            break;
          case 6:
            data.push(["", xAxis[i]]);
            break;
        }
      }
      for (let i in data_other) {
        legendData.push(data_other[i].events_type);
        yAxis.push(data_other[i].events_num);
      }
      for (let i = 0; i < yAxis.length; i++) {
        switch (i) {
          case 0:
            data.push([yAxis[i], ""]);
            break;
          case 1:
            data.push([yAxis[i], ""]);
            break;
          case 2:
            data.push([yAxis[i], ""]);
            break;
          case 3:
            data.push([yAxis[i], ""]);
            break;
        }
      }
      for (let i = 0; i < legendData.length; i++) {
        series.push({
          name: legendData[i],
          type: "bar",
          stack: "总量",
          barWidth:20,
          label: {
            normal: {
              show: false,
              position: "insideRight"
            }
          },
          itemStyle: {
            normal: {
              color: color[i]
            },
            emphasis: {
              color: color[i]
            }
          },
          data: data[i]
        });
      }
      let option = {
        tooltip: {
          formatter: function(params) {
            return (
              params.name +
              "<br />" +
              params.marker +
              "从&nbsp2016-06-17&nbsp至今发生" +
              params.seriesName +
              "&nbsp" +
              params.data +
              "&nbsp" +
              "次"
            );
          }
        },
        legend: {
          data: legendData,
          itemWidth: 12,
          itemHeight: 12,
          left: "2%",
          textStyle: {
            color: "#fff",
            fontSize: 12
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          top: "20%",
          bottom: "6%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          barGap: "0",
          barCategoryGap: "0",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#214470"
            }
          }
        },
        yAxis: {
          type: "category",
          // show:false,
          barGap: "0",
          barCategoryGap: "0",
          data: ["其他预警", "自然灾害"],
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series:series
      };
      myChart.setOption(option, true);
    }
  }
};
</script>

<style lang="scss" scoped>
#region-frequency {
  // width: 5.4rem;
}
</style>
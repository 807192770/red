<template>
  <div class="charts-container">
    <div id="lineInfo2" class="line-charts" />
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "LineCharts",
  components: {},
  props: ["tableData", "field"],
  data() {
    return {
      legendSel: {},
      volumeUnit: ["kW", "°C"],
    };
  },
  computed: {},
  watch: {
    tableData(val) {
      this.$nextTick(() => {
        this.echartsinit(val);
      });
    },
    field(val) {},
  },
  mounted() {},
  methods: {
    echartsinit(data) {
      const colorList = ["#FA6812", "#259B35", "#D11E35", "#5d77e4"];
      data.yAxis.forEach((element, index) => {
        element.axisTick = {
          show: true,
        };
        element.splitLine = {
          show: false,
        };
        element.axisLine = {
          show: true,
          lineStyle: {
            color: "#556677",
          },
        };
        element.axisLabel = {
          textStyle: {
            color: "#556677",
          },
        };
        if (index == 0) {
          element.position = "left";
        } else if (index == 1) {
          element.position = "right";
        } else if (index > 1) {
          element.position = "right";
          element.offset = (index - 1) * 60;
        }
      });
      const that = this;
      const dom = document.getElementById("lineInfo2");
      const myChart = echarts.init(dom);
      const option = {
        backgroundColor: "#fff",
        title: {
          text: "五分钟电流监测",
          textStyle: {
            fontSize: 22,
            fontWeight: 800,
          },
          left: "center",
        },
        grid: {
          top: "15%",
          left: "5%",
          right: "10%",
          bottom: "15%",
        },
        legend: {
          top: "8%",
          data: data.legend,
          left: "center",
          icon: "circle",
          itemWidth: 10,
          itemGap: 20,
          textStyle: {
            color: "#556677",
          },
          selected: this.legendSel,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            label: {
              show: true,
              backgroundColor: "#fff",
              color: "#556677",
              borderColor: "rgba(0,0,0,0)",
              shadowColor: "rgba(0,0,0,0)",
              shadowOffsetY: 0,
            },
            lineStyle: {
              width: 0,
            },
          },
          backgroundColor: "#fff",
          textStyle: {
            color: "#5c6c7c",
          },
          padding: [10, 10],
          extraCssText: "box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)",
          formatter: function (par) {
            var rel = par[0].name;
            var unit;
            for (let index = 0; index < par.length; index++) {
              unit =
                par[index].seriesName.indexOf("温") != -1
                  ? "°C"
                  : par[index].seriesName.indexOf("比") != -1
                  ? "%"
                  : "A";
              let name =
                par[index].value === undefined ? "-" : par[index].value + unit;
              rel += `<br/>${par[index].marker}${par[index].seriesName} : ${name}`;
            }
            return rel;
          },
        },
        toolbox: {
          right: "8%",
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line"] },
            restore: { show: true },
            saveAsImage: { show: true },
            dataZoom: { show: true },
            dataView: { show: true },
          },
        },
        dataZoom: [
          {
            show: true,
            start: 0,
            end: 100,
          },
          {
            type: "inside", //显示拖拽功能,X轴下的时间长度数据
            start: 0,
            end: 100,
          },
        ],
        xAxis: [
          {
            type: "category",
            data: data.xAxis,
            boundaryGap: false,
            axisLine: {
              show: false,
              lineStyle: {
                color: "#DCE2E8",
              },
            },
            axisTick: {
              show: true,
            },
            axisPointer: {
              type: "none",
              label: {
                // padding: [11, 5, 7],
                padding: [0, 0, 10, 0],
                margin: 15,
                // 移入时的字体大小
                fontSize: 12,
                backgroundColor: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#fff", // 0% 处的颜色
                    },
                    {
                      offset: 0.86,
                      color: "#fff", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#fff", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
            },
            axisLabel: {
              interval: 19,
              textStyle: {
                color: "#556677",
              },
              // 默认x轴字体大小
              fontSize: 12,
              // margin:文字到x轴的距离
              margin: 15,
            },
          },
        ],
        yAxis: data.yAxis,
        series: data.series,
      };
      //先清空数据
      myChart.clear();
      //再加载
      myChart.setOption(option, true);
      myChart.on("legendselectchanged", function (params) {
        that.legendSel = myChart._model.option.legend[0].selected;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.charts-container {
  // display: flex;
  // justify-content: center;
  background: #fff;
  padding: 20px;
  .line-charts {
    height: 450px;
  }
}
</style>

<template>
  <div class="charts-container">
    <div :id="childId" class="line-charts"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "line-charts",
  data() {
    return {
      legendSel: {},
      lossUnit: ["kWH", "kWH", "%", "%"],
      powerUnit: ["kWH", "kWH"],
      currentUnit: ["A", "A", "A", "A", "A", "A"],
      volumeUnit: ["%", "kW", "°C"],
    };
  },
  props: ["childId", "chartsData", "field", "cycle"],
  watch: {
    chartsData(val) {
      this.$nextTick(() => {
        this.echartsinit(val);
      });
    },
    field(val) {},
  },
  computed: {},
  mounted() {},
  methods: {
    echartsinit(data) {
      const colorList = ["#FA6812", "#259B35", "#D11E35", "#5d77e4"];
      if (this.field == "current") {
        // 电流操作
        var xAxis = data.xAxis.map((el) => {
          let years = el.toString().slice(5);
          return years;
        });
        data.series.forEach((el) => {
          el.itemStyle = {};
          if (el.name.includes("A")) {
            el.itemStyle.normal = {
              color: "#FA6812",
            };
          } else if (el.name.includes("B")) {
            el.itemStyle.normal = {
              color: "#259B35",
            };
          } else {
            el.itemStyle.normal = {
              color: "#D11E35",
            };
          }
        });
      } else {
        if (this.cycle < 3) {
          var xAxis = data.xAxis.map((el) => {
            let years = el.toString().slice(0, 4);
            let mouths = el.toString().slice(4, 6);
            let days = el.toString().slice(6, 8);
            let hours = el.toString().slice(8, 10);
            return `${mouths}-${days} ${hours}:00`;
          });
        } else {
          var xAxis = data.xAxis.map((el) => {
            let years = el.toString().slice(0, 4);
            let mouths = el.toString().slice(4, 6);
            let days = el.toString().slice(6, 8);
            return `${years}-${mouths}-${days}`;
          });
        }
      }
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

      let that = this;
      let dom = document.getElementById(this.childId);
      let myChart = echarts.init(dom);
      let option = {
        backgroundColor: "#fff",
        title: {
          text:
            this.field == "loss"
              ? "损失率分析图"
              : this.field == "power"
              ? "电能分析图"
              : this.field == "current"
              ? "电流分析图"
              : "负荷比容量监测",
          textStyle: {
            fontSize: 22,
            fontWeight: 800,
          },
          left: "center",
        },
        grid: {
          top: "15%",
          left: "5%",
          right: this.field == "volume" ? "10%" : "5%",
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
          formatter: function (par) {
            var rel = par[0].name;
            var unit;
            if (that.field == "loss") {
              // 损失率
              for (let index = 0; index < par.length; index++) {
                if (par[index].seriesName.indexOf("量") != -1) {
                  unit = "KWH";
                } else {
                  unit = "%";
                }
                let name =
                  par[index].value === undefined
                    ? "-"
                    : par[index].value + " " + unit;
                rel += `<br/>${par[index].marker}${par[index].seriesName} : ${name}`;
              }
            } else if (that.field == "volume") {
              // 容量监测
              for (let index = 0; index < par.length; index++) {
                if (par[index].seriesName.indexOf("比") != -1) {
                  unit = "%";
                } else if (par[index].seriesName.indexOf("温") != -1) {
                  unit = "°C";
                } else {
                  unit = "KW";
                }
                let name =
                  par[index].value === undefined
                    ? "-"
                    : par[index].value + " " + unit;
                rel += `<br/>${par[index].marker}${par[index].seriesName} : ${name}`;
              }
            } else {
              // 电能 电流
              var str = that.field + "Unit";
              for (let index = 0; index < par.length; index++) {
                let name =
                  par[index].value === undefined
                    ? "-"
                    : par[index].value + " " + that[str][index];
                rel += `<br/>${par[index].marker}${par[index].seriesName} : ${name}`;
              }
            }
            return rel;
          },
          backgroundColor: "#fff",
          textStyle: {
            color: "#5c6c7c",
          },
          padding: [10, 10],
          extraCssText: "box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)",
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
            data: xAxis,
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
              interval: this.initInterval(),
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
    initInterval() {
      if (this.field == "loss" && this.cycle <= 1) {
        return 20;
      } else if (this.field == "power" && this.cycle <= 1) {
        return 20;
      } else if (this.field == "current") {
        if (this.chartsData.xAxis.length < 100) {
          return 10;
        } else if (
          this.chartsData.xAxis.length >= 100 &&
          this.chartsData.xAxis.length < 1000
        ) {
          return 60;
        } else {
          return 150;
        }
      } else {
        return 5;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.charts-container {
  // display: flex;
  // justify-content: center;
  padding: 20px;
  .line-charts {
    height: 450px;
  }
}
</style>

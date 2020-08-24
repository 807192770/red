<template>
  <div :id="id" class="num-own"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "num-own",
  data() {
    return {
      id: "num-own",
      data: {},
      myChart:{}
    };
  },
  props: {
    dataList: {
      // type: Array,
      // default: []
    },
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
      let that = this;
      that.data = JSON.parse(JSON.stringify(val));
      Object.keys(that.data).forEach(item => {
        that.data[item].splice(10);
      });
      this.$nextTick(() => {
        this.echartsinit();
      });
    },
    count(val) {
      if (val > 0) {
        this.id = "num-own";
        this.id = this.id + "1";
        this.$nextTick(() => {
          this.echartsinit();
        });
      }
    }
  },
  computed: {},
  mounted() {
    let that = this;
    that.data = JSON.parse(JSON.stringify(that.dataList));
    that.id = that.id + "1";
    if (!that.count) {
      that.id = that.id + "0";
      Object.keys(that.data).forEach(item => {
        that.data[item].splice(10);
      });
    }
    that.$nextTick(() => {
      that.echartsinit();
    });
  },
  components: {},
  methods: {
    echartsinit() {
      let that = this;
      let dom = document.getElementById(this.id);
      dom.style.height = this.height + "rem";
      that.myChart = echarts.init(dom);
      let option = {
        tooltip: {
          trigger: "axis",
          formatter: "{b} : {c}(人)",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "12%",
          right: "5%",
          bottom: "10%",
          top: "22%",
          containLabel: false

/*          left: "10%",
          right: "4%",
          bottom: "10%",
          top: "20%",
          containLabel: false*/
        },
        legend: {
          x: "right",
          y: "top",
          selectedMode: "single",
          itemGap: -10,
          itemWidth: 10,
          inactiveColor: "#415d8a",
          textStyle: {
            color: "#05deff",
            borderColor: "#415d8a",
            borderWidth: "1",
            padding: [6, 10, 5]
           },
          data: [ {name:'省内',icon:'none'},
          {name:'省际',icon:'none'},
          {name:'国际',icon:'none'} ]
        },
        xAxis: {
          type: "category",
          data: that.data.pro.map(item => {return item.name}),
          axisLabel: {
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
          position: "top",
          type: "value",
          name: "人数(人)",
          nameTextStyle: { color: "#415d8a" },
          // boundaryGap: [0, 0.01],
          // interval:500,
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
            name: "省内",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: "#07C5F9" },
                      { offset: 1, color: "#0F6BE1" }
                    ])
                  }
            },
            data: that.data.pro.map(item => {return item.value}),
          },
          {
            name: "省际",
            type: "bar",
            barWidth: 10,
            data: that.data.interPro.map(item => {return item.value}),
            itemStyle: {
              normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: "#07C5F9" },
                      { offset: 1, color: "#0F6BE1" }
                    ])
                  }
            }
          },
          {
            name: "国际",
            type: "bar",
            barWidth: 10,
            data: that.data.inter.map(item => {return item.value}),
            itemStyle: {
              normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: "#07C5F9" },
                      { offset: 1, color: "#0F6BE1" }
                    ])
                  }
            }
          },
        ]
      };
      that.myChart.on("legendselectchanged", obj => {
        let options = that.myChart.getOption();
        let data = [];
        if (obj.name === "省内") {
          data = that.data.pro.map(item => {return item.name});
        } else if (obj.name === "省际") {
          data = that.data.interPro.map(item => {return item.name});
        } else if (obj.name === "国际") {
          data = that.data.inter.map(item => {return item.name});
        }
        options.xAxis[0].data = data;
        that.myChart.setOption(options, true);
      });
      that.myChart.setOption(option, true);
      setTimeout(function() {
        window.onresize = function() {
          that.myChart.resize();
        };
      }, 200);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

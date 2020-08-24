<template>
  <div :id="id" class="vs-lastyear"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "vs-lastyear",
  data() {
    return {
      id: "vs-lastyear",
      data:{
        xAxis:[],
        value:[]
      }
    };
  },
  // props: ["dataList", "count"],
  props: {
    dataList: {
      // type: Object,
      // default: {}
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
    // count(val) {
    //   if (val > 0) {
    //     this.id = "vs-lastyear";
    //     this.id = this.id + "1";
    //     this.$nextTick(() => {
    //       this.echartsinit();
    //     });
    //   }
    // },
    dataList(val) {
      this.resetData(val)
      this.echartsinit()
    }
  },
  computed: {},
  mounted() {
    // console.log('mounted')
    // console.log(this.dataList)
    this.id = this.id + "1";
    if (!this.count) {
      this.id = this.id + "0";
    }
    this.resetData(this.dataList)
    this.$nextTick(() => {
      this.echartsinit();
    });
  },
  components: {},
  methods: {
    resetData(val) {
      val.forEach(element => {
        this.data.xAxis.push(element.region_name);
        this.data.value.push((element.oftenResideTatio * 100).toFixed(2));
      });
    },
    echartsinit() {
      var that = this;
      var dom = document.getElementById(this.id);
      dom.style.height = this.height + "rem";
      var myChart = echarts.init(dom);
      var itemBottom = {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            1,
            0,
            0,
            [
              {
                offset: 0,
                color: "#438DEC" // 0% 处的颜色
              },
              {
                offset: 0.01,
                color: "#42ABF7"
              },
              {
                offset: 1,
                color: "#0F6BE1" // 100% 处的颜色
              }
            ],
            false
          )
        }
      };
      var itemTop = {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            1,
            0,
            0,
            [
              {
                offset: 0,
                color: "#0F6BE1" // 0% 处的颜色
              },
              {
                offset: 0.99,
                color: "#42ABF7"
              },
              {
                offset: 1,
                color: "#438DEC" // 100% 处的颜色
              }
            ],
            false
          )
        }
      };
      var itemBottom = {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            1,
            0,
            0,
            [
              {
                offset: 0,
                color: "#438DEC" // 0% 处的颜色
              },
              {
                offset: 0.01,
                color: "#42ABF7"
              },
              {
                offset: 1,
                color: "#0F6BE1" // 100% 处的颜色
              }
            ],
            false
          )
        }
      };
      var itemTop = {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            1,
            0,
            0,
            [
              {
                offset: 0,
                color: "#0F6BE1" // 0% 处的颜色
              },
              {
                offset: 0.99,
                color: "#42ABF7"
              },
              {
                offset: 1,
                color: "#438DEC" // 100% 处的颜色
              }
            ],
            false
          )
        }
      };
      var option = {
        grid: {
         left: "10%",
          right: "6%",
          bottom: "14%",
          top: "20%",
          containLabel: false
        },
        tooltip: {
          trigger: "axis",
          formatter: "{b}: {c} %",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        xAxis: [
          {
            type: "category",

            data: that.data.xAxis,
            axisPointer: {
              type: "shadow"
            },
            axisLabel: {
              show: true,
              // interval:0,
              // formatter: function (value) {
              //       			//x轴的文字改为竖版显示
              //       			var str = value.split("");
              //       			return str.join("\n");
              //       		},
              textStyle: {
                color: "#fff",
                //更改坐标轴文字颜色
                fontSize: 12 //更改坐标轴文字大小
              }
            },
            axisTick: {
              show: false //去掉刻度
            },
            axisLine: {
              lineStyle: {
                color: "#214470" //坐标轴线的颜色
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "同比增加（%）",
            min: -10,
            max: 10,
            splitLine: {
              show: true,
              lineStyle: {
                color: "#214470"
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
                //更改坐标轴文字颜色
                fontSize: 12 //更改坐标轴文字大小
              }
            },
            axisTick: {
              show: false //去掉刻度
            },
            axisLine: {
              lineStyle: {
                color: "#214470" //坐标轴线的颜色
              }
            }
          }
        ],
        series: [
          {
            name: "工作人口",
            type: "pictorialBar",
            barWidth: 24,
            data: that.data.value,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
             [
               {
                        offset: 0,
                        color: '#438DEC'
                    },
                    {
                        offset: 0.01,
                        color: '#42ABF7'
                    },
                    {
                        offset: 1,
                        color: '#0F6BE1'
              }
              ]
              ),
            barCategoryGap:0,
            // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
            symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
          }
        ]
      };
      myChart.setOption(option, true);
      setTimeout(function() {
        window.onresize = function() {
          myChart.resize();
        };
      }, 200);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

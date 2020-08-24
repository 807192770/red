<template>
  <div :id="id" class="regional-population"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "regional-population",
  data() {
    return {
      id: "regional-population",
      data:{
        xAxis:[],
        value:{
          homeNum:[],
          workNum:[],
          homeWorkRatio:[]
        }
      }
    };
  },
  props: {
    dataList: {
      // type: Object,
      // default: {}
    },
    count: {
      type: Number,
      default: 0
    },
    height:{
      type: Number,
      default: 0
    }
  },
  watch: {
    dataList(val) {
      let data = JSON.parse(JSON.stringify(val)).slice(0,10);
      this.resetData(data);
      this.echartsinit();
    },
    // count(val) {
    //   if (val > 0) {
    //     this.id = "regional-population";
    //     this.id = this.id + "1";
    //     this.$nextTick(() => {
    //       this.echartsinit();
    //     });
    //   }
    // }
  },
  computed: {},
  mounted() {
    let that = this;
    let data = [];
    data = JSON.parse(JSON.stringify(that.dataList));
    this.id = this.id + "1";
    if (!this.count) {
      this.id = this.id + "0";
      data = data.slice(0,10);
    }
    this.resetData(data);
    this.$nextTick(() => {
      this.echartsinit();
    });
  },
  components: {},
  methods: {
    resetData(val) {
      val.forEach(element => {
        this.data.xAxis.push(element.region_name);
        this.data.value.homeNum.push(element.homeNum);
        this.data.value.workNum.push(element.workNum);
        this.data.value.homeWorkRatio.push(element.homeWorkRatio)
      });
    },
    echartsinit() {
      var that = this;
      var dom = document.getElementById(this.id);
      dom.style.height = this.height + "rem";
      var myChart = echarts.init(dom);
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        grid:{
          left: "10%",
          right: "6%",
          bottom: "12%",
          top: "20%",
          containLabel: false
        },

        legend: [
          {
            itemWidth: 10,
            itemHeight: 10,
            top: 5,
            // right: 130,
            right: 65,
            textStyle: {
              color: "#fff"
            },
            data: [
              {
                name: "工作人口",
                icon: "stack"
              },
              {
                name: "居住人口",
                icon: "stack"
              },
              {
                name: "职住比",
                icon: "stack"
              }
            ]
          },
          /*{
            itemWidth: 16,
            itemHeight: 4,
            textStyle: {
              color: "#fff"
            },
            right: 65,
            top: 5,
            data: [
              {
                name: "职住比",
                icon: "stack"
              }
            ]
          }*/
        ],
        xAxis: [
          {
            type: "category",
            data: that.data.xAxis,
            axisPointer: {
              type: "shadow"
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
        yAxis: [
          {
            type: "value",
            name: "人口数量（万）",
            // min: 0,
            // max: 4000,
            // interval: 1000,
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
          },
          {
            type: "value",
            name: "职住比",
            splitLine: {
              show: false,
              // lineStyle: {
              //   color: "#214470"
              // }
            },
            min: 0.9,
            // max: 2,
            interval: 0.5,
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
            type: "bar",
            barWidth:8,
            data: that.data.value.workNum,
            color:'#2181EA'
          },
          {
            name: "居住人口",
            type: "bar",
            barWidth:8,
            data: that.data.value.homeNum,
            color:'#05DEFF'
          },
          {
            name: "职住比",
            type: "line",
            yAxisIndex: 1,
            data: that.data.value.homeWorkRatio,
            legendHoverLink:false,
            color:'#F45B5B',
            symbol: "circle",
            lineStyle: {
              color: "#F45B5B"
            },
            itemStyle: {
              normal: {
                border:2,
                borderColor: "#F45B5B",
              }
            },
            symbolSize:8, //设定实心点的大小
          }
        ]
      };
      myChart.setOption(option, true);
      setTimeout(function() {
        window.onresize = function() {
          myChart.resize();
        };
      }, 200);
	  [{name:'GYFZ',value:[{name:'gyfz2020001',num:1},{name:'gyfz2020001',num:1}]},{name:'GYFZ',value:[{name:'gyfz2020001',num:1},{name:'gyfz2020001',num:1}]}]
    }
  }
};
</script>

<style lang="scss" scoped>

</style>

<template>
  <div :id="id" class="population-change"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "population-change",
  data() {
    return {
      id: "population-change",
      data: []
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
    dataList(val) {
      this.data = val;
      this.$nextTick(() => {
        this.echartsinit();
      });
    },
    count(val) {
      if (val > 0) {
        this.id = "population-change";
        this.id = this.id + "1";
        this.$nextTick(() => {
          this.echartsinit();
        });
      }
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
      that.data.xAxis && that.data.xAxis.length && !that.data.xAxis[0].includes('-') && (that.data.xAxis = that.data.xAxis.map((item) => {
        return item.substr(0,4) + '-' + item.substr(4,2) + '-' + item.substr(6,2)
      }));
    // echarts配置项
      let option = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
                textStyle: {
                    color: "#fff"
                }

            },
        },
        grid:{
          bottom:'16.5%',
          top:'28%',
          left:'7%',
          right:'5%'
        },
        calculable: true,
        xAxis: [{
            type: "category",
            axisLine: {
                lineStyle: {
                    color: '#214470'
                }
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitArea: {
                show: false
            },
            axisLabel: {
                // interval: 0,
                textStyle:{
                  color:"#fff"
                }
            },
            data: that.data.xAxis
        }],
        yAxis: [{
            name :'通勤数量（人）',
            type: "value",
            // interval:200,
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#163460'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#214470'
                }
            },
            axisTick: {
                "show": false
            },
            axisLabel: {
                // interval: 0,
                textStyle:{
                  color:"#fff"
                }

            },
            splitArea: {
                show: false
            },

        }],
        dataZoom: [{
            type:'slider',
            show: true,
            height:0,
            width:450,
            right: '15%',
            borderColor: "#05DEFF",
            backgroundColor: "#05DEFF",
            borderRadius:200,
            xAxisIndex: [
                0
            ],
            top: '10%',
            start: 96,
            end: 100,
            filterMode: "empty",
            realtime: true,
            handleIcon:
            "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: '16',
            handleStyle: {
              color: "#2181EA",

              shadowBlur: 3,
              shadowColor: "rgba(0, 0, 0, 0.6)",
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // height:30,
              // width:30,
              borderRadius:200,
              borderColor: "#05DEFF"
            },
            fillerColor: '#05DEFF',
            textStyle:{
              color:"#fff"
            }
          },
          {
              type: "inside",
              show: true,

              start: 1,
              end: 35
        }],
        series:  {
          name: "总数",
          type: "line",
          stack: "总量",
          symbolSize:8,
          symbol:'circle',
           lineStyle:{
            color:'#2181EA'
          },
          itemStyle: {
            normal: {
                color: "#041932",
                borderColor: '#F45B5B',
                borderWidth: 2,
                label: {
                  "show": false,
                  "position": "top",
                  formatter: function(p) {
                      return p.value > 0 ? (p.value) : '';
                  }
                }
            }
          },
          data: that.data.yAxis
        },
    }

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
// .population-change{
//   background-color: #fff
// }

</style>

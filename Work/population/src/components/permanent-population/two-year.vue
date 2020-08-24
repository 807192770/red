<template>
  <div :id="id" class="two-year"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "two-year",
  data() {
    return {
      id: "two-year",
      dataArr:[],
      data:{
        xAxis: [],
        value:{
          data1: {
            name:'',
            data:[]
          },
          data2: {
            name:'',
            data:[]
          },
          data3: []
        }
      },
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
    //     this.id = "two-year";
    //     this.id = this.id + "1";
    //     this.$nextTick(() => {
    //       this.echartsinit();
    //     });
    //   }
    // },
    dataList(val) {
      this.resetData(val || []);
      this.echartsinit();
      // console.log(val)
    }
  },
  computed: {},
  mounted() {
    this.id = this.id + "1";
    if (!this.count) {
      this.id = this.id + "0";
    }
    this.resetData(this.dataList ||[])
    this.$nextTick(() => {
      this.echartsinit();
    });
  },
  components: {},
  methods: {
    resetData(val) {
      var that = this;
      val.forEach((element,i) => {
        that.data.value.data3.push(element.name+'年');
        if(i === 0) {
          that.data.value.data1.name = element.name+'年';
          element.data.forEach(ele => {
            that.data.xAxis.push(ele.month_id+'月');
            that.data.value.data1.data.push(ele.total_num);
          })
        }else {
          that.data.value.data2.name = element.name+'年';
          element.data.forEach(ele => {
            that.data.value.data2.data.push(ele.total_num);
          })
        }
      });
    },
    echartsinit() {
      var that = this;
      var dom = document.getElementById(this.id);
      dom.style.height = this.height + "rem";
      var myChart = echarts.init(dom);
      //取最大值
      let maxData = [];
      that.dataList.length && that.dataList.forEach((item,index) => {
        maxData[index] = (function (data) {
          let maxi=0;
          for (let i=0;i<data.length;i++) {
            data[i].total_num = Number(data[i].total_num);
            if (data[maxi].total_num <= data[i].total_num) {
              maxi=i;
            }
          }
          return data[maxi] ? data[maxi].total_num : 0;
        })(item.data)
      });

      maxData = Math.floor(Math.max.apply(null,maxData) * 0.7);
      var option = {
        tooltip: {
          trigger: "axis"
        },
        grid:{
         left: "10%",
          right: "6%",
          bottom: "14%",
          top: "20%",
          containLabel: false
        },
        xAxis: {
          type: "category",
          boundaryGap: false,//去掉折线和竖坐标轴之间的空隙
          data: that.data.xAxis,
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
        yAxis: {
          type: "value",
          name:'人口数量（万）',
          min: maxData,
          splitNumber: 4,
          splitLine: {
            show: true,
            lineStyle: {
              color: "#214470"
            }
          },
          axisTick: {
            show: false //去掉刻度
          },
          axisLabel: {
            show: true,

            textStyle: {
              color: "#fff",
              //更改坐标轴文字颜色
              fontSize: 12 //更改坐标轴文字大小
            }
          },
          axisLine: {
            lineStyle: {
              color: "#214470"
            }
          }
        },
        legend: {
           data: that.data.value.data3,
           icon:'stack', //改变或者增加这个为stack，图例会变成矩形。
           itemWidth:16,
           itemHeight:4,
           textStyle: {
            color: "#fff"
           },
           right:20,
           selectedMode:true,
        },
        series: [
          {
            name: that.data.value.data1.name,
            type: "line",
            symbol: "circle",
            legendHoverLink:false,
            lineStyle: {
              color: "#2181EA"
            },
            itemStyle: {
              normal: {
                color: "#2181EA"
                // borderColor: "#2181EA",
              }
            },
            symbolSize:8, //设定实心点的大小
            data: that.data.value.data1.data,
          },
          {
            name: that.data.value.data2.name,
            type: "line",
            symbol: "circle",
            legendHoverLink:false,
            lineStyle: {
              color: "#F45B5B"
            },
            itemStyle: {
              normal: {
                color: "#F45B5B"
                // borderColor: "#2181EA",
              }
            },
            symbolSize: 8, //设定实心点的大小
            data: that.data.value.data2.data,
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

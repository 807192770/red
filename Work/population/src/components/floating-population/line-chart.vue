<template>
  <div :id="id" class="people-structure"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "people-structure",
  data() {
    return {
      id: "people-structure",
      dataArr:[],
      data:{
        xAxis: [],
        value:{
          data1: {
            name:'',
            data:[1854803,1852097,1888086 ,2089634 ,2106701 ,2031994 ,2234857 ]
          },
          data2: {
            name:'',
            data:[981090 ,984343 ,988583  ,992871  ,991580  ,990579  ,995774  ],
          },
          data3: [873713 ,867754 ,899503 ,1096763 ,1115121 ,1041416 ,1239083 ],
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
    //     this.id = "people-structure";
    //     this.id = this.id + "1";
    //     this.$nextTick(() => {
    //       this.echartsinit();
    //     });
    //   }
    // },
    dataList(val) {
      // this.resetData(val || []);
      console.log(val)
      this.echartsinit();
      // console.log(val)
    }
  },
  computed: {},
  mounted() {
    console.log(this.dataList)
    this.id = this.id + "1";
    if (!this.count) {
      this.id = this.id + "0";
    }
    // this.resetData(this.dataList ||[])
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
      // dom.style.height = this.height + "rem";
      var myChart = echarts.init(dom);
      //取最大值
      let maxData = [];
      // that.dataList.length && that.dataList.forEach((item,index) => {
      //   maxData[index] = (function (data) {
      //     let maxi=0;
      //     for (let i=0;i<data.length;i++) {
      //       data[i].total_num = Number(data[i].total_num);
      //       if (data[maxi].total_num <= data[i].total_num) {
      //         maxi=i;
      //       }
      //     }
      //     return data[maxi] ? data[maxi].total_num : 0;
      //   })(item.data)
      // });

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
          data: ['2019-09-16','2019-09-17','2019-09-18', '2019-09-19', '2019-09-20', '2019-09-21', '2019-09-22'],
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
          // min: maxData,
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
           data: ['总人口数', '常驻人口', '流动人口'],
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
            name: '总人口数',
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
            data: that.dataList.data1,
          },
          {
            name: '常驻人口',
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
            data: that.dataList.data2,
          },
          {
            name: '流动人口',
            type: "line",
            symbol: "circle",
            legendHoverLink:false,
            lineStyle: {
              color: "yellow"
            },
            itemStyle: {
              normal: {
                color: "yellow"
                // borderColor: "#2181EA",
              }
            },
            symbolSize: 8, //设定实心点的大小
            data: that.dataList.data3,
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
.people-structure{
  height: 160px;
}
</style>

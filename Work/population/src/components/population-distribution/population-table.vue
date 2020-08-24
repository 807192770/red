<template>
  <div :id="id" class="carTable"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "carTable",
  data() {
    return {
      id: "carTable",
      xAxisArr: [],
      legendName: [],
      xData: []
    };
  },
  // props: ['dataList'],
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
    },
    flag: {}
  },
  watch: {
    dataList(val) {
      this.resetData(val);
      if (!this.count) {
        this.id = this.id + "0";
      } else {
        this.id = this.id + "1";
      }
      this.$nextTick(() => {
        this.echartsinit();
      });
    }
    // count(val) {
    //   if (val > 0) {
    //     this.id = "carTable";
    //     this.id = this.id + "1";
    //     this.$nextTick(() => {
    //       this.echartsinit();
    //     });
    //   }
    // }
  },
  computed: {},
  mounted() {
    this.resetData(this.dataList);
    if (!this.count) {
      this.id = this.id + "0";
    } else {
      this.id = this.id + "1";
    }
    this.$nextTick(() => {
      this.echartsinit();
    });
  },
  components: {},
  methods: {
    resetData(val) {
      var xAxisArr = [];
      var legendName = [];
      var xData = [];
      val.forEach(element => {
        var xAxis = [];
        var legendObj = {};
        var xDataObj = {
          type: "line",
          smooth: true,
          symbol: "none",
          lineStyle: {
            color: "#05deff"
          }
        };
        xDataObj.name = element.name;
        legendObj.name = element.name;
        legendObj.icon = "none";
        var arr = [];
        element.data.forEach(el => {
          xAxis.push(el.time);
          arr.push(el.total_number);
        });
        // if (this.flag == 1) {
        //   xAxis = xAxis.slice(0, 10);
        //   arr = arr.slice(0, 10);
        // }
        xDataObj.data = arr;
        legendName.push(legendObj);
        xData.push(xDataObj);
        xAxisArr.push(xAxis);
      });
      this.xData = xData;
      this.legendName = legendName;
      this.xAxisArr = xAxisArr;
      // console.log(this.legendName)
      // console.log(xAxisArr)
      // console.log(xData)
    },
    echartsinit() {
      var that = this;
      var dom = document.getElementById(this.id);
      dom.style.height = this.height + "px";
      var sliderIsShow = true;
      var bottom = "15%";
      if (that.flag == 1) {
        sliderIsShow = false;
        bottom = "0%";
      }
      var myChart = echarts.init(dom);
      let option = {
        tooltip: {
        trigger: 'axis',
        },
        dataZoom: [
          {
            show: sliderIsShow,
            type: "slider",
            xAxisIndex: 0,
            filterMode: "empty",
            handleSize: "400%",
            realtime: true,
            height:4,
            bottom:30,
            left: 50,
            right:50,
            borderColor:"#031428", 
            backgroundColor:'#29466A',
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleStyle: {
              color: "#00B5FE",
              shadowBlur: 3,
              shadowColor: "rgba(0, 0, 0, 0.6)",
              shadowOffsetX: 2,
              shadowOffsetY: 2,
              height:20,
              borderColor:"#031428", 
            },
            fillerColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                   //给颜色设置渐变色 前面4个参数，给第一个设置1，第四个设置0 ，就是水平渐变
                   //给第一个设置0，第四个设置1，就是垂直渐变
                   offset: 0,
                   color: '#00B5FE'
               }, {
                   offset: 1,
                   color: '#00B5FE'}]),
            textStyle:{
              color:'#fff'
            }
          }
        ],
        xAxis: {
          type: "category",
          data: that.xAxisArr[0],
          boundaryGap: false,
          axisTick: {
            show: true
          },
          axisLabel: {
            showMaxLabel:true,
            textStyle: {
              fontSize: 12,
              color: "#ffffff"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#214470"
            }
          }
        },
        yAxis: {
          name: "人数(人)",
          nameTextStyle: { color: "#415d8a" },
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: "#ffffff"
            }
          },
          type: "value",
          axisTick: {
            show: false
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
        grid: {
          left: "1%",
          right: "5%",
          bottom: bottom,
          top: "20%",
          containLabel: true
        },
        legend: {
          textStyle: {
            color: "#90979c"
          },
          x: "right",
          y: "top",
          selectedMode: "single",
          itemGap: -5,
          itemWidth: 10,
          inactiveColor: "#415d8a",
          textStyle: {
            color: "#05deff",
            borderColor: "#415d8a",
            borderWidth: "1",
            padding: [6, 10]
          },
          data: that.legendName
        },
        series: that.xData
      };
      myChart.on("legendselectchanged", obj => {
        var options = myChart.getOption();
        var data = [];
        if (obj.name == "用户总量") {
          data = that.xAxisArr[0];
        } else if (obj.name == "流入量") {
          data = that.xAxisArr[1];
        } else if (obj.name == "流出量") {
          data = that.xAxisArr[2];
        }
        options.xAxis[0].data = data;
        myChart.setOption(options, true);
      });
      myChart.setOption(option, true);
    }
  }
};
</script>

<style lang="scss" scoped>
#carTable {
  width: 100%;
  background-size: contain;
  font-size: 12px;
}
</style>
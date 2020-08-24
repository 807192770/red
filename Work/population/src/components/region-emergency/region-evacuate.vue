<template>
  <!-- 预警前后区域人口数量变化 -->
  <div id="region-evacuate">
    <div :id="id" class="region-evacuate-bar"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "region-evacuate",
  data() {
    return {
      id: "region-evacuate-bar"
    };
  },
  props: {
    dataList: {},
    count: {
    },
    height: {
    },
    flag: {
      type: Boolean
    },
    messageTime: {}
  },
  watch: {
    dataList(val) {
      this.data = val;
      this.$nextTick(() => {
        this.echartsinit();
      });
    },
    flag: function(val) {
      if (val) {
        this.echartsinit();
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
      let xAxisdata = this.data.xAxis;
      let yAxisdata = this.data.yData;
      let arr = [];
      let series = [
        {
          name: "人数",
          type: "line",
          barWidth: "30%",
          data: yAxisdata,
          smooth: true,
          default: "auto",
          symbolSize: 6,
          // // 设置拐点为实心圆
          symbol: "circle",
          itemStyle: {
            normal: {
              color: "#000",
              borderColor: "#1ABC5B", // 拐点边框颜色
              borderWidth: 2 // 拐点边框大小
            }
          },
          lineStyle: {
            normal: {
              color: "#2181EA" // 线条颜色
            }
          }
        }
      ];
      if (!xAxisdata == "") {
        let xNewdata = xAxisdata[xAxisdata.length - 1];
        let yNewdata = yAxisdata[yAxisdata.length - 1]+200;
        arr.push([{ coord: [xNewdata, 0] }, { coord: [xNewdata, yNewdata] }]);
      }
      if (this.flag) {
        series.forEach(element => {
          series.push({
            name: "平行于y轴的趋势线",
            type: "line",
            markLine: {
              name: "aa",
              symbol:
              "none",
              // 'path d="M 580,1141 L 1163,571 580,0 -4,571 580,1141 Z"'+
              // 'path d="M 8,1128 L 1137,1128 1137,0 8,0 8,1128 Z"'+
              // 'path d="M 174,0 L 602,739 174,1481 1456,739 174,0 Z M 1358,739 L 309,1346 659,739 1358,739 Z"'+
              // 'path d="M 2015,739 L 1276,0 717,0 1260,543 174,543 174,936 1260,936 717,1481 1274,1481 2015,739 Z"'+
              // 'path d="M 0,-2 C -7,14 -16,27 -25,37 L 356,567 C 262,823 215,952 215,954 215,979 228,992 255,992 264,992 276,990 289,987 310,991 331,999 354,1012 L 381,999 492,748 772,1049 836,1024 860,1049 C 881,1039 901,1025 922,1006 886,937 835,863 770,784 769,783 710,716 594,584 L 774,223 C 774,196 753,168 711,139 L 727,119 C 717,90 699,76 672,76 641,76 570,178 457,381 L 164,-76 C 142,-110 111,-127 72,-127 30,-127 9,-110 8,-76 1,-67 -2,-52 -2,-32 -2,-23 -1,-13 0,-2 Z"'+
              // 'path d="M 285,-33 C 182,-33 111,30 74,156 52,228 41,333 41,471 41,549 55,616 82,672 116,743 169,778 240,778 293,778 328,747 346,684 L 369,508 C 377,444 397,411 428,410 L 1163,1116 C 1174,1127 1196,1133 1229,1133 1271,1133 1292,1118 1292,1087 L 1292,965 C 1292,929 1282,901 1262,881 L 442,47 C 390,-6 338,-33 285,-33 Z"'+
              // 'path d="M 813,0 C 632,0 489,54 383,161 276,268 223,411 223,592 223,773 276,916 383,1023 489,1130 632,1184 813,1184 992,1184 1136,1130 1245,1023 1353,916 1407,772 1407,592 1407,412 1353,268 1245,161 1136,54 992,0 813,0 Z"'+
              // 'path d="M 346,457 C 273,457 209,483 155,535 101,586 74,649 74,723 74,796 101,859 155,911 209,963 273,989 346,989 419,989 480,963 531,910 582,859 608,796 608,723 608,648 583,586 532,535 482,483 420,457 346,457 Z"'+
              // 'path d="M -4,459 L 1135,459 1135,606 -4,606 -4,459 Z"'+
              // 'path d="M 173,740 C 173,903 231,1043 346,1159 462,1274 601,1332 765,1332 928,1332 1067,1274 1183,1159 1299,1043 1357,903 1357,740 1357,577 1299,437 1183,322 1067,206 928,148 765,148 601,148 462,206 346,322 231,437 173,577 173,740 Z"',
                // "path fill='rgb(26,188,91)' fill-opacity='0.2' stroke='rgb(205,255,255)' stroke-opacity='0.2' d='M 641,3835 C 856,4208 1124,4476 1497,4691 1870,4906 2236,5004 2666,5004 3096,5004 3462,4906 3835,4691 4208,4476 4476,4208 4691,3835 4906,3462 5004,3096 5004,2666 5004,2236 4906,1870 4691,1497 4476,1124 4208,856 3835,641 3462,426 3096,328 2666,328 2236,328 1870,426 1497,641 1124,856 856,1124 641,1497 426,1870 328,2236 328,2666 328,3096 426,3462 641,3835 Z'",
                // 'path fill="rgb(26,188,91)" stroke="none" d="M 912,2666 C 912,2989 986,3263 1147,3543 1309,3822 1510,4023 1789,4185 2069,4346 2343,4420 2666,4420 2989,4420 3263,4346 3543,4185 3822,4023 4023,3822 4185,3543 4346,3263 4420,2989 4420,2666 4420,2343 4346,2069 4185,1789 4023,1510 3822,1309 3543,1147 3263,986 2989,912 2666,912 2343,912 2069,986 1789,1147 1510,1309 1309,1510 1147,1789 986,2069 912,2343 912,2666 Z"',
                // 'path fill="rgb(255,255,255)" stroke="none" d="M 3104,1497 L 3104,1789 2812,1789 2812,1789 C 2731,1789 2663,1808 2593,1848 2523,1888 2473,1938 2432,2008 2392,2078 2374,2147 2374,2228 L 2374,2374 2374,2374 C 2374,2401 2368,2423 2354,2447 2341,2470 2324,2487 2301,2500 2277,2514 2254,2520 2228,2520 L 1497,2520 1497,2520 C 1470,2520 1447,2526 1424,2539 1400,2553 1384,2570 1370,2593 1357,2616 1351,2639 1351,2666 1351,2693 1357,2716 1370,2739 1384,2762 1400,2779 1424,2793 1447,2806 1470,2812 1497,2812 L 2228,2812 2228,2812 C 2308,2812 2377,2794 2447,2753 2517,2713 2567,2663 2607,2593 2648,2523 2666,2454 2666,2374 L 2666,2228 2666,2228 C 2666,2201 2672,2178 2686,2154 2699,2131 2716,2114 2739,2101 2762,2088 2785,2081 2812,2081 L 3104,2081 3104,2374 3689,1935 3104,1497 3104,1497 Z M 2374,3104 L 2374,3104 C 2374,3185 2392,3254 2432,3324 2473,3394 2523,3444 2593,3484 2663,3524 2731,3543 2812,3543 L 3104,3543 3104,3835 3689,3397 3104,2958 3104,3251 2812,3251 2812,3251 C 2785,3251 2762,3244 2739,3231 2716,3218 2699,3201 2686,3178 2672,3154 2666,3131 2666,3104 L 2666,2958 2666,2958 2666,2958 C 2666,2931 2660,2909 2646,2885 2633,2862 2616,2845 2593,2832 2570,2818 2547,2812 2520,2812 2493,2812 2470,2818 2447,2832 2423,2845 2407,2862 2393,2885 2380,2909 2374,2931 2374,2958 L 2374,3104 2374,3104 Z"',
                 //去掉箭头
              data: arr
            }
          });
        });
      }
      let option = {
        color: "rgba(255,255,255,0.5)",
        // title: {
        //   // text:title,
        //   left:"10",
        //   top:"20"
        // },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            return (
              params[0].name +
              "<br />" +
              '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#1369de"></span>' +
              params[0].seriesName +
              "&nbsp" +
              ":" +
              "&nbsp" +
              params[0].data
            );
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: {
              color: ["rgba(245,245,245,0.2)"]
            }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "6%",
          top: "35",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: xAxisdata,
          axisLabel: {
            interval: 9,
            // inside:false,
            // showMaxLabel: true,
            textStyle: {
              fontSize: 12,
              color: "#ffffff"
            }
          },
          axisTick: {
            show: true
          },
          axisLine: {
            lineStyle: {
              color: "#214470"
            }
          }
        },
        yAxis: {
          name: "人数",
          type: "value",
          data: yAxisdata,
          min: 0,
          scale: true,
          nameTextStyle: { color: "#415d8a", padding: [0, 40, 0, 0] },
          axisLabel: {
            interval: 2,
            textStyle: {
              fontSize: 12,
              color: "#ffffff"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#214470"
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#163460"
            }
          }
        },
        series: series
      };
      myChart.setOption(option, true);
    }
  }
};
</script>

<style lang="scss" scoped>
#region-evacuate {
  // width: 6rem;
  .title-head {
    color: #fff;
  }
}
</style>
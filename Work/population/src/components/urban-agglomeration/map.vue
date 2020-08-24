<template>
  <div id="hunan-map">
    <div class="crumb">
      <!-- <span class="province">{{provinceName}}</span> -->
      <!-- <span>{{cityName}}</span> -->
    </div>
    <div class="mapBox">
      <div class="zBorder"></div>
      <div id="map-urban">
      </div>
    </div>

  </div>
</template>

<script>
import $ from "jquery";
import echarts from "echarts";
export default {
  data() {
    return {
      filePrefix: "",
      provinceName: "河北省",
      cityName: "",
      name: "hebei",
      planePath: 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
      options: [],
      colorArr: ['#FF0101', '#FFAD4C', '#96FF65', '#4EFEDD', '#0AB6FF'],
      timelineData: [],
      valueArr: [],
      maxValue: '',
      pieces: [],
      data: {},
      maxValueFix: 0
    }
  },
  props: ["mapData"],
  watch: {
    mapData(val) {
      this.data = val
      this.echartsinit();
    },
  },
  mounted() {
    this.data = JSON.parse(sessionStorage.getItem("mapLineData"))
    this.filePrefix = this.$filePrefix
    if (this.data) {
      this.$nextTick(() => {
        this.echartsinit()
      });
    }
  },
  components: {},
  methods: {
    optionMap() {
      let that = this
      //线路
      this.valueArr = [];
      this.timelineData = [];
      this.data.lines.forEach((item) => {
        this.timelineData.push(item.time)
        item.data.forEach((item2) => {
          var arr = []
          item2.coords.forEach((ele3, i) => {
            arr.push(ele3[0].split(","))
          })
          item2.coords = arr
          delete item2.fromLat
          delete item2.fromLong
          delete item2.toLat
          delete item2.toLong
          this.valueArr.push(item2.value)
          item2.lineStyle = {
            normal: {
              width: item2.value / 3000
            }
          }
        })
      })
      // 处理线路对应的标识
      this.maxValue = parseInt(this.valueArr.sort(function (a, b) {
        return b - a;
      })[0]).toString();
      var length = this.maxValue.length - 1;
      this.maxValueFix = this.maxValue < 10 ? 10 : Math.ceil(parseInt(this.maxValue) / Math.pow(10, length)) * Math
        .pow(10, length)

      // 城市
      this.data.citys.forEach((item3) => {
        delete item3.time
        item3.data.forEach((item4) => {
          item4.name = item4.city
          item4.symbolSize = item4.relationCnt / 3000
          item4.value = [item4.longItude, item4.latItude]
        })
      })

      for (var i = 0; i < this.data.citys.length; i++) {
        this.options[i] = {
          series: [this.data.lines[i], this.data.citys[i]]
        }
      }
      return {
        baseOption: {
          animation: false,
          // animationDuration: 1000,
          // animationEasing: 'cubicInOut',
          // animationDurationUpdate: 1000,
          // animationEasingUpdate: 'cubicInOut',
          tooltip: {
            trigger: 'item',
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            transitionDuration: 0,
            extraCssText: 'z-index:20',
            formatter: function (params, ticket, callback) {
              var res = "";
              var data = params.data;
              if (params.componentSubType == 'lines') { //线路
                res = "<span style='color:#fff;'>" + data.fromName + ' - ' + data.toName + "</span><br/>人数：" +
                  params.value + '人';
              } else if (params.componentSubType == 'effectScatter') { //城市

              } else { //时间轴

              }
              return res;
            }
          },
          visualMap: {
            type: "piecewise",
            align: 'left',
            left: '50',
            bottom: '150',
            splitNumber: '5',
            itemGap: 0,
            itemWidth: '2',
            itemHeight: '50',
            showLabel: true,
            inRange: {
              // color: ['#4EFEDD', '#FF0101'],
              color: ['#0AB6FF', '#4EFEDD', '#96FF65', '#FFAD4C', '#FF0101']
            },
            max: this.maxValueFix,
            text: ['人口流量 \n\n'],
            textStyle: {
              color: '#fff',
            },
            pieces: [{
              min: this.maxValueFix / 5 * 2,
              max: this.maxValueFix / 5 * 5,
              label: this.maxValueFix / 5 * 2 + '-' + this.maxValueFix / 5 * 5
            }, {
              min: this.maxValueFix / 5,
              max: this.maxValueFix / 5 * 2,
              label: this.maxValueFix / 5 + '-' + this.maxValueFix / 5 * 2
            }, {
              min: 0,
              max: this.maxValueFix / 5,
              label: 0 + '-' + this.maxValueFix / 5
            }],
            textGap: 10,
            backgroundColor: '#071E46',
            padding: [30, 10, 25, 15],
            formatter: function (value, value2) {
              return value2;
            }
          },
          timeline: { //时间轴
            axisType: 'category',
            autoPlay:true,
            playInterval:500,
            bottom: '2%',
            symbol: 'circle',
            borderWidth: 100,
            borderColor: '#fff',
            borderType: 'solid',
            backgroundColor: 'rgba(255,255,255,1)',
            x: '4%',
            width: '90%',
            currentIndex:8,
            controlStyle: {
              showPlayBtn: true,
              showNextBtn: false,
              showPrevBtn: false,
              itemGap: 20,
              normal: {
                borderColor: "#2181EA",
                color: '#2181EA'
              },
              emphasis: {
                borderColor: '#fff' //外颜色
              },
            },
            lineStyle: {
              color: '#2181EA'
            },
            label: {
              show: true,
              interval: 2,
              color: '#fff',
              padding: [10, 0, -10, 0],
              showMaxLabel: 'true',
              emphasis: {
                color: '#fff'
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#2181EA',
              },
              emphasis: {
                color: '#2181EA',
              }
            },
            checkpointStyle: { //当前项
              symbolSize: 15,
              color: '#2181EA',
              borderWidth: 3,
              borderColor: '#fff'
            },
            data: this.timelineData
          },
          geo: { //地理坐标系组件
            map: 'hebei',
            show: true,
            top: '30',
            emphasis: {
              label: {
                show: false,//地图的名称
                color: "#fff",
              }
            },
            zoom: 1, //当前视角的缩放比例
            roam: true, //是否开启平游或缩放
            scaleLimit: { //滚轮缩放的极限控制
              min: 1,
              max: 1.3
            },
            itemStyle: {
              normal: {
                areaColor: '#020f23',
                color: 'rgba(7, 30, 70, .5)', //地图背景色
                borderColor: '#2181EA', //省市边界线00fcff 516a89
                borderWidth: 1
              },
              emphasis: {
                color: 'rgba(37, 43, 61, .5)' //悬浮背景
              }
            },
          },
          series: [{ //基础配置
              type: 'lines',
              coordinateSystem: 'geo',
              zlevel: 2,
              large: true,
              effect: {
                show: false,
              },
              lineStyle: {
                normal: {
                  opacity: 1,
                  curveness: 0.2
                }
              },
            },
            {
              name: 'city',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              effect: {
                show: true,
              },
              zlevel: 2,
              rippleEffect: {
                brushType: 'stroke'
              },
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  formatter: '{b}',
                  color: '#fff'
                }
              },
              showEffectOn: 'render',
              itemStyle: {
                normal: {
                  color: '#05deff'
                }
              },
            },
            {
              type: "map",
              // mapType: this.name,
              // map: 'hunan',
              // label: {
              //   emphasis: {
              //     textStyle: {
              //       color: "#404a59"
              //     }
              //   }
              // },
              // itemStyle: {
              //   normal: {
              //     borderColor: "#1041a3",
              //     areaColor: "#07152d"
              //   },
              //   emphasis: {
              //     areaColor: '#2a333d'
              //   }
              // },
            }
          ]
        },
        options: this.options
      }
    },
    echartsinit() {
      let that = this;
      var chart = echarts.init(document.getElementById('map-urban'));
      $.get(this.filePrefix + "hebei.json", function (hebeiJson) {
        echarts.registerMap('hebei', hebeiJson);
        chart.setOption(that.optionMap());
      });
    },

  }
};

</script>

<style lang="scss" scoped>
  #hunan-map {
    .crumb {
      margin-top: 10px;

      .province {
        cursor: pointer;

        &:hover {
          color: #bedcfc;
        }
      }
    }

    .mapBox {
      position: relative;
      height: 876px;

      #map-urban {
        height: 100%;
        z-index: 999;
      }

      .zBorder {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 88px;
        // border: 1px solid #05DEFF;
        z-index: 0;
        // border-radius: 4px;
        background: rgba(33, 129, 234, 0.25);
      }
    }
  }

</style>

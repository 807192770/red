<template>
  <div id="hunan-map">
    <div class="crumb">
      <!-- <span class="province">{{provinceName}}</span> -->
      <!-- <span>{{cityName}}</span> -->
    </div>
    <div class="mapBox">
      <div id="floating-map">
      </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery'
import echarts from 'echarts'

export default {
  data () {
    return {
      filePrefix: '',
      provinceName: '湖南省',
      cityName: '',
      name: 'hunan',
      chart: null,
      options: [],
      colorArr: ['#FF0101', '#FFAD4C', '#96FF65', '#4EFEDD', '#0AB6FF', 'blue'],
      place: '',
      coordinate: '',
      lines: '',
      num: '',
      item: [],
      maxValueFix: 0,
      mapJson: '',
    }
  },
  props: ['mapData', 'mapName'],
  watch: {
    mapData (val) {
      this.place = val.place
      this.coordinate = val.coordinate
      this.lines = val.coordinate
      this.num = val.num
      this.echartsinit()
      console.log()
    },
    mapName (val) {
      console.log(val)
      this.mapJson = val
    }
  },
  mounted () {
    setTimeout(() => {
      console.log(this.mapData)
    })

    this.filePrefix = this.$filePrefix
    // if (Object.keys(this.mapData).length) {
    this.echartsinit()
    // }
  },
  components: {},
  methods: {
    optionMap () {
      let that = this
      this.item = []
      // 城市
      this.coordinate.forEach(item => {
        item.name = item.province
        item.value = [item.longitude, item.latitude]
        item.symbolSize = '13'
        item.itemStyle = {
          normal: {
            color: '#fff'
          }
        }
      })
      // lines
      for (var i = 0; i < this.lines.length; i++) {
        this.item.push({
          coords: [
            this.lines[i].value,
            // [this.place[0].longitude, this.place[0].latitude]
            [115.919423, 39.05581]
          ],
          value: this.num[i].population
        })
      }
      var length = this.item[0].value.length - 1
      this.maxValueFix = this.item[0].value < 10 ? 10 : Math.ceil(parseInt(this.item[0].value) / Math.pow(10,
        length)) * Math
        .pow(10, length)
      for (var i = 0; i < this.lines.length; i++) {
        if (this.num[i].population > 0 && this.num[i].population < (this.maxValueFix / 80)) {
          this.coordinate[i].itemStyle.normal.color = '#96FF65'
        } else if (this.num[i].population > (this.maxValueFix / 80) && this.num[i].population < (this.maxValueFix /
          80 *
          5)) {
          this.coordinate[i].itemStyle.normal.color = '#FFE60A'
        } else if (this.num[i].population > (this.maxValueFix / 80 * 5) && this.num[i].population < (this
            .maxValueFix /
          80 *
          15)) {
          this.coordinate[i].itemStyle.normal.color = '#FFE60A'
        } else {
          this.coordinate[i].itemStyle.normal.color = '#FF0101'
        }
      }
      return {
        baseOption: {
          visualMap: {
            type: 'piecewise',
            calculable: false,
            pieces: [{
              min: this.maxValueFix / 80 * 15,
              max: this.maxValueFix,
              label: this.maxValueFix / 80 * 15 + '-' + this.maxValueFix
            }, {
              min: this.maxValueFix / 80 * 5,
              max: this.maxValueFix / 80 * 15,
              label: this.maxValueFix / 80 * 5 + '-' + this.maxValueFix / 80 * 15
            }, {
              min: this.maxValueFix / 80,
              max: this.maxValueFix / 80 * 5,
              label: this.maxValueFix / 80 + '-' + this.maxValueFix / 80 * 5
            }, {
              min: 0,
              max: this.maxValueFix / 80,
              label: 0 + '-' + this.maxValueFix / 80
            }],
            max: this.maxValueFix,
            left: '10',
            bottom: '20',
            itemWidth: '2',
            itemHeight: '30',
            itemGap: 0,
            showLabel: true,
            inRange: {
              // color: ['#007946', '#4EFEDD', '#96FF65', '#FFE60A', '#FF0101']
              color: ['#96FF65', '#FFE60A', '#FFE60A', '#FF0101']
            },
            textStyle: {
              color: '#fff',
            },
            seriesIndex: 0,
            align: 'left',
            hoverLink: true,
            width: 73,
            height: 286,
            // backgroundColor: '#071E46',
            borderColor: '#16459E',
            borderRadius: [8],
            text: ['人口流量 \n'],
            padding: [30, 10, 25, 15]
          },
          geo: { //地理坐标系组件
            map: this.mapJson,
            zoom: 1.2,
            show: true,
            top: '10%',
            emphasis: {
              label: {
                show: false,
                color: '#fff'
              }
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
            }
          },
          series: [{ //基础配置
            name: '线路',
            type: 'lines',
            zlevel: 20,
            effect: {
              show: true,
              period: 1, //箭头指向速度，值越小速度越快
              trailLength: 0.2, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: 'arrow', //箭头图标
              symbolSize: 6, //图标大小
              color: '#17D7DF',
            },
            lineStyle: {
              normal: {
                opacity: 1, //尾迹线条透明度
                curveness: .3, //尾迹线条曲直度
              }
            },
            data: this.item
          }, {
            name: 'city',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            effect: {
              show: true,
            },
            zlevel: 2,
            rippleEffect: {
              brushType: 'stroke',
              scale: 3,
              period: 4, //动画时间，值越小速度越快
            },
            itemStyle: {
              normal: {
                color: '#05deff'
              }
            },
            label: {
              normal: {
                show: true,
                position: 'left',
                //offset:[5, 0],
                formatter: '{b}',
                textStyle: {
                  color: '#17D7DF',
                  fontWeight: 'bold'
                },
              },

              emphasis: {
                show: true,
                position: 'left',
                formatter: '{b}',
                color: '#fff'
              }
            },
            showEffectOn: 'render',
            data: this.coordinate
          }, //被攻击点
            {
              type: 'scatter',
              coordinateSystem: 'geo',
              zlevel: 100,
              rippleEffect: {
                period: 4,
                brushType: 'stroke',
                scale: 4
              },
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  //offset:[5, 0],
                  color: '#02AD12',
                  formatter: '{b}',
                  fontSize: '20',
                  textStyle: {
                    color: '#fff',
                    fontWeight: 'bold'
                  }
                },
                emphasis: {
                  show: true,
                  color: '#fff'
                }
              },
              symbol: 'pin',
              symbolSize: 50,
              color: 'red',
              data: [{
                name: '雄安',
                // value: [this.place[0].longitude, this.place[0].latitude],
                value: [115.919423, 39.05581],
              }],
            }
          ]
        },
      }
    },
    echartsinit () {
      let that = this
      $.get(this.filePrefix + that.mapJson + '.json', function (hunanJson) {
        echarts.registerMap(that.mapJson, hunanJson)
        var chart = echarts.init(document.getElementById('floating-map'))
        chart.setOption(that.optionMap())
      })
    },
  }
}

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
    height: 628px;

    #floating-map {
      height: 100%;
      z-index: 999;
    }
  }
}

</style>

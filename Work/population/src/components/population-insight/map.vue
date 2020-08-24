<template>
  <div id="map-i"></div>
</template>

<script>
import $ from 'jquery'
import echarts from 'echarts'
import { htmlSizeFn } from '../../common/set-html-size'
import { mapGetters } from 'vuex'
// import '../../assets/get/hunan'
// import hunanJson from '../../../static/map-json/hunan.json'
export default {
  data () {
    return {
      id: 'map-i',
      htmlSize: 0,
      preJsonFile: '',
      preRegionType: '',
      preName: '',
      cityName: '', // 市
      countyName: '', // 县
      areaAmount: 0, // 人口数量
      name: 'hunan',
      chart: null,
      splitList: [
        {
          start: null,
          end: null
        },
        {
          start: null,
          end: null
        },
        {
          start: null,
          end: null
        }
      ],
      numberList: [],
      data: [
        //      { name: "长沙市", value: "200" ,id:"121" },
        //      { name: "株洲市", value: "320" ,id:"122" },
        //      { name: "湘潭市", value: "567" ,id:"123" },
        //      { name: "衡阳市", value: "123" ,id:"124" },
        //      { name: "邵阳市", value: "235" ,id:"125" },
        //      { name: "岳阳市", value: "678" ,id:"126" },
        //      { name: "常德市", value: "200" ,id:"127" },
        //      { name: "张家界市", value: "223" ,id:"128" },
        //      { name: "益阳市", value: "133" ,id:"129" },
        //      { name: "郴州市", value: "14" ,id:"130" },
        //      { name: "永州市", value: "235" ,id:"131" },
        //      { name: "怀化市", value: "11" ,id:"132" },
        //      { name: "娄底市", value: "556" ,id:"133" },
        //      { name: "湘西土家族苗族自治州", value: "200" ,id:"134" }
      ]
    }
  },
  props: {
    dataList: {},
    height: {
      type: Number,
      default: 0
    }
  },
  computed: {
    // ...mapGetters(["mapCrumb", "treeList", "populationNumber"])
  },
  watch: {
    dataList(val){
      this.data = val;
      this.$nextTick(() => {
        this.echartsInit();
      });
    }
  },
  mounted () {
    this.$nextTick(() => {
      try {
        this.echartsinit();
      }catch (e) {

      }
    });
  },
  components: {},
  methods: {
    echartsInit () {
      var that = this;
      var dom = document.getElementById(this.id);
      dom.style.height = this.height + 'rem';
      var myChart = echarts.init(dom);
      var uploadedDataURL = '../../../static/map-json/changsha.json';
      myChart.showLoading();
      $.getJSON(uploadedDataURL, function (geoJson) {
        echarts.registerMap('changsha', geoJson);
        myChart.hideLoading();
/*
        var geoCoordMap = {
          '长沙县1': [113.1409300000, 28.2059500000],
          '长沙县2': [113.1409300000, 28.2459500000],
          '长沙县3': [113.1409300000, 28.2859500000],
          '长沙县4': [113.0809300000, 28.2059500000],
          '长沙县5': [113.0809300000, 28.2459500000], //
          '长沙县6': [113.0809300000, 28.2859500000],
          '长沙县7': [113.0209300000, 28.2059500000],
          '长沙县8': [113.0209300000, 28.2459500000],
          '长沙县9': [113.0209300000, 28.2859500000],

          '浏阳市1': [113.7031700000, 28.1237800000],
          '浏阳市2': [113.7031700000, 28.1637800000],
          '浏阳市3': [113.7031700000, 28.2037800000],
          '浏阳市4': [113.6431700000, 28.1237800000],
          '浏阳市5': [113.6431700000, 28.1637800000],//
          '浏阳市6': [113.6431700000, 28.2037800000],
          '浏阳市7': [113.5831700000, 28.1237800000],
          '浏阳市8': [113.5831700000, 28.1637800000],
          '浏阳市9': [113.5831700000, 28.2037800000],

          '宁乡县1': [112.4347800000, 28.1988400000],
          '宁乡县2': [112.4347800000, 28.2388400000],
          '宁乡县3': [112.4347800000, 28.2788400000],
          '宁乡县4': [112.4347800000, 28.3188400000],
          '宁乡县5': [112.4347800000, 28.3588400000],

          '宁乡县6': [112.4947800000, 28.1988400000],
          '宁乡县7': [112.4947800000, 28.2388400000],
          '宁乡县8': [112.4947800000, 28.2788400000],
          '宁乡县9': [112.4947800000, 28.3188400000],
          '宁乡县10': [112.4947800000, 28.3588400000],

          '宁乡县11': [112.5547800000, 28.1988400000],
          '宁乡县12': [112.5547800000, 28.2388400000],
          '宁乡县13': [112.5547800000, 28.2788400000],
          '宁乡县14': [112.5547800000, 28.3188400000],
          '宁乡县15': [112.5547800000, 28.3588400000],

          '宁乡县16': [112.6147800000, 28.1988400000],
          '宁乡县17': [112.6147800000, 28.2388400000],
          '宁乡县18': [112.6147800000, 28.2788400000],
          '宁乡县19': [112.6147800000, 28.3188400000],
          '宁乡县20': [112.6147800000, 28.3588400000],

          '宁乡县21': [112.6747800000, 28.1988400000],
          '宁乡县22': [112.6747800000, 28.2388400000],
          '宁乡县23': [112.6747800000, 28.2788400000],
          '宁乡县24': [112.6747800000, 28.3188400000],
          '宁乡县25': [112.6747800000, 28.3588400000],

          '望城区1': [112.7579000000, 28.3212100000],
          '望城区2': [112.7579000000, 28.3612100000],
          '望城区3': [112.7579000000, 28.4012100000],
          '望城区4': [112.8179000000, 28.3212100000],
          '望城区5': [112.8179000000, 28.3612100000],
          '望城区6': [112.8179000000, 28.4012100000],
          '望城区7': [112.8779000000, 28.3212100000],
          '望城区8': [112.8779000000, 28.3612100000],
          '望城区9': [112.8779000000, 28.4012100000],

          '天心区1': [112.9298300000, 28.0742600000],
          '天心区2': [112.9298300000, 28.1142600000],
          '天心区3': [112.9298300000, 28.1542600000],
          '天心区4': [112.9898300000, 28.0742600000],
          '天心区5': [112.9898300000, 28.1142600000],
          '天心区6': [112.9898300000, 28.1542600000],
          '天心区7': [113.0498300000, 28.0742600000],
          '天心区8': [113.0498300000, 28.1142600000],
          '天心区9': [113.0498300000, 28.1542600000],

          '岳阳市1': [113.1225256348, 28.3574407612],
          '岳阳市2': [113.1225256348, 28.3974407612],
          '岳阳市3': [113.1225256348, 28.4374407612],
          '岳阳市4': [113.1825256348, 28.3574407612],
          '岳阳市5': [113.1825256348, 28.3974407612],
          '岳阳市6': [113.1825256348, 28.4374407612],
          '岳阳市7': [113.2425256348, 28.3574407612],
          '岳阳市8': [113.2425256348, 28.3974407612],
          '岳阳市9': [113.2425256348, 28.4374407612],

          '平江县1': [113.9066748047, 28.3948834649],
          '平江县2': [113.9066748047, 28.4348834649],
          '平江县3': [113.9066748047, 28.4748834649],
          '平江县4': [113.9666748047, 28.3948834649],
          '平江县5': [113.9666748047, 28.4348834649],
          '平江县6': [113.9666748047, 28.4748834649],
          '平江县7': [114.0266748047, 28.3948834649],
          '平江县8': [114.0266748047, 28.4348834649],
          '平江县9': [114.0266748047, 28.4748834649],

        }
        var data = [
          {name: '长沙县1', value: 310},
          {name: '长沙县2', value: 320},
          {name: '长沙县3', value: 330},
          {name: '长沙县4', value: 340},
          {name: '长沙县5', value: 390},
          {name: '长沙县6', value: 350},
          {name: '长沙县7', value: 360},
          {name: '长沙县8', value: 370},
          {name: '长沙县9', value: 380},

          {name: '浏阳市1', value: 118},
          {name: '浏阳市2', value: 128},
          {name: '浏阳市3', value: 138},
          {name: '浏阳市4', value: 148},
          {name: '浏阳市5', value: 148},
          {name: '浏阳市6', value: 148},
          {name: '浏阳市7', value: 148},
          {name: '浏阳市8', value: 148},
          {name: '浏阳市9', value: 148},

          {name: '宁乡县1', value: 22},
          {name: '宁乡县2', value: 212},
          {name: '宁乡县3', value: 202},
          {name: '宁乡县4', value: 292},
          {name: '宁乡县5', value: 282},
          {name: '宁乡县6', value: 272},
          {name: '宁乡县7', value: 262},
          {name: '宁乡县8', value: 252},
          {name: '宁乡县9', value: 242},
          {name: '宁乡县10', value: 232},
          {name: '宁乡县11', value: 222},
          {name: '宁乡县12', value: 212},
          {name: '宁乡县13', value: 252},
          {name: '宁乡县14', value: 212},
          {name: '宁乡县15', value: 222},
          {name: '宁乡县16', value: 232},
          {name: '宁乡县17', value: 242},
          {name: '宁乡县18', value: 252},
          {name: '宁乡县19', value: 262},
          {name: '宁乡县20', value: 272},
          {name: '宁乡县21', value: 282},
          {name: '宁乡县22', value: 292},
          {name: '宁乡县23', value: 202},
          {name: '宁乡县24', value: 212},
          {name: '宁乡县25', value: 222},

          {name: '望城区1', value: 700},
          {name: '望城区2', value: 710},
          {name: '望城区3', value: 720},
          {name: '望城区4', value: 730},
          {name: '望城区5', value: 740},
          {name: '望城区6', value: 750},
          {name: '望城区7', value: 760},
          {name: '望城区8', value: 770},
          {name: '望城区9', value: 780},

          {name: '天心区1', value: 600},
          {name: '天心区2', value: 610},
          {name: '天心区3', value: 620},
          {name: '天心区4', value: 630},
          {name: '天心区5', value: 640},
          {name: '天心区6', value: 650},
          {name: '天心区7', value: 660},
          {name: '天心区8', value: 670},
          {name: '天心区9', value: 680},

          {name: '岳阳市1', value: 500},
          {name: '岳阳市2', value: 510},
          {name: '岳阳市3', value: 520},
          {name: '岳阳市4', value: 530},
          {name: '岳阳市5', value: 540},
          {name: '岳阳市6', value: 550},
          {name: '岳阳市7', value: 560},
          {name: '岳阳市8', value: 570},
          {name: '岳阳市9', value: 580},

          {name: '平江县1', value: 900},
          {name: '平江县2', value: 910},
          {name: '平江县3', value: 920},
          {name: '平江县4', value: 930},
          {name: '平江县5', value: 940},
          {name: '平江县6', value: 950},
          {name: '平江县7', value: 960},
          {name: '平江县8', value: 970},
          {name: '平江县9', value: 980},


        ]
        var moveLine = [
          {
            'fromName': '浏阳市',
            'toName': '长沙县',
            'coords': [
              [113.6431700000, 28.1637800000],
              [113.0809300000, 28.2459500000]
            ],
            'value': 1
          }, {
            'fromName': '宁乡县',
            'toName': '长沙县',
            'coords': [
              [112.5547800000, 28.2788400000],
              [113.0809300000, 28.2459500000]
            ],
            'value': 100
          }, {
            'fromName': '望城县',
            'toName': '长沙县',
            'coords': [
              [112.8179000000, 28.3612100000],
              [113.0809300000, 28.2459500000]
            ],
            'value': 200
          }, {
            'fromName': '天心县',
            'toName': '长沙县',
            'coords': [
              [112.9898300000, 28.1142600000],
              [113.0809300000, 28.2459500000]
            ],
            'value': 300
          }, {
            'fromName': '岳阳市',
            'toName': '长沙县',
            'coords': [
              [113.1825256348, 28.3974407612],
              [113.0809300000, 28.2459500000]
            ],
            'value': 300
          }, {
            'fromName': '平江县',
            'toName': '长沙县',
            'coords': [
              [113.9666748047, 28.4348834649],
              [113.0809300000, 28.2459500000]
            ],
            'value': 300
          }
        ]
        var max = 480, min = 9 // todo
        var maxSize4Pin = 100, minSize4Pin = 20
*/

        let geoCoordMap = {},barData = [],lineData = [];
        let assoData = [...that.data.customPillar || [],...that.data.flowPillar || []];
        assoData.length && assoData.forEach((item,index) => {
          geoCoordMap[index] = [Number(item.keyss),Number(item.valuess)];
          barData.push({
            name: index.toString(),
            value : item.total_num
          });
        });
        that.data.dataLine && that.data.dataLine.forEach((item,index) => {
          lineData.push([
            [item.keyss1,item.valuess1],[item.keyss2,item.valuess2]
          ]);
        });
        var convertData = function (data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              })
            }
          }
          return res
        };
        let  findMaxNum = function(arr,key){
          /* arr: [ {data2 :[{key:value}]}] */
          let max = [];
          arr.length && arr.forEach((item,index) => {
            max[index] = (function (data) {
              let maxi=0;
              for (let i=0;i<data.length;i++) {
                if (data[maxi][key] <= data[i][key]) {
                  maxi=i;
                }
              }
              return data[maxi][key] ;
            })(item.data2)
          });
          return Math.max.apply(null,max);
        };
        let splitList = [];
        let maxValue = findMaxNum([{data2: assoData}],'total_num');
        maxValue = maxValue > 9 ?(parseInt(maxValue.toString().slice(0,1)) + 1) * 10 ** (maxValue.toString().length - 1) : 10;
        for(let i = 0; i < 5; i++){
          splitList.push({
            start: maxValue / 5 * i,
            end: maxValue / 5 * (i +  1)
          });
        }
        // moveLine.forEach((item) => {
        //   item.lineStyle = {
        //     normal:{
        //       color: '#007946'
        //     }
        //   };
        //   // 根据值重新渲染 lineStyle
        //   if ((item.value >= 0) && (item.value <= 200)) {
        //     item.lineStyle.normal.color = '#007946'
        //   } else if (item.value > 200 && item.value <= 400) {
        //     item.lineStyle.normal.color = '#61B52D'
        //   } else if (item.value > 400 && item.value <= 600) {
        //     item.lineStyle.normal.color = '#FFE60A'
        //   } else if (item.value > 600 && item.value <= 800) {
        //     item.lineStyle.normal.color = '#FF0101'
        //   } else if (item.value > 800 && item.value <= 1000) {
        //     item.lineStyle.normal.color = '#B80000'
        //   } else {
        //     item.lineStyle.normal.color = '#007946'
        //   }
        // })
        var option = {
          baseOption: {
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                if (typeof (params.value)[2] === 'undefined') {
                  return params.name/* + ' : ' + params.value*/
                } else {
                  return params.name + ' : ' + params.value[2]
                }
              }
            },
            visualMap: {
              type: 'piecewise',
              show: true,
              min: 0,
              max: 1000,
              // left: 'right',
              showLabel:true,
              align: 'left',
              itemGap: 0,
              itemWidth: 4,
              itemHeight: 30,
              inverse: false,
              bottom: 20,
              right: 10,
              splitNumber: 5,
              dimension: 2,
              precision: 0,
              text:['人口流量',''],
              textStyle:{
                color:'#fff'
              },
              pieces: splitList,
              calculable: true,
              seriesIndex: 1,
              hoverLink:false,
              inRange: {
                color: ['#007946', '#61B52D', '#FFE60A', '#FF0101', '#B80000'] // 黑黄
              },

            },
            geo: {
              show: true,
              map: 'changsha',
              label:{
                normal: {
                  color:'#fff',
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: 'transparent',
                  borderColor: '#214470',
                  borderWidth: 2,
                  shadowColor: 'rgba(63, 218, 255, 0.5)',
                  shadowBlur: 30
                },
                emphasis: {
                  areaColor: '#2B91B7'
                }
              }
            },
            series: [
              { // 基础配置
                name: 'lines',
                type: 'lines',
                zlevel: 20,
                effect: {
                  show: true,
                  period: 4, // 箭头指向速度，值越小速度越快
                  trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
                  symbol: 'arrow', // 箭头图标
                  symbolSize: 5 // 图标大小
                },
                lineStyle: {
                  normal: {
                    width: 1, // 尾迹线条宽度
                    opacity: 1, // 尾迹线条透明度
                    curveness: 0.3 // 尾迹线条曲直度
                  }
                },
                data: lineData
              },
              {
                name: 'light',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(barData),
                // symbolSize: function (val) {
                //     return val[2] / 10;
                // },
                symbolSize: 15,
                label: {
                  normal: {
                    show: false,
                    formatter: '{b}',
                    position: 'right'
                  },
                  emphasis: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#F4E925'
                  }
                }
              },
              {
                type: 'map',
                map: 'changsha',
                geoIndex: 0,
                aspectScale: 0.75, // 长宽比
                showLegendSymbol: false, // 存在legend时显示
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: false,
                    textStyle: {
                      color: '#fff'
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    areaColor: '#031525',
                    borderColor: '#FFFFFF'
                  },
                  emphasis: {
                    areaColor: '#2B91B7'
                  }
                },
                animation: false,
                data: []
              },
              // {
              //   name: 'Top 5',
              //   type: 'effectScatter',
              //   coordinateSystem: 'geo',
              //   data: convertData(data.sort(function (a, b) {
              //     return b.value - a.value
              //   }).slice(0, 5)),
              //   // symbolSize: function (val) {
              //   //     return val[2] / 10;
              //   // },
              //   symbolSize: 10,
              //   showEffectOn: 'render',
              //   rippleEffect: {
              //     brushType: 'stroke'
              //   },
              //   hoverAnimation: true,
              //   label: {
              //     normal: {
              //       formatter: '{b}',
              //       position: 'right',
              //       show: false
              //     }
              //   },
              //   itemStyle: {
              //     normal: {
              //       color: '#F4E925',
              //       shadowBlur: 10,
              //       shadowColor: '#05C3F9'
              //     }
              //   },
              //   zlevel: 1
              // }
            ]
          }
        };
        myChart.setOption(option)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#map-i {
  height: 6.15rem;
}
</style>

<template>
  <div id="map-parents">
    <div id="map"></div>
    <div class="map-tip">
      <!-- <div class="tip">
        <div class="tip-title">工作人口（万）</div>

        <div class="tip-value" v-text="population.work"></div>
      </div> -->
      <div class="tip">
        <div class="tip-title">居住人口（万）</div>

        <div class="tip-value" v-text="population.home"></div>
      </div>
      <div class="tip">
        <div class="tip-title">常驻人口（万）</div>

        <div class="tip-value" v-text="population.resident"></div>
      </div>
    </div>
    <div class="timebcak"></div>
  </div>
</template>

<script>
import $ from "jquery";
import echarts from "echarts";
import "echarts/extension/bmap/bmap";
import { mapGetters } from "vuex";
import { htmlSizeFn } from "../../common/set-html-size";

export default {
  data() {
    return {
      mapData: [],
      timelineData: [],
      htmlSize: 0,
      options: [],
      isShowTimeline: true,
      data: []
    };
  },
  props: ["height", "dataList", "population"],
  watch: {
    dataList(val) {
      this.data = val;
      this.resetData(val, this.tabMenu);
      this.$nextTick(() => {
        this.echartsInit();
      });
    },
    tabMenu(index) {},
    professionResideMove(val) {
      // this.resetData(val, this.tabMenu);
      // this.$nextTick(() => {
      //   this.echartsInit();
      // });
    }
  },
  computed: {
    ...mapGetters(["tabMenu", "professionResideMove"])
  },
  mounted() {
    this.htmlSize = htmlSizeFn();
    var data = JSON.parse(sessionStorage.getItem("moveData"));
    if (data) {
      this.data = data;
      this.resetData(data, this.tabMenu);
      this.$nextTick(() => {
        this.echartsInit();
      });
    }
  },
  components: {},
  methods: {
    resetData(val, index1) {
      if (index1 == 0) {
        this.options = [];
        this.timelineData = [];
        this.isShowTimeline = true;
        var arr = [];
        val.forEach(element => {
          var newarr = [];
          this.timelineData.push(element.time);
          arr = element.data;
          arr.forEach(ele1 => {
            var dataArr = [];
            ele1.label_number &&
            ele1.label_number.split("-").forEach(ele => {
              dataArr.push(Number(ele));
            });
            dataArr = dataArr.concat(ele1.total_num);
            newarr.push(dataArr);
          });
          this.options.push({
            series: {
              type: "custom",
              coordinateSystem: "bmap",
              // renderItem: renderItem,
              animation: false,
              itemStyle: {
                emphasis: {
                  color: "yellow"
                }
              },
              encode: {
                tooltip: 2
              },
              name: element.time,
              data: newarr
            }
          });
        });
      } else if (index1 == 1 || index1 == 2) {
        this.options = [];
        this.isShowTimeline = false;
        var newarr2 = [];
        val.forEach(element => {
          var dataArr = [];
          element.label_number &&
          element.label_number.split("-").forEach(ele => {
            dataArr.push(Number(ele));
          });
          dataArr = dataArr.concat(element.total_num);
          newarr2.push(dataArr);
        });
        this.options.push({
          series: {
            type: "custom",
            coordinateSystem: "bmap",
            animation: false,
            itemStyle: {
              emphasis: {
                color: "yellow"
              }
            },
            encode: {
              tooltip: 2
            },
            // name: element.time,
            data: newarr2
          }
        });
      }
    },
    getMaxValue(arr) {
      let maxData = [],
        splitList = [];
      arr.length && arr.forEach((item, index) => {
        if (item.data.length) {
          maxData[index] = (function(data) {
            let maxi = 0;
            for (let i = 0; i < data.length; i++) {
              if (data[maxi].total_num <= data[i].total_num) {
                maxi = i;
              }
            }
            return data[maxi].total_num;
          })(item.data)
        }
      });
      // console.log(maxData);
      maxData = Math.max.apply(null,maxData);
      maxData = maxData > 9 ?(parseInt(maxData.toString().slice(0,1)) + 1) * 10 ** (maxData.toString().length - 1) : 10;
      splitList.push({
        min:maxData * 0.8,
        max:maxData,
        label:maxData+'\n\n\n',
      }, {
        min:maxData * 0.3,
        max:maxData * 0.8,
        label:maxData * 0.8+'\n\n\n'
      }, {
        min:maxData * 0.1,
        max:maxData * 0.3,
        label:maxData * 0.3+'\n\n\n'
      }, {
        min:maxData * 0.02,
        max:maxData * 0.1,
        label:maxData * 0.1+'\n\n\n'
      }, {
        min: 0,
        max:maxData * 0.02,
        label: maxData * 0.02+'\n\n\n0'
      })
      return splitList
    },
    echartsInit() {
      this.options.forEach(element => {
        element.series.renderItem = renderItem;
      });
      let that = this;
      let dom = document.getElementById("map");
      var COLORS = [
        "rgba(0,121,70,0.6)",
        "rgba(97,181,45,0.8)",//"#61B52D",
        "rgba(255,230,10,0.8)",//"#FFE60A"
        "rgba(255,113,10,1)",//"#FF710A"
        "rgba(255,1,1,1)",//"#FF0101"
        "#B80000"
      ];
      // var COLORS = [
      //   "rgba(0,121,70,0.4)",
      //   "#61B52D",
      //   "#FFE60A",
      //   "#FF710A",
      //   "#FF0101",
      //   "#B80000"
      // ];
      var lngExtent = [114.344, 114.7];
      var latExtent = [37.962, 38.181];
      var cellCount = [62, 48];
      var cellSizeCoord = [
        (lngExtent[1] - lngExtent[0]) / cellCount[0],
        (latExtent[1] - latExtent[0]) / cellCount[1]
      ];
      var gapSize = 0;
      // console.log(that.mapData)
      // var arr = [[0,0,148],[0,1,5],[0,15,5],[3,0,5],[4,0,5],[5,0,5]]
      // console.log(arr)
      // var data = that.mapData;
      function renderItem(params, api) {
        var context = params.context;
        var lngIndex = api.value(0);
        var latIndex = api.value(1);
        var pointLeftTop = getCoord(params, api, lngIndex, latIndex);
        var pointRightBottom = getCoord(params, api, lngIndex + 1, latIndex + 1);

        return {
          type: 'rect',
          shape: {
            x: pointLeftTop[0],
            y: pointLeftTop[1],
            width: pointRightBottom[0] - pointLeftTop[0],
            height: pointRightBottom[1] - pointLeftTop[1]
          },
          style: api.style({
            stroke: 'rgba(0,0,0,0.1)'
          }),
          styleEmphasis: api.styleEmphasis()
        };
      }

      function getCoord(params, api, lngIndex, latIndex) {
        var coords = params.context.coords || (params.context.coords = []);
        var key = lngIndex + '-' + latIndex;
        // bmap returns point in integer, which makes cell width unstable.
        // So we have to use right bottom point.
        return coords[key] || (coords[key] = api.coord([
          +(lngExtent[0]+  lngIndex * cellSizeCoord[0]).toFixed(6),
          +(latExtent[0] + latIndex * cellSizeCoord[1]).toFixed(6)
        ]));
      }
      // console.log(that.data)
      let maxData = [],
        splitList = [];
      // console.log('---',that.data)
      splitList = that.getMaxValue(
        that.tabMenu == 0
          ? that.data
          : that.tabMenu == 1 || that.tabMenu == 2
          ? [{ data: that.data }]
          : [{ data: [] }]
      );

      let option = {};
      this.chart = echarts.init(dom);
      this.chart.setOption(
        (option = {
          baseOption: {
            timeline: {
              show: that.isShowTimeline,
              autoPlay:true,
              playInterval: 500,
              axisType: "category",
              bottom: "2%",
              symbol: "circle",
              borderWidth: 100,
              borderColor: "#fff",
              borderType: "solid",
              backgroundColor: "rgba(33, 129, 234, 0.25)",
              x: "4%",
              zlevel: 9,
              z:100,
              width: "90%",
              controlStyle: {
                showPlayBtn: true,
                showNextBtn: false,
                showPrevBtn: false,
                itemGap: 20,
                normal: {
                  borderColor: "#2181EA" //外颜色
                },
                emphasis: {
                  borderColor: "#fff" //外颜色
                }
              },
              lineStyle: {
                color: "#2181EA"
              },
              label: {
                show: true,
                interval: 2,
                color: "#fff",
                emphasis: {
                  color: "#fff"
                }
              },
              itemStyle: {
                normal: {
                  borderColor: "#2181EA"
                },
                emphasis: {
                  color: "#2181EA"
                }
              },
              checkpointStyle: {
                //当前项
                symbolSize: 15,
                color: "#2181EA",
                borderWidth: 3,
                borderColor: "#fff"
              },
              data: that.timelineData
            },
            bmap: {
              center: [114.4742110000,38.0619640000],
              zoom: window.screen.width > 2550 ? 13: 12,
              roam: true,
              mapStyle: {
                styleJson: [
                  {
                    featureType: "water",
                    elementType: "all",
                    stylers: {
                      color: "#031628"
                    }
                  },
                  {
                    featureType: "land",
                    elementType: "geometry",
                    stylers: {
                      color: "#020d19"
                    }
                  },
                  {
                    featureType: "highway",
                    elementType: "all",
                    stylers: {
                      visibility: "off"
                    }
                  },
                  {
                    featureType: "arterial",
                    elementType: "geometry.fill",
                    stylers: {
                      color: "#000000"
                    }
                  },
                  {
                    featureType: "arterial",
                    elementType: "geometry.stroke",
                    stylers: {
                      color: "#0b3d51"
                    }
                  },
                  {
                    featureType: "local",
                    elementType: "geometry",
                    stylers: {
                      color: "#000000"
                    }
                  },
                  {
                    featureType: "railway",
                    elementType: "geometry.fill",
                    stylers: {
                      color: "#000000"
                    }
                  },
                  {
                    featureType: "railway",
                    elementType: "geometry.stroke",
                    stylers: {
                      color: "#08304b"
                    }
                  },
                  {
                    featureType: "subway",
                    elementType: "geometry",
                    stylers: {
                      lightness: -70
                    }
                  },
                  {
                    featureType: "building",
                    elementType: "geometry.fill",
                    stylers: {
                      color: "#000000"
                    }
                  },
                  {
                    featureType: "all",
                    elementType: "labels.text.fill",
                    stylers: {
                      color: "#857f7f"
                    }
                  },
                  {
                    featureType: "all",
                    elementType: "labels.text.stroke",
                    stylers: {
                      color: "#000000"
                    }
                  },
                  {
                    featureType: "building",
                    elementType: "geometry",
                    stylers: {
                      color: "#022338"
                    }
                  },
                  {
                    featureType: "green",
                    elementType: "geometry",
                    stylers: {
                      color: "#062032"
                    }
                  },
                  {
                    featureType: "boundary",
                    elementType: "all",
                    stylers: {
                      color: "#465b6c"
                    }
                  }
                ]
              }
            },
            tooltip: {},

            visualMap: {
              textGap:10,
              text: ["", "\n\n人/km^2"],
              showLabel: true,
              type: "piecewise",
              itemSymbol:"roundRect",
              textStyle: {
                color: "#fff",

              },
              padding:[15,15,15,15],
              itemGap: -12,
              itemWidth: 4,
              itemHeight: 35,
              inverse: false,
              bottom: "13%",
              left: "2%",
              // min: 0,
              // max: 7000,
              // splitNumber: 6,
              splitList: splitList,
              dimension: 2,
              color: [
                "rgba(0,121,70,0.6)",
                "#61B52D",
                "#FFE60A",
                "#FF710A",
                "#FF0101",
                "#B80000"
              ],
              backgroundColor: "rgba(33,129,234,0.3)",

              inRange: {
                color: COLORS,
                opacity: 0.7
              }
            }
          },
          options: this.options
        }),true
      );
    }
  }
};
</script>
<style lang="scss" scoped>
  #map-parents {
    position: relative;
    width: 100%;

    #map {
      height: 9rem;
      margin: 0 0 0 2px;
      position: relative;
    }

    .map-tip {
      position: absolute;
      left: 20px;
      top: 0.6rem;
      color: #fff;
      cursor: default;
      z-index: 2;
      .tip {
        background: rgba(33, 129, 234, 0.6);

        height: 1.04rem;
        border-radius: 8px;
        margin-bottom: 0.16rem;

        .tip-title {
          font-size: 0.16rem;
          line-height: 0.53rem;
          padding-left: 16px;
          height: 44px;
        }

        .tip-value {
          font-size: 0.40rem;
          padding: 10px 16px;
        }
      }
    }
    // .timebcak {
    //    position: absolute;
    //    left:2%;
    //    bottom: 2%;
    //    width:95%;
    //    height: 70px;
    //    background:rgba(33, 129, 234, 0.25);
    //    border-radius: 4px;

    // }
  }
</style>

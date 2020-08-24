<template>
  <div id="hunan-map">
    <div class="crumb">
      <!-- <span class="province" @click="showProvince">{{provinceName}}</span> -->
    </div>
    <div class="danger">
      <!-- <i class="el-icon-warning" @click="openDanger()"></i> -->
      <!-- <i @click="openDanger()"><img src="../../assets/images/warnning.png" alt=""></i> -->
    </div>
    <div class="title">区域人口热图</div>
    <div id="map"></div>
  </div>
</template>

<script>
import $ from "jquery";
import echarts from "echarts";
import "echarts/extension/bmap/bmap";
export default {
  data() {
    return {
      filePrefix: "/static/map-json/",
      provinceName: "湖南省",
      cityName: "",
      name: "hunan",
      chart: null,
      datas: [],
      options: [{
          series: [
            {
              type: "heatmap",
              coordinateSystem: "bmap",
              data: [],
              pointSize: 6,
              blurSize: 14
            }
          ]
        }],
      dataTime: [],
      dataList: []
    };
  },
  props: ["data", "height"],
  watch: {
    data(val) {
      this.dataList = val;
      val.forEach((element, index) => {
        let arrAll = [];
        element.data.forEach(v => {
          let arr = [];
          arr.push(v.longitude);
          arr.push(v.latitude);
          arr.push(v.countNum);
          arrAll.push(arr);
        });
        if (index % 4) {
          this.dataTime.push({
            value: element.time,
            symbolSize: [1, 6],
            symbol: "path://M426.666667 0h170.666666v1024H426.666667z",
            symbolOffset: [0, -3],
            color: "#6A8ABB"
          });
        } else {
          this.dataTime.push({
            value: element.time,
            symbolSize: [1, 12],
            symbol: "path://M426.666667 0h170.666666v1024H426.666667z",
            symbolOffset: [0, -6],
            color: "#6A8ABB"
          });
        }
        this.options.push({
          series: [
            {
              type: "heatmap",
              coordinateSystem: "bmap",
              data: arrAll,
              pointSize: 6,
              blurSize: 14
            }
          ]
        });
      });
      this.echartsInit();
    }
  },
  computed: {},
  mounted() {
    this.$nextTick(() => {
      this.echartsInit();
      
    });
  },
  components: {},
  methods: {
    openDanger() {
      this.$emit("showDanger", true);
    },
    dateChange(current) {
      var str = this.dataList[current.currentIndex].realTime.replace(
        /-|:|\s/g,
        ""
      );
      this.$emit("dateValue", str);
    },
    echartsInit() {
      let that = this;
      let dom = document.getElementById("map");
      let option = {};
      let dataTime = this.dataTime;
      let timeline = {};
      let isShow = false
      if(this.dataList.length){
        isShow = true
      }
      this.chart = echarts.init(dom);
      this.chart.setOption(
        (option = {
          baseOption: {
            timeline: {
              show:isShow,
              axisType: "category",
              data: dataTime,
              left: "0",
              right: "0",
              currentIndex:this.dataList.length-1,
              controlStyle: {
                // itemSize:52,
                showPlayBtn: false,
                borderColor: "#6A8ABB",
                nextIcon:
                  "path://M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C251.733333 981.333333 42.666667 772.266667 42.666667 512S251.733333 42.666667 512 42.666667s469.333333 209.066667 469.333333 469.333333-209.066667 469.333333-469.333333 469.333333z M405.333333 268.8c-8.533333 8.533333-8.533333 21.333333 0 29.866667l209.066667 209.066666-209.066667 213.333334c-8.533333 8.533333-8.533333 21.333333 0 29.866666 4.266667 4.266667 8.533333 4.266667 17.066667 4.266667s12.8 0 17.066667-4.266667l243.2-243.2-243.2-243.2c-12.8-4.266667-25.6-4.266667-34.133334 4.266667z",
                prevIcon:
                  "path://M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C251.733333 981.333333 42.666667 772.266667 42.666667 512S251.733333 42.666667 512 42.666667s469.333333 209.066667 469.333333 469.333333-209.066667 469.333333-469.333333 469.333333z M640 268.8c-8.533333-8.533333-21.333333-8.533333-29.866667 0L366.933333 512l243.2 243.2c4.266667 4.266667 8.533333 4.266667 17.066667 4.266667s12.8 0 17.066667-4.266667c8.533333-8.533333 8.533333-21.333333 0-29.866667l-209.066667-213.333333L640 302.933333c8.533333-8.533333 8.533333-25.6 0-34.133333z"
              },
              checkpointStyle: {
                symbol:
                  "path://M512 18.285714C310.857143 18.285714 146.285714 182.857143 146.285714 384s365.714286 621.714286 365.714286 621.714286 365.714286-420.571429 365.714286-621.714286-164.571429-365.714286-365.714286-365.714286zM512 950.857143c-113.371429-135.314286-329.142857-424.228571-329.142857-566.857143 0-182.857143 146.285714-329.142857 329.142857-329.142857s329.142857 146.285714 329.142857 329.142857c0 142.628571-215.771429 431.542857-329.142857 566.857143z M512 384m-146.285714 0a146.285714 146.285714 0 1 0 292.571428 0 146.285714 146.285714 0 1 0-292.571428 0Z",
                symbol: "pin"
                //borderColor:'#6A8ABB'
              },
              itemStyle: {
                color: "#6A8ABB"
              },
              lineStyle: {
                color: "#6A8ABB"
              },
              label: {
                interval: 3,
                color: "#6A8ABB"
              }
            },
            animation: false,
            bmap: {
              center: [109.609029, 27.953214],
              zoom: 16,
              roam: true,
              layoutCenter: ["30%", "30%"],
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
                      color: "#ffffff"
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
                  },
                  {
                    featureType: "manmade",
                    elementType: "all",
                    stylers: {
                      color: "#022338"
                    }
                  },
                  {
                    featureType: "label",
                    elementType: "all",
                    stylers: {
                      visibility: "off"
                    }
                  }
                ]
              }
            },
            visualMap: {
              show: true,
              right: "5",
              top: "5",
              min: 0,
              max: 5,
              itemWidth: 10,
              itemHeight: 100,
              text: ["高", "低"],
              textStyle: {
                color: "#ffffff"
              },
              itemSymbol: "circle",
              seriesIndex: 0,
              calculable: false,
              inRange: {
                color: ["#0008FB", "#0008FB", "#00e547", "#f0ff00", "#f60000"]
              }
            }
          },
          options: this.options
        })
      );
      let bmap = this.chart
        .getModel()
        .getComponent("bmap")
        .getBMap();
        bmap.addControl(new BMap.MapTypeControl());
        this.chart.on('timelinechanged', obj=> {
          this.dateChange(obj)
        }); 
        let _TheArray = [
        [109.604053,27.963468],[109.602077,27.961969],[109.602724,27.960916],[109.602041,27.95948],
        [109.602364,27.958938],[109.60337,27.959065],[109.604269,27.957661],[109.603514,27.956449],
        [109.603299,27.955683],[109.603299,27.955683],[109.60355,27.954598],[109.603586,27.954471],
        [109.604413,27.954311],[109.604161,27.951758],[109.607036,27.951088],[109.607251,27.94844],
        [109.608724,27.94828],[109.609299,27.948536],[109.611347,27.948599],[109.61203,27.949908],
        [109.611886,27.951886],[109.61318,27.952301],[109.613324,27.95278],[109.613324,27.95278],
        [109.613863,27.952078],[109.614366,27.951695],[109.614581,27.95112],[109.619935,27.948791],
        [109.622954,27.948599],[109.622594,27.950514],[109.62033,27.95045],[109.620223,27.950418],
        [109.615839,27.952237],[109.61548,27.953705],[109.618893,27.957119],[109.618857,27.957981],
        [109.618067,27.959225],[109.617276,27.959799],[109.616558,27.960054],[109.614977,27.960182],
        [109.613935,27.960023],[109.611599,27.959097],[109.610234,27.957853],[109.609659,27.958044],
        [109.609192,27.95747],[109.608653,27.957502],[109.608383,27.958172],[109.608239,27.958379],
        [109.606348,27.961163],[109.604053,27.963468],[109.604053,27.963468]
        ];
        for (var i = 0; i < _TheArray.length; i++) {
          if(_TheArray[i + 1]){
            drawRedLine(
              _TheArray[i][0],
              _TheArray[i][1],
              _TheArray[i + 1][0],
              _TheArray[i + 1][1]
            );
          }
        }
        function drawRedLine(lon, lat, endLon, endLat) {
          let polyline1 = new BMap.Polyline(
            [
              new BMap.Point(lon, lat), //起始点的经纬度
              new BMap.Point(endLon, endLat) //终止点的经纬度
            ],
            {
              strokeColor: "red", //设置颜色
              strokeWeight: 2, //宽度
              strokeOpacity: 1
            }
          ); //透明度
          bmap.addOverlay(polyline1);
        }
    }
  }
}
</script>
<style lang="scss" scoped>
#hunan-map {
  position: relative;
  .crumb {
    // margin-top: 0.1rem;
    .province {
      cursor: pointer;
      &:hover {
        color: #bedcfc;
      }
    }
  }
  #map {
    height: 5.32rem;
    margin: 0 0 0.1rem;
    border: 1px solid #14446a;
  }
  .title {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 2;
    color: #05deff;
  }
  .danger {
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -115px;
    margin-top: -115px;
    z-index: 2;
    i {
      color: red;
      font-size: 22px;
    }
  }
}
</style>
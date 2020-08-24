<template>
  <div id="hunan-map">
    <div class="crumb">
      <!-- <span class="province" @click="showProvince">{{provinceName}}</span> -->
    </div>
    <div class="danger">
      <!-- <i class="el-icon-warning" @click="openDanger()"></i> -->
      <i @click="openDanger()"><img src="../../assets/images/warnning.png" alt=""></i>
    </div>
    <div class="title">区域人口热图</div>
    <div id="map"></div>
  </div>
</template>

<script>
import $ from "jquery";
import echarts from "echarts";
import "echarts/extension/bmap/bmap";

// import '../../assets/get/hunan'
// import hunanJson from '../../../static/map-json/hunan.json'
// import hotMap from '/static/map-json/hangzhou.json'
export default {
  data() {
    return {
      filePrefix: "/static/map-json/",
      provinceName: "湖南省",
      cityName: "",
      name: "hunan",
      chart: null,
      datas: [
      ],
      dataList:[],
    };
  },
  props: ["data", "height"],
  watch: {
    data(val) {
      // console.log(val)
      val.forEach(element => {
        var arr = []
        arr.push(element.longitude)
        arr.push(element.latitude)
        arr.push(element.countNum)
        this.dataList.push(arr)
      });
      // console.log(this.dataList)
      this.echartsInit();
    },
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
      this.$emit('showDanger',true)
    },
    echartsInit() {
      let that = this;
      let dom = document.getElementById("map");
      dom.style.height = this.height * 0.8 + "px";
      // let points = [
      //   [109.60967,27.951395, 46],
      //   [109.60967,27.951395, 46],
      //   [109.60967,27.951395, 46],
      //   [109.60967,27.951395, 46],
      //   [109.60967,27.951395, 46],
      // ]; //热力图数据
      let points = this.dataList
      let option = {};
      this.chart = echarts.init(dom);
      this.chart.setOption(
        (option = {
          animation: false,
          bmap: {
            center: [109.609029, 27.953214],
            zoom: 16,
            roam: true,
            mapStyle: {
              styleJson: [
                    {
                      'featureType': 'water',
                      'elementType': 'all',
                      'stylers': {
                        'color': '#031628'
                      }
                    },
                {
                  'featureType': 'land',
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#020d19'
                  }
                },
                    {
                      'featureType': 'highway',
                      'elementType': 'all',
                      'stylers': {
                        'visibility': 'off'
                      }
                    },
                    {
                      'featureType': 'arterial',
                      'elementType': 'geometry.fill',
                      'stylers': {
                        'color': '#000000'
                      }
                    },
                    {
                      'featureType': 'arterial',
                      'elementType': 'geometry.stroke',
                      'stylers': {
                        'color': '#0b3d51'
                      }
                    },
                    {
                      'featureType': 'local',
                      'elementType': 'geometry',
                      'stylers': {
                        'color': '#000000'
                      }
                    },
                    {
                      'featureType': 'railway',
                      'elementType': 'geometry.fill',
                      'stylers': {
                        'color': '#000000'
                      }
                    },
                    {
                      'featureType': 'railway',
                      'elementType': 'geometry.stroke',
                      'stylers': {
                        'color': '#08304b'
                      }
                    },
                    {
                      'featureType': 'subway',
                      'elementType': 'geometry',
                      'stylers': {
                        'lightness': -70
                      }
                    },
                    {
                      'featureType': 'building',
                      'elementType': 'geometry.fill',
                      'stylers': {
                        'color': '#000000'
                      }
                    },
                    {
                      'featureType': 'all',
                      'elementType': 'labels.text.fill',
                      'stylers': {
                        'color': '#ffffff'
                      }
                    },
                    {
                      'featureType': 'all',
                      'elementType': 'labels.text.stroke',
                      'stylers': {
                        'color': '#000000'
                      }
                    },
                    {
                      'featureType': 'building',
                      'elementType': 'geometry',
                      'stylers': {
                        'color': '#022338'
                      }
                    },
                    {
                      'featureType': 'green',
                      'elementType': 'geometry',
                      'stylers': {
                        'color': '#062032'
                      }
                    },
                    {
                      'featureType': 'boundary',
                      'elementType': 'all',
                      'stylers': {
                        'color': '#465b6c'
                      }
                    },
                    {
                      'featureType': 'manmade',
                      'elementType': 'all',
                      'stylers': {
                        'color': '#022338'
                      }
                    },
                    {
                      'featureType': 'label',
                      'elementType': 'all',
                      'stylers': {
                        'visibility': 'off'
                      }
                    }
              ]
            }
          },
          visualMap: {
            show: true,
            right: '5',
            top:'5',
            min: 0,
            max: 5,
            itemWidth:10,
            itemHeight:100,
            text:['高','低'],
            textStyle:{
              color:"#ffffff"
            },
            itemSymbol:'circle',
            seriesIndex: 0,
            calculable: false,
            inRange: {
              color: ["#0008FB", "#0008FB", "#00e547", "#f0ff00", "#f60000"]
            }
          },
          series: [
            {
              type: "heatmap",
              coordinateSystem: "bmap",
              data: points,
              pointSize: 6,
              blurSize: 14,
            }
          ]
        })
      );
      var bmap = this.chart
        .getModel()
        .getComponent("bmap")
        .getBMap();
      bmap.addControl(new BMap.MapTypeControl());
    }
  }
};
</script>
<style lang="scss" scoped>
#hunan-map {
  position: relative;
  .crumb {
    margin-top: 10px;
    .province {
      cursor: pointer;
      &:hover {
        color: #bedcfc;
      }
    }
  }
  #map {
    // height: 400px;
    margin: 20px 0 10px;
    border: 1px solid #14446a;
  }
  .title{
    position: absolute;
    top:10px;
    left: 10px;
    z-index: 2;
    color: #05DEFF;
  }
  .danger {
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -115px;
    margin-top: -115px;
    z-index: 2;
    i{
      color: red;
      font-size: 22px;
    }
  }
}
</style>
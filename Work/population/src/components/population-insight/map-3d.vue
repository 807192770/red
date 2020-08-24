<template>
  <div id="map-i"></div>
</template>

<script>
import $ from "jquery";
import echarts from "echarts";
import echartsGL from "echarts-gl";
import { htmlSizeFn } from "../../common/set-html-size";
import { mapGetters } from "vuex";
// import '../../assets/get/hunan'
// import hunanJson from '../../../static/map-json/hunan.json'

import { cityNameFn, filePrefixFn } from "../active-population/city-name";
export default {
  data() {
    return {
      id: "map-i",
      filePrefix: "",
      htmlSize: 0,
      preJsonFile: "",
      preRegionType: "",
      preName: "",
      cityName: "", //市
      countyName: "", //县
      areaAmount: 0, //人口数量
      name: "changsha",
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
      data: {},
      currentJsonFile: "hunan.json",
    };
  },
  props: {
    dataList: {}, // 地图列表
    height: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters(["mapCrumb"])
  },
  watch: {
    dataList(val) {
      this.data = val;
      this.$nextTick(() => {
        this.echartsInit();
      });
    },
    mapCrumb(val) {
      this.showMapWithIdandType(val.customname,val.customid);
    },
  },
  mounted() {
    this.filePrefix = this.$filePrefix;
    Object.keys(this.dataList).length && this.$nextTick(() => {
      this.echartsInit();
    });
  },
  components: {},
  methods: {
    showMapWithIdandType(jsonName, id){

    },
    echartsInit() {
      let that = this;
      let dom = document.getElementById(this.id);
      dom.style.height = this.height + "rem";
      let myChart = echarts.init(dom);
      let uploadedDataURL = this.filePrefix + "changsha.json";
      // myChart.showLoading();
      $.getJSON(uploadedDataURL, function(geoJson) {
        echarts.registerMap("china", geoJson);
        // myChart.hideLoading();
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
        let convertData = function(data) {
          let res = [];
          for (let i = 0; i < data.length; i++) {
            let geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });
            }
          }
          return res;
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
        let option = {
          title: {
            show: false,
            text: "",
            x: "left",
            top: "10",
            textStyle: {
              color: "#000",
              fontSize: 14
            }
          },
          tooltip: {
            show: true,
            formatter: params => {
/*              let fdata =
                "测试1:" +
                params.name +
                "<br/>" +
                "值:" +
                params.value[2] +
                "<br/>" +
                "地理坐标:[" +
                params.value[0] +
                "," +
                params.value[1] +
                "]";
              return fdata;*/
              return '值:' + params.value[2] + ' 人';
            }
          },
          visualMap: {
            type: 'piecewise',
            show: true,
            min: 0,
            max: 1000,
            // left: 'right',
            splitList: splitList,
            align: 'left',
            itemGap: 0,
            itemWidth: 2,
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
            showLabel:true,
            calculable: false,
            seriesIndex: 1,
            hoverLink: true,
            inRange: {
              color: ['#007946', '#61B52D', '#FFE60A', '#FF0101', '#B80000'] // 黑黄
            },
          },
          geo3D: {
            map: "china",
            roam: true,
            boxDepth: 80,
            boxHeight:30,
            itemStyle: {
              areaColor: "#102948", // 地图配色
              color: "#102948",
              opacity: 1,
              borderWidth: 0.4,
              borderColor: "#05DEFF" // 地图边配色
            },
            label: {
              show: true,
              textStyle: {
                color: "#fff", //地图初始化区域字体颜色
                fontSize: 10,
                opacity: 1,
                backgroundColor: "rgba(0,0,0,0)"
              }
            },
            emphasis: {
              //当鼠标放上去  地区区域是否显示名称
              itemStyle: {
                areaColor: "#174273", // 鼠标移入地图配色
                color: '#174273',
              },
              label: {
                show: true,
                textStyle: {
                  color: "#fff",
                  fontSize: 11,
                  backgroundColor: "rgba(0,0,0,1)" //鼠标移入文字加背景
                }
              }
            },
            //shading: 'lambert',
            light: {
              //光照阴影
              main: {
                color: "#fff", //光照颜色
                intensity: 1.2, //光照强度
                //shadowQuality: 'high', //阴影亮度
                shadow: true, //是否显示阴影
                alpha: 45,
                beta: 10
              },
              ambient: {
                intensity: 0.3
              }
            }
          },
          series: [
            //画线
            {
              type: "lines3D",
              coordinateSystem: "geo3D",
              effect: {
                show: true,
                trailWidth: 5,
                trailOpacity: 0.5,
                trailLength: 0.2,
                constantSpeed: 5,
                symbol:'arrow',
                symbolSize: 5 // 图标大小
              },
              blendMode: "lighter",
              lineStyle: {
                //航线的视图效果
                color: "#9ae5fc",
                width: 1,
                opacity: 0.8
              },
              polyline: false,
              data:lineData
              // data: [
              //   [
              //     [112.784494,28.410795,260], [113.12205,28.226361,260]
              //   ]
              // ]
            },
            //柱状图
            {
              name: "bar3D",
              type: "bar3D",
              coordinateSystem: "geo3D",
              barSize: 0.5, //柱子粗细
              shading: "lambert",
              opacity: 1,
              bevelSize: 0,
              label: {
                show: false,
                formatter: "{b}"
              },
              data: convertData(barData)
            }
          ]
        };
        myChart.setOption(option);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#map-i {
  height: 6.15rem;
}
</style>

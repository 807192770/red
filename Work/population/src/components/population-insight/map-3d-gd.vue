<template>
  <div id="map-i" @mouseleave="clearMapTips"></div>
</template>

<script>
  import $ from "jquery";
  import echarts from "echarts";
  import echartsGL from "echarts-gl";
  import { htmlSizeFn } from "../../common/set-html-size";
  import { mapGetters } from "vuex";
  // import '../../assets/get/hunan'
  // import hunanJson from '../../../static/map-json/hunan.json'
  import _ from 'lodash';
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
        map:{},
        layerBar:{},
        layerLine:{}
      };
    },
    props: {
      dataList: {}, // 地图列表
      // height: {
      //   type: Number,
      //   default: 0
      // },
      customId:{
        type: String,
        default: ''
      }
    },
    computed: {
      ...mapGetters(["mapCrumb"])
    },
    watch: {
      dataList(val) {
        this.data = val;
        this.$nextTick(() => {
          !Object.keys(this.map).length && this.gdMapInit();
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
        this.gdMapInit();
        this.echartsInit();
      });
    },
    components: {},
    methods: {
      clearMapTips(){
        Object.keys(this.map).length && this.map.clearMap();
      },
      showMapWithIdandType(jsonName, id) {

      },
      //地图初始化
      gdMapInit(){
        let that = this;
        let dom = document.getElementById(this.id);
        // dom.style.height = this.height + "rem";

        that.map = new AMap.Map(dom, {
          // features: ['bg', 'road', 'building', 'point'],
          mapStyle: 'amap://styles/midnight',
          pitch: 50,
          zoom: 12,
          center: [0,0], // 中心点
          viewMode: '3D',
        });
        //初始化柱
        that.layerBar = new Loca.ScatterPointLayer({
          map: that.map,
          eventSupport: true
        });
        //初始化线
        that.layerLine = new Loca.LinkLayer({
          map:  that.map,
          fitView: true,
        });
      },
      echartsInit() {
        let that = this;

        //编辑经纬度
        let list = [],city_line = [];
        let assoData = [...that.data.customPillar || [],...that.data.flowPillar || []];
        assoData.length && assoData.forEach((item,index) => {
          list.push({
            coord: item.longitude + ',' + item.latitude,
            value: item.total_num
          })
        });
        that.data.dataLine && that.data.dataLine.forEach((item,index) => {
          city_line.push({
            name: index.toString(),
            line: [item.startLongitude + ',' + item.startLatitude , item.endLongitude + ',' + item.endLatitude]
          });
        });

        that.map.setCenter(city_line.length ? [
          Number(city_line[0].line[1].split(',')[0]),
          Number(city_line[0].line[1].split(',')[1])
        ]: [0,0]);

        // 加柱
        that.layerBar.setData(list, {
          lnglat: 'coord'
        });

        //加线
        that.layerLine.setData(city_line, {
          type: 'line',
          lnglat:'line'
        });
        that.layerLine.setOptions({
          style: {
            // 弧度
            curveness: 0.005,
            // 填充颜色
            color: '#a6d96a',
            borderWidth: 1,
            opacity: 0.9,
          },
        }).render();

        let colors = [
          '#2c7bb6',
          '#abd9e9',
          '#ffffbf',
          '#fdae61',
          '#d7191c'
        ];

        that.layerBar.setOptions({
          // 设定棱柱体顶点数量
          vertex: 4,
          // 单位米
          unit: 'meter',
          light: {
            // 环境光
            ambient: {
              // 光照颜色
              color: '#ffffff',
              // 光照强度，范围 [0, 1]
              intensity: 0.5
            },
            // 平行光
            directional: {
              color: '#ffffff',
              // 光照方向，是指从地面原点起，光指向的方向。
              // 数组分别表示 X 轴、Y 轴、Z 轴。
              // 其中 X 正向朝东、Y 正向朝南、Z 正向朝地下。
              direction: [1, -1.5, 2],
              intensity: 0.6
            }
          },
          style: {
            // 正多边形半径
            radius: 300,
            height: {
              key: 'value',
              value: [0, 4000]
            },
            // 顶边颜色
            color: {
              key: 'value',
              scale: 'quantile',
              value: colors
            },
            opacity: 0.9,
            // 旋转角度，单位弧度
            rotate: Math.PI / 180 * 45,

            // 曲率 [-1, 1] 区间
            curveness: 0.3,
          },
          selectStyle: {
            color: '#fcff19',
            opacity: 0.9
          }
        });

        that.layerBar.on('mousemove', (ev) => {
          openInfoWin(that.map, ev.originalEvent, {
            '位置': ev.rawData.coord,
            '数值': ev.rawData.value
          });
        });

        that.layerBar.render();

        var infoWin;
        var tableDom;
        function openInfoWin(map, event, content) {
          if (!infoWin) {
            infoWin = new AMap.InfoWindow({
              isCustom: true,  //使用自定义窗体
              offset: new AMap.Pixel(130, 100)
            });
          }

          var x = event.offsetX;
          var y = event.offsetY;
          var lngLat = map.containerToLngLat(new AMap.Pixel(x, y));

          if (!tableDom) {
            let infoDom = document.createElement('div');
            infoDom.className = 'info';
            tableDom = document.createElement('table');
            infoDom.appendChild(tableDom);
            infoWin.setContent(infoDom);
          }

          var trStr = '';
          for (var name in content) {
            var val = content[name];
            trStr +=
              '<tr>' +
              '<td class="label">' + name + '</td>' +
              '<td>&nbsp;</td>' +
              '<td class="content">' + val + '</td>' +
              '</tr>'
          }

          tableDom.innerHTML = trStr;
          infoWin.open(map, lngLat);
        }

        function closeInfoWin() {
          if (infoWin) {
            infoWin.close();
          }
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  #map-i {
    height: 6.4rem;
  }
</style>

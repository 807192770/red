<template>
<!-- 热图 -->
  <div id="m-map">
    <div id="container" class="map"></div>
      
      <div class="map-tip">
      <!-- <div class="tip">
        <div class="tip-title">工作人口（万）</div>

        <div class="tip-value" v-text="population.work"></div>
      </div> -->
      <div class="tip">
        <div class="tip-title">京津冀流动人口总数</div>
        <div class="tip-value">
           <ICountUp :delay="delay" :endVal="total_number" :options="optionsNumber" />
        </div>
      </div>
      <div class="tip" style="margin-top:70px;">
        <div class="tip-title" v-show="isshow">过客/访客占比</div>
        <doughnutSex :height="height" :dataList="doughnutSexList" />
      </div>
      <div class="tip">
        <div class="tip-title" v-show="isshow">京津冀各地市出行人数排行</div>
        <origin :dataList="analysis"/>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import echarts from "echarts";
import ICountUp from "vue-countup-v2";
import origin from './population-origin'
import "echarts/extension/bmap/bmap";
import "../../assets/css/font_f8j4mugndf/iconfont.css";
import lineJson from './jsonData/cityGroupContanctPeople.json'
import { mapGetters } from "vuex";
import doughnutSex from "./doughnut-sex.vue";
import centerFloatingPopulationAnalysis from './jsonData/centerFloatingPopulationAnalysis.json'


export default {
  data() {
    return {
      chart: null,
      searchKey: "",
      placeSearch: null,
      dragStatus: false,
      AMapUI: null,
      AMap: null,
      dataTime: [],
      dataList: [],
      value: "凤凰古镇",
      value1: "",
      isOK: true,
      newList: [],
      delay: 1000,
      endVal: 0,
      height:2.4,
      total_number:6142857,
      optionsNumber: {
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: ".",
        prefix: "",
        suffix: ""
      },
      doughnutSexList: [
      ],
      analysis:[],
      isshow:false
    };
  },
  props: {
    data: {},
  },
  computed: {
    ...mapGetters(["query"])
  },
  watch: {
    data(val) {
      val.forEach(element => {
        this.newList = element.data;
      });
      this.$nextTick(() => {
        this.initMap();
      });
    }
  },
  mounted() {
    this.filePrefix = this.$filePrefix
    this.initMap();
    this.realTimeDate();
    this.timer = setInterval(() => {
      let newData = Math.floor(Math.random() * 10000 + this.total_number);
      this.total_number = newData;
      this.doughnutSexList = [
        { value: 611877, name: "过客" },
        { value: 342153, name: "访客" }]
      this.isshow = true
      this.getData()
    }, 5000);
    
},
  components: {
    ICountUp,
    doughnutSex,
    origin
  },
  methods: {
    // 实例化地图
    getData() {
      this.analysis = centerFloatingPopulationAnalysis.ranking;
    },
    initMap() {
      var map = new AMap.Map("container", {
        mapStyle: "amap://styles/53369a9a0dfc51f1956f44ec38e75083",
        pitch: 40,
        zoom: 0,
        center: [114.608024,38.120873],
        viewMode: "3D"
      });
      map.on('mapload', function () {
          map.getMap().plugin(['AMap.ControlBar'], function () {
              var controlBar = new AMap.ControlBar();
              map.getMap().addControl(controlBar);
          });
      });
      var roo = map.getZoom();
      var colors = ['#FF8383','#7C896E','#1D9ED3','#264D94', '#264D94', '#264D94','#264D94', '#264D94', '#264D94', '#264D94','#264D94', '#264D94', '#264D94',];
      let colorsLine = ['#FF0101','#FF710A','#4EFEDD','#8976FF']
      let colorsLineOne = ['#4EFEDD','#4EFEDD','#4EFEDD','#4EFEDD']
      setTimeout(() => {
         let zoomTimer = setInterval(() => {
        if(roo<7){
          roo = 7
          map.setZoom(roo);
        }else{
          clearInterval(zoomTimer);
          $.get(this.filePrefix + "hebei.json", function (data) {
              let arr = []
              data.features.forEach((v,i)=>{
                 v.properties.coordinates = v.geometry.coordinates[0]
                 arr.push(v.properties)
              })
              var layer = new Loca.PolygonLayer({
                map: map,
              });
              layer.setData(arr, {
                  lnglat: 'coordinates'
              });
              var idx = 0;
              var num = 10000
              var layerTimer=setInterval(() => {
                num = num + 10000
                layer.setOptions({
                  style: {
                      height: function () {
                          return num;
                      },
                      opacity: 0.9,
                      color: function (v) {
                          if(v.value.name == '北京市'){
                              return '#FF8383';
                            }else if(v.value.name == '天津市'){
                              return '#7C896E';
                            }else if(v.value.name == '保定市'){
                              return '#1D9ED3';
                            }else if(v.value.name == '石家庄市'){
                              return '#1D9ED3';
                            }else{
                              return '#32486E'
                            }
                      },
                  }
                });
                layer.render();
                if(num>100000){
                  clearInterval(layerTimer)
                  var positions = [
                    {
                      name: '北京',
                      position: [116.260274,40.149572]
                    },
                    {
                      name: '天津',
                      position: [ 117.512715,39.313136]
                    },
                    {
                      name: '廊坊',
                      position: [ 116.625206,39.165162]
                    },
                    {
                      name: '石家庄',
                      position: [ 114.514793,38.042225]
                    },
                    {
                      name: '邢台',
                      position: [ 114.508851,37.0682]
                    },
                    {
                      name: '邯郸',
                      position: [ 114.490686,36.612273]
                    },
                    {
                      name: '保定',
                      position: [ 115.464523,38.874476]
                    },
                    {
                      name: '雄安',
                      position: [ 115.861657,39.042784]
                    },
                    {
                      name: '沧州',
                      position: [ 116.838662,38.304617]
                    },
                    {
                      name: '唐山',
                      position: [ 118.127949,40.107572]
                    },
                    {
                      name: '秦皇岛',
                      position: [ 119.520217,39.888244]
                    },
                    {
                      name: '衡水',
                      position: [ 115.668987,37.739367]
                    },
                    {
                      name: '张家口',
                      position: [ 114.885895,40.768931]
                    },
                    {
                      name: '承德',
                      position: [ 117.962749,40.952942]
                    },
                  ];
                  let layerTimerDown=setInterval(() => {
                    num = num + 10000
                    layer.setOptions({
                      style: {
                          height: function (v) {
                              if(v.value.name == '北京市' || v.value.name == '天津市' || v.value.name == '石家庄市' || v.value.name == '保定市'){
                                return num
                              }
                              return 100000;
                          },
                          opacity: 0.9,
                          color: function (v) {
                            if(v.value.name == '北京市'){
                              return '#FF8383';
                            }else if(v.value.name == '天津市'){
                              return '#7C896E';
                            }else if(v.value.name == '保定市'){
                              return '#1D9ED3';
                            }else if(v.value.name == '石家庄市'){
                              return '#1D9ED3';
                            }else{
                              return '#32486E'
                            }
                          },
                      }
                    }).render()
                    if(num == 200000){
                      clearInterval(layerTimerDown)
                      setTimeout(()=>{
                        positions.forEach((item, index) => {
                          if(index == 0 || index == 1 || index == 2){
                            var text = new AMap.Text({
                              text: item.name,
                              anchor: "center", // 设置文本标记锚点
                              draggable: true,
                              cursor: "pointer",
                              angle: 10,
                              style: {
                                border: "0",
                                background: "none",
                                opacity: "1",
                                "font-size": "16px",
                                color: "#fff"
                              },
                              position: item.position
                            });
                            text.setMap(map);
                          }
                        });
                        new Loca.LinkLayer({
                          map: map,
                          }).setData(lineData,{
                            lnglat:(e)=>{
                              var {fromLong, fromLat, toLong, toLat,value} = e.value;
                              if(value>50000){
                                return [`${fromLong}, ${fromLat}`, `${toLong}, ${toLat}`]
                              }else{
                                return []
                              }
                            }
                          })
                          .setOptions({
                            style: {
                                curveness: 0.3,
                                borderWidth: 100,
                                opacity: 1,
                                color: '#FF0101'
                            }
                          }).render();
                      },1000)
                      setTimeout(()=>{
                        positions.forEach((item, index) => {
                          if(index > 2 && index < 12){
                            var text = new AMap.Text({
                              text: item.name,
                              anchor: "center", // 设置文本标记锚点
                              draggable: true,
                              cursor: "pointer",
                              angle: 10,
                              style: {
                                border: "0",
                                background: "none",
                                opacity: "1",
                                "font-size": "16px",
                                color: "#fff"
                              },
                              position: item.position
                            });
                            text.setMap(map);
                          }
                        });
                        new Loca.LinkLayer({
                          map: map,
                          }).setData(lineData,{
                            lnglat:(e)=>{
                              var {fromLong, fromLat, toLong, toLat,value} = e.value;
                              if(value>8000 && value<20000){
                                return [`${fromLong}, ${fromLat}`, `${toLong}, ${toLat}`]
                              }else{
                                return []
                              }
                            }
                          })
                          .setOptions({
                            style: {
                                curveness: 0.3,
                                borderWidth: 100,
                                opacity: 1,
                                color: '#EFA34A'
                            }
                          }).render();
                      },2000)
                      setTimeout(()=>{
                        positions.forEach((item, index) => {
                          if(index > 11){
                            var text = new AMap.Text({
                              text: item.name,
                              anchor: "center", // 设置文本标记锚点
                              draggable: true,
                              cursor: "pointer",
                              angle: 10,
                              style: {
                                border: "0",
                                background: "none",
                                opacity: "1",
                                "font-size": "16px",
                                color: "#fff"
                              },
                              position: item.position
                            });
                            text.setMap(map);
                          }
                        });
                        new Loca.LinkLayer({
                          map: map,
                          }).setData(lineData,{
                            lnglat:(e)=>{
                              var {fromLong, fromLat, toLong, toLat,value} = e.value;
                              if(value>4000 && value<8000){
                                return [`${fromLong}, ${fromLat}`, `${toLong}, ${toLat}`]
                              }else{
                                return []
                              }
                              
                            }
                          })
                          .setOptions({
                            style: {
                                curveness: 0.3,
                                width:100,
                                borderWidth: 1000,
                                opacity: 1,
                                color: '#4EFEDD'
                            }
                          }).render();
                      },3000)
                    }
                    },50);
                  let lineData = lineJson.lines[8].data
                  let lineNumber = 0
                }
              }, 50);
          })
        }
      }, 1000);
      }, 3000);
    },

    // echartsInit() {},
    // 处理时间格式
    realTimeDate() {
      Date.prototype.pattern = function(fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
          "H+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds() //秒
        };
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        }
        if (/(E+)/.test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? "" : "") : "") +
              week[this.getDay() + ""]
          );
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
          }
        }
        return fmt;
      };
      this.value1 = new Date().pattern("yyyy-MM-dd HH:mm:ss");
      // console.log(this.newtime);
    }
  }
};
</script>
<style lang="scss" scoped>
#m-map {
  .map-tip {
      position: absolute;
      left: 20px;
      top: 0.6rem;
      color: #fff;
      cursor: default;
      z-index: 2;
      .tip {
        .population-origin{
          /*三角箭头的颜色*/
        scrollbar-arrow-color: #038fb2;
        /*滚动条滑块按钮的颜色*/
        scrollbar-face-color: #038fb2;
        /*滚动条整体颜色*/
        scrollbar-highlight-color: #038fb2;
        /*滚动条阴影*/
        scrollbar-shadow-color: #038fb2;
        /*滚动条轨道颜色*/
        scrollbar-track-color: #038fb2;

        &::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }

        &::-webkit-scrollbar-track {
          box-shadow: 0px 0px 3px #038fb2 inset;
          border-radius: 10px;
          background: #038fb2;
          width: 2px;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: #038fb2;
        }
          width: 370px;
          height: 270px;
          // overflow-y: scroll;
          overflow: hidden;
        }
        // height: 1.04rem;
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
  position: relative;
  height: 8.78rem;
  margin-top: 0.1rem;
  .region {
    position: absolute;
    top: 0.24rem;
    left: 4.03rem;
    margin-left: 0.4rem;
    z-index: 2;
    .region_right {
      position: relative;
      width: 2rem;
      height: 0.3rem;
      color: #fff;
      line-height: 0.3rem;
      background: rgba(33, 129, 234, 0.6);
      border: 0;
      border-radius: 2px;
      padding: 0 0 0 0.35rem;
      font-size: 0.14rem;
      .icon_bottom {
        position: absolute;
        top: 0.08rem;
        right: 0.1rem;
        font-size: 0.14rem;
      }
    }
  }
  .map {
    width: 100%;
    height: 100%;
  }
  .legend {
    position: absolute;
    right: 0.39rem;
    bottom: 0.6rem;
    // width: 0.72rem;
    height: 2.4rem;
    text-align: center;
    background-color: rgba(6, 38, 84, 0.8);
    border-radius: 0.02rem;
    padding: 0.16rem 0;
    .legend_top {
      display: flex;
      flex-flow: wrap;
      text-align: center;
      padding-right: 0.12rem;
      .l_color {
        width: 0.08rem;
        height: 1.88rem;
        background: linear-gradient(
          180deg,
          #ff3d3e 8.69%,
          #f9fe31 33.5%,
          #85e91d 63.89%,
          #0024e2 86.83%
        );
        border-radius: 0.1rem;
        margin-left: 0.17rem;
        margin-bottom: 0.08rem;
      }
      .legend_line {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 0.1rem;
        height: 1.77rem;
        margin-top: 0.05rem;
        margin-left: 0.02rem;
        li {
          width: 0.05rem;
          height: 0.01rem;
          background-color: rgba(255, 255, 255, 0.5);
        }
        .line {
          width: 0.1rem !important;
        }
      }
      .legend_content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 1.87rem;
        margin-left: 0.06rem;
      }
    }
    p {
      width: 100%;
      font-size: 0.12rem;
    }
  }
}
</style>
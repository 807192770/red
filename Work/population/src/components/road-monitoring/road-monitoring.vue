<template>
  <!-- 道路人流量监控 -->
  <div class="m-map">
    <div class="total-population">
      <div class="total-population-left">
        <h2>石家庄国际会展中心</h2>
        <p>当前区域人口总量</p>
      </div>
      <div class="total-population-right">{{number}}</div>
    </div>
    <div id="js-container" class="map">正在加载数据 ...</div>
    <div class="proportion">
      <div class="proportion-top">
        <div class="proportion-left"></div>
        <ul class="proportion-right">
          <li>800</li>
          <li>600</li>
          <li>400</li>
          <li>200</li>
          <li>0</li>
        </ul>
      </div>
      <div class="proportion-bottom">(人/ min)</div>
    </div>
    <!-- <div class="info" id="text">请用鼠标在地图上操作试试</div> -->
  </div>
</template>

<script>
// import remoteLoad from "@/utils/remoteLoad.js";
import { MapKey, MapCityName } from "@/config/config";
export default {
  props: ["lat", "lng"],
  data() {
    return {
      searchKey: "",
      placeSearch: null,
      dragStatus: false,
      AMapUI: null,
      AMap: null,
      number: ""
    };
  },
  watch: {
    dataList(val) {
      this.number = val.totalList[0].number;
      this.dataList = val;
      this.initMap();
    }
  },
  props: {
    dataList: {
      // type: Object,
      // default: {}
    }
  },
  methods: {
    // 搜索
    handleSearch() {
      if (this.searchKey) {
        this.placeSearch.search(this.searchKey);
      }
    },
    // 实例化地图
    initMap() {
      // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
      let AMapUI = (this.AMapUI = window.AMapUI);
      let AMap = (this.AMap = window.AMap);
      // console.log(this.dataList.bayonetInformation, 90909090)
      AMapUI.loadUI(["misc/PositionPicker"], PositionPicker => {
        let mapConfig = {
          cityName: MapCityName
        };
        let map = new AMap.Map("js-container", {
          mapConfig,
          resizeEnable: true,
          zoom: 15,
          center: [114.608024, 38.120873],
          mapStyle: "amap://styles/53369a9a0dfc51f1956f44ec38e75083"
        });
        // 实时交通图
        var traffic = new AMap.TileLayer.Traffic({
          autoRefresh: true, //是否自动刷新，默认为false
          interval: 180 //刷新间隔，默认180s
        });

        map.add(traffic);
        // 卡口
        this.dataList &&
          this.dataList.dataPass &&
          this.dataList.dataPass.forEach(item => {
            let circle = "";
            if (item.current_crowding == 0) {
              circle = new AMap.Circle({
                center: [item.lon, item.lat],
                radius: 20, //半径
                strokeWeight: 0,
                // 线样式还支持 'dashed'
                fillColor: "#1ABC5B",
                zIndex: 50
              });
            } else if (item.current_crowding == 1) {
              circle = new AMap.Circle({
                center: [item.lon, item.lat],
                radius: 20, //半径
                strokeWeight: 0,
                // 线样式还支持 'dashed'
                fillColor: "#30C7E9",
                zIndex: 50
              });
            } else if (item.current_crowding == 2) {
              circle = new AMap.Circle({
                center: [item.lon, item.lat],
                radius: 20, //半径
                strokeWeight: 0,
                // 线样式还支持 'dashed'
                fillColor: "#FF881B",
                zIndex: 50
              });
            } else if (item.current_crowding == 3) {
              circle = new AMap.Circle({
                center: [item.lon, item.lat],
                radius: 20, //半径
                strokeWeight: 0,
                // 线样式还支持 'dashed'
                fillColor: "#EE4646",
                zIndex: 50
              });
            }

            circle.setMap(map);
            // 缩放地图到合适的视野级别
            // map.setFitView([circle]);
            var infoWindow;
            circle.on("mouseover", () => {
              infoWindow = new AMap.InfoWindow({
                anchor: "top-left",
                content: `<div class='roadInfo'><p class='bayonetName'>${item.tra_pass_id}</p><p class='totalNumber'><span>${item.current_num}</span><span><b>(人)</b></span></span></p><div ><div><p class='inflow'>流入</p><p class='inflowNumber'>${item.in_num}</p></div><div><p class='outflow'>流出</p><p class='outflowNumber'>${item.out_num}</p></div></div></div>`
              });
              infoWindow.open(map, [item.lon, item.lat]);
            });

            circle.on("mouseout", () => {
              infoWindow.close();
            });
          });

        // var infoWindow = new AMap.InfoWindow({
        //   offset: new AMap.Pixel(0, -30)
        // });
        // for (var i = 0, marker; i < lnglats.length; i++) {
        //   var marker = new AMap.Marker({
        //     position: lnglats[i],
        //     map: map
        //   });
        //   marker.content = "我是第" + (i + 1) + "个Marker";
        //   marker.on("click", markerClick);
        //   marker.emit("click", { target: marker });
        // }
        // function markerClick(e) {
        //   infoWindow.setContent(e.target.content);
        //   infoWindow.open(map, e.target.getPosition());
        // }
        // map.setFitView();

        // var clickHandler = function(e) {
        //   var text =
        //     "您在 [ " +
        //     e.lnglat.getLng() +
        //     "," +
        //     e.lnglat.getLat() +
        //     " ] 的位置单击了地图！";
        //   // log.success("您模拟触发了地图click事件!");
        //   new AMap.InfoWindow({
        //     content: text
        //   }).open(map, e.lnglat);
        // };
        // //
        // map.on("click", clickHandler);

        // 折线图
        var path = [];
        // this.number = this.dataList.totalList[0].number
        this.dataList &&
          this.dataList.brokenLine &&
          this.dataList.brokenLine.forEach((item, index) => {
            path.push(new AMap.LngLat(item.split(",")[0], item.split(",")[1]));
          });

        // 创建折线实例
        var polyline = new AMap.Polyline({
          path: path,
          borderWeight: 2, // 线条宽度，默认为 1
          strokeColor: "red", // 线条颜色
          lineJoin: "round", // 折线拐点连接处样式
          zIndex: 10
        });

        // 将折线添加至地图实例
        // map.add(polyline);

        // 创建地图拖拽
        let positionPicker = new PositionPicker({
          mode: "dragMap", // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
          map: map // 依赖地图对象
        });
        // 拖拽完成发送自定义 drag 事件
        positionPicker.on("success", positionResult => {
          // 过滤掉初始化地图后的第一次默认拖放
          if (!this.dragStatus) {
            this.dragStatus = true;
          } else {
            this.$emit("drag", positionResult);
          }
        });
        // 启动拖放
        positionPicker.start();
      });
    }
  },
  async created() {
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap && window.AMapUI) {
      this.initMap();
      // 未载入高德地图API，则先载入API再初始化
    } else {
      await remoteLoad(`http://webapi.amap.com/maps?v=1.3&key=${MapKey}`);
      await remoteLoad("http://webapi.amap.com/ui/1.0/main.js");
      this.initMap();
    }
  }
};
</script>

<style lang="scss">
.m-map {
  width: 100%;
  height: 9.4rem;
  position: relative;
  .amap-ui-misc-positionpicker {
    display: none;
  }
}
.m-map .map {
  width: 100%;
  height: 100%;
}
.m-map .search {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 285px;
  z-index: 1;
}
.m-map .search input {
  width: 180px;
  border: 1px solid #ccc;
  line-height: 20px;
  padding: 5px;
  outline: none;
}
.m-map .search button {
  line-height: 26px;
  background: #fff;
  border: 1px solid #ccc;
  width: 50px;
  text-align: center;
}
.m-map .result {
  max-height: 300px;
  overflow: auto;
  margin-top: 10px;
}
// .amap-info-content {
//   padding: 0 0.2rem;
//   color: #000;
// }
.proportion {
  position: absolute;
  width: 73px;
  height: 220px;
  right: 80px;
  bottom: 28px;
  border: 1px solid #1958a0;
  box-sizing: border-box;
  border-radius: 8px;
  background: #0e1a32;
}
.proportion-left {
  position: absolute;
  width: 8px;
  height: 160px;
  left: 16px;
  top: 20px;
  background: linear-gradient(180deg, #ee4646 0%, #ffda1b 42.19%, #1abc5b 100%);
  border-radius: 4px;
}
.proportion-right {
  position: absolute;
  height: 160px;
  right: 11px;
  top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.proportion-bottom {
  position: absolute;
  left: 20%;
  top: 93.33%;
  bottom: 4.81%;

  font-family: Noto Sans S Chinese;
  font-size: 10px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  mix-blend-mode: normal;
}
.total-population {
  position: absolute;
  width: 40%;
  height: 80px;
  left: 22px;
  top: 24px;
  border: 1px solid #00e0ff;
  box-sizing: border-box;
  border-radius: 4px;
  background: #0e1a32;
  opacity: 0.9;
  z-index: 999;
  display: flex;
  justify-content: space-between;
}
.total-population-left > h2 {
  position: absolute;
  left: 3.33%;
  top: 10.93%;
  font-family: Noto Sans S Chinese;
  font-size: 30px;
  line-height: 40px;
  display: flex;
  align-items: center;

  color: #00e0ff;

  mix-blend-mode: normal;
}
.total-population-left > p {
  position: absolute;
  left: 3.33%;
  top: 57.37%;
  font-family: Noto Sans S Chinese;
  font-size: 16px;
  line-height: 30px;
  display: flex;
  align-items: center;

  color: #00e0ff;

  mix-blend-mode: normal;
}
.total-population-right {
  left: 12.71%;
  right: 74.48%;
  top: 14.17%;
  bottom: 77.69%;
  font-family: Helvetica;
  font-size: 60px;
  line-height: 116px;
  display: flex;
  align-items: center;
  color: #ffffff;
  mix-blend-mode: normal;
  padding-right: 6px;
}
#text {
  width: 200px;
  height: 50px;
  border: 1px solid #00e0ff;
  box-sizing: border-box;
  border-radius: 4px;
  background: #0e1a32;
  opacity: 0.9;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 5%;
  top: 10%;
}
.amap-info-content {
  padding: 0.24rem 0.2rem 0.32rem;
  background: #1958a0;
  border-radius: 4px;
  color: #fff;
}
.amap-info-contentContainer {
  background: #1958a0;
  border-radius: 4px;
}
.top-left .amap-info-sharp {
  left: 0;
  top: 20%;
  border-bottom: 10px solid #fff;
  border-right: 10px solid transparent;
  z-index: -999;
}
.roadName {
  font-family: Noto Sans SC;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 17px;
  display: flex;
  align-items: center;

  color: #ffffff;

  mix-blend-mode: normal;
  margin-left: 10px;
}
.amap-info-close {
  display: none;
}
.bayonetName {
  width: 100%;
  height: 100%;
  font-family: Noto Sans SC;
  font-style: normal;
  font-weight: bold;
  font-size: 0.32rem;
  line-height: 0.52rem;
  display: flex;
  align-items: center;
  color: #00e0ff;
  mix-blend-mode: normal;
  // margin: 3px 10px 8px;
}
.totalNumber {
  margin-top: 0.16rem;
  font-family: Noto Sans SC;
  font-style: normal;
  font-size: 0.36rem;
  line-height: 0.41rem;
  display: flex;
  align-items: center;
  color: #00e0ff;
  mix-blend-mode: normal;
  span {
    font-weight: bold;
  }
  span:last-of-type {
    display: inline-block;
    height: 100%;
    font-size: 0.12rem;
    margin-left: 0.05rem;
    position: relative;
    b {
      position: absolute;
      left: 0;
      top: -0.15rem;
    }
  }
}
.roadInfo > div {
  display: flex;
  justify-content: space-between;
  margin-top: 0.32rem;
  div {
    // margin: 0 10px;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .inflow,
    .outflow {
      margin-bottom: 0.12rem;
      align-self: center;
      font-family: Noto Sans SC;
      font-style: normal;
      font-weight: normal;
      font-size: 0.24rem;
      line-height: 0.29rem;
      display: flex;
      align-items: center;
      color: #ffffff;
    }
  }
  .inflowNumber {
    font-family: Noto Sans SC;
    font-style: normal;
    font-weight: bold;
    font-size: 0.32rem;
    line-height: 0.35rem;
    display: flex;
    align-items: center;
    color: #ee4646;
    mix-blend-mode: normal;
  }
  .outflowNumber {
    font-family: Noto Sans SC;
    font-style: normal;
    font-weight: bold;
    font-size: 0.32rem;
    line-height: 0.35rem;
    display: flex;
    align-items: center;
    text-align: right;
    color: #1abc5b;
    mix-blend-mode: normal;
  }
}
</style>
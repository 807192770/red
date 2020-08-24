<template>
  <div id="map-parents">
    <div id="map"></div>
    <div class="map-tip">
      <!-- <div class="tip">
        <div class="tip-title">工作人口（万）</div>

        <div class="tip-value">2672.45</div>
      </div>-->
      <div class="tip">
        <div class="tip-title">居住人口（万）</div>

        <div class="tip-value">940.72</div>
      </div>
      <div class="tip">
        <div class="tip-title">常驻人口（万）</div>

        <div class="tip-value">1001.6</div>
      </div>
    </div>
    <div class="timeLine">
      <ul></ul>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import echarts from "echarts";
import "echarts/extension/bmap/bmap";
export default {
  data() {
    return {
      dataList: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00"
      ],
      list: [
        // {
        //   coord: "115.875098818,40.4626462646",
        //   value: 1
        // },
      ],
      layer: null,
      rotation: 0,
      zoomValue: 10,
      // option: [
      //   {
      //     coord: "116.227487603,40.1206120612",
      //     value: 2
      //   },
      //   {
      //     coord: "116.29796536,39.6525652565",
      //     value: 6
      //   },
      //   {
      //     coord: "116.356696825,39.8595859586",
      //     value: 1845
      //   },
      //   {
      //     coord: "116.485906046,40.0126012601",
      //     value: 657
      //   },
      //   {
      //     coord: "116.579876389,40.2286228623",
      //     value: 1
      //   },
      //   {
      //     coord: "116.79130966,40.1746174617",
      //     value: 10
      //   },
      //   {
      //     coord: "116.850041124,40.1656165617",
      //     value: 3
      //   },
      //   {
      //     coord: "116.990996639,40.0666066607",
      //     value: 9
      //   },
      //   {
      //     coord: "117.123336075,40.1656165617",
      //     value: 47
      //   },
      //   {
      //     coord: "116.121770967,40.2106210621",
      //     value: 75
      //   },
      //   {
      //     coord: "116.46241346,40.0666066607",
      //     value: 94
      //   },
      //   {
      //     coord: "116.685593024,40.3726372637",
      //     value: 32
      //   },
      //   {
      //     coord: "116.732578196,39.6525652565",
      //     value: 1
      //   },
      //   {
      //     coord: "116.767817074,39.796579658",
      //     value: 22
      //   },
      //   {
      //     coord: "116.767817074,40.0396039604",
      //     value: 1
      //   },
      //   {
      //     coord: "116.920518881,40.1476147615",
      //     value: 8
      //   },
      //   {
      //     coord: "117.076350904,40.2196219622",
      //     value: 5
      //   },
      //   {
      //     coord: "116.098278382,40.2556255626",
      //     value: 4
      //   },
      //   {
      //     coord: "116.321457946,39.7065706571",
      //     value: 96
      //   },
      //   {
      //     coord: "116.450667167,40.0666066607",
      //     value: 134
      //   },
      //   {
      //     coord: "116.521144924,40.2196219622",
      //     value: 128
      //   },
      //   {
      //     coord: "116.556383803,39.895589559",
      //     value: 479
      //   },
      //   {
      //     coord: "116.62686156,39.6525652565",
      //     value: 36
      //   },
      //   {
      //     coord: "116.673846732,39.8235823582",
      //     value: 27
      //   },
      //   {
      //     coord: "116.908772589,40.1296129613",
      //     value: 3
      //   },
      //   {
      //     coord: "117.182067539,40.5706570657",
      //     value: 1
      //   },
      //   {
      //     coord: "115.757635889,39.5535553555",
      //     value: 41
      //   },
      //   {
      //     coord: "115.96906916,39.5805580558",
      //     value: 44
      //   },
      //   {
      //     coord: "116.21574131,39.7335733573",
      //     value: 43
      //   },
      //   {
      //     coord: "116.767817074,40.1656165617",
      //     value: 23
      //   },
      //   {
      //     coord: "116.908772589,40.2376237624",
      //     value: 2
      //   },
      //   {
      //     coord: "117.017619439,40.0756075608",
      //     value: 9
      //   }
      // ],
      map: new Map(),
      num: 0
    };
  },
  computed: {},
  mounted() {
    this.getMap();
    this.initMap();
    this.getData();
  },
  methods: {
    getData() {
      /**
         * label_number: "24-3"
           latitude: "37.9642812500000000000"
           longitude: "114.3468709500000000000"
           statis_date: "20190920"
           time_stat: "1:00"
           total_num: 1560
         */
      var that = this;
      $.get(that.$filePrefixJson + "professionResideMove.json", function(Json) {

        that.list = [];
        let arr = Json.data[0].data;
        arr.forEach(element => {
          let obj = {
            coord: element.longitude + "," + element.latitude,
            value: element.total_num
          };
          that.list.push(obj);
        });
        that.initMap();

        var increaseZoom = setInterval(() => {
          if (that.zoomValue++ < 11) {
            that.map.setZoom(that.zoomValue);
          } else {
            clearInterval(increaseZoom);
            setInterval(() => {
              if (this.num < Json.data.length - 1) {
                this.num++;
              } else {
                this.num = 0;
              }
              that.list = [];
              let arr = Json.data[this.num].data;
              arr.forEach(element => {
                let obj = {
                  coord: element.longitude + "," + element.latitude,
                  value: element.total_num
                };
                that.list.push(obj);
              });
              that.initMap();
              that.map.setRotation(that.rotation++);
            }, 500);
          }
        }, 250);
      });
    },
    getMap() {
      this.map = new AMap.Map("map", {
        features: ["bg", "road"],
        // mapStyle: "amap://styles/midnight",
        mapStyle: "amap://styles/53369a9a0dfc51f1956f44ec38e75083",
        pitch: 50,
        zoom: 10,
        center: [114.5, 38.07],
        viewMode: "3D"
      });
    },
    initMap() {
      if (this.layer == null) {
        this.layer = new Loca.ScatterPointLayer({
          map: this.map,
          fitView: true
          // eventSupport: true
        });

        var colors = ["#2c7bb6", "#abd9e9", "#ffffbf", "#fdae61", "#d7191c"];

        this.layer.setOptions({
          // 设定棱柱体顶点数量
          vertex: 4,
          // 单位米
          unit: "meter",
          light: {
            // 环境光
            ambient: {
              // 光照颜色
              color: "#ffffff",
              // 光照强度，范围 [0, 1]
              intensity: 0.5
            },
            // 平行光
            directional: {
              color: "#ffffff",
              // 光照方向，是指从地面原点起，光指向的方向。
              // 数组分别表示 X 轴、Y 轴、Z 轴。
              // 其中 X 正向朝东、Y 正向朝南、Z 正向朝地下。
              direction: [1, -1.5, 2],
              intensity: 0.6
            }
          },
          style: {
            // 正多边形半径
            radius: 500,
            height: {
              key: "value",
              value: [0, 20000]
            },
            // 顶边颜色
            color: {
              key: "value",
              scale: "quantile",
              value: colors
            },
            opacity: 0.9,
            // 旋转角度，单位弧度
            rotate: (Math.PI / 180) * 45
          },
          selectStyle: {
            color: "#fcff19",
            opacity: 0.9
          }
        });
      }

      var list = this.list;
      this.layer.setData(list, {
        lnglat: "coord"
      });

      // layer.on('mousemove', (ev) => {
      //   openInfoWin(map, ev.originalEvent, {
      //     '位置': ev.rawData.coord,
      //     '热度': ev.rawData.value
      //   });
      // });
      // layer.on('mouseleave', function (ev) {
      //   closeInfoWin();
      // });
      this.layer.render();
    },
    change() {
      this.list = this.option;
      this.initMap();
    }
  }
};
</script>
<style lang="scss" scoped>
#map-parents {
  position: relative;

  #map {
    height: 904px;
    margin: 0 0 0 2px;
    position: relative;
  }

  .map-tip {
    position: absolute;
    left: 20px;
    top: 52px;
    color: #fff;

    .tip {
      background: rgba(33, 129, 234, 0.6);
      width: 180px;
      height: 104px;
      border-radius: 8px;
      margin-bottom: 16px;

      .tip-title {
        font-size: 16px;
        line-height: 53px;
        padding-left: 16px;
        height: 44px;
      }

      .tip-value {
        font-size: 40px;
        padding: 10px 16px;
      }
    }
  }
}
</style>

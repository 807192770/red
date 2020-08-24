<template>
<!-- 热图 -->
  <div id="m-map">
    <div class="region">
      <!-- <el-select v-model="value" style="color:#fff">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>-->
      <!-- <div class="region_left">
        <i class="icon_map iconfont">&#xe651;</i>
        <div class="address">凤凰古镇</div>
      </div>
      <div class="region_right">
        <div class="nowData">{{value1}}</div>
        <i class="icon_bottom el-icon-date"></i>
      </div> -->
      <!-- <el-date-picker v-model="value1" type="date" placeholder="选择日期" size="mini"></el-date-picker> -->
      <span class="emergency" @click="openDanger()">
        <!-- <img src="../../assets/images/region-btn.png" alt="应急预警" /> -->
        <img src="../../assets/images/region-btn.png" alt="应急预警" />
      </span>
    </div>
    <div id="container" class="map"></div>
    <div class="legend">
      <div class="legend_top">
        <div class="l_color"></div>
        <ul class="legend_line">
          <li class="line"></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li class="line"></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li class="line"></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li class="line"></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li class="line"></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li class="line"></li>
        </ul>
        <ul class="legend_content">
          <li v-for="item in legend_data" :key="item.index">{{item.message}}</li>
        </ul>
      </div>
      <p>百人/km²</p>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import echarts from "echarts";
import "echarts/extension/bmap/bmap";
import "../../assets/css/font_f8j4mugndf/iconfont";
import { mapGetters } from "vuex";

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
      options: [
        {
          value: "选项1",
          label: "凤凰古镇"
        },
        {
          value: "选项2",
          label: "铜仁古城"
        },
        {
          value: "选项3",
          label: "麻阳苗族自治县"
        },
        {
          value: "选项4",
          label: "松桃苗族自治县"
        }
      ],
      value: "凤凰古镇",
      value1: "",
      isOK: true,
      legend_data: [
        { message: "70" },
        { message: "50" },
        { message: "30" },
        { message: "10" },
        { message: "5" },
        { message: "0" }
      ],
      newList: []
    };
  },
  props: {
    data: {},
    count: {
      // type: Number,
      // default: 0
    },
    height: {
      // type: Number,
      // default: 0
    }
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
    this.initMap();
    this.realTimeDate();
  },
  components: {},
  methods: {
    // 灾害预警弹框
    openDanger() {
      this.$emit("showDanger", true);
    },
    // 实例化地图
    initMap() {
      var map = new AMap.Map("container", {
        // features: ["bg", "road"],
        mapStyle: "amap://styles/53369a9a0dfc51f1956f44ec38e75083",
        pitch: 40,
        zoom: 15,
        center: [114.608024,38.120873],
        viewMode: "3D"
      });
      //   var layer = new Loca.ScatterPointLayer({
      //     map: map,
      //     // eventSupport: true
      //   });

      //   var list = this.newList
      //   // var list = []
      //   // this.data[0].data.slice(0,10).forEach((item, index) => {
      //   //   console.log(item)
      //   //   list.push({
      //   //     coord: item.coord,
      //   //     value: item.value
      //   //   })
      //   // })
      //   // console.log(list, this.data[0].data.slice(0,10), 55555
      //   // let newlist = JSON.parse(JSON.stringify(this.newList))
      //   layer.setData(list, {
      //     lnglat: "coord",

      //   });
      //   var colors = ["#2c7bb6", "#abd9e9", "#ffffbf", "#fdae61", "#d7191c"];
      //   layer.setOptions({
      //     // 设定棱柱体顶点数量
      //     vertex: 6,
      //     // 单位米
      //     unit: "meter",
      //     light: {
      //       // 环境光
      //       ambient: {
      //         // 光照颜色
      //         color: "#ffffff",
      //         // 光照强度，范围 [0, 1]
      //         intensity: 0.5
      //       },
      //       // 平行光
      //       directional: {
      //         color: "#ffffff",
      //         // 光照方向，是指从地面原点起，光指向的方向。
      //         // 数组分别表示 X 轴、Y 轴、Z 轴。
      //         // 其中 X 正向朝东、Y 正向朝南、Z 正向朝地下。
      //         direction: [1, -1.5, 2],
      //         intensity: 0.6
      //       }
      //     },
      //     style: {
      //       // 正多边形半径
      //       radius: 25,
      //       height: {
      //         key: "value",
      //         value: [0, 1000]
      //       },
      //       // 顶边颜色
      //       color: {
      //         key: "value",
      //         scale: "quantile",
      //         value: colors
      //       },
      //       opacity: 0.9,
      //       // 旋转角度，单位弧度
      //       rotate: (Math.PI / 180) * 45
      //     },
      //     selectStyle: {
      //       color: "#fcff19",
      //       opacity: 0.9
      //     }
      //   });

      //   layer.on("mousemove", ev => {
      //     console.log(list, 77777)
      //     // openInfoWin(map, ev.originalEvent, {
      //     //   位置: ev.lnglat,
      //     //   // 热度: ev.rawData.value
      //     // });
      //   });

      //   layer.render();
      //   layer.on("mouseleave", function(ev) {
      //     closeInfoWin();
      //   });
      var layer = new Loca.HeatmapLayer({
        map: map
      });
      var list = [];
      this.newList &&
        this.newList.forEach((item, index) => {
          list.push({
            coordinate: item.coord.split(","),
            value: item.value
          });
        });
      layer.setData(list, {
        lnglat: "coordinate",
        value: "value"
      });

      layer.setOptions({
        style: {
            radius: 8,
            opacity: [0.1, 0.8],
            color: {
                0.5: '#0023D8',
                0.65: '#29FFFF',
                0.7: '#7BFF3D',
                0.9: '#FAFF07',
                1.0: '#FF2F30'
            }
        }
      });

      layer.render();
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
  position: relative;
  height: 6.24rem;
  .region {
    // width: 95%;
    position: absolute;
    top: 0.24rem;
    left: 4.03rem;
    margin-left: 0.4rem;
    // display: flex;
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
      // text-align: center;
      .icon_bottom {
        position: absolute;
        top: 0.08rem;
        right: 0.1rem;
        font-size: 0.14rem;
        // cursor: pointer;
        // transform: rotateZ(0);
        // transition: transform 0.3s;
      }
    }
    // .el-select /deep/ {
    //   display: inline-block;
    //   width: 1.8rem;
    //   height: 0.3rem;
    //   margin-right: 0.2rem;
    //   color: #fff;
    //   .el-input__inner {
    //     display: inline-block;
    //     // position: relative;
    //     height: 0.3rem !important;
    //     background: rgba(33, 129, 234, 0.6);
    //     border: 0px;
    //     border-radius: 2px;
    //     color: #fff;
    //     font-size: 0.14rem;
    //     line-height: 0.3rem;
    //     text-align: center;
    //     padding: 0 0.3rem;
    //   }
    //   .el-input__suffix {
    //     position: absolute;
    //   }
    // }
    // /deep/ .el-select__caret {
    // }
    // /deep/ .el-select__caret:before {
    //   position: relative;
    //   top: -35%;
    //   content: "\e78f";
    //   font-size: 0.18rem;
    //   color: #fff;
    // }

    // .el-input /deep/ {
    //   width: 1.6rem;
    //   height: 0.3rem;
    //   color: #fff;
    //   .el-input__inner {
    //     color: #fff;
    //     height: 0.3rem;
    //     line-height: 0.3rem;
    //     background: rgba(33, 129, 234, 0.6);
    //     border: 0;
    //     border-radius: 2px;
    //     padding: 0 0.2rem 0 0.3rem;
    //     font-size: 0.14rem;
    //   }
    //   .el-input__prefix {
    //     color: #fff;
    //     // left: 0;
    //     // right: -1.2rem;
    //     .el-input__icon {
    //       color: #fff;
    //       line-height: 0.3rem;
    //       font-size: 0.14rem;
    //     }
    //   }
    //   .el-input__suffix {
    //     color: #fff;
    //     // right: 0.2rem;
    //     top: -0.02rem;
    //     .el-input__icon {
    //       font-size: 0.12rem;
    //     }
    //   }
    // }
    // /deep/ .el-date-editor {
    //   position: relative;
    //   width: 2rem;
    //   background: rgba(33, 129, 234, 0.6);
    //   border-radius: 2px;
    //   .el-input__inner {
    //     width: 80%;
    //     text-align: center;
    //     padding: 0 0.3rem;
    //     color: #fff;
    //     background: none;
    //   }
    //   .el-input__prefix {
    //     position: absolute;
    //     left: 0%;
    //   }
    //   .el-input__suffix {
    //     .el-input__icon {
    //       position: absolute;
    //       right: 0.3rem;
    //       bottom: -1px;
    //     }
    //   }
    // }
    // .icon_bottom {
    //   // position: absolute;
    //   position: relative;
    //   top: 0.05rem;
    //   left: -0.3rem;
    //   font-size: 0.18rem;
    //   cursor: pointer;
    //   transform: rotateZ(0);
    //   transition: transform 0.3s;
    // }
    // .icon_top {
    //   transform: rotateZ(-180deg);
    //   transition: transform 0.3s, -webkit-transform 0.3s;
    // }
    .emergency {
      display: inline-block;
      width: 1.44rem;
      height: 0.4rem;
      margin-left: 0.4rem;
      cursor: pointer;
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
<template>
  <div id="hunan-map">
    <div class="crumb">
      <span>{{cityName}}</span>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
import $ from "jquery";
import echarts from "echarts";

export default {
  data() {
    return {
      filePrefix: "",
      cityName: "",
      name: "hunan",
      chart: null,
      colorList: [],
    };
  },
  props: {
    dataList: {}
  },
  watch: {
    dataList(val) {
      this.less_legend = val.less_legend;
      this.max_Legend = val.max_Legend;
      this.min_legend = val.min_legend;
      console.log(this.min_legend);
      this.$nextTick(() => {
        this.echartsInit(val.newData1, val.newData2);
      });
    }
  },
  computed: {},
  mounted() {
    this.filePrefix = this.$filePrefix
  },
  components: {},
  methods: {
    optionMap(newData1, newData2) {
      let data1 = newData1;
      let data2 = newData2;
      data1.forEach((v, i) => {
        var color;
        var countNum = v.countNum;
        if (countNum <= this.less_legend && countNum > 0) {
          color = "#03dbfc";
        } else if (countNum <= this.max_Legend && countNum > this.min_legend) {
          color = "#3f8ae3";
        } else {
          color = "#cb2332";
        }
        v.lineStyle = {
          color: color
        };
      });
      data2.forEach((v, i) => {
        var color;
        var countNum = v.value[3];
        if (countNum <= 20 && countNum > 0) {
          color = "#03dbfc";
        } else if (countNum <= 100 && countNum > 10) {
          color = "#3f8ae3";
        } else {
          color = "#cb2332";
        }
        v.itemStyle = {
          normal: {
            color: color
          }
        };
      });
      return {
        backgroundColor: "",
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            // console.log(params);
            if (params.seriesType == "scatter") {
              return (
                params.data.fromName +
                " ---> " +
                params.data.toName +
                "<br />数量：" +
                params.data.value[3]
              );
            } else if (params.seriesType == "lines") {
              return (
                params.data.fromName +
                " ---> " +
                params.data.toName +
                "<br />数量：" +
                params.data.countNum
              );
            } else {
              return params.name;
            }
          }
        },
        geo: {
          //地图
          show: true,
          map: this.name,
          label: {
            normal: {
              show: false,
              textStyle: {
                color: "#03dbfc"
              }
            },
            emphasis: {
              show: false
            }
          },
          zoom: 1.1, // 设置地图大小
          roam: true, // 禁止缩放
          itemStyle: {
            normal: {
              areaColor: "#07152d",
              borderColor: "#035da6",
              borderWidth: 1
            },
            emphasis: {
              areaColor: "#001425"
            }
          }
        },
        //     visualMap: { //图例值控制
        //     min: 0,
        //     max: 1,
        //     calculable: true,
        //     show: true,
        //     color: ['yellow', '#fc9700', '#ffde00', '#ffde00', '#00eaff'],
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
        series: [
          {
            //城市点位
            name: "city",
            type: "scatter",
            coordinateSystem: "geo",
            symbol: "circle",
            symbolSize: 5, // 设置目标点大小
            itemStyle:data1,
            itemStyle: {
              normal: {
                // color: "#04c1e0"
              }
            },
            zlevel: 9,
            data: data2
          },
          {
            //城市点位的涟漪效果
            type: "effectScatter",
            coordinateSystem: "geo",
            data: data2,
            symbolSize: 3, // 点扩散的大小
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
              scale: 9
            },
            hoverAnimation: false,
            itemStyle: {
              normal: {
                // color: "#04c1e0",
                color:"#FFFAFA",
                shadowBlur: 10
              }
            },
            zlevel: 5,
            label: {
              normal: {
                show: true,
                position: "bottom",
                offset: [0, 10],
                formatter: function(value) {
                  return value.name;
                },
                textStyle: {
                  color: "#04c1e0",
                  fontSize: 12
                }
              }
            }
          },
          {
            //连线的线条和箭头
            type: "lines",
            zlevel: 1,
            symbol: "none",
            symbolSize: 10,
            effect: {
              show: true,
              period: 8, //箭头指向速度，值越小速度越快
              trailLength: 0.7, //特效尾迹长度[0,1]值越大，尾迹越长重
              // symbol: "arrow", //箭头图标
              color:"#fff",
              symbolSize: 3 //图标大小
            },
            lineStyle: {
              normal: {
                // color: "#3ed4ff", 
                width: 0.5, //尾迹线条宽度
                opacity: 0.1, //尾迹线条透明度
                curveness: 0.2 //尾迹线条曲直度
              }
            },
            data: data1
          }
        ]
      };
    },
    showProvince(data1, data2) {
      let that = this;
      that.cityName = "";
      $.get(that.filePrefix + "hunan.json", function(geoJson) {
        echarts.registerMap(that.name, geoJson);
        that.chart.setOption(that.optionMap(data1, data2));
      });
    },
    echartsInit(data1, data2) {
      let that = this;
      let dom = document.getElementById("map");
      this.chart = echarts.init(dom);
      that.showProvince(data1, data2);
    }
  }
};
</script>

<style lang="scss" scoped>
#hunan-map {
  .crumb {
    margin-top: 0.1rem;
    .province {
      cursor: pointer;
      &:hover {
        color: #bedcfc;
      }
    }
  }
  #map {
    width: 100%;
    height: 8.5rem;
  }
}
</style>
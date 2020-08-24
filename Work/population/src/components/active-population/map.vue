<template>
  <div id="hunan-map">
    <div class="crumb">
      <!-- <span class="province" @click="showProvinceMap">{{provinceName}}</span> -->
      <span class="province" @click="showCity()">
        <i v-show="cityName != ''">/</i>
        {{cityName}}
      </span>
      <span>
        <i v-show="countyName != ''">/</i>
        {{countyName}}
      </span>
    </div>
    <div class="map-box">
      <div class="detail">
        <div class="area-title">
          <p class="area-name">{{areaName}}</p>
          <p class="area-unit">人口（万）</p>
        </div>
        <p class="area-num">{{areaAmount}}</p>
      </div>
      <div id="map-active"></div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import echarts from "echarts";
import { htmlSizeFn } from "../../common/set-html-size";
import { cityNameFn, filePrefixFn } from "./city-name";
import { mapGetters } from "vuex";
// import '../../assets/get/hunan'
// import hunanJson from '../../../static/map-json/hunan.json'
export default {
  data() {
    return {
      htmlSize: 0,
      currentJsonFile: "130100.json",
      preJsonFile: "",
      preRegionType: "",
      preName: "",
      provinceName: "河北省", //省
      areaName: "河北省", //以最新为主
      cityName: "", //市
      countyName: "", //县
      areaAmount: 0, //人口数量
      name: "130100",
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
      data: [
        //      { name: "长沙市", value: "200" ,id:"121" },
        //      { name: "株洲市", value: "320" ,id:"122" },
        //      { name: "湘潭市", value: "567" ,id:"123" },
        //      { name: "衡阳市", value: "123" ,id:"124" },
        //      { name: "邵阳市", value: "235" ,id:"125" },
        //      { name: "岳阳市", value: "678" ,id:"126" },
        //      { name: "常德市", value: "200" ,id:"127" },
        //      { name: "张家界市", value: "223" ,id:"128" },
        //      { name: "益阳市", value: "133" ,id:"129" },
        //      { name: "郴州市", value: "14" ,id:"130" },
        //      { name: "永州市", value: "235" ,id:"131" },
        //      { name: "怀化市", value: "11" ,id:"132" },
        //      { name: "娄底市", value: "556" ,id:"133" },
        //      { name: "湘西土家族苗族自治州", value: "200" ,id:"134" }
      ]
    };
  },
  props: {
    dataList: {},
    height: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters(["mapCrumb", "treeList", "populationNumber"])
  },
  watch: {
    dataList(val) {
      // console.log(this.data)
      this.data = this.handleData(val);
      this.setLevel(this.data);
      if (this.data) {
        this.showMap(this.currentJsonFile);
      }
    },
    mapCrumb(val) {
      if (val.region_id == "130100") {
        this.showProvince();
      }
      if (val.region_type) {
        var id = val.region_id;
        var type = Number(val.region_type);
        var name = val.region_name;
        // console.log(id, type, name)
        this.showCitySearch(id, type, name)
      }
    },
    populationNumber(val) {
      this.numberList = val;
      if (val) {
        this.setNumber(val);
      }
    }
  },
  mounted() {
    this.htmlSize = htmlSizeFn() * 0.16;
    this.$nextTick(() => {
      this.echartsInit();
    });
  },
  components: {},
  methods: {
    setLevel(val) {
      var numArr = [];
      val.forEach(element => {
        numArr.push(element.value);
      });
      var max = Math.max.apply(Math, numArr);
      var level1 = Math.ceil((max / 3) * 1);
      var level2 = Math.ceil((max / 3) * 2);
      this.splitList = [
        {
          start: level2,
          end: max
        },
        {
          start: level1,
          end: level2
        },
        {
          start: 0,
          end: level1
        }
      ];
    },
    toCrumb(id, type, name) {
      var obj = {};
      obj.region_id = id;
      obj.region_type = type;
      obj.region_name = name;
      // console.log(obj)
      this.$store.commit('SET_CRUMB', obj)
    },
    setNumber(val) {
      val.forEach(element => {
        // if (this.areaName.indexOf(element.region_name)!=-1) {
          this.areaAmount = element.number;
        // }
      });
    },
    handleData(data) {
      data.forEach(element => {
        element.name = element.region_name;
        element.value = element.child_total_num + "";
      });
      return data;
    },
    requestChartDataFromParent(id, type) {
      var obj = {};
      obj.region_id = id;
      obj.region_type = type;
      this.$emit("regionMes", obj);
    },
    requestMapFromParent(id, type) {
      var obj = {};
      obj.region_id = id;
      obj.region_type = type;
      this.$emit("regionMapMes", obj);
    },
    showProvince() {
      this.areaName = "石家庄市";
      this.cityName = "";
      this.countyName = "";
      this.setNumber(this.numberList);

    },
    showProvinceMap() {
      this.showProvince()
      this.showMap("130100.json");
      this.toCrumb(130100, 1, '石家庄市');
    },
    showCity() {
      this.areaName = this.preName;
      this.countyName = "";
      this.setNumber(this.numberList);
      this.showMap(this.preJsonFile + ".json");
      this.toCrumb(
        this.preJsonFile,
        Number(this.preRegionType),
        this.areaName
      );
    },
    showCitySearch(id, type, name) {
      this.areaName = name;
      this.treeList.forEach(element => {
        element.children.forEach(el => {
          if (el.region_name == name) {
            this.cityName = name
            this.countyName = ""
          } else {
            el.children.forEach(ele => {
              if (ele.region_name == name) {
                this.preJsonFile = el.region_id;
                this.preRegionType = el.region_type;
                this.cityName = el.region_name;
                this.countyName = name;
                this.preName = el.region_name;
              }
            });
          }
        });
      });
      // console.log("city search")
      this.showMapWithIdandType(id + ".json", id, type)
      this.setNumber(this.numberList)
    },
    showMap(jsonName) {
      this.showMapWithIdandType(jsonName, undefined, undefined)
    },
    showMapWithIdandType(jsonName, id, type) {
      // console.log("id:" + id + ",type: " + type)
      let that = this;
      this.currentJsonFile = jsonName
      $.get(filePrefixFn() + jsonName, function(geoJson) {
        echarts.registerMap(that.name, geoJson);
        that.chart.setOption(that.optionMap(), true)
        if (id != undefined && type != undefined) {
          console.log("id:" + id + ",type: " + type)
          that.requestChartDataFromParent(id, type)
          that.requestMapFromParent(id, type)
        }
      });
    },
    optionMap() {
      return {
        backgroundColor: "",
        grid: {
          right: "5%",
          bottom: "3%",
          width: "25%",
          height: "80%"
        },
        visualMap: {
          type:'piecewise',
          show: true,
          x: "left",
          y: "60%",
          itemWidth:5,
          itemHeight:60,
          itemGap:-10,
          itemSymbol:'triangle',
          textStyle: {
            color: "#fff",
            fontSize: this.htmlSize,
          },
          splitList: this.splitList,
          color: ["#f45656", "#2181ea", "#3ad9f2"],
          seriesIndex: 0
        },
        series: [
          {
            type: "map",
            mapType: this.name,
            // left: '40%',
            // center: ["40%", "80%"],
            layoutCenter: ["68%", "48%"], //地图中心在屏幕中的位置
            layoutSize: "96%",
            label: {
              emphasis: {
                textStyle: {
                  color: "#fff",
                  fontSize: this.htmlSize * 1.2,
                  fontWeight:'bold',
                  backgroundColor:'rgba(0,0,0,0.6)',
                  borderColor:'#fff',
                  borderWidth: 1,
                  lineHeight: 24,
                  borderRadius:5
                },
                // formatter: '{a}\n{b}',
                formatter: (datas)=> {
                  if (datas.data) {
                    return  '\n\r\r\r' + datas.data.name + '\r\r\r\n\r\r\r' + datas.data.child_total_num + "(万人)\r" + parseInt(datas.data.percent * 100,10) + '%\r\r\r\n'
                  }
                }
              },
              normal: {
                textStyle: {
                  color: "#fff",
                  fontSize: this.htmlSize
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: "#fff",
                borderWidth: 1.2,
                areaColor: "#3AD9F2",
              //   color: "#fff",
                label: {
                  show: true
                }
              },
              emphasis: {
                areaColor: "#274E81",
                borderWidth: 0,
                color: "#fff"
              }
            },
            animation: true,
            data: this.data
            // animationDurationUpdate: 1000,
            // animationEasingUpdate: 'quinticInOut'
          }
        ]
      };
    },
    echartsInit() {
      let that = this;
      var dom = document.getElementById("map-active");
      // dom.style.height = this.height + "rem";
      this.chart = echarts.init(dom);

      require(["echarts"], function(echarts) {
        function startProvinceMap() {
          that.showProvince();
          const clickCity = param => {
            var city = filePrefixFn() + cityNameFn(param.name);
            if (city) {
              that.currentJsonFile = cityNameFn(param.name);
              $.get(city, function(gdMap) {
                echarts.registerMap(that.name, gdMap);
                that.areaName = param.name;
                that.countyName = param.name;
                that.chart.setOption(that.optionMap(), true);
                if (param.data) {
                  that.preJsonFile = param.data.parent_id;
                  that.preName = param.data.parent_name;
                  that.preRegionType = param.data.parent_type;
                  if (param.data.region_type == "3") {
                    that.cityName = param.data.parent_name;
                  }
                  var id = param.data.region_id;
                  var type = Number(param.data.region_type);
                  var name = param.name;
                  // console.log("data id:" + id + ",type: " + type)
                  that.toCrumb(id, type, name);
                }
              });
            }
          };

          // that.chart.on("click", clickCity);
        }
        var currentIdx = 0;
        var option = {
          graphic: [
            {
              id: "left-btn",
              type: "circle",
              shape: {
                r: 20
              },
              style: {
                text: "<",
                fill: "#eee"
              },
              left: 10,
              top: "middle",
              onclick: function() {}
            },
            {
              id: "right-btn",
              type: "circle",
              shape: {
                r: 20
              },
              style: {
                text: ">",
                fill: "#eee"
              },
              top: "middle",
              right: 10,
              onclick: function() {}
            }
          ],
          series: []
        };
        startProvinceMap();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#hunan-map {
  position: relative;
  .crumb {
    font-size: 16px;
    // margin-top: 10px;
    height: 18px;
    .province {
      cursor: pointer;
      &:hover {
        color: #bedcfc;
      }
    }
  }
  .map-box {
    #map-active {
      height: 6.15rem;
    }
    .detail {
      position: absolute;
      top: 20%;
      left: 5%;
      .area-title {
        display: flex;
        align-items: baseline;
        margin-bottom: 16px;
        .area-name {
          font-size: 40px;
          line-height: 50px;
        }
        .area-unit {
          font-size: 16px;
        }
      }
      .area-num {
        font-size: 80px;
        font-weight: bold;
      }
    }
  }
}
</style>

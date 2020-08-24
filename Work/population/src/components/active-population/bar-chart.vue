<template>
  <div>
    <div :id="id" class="bar" v-if="!isshownodata"></div>
    <no-data :style="{height:height+'rem'}" v-if="isshownodata"/>
  </div>
</template>

<script>
import echarts from "echarts";
import noData from '../../base/no-data/no-data'
import { htmlSizeFn } from "../../common/set-html-size";
export default {
  name: "barChart",
  data() {
    return {
      id: "bar",
      data: [],
      htmlSize: 0,
      total: 0,
      isshownodata: false,
    };
  },
  // props: ['dataList'],
  props: {
    dataList: {
      // type: Object,
      // default: {}
    },
    count: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    flag: {}
  },
  watch: {
    dataList(val) {
      var data = this.resetData(val);
      this.dataSort(data);
      if(val.length) {
        this.initEcharts()
        this.isshownodata = false
      }else {
        this.isshownodata = true
      }
      // this.initEcharts()
    }
  },
  computed: {},
  mounted() {
    this.htmlSize = htmlSizeFn();
    var data = this.resetData(this.dataList);
    this.dataSort(data);
    this.initEcharts()
  },
  components: {
    noData
  },
  methods: {
    initEcharts() {
      if (!this.count) {
        this.id = this.id + "0";
      } else {
        this.id = this.id + "1";
      }
      this.$nextTick(() => {
        this.echartsinit();
      });
    },
    resetData(val) {
      var data = [];
      var total = 0;
      if (this.flag == 1) {
        data = val.slice(0, 10);
      } else {
        data = val;
      }
      val.forEach(element => {
        total += Number(element.total_num);
      });
      this.total = total;
      return data;
    },
    dataSort(data) {
      var roamIn = {};
      var roamInName = [];
      var roamInNum = [];
      data.forEach(element => {
        roamInName.push(element.other_prov_name);
        roamInNum.push(element.total_num);
      });
      roamIn.name = roamInName;
      roamIn.value = roamInNum;
      this.data = roamIn;
    },
    echartsinit() {
      var that = this;
      var dom = document.getElementById(this.id);
      dom.style.height = this.height + "rem";
      var myChart = echarts.init(dom);
      var fontSize;
      var left,bottom;
      if (that.flag == 1) {
        left = '10%'
        bottom = "32%"
        fontSize = this.htmlSize * 0.14;
      } else {
        left = '5%'
        bottom = "20%"
        fontSize = this.htmlSize * 0.16;
      }
      var option = {
        calculable: true,
        tooltip: {
          trigger: "axis",
          formatter: function(datas) {
            return (
              datas[0].axisValue +
              ":<br/>" +
              datas[0].value +
              "(万人)" +
              "<br/>" +
              Math.round((datas[0].data / that.total) * 10000) / 100.0 +
              "%"
            );
          },
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          //      data: ['2011年', '2012年']
        },
        grid: {
          left: left,
          right: "4%",
          bottom: bottom,
          top: "25%",
          containLabel: false
        },
        xAxis: {
          type: "category",
          data: that.data.name,
          axisLabel: {
            interval: 0,
            rotate: 40,
            textStyle: {
              fontSize: fontSize,
              color: "#ffffff"
            }
          }
        },
        yAxis: {
          name: "人口数量(万)",
          nameTextStyle: { color: "#415d8a", fontSize: fontSize },
          position: "top",
          type: "value",
          boundaryGap: [0, 0.01],
          axisLabel: {
            textStyle: {
              fontSize: fontSize,
              color: "#ffffff"
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#ffffff"
            }
          }
        },
        series: [
          {
            //          name: '2011年',
            type: "bar",
            data: that.data.value,
            layoutCenter: ["50%", "50%"],
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: [2, 2, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#ff5959"
                  },
                  {
                    offset: 0.3,
                    color: "#15bcff"
                  },
                  {
                    offset: 1,
                    color: "#15bcff"
                  }
                ])
              }
            }
          }
        ]
      };
      myChart.setOption(option, true);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
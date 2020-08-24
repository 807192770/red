<template>
  <div id="population-origin">
    <div :id="id" class="population-origin-bar" v-if="!isshownodata"></div>
    <no-data :style="{height:height+'rem'}" v-if="isshownodata"/>
  </div>
</template>

<script>
import echarts from "echarts";
import noData from '../../base/no-data/no-data'
import { htmlSizeFn } from "../../common/set-html-size";
export default {
  name: "population-origin",
  data() {
    return {
      id: "population-origin-bar",
      htmlSize:0,
      isshownodata:false,
    };
  },
  // props: ["dataList"],
  props: {
    dataList: {
      type: Array,
      default: []
    },
    count: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    flag: {

    }
  },
  watch: {
    dataList(val) {
      if(val.length) {
        this.initEcharts()
        this.isshownodata = false
      }else {
        this.isshownodata = true
      }
      // this.initEcharts()
    },
  },
  computed: {},
  mounted() {
    this.htmlSize = htmlSizeFn()
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
    echartsinit() {
      var that = this;
      var dom = document.getElementById(this.id);
      dom.style.height = this.height + "rem";
      var myChart = echarts.init(dom);
      var fontSize;
      if(that.flag == 1) {
        fontSize = this.htmlSize*0.14
      }else {
        fontSize = this.htmlSize*0.16
      }
      // console.log(this.dataList);
      var legenddata = [];
      this.dataList.forEach(element => {
        legenddata.push(element.name);
      });
      var option = {
        title: {
          // text: '某站点用户访问来源',
          // subtext: '纯属虚构',
          x: "center"
        },
        tooltip: {
          trigger: "item",
          // formatter: "{a} <br/>{b} : {c} ({d}%)"
          formatter: "{b}:<br/>{c}(万人) <br/>{d}%"
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "20%",
          containLabel: true
        },
        legend: {
          orient: "vertical",
          left: "right",
          top: "center",
          data: legenddata,
          itemWidth: 8, // 设置宽度
          itemHeight: 8, // 设置高度
          textStyle: {
            color: "#ffffff",
            fontSize: fontSize
          }
        },
        series: [
          {
            // name: "访问来源",
            type: "pie",
            radius: "60%",
            //          layoutSize:"90%",
            center: ["47%", "50%"],
            color: ["#fa5e5e", "#1a78de", "#2fd7f2"],
            data: this.dataList,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            label: {
              normal: {
                formatter: "{b}\n{d}%",
                textStyle: {
                  color: "rgba(255,255,255,1)",
                  fontSize: fontSize
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: fontSize,
                  fontWeight: "bold"
                }
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
#population-origin {
  .population-origin-bar {
    /*height: 200px;*/
  }
}
</style>

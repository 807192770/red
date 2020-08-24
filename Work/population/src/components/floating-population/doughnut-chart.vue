<template>
  <div id="doughnutChart-age">
    <div :id="id" class="pie" v-if="!isshownodata"></div>
    <no-data :style="{height:height+'rem'}" v-if="isshownodata"/>
  </div>
</template>

<script>
import echarts from "echarts";
import noData from '../../base/no-data/no-data'
import { htmlSizeFn } from "../../common/set-html-size";
export default {
  name: "doughnutChart-age", //年龄分布
  data() {
    return {
      ageArr: [],
      id: "pie",
      data: [],
      htmlSize: 0,
      isshownodata:false,
    };
  },
  // props: ["dataList"],
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
    flag: {

    }
  },
  computed: {},
  watch: {
    dataList(val) {
      this.data = this.dataList;
      if(val.length) {
        this.initEcharts()
        this.isshownodata = false
      }else {
        this.isshownodata = true
      }
      // this.initEcharts()
    },
  },
  mounted() {
    console.log(this.dataList)
    this.htmlSize = htmlSizeFn();
    console.log(this.htmlSize)
    this.data = this.dataList;
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
        fontSize = this.htmlSize*0.12
      }else {
        fontSize = this.htmlSize*0.14
      }
      var option = {
        calculable: true,
        tooltip: {
          trigger: "item",
          // formatter: "{a} <br/>{b}: <br/>{c} ({d}%)"
          formatter: "{b}: <br/>{c}(万人)<br/>{d}%"
        },
        legend: {
          orient: "vertical",
          x: "left",
          y: "bottom",
          //          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
          left: "left",
          top: "center",
          textStyle: {
            color: "#ffffff",
            fontSize: fontSize
          },
          itemWidth: 8, // 设置宽度
          itemHeight: 8 // 设置高度
        },
        series: [
          {
            // name: '年龄分布',
            type: "pie",
            radius: ["20%", "40%"],
            center: ["60%", "50%"],
            // center: "50%",
            color: ["#2081ea", "#f45c5b", "#05deff", "#efd962", "#7059ff", "#ff8c21", "#73cb9b"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: "outside",
                formatter: "{d}% ",
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
            },
            data: that.dataList
          }
        ]
      };
      myChart.setOption(option, true);
    }
  }
};
</script>

<style lang="scss" scoped>
#doughnutChart-age {
  .pie {
  }
}
</style>
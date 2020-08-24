<template>
  <div id="doughnutChart-sex">
    <div :id="id" class="pie" v-if="!isshownodata"></div>
    <no-data :style="{height:height+'rem'}" v-if="isshownodata"/>
  </div>
</template>

<script>
import echarts from "echarts";
import noData from '../../base/no-data/no-data'
import { htmlSizeFn } from "../../common/set-html-size";
export default {
  name: "doughnutChart-sex", //年龄分布
  data() {
    return {
      ageArr: [],
      id: "pie-sex",
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
      console.log(val)
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
    this.htmlSize = htmlSizeFn();
    console.log(122)
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
          name:'过客/访客对比',
          trigger: "item",
          // formatter: "{a} <br/>{b}: <br/>{c} ({d}%)"
          formatter: "{b}: <br/>{c}(万人)<br/>{d}%"
        },
        
        series: [
          {
            name: '过客/访客占比',
            type: "pie",
            selectedMode: 'single',
            color: ["#fa5e5e", "#1a78de"],
            center:['30%', '55%'],
            radius: '75%',
            label: {
              normal: {
                show: true,
                position: "inner",
                formatter: "{b}:{d}% ",
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
            labelLine: {
                normal: {
                    show: true
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
#doughnutChart-sex {
  // position: absolute;
  // width:3.5rem;
  // left: -0.3rem;
  // top: 0.1rem;
 
}
</style>
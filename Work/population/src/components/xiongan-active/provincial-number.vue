<template>
<div>
  <div :id="id" class="provincial-number-bar" v-if="!isshownodata"></div>
  <no-data :style="{height:height+'rem'}" v-if="isshownodata"/>
</div>
</template>

<script>
import echarts from "echarts";
import noData from '../../base/no-data/no-data'
import { htmlSizeFn } from "../../common/set-html-size";
export default {
  name: "provincial-number",
  data() {
    return {
      id:'provincial-number-bar',
      data:{},
      total:0,
      htmlSize:0,
      isshownodata:false,
    };
  },
  props:{
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
  watch: {
    dataList(val) {
      this.dataSort(val)
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
    this.dataSort(this.dataList)
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
    dataSort(data) {
      var roamIn = {};
      var roamInName = [];
      var roamInNum = [];
      var percentage = []
      var total = 0;
      data.forEach(element => {
        roamInName.push(element.country_name);
        roamInNum.push(element.total_num);
        total += element.total_num;
      });
      this.total = total  
      if (this.flag == 1) {
        roamIn.name = roamInName.slice(0,5);
        roamIn.value = roamInNum.slice(0,5);
      } else {
        roamIn.name = roamInName;
        roamIn.value = roamInNum;
      }
      this.data = roamIn;
      // console.log(this.data)
    },
    echartsinit() {
      var that = this;
      var dom = document.getElementById(this.id);
      dom.style.height=this.height+"rem"
      var myChart = echarts.init(dom);
      var fontSize;
      var labelFontSize = 10;
      if(that.flag == 1) {
        fontSize = this.htmlSize*0.14
      }else {
        fontSize = this.htmlSize*0.16
        labelFontSize = 14;
      }
      var option = {
        calculable: true,
        tooltip: {
          trigger: "axis",
          // formatter: "{b} : {c}(人)",
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
          left: "0",
          right: "6%",
          bottom: "5%",
          top: "5%",
          containLabel: true
        },
        xAxis: {
          position: "top",
          type: "value",
          boundaryGap: [0, 0.01],
          axisLabel: {
            show: false,
            textStyle: {
              fontSize: fontSize,
              color: "#04162a"
            }
          },
          axisLine: {
            show:false,
            lineStyle: {
              color: '#04162a', // 颜色
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#ffffff"
            }
          }
        },
        yAxis: {
          type: "category",
          data: that.data.name,
          inverse:true,
          axisLabel: {
            textStyle: {
              fontSize: fontSize,
              color: "#ffffff"
            }
          },
          axisLine: {
            lineStyle: {
              color: '#04162a', // 颜色
            }
          },
        },
        series: [
          {
            //          name: '2011年',
            type: "bar",
            data: that.data.value,
            barWidth: 15,
            itemStyle: {
              normal: {
                barBorderRadius:[10, 10, 10, 10],
                // color:['#00b5ff'],
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
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
            },
            label: {
              // normal: {
              //   show: true,
              //   position: 'right',
              //   formatter: function (datas) {
              //     return Math.round(datas.value/that.total * 10000) / 100.00+"%"
              //   },
              //   textStyle: {
              //       color: 'rgba(255,255,255,1)',
              //       fontSize:labelFontSize
              //   }
              // },
              // emphasis: {
              //   show: true,
              //   textStyle: {
              //     fontSize: '12',
              //   }
              // }
            },
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
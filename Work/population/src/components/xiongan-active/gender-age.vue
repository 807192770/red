<template>
<div>
  <div :id="id" class="gender-age-bar" v-if="!isshownodata"></div>
  <no-data :style="{height:height+'rem'}" v-if="isshownodata"/>
</div>

  
</template>

<script>
import echarts from "echarts";	
import noData from '../../base/no-data/no-data'
import { htmlSizeFn } from "../../common/set-html-size";
export default {
  name: "gender-age",
  data() {
    return {
      id: "gender-age-bar",
      htmlSize:0,
      isshownodata:false,
    };
  },
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
    }
  },
  computed: {
  },
  watch: {
    dataList(val) {
      if(val.female) {
        this.initEcharts()
        this.isshownodata = false
      }else {
        this.isshownodata = true
      }
    },
  },
  computed: {
    },
  mounted() {
    if (this.dataList) {
      this.initEcharts()
    }
    
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
      dom.style.height=this.height+"rem"
      var htmlSize = htmlSizeFn() * 0.14
      var myChart = echarts.init(dom);
      var xAxisdata = this.dataList.xAxis;
      var data1 = this.dataList.female;
      var data2 = this.dataList.male;
      var option = {
        tooltip: {
          trigger: "axis",
          // formatter: "{b} : {c}(万人)",
          formatter:function(params) {
            let str,html = '';
            if(params.length){
              str = params[0].axisValue;
              for(let i = 0; i < params.length; i++){
                html += '<br>' + params[i].marker + params[i].seriesName + ':' + params[i].value + '万人';
              }
            }
            return str + html;
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["男", "女"],
          itemWidth: 8, // 设置宽度
          itemHeight: 8, // 设置高度
          right: "0%",
          // top:'5%',
          textStyle: {
            color: "#ffffff",
            fontSize: htmlSize
          }
        },
        grid: {
          left: "12%",
          right: "4%",
          bottom: "10%",
          top: "25%",
          containLabel: false
        },
        xAxis: {
          name: "年龄",
          type: "category",
          nameTextStyle: { color: "#415d8a" },
          data: xAxisdata,
          axisLabel: {
            interval: 0, //此处关键， 设置文本标签全部显示
            // rotate:-30,
            textStyle: {
              fontSize: htmlSize,
              color: "#ffffff"
            }
          }
        },
        yAxis: {
          name: "人口数量(万)",
          type: "value",
          nameTextStyle: { color: "#415d8a" ,fontSize: htmlSize,},
          axisLabel: {
            textStyle: {
              fontSize: htmlSize,
              color: "#ffffff"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#102136"
            }
          }
        },
        series: [
          {
            name: "男",
            type: "bar",
            stack: "总量",
            barWidth: 16, //柱图宽度
            label: {
              normal: {
                show: false,
                position: "insideRight"
              }
            },
            color: ["#2181ea"],
            data: data1
          },
          {
            name: "女",
            type: "bar",
            stack: "总量",
            barWidth: 16, //柱图宽度
            label: {
              normal: {
                show: false,
                position: "insideRight"
              }
            },
            color: ["#fb5f5f"],
            data: data2
          }
        ]
      };
      myChart.setOption(option, true);
      setTimeout(function() {
        window.onresize = function() {
          myChart.resize();
        };
      }, 200);
    }
  }
};
</script>

<style lang="scss" scoped>
  .gender-age-bar {}
</style>
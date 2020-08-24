<template>
  <div id="gender-age-r">
    <div :id="id" class="gender-age-r-bar"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "gender-age-r",
  data() {
    return {
      id:"gender-age-r-bar",
      data:[],
    };
  },
  // props: ["dataList", "count"],
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
  },
  watch: {
    dataList(val) {
      this.data = val
      this.$nextTick(() => {
        this.echartsinit();
      });
    },
    count(val) {
      if(val > 0) {
        this.id = "gender-age-r-bar"
        this.id = this.id + '1';
        this.$nextTick(() => {
          this.echartsinit();
        });
      }
    }
  },
  computed: {},
  mounted() {
    this.data = this.dataList
    this.id = this.id + '1';
    if(!this.count) {
      this.id = this.id + '0';
    }
    this.$nextTick(() => {
      this.echartsinit();
    });
  },
  components: {},
  methods: {
    echartsinit() {
      var that = this;
      var dom = document.getElementById(this.id);
      dom.style.height = this.height + "px";
      var myChart = echarts.init(dom);
      var xAxisdata = this.data.xAxis;
      var data1 = this.data.female;
      var data2 = this.data.male;
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["男", "女"],
          itemWidth: 8, // 设置宽度
          itemHeight: 8, // 设置高度
          right:'0%',
          // top:'5%',
          textStyle: {
            color: "#ffffff",
            fontSize: 12
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "6%",
          top:'25%',
          containLabel: true
        },
        xAxis: {
          name: '年龄',
          type: "category",
          nameTextStyle :{color:'#415d8a'},
          data: xAxisdata, 
          axisLabel: {
            interval: 0, //此处关键， 设置文本标签全部显示
            // rotate:-30,
            textStyle: {
              fontSize: 12,
              color: "#ffffff"
            },
          },
          axisTick: {
                show: false
            },
          axisLine:{
                lineStyle:{
                    color:'#214470'
                }
            },
        },
        yAxis: {
          name: '人数(人)',
          type: "value",
          nameTextStyle :{color:'#415d8a'},
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: "#ffffff"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#163460"
            }
          },
          axisTick: {
                show: false
            },
          axisLine:{
                lineStyle:{
                    color:'#214470'
                }
            },
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
            color:['#2181ea'],
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
            color:['#fb5f5f'],
            data: data2
          }
        ]
      };
      myChart.setOption(option, true);
      setTimeout(function (){
        window.onresize = function () {
          myChart.resize();
        }
      },200)
    }
  }
};
</script>

<style lang="scss" scoped>
#gender-age-r {
  .gender-age-r-bar {
  }
}
</style>
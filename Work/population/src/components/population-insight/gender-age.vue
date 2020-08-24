<template>
  <div :id="id" class="gender-age-i"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "gender-age-i",
  data() {
    return {
      id: "gender-age-i",
      data: []
    };
  },
  props: {
    dataList: {
      type: Object,
      default: {}
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
  watch: {
    dataList(val) {
      this.data = val;
      this.$nextTick(() => {
        this.echartsinit();
      });
    },
    count(val) {
      if (val > 0) {
        this.id = "gender-age-i";
        this.id = this.id + "1";
        this.$nextTick(() => {
          this.echartsinit();
        });
      }
    }
  },
  computed: {},
  mounted() {
    this.data = this.dataList;
    this.id = this.id + "1";
    if (!this.count) {
      this.id = this.id + "0";
    }
    this.$nextTick(() => {
      this.echartsinit();
    });
  },
  components: {},
  methods: {
    echartsinit() {
      let that = this;
      let dom = document.getElementById(this.id);
      dom.style.height = this.height + "rem";
      let myChart = echarts.init(dom);
      let genderAge = that.data;
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter:function (o) {
            let str,html = '';
            if(o.length){
              str = o[0].name;
              for(let i = 0; i < o.length; i++){
                html += '<br>' + o[i].marker + o[i].seriesName + ':' + o[i].value + '人 ' + o[i].data.z + '%';
              }
            }
            return str + html;
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
            fontSize: 12
          }
        },
        grid: {
          left: "15%",
          right: "5%",
          bottom: "10%",
          top: "22%",
          containLabel: false

/*          left: "10%",
          right: "4%",
          bottom: "10%",
          top: "20%",*/
          // containLabel: true
        },
        yAxis: {
          name: "人数(人)",
          type: "value",
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#214470"
            }
          },
          splitLine: {
             show: true,
            lineStyle: {
              color: "#214470"
            }}
        },
        xAxis: {
          type: "category",
          splitNumber: 5,
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
              fontSize: 10
            }
          },
          axisLine: {
            lineStyle: {
              color: "#214470"
            }
          },
          data:  genderAge.xAxis
        },
        series: [
          {
            name: "男",
            type: "bar",
            stack: "总量",
            barWidth: 20,
            color: "#2181ea",
            data: genderAge.male
          },
          {
            name: "女",
            type: "bar",
            stack: "总量",
            color: "#fb5f5f",
            data: genderAge.female
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
</style>

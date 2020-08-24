<template>
  <div :id="id" class="people-type-i"></div>
</template>

<script>
import echarts from "echarts";
import { htmlSizeFn } from "../../common/set-html-size";
export default {
  name: "people-type-i",
  data() {
    return {
      id: "people-type-i",
      htmlSize:0,
      data: []
    };
  },
  props: {
    dataList: {
      type: Array,
      default: () => []
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
        this.id = "people-type-i";
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
      dom.style.height = that.height + "rem";
      let xdata = [];
      let ydata = that.data.map((item) => {
        xdata.push(item.classType);
        item.value = item.total_num;
        if(item.classType === '常住'){
          item.itemStyle = {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#438DEC" },
                { offset: 1, color: "#0F6BE1" }
              ])
            }
          }
        }else if(item.classType === '工作'){
          item.itemStyle = {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#34AFE0" },
                { offset: 1, color: " #438DEC" }
              ])
            }
          }
        }else {
          item.itemStyle = {
            normal: {
              color: "#FF324F"
            }
          }
        }
        return item;
      });

      let myChart = echarts.init(dom);
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter:function (o) {
            let str,html = '';
            if(o.length){
              str = o[0].name;
              for(let i = 0; i < o.length; i++){
                html += '<br>' +  o[i].seriesName + ':' + o[i].value + '人';
              }
            }
            return str + html;
          }
        },
        grid: {
          left: "15%",
          right: "5%",
          bottom: "10%",
          top: "22%",
          containLabel: false

/*          left: "12%",
          right: "4%",
          bottom: "10%",
          top: "20%",
          containLabel: false*/
        },
        xAxis: {
          type: "category",
          // barCateGoryGap:2,
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              //fontSize: 14,
              color: "#fff"
            }
          },
          axisLine: {
            lineStyle: {
              color: " #214470"
            }
          },
          data: xdata
        },
        yAxis: {
          type: "value",
          name: "人口数量",
          axisTick: {
            show: false //去掉刻度
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: " #214470"
            }
          },
          nameTextStyle: {
            //fontSize: 14,
            color: "#415d8a"
          },
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: "#fff"
            }
          },
          axisLine: {
            lineStyle: {
              color: " #214470"
            }
          }
        },
        series: [
          {
            type: "bar",
            barWidth: 40,
            name:'人口数量',
            //  barGap:'20%',/*多个并排柱子设置柱子之间的间距*/
            //        barCategoryGap:'10%',/*多个并排柱子设置柱子之间的间距*/
            data: ydata
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

<template>
  <div id="doughnutChartRegion">
    <div :id="id" class="pie"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "doughnutChartRegion", //年龄分布
  data() {
    return {
      ageArr: [],
      id: "pie-region",
      colorArr:['#db3491', '#76a5ef', '#7378ff', '#ff69c5', '#ffb267', '#7378ff'],
      data:[],
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
    }
  },
  computed: {},
  watch: {
    dataList(val) {
    // console.log(2)
      this.data = this.addColor(val)
      this.id = this.id + "1";
      if (!this.count) {
        this.id = this.id + "0";
      }
      this.$nextTick(() => {
        this.echartsinit();
      });
    },
    // count(val) {
    // console.log(3)
    //   if (val > 0) {
    //     this.id = "pie-region";
    //     this.id = this.id + "1";
    //     this.$nextTick(() => {
    //       this.echartsinit();
    //     });
    //   }
    // }
  },
  mounted() {
    // console.log(1)
    this.data = this.addColor(this.dataList)
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
    addColor(val) {
      val.forEach((element,index) => {
        element.itemStyle = {
          color:this.colorArr[index]
        }
      });
      return val
    },
    echartsinit() {
      // console.log(this.data)
      var that = this;
      var dom = document.getElementById(this.id);
      dom.style.height = this.height + "px";
      var myChart = echarts.init(dom);
      let option = {
        title: {
          x: "center",
          y: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : <br/>{c} ({d}%)"
        },
        calculable: true,
        series: [
          {
            name: "人数",
            type: "pie",
            radius: ["35%", "80%"],
            center: ["50%", "50%"],
            roseType: "area",
            labelLine: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                length: 1
              }
            },
            label: {
              normal: {
                formatter: "{b}\n{d}%"
              }
            },
            data: that.data
          }
        ]
      };
      myChart.setOption(option, true);
    }
  }
};
</script>

<style lang="scss" scoped>
#doughnutChartRegion {
  .pie {
  }
}
</style>
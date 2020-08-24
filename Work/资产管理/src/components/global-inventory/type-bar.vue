<template>
  <div id="type-bar">
    <!-- 按类型 （柱状图） -->
    <div :id="id" class="type-bar"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "type-bar",
  data() {
    return {
      id: "type-bar-1"
    };
  },

  computed: {},
  watch: {},
  mounted() {
    this.$nextTick(() => {
      this.echartsinit();
    });
  },
  methods: {
    echartsinit() {
      var that = this;
      var dom = document.getElementById(this.id);
      // dom.style.height = this.height + "rem";
      dom.style.height = 4 + "rem";
      var myChart = echarts.init(dom);
      var option = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["服务器类", "笔记本电脑类", "AP类", "交换机类", "饮水机类", "平板类", "打印机类"],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      };

      myChart.setOption(option, true);
    }
  }
};
</script>
<style lang='scss' scoped>
</style>


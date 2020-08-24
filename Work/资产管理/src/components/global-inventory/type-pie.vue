<template>
  <div id="type-pie">
    <!-- 按类型 （饼图） -->
    <div :id="id" class="type-pie"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "type-pie",
  data() {
    return {
      id: "type-pie-1"
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
        title: {
          text: "2020年2月第三周全局盘点",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
        //   orient: 'vertical',
        //   top: 'middle',
        //   bottom: 10,
        //   left: "center",
        //   data: ["西凉", "益州", "兖州", "荆州", "幽州"]
        // },
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [
              { value: 535, name: "笔记本电脑类" },
              { value: 510, name: "AP类" },
              { value: 634, name: "交换机类" },
              { value: 735, name: "服务器类" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
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
<style lang='scss' scoped>
</style>


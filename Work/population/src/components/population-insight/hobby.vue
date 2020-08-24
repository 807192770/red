<template>
  <div :id="id" class="hobby"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "hobby",
  data() {
    return {
      id: "hobby",
      data: {}
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
  watch: {
    dataList(val) {
      this.data = val;
      this.$nextTick(() => {
        this.echartsinit();
      });
    },
    count(val) {
      if (val > 0) {
        this.id = "hobby";
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

      let newData = JSON.parse(JSON.stringify(that.data)).sort((a,b) => b.total_num-a.total_num);
      let indicator = newData.map((item) => {
        return {text: item.interest,max: newData[0].total_num + 200};
      });
      if(!indicator.length){
        indicator = [{text:'',max:0}];
      }
      let yData = newData.map(item => item.total_num);

      // let yData =[],indicator =[{text:'',max:0}];
      let myChart = echarts.init(dom);
      let option = {
        tooltip: {
            show: true,
            trigger: "item",
/*            formatter:function (o) {
              return o
            }*/
        },
        radar: {
            nameGap:10,
            "center": ["50%", "50%"],
            "radius": "70%",
            "startAngle": 90,
            "splitNumber": 4,
            "shape": "circle",
            "splitArea": {
                "areaStyle": {
                    "color": ["transparent"]
                }
            },
            "axisLabel": {
                "show": false,
                "color": "#1E3C69",
            },
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#1E3C69"
                }
            },
            "name": {
                "textStyle": {
                    "color": '#fff'
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": "#1E3C69"
                }
            },
            "indicator": indicator
        },
        series: [{
            "name": "",
            "type": "radar",
            "symbolSize": 0,
            "areaStyle": {
                "normal": {
                    "color": "rgba(5,222,255, 0.1)"
                }
            },
            "lineStyle": {
                "normal": {
                    "color": "#05DEFF",
                    "width": 1
                }
            },
            "data": [{
              "name":'兴趣爱好(人)',
              "value":yData
            }]
        }]
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

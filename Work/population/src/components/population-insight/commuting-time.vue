<template>
  <div class="commuting-time">
    <div class="inflow" :style="{background: ttime === '1' ? '#2181ea' : 'none'}"  @click="selFlowWay('1')">工作</div>
    <div class="outflow" :style="{background: ttime === '2' ? '#2181ea' : 'none'}" @click="selFlowWay('2')">居住</div>
    <div :id="id" class="commuting-time-i"></div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "commuting-time-i",
  data() {
    return {
      id: "commuting-time-i" + this.randomData,
      data: [],
      ttime:'1'
    };
  },
  props: {
    cummutData: {},
    dataList: {},
    count: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    randomData:{
      type: Number,
      default: 0
    }
  },
  watch: {
    randomData(val){
      if(val){
        this.id = "commuting-time-i" + this.randomData;
        this.selFlowWay('1')
      }
    },
    cummutData(val) {
      this.data = val;
      this.$nextTick(() => {
        this.echartsinit();
      });
    },
    dataList(val) {
      this.data = val;
      this.$nextTick(() => {
        this.echartsinit();
      });
    },
  },
  computed: {},
  mounted() {
    if(!this.flag){
      this.ttime = '1';
    }
    this.data = this.cummutData;
    this.$nextTick(() => {
      this.echartsinit();
    });
  },
  components: {},
  methods: {
    selFlowWay(val){
      this.ttime = val;
      this.$emit(this.randomData ? 'getCommutingTime' : 'getCommutingTime1',val);
    },
    echartsinit() {
      let that = this;
      let dom = document.getElementById('commuting-time-i' + that.randomData);
      dom.style.height = this.height + "rem";

      let myChart = echarts.init(dom);
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}人 ({d}%)"
        },
        legend: {
          textStyle: {
            color: "#90979c",
            fontSize: 12
          },
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 6.5,
          x: "left",
          y: "top",

          top:'25%',
          left:'2%',
          orient: "vertical",
          // data: ["<10min", "10-20min", "20-30min", "30-40min", "40-50min", ">=50min"]
        },
        series: {
          // name:'通勤时长',
          type: "pie",
          roseType: "radius",
          labelLine: {
            normal: {
              show: false
            }
          },
          radius:["45%","85%"],
          label: {
            normal: {
              show: false
            }
          },
          center: ["60%", "50%"],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          },
          color:["#2181EA","#F45B5B","#05DEFF","#EED862","#7059FF","#FF8C21"],
          data:that.data
        }
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
.commuting-time{
  position: relative;
  .commuting-time-i {
  }
   .inflow {
    position: absolute;
    width: 48px;
    height: 22px;
    left: 10px;
    top: 20px;
     text-align: center;
     line-height: 20px;
    background-color: #2181ea;
    font-size: 12px;
    /*padding: 2px 6px;*/
    border-radius: 2px;
    color: #fff;
     z-index: 1;
     cursor: pointer;
    border: 1px solid #2181ea;
  }
  .outflow {
    position: absolute;
    width: 48px;
    height: 22px;
    left: 70px;
    top: 20px;
    font-size: 12px;
    border-radius: 2px;
    /*padding: 2px 6px;*/
    text-align: center;
    line-height: 20px;
    color: #fff;
    z-index: 1;
    cursor: pointer;
    border: 1px solid #2181ea;
  }
}
</style>

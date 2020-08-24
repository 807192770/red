<template>
  <div id="population-origin">
    <div :id="id" class="population-origin-bar"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "population-origin",
  data() {
    return {
      id:'population-origin-bar',
      colorArr:['#136ee2','#14a2dd', '#ff324f'],
    };
  },
  props: ["dataList"],
  props:{
    dataList: {
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
      this.data = this.addColor(val)
       this.id = this.id + '1';
      if(!this.count) {
        this.id = this.id + '0';
      }
      this.$nextTick(() => {
      this.echartsinit();
    });
    },
    // count(val) {
    //   if(val) {
    //     this.id = "population-origin-bar"
    //     this.id = this.id + '1';
    //     this.$nextTick(() => {
    //       this.echartsinit();
    //     });
    //   }
    // }
  },
  computed: {},
  mounted() {
    this.data = this.addColor(this.dataList)
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
    addColor(val) {
      val.forEach((element,index) => {
        element.itemStyle = {
          color:this.colorArr[index]
        }
      });
      return val
    },
    echartsinit() {
        var that = this;
        var dom = document.getElementById(this.id);
        dom.style.height = this.height + "px";
        var myChart = echarts.init(dom);
        var legenddata = []
        this.dataList.forEach(element => {
            legenddata.push(element.name)
        });
        let option = {
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "6%",
                top:'35',
                containLabel: true
            },  
            xAxis: {
                type: "category",
                data: ['流动人数','居住人数','工作人数'], 
                axisLabel: {
                    interval: 0, //此处关键， 设置文本标签全部显示
                    textStyle: {
                      fontSize: 12,
                      color: "#ffffff"
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
            yAxis: {
                name: '人数(人)',
                type: "value",
                nameTextStyle :{color:'#415d8a'},
                axisLabel: {
                  
                interval: 2,
                    textStyle: {
                      fontSize: 12,
                      color: "#ffffff"
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#214470'
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#163460"
                    }
                }
            },
            series : [
                {
                    name:'人数',
                    type:'bar',
                    barWidth: '30%',
                    data:that.data
                }
            ]
        };
        myChart.setOption(option, true);
    }
  }
};
</script>

<style lang="scss" scoped>
#population-origin {
  .population-origin-bar {
  }
}
</style>
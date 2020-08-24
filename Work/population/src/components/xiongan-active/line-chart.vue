<template>
  <div>
    <div :id="id" class="line-chart" v-if="!isshownodata"></div>
    <no-data :style="{height:height+'rem'}" v-if="isshownodata"/>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import noData from '../../base/no-data/no-data'
  import { htmlSizeFn } from "../../common/set-html-size";
  export default {
    name: 'line-chart',
    data() {
      return {
        id:'line-chart',
        activeData:{},
        htmlSize:0,
        isshownodata:false,
      }
    },
  props:{
    dataList: {
      // type: Object,
      // default: {}
    },
    count: {
      type: Number,
      default: 0
    },
    flag: {
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
      this.dataSort(val)
       if(val.length) {
        this.initEcharts()
        this.isshownodata = false
      }else {
        this.isshownodata = true
      }
      // this.initEcharts()
    },
  },
    computed: {},
    mounted() {
      this.dataSort(this.dataList)
      this.initEcharts()
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
      dataSort(data) {
        var xAxis = []
        var ydata = []
        data.forEach(element => {
          xAxis.push(element.day);
          ydata.push(element.total_num);
        });
        this.activeData.name = xAxis;
        this.activeData.value = ydata;
      },
      echartsinit() {
        var that = this;
        var dom = document.getElementById(this.id);
        dom.style.height = this.height +"rem"
        
        var htmlSize;
        if (that.flag == 1) {
          htmlSize = this.htmlSize * 0.14;
        } else {
          htmlSize = this.htmlSize * 0.16;
        }
        var myChart = echarts.init(dom);
        var option = {
          tooltip: {
          trigger: "axis",
          formatter: function (datas) {
            // console.log(datas)
            return datas[0].axisValue + '<br/>' +  datas[0].value + '(万人)'
          },
          axisPointer: {
            type: "none"
          }
        },
          xAxis: {
              type: 'category',
              data: that.activeData.name,
              "axisLabel": {
              textStyle: {
                fontSize: htmlSize,
                color: '#ffffff'
              },
            },
          },
          grid: {
            left: "1%",
            right: "1%",
            bottom: "0",
            top: "35",
            containLabel: true
          },
          yAxis: {
		        	name: "人口数量(万)",
		        	nameTextStyle: { color: "#415d8a", fontSize: htmlSize },
              type: 'value',
              min : 0,
              splitNumber : 3,
              "axisLabel": {
                textStyle: {
                  fontSize: htmlSize,
                  color: '#ffffff'
                },
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "#102136"
                }
              }
          },
          series: [{
              data: that.activeData.value,
              type: 'line',
              symbol:'circle',    //设定为实心点
              symbolSize: 10,   //设定实心点的大小
              color:['#2cc2ff'],
              center: ["50%", "50%"],
              itemStyle: {
			          normal: {
			            color: "#041529",
			            borderColor: '#2cc2ff',
			            borderWidth: 2,
			            lineStyle:{ 
									  color:'#2cc2ff' //改变折线颜色
									}
			        }
			      },   
          }]
        }
      myChart.setOption(option, true);
    },
  },
  };
</script>

<style lang="scss" scoped>
</style>
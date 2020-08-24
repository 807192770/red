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
      dom.style.height = this.height + "rem";
      var myChart = echarts.init(dom);
      var xAxisdata = this.data.xAxis;
      // console.log(this.data)
      var data1 = this.data.female;
      let num1 = eval(data1.join("+"));
      var data2 = this.data.male;
      let num2 = eval(data2.join("+"));
      let allNum = num1 + num2
      var option = {
        tooltip: {
          trigger: "axis",
          formatter: function(datas) {
            let num;
            num = datas[0].data + datas[1].data
            let proportion = num / allNum * 100
            proportion = proportion.toFixed(2);
            datas.push(proportion)
            let res = datas[0].name + '<br/>';
            for(var i = 0, length = datas.length-1; i < length; i++) {
                res += datas[i].marker + datas[i].seriesName + '：' +  datas[i].data + '<br/>';
              }
            res +='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#01cba6"></span>' + "占比：" + proportion + "%" + '<br/>'
              return res;
            },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: ["男", "女"],
          itemWidth: 8, // 设置宽度
          itemHeight: 8, // 设置高度
          right:'0%',
          top:'5%',
          textStyle: {
            color: "#ffffff",
            fontSize: 12
          }
        },
        grid: {
          left: "3%",
          right: "5%",
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
          name: '人口数量(人)',
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
    }
  }
};
</script>

<style lang="scss" scoped>
#gender-age-r {
  .gender-age-r-bar {
    height: 2.37rem;
  }
}
</style>
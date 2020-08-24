<template>
  <div id="urban-mix">
    <!-- 活跃城市组合 -->
    <div :id="id" class="urban-mix-bar"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import {
  htmlSizeFn
} from "../../common/set-html-size";
export default {
  name: "urban-mix",
  data() {
    return {
      id: 'urban-mix-bar',
      urbanMixData: {
        name: [],
        data: []
      }
    };
  },
  props: ['dataList', 'count', 'height', 'flag'],
  watch: {
    count(val) {
      if (val > 0) {
        this.id = "urban-mix-bar"
        this.id = this.id + '1';
        this.$nextTick(() => {
          this.initData();
        });
      }
    },
    dataList(val) {
      this.initData(val)
      this.echartsinit()
    },
  },
  mounted() {
    this.htmlSize = htmlSizeFn();
    if (!this.count) {
      this.id = this.id + '0';
    } else {
      this.id = this.id + '1';
    }
    if (this.dataList.length) {
      this.initData(this.dataList)
    }
    this.$nextTick(() => {
      this.echartsinit()
    });
  },
  methods: {
    initData(val) {
      // 城市组合
      var arr = this.flag == 0 ? val.slice(0, 5) : val;
      this.urbanMixData.name = [];
      this.urbanMixData.data = [];
      arr.forEach(item => {
        this.urbanMixData.name.push(item.cityCombination)
        this.urbanMixData.data.push(item.relationCnt)
      })
    },
    echartsinit() {
      var that = this;
      var dom = document.getElementById(this.id);
      dom.style.height = this.height + "rem";
      var myChart = echarts.init(dom);
      var option = {
        calculable: true,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (params) {
            return params[0].axisValue + "<br/>联系人次：" + params[0].value +
              '人';
          }
        },
        legend: {},
        grid: {
          left: '80',
          right: '4%',
          bottom: '25%',
          top: this.flag == 0 ? '20%' : "10%",
          containLabel: false
        },
        xAxis: {
          type: 'category',
          data: this.urbanMixData.name,
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: '#ffffff',
            },
            interval: 0,
            margin: 16,
            formatter: function (params) {
              var newParamsName = ""; // 最终拼接成的字符串
              var paramsNameNumber = params.length; // 实际标签的个数
              var provideNumber = 4; // 每行能显示的字的个数
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
              /**
               * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
               */
              // 条件等同于rowNumber>1
              if (paramsNameNumber > provideNumber) {
                /** 循环每一行,p表示行 */
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = ""; // 表示每一次截取的字符串
                  var start = p * provideNumber; // 开始截取的位置
                  var end = start + provideNumber; // 结束截取的位置
                  // 此处特殊处理最后一行的索引值
                  if (p == rowNumber - 1) {
                    // 最后一次不换行
                    tempStr = params.substring(start, paramsNameNumber);
                  } else {
                    // 每一次拼接字符串并换行
                    tempStr = params.substring(start, end) + "\n";
                  }
                  newParamsName += tempStr; // 最终拼成的字符串
                }

              } else {
                // 将旧标签的值赋给新标签
                newParamsName = params;
              }
              //将最终的字符串返回
              return newParamsName
            }

          },
          axisLine: {
            lineStyle: {
              color: '#214470',
            }
          }
        },
        yAxis: {
          show: true,
          name: '流动人次(人)',
          nameLocation: 'end',
          nameTextStyle: {
            color: "#2765A6",
            fontSize: 12,
            padding: [0, 0, 0, -70]
          },
          type: 'value',
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: '#ffffff'
            },
          },
          axisLine: {
            lineStyle: {
              color: '#214470',
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#214470'
            }
          },
          axisTick: {
            show: false
          },
          splitNumber: 4
        },
        series: [{
            type: 'bar',
            data: this.urbanMixData.data,
            barWidth: 42,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "#05DEFF"
                  },
                  {
                    offset: 0.5,
                    color: "#2181EA"
                  },
                  {
                    offset: 1,
                    color: "#2181EA"
                  }
                ])
              }
            },
          },

        ]
      };
      myChart.setOption(option, true);
    },
  }
}

</script>
<style lang='scss' scoped>
  #urban-mix {
    .urban-mix-bar {}
  }

</style>

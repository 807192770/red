<template>
  <div class="charts-container">
    <div class="header">
      <h2 class="title">报警详情</h2>
      <p v-if="info.alert" class="describe">{{ info.alert.message }}</p>
    </div>
    <!--<div id="line-charts" class="line-charts" ></div>-->
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'LineCharts',
  props: ['info'],
  data() {
    return {}
  },
  watch: {
    info(n) {
      if (n.isChart != 0) {
        this.$nextTick(() => {
          this.echartsinit(n)
        })
      }
    }
  },
  mounted() {},
  methods: {
    echartsinit(n) {
      console.log(n)
      const that = this
      const dom = document.getElementById('line-charts')
      const myChart = echarts.init(dom)
      const option = {
        backgroundColor: '#fff',
        grid: {
          top: '10%',
          left: '5%',
          right: '5%',
          bottom: '15%'
        },
        tooltip: {
          //   trigger: "xAxis", //若需要使用默认的『显示』『隐藏』触发规则，则可以去掉trigger的配置
          axisPointer: {
            type: 'cross',
            show: true
          },
          formatter: '{a}{b}{c}' // 默认触发规则中散点展示的内容，{a}标题;{b}X坐标;{c}Y坐标
        },
        toolbox: {
          right: '4%',
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line'] },
            restore: { show: true },
            saveAsImage: { show: true },
            dataZoom: { show: true },
            dataView: { show: true }
          }
        },
        dataZoom: [
          {
            type: 'slider' // 显示拖拽功能,X轴下的时间长度数据
          }
        ],
        legend: {
          data: ['合相功率因数'],
          left: 'center'
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '00：00',
              '01：00',
              '02：00',
              '03：00',
              '04：00',
              '05：00',
              '06：00',
              '07：00',
              '08：00',
              '09：00',
              '10：00',
              '11：00',
              '12：00',
              '13：00',
              '14：00',
              '15：00',
              '16：00',
              '17：00',
              '18：00',
              '19：00',
              '20：00',
              '21：00',
              '22：00',
              '23：00'
            ],
            boundaryGap: false,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#005F97'
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: '#005F97'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#005F97'
              }
            },

            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '合相功率因数',
            type: 'line',
            smooth: true,
            data: [
              10,
              20,
              39,
              40,
              45,
              50,
              45,
              60,
              52,
              66,
              65,
              60,
              10,
              20,
              39,
              40,
              45,
              50,
              45,
              60,
              52,
              66,
              65,
              60
            ],
            markPoint: {
              data: [
                {
                  name: '最大值',
                  type: 'max'
                },
                {
                  name: '最小值',
                  type: 'min'
                },
                {
                  name: '某个坐标',
                  coord: [10, 20]
                }
              ]
            }
          }
        ]
      }
      myChart.setOption(option, true)
    }
  }
}
</script>

<style lang="scss" scoped>
.charts-container {
  .header {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    h2 {
      font-size: 18px;
      font-weight: 900;
      margin-right: 20px;
      width: 150px;
    }
    .describe {
      flex: 1 1 auto;
      min-width: 0;
    }
  }
  .line-charts {
    height: 450px;
  }
}
</style>

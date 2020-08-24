<template>
  <div id="urban-mix">
    <!-- 活跃城市组合 -->
    <div :id="id" class="urban-mix-bar"></div>
  </div>
</template>

<script>
  import echarts from "echarts";
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
        if (val) {
          this.initData(val)
          this.echartsinit()
        }
      },
    },
    mounted() {
      if (!this.count) {
        this.id = this.id + '0';
      } else {
        this.id = this.id + '1';
      }
      if (this.dataList) {
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
            }
          },
          legend: {},
          grid: {
            left: '70',
            right: '4%',
            bottom: '18%',
            top: '20%',
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
              interval: 1,
              margin:16,
            },
            axisLine: {
              lineStyle: {
                color: '#214470',
              }
            }
          },
          yAxis: {
            show: true,
            name: '联系人次',
            nameLocation: 'end',
            nameTextStyle: {
              color: "#2765A6",
              fontSize: 12,
              padding: [0, 0, 0, -60]
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
            splitNumber:4
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
    .urban-mix-bar {
    }
  }

</style>

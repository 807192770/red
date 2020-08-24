<template>
  <div id="visited-days">
    <div :id="id" class="visited-days-bar"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "visited-days",
  data() {
    return {
      id: "visited-days-bar",
      data: {},
      name: [],
      num: [],
      percen: [],
      timer: null
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
    count(val) {
      if (val > 0) {
        this.id = "visited-days-bar";
        this.id = this.id + "1";
        this.$nextTick(() => {
          this.echartsinit();
        });
      }
    },
    dataList(val) {
      this.data = val;
      this.initData();
      this.$nextTick(() => {
        this.echartsinit();
      });
    }
  },
  computed: {},
  mounted() {
    if (!this.count) {
      this.id = this.id + "0";
    } else {
      this.id = this.id + "1";
    }
    if (this.dataList.length) {
      this.data = this.dataList;
      this.initData();
    }
    this.$nextTick(() => {
      this.echartsinit();
    });
  },

  components: {},
  methods: {
    initData() {
      var that = this;
      that.name = [];
      that.num = [];
      that.percen = [];
      that.data.forEach(item => {
        that.name.push(item.days + "天");
        that.num.push((item.visitors / 10000).toFixed(2));
        that.percen.push(item.rate + "%");
      });
    },
    echartsinit() {
      var that = this;
      var dom = document.getElementById(this.id);
      dom.style.height = this.height + "rem";
      var myChart = echarts.init(dom);

      let i = 0,
        temp1 = [],
        temp2 = [],
        temp3 = [];

      if (this.timer != null) {
        clearInterval(this.timer);
      }

      this.timer = setInterval(() => {
        if (i === 10) i = 0;
        if (i % 2 === 1) {
          temp1 = that.name.splice(0, 1);
          temp2 = that.num.splice(0, 1);
          temp3 = that.percen.splice(0, 1);
        } else {
          that.name = that.name.concat(temp1);
          that.num = that.num.concat(temp2);
          that.percen = that.percen.concat(temp3);
          var option = {
            calculable: true,
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow"
              },
              formatter(params) {
                var days = params[0].name; //天
                var person =
                  "<br><span style='color:#fff;'>人数：" +
                  params[0].data +
                  "万人</span>"; //人数
                var percen =
                  "<br><span style='color:#fff;'>占比：" +
                  params[1].data +
                  "</span>"; //占比
                var res = days + person + percen;
                return res;
              }
            },
            grid: {
              left: "70",
              right: "10%",
              bottom: "5%",
              top: "15%",
              containLabel: false
            },
            xAxis: {
              name: "人数(万)",
              position: "top",
              nameLocation: "middle",
              nameTextStyle: {
                color: "#2765A6",
                padding: [0, 0, 15, 0],
                align: "center"
              },
              type: "value",
              boundaryGap: [0, 0.01],
              axisLabel: {
                textStyle: {
                  fontSize: 12,
                  color: "#ffffff"
                }
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: "#ffffff"
                }
              },
              axisTick: {
                show: false
              }
            },
            yAxis: [
              {
                type: "category",
                data: that.name,
                inverse: true,
                name: "天数",
                nameLocation: "end",
                nameTextStyle: {
                  color: "#2765A6",
                  padding: [-10, 0, 0, -40]
                },
                axisLabel: {
                  textStyle: {
                    fontSize: 12,
                    color: "#ffffff"
                  }
                },
                axisTick: {
                  show: false
                }
              },
              {
                type: "category",
                show: false,
                data: that.percen,
                inverse: true,
                name: "占比",
                nameLocation: "end",
                nameTextStyle: {
                  color: "#2765A6",
                  padding: [-10, -40, 0, 0]
                },
                axisLabel: {
                  textStyle: {
                    fontSize: 12,
                    color: "#ffffff"
                  }
                },
                axisTick: {
                  show: false
                }
              }
            ],
            series: [
              {
                name: "人数",
                type: "bar",
                data: that.num,
                barWidth: 8,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "#2181ea"
                      },
                      {
                        offset: 0.5,
                        color: "#40ffd1"
                      },
                      {
                        offset: 1,
                        color: "#40ffd1"
                      }
                    ])
                  }
                }
              },
              {
                name: "占比",
                type: "bar",
                data: that.percen
              }
            ]
          };
          myChart.setOption(option, true);
        }
        i++;
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
#visited-days {
  .visited-days-bar {
  }
}
</style>

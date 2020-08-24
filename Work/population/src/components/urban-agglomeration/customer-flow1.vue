<template>
  <div id="customer-flow">
    <!-- 活跃城市客流量 -->
    <div class="selectBox">
      <div class="item">
        <el-select v-model="val.valueFrom" placeholder="请选择" icon='el-icon-caret-bottom' popper-class='subSelect'>
          <el-option v-for="item in this.startList" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="tips"></div>
      <div class="item">
        <el-select v-model="val.valueTo" placeholder="请选择" icon='el-icon-caret-bottom' popper-class='subSelect'>
          <el-option v-for="item in this.endList" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>
      <button class="subButton" @click="submit">确定</button>
    </div>
    <div :id="id" class="customer-flow-bar"></div>
  </div>
</template>

<script>
  import echarts from "echarts";
  import $ from "jquery";
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: "customer-flow",
    data() {
      return {
        id: 'customer-flow-bar',
        dataTime: [],
        legendName: [],
        dataVal: {
          dataValOne: [],
          dataValTwo: [],
        },
        val: {
          valueFrom: '',
          valueTo: ''
        },
        list: [],
        startList: [],
        endList: [],
        fakeData: {},
        data: {}
      };
    },

    props: ['count', 'height', 'flag'],
    computed: {
      ...mapGetters([
        'customerFlowList',
        'selectValue1',
        'selectList'
      ]),
    },
    watch: {
      customerFlowList(val, val2) {
        // this.initData(val)
        // this.echartsinit()
      },
      count(val) {
        if (val > 0) {
          this.id = "customer-flow-bar"
          this.id = this.id + '1';
          this.$nextTick(() => {
            this.initData(this.customerFlowList);
            this.echartsinit()
          });
        }
      },
      // selectValue1: {
      //   handler(newName, oldName) {
      //     if (Object.keys(newName).length != 0) {
      //       this.val.valueFrom = newName[0]
      //       this.val.valueTo = newName[1]
      //     }
      //   },
      //   immediate: true,
      //   deep: true
      // },
      selectList(val) {
        this.list = val
      },
      'val.valueFrom': function (val, val2) {
        this.endList = [];
        this.endList = this.list.filter(item => item != val)
      },
      'val.valueTo': function (val, val2) {
        this.startList = [];
        this.startList = this.list.filter(item => item != val)
      },
    },
    mounted() {
      this.getData();
      if (!this.count) {
        this.id = this.id + '0';
      } else {
        this.id = this.id + '1';
      }
      // if (Object.keys(this.customerFlowList).length) {
      //   this.initData(this.customerFlowList)
      // }
      this.$nextTick(() => {
        this.echartsinit()
      });
      this.initSelect();
    },
    methods: {
      initData(val) {
        this.dataTime = [];
        this.legendName = [];
        this.dataVal.dataValOne = [];
        this.dataVal.dataValTwo = [];
        val.forward.forEach(item => {
          this.dataTime.push(item.statisHour)
          this.dataVal.dataValOne.push(item.relationCnt)
        })
        val.reverse.forEach(item => {
          this.dataVal.dataValTwo.push(item.relationCnt)
        })
        if (val.forward.length) {
          var line1 = val.forward[0].arrivalCity + '→' + val.forward[0].startingCity;
          var line2 = val.forward[0].startingCity + '→' + val.forward[0].arrivalCity;
          this.legendName.push(line2, line1)
        }
      },
      echartsinit() {
        var that = this;
        var dom = document.getElementById(this.id);
        dom.style.height = this.height + "rem";
        var myChart = echarts.init(dom);
        var option = {
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              return params[0].axisValueLabel + '<br/>' + params[0].seriesName + ': ' + params[0].value +
                '人<br/>' +
                params[1].seriesName + ': ' + params[1].value + '人';
            }
          },
          legend: {
            data: this.legendName,
            orient: 'horizontal',
            right: 0,
            // top: 0,
            textStyle: {
              color: '#ffffff',
              fontWeight: 'normal',
              fontSize: 12
            },
            icon: 'roundRect',
            itemWidth: 16,
            borderRadius: 2,
            itemHeight: 4,
          },
          grid: {
            left: '80',
            right: '4%',
            bottom: '20%',
            top: this.flag == 0 ? '25%' : "15%",
            containLabel: false
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.dataTime,
            axisLabel: {
              textStyle: {
                fontSize: 12,
                color: '#ffffff',
              },
              showMaxLabel: 'true',
              interval: 2,
              margin: 16,
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
            splitNumber: 3
          },
          series: [{
              name: this.legendName[0],
              type: 'line',
              data: this.dataVal.dataValOne,
              symbolSize: 6,
              symbol: "circle",
              itemStyle: {
                normal: {
                  color: "#2181EA", // 会设置点和线的颜色，所以需要下面定制 line
                }
              },
              lineStyle: {
                normal: {
                  color: "#2181EA" // 线条颜色
                }
              }
            },
            {
              name: this.legendName[1],
              type: 'line',
              data: this.dataVal.dataValTwo,
              symbolSize: 6,
              symbol: "circle",
              itemStyle: {
                normal: {
                  color: "#F45B5B", // 会设置点和线的颜色，所以需要下面定制 line
                }
              },
              lineStyle: {
                normal: {
                  color: "#F45B5B" // 线条颜色
                }
              }
            }
          ],
        };

        myChart.setOption(option, true);
      },
      submit(val) {
        this.$emit('getGrandSonData', this.val)
      },
      initSelect() {
        this.list = this.selectList
        this.endList = this.list.filter(item => item != this.val.valueFrom)
        this.startList = this.list.filter(item => item != this.val.valueTo)
      },
      getData() {
        var that = this
        $.get('../../../static/map-json/bannerData.json', function (Json) {
          that.fakeData = Json
          that.initData(Json[0])
          that.val.valueFrom = Json[0].forward[0].startingCity
          that.val.valueTo = Json[0].forward[0].arrivalCity
          that.echartsinit()
        });
        // for (let i = 0; i < 3; i++) {
        //   console.log(i)
        //   setTimeout(function () {
        //     console.log(i)
        //     that.data = that.fakeData[i]
        //     that.val.valueFrom = that.data.forward[0].startingCity
        //     that.val.valueTo = that.data.forward[0].arrivalCity
        //     that.initData(that.data)
        //     that.echartsinit()
        //   }, i * 3000);
        // }

        var i = 0;
        function mySetInterval(fn, millisec) {
          function interval() {
            setTimeout(interval, millisec);
            fn();
          }
          setTimeout(interval, millisec)
        }
        mySetInterval(function () {
          if (i == 2) {
            i = 0;
          }
           that.data = that.fakeData[i]
            that.val.valueFrom = that.data.forward[0].startingCity
            that.val.valueTo = that.data.forward[0].arrivalCity
            that.initData(that.data)
            that.echartsinit()
          i++
        }, 3000)
      }
    }
  }

</script>
<style lang='scss' scoped>
  #customer-flow {
    .customer-flow-bar {}

    .selectBox {
      display: flex;
      margin-top: 20px;
      padding: 0 24px;

      .item /deep/ {
        .el-select {
          position: relative;

          &::after {
            content: '';
            display: block;
            width: 0;
            height: 0;
            border-bottom: 7px solid transparent;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 7px solid #4B8CD3;
            position: absolute;
            right: 5px;
            top: 8px;
          }

          .el-input__inner {
            width: 100px;
            height: 24px;
            background: #213148;
            border: 1px solid #4B8CD3;
            color: #fff;
            font-size: 12px;
            line-height: 24px;
            border-radius: 2px;
            padding-right: 20px;
          }

          .el-select-dropdown {
            .el-select-dropdown__item {
              height: 24px;
              line-height: 24px;
            }
          }

          .el-input__suffix {
            display: none;
          }
        }
      }

      .tips {
        line-height: 24px;
        margin: 0 5px;
      }

      .subButton {
        height: 24px;
        background: #4B8CD3;
        border-radius: 2px;
        font-size: 12px;
        border: none;
        cursor: pointer;
        color: #fff;
        margin-left: 5px
      }
    }
  }

</style>
<style>
  .el-select-dropdown.subSelect {
    background: #213148 !important;
    border: 1px solid #072344 !important;
  }

  .el-select-dropdown.subSelect .popper__arrow {
    border-bottom-color: #213148 !important;
    border-top-color: #213148 !important;
  }

  .el-select-dropdown.subSelect .popper__arrow::after {
    border-bottom-color: #213148 !important;
    border-top-color: #213148 !important;
  }

  .el-select-dropdown.subSelect .el-select-dropdown__item {
    height: 30px !important;
    line-height: 30px !important;
    color: #6B89BD;
    width: 1.2rem;
    font-size: 12px;
  }

  .el-select-dropdown.subSelect .el-select-dropdown__item.hover,
  .el-select-dropdown.subSelect .el-select-dropdown__item:hover {
    color: #fff;
    background: #2170ca;
  }

</style>

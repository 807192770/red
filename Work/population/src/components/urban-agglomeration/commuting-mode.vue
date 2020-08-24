<template>
  <div id="commuting-mode">
    <!-- 通勤方式 -->
    <div class="selectBox">
      <div class="item">
        <el-select v-model="val.valueFrom" placeholder="请选择" icon='el-icon-caret-bottom' popper-class='subSelect'>
          <el-option v-for="item in this.startList" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="tips" @click="changeCity"><img src="../../assets/images/change.png" alt=""></div>
      <div class="item">
        <el-select v-model="val.valueTo" placeholder="请选择" icon='el-icon-caret-bottom' popper-class='subSelect'>
          <el-option v-for="item in this.endList" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>
      <button class="subButton" @click="submit">确定</button>
    </div>
    <div :id="id" class="commuting-mode-bar"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import {
  mapGetters
} from 'vuex'
export default {
  name: "commuting-mode",
  data() {
    return {
      id: 'commuting-mode-bar',
      arrData: [],
      arrType: [],
      data: [],
      pathSymbols: {
        '飞机': 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHOSURBVHgB7ZfvWcJADMbf43EAnEC6gU6gbgATgBOgE6ATqBOAG+gE1AnoBm0noC5gTK6F/gHba+lVP/T3PC0lzfVekjR3AD09Pf8Fn1YIiJLD5+9j/Ck+DbWQVBQhpAWssJuoagKfbnKC0miN0BIDfSZ8Jp+PpaIc5bLPa8E6goKIukdrggB3b6kSBb4PeAdWhWcet2wnWvKQYiqs1Uc5Sp+lDiT03eHxzO/4xhuXQZC9sauhD3TLpS4NhTVnZ5a9ofZXce7F6Rpl0SI4yUi/9nX+Oed8HrN9wYfL0XqSaA32DhI6R80wUg4737ElgF2GPN+K57plMSqJ1liVDpG+A8zYeYpuiJSRm2k6T0VhZSYoixShwhxSmGZEmSPgsRGn6AtxSaR2+eSyOUNdJO8hXXDufxMU6BqUrt6AAeoiDZN0tz5ElhXClRYTN9u13SYrDz5cXOXYJC9AvCuI/bY5H0PMU3Y8MpGOiqNSu8KSbfm9EnGPaZXjkVm3ue04Rcy28VYjpHlmk7cpLhvdIpMfq7/Cj6v/ljUl7l2V9vqNsSnVb5rHxT+xKyikKU/yAllIzXDtCmqw8bNdQ6aR2eHZFUR4gPm+Sv7RTNDTcyI/s1E6EAy001MAAAAASUVORK5CYII=',
        '火车': 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEESURBVHgB7ZbhDYIwEIVfiQPoBNYNdAQnMY7gBOoGugGO4AQyAhtQN2ACzyuKoiDQ/vES+iWEa+hrH9e0PSAQCAwMhSutQDhwPO6pMazaYapORaufPmVNjBvOmCmDVkOGMn5ruJFDq8nDnpPesPk1m0p+dYjgbsZSzYZGfzSn4MJZ3aLF0LOrUsXTt12bykFPvOQ2sxnp72FG+ActPxZBGOIM2V1G8KFMu6++CcJSVoYUttKWbC7N0Djssi6kGUplGSIcJRkyXAXE1lAOd0wl9tHXx+ND0QYRBxt8TtBFzpr9q+Wur5IUYxEWXYVboORdl/iVsr4YvpxnTR/EHYyBQGBw3AHPmkPtzu9XWQAAAABJRU5ErkJggg==',
        '长途客车': 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHNSURBVHgB1ZeBVYMwEIb/8DpA3YBuoBNYJ1An8DmBOkHtBHYDdQM3ECewG5BOUCbwvAR4tpCQFAlNv/cohByXn+OaXARc5DRHgmsQbriVoh9rCD5+sMRMyC5DAbuQKQtZsJBHDInAqhJWmLttYgQ++eocYVjzi16ZRCVGcxWZcGKgfZdjeJBTCknE5zcdqaFR/pXvcoy5+4ENvVbGKUKhXrQcY+U2lvStjX2QlGvb/SP3fNbTtnYcGss4ZVJvaMGd21GEOEhYzAv/BZ/5evgE9qGM1FbrgJqHVEOJIcz0LFpHKRUCITF9DcIyQR0Zx5QeDPXiKhgKgYcEMfAXjGkcgnaITtCED4mImHBSzRAHUv1MEAtVYKLMoW7KBTC19Q79yX0ilPbs64U7QqGXkAZ2QUda+U8qqQte9N6hFl+BS/w/XyT7yXgLtOHznc2fXRDhYq8CKGvsuT78BBZs98ECvvg6a/jKqm1Wi3bC1rlDOLNt5rQ4ge56uK6vbFjqLnsOde+bUrgx26gdR1UdmrBHaCy8I3QkTIIKjIds3mgLIjxhnBpJTSvL5k37smDKpb7LyAG+TqqmzhrtNfqT+fqyCyLc7zyYcfsWfTnA1y/Sn89P1q9HMQAAAABJRU5ErkJggg==',
        '小汽车': 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAH8SURBVHgB7Zf7VcIwFMa/9PC/dYN0AnUD3AAnkA2UCYAJdAPZQJ1ANrBO0DABdQHjvUnfp4U+0cPp75yUpuTx5T6SFhgZOTNErVaBlnTl4kYFhfsiYVQYlTzzhI9OgliIwEdm4JDqdqIffCOdtIgLBxfmTpuFMDKq35IwhVbs9AuJekRfBHplxmzZWULpfeSuvgS5NGZgfitwDnSfkXve2pu3BE+E5LJ3umthdbsSib4J9LWxfAUTc93pJSlfwQbtMwXsjiX1ap0YzjSlfRI2o5pP83FMTc18FPA2y5TWhW6cPS6GZQubeTJ5orF24ptC46HFMNOcGLutbNJ9KN1zJE6Lyu5NIiPmE6exTBmcfTcsyrpM4AlW6R2VBax/h2Zr5mLr8Nw2uJEGtYaXyyqb8itqcY8+EdhQFq8Lc7n0PIAUl5NM0/y5ZDvMqTGrX6IPOHmkWJX8kxzU6U7tkNvKNkLPDLBFV9gyXokYto6TLrhqH6qCrejTSr/Mry1hYv78a8qURr+CTe96SCHqCvKjYPfNedSUQM8jt0v0IkjjspWQvCgO3D2OCHJQD4nuyDqNJnUa0cpeaYV8vCg0OXRtTMXx9FCnS9OgHpaMy7rFRz8ovsSn/QLp18FfEJa8cfwP0tePsjiSot53W1MOzJVNe1XshuFQR+ojI+fDL2lcw8PSkMIfAAAAAElFTkSuQmCC',
        '步行': 'path://M29.902,23.275c1.86,0,3.368-1.506,3.368-3.365c0-1.859-1.508-3.365-3.368-3.365 c-1.857,0-3.365,1.506-3.365,3.365C26.537,21.769,28.045,23.275,29.902,23.275z M36.867,30.74c-1.666-0.467-3.799-1.6-4.732-4.199 c-0.932-2.6-3.131-2.998-4.797-2.998s-7.098,3.894-7.098,3.894c-1.133,1.001-2.1,6.502-0.967,6.769 c1.133,0.269,1.266-1.533,1.934-3.599c0.666-2.065,3.797-3.466,3.797-3.466s0.201,2.467-0.398,3.866 c-0.599,1.399-1.133,2.866-1.467,6.198s-1.6,3.665-3.799,6.266c-2.199,2.598-0.6,3.797,0.398,3.664 c1.002-0.133,5.865-5.598,6.398-6.998c0.533-1.397,0.668-3.732,0.668-3.732s0,0,2.199,1.867c2.199,1.865,2.332,4.6,2.998,7.73 s2.332,0.934,2.332-0.467c0-1.401,0.269-5.465-1-7.064c-1.265-1.6-3.73-3.465-3.73-5.265s1.199-3.732,1.199-3.732 c0.332,1.667,3.335,3.065,5.599,3.399C38.668,33.206,38.533,31.207,36.867,30.74z',
        '其他': 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJ4SURBVHgB7VbtmdMwDJbz8J9jAtIJKBtkA7rBdYOGCa5McMcElAkIE1yZoGWC5CZoJ8BIluLIOTsO8IP7kfd50iaR/ErWhyOABQsWLPi/MNG3ra1Qcod3a7xulOSMVwcWvuP/EVamS6wv8XcDBbxD3Uo4ep6rW0scK3PIO/Rk71B5D/NwRt3PzgAZKmAnDlSzVhu089Z8Cl9p0M4MtO7eAikefBRaSzssgaJm4IMY1dG7go6CgQZ+wU9xtkOeq7dB0TNwL3beeNkzUKo6a/F6hBzIwc62oq+vE8rW2fWkR/pkU6EYqfWe3kxxubRyJEv3bDCSFr6KlCL46HT+GbzrS8xzkZd+Z3x9kxQM8tYelLwN5CGPdbZmOLWPpu3J7ryzbKia4NiodF7wuR5xfXEy+p/hkI5SLQT3ftetfZACz/OQbr+uTyFvLB29BFntd0dpSe2UDdyKXuvu01xWcdHGtvBH0LtjZ+KdE3baJcG1Vum2riwSKCAtmVFwDuOzKI8CXqdFMVA4h9O6cUYNnKIps/AR6OAjZ/gwDUE1Q2vZ8Ub06ihXwpnSp6FfNHSedQU+t6jHzcDva1UGeZ5kSzKRbvvNhDPVZNvTkZKpJa3ct3wZMVQGRUxOjw9G3Un8GSkTDs+I0qB4gilwCi+BY31kB0P7SY7hWxZ07yv4G6zMHokaLFZK6xqLdKtN4fP79BfcI/rdHI8f1E3c7tw9TWT8qGTw2kA4dI3b/yiDHA91evwo4NZ3sYWVHvSeD2gUap4W54CM/sD/B3GIJs0d8KSZBx0TFG2F1Ai7jQxhV+DB6yiDV5MZYSvhKEcOEs9ZnDnCggULFrww/AbKSTg3zvv46AAAAABJRU5ErkJggg=='
      },
      symbolSize: {
        '飞机': [40, 40],
        '火车': [40, 40],
        '长途客车': [36, 36],
        '小汽车': [36, 36],
        '步行': [20, 30],
        '其他': [40, 40],
      },
      val: {
        valueFrom: '',
        valueTo: ''
      },
      list: [],
      startList: [],
      endList: []
    };
  },
  props: ['count', 'height', 'flag'],
  computed: {
    ...mapGetters([
      'commutingModeList',
      'selectValue2',
      'selectList'
    ]),
  },
  watch: {
    count(val) {
      if (val > 0) {
        this.id = "commuting-mode-bar";
        this.id = this.id + '1';
        this.$nextTick(() => {
          this.initData();
        });
      }
    },
    commutingModeList(val, val2) {
      if (val != val2) {
        this.initData(val);
        this.echartsinit();
      }
    },
    selectValue2: {
      handler(newName, oldName) {
        if (Object.keys(newName).length != 0) {
          this.val.valueFrom = newName[0];
          this.val.valueTo = newName[1];
        }
      },
      immediate: true,
      deep: true
    },
    selectList(val) {
      this.list = val;
    },
    'val.valueFrom': function (val, val2) {
      this.endList = [];
      this.endList = this.list.filter(item => item != val);
    },
    'val.valueTo': function (val, val2) {
      this.startList = [];
      this.startList = this.list.filter(item => item != val);
    },
  },
  mounted() {
    if (!this.count) {
      this.id = this.id + '0';
    } else {
      this.id = this.id + '1';
    }
    if (this.commutingModeList.length) {
      this.initData(this.commutingModeList);
    }
    this.$nextTick(() => {
      this.echartsinit();
    });
    this.initSelect();
  },
  methods: {
    initData(val) {
      this.arrData = [];
      this.arrType = [];
      this.data = [];
      val.sort(this.compare('relationCnt')); //排序
      val.forEach((item, i) => {
        if (item.trvType != "步行") {
          this.arrData.push(item.relationCnt);
          this.arrType.push(item.trvType);
        }
      });
      for (let i = 0; i < this.arrData.length; i++) {
        this.data.push({
          value: this.arrData[i],
          symbol: this.pathSymbols[this.arrType[i]],
          symbolSize: this.symbolSize[this.arrType[i]]
        })
      };
    },
    echartsinit() {
      var that = this;
      var dom = document.getElementById(this.id);
      dom.style.height = this.height + "rem";
      var myChart = echarts.init(dom);

      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: function (params) {
            return params[0].name + '：' + params[0].value + '次';
          }
        },
        grid: {
          left: '80',
          right: '4%',
          bottom: '20%',
          top: this.flag == 0 ? '29%' : "10%",
          containLabel: false
        },
        xAxis: {
          data: this.arrType,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#fff'
            },
            margin: 16,
          }
        },
        yAxis: {
          show: true,
          name: '次数(次)',
          nameTextStyle: {
            color: "#2765A6",
            fontSize: 12,
            padding: [0, 0, 0, -60]
          },
          splitLine: { //刻度
            show: false
          },
          axisTick: { //坐标轴刻度
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#214470',
            }
          },
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: '#ffffff'
            },
          },
          splitArea: { //主体渐变
            show: false
          }
        },
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "#05DEFF"
          },
          {
            offset: 1,
            color: "#2181EA"
          }
        ]),
        series: [{
          name: 'hill',
          type: 'pictorialBar',
          barCategoryGap: '-20%',
          symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
          itemStyle: {
            normal: {
              opacity: 0.5
            },
            emphasis: {
              opacity: 1
            }
          },
          data: this.arrData,
          z: 10
        }, {
          name: 'glyph',
          type: 'pictorialBar',
          barGap: '-100%',
          symbolPosition: 'end',
          symbolSize: 50,
          symbolOffset: ['0', '-120%'],
          data: this.data
        }]
      };
      myChart.setOption(option, true);
    },
    compare(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
      }
    },
    submit(val) {
      this.$emit('getGrandSonData', this.val)
    },
    initSelect() {
      this.list = this.selectList
      this.endList = this.list.filter(item => item != this.val.valueFrom)
      this.startList = this.list.filter(item => item != this.val.valueTo)
    },
    changeCity() {
      [this.val.valueFrom, this.val.valueTo] = [this.val.valueTo, this.val.valueFrom]
    },
  }
}

</script>
<style lang='scss' scoped>
  #commuting-mode {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .commuting-mode-bar {
      width: 100%
    }

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
        margin: 0 5px;
        cursor: pointer;

        img {
          height: 24px;
        }
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

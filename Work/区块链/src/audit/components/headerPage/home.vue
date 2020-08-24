<template>
  <div id="home">
    <div class="top-box">
      <div class="sub-top-box">
        <div class="title">数据消费请求态势</div>
        <div id="container" class="charts"></div>
      </div>
      <div class="sub-top-box">
        <div class="title">安全事件整体态势</div>
        <div id="secure" class="charts"></div>
      </div>
    </div>
    <div class="mid-box">
      <div class="sub-mid-box">
        <div class="title">申请统计</div>
        <div class="charts" id="apply"></div>
      </div>
      <div class="sub-mid-box" id="interface">
        <!-- 接口状态 -->
        <div class="title">接口状态</div>
        <div class="tag-box">
          <span class="tag-icon-right">正常</span>
          <span class="tag-icon-wrong">异常</span>
        </div>
        <div class="con-box">
          <span
            v-for="(item,index) in interfaceData"
            class="tag-icon"
            :class="item.status==1?'tag-icon-right':item.status==0?'tag-icon-wrong':''"
            :key="index"
          >{{item.nodeName}}</span>
        </div>
      </div>
      <div class="sub-mid-box">
        <!-- 目录区块信息 -->
        <div class="title">目录区块信息</div>
        <div class="con-sub-box">
          <div class="icon-mid">
            <div class="icon-mid-left">
              <img src="../../../assets/images/base/home/total.png" />
            </div>
            <div class="icon-mid-right">
              <span class="icon-right-up">{{txCount||0}}</span>
              <span class="icon-right-bot">交易总数</span>
            </div>
          </div>
          <div class="icon-mid">
            <div class="icon-mid-left">
              <img src="../../../assets/images/base/home/user.png" />
            </div>
            <div class="icon-mid-right">
              <span class="icon-right-up">{{userTotalNum||0}}</span>
              <span class="icon-right-bot">用户总数量</span>
            </div>
          </div>
        </div>
        <div class="con-sub-box">
          <div class="icon-mid">
            <div class="icon-mid-left">
              <img src="../../../assets/images/base/home/block.png" />
            </div>
            <div class="icon-mid-right">
              <span class="icon-right-up">{{blockHeight||0}}</span>
              <span class="icon-right-bot">区块高度</span>
            </div>
          </div>
          <div class="icon-mid">
            <div class="icon-mid-left">
              <img src="../../../assets/images/base/home/onLine.png" />
            </div>
            <div class="icon-mid-right">
              <span class="icon-right-up">{{loggedUserTotalNum||0}}</span>
              <span class="icon-right-bot">当前在线用户</span>
            </div>
          </div>
        </div>
        <div class="con-sub-box">
          <div class="icon-mid">
            <div class="icon-mid-left">
              <img src="../../../assets/images/base/home/city.png" />
            </div>
            <div class="icon-mid-right">
              <span class="icon-right-up">{{cityNum||0}}</span>
              <span class="icon-right-bot">城市节点总数</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bot-box">
      <div class="sub-bot-box">
        <div class="title">职责目录</div>
        <div id="duty" class="charts"></div>
      </div>
      <div class="sub-bot-box">
        <div class="title">数据目录</div>
        <div id="catalog" class="charts"></div>
      </div>
      <div class="sub-bot-box">
        <div class="title">信息系统</div>
        <div id="infosys" class="charts"></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import axios from "axios";
// 此版本是利用echarts开发
export default {
  name: "home",
  data() {
    return {
      interfaceData: [],
      loggedUserTotalNum: 0,
      txCount: 0,
      blockHeight: 0,
      cityNum: 0,
      userTotalNum: 0
    };
  },
  mounted() {
    this.initConsumerData();
    this.initSecureData();
    this.initAllRecords();
    this.initApplyData();
    this.initDuty();
    this.initCatalog();
    this.initInfoSys();
    this.initNum();
  },
  methods: {
    initNum() {
      this.$store.dispatch("HomeDatas/getLoggedUserTotalNum").then(res => {
        this.loggedUserTotalNum = res.body;
      });
      this.$store.dispatch("HomeDatas/getUserTotalNum").then(res => {
        this.userTotalNum = res.body;
      });
      /**
       * 现在 区块高度和目录区块总数 端口是8100
       *
       * 注释的请求端口是9696
       *
       *   this.$store.dispatch("HomeDatas/getTxCount").then(res => {
       *     this.txCount = res.body;
       *   });
       *   this.$store.dispatch("HomeDatas/getBlockHeight").then(res => {
       *     this.blockHeight = res.body;
       *   });
       *
       */

      axios
        .post("http://10.20.23.30:8100/api/work/getTxCount", {})
        .then(response => {
          this.txCount = JSON.parse(response.data.data.data).txSum;
        });

      axios
        .post("http://10.20.23.30:8100/api/work/getBlockHeight", {})
        .then(response => {
          this.blockHeight = response.data.data.data;
        });
    },
    initConsumerData() {
      var that = this;
      this.$store.dispatch("HomeDatas/getCount").then(res => {
        let data = res.body;
        let dateArr = [],
          askArr = [],
          riseArr = [];
        res.body.forEach(item => {
          dateArr.push(item.date);
          askArr.push(item.count);
          riseArr.push(item.rate);
        });
        
        var dom = document.getElementById("container");
        dom.style.height = 252 + "px";
        var myChart = echarts.init(dom);
        var option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#999"
              }
            },
            formatter: "{b}: <br/>{a0}：{c0}<br/>{a1}：{c1}%"
          },
          grid: {
            top: 65,
            left: 55
          },
          legend: {
            left: 15,
            data: ["数据消费请求", "同比上涨"]
          },
          xAxis: [
            {
              type: "category",
              data: dateArr,
              axisPointer: {
                type: "shadow"
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "数据消费请求",
              min: 0,
              max: 250,
              interval: 50,
              axisLabel: {
                formatter: "{value}"
              }
            },
            {
              type: "value",
              name: "同比上涨",
              min: 0,
              max: 25,
              interval: 5,
              axisLabel: {
                formatter: "{value}%"
              }
            }
          ],
          series: [
            {
              name: "数据消费请求",
              type: "bar",
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#00f9e6" }, //柱图渐变色
                  { offset: 1, color: "#0083ff" } //柱图渐变色
                ])
              },
              barWidth: 20,
              data: askArr
            },
            {
              name: "同比上涨",
              type: "line",
              yAxisIndex: 1,
              symbolSize: 8,
              itemStyle: {
                color: "#7ff3f5"
              },
              data: riseArr
            }
          ]
        };
        myChart.setOption(option, true);
      });
    },
    initSecureData() {
      var that = this;
      this.$store.dispatch("HomeDatas/getRecentThirtyDays").then(res => {
        let dateArr = [],
          illegalArr = [],
          unauthorizeArr = [];
        res.body.forEach(item => {
          dateArr.push(item.time);
          illegalArr.push(item.type0num);
          unauthorizeArr.push(item.type1num);
        });
        var dom = document.getElementById("secure");
        dom.style.height = 252 + "px";
        var myChart = echarts.init(dom);
        var colors = ["#ff2976", "#0080ff"];
        var option = {
          color: colors,
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross"
            },
            formatter: "{b}: <br/>{a0}：{c0}<br/>{a1}：{c1}"
          },
          legend: {
            left: 15,
            data: ["非法访问", "非授权访问"]
          },
          grid: {
            top: 40,
            bottom: 50,
            left: 55
          },
          xAxis: [
            {
              type: "category",
              data: dateArr
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "非法访问",
              type: "line",
              data: illegalArr
            },
            {
              name: "非授权访问",
              type: "line",
              data: unauthorizeArr
            }
          ]
        };

        myChart.setOption(option, true);
      });
    },
    initAllRecords() {
      let that = this;
      this.$store.dispatch("HomeDatas/getAllRecords").then(res => {
        let data = res.body;
        that.interfaceData.push(...data);
      });
    },
    initApplyData() {
      var that = this;
      this.$store.dispatch("HomeDatas/getApplyStatics").then(res => {
        let data = res.body;
        var arr = [],
          arrData = [];
        for (const key in data) {
          arr.push(key);
          let item = {
            value: "",
            name: ""
          };
          item.value = data[key];
          item.name = key;
          arrData.push(item);
        }
        var dom = document.getElementById("apply");
        dom.style.height = 262 + "px";
        var myChart = echarts.init(dom);
        var option = {
          tooltip: {
            trigger: "item",
            formatter: "{b}: {c} ({d}%)"
          },
          legend: {
            top: 0,
            left: "center",
            icon: "circle",
            data: arr
          },
          color: [
            "#00f9e6",
            "#0083ff",
            "#749f83",
            "#ca8622",
            "#bda29a",
            "#6e7074",
            "#546570",
            "#c4ccd3"
          ],
          series: [
            {
              type: "pie",
              radius: "65%",
              center: ["50%", "50%"],
              selectedMode: "single",
              data: arrData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        };

        myChart.setOption(option, true);
      });
    },
    initDuty() {
      var that = this;
      that.$store
        .dispatch("HomeDatas/getOrganization", { type: "1" })
        .then(res => {
          let data = res.body;
          if (data.organizationVoList.length <= 0) {
            return false;
          }
          var arr = data.organizationVoList.map(item => item.orgName);
          data.organizationVoList.forEach(element => {
            element.value = element.item;
            element.name = element.orgName;
          });
          var dom = document.getElementById("duty");
          dom.style.height = 262 + "px";
          var myChart = echarts.init(dom);
          var option = {
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: "vertical",
              left: 10,
              show: false,
              data: arr
            },
            color: [
              "#00f9e6",
              "#0083ff",
              "#749f83",
              "#ca8622",
              "#bda29a",
              "#6e7074",
              "#546570",
              "#c4ccd3"
            ],
            series: [
              {
                name: "信息系统",
                type: "pie",
                radius: ["50%", "70%"],
                avoidLabelOverlap: false,
                label: {
                  show: true
                },
                labelLine: {
                  show: true,
                  smooth: true
                },
                emphasis: {
                  label: {
                    show: true
                  }
                },
                data: data.organizationVoList
              }
            ]
          };

          myChart.setOption(option, true);
        });
    },
    initCatalog() {
      var that = this;
      that.$store
        .dispatch("HomeDatas/getOrganization", { type: "2" })
        .then(res => {
          let data = res.body;
          if (data.organizationVoList.length <= 0) {
            return false;
          }
          var arr = data.organizationVoList.map(item => item.orgName);
          data.organizationVoList.forEach(element => {
            element.value = element.item;
            element.name = element.orgName;
          });
          var dom = document.getElementById("catalog");
          dom.style.height = 262 + "px";
          var myChart = echarts.init(dom);
          var option = {
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: "vertical",
              left: 10,
              show: false,
              data: arr
            },
            color: [
              "#00f9e6",
              "#0083ff",
              "#749f83",
              "#ca8622",
              "#bda29a",
              "#6e7074",
              "#546570",
              "#c4ccd3"
            ],
            series: [
              {
                name: "信息系统",
                type: "pie",
                radius: ["50%", "70%"],
                avoidLabelOverlap: false,
                label: {
                  show: true
                },
                labelLine: {
                  show: true,
                  smooth: true
                },
                emphasis: {
                  label: {
                    show: true
                  }
                },
                data: data.organizationVoList
              }
            ]
          };

          myChart.setOption(option, true);
        });
    },
    initInfoSys() {
      var that = this;
      that.$store
        .dispatch("HomeDatas/getOrganization", { type: "3" })
        .then(res => {
          let data = res.body;
          if (data.organizationVoList.length <= 0) {
            return false;
          }
          var arr = data.organizationVoList.map(item => item.orgName);
          data.organizationVoList.forEach(element => {
            element.value = element.item;
            element.name = element.orgName;
          });
          var dom = document.getElementById("infosys");
          dom.style.height = 262 + "px";
          var myChart = echarts.init(dom);
          var option = {
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: "vertical",
              left: 10,
              show: false,
              data: arr
            },
            color: [
              "#00f9e6",
              "#0083ff",
              "#749f83",
              "#ca8622",
              "#bda29a",
              "#6e7074",
              "#546570",
              "#c4ccd3"
            ],
            series: [
              {
                name: "信息系统",
                type: "pie",
                radius: ["50%", "70%"],
                avoidLabelOverlap: false,
                label: {
                  show: true
                },
                labelLine: {
                  show: true,
                  smooth: true
                },
                emphasis: {
                  label: {
                    show: true
                  }
                },
                data: data.organizationVoList
              }
            ]
          };

          myChart.setOption(option, true);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#home {
  font-family: "Microsoft YaHei";
  background: #f0f2f6;
  padding: 20px 1px;
  .top-box {
    display: flex;
    margin-bottom: 20px;
    .sub-top-box {
      flex: 1;
      height: 300px;
      border-radius: 5px;
      margin: 0 15px;
      background: #ffffff;
      .charts {
        height: 262px;
        margin-top: 10px;
      }
      .title {
        padding: 10px 20px;
        border-bottom: 1px solid #f0f2f6;
      }
    }
  }
  .mid-box {
    display: flex;
    margin-bottom: 20px;
    .sub-mid-box {
      flex: 1;
      height: 300px;
      border-radius: 5px;
      background: #ffffff;
      margin: 0 15px;
      .charts {
        height: 262px;
      }
      .con-sub-box {
        display: flex;
      }
      .title {
        padding: 10px 20px;
      }
      .tag-box {
        padding: 10px;
        display: flex;
        justify-content: space-around;
        .tag-icon-right,
        .tag-icon-wrong {
          margin-right: 20px;
        }
        .tag-icon-right:before {
          content: "";
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background: blue;
          margin-right: 5px;
        }
        .tag-icon-wrong:before {
          content: "";
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background: red;
          margin-right: 5px;
        }
      }
      .con-box {
        display: flex;
        flex-wrap: wrap;
        .tag-icon {
          display: inline-block;
          width: 33.3%;
          text-align: center;
          padding: 10px 0;
        }
        .tag-icon-right:after {
          content: "";
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background: blue;
          margin: 0 20px;
        }
        .tag-icon-wrong:after {
          content: "";
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background: red;
          margin: 0 20px;
        }
      }
      .icon-mid {
        padding: 15px;
        .icon-mid-left {
          float: left;
          width: 50px;
          height: 50px;
          background: #0093ff;
          border-radius: 25px;
          text-align: center;
          line-height: 50px;
          color: #333333;
          font-size: 20px;
          img {
          }
          margin: 0 15px;
        }
        .icon-mid-right {
          display: inline-block;
          .icon-right-up {
            font-size: 20px;
            font-weight: 600;
            display: block;
            margin-bottom: 15px;
          }
          .icon-right-bot {
            color: #ccc;
            display: block;
            margin-top: -7px;
          }
        }
      }
    }
  }
  .bot-box {
    display: flex;
    // margin-bottom: 20px;
    .sub-bot-box {
      flex: 1;
      border-radius: 5px;
      height: 300px;
      background: #ffffff;
      margin: 0 15px;
      .charts {
        height: 262px;
      }
      .title {
        padding: 10px 20px;
        border-bottom: 1px solid #f0f2f6;
      }
    }
  }
}
</style>

<template>
  <div class="device-container">
    <!-- 我的设备 -->
    <headers />
    <main class="container">
      <div class="base-info">
        <h2 class="title">设备统计</h2>
        <div class="total-num">
          <span class="item">
            <i class="key">设备总数</i>
            <b class="value">{{statistics.total}}</b>
          </span>
          <span class="item">
            <i class="key">在用数量</i>
            <b class="value">{{statistics.use}}</b>
          </span>
          <span class="item">
            <i class="key">空闲数量</i>
            <b class="value">{{statistics.idle}}</b>
          </span>
          <span class="item">
            <i class="key">离线数量</i>
            <b class="value">{{statistics.offLine}}</b>
          </span>
          <span class="item">
            <i class="key">报废数量</i>
            <b class="value">{{statistics.discard}}</b>
          </span>
        </div>
        <el-form :model="ruleForm" label-width="100px" class="base-form" label-position="left">
          <el-form-item label="设备类别">
            <div class="value">
              <span>总数</span>
              <span>在用数</span>
              <span>空闲数</span>
              <span>离线数</span>
              <span>报废数</span>
            </div>
          </el-form-item>
          <el-form-item :label="item.dname" v-for="(item,index) in this.statList" :key="index">
            <div class="value">
              <span>{{item.allCount}}</span>
              <span>{{item.use}}</span>
              <span>{{item.idle}}</span>
              <span>{{item.offLine}}</span>
              <span>{{item.discard}}</span>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="ctrl-box">
        <h2 class="title">设备管理</h2>
        <div class="tabs-container">
          <el-tabs v-model="activeName">
            <el-tab-pane label="设备列表" name="first">
              <deviceList :deviceList="deviceList" @getMyDevices="getMyDevices" :qmodel="qmodel" />
            </el-tab-pane>
            <el-tab-pane label="报废设备" name="second">
              <scrapDeviceList :scrapList="scrapList" @getMyDevices="getMyDevices" :qmodel="qmodel" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import headers from "../views/header";
import deviceList from "./subView/deviceList";
import scrapDeviceList from "./subView/scrapDeviceList";
import { GetMyDevices, GetQmodel } from "../../api/deviceManagement";
export default {
  name: "DeviceContainer",
  components: { headers, deviceList, scrapDeviceList },
  data() {
    return {
      ruleForm: {
        CT903Num: "",
        GYFZNum: "",
        onLineNum: "",
        offLineNum: "",
        scrapNum: "",
      },
      activeName: "first",
      // 设备列表
      qmodel: [],
      // 我的设备
      deviceList: [],
      // 报废设备
      scrapList: [],
      // 各设备数量
      statList: [],
      // 计算总数
      statistics: {
        total: 0,
        use: 0,
        idle: 0,
        offLine: 0,
        discard: 0,
      },
    };
  },
  mounted() {
    this.getMyDevices();
  },
  methods: {
    getQmodel() {
      GetQmodel()
        .then((res) => {
          console.log(res);
          var statList = this.statList.map((el) => {
            return el.dname;
          });
          this.qmodel = res.data.filter((el) => {
            return statList.indexOf(el.shortName) !== -1;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getMyDevices() {
      GetMyDevices({ uid: this.$cookie.get("Admin-ID") })
        .then((res) => {
          this.initStatList(res.data.statList);
          this.statList = res.data.statList || [];
          this.filtersList(res.data.devicesList);
          return res.data.statList;
        })
        .then((e) => {
          this.getQmodel();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    initStatList(data) {
      this.statistics = {
        total: 0,
        use: 0,
        idle: 0,
        offLine: 0,
        discard: 0,
      };
      data.forEach((element) => {
        // this.statistics.total = this.statistics.total + element.allCount;
        this.statistics.total += element.allCount;
        this.statistics.use += element.use;
        this.statistics.idle += element.idle;
        this.statistics.offLine += element.offLine;
        this.statistics.discard += element.discard;
      });
    },
    filtersList(data) {
      this.scrapList = [];
      this.deviceList = [];
      data.forEach((item) => {
        item.status == 0
          ? this.scrapList.push(item)
          : this.deviceList.push(item);
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.device-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .container {
    flex: 1 1 auto;
    min-height: 0;
    background: #f5f6f8;
    padding: 30px 40px 20px 40px;
    display: flex;
    overflow: hidden;
    .base-info {
      margin-right: 30px;
      background: #fff;
      box-shadow: 10px 10px 5px #ccc;
      width: 450px;
      height: 600px;
      border-radius: 5px;
      h2 {
        padding: 15px 20px;
        min-height: 40px;
        border-bottom: 1px solid #ccc;
        font-weight: 600;
      }
      .total-num {
        display: flex;
        justify-content: center;
        .item {
          width: 25%;
          padding: 25px 0;
          text-align: center;
          display: flex;
          flex-direction: column;
          .value {
            margin-top: 20px;
            font-size: 24px;
          }
        }
      }
      .base-form {
        padding: 20px;
        .value {
          background-color: #f5f7fa;
          border: 1px solid #e4e7ed;
          color: #111;
          display: flex;
          width: 100%;
          border-radius: 4px;
          line-height: 40px;
          justify-content: space-around;
          span {
            text-align: center;
          }
        }
      }
    }
    .ctrl-box {
      flex: 1 1 auto;
      width: 0;
      min-width: 0;
      background: #fff;
      box-shadow: 10px 10px 5px #ccc;
      border-radius: 5px;
      h2 {
        padding: 15px 20px;
        min-height: 40px;
        border-bottom: 1px solid #ccc;
        font-weight: 600;
      }
      .tabs-container {
        padding: 10px 20px;
      }
    }
  }
}
</style>

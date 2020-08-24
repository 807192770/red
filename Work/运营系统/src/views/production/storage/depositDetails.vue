<template>
  <div class="app-container">
    <el-form :inline="true" :model="baseInfo" class="header">
      <el-form-item label="订单编号：">{{baseInfo.orderNo}}</el-form-item>
      <el-form-item label="单位名称：">{{baseInfo.company}}</el-form-item>
      <el-form-item label="销售名称：">{{baseInfo.saleName}}</el-form-item>
      <el-form-item label="创建时间：">{{baseInfo.createTime}}</el-form-item>
      <el-form-item v-if="false">
        <el-button type="primary" size="small">批量导入</el-button>
      </el-form-item>
      <el-form-item v-if="false">
        <el-button type="primary" size="small">下载模板</el-button>
      </el-form-item>
    </el-form>
    <el-form label-width="100px" class="content" size="small">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="订单明细">
            <el-collapse accordion v-model="activeName">
              <el-collapse-item :name="j" v-for="(item,j) in orderList" :key="j">
                <template slot="title">
                  <el-row class="headers">
                    <el-col :span="4">型号：{{item.productModel}}</el-col>
                    <el-col :span="4">出库数量：{{item.stockList.length}}/{{item.quantity}}</el-col>
                    <el-col :span="2">
                      <el-button type="primary" size="mini" @click.stop="addRow(j,item)">添加设备
                      </el-button>
                    </el-col>
                  </el-row>
                </template>
                <el-row class="it-title" :gutter="40">
                  <el-col :span="2">编号</el-col>
                  <el-col :span="4">设备编号</el-col>
                  <el-col :span="4">4G手机号</el-col>
                  <el-col :span="2">程序版本</el-col>
                  <el-col :span="2">检查批次</el-col>
                  <el-col :span="3">检测人员</el-col>
                  <el-col :span="7">操作</el-col>
                </el-row>
                <el-row class="it-txt" v-for="(it,key) in item.stockList" :key="key" :gutter="40">
                  <el-col :span="2" class="mt5">{{key}}</el-col>
                  <el-col :span="4">
                    <el-input v-model="it.deviceNum" placeholder="请输入内容" @blur='checkNo(item,it.deviceNum)'></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-input v-model="it.cardNo" placeholder="请输入内容"></el-input>
                  </el-col>
                  <el-col :span="2">
                    <el-input v-model="it.version" placeholder="请输入内容"></el-input>
                  </el-col>
                  <el-col :span="2">
                    <el-input type="number" v-model="it.batch" placeholder="请输入内容"></el-input>
                  </el-col>
                  <el-col :span="3">
                    <el-select v-model="it.checkUserId" clearable filterable size="small" placeholder="请选择检测人员">
                      <el-option v-for="it in saleList" :key="it.id" :label="it.nickName" :value="it.userId">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="7">
                    <!-- <el-button class="btn" type="primary" size="mini" @click="addRow(j,item,it,key)">复制</el-button> -->

                    <el-button class="btn" type="danger" size="mini" @click="delRow(item,key)">删除</el-button>
                  </el-col>
                </el-row>
                <el-row class="footer" type="flex" justify="end">
                  <el-col :span="1.5">
                    <el-button size="mini" type="primary" @click="insertOrderOut(item)">出库</el-button>
                  </el-col>
                </el-row>
              </el-collapse-item>
            </el-collapse>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {
  DelOrderOut,
  InsertOrderOut,
  QueryOutStockDetail,
  DevicesCheckRepeat,
} from "@/api/production/details.js";
import { QueryUserList } from "@/api/production/list.js";
export default {
  name: "deposit",
  data() {
    return {
      baseInfo: JSON.parse(this.$route.query.baseInfo),
      activeName: 0,
      orderList: [],
      saleList: [],
    };
  },
  created() {
    this.getSaleList();
    this.getDetailListByID(this.baseInfo.id);
  },
  methods: {
    addRow(
      j,
      item,
      row = {
        orderDetailId: item.id,
        cardNo: "",
        version: "",
        batch: "",
        checkUserId: "",
      },
      index = item.stockList.length
    ) {
      var Row = {};
      for (var k in row) {
        Row[k] = row[k];
        Row.id = item.id;
        Row.productModel = item.productModel;
      }
      if (item.stockList.length < item.quantity) {
        item.stockList.splice(index, 0, Row);
      }
      this.activeName = j;
    },
    delRow(item, index) {
      console.log();
      if (item.stockList[index].dId) {
        DelOrderOut({
          dId: item.stockList[index].dId,
          outStockId: item.stockList[index].outStockId,
        }).then((r) => {
          this.$message.success(r.data);
          this.getDetailListByID(this.baseInfo.id);
        });
      } else {
        item.stockList.splice(index, 1);
      }
    },
    // 获取详情
    getDetailListByID(id) {
      QueryOutStockDetail({ orderId: id }).then((r) => {
        let data = r.data;
        data.forEach((it) => {
          it.stockList.forEach((el) => {
            el.deviceNum = el.deviceNo.slice(it.productModel.length);
          });
        });
        this.orderList = JSON.parse(JSON.stringify(data));
        console.log(this.orderList);
      });
    },
    // 出库
    insertOrderOut(row) {
      if (row.stockList.length) {
        row.stockList.forEach((element, index) => {
          element.orderDetailId = row.id;
          element.deviceNo = row.productModel + element.deviceNum;
          for (const key in element) {
            if (!element[key]) {
              this.$message.error("请填写完整数据");
              throw Error("请填写完整数据");
              return false;
            }
          }
          if (index >= 1) {
            var elementI = row.stockList[index];
            var elementL = row.stockList[index - 1];
            if (elementI.deviceNo == elementL.deviceNo) {
              this.$message.error("设备编号不能重复");
              throw Error("设备编号不能重复");
              return false;
            }
          }
        });
        InsertOrderOut(row.stockList)
          .then((response) => {
            this.$message.success(response.data);
            return response.code;
          })
          .then((e) => {
            if (e == 200) this.getDetailListByID(this.baseInfo.id);
          });
      } else {
        this.$message.error("请添加设备");
      }
    },
    // 检查设备编号
    checkNo(it, str) {
      DevicesCheckRepeat({ devices: it.productModel + str }).then(
        (response) => {
          if (response.data == 0) this.$message.error(response.msg);
        }
      );
    },
    getSaleList() {
      QueryUserList({}).then((response) => {
        this.saleList = response.rows;
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.header {
  padding: 10px 5px;
  background: #f5f5f5;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  .el-form-item {
    margin-bottom: 0;
  }
}
.content /deep/ {
  margin: 30px auto;
  .el-collapse-item__header {
    background: #f5f5f5;
    border-radius: 5px 5px 0 0;
    .headers {
      width: 100%;
      .el-col {
        text-align: center;
      }
    }
  }

  .it-title,
  .it-txt {
    text-align: center;
    border-bottom: 1px solid #ccc;
    .el-col {
      padding: 5px;
      .el-input__inner {
        padding: 0 0 0 10px;
      }
      .btn {
        margin: 0 5px 0 5px;
      }
    }
  }
  .footer {
    margin-top: 25px;
  }
}
</style>
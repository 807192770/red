<template>
  <div class="treeGraph">
    <div class="treeGraphBox">
      <div class="treeGraphsearch">
        <div>xx市区/公安局22</div>
        <div class="searchInput">
          <el-input type="text" size="small" placeholder="名称或描述" />
          <el-button type="primary" size="small" @click="search()">搜索</el-button>
        </div>
      </div>
      <treeGraph
        ref="treeGraph"
        :treetype="pagetype"
        :treeGraphData="treeGraphData"
        v-if="treeGraphData"
      />
    </div>
    <div class="treeGraphFoot">
      <div class="btnBox">
        <el-button @click="editPower(false)">取消权限</el-button>
        <el-button type="primary" @click="editPower(true)">申请权限</el-button>
      </div>
    </div>
    <el-dialog
      :title="titlehead"
      :visible.sync="dialogVisible"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div>
        <el-form :model="formData" label-position="left" label-width="80px">
          <template v-if="formtype===1">
            <div>
              <el-form-item label="有效期：">
                <el-date-picker
                  v-model="formData.value"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="备注：" label-width="80px">
                <el-input v-model="formData.postscript" show-word-limit type="textarea" />
              </el-form-item>
            </div>
          </template>

          <div id="tree"></div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="subForm()">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import treeGraph from "../common/treegraph";
import echarts from "echarts";
export default {
  data() {
    return {
      pagetype: "read",
      dialogVisible: false,
      formtype: null,
      titlehead: null,
      formData: {
        postscript: "",
        value1: ""
      },
      treeGraphData: "",
      selectIds: []
    };
  },
  components: {
    treeGraph
  },
  mounted() {
    this.catalogChain();
  },
  methods: {
    catalogChain() {
      // 获取首页目录树
      this.$store.dispatch("CatalogLinks/getQueryNodes", {}).then(res => {
        this.treeGraphData = res.body[0];
      });
    },

    editPower(flag) {
      // flag?'申请权限':'取消权限'

      //清空之前选中的值
      this.selectIds = [];
      // 遍历树形图 确认选中
      let treeData = [];
      treeData.push(this.$refs.treeGraph.treeData);
      // 循环数据拿到选中项 传给后台 且拿到弹框树形图
      this.circleData(treeData).then(value => {
        if (value.length == 0) {
          this.$message.error("请选择选项！");
          return false;
        } else {
          this.dialogVisible = true;
          this.formtype = flag ? 1 : 0;
          this.titlehead = flag ? "权限申请" : "取消权限";
          this.$store
            .dispatch("CatalogLinks/getQuerySpecifiedNode", value)
            .then(res => {
              let data = res.body;
              // 处理拿到的数据
              this.circleDialogData(data);
            });
        }
      });
    },
    circleData(value) {
      // 循环处理数据
      return new Promise((res, rej) => {
        value.forEach(item => {
          if (item.checked) {
            this.selectIds.push(item.id);
          }
          if (item.children && item.children.length > 0) {
            this.circleData(item.children);
          }
        });
        // 选中项ids集合
        let param = this.selectIds.toString();
        res(param);
      });
    },
    circleDialogData(value) {
      // 弹框循环处理数据
      value.forEach(item => {
        item.name = item.label;
        if (item.children && item.children.length > 0) {
          this.circleDialogData(item.children);
        }
      });
      // 加载弹框树形图
      this.initDialogTree(value);
    },
    initDialogTree(value) {
      // 展示弹框中树形图
      var that = this;
      var dom = document.getElementById("tree");
      dom.style.height = 250 + "px";
      var myChart = echarts.init(dom);
      var option = {
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove"
        },
        series: [
          {
            type: "tree",
            name: "tree",
            data: value,
            left: "10%",
            right: "25%",
            symbolSize: 12,
            label: {
              show: true,
              position: "top",
              align: "center"
            },
            leaves: {
              label: {
                position: "right",
                verticalAlign: "middle",
                align: "left"
              }
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      };
      myChart.setOption(option, true);
    },
    subForm() {
      // 提交弹框  formtype：1 申请权限  formtype：0 取消权限
      /**
       *
       * 提交申请权限 日期、备注必填
       *
       */

      if (this.formtype) {
        if (this.formData.value == undefined) {
          this.$message.error("请选择日期！");
          return false;
        }
        if (this.formData.postscript == undefined) {
          this.$message.error("请填写备注！");
          return false;
        }
        let param = {
          subject: " 数据消费权限-订单申请",
          nodeList: this.selectIds.toString(),
          startTime: this.formData.value[0],
          endTime: this.formData.value[1],
          remark: this.formData.postscript
        };
        this.$store.dispatch("CatalogLinks/getSubmitOrder", param).then(res => {
          console.log(res);
          if (res.head.code == "000000") {
            this.$message.success(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        });
      } else {
        console.log("取消权限");
        /**
         *
         * 取消权限 userId,deptId 分别为用户id和部门id  后台说先写死  后台自己取
         *
         * 备注暂时没有规划
         *
         */

        let param = {
          userId: "2",
          deptId: "12",
          nodeIds: this.selectIds.toString()
        };
        this.$store
          .dispatch("CatalogLinks/getCancelPermission", param)
          .then(res => {
            console.log(res);
            if (res.head.code == "000000") {
              this.$message.success(res.msg);
            } else {
              this.$message.error(res.msg);
            }
          });
      }
    },
    search() {
      this.$message.error("完善中...");
    }
  }
};
</script>
<style lang="less" scoped>
.treeGraph {
  .treeGraphFoot {
    width: 100%;
    height: 64px;
    background: #fafafa;
    // display: flex;
    // align-items: center;
    position: relative;
    .btnBox {
      width: 246px;
      position: absolute;
      right: 24px;
      top: 12px;
    }
  }
  .treeGraphBox {
    margin: 24px;
    .treeGraphsearch {
      height: 46px;
      width: 100%;
      background: #fff;
      border-bottom: 1px solid #e2e2e2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        padding: 0 20px;
      }
      .searchInput {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .el-input {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>

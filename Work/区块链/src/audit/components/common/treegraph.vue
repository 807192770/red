<template>
  <div class="tree">
    <vue2-org-tree
      :data="treeData"
      name="test"
      :horizontal="true"
      :collapsable="collapsable"
      :label-class-name="labelClassName"
      :render-content="renderContent"
      @on-expand="onExpand"
      @on-node-click="onNodeClick"
    />
    <!-- 新增弹框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择数据类型">
            <el-option label="组织" value="v1"></el-option>
            <el-option label="数据库" value="v2"></el-option>
            <el-option label="库表" value="v3"></el-option>
            <el-option label="字段" value="v4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="技术名称" :label-width="formLabelWidth" v-if="dialogType==2">
          <el-input v-model="form.techName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="编码" :label-width="formLabelWidth" v-if="dialogType==0">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.desc" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["treetype", "treeGraphData"],
  data() {
    return {
      dialogTitle: "",
      dialogType: 0 /* 0:新增、组织添加。1：数据库、库表添加。2：字段添加*/,
      horizontal: false, //控制树形图方向
      collapsable: false, //控制树形图展开
      expandAll: false,
      labelClassName: "bg-color-orange",
      dialogFormVisible: false,
      form: {
        type: "",
        name: "",
        code: "",
        desc: "",
        techName: ""
      },
      formLabelWidth: "100px",
      treeData: {}
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.treeData = this.treeGraphData;
    },
    // 初始化表格结构
    renderContent(h, data) {
      const noLastNode = (
        <span>
          <span class="el-dropdown-link">
            <span class="checkAll">
              <input
                type="checkbox"
                v-model={data.checked}
                onclick={() => this.checkedAll(h, data, data.checked)}
              />
            </span>
            {data.label}
            <div class={data.identification}>
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑节点"
                placement="bottom"
              >
                <i
                  class="el-icon-edit el-icon--right"
                  onclick={() => this.operation(data, "edit")}
                ></i>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="新增节点"
                placement="bottom"
              >
                <i
                  class="el-icon-circle-plus-outline el-icon--right"
                  onclick={() => this.operation(data, "add")}
                ></i>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除节点"
                placement="bottom"
              >
                <i
                  class="el-icon-remove-outline el-icon--right"
                  onclick={() => this.delete(data)}
                ></i>
              </el-tooltip>
            </div>
          </span>
        </span>
      );
      const isLastNode = (
        <span>
          <span class="el-dropdown-link">
            <span class="checkAll">
              <input
                type="checkbox"
                v-model={data.checked}
                onclick={() => this.checkedAll(h, data, data.checked)}
              />
            </span>
            {data.label}
            <span>
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑节点"
                placement="bottom"
              >
                <i
                  class="el-icon-edit el-icon--right"
                  onclick={() => this.operation(data, "edit")}
                />
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除节点"
                placement="bottom"
              >
                <i
                  class="el-icon-remove-outline el-icon--right"
                  onclick={() => this.delete(data)}
                />
              </el-tooltip>
            </span>
          </span>
        </span>
      );
      const readNode = (
        <span>
          <span class="el-dropdown-link">
            <span class="checkAll">
              <input
                type="checkbox"
                v-model={data.checked}
                onclick={() => this.checkedAll(h, data, data.checked)}
              />
            </span>
            {data.label}
          </span>
        </span>
      );
      var lastNode;
      if (this.treetype === "read") {
        lastNode = readNode;
      } else {
        lastNode = "children" in data ? noLastNode : isLastNode;
      }
      return lastNode;
    },
    // 展开回调
    onExpand(e, data) {
      if ("expand" in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, "expand", true);
      }
    },
    // 收起回调
    collapse(list) {
      var _this = this;
      list.forEach(function(child) {
        if (child.expand) {
          child.expand = false;
        }
        child.children && _this.collapse(child.children);
      });
    },
    // 点击事件
    onNodeClick(e, data) {
      //看是节点还是展开按钮
      var target = e.target;
      var classList = [...e.target.classList];
      var label = classList.find(item => item == "org-tree-node-label-inner");
      var label2 = classList.find(item => item == "org-tree-node-btn");
      if (label) {
        // this.$store.commit("setCurrentNode",data)
        console.log("是节点按钮");
      } else if (label2) {
        //alert(11)
        console.log("是展开按钮", data.label);
      }
      // return;
      // if (data.url == null) {
      //   return false;
      // } else {
      //   window.open(data.url);
      // }
    },
    toggleExpand(data, val) {
      var _this = this;
      if (Array.isArray(data)) {
        data.forEach(function(item) {
          _this.$set(item, "expand", val);
          if (item.children) {
            _this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, "expand", val);
        if (data.children) {
          _this.toggleExpand(data.children, val);
        }
      }
    },
    // 新增、编辑
    initTitle(value) {
      const arrChain = this.deepFind(
        this.data.children,
        (item, index, level) => item.id === value.id,
        "children"
      );
      var arr = [this.data.label];
      arrChain.forEach((item, index) => {
        arr.push(item.label);
      });
      this.dialogTitle = arr.join(" / ");
    },
    operation(value, flag) {
      this.initTitle(value);
      this.dialogFormVisible = true;
      if (flag == "edit") {
        switch (value.identification) {
          case "organize":
            console.log("组织");
            this.dialogType = 0;
            break;
          case "dataBase":
          case "libraryTable":
            console.log("数据库||库表");
            this.dialogType = 1;
            break;
          default:
            console.log("字段");
            this.dialogType = 2;
            break;
        }
      } else {
        console.log("新增");
        this.dialogType = 0;
      }
    },
    // 节点选择
    checkedAll(h, data, checked) {
      // console.log(h,data,checked)
      if (data.children && data.children.length > 0) {
        data.children.forEach(item => {
          item.checked = !checked;
          this.checkedAll(null, item, checked);
        });
      }
    },
    // 节点删除
    delete(data) {
      this.$confirm(
        `确定要删除当前节点(${data.label})及所有子节点?`,
        "删除节点",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 查找链式目录
    deepFind(arr, condition, children) {
      // 即将返回的数组
      let main = [];

      // 用try方案方便直接中止所有递归的程序
      try {
        // 开始轮询
        (function poll(arr, level) {
          // 如果传入非数组
          if (!Array.isArray(arr)) return;

          // 遍历数组
          for (let i = 0; i < arr.length; i++) {
            // 获取当前项
            const item = arr[i];

            // 先占位预设值
            main[level] = item;

            // 检验是否已经找到了
            const isFind = (condition && condition(item, i, level)) || false;

            // 如果已经找到了
            if (isFind) {
              // 直接抛出错误中断所有轮询
              throw Error;

              // 如果存在children，那么深入递归
            } else if (children && item[children] && item[children].length) {
              poll(item[children], level + 1);

              // 如果是最后一个且没有找到值，那么通过修改数组长度来删除当前项
            } else if (i === arr.length - 1) {
              // 删除占位预设值
              main.length = main.length - 1;
            }
          }
        })(arr, 0);
        // 使用try/catch是为了中止所有轮询中的任务
      } catch (err) {}

      // 返回最终数组
      return main;
    }
  }
};
</script>
<style lang="less" scoped>
.tree {
  display: flex;
  justify-content: center;
  background: #fff;
  height: 100%;
  color: #333;
}
</style>
<style >
.org-tree-container .el-dropdown-link {
  color: #000;
  width: 800px;
}
.organize,
.dataBase,
.libraryTable,
.field {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  color: #333;
}
.institution {
  display: none;
}
.checkAll {
  margin-right: 10px;
}
.bg-color-orange {
  color: #fff;
  background-color: #ecf2fe;
}
.el-icon--right {
  cursor: pointer;
}
.org-tree-node-label .org-tree-node-label-inner {
  border: 1px solid #4283f7;
  padding: 10px;
}
.el-dialog__title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  padding-right: 20px;
}
</style>

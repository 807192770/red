<template>
  <div class="manageRole">
    <!-- 新建用户 -->
    <div class="item">
      <h4 class="subTitle">权限设置</h4>
      <div class="form-content">
        <div class="roleList">
          <el-radio-group v-model="radio">
            <el-radio :label="1">管理员1</el-radio>
            <el-radio :label="2">管理员2</el-radio>
            <el-radio :label="3">管理员3</el-radio>
            <el-radio :label="4">管理员4</el-radio>
            <el-radio :label="5">自定义</el-radio>
          </el-radio-group>
        </div>
        <div class="treeList">
          <Tree :data="dataTree" show-checkbox></Tree>
        </div>
      </div>
    </div>
    <div class="btnItem">
      <el-button type="primary">完成</el-button>
    </div>
  </div>
</template>

<script>
import { roleList } from "../../api/privilege-management";
export default {
  data() {
    return {
      dataTree: [
        {
          title: "实时监控",
          expand: true
        },
        {
          title: "告警管理",
          expand: true,
          children: [
            {
              title: "告警日志",
              expand: true
            },
            {
              title: "告警设置",
              expand: true
            }
          ]
        },
        {
          title: "历史轨迹",
          expand: true
        },
        {
          title: "权限管理",
          expand: true,
          children: [
            {
              title: "新建用户",
              expand: true
            },
            {
              title: "管理用户",
              expand: true
            },
            {
              title: "信息维护",
              expand: true
            }
          ]
        },
        {
          title: "巡检管理",
          expand: true,
          children: [
            {
              title: "新建巡检",
              expand: true
            },
            {
              title: "已有巡检",
              expand: true
            }
          ]
        },
        {
          title: "全局盘点",
          expand: true
        }
      ],
      radio: 1
    };
  },

  components: {},

  mounted() {
    this.getList()
  },

  methods: {
    getList(){
        roleList().then(res => {
        const data = res.data;
        console.log(data);
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.manageRole {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 30px;
  .item {
    .subTitle {
      width: 100%;
      font-size: 22px;
      color: #a0a0a0;
      line-height: 55px;
      border-bottom: 1px solid #e2e2e2;
      padding-left: 25px;
    }
    .form-content /deep/ {
      display: flex;
      justify-content: center;
      margin: 25px auto;
      padding: 0 25px;
      .roleList {
        margin-right: 200px;
        display: flex;
        align-items: center;
        .el-radio-group {
          display: flex;
          flex-direction: column;
          .el-radio {
            margin: 0 0 40px 0;
          }
        }
      }

      //
      // .ivu-tree > {
      //   .ivu-tree-children {
      //     margin: 0 0 25px 0;
      //   }
      // }
    }
  }
  .btnItem {
    border-top: 1px solid #e2e2e2;
    padding: 50px 0 0 0;
    text-align: center;
    button {
      width: 400px;
    }
  }
}
</style>

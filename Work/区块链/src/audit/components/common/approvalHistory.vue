<template>
  <div class="approvalHistory">
    <div class="title">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="4" class="title"></el-col>
        <el-col :span="15">
          <el-row class>
            <el-col :span="4">图例：</el-col>
            <el-col :span="20">
              <el-row>
                <el-col :span="8">
                  <i class="icon">
                    <img :src="completed" alt />
                  </i>
                  已完成
                </el-col>
                <el-col :span="8">
                  <i class="icon">
                    <img :src="notified" alt />
                  </i>
                  已通知
                </el-col>
                <el-col :span="8">
                  <i class="icon">
                    <img :src="planned" alt />
                  </i>
                  计划中
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="steps">
      <el-steps direction="vertical" :active="1">
        <el-step v-for="(item,index) in workflowInstanceLogs" :key="index">
          <!-- 重置 step icon -->
          <template slot="icon">
            <img :src="item.status==0?planned:item.status==1?notified:completed" />
          </template>
          <template slot="title">
            <div class="stepsTitle">
              <span class="tit">{{item.currentNodeName}}</span>
              <span class="name">{{item.creator}}</span>
              <span class="date">{{item.gmtCreated}}</span>
            </div>
          </template>
          <template slot="description" v-if="item.currentNodeName||item.handleRemark">
            <div class="stepsDescription">
              <span class="tit">{{item.currentNodeName}}</span>
              <span class="txt">{{item.handleRemark}}</span>
            </div>
          </template>
        </el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
export default {
  name: "approvalHistory",
  data() {
    return {
      completed: require("@/assets/images/base/completed.png"), //已完成
      notified: require("@/assets/images/base/notified.png"), //已通知
      planned: require("@/assets/images/base/planned.png"), //计划中
      stepsData: [
        {
          title: {
            tit: "副局长审批",
            name: "王青（wangqing）",
            date: "2019-07-23 23:00:00"
          },
          description: {
            tit: "副局长审批",
            txt: "人力资源与社会保障局目录维护审批"
          },
          status: 2
        },
        {
          title: {
            tit: "县长审批",
            name: "王青（wangqing）",
            date: "2019-07-23 23:00:00"
          },
          description: {
            tit: "",
            txt: ""
          },
          status: 1
        },
        {
          title: {
            tit: "市长审批",
            name: "王青（wangqing）",
            date: "2019-07-23 23:00:00"
          },
          description: {
            tit: "副局长审批",
            txt: "人力资源与社会保障局目录维护审批"
          },
          status: 0
        }
      ]
    };
  },
  mounted() {},
  computed: {
    workflowInstanceLogs() {
      return this.$store.state.ApplicationManage.historyDetails
        .workflowInstanceLogs;
    }
  }
};
</script>

<style lang="less" scoped>
.approvalHistory {
  .title {
    .icon {
      vertical-align: -5px;
    }
  }
  .steps {
    min-height: 250px;
    margin-top: 20px;
    .el-step__title {
      .stepsTitle {
        display: flex;
        flex-direction: column;
        width: 200px;
        .name,
        .date {
          color: #666;
          font-size: 12px;
        }
      }
    }
    .el-step__description {
      .stepsDescription {
        display: flex;
        flex-direction: column;
        background: #fafafa;
        border: 1px solid #eee;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 5px 10px;
        margin: 5px 0;
        .txt {
          // color: #7aa2f4;
        }
      }
    }
  }
}
</style>
<style >
.steps .el-step__main {
  display: flex;
}
.steps .el-step__description {
  flex: 1;
}
.el-step:last-of-type .el-step__description,
.el-step:last-of-type .el-step__main {
  margin-right: 5% !important;
}
.el-step__icon.is-text {
  border: none;
}
</style>

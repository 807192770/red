<template>
  <div class="baseInfo">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="11">
        <div class>
          <span class="key">流水号：</span>
          <span class="value">{{baseInfo.applyOrder||'——'}}</span>
        </div>
      </el-col>
      <el-col :span="13">
        <div class>
          <span class="key">流程类型：</span>
          <span class="value">{{baseInfo.type||'——'}}</span>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="11">
        <div class>
          <span class="key">状态：</span>
          <span class="value">{{baseInfo.status||'——'}}</span>
        </div>
      </el-col>
      <el-col :span="13">
        <div class>
          <span class="key">申请人：</span>
          <span class="value">{{baseInfo.applyUser||'——'}}</span>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="11">
        <div class>
          <span class="key">员工编号：</span>
          <span class="value">{{baseInfo.creatorCode||'——'}}</span>
        </div>
      </el-col>
      <el-col :span="13">
        <div class>
          <span class="key">所属组织：</span>
          <span class="value">{{baseInfo.creatorCode||'——'}}</span>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="11">
        <div class>
          <span class="key">申请日期：</span>
          <span class="value">{{baseInfo.applyTime||'——'}}</span>
        </div>
      </el-col>
      <el-col :span="13">
        <div class>
          <span class="key">有效期：</span>
          <span class="value">{{baseInfo.validStartTime+'至'+baseInfo.validEndTime||'——'}}</span>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="11">
        <div class>
          <span class="key">备注：</span>
          <span class="value">{{baseInfo.remark||'——'}}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "baseInfo",
  data() {
    return {};
  },
  computed: {
    baseInfo() {
      return this.$store.state.ApplicationManage.historyDetails.nodeApplyOrder;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.baseInfo {
  .row-bg {
    margin-bottom: 12px;
  }
}
</style>

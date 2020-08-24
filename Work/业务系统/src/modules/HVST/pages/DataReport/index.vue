<template>
  <div class="data-report">
    <!-- 报告 -->
    <section class="content">
      <el-tabs v-model="activeName" tab-position="left">
        <el-tab-pane label="最新报告" name="first">
          <latestReport>
            <section class="no-data">
              <div class="tips">
                <span class="mt10">暂无数据</span>
              </div>
            </section>
          </latestReport>
        </el-tab-pane>
        <el-tab-pane label="已废弃报告" name="second">
          <scrapReport>
            <section class="no-data">
              <div class="tips">
                <span class="mt10">暂无数据</span>
              </div>
            </section>
          </scrapReport>
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>

<script>
import latestReport from './subView/latestReport'
import scrapReport from './subView/scrapReport'

export default {
  name: 'DataReport',
  components: {
    latestReport,
    scrapReport
  },
  data() {
    return {
      activeName: 'first',
      noData: false
    }
  },
  mounted() {},
  methods: {
    applyReport() {
      console.log('申请报告')
    }
  }
}
</script>
<style lang='scss' scoped>
.data-report {
  height: 100%;
  padding: 20px;
  background: #fff;
  overflow-y: auto;
  .content /deep/ {
    height: 100%;
    .el-tabs {
      height: 100%;
      overflow-y: auto !important;
      .el-tabs__header {
        margin-right: 0;
      }
      .el-tabs__content {
        border-left: 2px solid #e4e7ed;
        position: relative;
        left: -1px;
        padding-left: 20px;
      }
    }
  }
}
</style>

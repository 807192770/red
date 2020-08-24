<template>
  <div class="global-inventory">
    <!-- 全局盘点 -->
    <div class="main">
      <div class="item">
        <div class="title">
          <h3>全局盘点</h3>
          <div>
            <el-button type="primary" size="medium">确认</el-button>
          </div>
        </div>
        <div class="num-list">
          <div class="num num-1">
            <div class="it">
              <div class="name">在盘资产总数：</div>
              <b class="num-total">143562</b>
            </div>
          </div>
          <div class="num num-2">
            <div class="it">
              <div class="name">告警任务数：</div>
              <b class="num-total">143562</b>
            </div>
            <div class="it">
              <div class="name">告警日志数：</div>
              <b class="num-total">143562</b>
            </div>
          </div>
          <div class="num num-3">
            <div class="it">
              <div class="name">巡检任务数：</div>
              <b class="num-total">143562</b>
            </div>
            <div class="it">
              <div class="name">巡检报告数：</div>
              <b class="num-total">143562</b>
            </div>
            <div class="it">
              <div class="name">异常巡检报告数：</div>
              <b class="num-total">143562</b>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="title">
          <h3>按类型</h3>
        </div>
        <div class="charts-box">
          <div class="value">
            <typePie />
          </div>
          <div class="value">
            <typeBar />
          </div>
        </div>
      </div>
      <div class="item">
         <div class="title">
          <h3>按区域</h3>
        </div>
        <div class="charts-box">
          <areaSunburst />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import typePie from "./type-pie.vue";
import typeBar from "./type-bar.vue";
import areaSunburst from "./area-sunburst.vue";
export default {
  data() {
    return {};
  },

  components: {
    typePie,
    typeBar,
    areaSunburst
  },

  mounted() {},

  methods: {}
};
</script>
<style lang='scss' scoped>
.global-inventory {
  .main {
    width: 80%;
    margin: 0 auto;
    .item {
      background: #fff;
      padding: 20px 38px;
      margin-bottom: 25px;
      .title {
        height: 58px;
        line-height: 58px;
        border-bottom: 1px solid #e2e2e2;
        display: flex;
        justify-content: space-between;
        color: #9e9ca5;
        h3 {
          font-size: 22px;
        }
      }
      .num-list {
        display: flex;

        margin: 30px 0 20px 0;
        .num {
          border-right: 1px solid #e2e2e2;
          display: flex;
          &:last-child {
            border-right: none;
          }
          .it {
            display: flex;
            flex-direction: column;
            .name {
              font-size: 18px;
              color: #9e9ca5;
            }
            .num-total {
              font-size: 24px;
              margin-top: 25px;
            }
          }
        }
        .num-1 {
          flex: 1;
        }
        .num-2 {
          flex: 2;
          justify-content: space-around;
        }
        .num-3 {
          flex: 3;
          justify-content: space-around;
        }
      }
      .charts-box {
        padding: 45px 0 10px 0;
        overflow: hidden;
        .value{
          width: 50%;
          float: left;
        }
      }
    }
  }
}
</style>

<template>
  <!-- 消息通知 -->
  <div class="notice-box">
    <div class="notice-list">
      <div class="content">
        <img :src="require('../../../assets/images/icon/notice.png')" alt />
        <el-carousel height="20px" direction="vertical" :autoplay="true" indicator-position="none">
          <el-carousel-item v-for="item in noticeInfo" :key="item.id">
            <span class="medium" @click="chooseRow(item)">{{ item.noticeTitle }}</span>
          </el-carousel-item>
        </el-carousel>
      </div>
      <a class="more" @click="(()=>{this.$message('规划中,敬请期待！')})">
        查看更多
        <i class="el-icon-d-arrow-right" />
      </a>
    </div>
    <el-dialog
      class="dialogTxt"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="35%"
    >
      <div class="tr">
        <span>作者：{{dialogAuth}}</span>
        <span class="ml20">时间：{{dialogTime}}</span>
      </div>
      <div class="txt">
        <span>{{dialogTxt}}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "NoticeBox",
  data() {
    return {
      dialogVisible: false,
      dialogTitle: "",
      dialogTxt: "",
      dialogTime: "",
      dialogAuth: "",
    };
  },
  props: ["noticeInfo"],
  watch: {
    noticeInfo: {
      handler(n, o) {},
      immediate: true,
      deep: true,
    },
  },
  mounted() {},
  methods: {
    chooseRow(row) {
      this.dialogVisible = true;
      this.dialogTitle = row.noticeTitle;
      this.dialogTxt = row.noticeContent;
      this.dialogTime = row.createTime.slice(0, 10);
      this.dialogAuth = row.createBy;
    },
  },
};
</script>
<style lang='scss' scoped>
.notice-box {
  width: 100%;
  .notice-list /deep/ {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .content {
      width: 80%;
      display: flex;
      align-items: center;
      .el-carousel {
        width: 100%;
        margin-left: 15px;
        .el-carousel__item {
          .medium {
            color: #7f8195;
            line-height: 20px;
            cursor: pointer;
          }
        }
      }
    }

    .more {
      color: #5d77e4;
    }
  }
  .dialogTxt {
    .txt {
      margin-top: 20px;
      text-indent: 2em;
      text-align: justify;
    }
  }
}
</style>

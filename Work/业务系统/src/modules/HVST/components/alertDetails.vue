<template>
  <div class="alert-details">
    <h2 class="title">{{count}}条未读消息</h2>
    <span class="all-ctrl" @click="batchUpdateStatus">全部表为已读</span>
    <ul class="txt-content">
      <li class="item" v-for="item in alertList" :key="item.id" @click="goPage(item.taskId)">
        <img class="icon" :src="require('../assets/images/item-alert.png')" alt />
        <div class="content">
          <h3 class="item-title">{{categoryType['status'+item.category]}}</h3>
          <div class="item-txt">{{item.message}}</div>
          <span class="item-time">{{item.createTime.slice(0,10)+" "+item.createTime.slice(11,19)}}</span>
        </div>
      </li>
    </ul>
    <div class="all-see tc" @click="goPage(null)">查看所有报告信息</div>
  </div>
</template>

<script>
import { BatchUpdateStatus } from "../api/dataAlert";
export default {
  name: "AlertDetails",
  data() {
    return {
      categoryType: {
        status1: "高压电流采集器丢数",
        status2: "低压抄表器丢数",
        status3: "高压钳头欠压",
        status4: "高压电流异常",
        status5: "线损率异常",
      },
    };
  },
  inject: ["reload"],
  props: ["alertList", "count"],
  methods: {
    goPage(id) {
      if (this.$route.name != "DataAlertIndex") {
        this.$router.push({ path: "/dataAlertIndex", query: { id: id } });
        this.$emit("hide");
      } else {
        this.$router.push({ query: { id: id } });
        this.reload();
      }
    },
    batchUpdateStatus() {
      BatchUpdateStatus()
        .then((r) => {
          this.$message({
            message: "操作成功",
            type: "success",
          });
          this.$emit("hide");
          this.$cookie.set("Alert-GYFZ", false);
          this.$store.commit("CHANGE_NAV_STATUS", false);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped lang='scss'>
.alert-details {
  .title {
    line-height: 30px;
    font-size: 15px;
    text-align: center;
    margin-bottom: 5px;
  }
  .all-ctrl {
    background: #ff4844;
    text-align: center;
    font-size: 12px;
    color: #fff;
    display: block;
    padding: 5px 0;
    cursor: pointer;
  }
  .txt-content {
    .item {
      display: flex;
      align-items: center;
      padding: 10px 20px 10px 10px;
      border-bottom: 1px solid #ccc;
      .icon {
        margin-right: 20px;
        margin-left: 10px;
        width: 28px;
      }
      .content {
        flex: 1;
        cursor: pointer;
        text-align: justify;
        .item-title {
          color: #5d77e4;
          font-size: 14px;
          max-height: 40px;
          overflow: hidden;
        }
        .item-txt {
          // height: 40px;
          // overflow: hidden;
          margin: 5px 0;
          text-align: justify;
        }
        .item-time {
          color: #bbb;
        }
      }
    }
  }
  .all-see {
    padding: 5px;
    cursor: pointer;
  }
}
</style>

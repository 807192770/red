<template>
  <div class="real-time-monitoring">
    <!-- 实时监控 -->
    <div class="fence-content">
      <div class="fence-header"></div>
      <div class="fence-map"></div>
    </div>
    <div class="fence-operate" :class="{'openHalf':openHalf,'openAll':openAll}">
      <div class="container">
        <div class="all_show_btn_con" @click="operate('openHalf',false)">
          <!-- 按钮 -->
          <img src="../../assets/images/backBtn.png" alt style="width:20px" />
        </div>
        <div @click="operate('openAll',null)">
          编辑编辑编辑编辑编辑编辑
          <!-- 标题 -->
        </div>
        <div>
          <!-- scroll -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //openHalf 打开一半 openAll 打开全部
      openHalf: true, 
      openAll: false
    };
  },

  components: {},

  mounted() {},

  methods: {
    operate(flag, openAll) {
      if (flag == "openHalf") {
        this.openAll = openAll;
      }
      this[flag] = !this[flag];
    }
  }
};
</script>
<style lang='scss' scoped>
.real-time-monitoring {
  position: relative;
  height: 100%;
  overflow: hidden;
  .fence-operate {
    z-index: 2000;
    width: 720px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
    -webkit-transform: translate(100%);
    transform: translate(100%);
    background-color: #f2f2f2;
    -webkit-box-shadow: -2px 0 4px 0 rgba(0, 0, 0, 0.1);
    box-shadow: -2px 0 4px 0 rgba(0, 0, 0, 0.1);
    &.openHalf {
      -webkit-transform: translate(50%);
      transform: translate(50%);
      &.openAll {
        -webkit-transform: translate(0);
        transform: translate(0);
      }
      .all_show_btn_con {
        // 箭头方向转换
        transform: rotateY(0) !important;
      }
    }
    .container {
      position: relative;
      height: 100%;
      background: red;

      .all_show_btn_con {
        z-index: 2000;
        position: absolute;
        top: 5px;
        left: -20px;
        cursor: pointer;
        transform: rotateY(180deg);
        -webkit-transition: all 0.4s ease;
        transition: all 0.4s ease;
      }
    }
  }
}
</style>

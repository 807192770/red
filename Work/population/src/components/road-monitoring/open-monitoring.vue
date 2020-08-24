<template>
  <div class="details">
    <div class="content-box">
      <div class="content">
        <div class="title">
          <span class="line"></span>
          <h3>{{title}}</h3>
          <span class="line2"></span>
        </div>
        <div class="close" @click="closebigpicture">
          <img src="../../assets/images/zoomout.png" alt />
        </div>
        <div class="content-chart">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["title"],
  components: {},

  computed: {},

  mounted() {},

  methods: {
    closebigpicture() {
      this.$emit("closebigpicture");
    }
  }
};
</script>
<style lang='scss' scoped>
.details {
  background-color: rgba($color: #000000, $alpha: 0.8);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .content-box {
    border: 3px solid #1d3e51;
    border-radius: 3px;
    width: 11.8rem;
    height: 6.6rem;
    // width: 50%;
    // height: 6.6rem;

    .content {
      background-color: #031428;
      border: 1px solid #1475e8;
      box-shadow: 0 0 12px #1475e8 inset;
      border-radius: 3px;
      width: 100%;
      height: 100%;
      position: relative;
      padding: 0.2rem;

      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.2rem;
        padding: 0.2rem;

        h3 {
          padding: 0 10px;
        }

         .line {
          width: 2rem;
          height: 1px;
          background: -webkit-linear-gradient(right, #18273D, #1475e8);
          background: -o-linear-gradient(right, #18273D, #1475e8);
          background: -moz-linear-gradient(right, #18273D, #1475e8);
          background: linear-gradient(to right, #18273D, #1475e8);
          display: block;
        }
        .line2 {
          width: 2rem;
          height: 1px;
          background: -webkit-linear-gradient(left, #18273D, #1475e8);
          background: -o-linear-gradient(left, #18273D, #1475e8);
          background: -moz-linear-gradient(left, #18273D, #1475e8);
          background: linear-gradient(to left, #18273D, #1475e8);
          display: block;
        }
      }

      .close {
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
        width: 0.26rem;
        height: 0.26rem;
        cursor: pointer;
        img {
          width: 100%;
        }
      }
    }
  }
  .el-table__row td .cell {
    position: absolute;
    top: 100%;
  }
}
</style>

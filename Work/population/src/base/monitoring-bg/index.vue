<template>
  <div class="regionbg">
    <div class="line"></div>
    <div class="title-head">
      <div class="title">
        <span class="round">
          <img src="../../assets/images/left_circle.png" alt />
        </span>
        <p>{{titlename}}</p>
      </div>
      <span class="magnify" @click="showbigpicture()">
        <img src="../../assets/images/zoomin.png" alt />
      </span>
    </div>
    <div class="canvas">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "basebg",
  data() {
    return {};
  },
  props: ["titlename"],
  computed: {},
  mounted() {},
  components: {},
  methods: {
    showbigpicture() {
      this.$emit("showbigpicture", 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.regionbg {
  height: 3.08rem;
  padding: 0.26rem 0.2rem 0.26rem;
  position: relative;
  background-color: #18273d;
  border-radius: 4px;
  margin-bottom: 0.08rem;
  .line {
    position: absolute;
    top: 0;
    left: 0%;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(
      90deg,
      rgba(24, 39, 61, 0.07) 5%,
      rgba(32, 129, 244, 1) 45%,
      #2081f3 60%,
      rgba(28, 82, 147, 0.5) 85%,
      rgba(24, 39, 61, 0.07) 100%
    );
  }
  .title-head {
    width: 100%;
    height: 0.16rem;
    display: flex;
    position: relative;
    justify-content: space-between;
    margin-bottom: 0.26rem;
    .title {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      color: #fff;
      // margin-bottom: 0.3rem;
      .round {
        display: flex;
        margin-right: 0.2rem;
      }
      p {
        font-size: 0.18rem;
      }
    }
    .magnify {
      position: absolute;
      right: 1px;
      top: 1px;
      width: 0.22rem;
      height: 0.22rem;
      cursor: pointer;
      img {
        width: 100%;
      }
    }
  }
  .canvas {
    width: 100%;
  }
}
</style>
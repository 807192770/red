<template>
  <div id="floatingbg">
    <div class="line"></div>
    <div class="title-head">
      <div class="title">
        <span class="round"></span>
        <p>{{titlename}}</p>
      </div>
      <span class="magnify" @click="showbigpicture()">
        <img src="../../assets/images/qurt_commen_zoomin.png" alt />
      </span>
    </div>
    <div>
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
#floatingbg {
  padding: 0.2rem;
  position: relative;
  background-image: linear-gradient(
    90deg,
    rgba(26, 32, 37, 0.07) 0%,
    rgba(183, 202, 231, 0.11) 30%,
    rgba(183, 202, 231, 0.14) 50%,
    rgba(35, 43, 53, 0.07) 100%
  );
  border-radius: 4px;
  // box-shadow: 0 0 12px #146070 inset;
  margin-bottom: 0.2rem;
  background-color: rgba(54, 84, 121, 0.3);
  .line {
    position: absolute;
    top:0;
    left: 12%;
    width: 4.2rem;
    height: 0.01rem;
    background-image: linear-gradient(
      90deg,
      rgba(183, 202, 231, 0.07) 0%,
      rgba(32, 129, 244, 1) 49%,
      #2081f3 50%,
      rgba(28, 82, 147, 0.5) 75%,
      #172331 100%
    );
  }
  .title-head {
    display: flex;
    position: relative;
    justify-content: space-between;
    .title {
      display: flex;
      align-items: center;
      color: #fff;
      .round {
        display: flex;
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 10px;
        border: solid 2px #1475e8;
      }
      p {
        font-size: 0.16rem;
        margin-left: 5px;
      }
    }
    .magnify {
      position: absolute;
      right: 1px;
      top: 1px;
      cursor: pointer;
    }
  }
}
</style>
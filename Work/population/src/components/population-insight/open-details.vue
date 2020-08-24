<template>
  <div class="details-insight">
    <div class="content-box">
      <div class="content">
        <div class="title">
          <span class="line"></span>
          <h3>{{title}}</h3>
          <span class="line2"></span>
        </div>
        <div class="close" @click="closebigpicture"><img src="../../assets/images/rkfx_commen_zoomout.png" alt=""></div>
        <div class="content-chart" :class="{mt: title === '国际漫游人员来源地'}">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  props:['title'],
  components: {},

  computed: {},

  mounted() {},

  methods: {
    closebigpicture() {
      this.$emit('closebigpicture')
    }
  }
}

</script>
<style lang='scss' scoped>
.details-insight{
  background-color: rgba($color: #000000, $alpha: 0.8);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;right: 0;left: 0;bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  .content-box{
    border: 3px solid #1d3e51;
    border-radius:3px;
    width: 1180px;
    /*height: 40%;*/
    /*min-height: 300px;*/
    .content{
      background-color: #031428;
      border: 1px solid #38c4e7;
      box-shadow: 0 0 12px #38c4e7 inset;
      border-radius:3px;
      width: 100%;
      /*height: 100%;*/
      position: relative;
      .title{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        padding: 20px;
        h3{
          padding: 0 10px;
        }
        .line{
          width: 200px;
          height: 2px;
          background: -webkit-linear-gradient(right, #031428 , #04dfff);
          background: -o-linear-gradient(right, #031428, #04dfff);
          background: -moz-linear-gradient(right, #031428, #04dfff);
          background: linear-gradient(to right, #031428 , #04dfff);
          display: block;
        }
        .line2{
          width: 200px;
          height: 2px;
          background: -webkit-linear-gradient(left, #031428 , #04dfff);
          background: -o-linear-gradient(left, #031428, #04dfff);
          background: -moz-linear-gradient(left, #031428, #04dfff);
          background: linear-gradient(to left, #031428 , #04dfff);
          display: block;
        }
      }
      .close{
        position: absolute;
        top: 26px;
        right: 26px;
        cursor: pointer;
      }
      .content-chart{
        overflow-y: auto;
        padding: 0 20px;
        &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
        }
        &::-webkit-scrollbar-track {
        box-shadow: 0px 0px 3px #038fb2 inset;
        border-radius: 10px;
        background: #038fb2;
        width: 2px;
        }
        &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #038fb2;
        }
        &.mt{
          margin-top: -15px;
        }
      }
    }
  }
}
</style>

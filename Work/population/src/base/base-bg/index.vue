<template>
  <div id="basebg">
    <div class="title-head">
      <div class="title">
        <img src="../../assets/images/circle.png" alt="" >
        <p>{{titlename}}</p>
      </div>
      <span class="magnify" @click="showbigpicture()"><img src="../../assets/images/magnify.png" alt=""></span>
    </div>
    <div class="border-up"><img src="../../assets/images/border-up.png" alt=""></div>
    <div class="border-down"><img src="../../assets/images/border-down.png" alt=""></div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'basebg',
    data() {
      return {
      }
    },
    props:['titlename'],
    computed: {},
    mounted() {

    },
    components: {},
    methods: {
      showbigpicture() {
        this.$emit('showbigpicture',1)
      }
    },
  };
</script>

<style lang="scss" scoped>
  #basebg {
    position: relative;
    padding: 20px;
    border: 1px solid #2e9fc0;
    border-radius: 3px;
    box-shadow: 0 0 12px #146070 inset;
    margin-bottom: 8px;
    background-color: rgba( 4,25,50,0.7);
    .title-head{
      display: flex;
      justify-content:space-between;
      height: 24px;
      .title{
        display: flex;
        align-items: center;
        color: #05deff;
        p{
          font-size: 18px;
          margin-left: 5px;
        }
      }
      .magnify{
        cursor: pointer;
      }
    }
    .border-up{
      position: absolute;
      top: -2px;
      left: -2px;
    }
    .border-down{
      position: absolute;
      bottom: -2px;
      right: -2px;
    }
  }
</style>
<template>
  <div class="basebg">
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
  .basebg {
    position: relative;
    padding: 0.2rem;
    height: 3rem;
    border: 1px solid #2e9fc0;
    border-radius: 3px;
    box-shadow: 0 0 12px #146070 inset;
    margin-bottom: 0.2rem;
    background-color: rgba( 4,25,50,0.7);
    .title-head{
      display: flex;
      justify-content:space-between;
      .title{
        display: flex;
        align-items: center;
        color: #fff;
        p{
          font-size: 0.16rem;
          margin-left: 5px;
        }
      }
      .magnify{
        cursor: pointer;
      }
    }
    .border-up{
      position: absolute;
      top: -1px;
      left: -1px;
    }
    .border-down{
      position: absolute;
      bottom: -2px;
      right: -1px;
    }
  }
</style>
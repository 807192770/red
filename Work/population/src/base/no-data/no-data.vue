<template>
  <div id="noData">
    <div class="imgbox">
      <img src="../../assets/images/nodata.png" alt="">
      <p>暂无数据</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'noData',
    data() {
      return {
      }
    },
    props:['height'],
    computed: {},
    mounted() {
      // this.setHeight()
    },
    components: {},
    methods: {
      setHeight() {
        var dom = document.getElementById('noData');
        dom.style.height=this.height + "rem"
      }
    },
  };
</script>

<style lang="scss" scoped>
#noData{
  display: flex;
  justify-content: center;
  align-items: center;
  .imgbox{
    img{
      width: 1.8rem;
    }
    p{
      text-align: center;
      font-size: 16px;
      color: #999999;
      margin-top: 6px;
      font-weight: bold;
    }
  }
}
</style>

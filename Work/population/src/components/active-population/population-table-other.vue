<template>
  <div id="carTable">
    <div class="tablebox" id="tablebox">
      <table border="1" cellspacing="1" cellpadding="1" >
        <tr>
          <th v-for="(item, index) in thcontent">{{item}}</th>
        </tr>
        <tr v-for="(item,index) in data">
          <td>{{item.region_name}}</td>
          <td>{{item.popu_dense}}</td>
          <td>{{item.popu_num}}</td>
        </tr>
      </table>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'carTable',
    data() {
      return {
        thcontent:['区域名称','人口密度（人/平方公里）', '人口数量'],
        data:[]
      }
    },
    props: ['dataList',"flag", "height",],
    watch: {
      dataList(val) {
        if(this.flag == 1) {
          this.data = this.dataList.slice(0, 5)
        }else {
          this.data = this.dataList
        }
      },
    },
    computed: {},
    mounted() {
    	this.$nextTick(() => {
	      var dom = document.getElementById("tablebox");
	      dom.style.height = this.height + "rem"
    });
      
      if(this.flag == 1) {
        this.data = this.dataList.slice(0, 5)
      }else {
        this.data = this.dataList
      }
    },
    components: {},
    methods: {},
  };
</script>

<style lang="scss" scoped>
  #carTable {
    .tablebox {
      width: 100%;
      /*min-width: 300px;
      height:190px;*/
      background-size: contain;
      font-size: 16px;
      table {
        width: 100%;
        margin: 10px 0;
        tr{
          &:nth-child(odd){
            background-color:rgba($color: #ffffff, $alpha: 0.05);
          }
        }
        th {
          padding: 14px;
          background-color: #293a4c;
          color: #00b5ff;
        }
        td {
          padding: 14px;
          text-align: center;
        }
      }
    }
  }
</style>
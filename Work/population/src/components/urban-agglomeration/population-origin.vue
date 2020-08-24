<template>
  <div class="population-origin">
    <!-- 流动人口来源地Top10 -->
<!--    <div class="tableBox" :style="{height:(height-0.34)+'rem'}">
      <el-table :data="tableData" stripe
        :header-cell-style="{background:'#041932',color:'#4B8CD3',padding:'1px 24px 1px 1px',border:'none'}"
        :cell-style="{padding:'1px 20px 1px 1px',borderBottom:'1px solid #214470'}" :height='tableOpenHeight + "rem"'>
        <el-table-column label="名次" width="80" align='center' prop="id" class-name="indexStyle">
        &lt;!&ndash;<el-table-column label="名次" width="80" align='center' type="index" class-name="indexStyle">&ndash;&gt;
        </el-table-column>
        <el-table-column prop="province" label="省份" align='center'>
        </el-table-column>
        <el-table-column prop="population" label="人数" align='center' width="120">
        </el-table-column>
      </el-table>
    </div>-->
    <div class="tableBox" :style="{height:(height-0.34)+'rem'}" v-show="tableData.length > 0">
      <div class="header">
        <ul>
          <li>名次</li>
          <li>省份</li>
          <li>人数</li>
        </ul>
      </div>
      <div class="body">
        <div class="item" v-for="(item,index) in tableData" :class="{red:item.id === 1,blue:item.id===2 || item.id===3}">
          <ul>
            <li><span v-text="index+1"></span></li>
            <li v-text="item.province"></li>
            <li v-text="item.population"></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: []
      };
    },
    props: {
      dataList: {
        // type: Object,
        // default: {}
      },
      count: {
        type: Number,
        default: 0
      },
      height: {
        type: Number,
        default: 0
      },
      flag: {
        type: Number,
        default: 0
      },
      tableOpenHeight: {
        type: Number,
      }
    },
    watch: {
      dataList(val) {
        console.log(val)
        if(this.flag===0){
          // this.tableData = val.slice(0,10)
          this.tableData = val;
        }else{
          this.tableData =val
        }
      }
    },
    mounted() {
      this.tableData=this.dataList
      // this.initData()

    },

    methods: {
      initData() {
        // 城市组合
        if (this.flag === 0) {
          // this.tableData.slice(0,10)
          let i = 0,temp = [],that = this;
          act(function(){
            if(i === 10) i = 0;
            if(i % 2 === 1){
              temp = that.tableData.splice(0,1);
            }else{
              that.tableData = that.tableData.concat(temp);
            }
            // console.log(1);
            i++;
          },1000);

          function act(fn, m){
            function act1(){
              setTimeout(act1, m);
              fn();
            }
            setTimeout(act1, m)
          }
        }
      },
    }
  }

</script>
<style lang='scss' scoped>
  .population-origin{
    .tableBox {
      margin: 22px 32px 12px 12px;
      .header{
        height: 28px;
        line-height: 26px;
        border: 1px solid #4b8cd3;
        border-radius: 2px;
        li{
          float: left;
          width: 33.33%;
          text-align: center;
          background: rgb(4, 25, 50);
          color: rgb(75, 140, 211);
          /* padding: 1px 24px 1px 1px; */
          border: none;
          font-size: 16px;
          &:first-child{
            text-align: left;
            padding-left: 30px;
          }
          &:last-child{
            text-align: right;
            padding-right: 30px;
          }
        }
      }
      .body{
        overflow-y: auto;
        /*三角箭头的颜色*/
        scrollbar-arrow-color: #038fb2;
        /*滚动条滑块按钮的颜色*/
        scrollbar-face-color: #038fb2;
        /*滚动条整体颜色*/
        scrollbar-highlight-color: #038fb2;
        /*滚动条阴影*/
        scrollbar-shadow-color: #038fb2;
        /*滚动条轨道颜色*/
        scrollbar-track-color: #038fb2;

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

        height: calc(100% - 28px);
        .red{
          color: #f45b5b;
          span{
            color: #214470;
            background: #f45b5b;
          }
        }
        .blue{
          color: #05deff;
          span{
            color: #214470;
            background: #05deff;
          }
        }
        .item{
          height: 28px;
          line-height: 26px;
          li{
            float: left;
            width: 33.33%;
            text-align: center;
            border-bottom: 1px solid rgb(33, 68, 112);
            &:first-child{
              text-align: left;
              padding-left: 30px;
            }
            &:last-child{
              text-align: right;
              padding-right: 30px;
            }
            span{
              display: inline-block;
              border-radius: 50%;
              border: 1px solid;
              text-align: center;
              height: 18px;
              line-height: 17px;
              font-size: 10px;
              width: 18px;
            }
          }
        }

      }
    }

  }

/*  .population-origin {

    .tableBox {
      overflow-y: hidden !important;
      margin: 22px 32px 12px 32px;
      !*三角箭头的颜色*!
      scrollbar-arrow-color: #038fb2;
      !*滚动条滑块按钮的颜色*!
      scrollbar-face-color: #038fb2;
      !*滚动条整体颜色*!
      scrollbar-highlight-color: #038fb2;
      !*滚动条阴影*!
      scrollbar-shadow-color: #038fb2;
      !*滚动条轨道颜色*!
      scrollbar-track-color: #038fb2;

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

      .el-table /deep/ {
        background: transparent;

        .el-table__header-wrapper {
          border: 1px solid #4B8CD3;
          border-radius: 2px;

          .gutter {
            background: #041932
          }
        }

        .el-table__body-wrapper {

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

          .el-table__row {
            background: transparent;
            height: 31px;

            td {
              background: transparent;
              border-bottom: 1px solid #214470;
              color: #fff;

              .cell {
                font-size: 14px;
              }

              &.indexStyle {
                .cell {
                  div {
                    border-radius: 50%;
                    padding: 0;
                    border: 1px solid #fff;
                    width: 17px;
                    height: 17px;
                    margin: 0 auto;
                    font-size: 11px;
                    line-height: 15px;
                    font-weight: normal;
                  }
                }
              }
            }

            &:hover {
              td {
                background: transparent;
              }
            }

            &:last-child {
              td {
                border-bottom: none !important;
              }
            }

            &:first-child {
              td {
                color: #F45B5B;

                &.indexStyle {
                  .cell {
                    div {
                      color: #002E73;
                      background: #F45B5B;
                      border: 1px solid #F45B5B;
                    }
                  }
                }
              }
            }

            &:nth-child(2),
            &:nth-child(3) {
              td {
                color: #05DEFF;

                &.indexStyle {
                  .cell {
                    div {
                      color: #002E73;
                      background: #05DEFF;
                      border: 1px solid #05DEFF;
                    }
                  }
                }
              }
            }

          }
        }

      }
    }

    .el-table::before {
      height: 0px;
    }
  }*/
</style>

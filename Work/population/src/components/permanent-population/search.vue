<template>
  <div class="search-box">
    <ul class="tabs">
      <li v-for="(item, index) in tablist" :class="{'current':index == ins}" @click="clickTab(index)">{{item}}</li>
    </ul>
    <div class="search-input">
      <p>石家庄</p>
    </div>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期"
      align="right"
      icon="el-icon-search"
      value-format="yyyy-MM-dd"
      @change="dateChange"
    ></el-date-picker>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      // tablist: ["职住移动规律"],
      tablist: ["职住移动规律", "工作地分布", "居住地分布"],
      ins:'',
      value1: "2019-09-22",
    };
  },
  props:['dataList'],
  computed: {
    ...mapGetters([
      'mapCrumb',
    ]),
  },
  components: {},
  watch: {
    dataList(val) {
      this.areaList = val
    },
    mapCrumb(val) {
      this.inputText = val.region_name
    }
  },

  mounted() {
  },

  methods: {
    clickTab(index) {
      // alert(index)
      this.ins = index
      this.$store.commit('SET_TABMENU', index)
    },
  		dateChange(val) {
      if(val) {
      var str = this.value1.replace(/-/g,"")
  		this.$emit('dateValue', str)

      }
  	},
    showArea() {
      this.isShowArea = true
    },
    getname(item) {
      this.inputText = item.region_name
      this.isShowArea = false
      var id = item.region_id
      var type = item.region_type
      var name = item.region_name
      var obj = {}
      obj.region_id = id
      obj.region_type = type
      obj.region_name = name
      console.log(obj)
      // this.toParent(id, type)
      this.$store.commit('SET_CRUMB', obj)
    },
    toParent(id, type) {
    	var obj = {}
    	obj.region_id = id
      obj.region_type = type;
      // console.log(obj)
		  // this.$emit('regionMes', obj)
		  // this.$emit('regionMapMes', obj)
    },
    switchCity(flag) {
      this.areaList.forEach(element => {
        element.isShowCity = flag;
        if (!flag) {
          element.children.forEach((el, index1) => {
            el.isShowCounty = false;
          });
        }
      });
    },
    switchCounty(index, flag) {
      if (flag) {
        this.areaList.forEach(element => {
          element.children.forEach((el, index1) => {
            if (index1 == index) {
              el.isShowCounty = true;
            } else {
              el.isShowCounty = false;
            }
          });
        });
      }
    }
  }
};
</script>
<style>
.search-box .el-input__icon {
  color: #3fd9ff;
  line-height: 36px;

}
.search-box .el-date-editor.el-input {
  width: 160px;
  margin-right: 20px;
}
.search-box .el-input__inner {
  color: #3fd9ff;
  height: 36px;

  border-radius: 0;
  background-color: rgba(33, 129, 234, 0.6);
  border:none;
  font-size: 16px;
  padding-left: 40px;
  padding-right: 30px;
}
input::-webkit-input-placeholder {
  color: red;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: red;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: red;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: red;
}
</style>

<style lang='scss' scoped>
.search-box {
  z-index: 9;
  display: flex;
  justify-content: space-between;
  position: absolute;
  // height: 72px;
  width: 65%;
  .tabs {
    display: flex;
    font-size: 16px;
    align-items: center;
    margin-left: 20px;
    li {
      padding: 10px 20px;
      border: 1px solid #1c3a66;
      color: #5976a1;
      margin-right: 10px;
      border-radius: 2px;
      cursor: pointer;
      &.current {
        background-color: #2181ea;
        border: 1px solid #2181ea;
        color: #ffffff;
      }
    }
  }
  .search-input {
    position: absolute;
    right:200px;
    top:0px;
    line-height: 36px;
    p{
      font-size: 16px;
    }
    // .text-box{
    //   position: relative;

    //   .text-input {
    //     font-size: 16px;
    //     background-color: rgba(33, 129, 234, 0.6);
    //     border: 1px solid #213148;
    //     padding: 7px 10px 9px 24px ;
    //     color: #40d8ff;
    //     margin-bottom: 1px;
    //     width: 94px;
    //   }
    //   span{
    //     font-size: 16px;
    //     color: #40d8ff;
    //     position: absolute;
    //     left: 8px;
    //     top: 9px;
    //   }
    //   i{
    //     position: absolute;
    //     right:10px;
    //     top: 10px;
    //     font-size: 16px;
    //     color: #40d8ff;
    //   }
    // }
    // .area-tree {
    //   position: absolute;
    //   right: 225px;
    //   color: #6b89bd;
    //   font-size: 16px;
    //   z-index: 9;
    //   .area-list {
    //     display: flex;
    //     .province-name {
    //       background-color: rgba(33, 129, 234, 0.6);
    //       padding: 9px 10px;
    //       width: 130px;
    //       display: flex;
    //       justify-content: space-between;
    //       &.current-select {
    //         background-color: #2071ca;
    //         color: #ffffff;
    //       }
    //     }
    //     .city {
    //       position: absolute;
    //       left: 130px;
    //       .area-list-children {
    //         display: flex;
    //         .city-name {
    //           width: 106px;
    //           background-color: rgba(33, 129, 234, 0.6);
    //           padding: 9px 10px;
    //           display: flex;
    //           justify-content: space-between;
    //           cursor: pointer;
    //           &.current-select {
    //             background-color: #2071ca;
    //             color: #ffffff;
    //           }
    //         }
    //         .county {
    //           position: absolute;
    //           left: 106px;
    //           width: 70px;
    //           .county-name {
    //             cursor: pointer;
    //             background-color: rgba(33, 129, 234, 0.6);
    //             padding: 9px 10px;
    //             &:hover {
    //               background-color: #2071ca;
    //               color: #ffffff;
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
  }
}
</style>

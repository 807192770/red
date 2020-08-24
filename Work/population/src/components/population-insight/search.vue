<template>
  <div class="search-box-insight">
    <div class="search-input">
      <div class="area-tree" v-show="false">
        <div class="text-box">
          <span class="el-icon-location-outline"></span>
          <input type="text" class="text-input" v-model="inputText" @focus="showArea()" />
          <i class="el-icon-caret-bottom"></i>
        </div>
        <ul v-show="isShowArea">
          <li
            v-for="(item, index) in areaList"
            class="area-list"
            @mouseover="switchCity(true)"
            @mouseout="switchCity(false)"
          >
            <p
              class="province-name"
              :class="{'current-select':item.isShowCity === true}"
              @click="getname(item)"
            >
              <span>{{item.label}}</span>
              <i class="el-icon-caret-right"></i>
            </p>
            <div class="city" v-show="item.isShowCity">
              <div
                v-for="(item1, index1) in item.children"
                class="area-list-children"
                @mouseover="switchCounty(index1,true)"
                @mouseout="switchCounty(index1,false)"
              >
                <p
                  class="city-name"
                  :class="{'current-select':item1.isShowCounty === true}"
                  @click="getname(item1)"
                >
                  <span>{{item1.label}}</span>
                  <i class="el-icon-caret-right"></i>
                </p>
                <div class="county" v-show="item1.isShowCounty">
                  <p
                    class="county-name"
                    v-for="(item2, index2) in item1.children"
                    @click="getname(item2)"
                  >{{item2.label}}</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期"
        align="right"
        icon="el-icon-search"
        value-format="yyyy-MM-dd"
        @change="dateChange()"
      ></el-date-picker>
      <el-dropdown trigger="click" class="fz16">
        <span class="el-dropdown-link">
          <span class="area-header"><b v-text="bText"></b><i class="el-icon-arrow-down el-icon--right"></i></span>
        </span>
        <em class="area-prefix">河北</em>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="getExname(item)" v-for="(item,index) in areaList" :key="item.customid" v-text="item.customname"></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      value1: "2019-09-20",
      inputText:"湖南省",
      bText:'长沙市',
      isShowArea: false,
      areaList: [
        {
          label: "华容县",
          id: "ie1233243"
        },
        {
          label: "君山区",
          id: "id1233243"
        }
      ]
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
      this.areaList = val;
      this.bText = val && val.length ? val[0].customname :'' ;
    },
    mapCrumb(val) {
      this.bText = val.customname;
    }
  },

  mounted() {
  },

  methods: {
    getExname(item){
      this.bText = item.customname;
      this.isShowArea = false;
      this.$emit('regionValue', item.customid)
    },
  	dateChange() {
      let str = this.value1.replace(/-/g,"");
  		this.$emit('dateValue', str)
  	},
    showArea() {
      this.isShowArea = true
    },
    getname(item) {
      this.inputText = item.region_name;
      this.isShowArea = false;
      let id = item.region_id;
      let type = item.region_type;
      let name = item.region_name;
      let obj = {};
      obj.region_id = id;
      obj.region_type = type;
      obj.region_name = name;
      // this.toParent(id, type)
      console.log("getname",obj);
      this.$store.commit('SET_POPULATION_CRUMB', obj)
    },
    toParent(id, type) {
    	var obj = {};
    	obj.region_id = id;
      obj.region_type = type;
      // console.log(obj)
		  // this.$emit('regionMes', obj)
		  // this.$emit('regionMapMes', obj)
    },
    switchCity(flag) {
      this.areaList.forEach(element => {
        element.isShowCity = flag;
        if (!flag) {
          element.children.forEach((el) => {
            el.isShowCounty = false;
          });
        }
      });
    },
    switchCounty(index, flag) {
      if (flag) {
        this.areaList.forEach(element => {
          element.children.forEach((el, index1) => {
            el.isShowCounty = index1 === index;
          });
        });
      }
    }
  }
};
</script>
<style>
.search-box-insight .el-input__icon {
  color: #3fd9ff;
  line-height: 36px;
}
.search-box-insight .el-date-editor.el-input {
  width: 160px;
  margin-left: 20px;
}
.search-box-insight .el-input__inner {
  color: #3fd9ff;
  height: 36px;
  border-radius: 0;
  background-color: #213044;
  border: 1px solid #213044;
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
.search-box-insight {


  .search-input {

    position: relative;
    height: 48px;
      .text-box{
        position: relative;

        .text-input {
          font-size: 16px;
          background-color: #213148;
          border: 1px solid #213148;
          padding: 7px 10px 9px 24px ;
          color: #40d8ff;
          margin-bottom: 1px;
          width: 94px;
        }
        span{
          font-size: 16px;
          color: #40d8ff;
          position: absolute;
          left: 8px;
          top: 9px;
        }
        i{
          position: absolute;
          right:10px;
          top: 10px;
          font-size: 16px;
          color: #40d8ff;
        }
      }
      .area-tree {
        position: absolute;
        left: 62px;
        color: #6b89bd;
        font-size: 16px;
        z-index: 9;
        .area-list {
          display: flex;
          .province-name {
            background-color: #213148;
            padding: 9px 10px;
            width: 130px;
            display: flex;
            justify-content: space-between;
            &.current-select {
              background-color: #2071ca;
              color: #ffffff;
            }
          }
          .city {
            position: absolute;
            left: 130px;
            .area-list-children {
              display: flex;
              .city-name {
                width: 106px;
                background-color: #213148;
                padding: 9px 10px;
                display: flex;
                justify-content: space-between;
                cursor: pointer;
                &.current-select {
                  background-color: #2071ca;
                  color: #ffffff;
                }
              }
              .county {
                position: absolute;
                left: 106px;
                width: 70px;
                .county-name {
                  cursor: pointer;
                  background-color: #213148;
                  padding: 9px 10px;
                  &:hover {
                    background-color: #2071ca;
                    color: #ffffff;
                  }
                }
              }
            }
          }
        }
      }
      .area-prefix{
        color: #3fd9ff;
        height: 36px;
        line-height: 30px;
        border-radius: 0;
        float: left;
        background-color: #213044;
        border: 1px solid #213044;
        font-size: 16px;
        padding: 0 10px;
        display: inline-block;
        vertical-align: middle;
      }
      .area-header{
        @extend .area-prefix;
        margin-left: 10px;
        float: none;
        cursor: pointer;
      }

      .el-dropdown,
      .el-date-editor{
        float: right;
      }
    }
}
</style>

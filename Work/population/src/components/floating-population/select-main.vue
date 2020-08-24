<template>
  <div class="search-box-float">
    <div class="search-input">
      <div class="area-tree">
        <div class="text-box" @click="showArea()">
          <span class="el-icon-location-outline"></span>
          <input type="text" class="text-input" v-model="inputText" />
          <!-- <i class="el-icon-caret-bottom"></i> -->
        </div>
        <!-- <ul v-show="isShowArea">
          <li v-for="(item, index) in areaList" class="area-list" :key="index" @mouseover="switchCity(true,index)"
            @mouseout="switchCity(false)">
            <p class="province-name" :class="{'current-select':index == activeTr}" @click="getname(item)">
              <span>{{item.label}}</span>
              <i class="el-icon-caret-right"></i>
            </p>
          </li>
        </ul> -->
      </div>
      <el-date-picker v-model="value1" type="date" placeholder="选择日期" align="right" clear-icon="el-icon-caret-bottom"
        value-format="yyyy-MM-dd" @change="dateChange()"></el-date-picker>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        value1: "2019-09-22",
        inputText: "雄安新区",
        isShowArea: false,
        areaList: [{
          label: "长沙市",
          id: "1233243",
        }, {
          label: "芙蓉区",
          id: "1233243",
        }, {
          label: "芙蓉区",
          id: "1233243",
        }, {
          label: "芙蓉区",
          id: "1233243",
        }, {
          label: "芙蓉区",
          id: "1233243",
        }, {
          label: "芙蓉区",
          id: "1233243",
        }],
        activeTr: "",
      };
    },
    props: ['dataList'],
    computed: {
      ...mapGetters([
        // 'mapCrumb',
      ]),
    },
    components: {},
    watch: {
      // dataList(val) {
      //   this.areaList = val
      // },
      // mapCrumb(val) {
      // 	this.inputText = val.region_name
      // }
    },

    mounted() {},

    methods: {
      dateChange(val) {
        var str = this.value1.replace(/-/g, "")
        this.$emit('dateValue', str)
      },
      showArea() {
        this.isShowArea = !this.isShowArea
      },
      getname(item) {
        this.inputText = item.label
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
      switchCity(flag, index) {
        this.activeTr = index;
        // this.areaList.forEach(element => {
        //   if (!flag) {
        //     element.children.forEach((el, index1) => {
        //       el.isShowCounty = false;
        //     });
        //   }
        // });
      },
    }
  };

</script>
<style>
  .search-box-float .el-input__icon {
    color: #3fd9ff;
    line-height: 36px;
  }

  .search-box-float .el-date-editor.el-input {
    width: 170px;
    height: 36px;
  }

  .search-box-float .el-input__inner {
    color: #3fd9ff;
    height: 36px;
    line-height: 36px;
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
  .search-box-float {
    // display: flex;
    // justify-content: flex-end;
    position: relative;

    .search-input {
      display: flex;
      height: 36px;
      justify-content: flex-end;

      .text-box {
        position: relative;

        .text-input {
          font-size: 16px;
          background-color: #213148;
          border: 1px solid #213148;
          padding: 7px 25px 9px 30px;
          color: #40d8ff;
          margin-bottom: 1px;
          width: 75px;
        }

        span {
          font-size: 16px;
          color: #40d8ff;
          position: absolute;
          left: 12px;
          top: 11px;
        }

        i {
          position: absolute;
          right: 10px;
          top: 10px;
          font-size: 16px;
          color: #40d8ff;
        }
      }

      .area-tree {
        color: #6b89bd;
        font-size: 16px;
        z-index: 9;
        margin-right: 20px;

        .area-list {
          display: flex;

          .province-name {
            background-color: #213148;
            padding: 9px 10px;
            width: 132px;
            display: flex;
            justify-content: space-between;
            color: #6B89BD;

            &.current-select {
              background-color: #2071ca;
              color: #ffffff;
            }
          }

          .city {
            position: absolute;
            left: 132px;

            .area-list-children {
              display: flex;

              .city-name {
                width: 120px;
                background-color: #213148;
                padding: 9px 10px;
                display: flex;
                justify-content: space-between;
                cursor: pointer;
                color: #6B89BD;

                &.current-select {
                  background-color: #2071ca;
                  color: #ffffff;
                }
              }

              .county {
                position: absolute;
                left: 120px;
                width: 70px;

                .county-name {
                  display: block;
                  width: 73px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
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
    }
  }

</style>

<template>
  <div class="search-active">
    <ul class="tabs">
      <li v-for="(item, index) in tablist" :class="{'current':index == 0}">{{item}}</li>
    </ul>
    <div class="search-input">
      <div class="area-tree">
        <div class="text-box">
          <span class="el-icon-location-outline"></span>
          <!-- <div @click="showArea()">
            <div class="text-input" v-html="inputText"></div>
            <i class="el-icon-caret-bottom"></i>
          </div>-->
          <div>
            <div class="text-input" v-html="inputText"></div>
          </div>
        </div>

        <ul v-show="isShowArea">
          <li v-for="(item, index) in areaList" class="area-list" @mouseover="switchCity(true)"
            @mouseout="switchCity(false)">
            <p class="province-name" :class="{'current-select':item.isShowCity == true}" @click="getname(item)">
              <span>{{item.region_name}}</span>
              <i class="el-icon-caret-right"></i>
            </p>
            <div class="city" v-show="item.isShowCity">
              <div v-for="(item1, index1) in item.children" class="area-list-children"
                @mouseover="switchCounty(index1,true)" @mouseout="switchCounty(index1,false)">
                <p class="city-name" :class="{'current-select':item1.isShowCounty == true}" @click="getname(item1)">
                  <span>{{item1.region_name}}</span>
                  <i class="el-icon-caret-right"></i>
                </p>
                <div class="county" v-show="item1.isShowCounty">
                  <p class="county-name" v-for="(item2, index2) in item1.children" @click="getname(item2)">
                    {{item2.region_name}}</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <el-date-picker v-model="value1" type="date" placeholder="选择日期" align="right" icon="el-icon-search"
        value-format="yyyy-MM-dd" @change="dateChange" format="yyyy-MM-dd"></el-date-picker>
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
        // tablist: ["人口分布", "户籍来源", "号码归属地"],
        tablist: ["人口分布"],
        value1: "2019-09-20",
        inputText: "雄安",
        isShowArea: false,
        areaList: [{
          label: "湖南省",
          id: "1233243",
          isShowCity: false,
          children: [{
              label: "岳阳市",
              id: "1233243",
              isShowCounty: false,
              children: [{
                  label: "华容县",
                  id: "1233243"
                },
                {
                  label: "君山区",
                  id: "1233243"
                },
                {
                  label: "君山区",
                  id: "1233243"
                },
                {
                  label: "君山区",
                  id: "1233243"
                },
                {
                  label: "君山区",
                  id: "1233243"
                },
                {
                  label: "君山区",
                  id: "1233243"
                }
              ]
            },
            {
              label: "长沙市",
              id: "1233243",
              isShowCounty: false,
              children: [{
                  label: "华容县",
                  id: "1233243"
                },
                {
                  label: "君山区",
                  id: "1233243"
                }
              ]
            },
            {
              label: "长沙市",
              id: "1233243",
              isShowCounty: false,
              children: [{
                  label: "华容县",
                  id: "1233243"
                },
                {
                  label: "君山区",
                  id: "1233243"
                },
                {
                  label: "君山区",
                  id: "1233243"
                },
                {
                  label: "君山区",
                  id: "1233243"
                },
                {
                  label: "君山区",
                  id: "1233243"
                },
                {
                  label: "君山区",
                  id: "1233243"
                },
                {
                  label: "君山区",
                  id: "1233243"
                }
              ]
            },
            {
              label: "长沙市",
              id: "1233243",
              isShowCounty: false,
              children: [{
                  label: "华容县",
                  id: "1233243"
                },
                {
                  label: "君山区",
                  id: "1233243"
                }
              ]
            }
          ]
        }]
      };
    },
    props: ['dataList'],
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

    mounted() {},

    methods: {
      dateChange(val) {
        if (val) {
          var str = this.value1.replace(/-/g, "")
          this.$emit('dateValue', str)

        }
      },
      showArea() {
        this.isShowArea = !this.isShowArea
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
        this.$store.commit('SET_XIONGAN_ACTIVE_CRUMB', obj)
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
  .search-active .el-input__icon {
    color: #3fd9ff;
    line-height: 36px;
  }

  .search-active .el-input__icon {
    width: 25px;
  }

  .search-active .el-date-editor.el-input {
    width: 160px;
  }

  .search-active .el-input__inner {
    color: #3fd9ff;
    height: 37px;
    border-radius: 0;
    background-color: #213044;
    border: 1px solid #213044;
    font-size: 16px;
    padding-left: 36px;
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
  .search-active {
    display: flex;
    justify-content: space-between;
    position: relative;
    height: 40px;
    margin-bottom: 15px;

    .tabs {
      display: flex;
      font-size: 16px;
      align-items: center;

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
      .text-box {
        position: relative;

        .text-input {
          font-size: 16px;
          background-color: #213148;
          border: 1px solid #213148;
          // padding: 10px 25px 11px 9px ;
          color: #40d8ff;
          margin-bottom: 1px;
          width: 106px;
          height: 37px;
          line-height: 36px;
          padding-left: 10px;
          cursor: pointer;
        }

        span {
          font-size: 18px;
          color: #40d8ff;
          position: absolute;
          left: -25px;
          top: 9px;
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
        position: absolute;
        right: 166px;
        color: #6b89bd;
        font-size: 16px;
        z-index: 9;

        .area-list {
          display: flex;

          .province-name {
            background-color: #213148;
            padding: 9px 10px;
            width: 106px;
            display: flex;
            justify-content: space-between;

            &.current-select {
              background-color: #2071ca;
              color: #ffffff;
            }

            cursor: pointer;
          }

          .city {
            position: absolute;
            left: 106px;

            .area-list-children {
              display: flex;

              .city-name {
                background-color: #213148;
                padding: 9px 10px;
                display: flex;
                justify-content: space-between;
                cursor: pointer;

                &.current-select {
                  background-color: #2071ca;
                  color: #ffffff;
                }

                span {
                  display: block;
                  width: 73px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
              }

              .county {
                position: absolute;
                left: 106px;
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

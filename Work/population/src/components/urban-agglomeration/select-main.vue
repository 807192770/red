<template>
  <div class="search-box-urban">
    <!-- <div class="tabs">河北省 —> 京津冀</div> -->
    <div class="search-input">
      <div class="area-tree">
        <div class="text-box" @click="showArea()">
          <span class="el-icon-location-outline"></span>
          <input type="text" class="text-input" v-model="inputText" />
          <!-- <i class="el-icon-caret-bottom"></i> -->
        </div>
      </div>
      <el-date-picker v-model="value1" type="date" placeholder="选择日期" align="right" value-format="yyyy-MM-dd"
        @change="dateChange"></el-date-picker>
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
        inputText: "京津冀",
        isShowArea: false,
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
      dataList(val) {
        this.areaList = val
      },
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
    }
  };

</script>
<style>
  .search-box-urban .el-input__icon {
    color: #3fd9ff;
    line-height: 36px;
  }

  .search-box-urban .el-date-editor.el-input {
    width: 170px;
  }

  .search-box-urban .el-input__inner {
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
  .search-box-urban {
    display: flex;
    justify-content: flex-end;
    position: relative;

    .tabs {
      position: absolute;
      left: 0;
      top: 0;
      line-height: 36px;
      color: #40d8ff;
      font-size: 20px;
    }

    .search-input {
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
        position: absolute;
        right: 180px;
        color: #6b89bd;
        font-size: 16px;
        z-index: 9;

        .area-list {
          display: flex;

          .province-name {
            background-color: #213148;
            padding: 9px 10px;
            width: 132px;
            display: flex;
            justify-content: space-between;
            color: #5389B2;

            &.current-select {
              background-color: #2181EA;
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
                color: #5389B2;

                &.current-select {
                  background-color: #2181EA;
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

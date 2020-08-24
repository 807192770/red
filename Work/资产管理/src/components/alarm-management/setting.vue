<template>
  <div class="alarm-management-setting">
    <!-- 告警设置 -->
    <div class="main">
      <div class="list">
        <div class="item">
          <h3 class="title">新建警告</h3>
          <el-form :label-position="labelPosition" label-width="80px">
            <el-form-item label="标签ID：">
              <el-input v-model="name"></el-input>
              <el-button type="primary" plain @click="addLabel">添加</el-button>
            </el-form-item>
            <el-form-item label="已添加标签ID：">
              <div class="alreadyID">
                <ul>
                  <li
                    v-for="(item, index) in list"
                    :data-index="index"
                    :key="index"
                    @click="setListCheck(item,index)"
                    :class="{'cur':item.check}"
                  >{{ item.label }}</li>
                </ul>
              </div>
            </el-form-item>
            <el-button type="primary" @click="start()" size="small" style="width:100%;">结束添加开始选择区域</el-button>
          </el-form>
        </div>
        <div class="item">
          <h3 class="title">已建警告</h3>
          <el-form :label-position="labelPosition" label-width="80px">
            <el-form-item label="已建警告标签ID：">
              <div class="alreadyID">
                <ul>
                  <li v-for="(item, index) in arr" :data-index="index">{{ item.label }}</li>
                </ul>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="map">
        <div class="map-content">
          <!-- 寅时地图 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeClass: "-1",
      labelPosition: "top",
      name: "",
      list: [
        { check: false, label: "标签1-1" },
        { check: false, label: "标签1-2" },
        { check: false, label: "标签1-3" }
      ],
      arr: []
    };
  },

  components: {},

  mounted() {},

  methods: {
    getMapLine() {
      var params = {
        task: "cityGroupContanctPeople",
        statisDate: this.day
      };
      getCityAnalysisGroup(params).then(response => {
        this.mapAllData = response.data;
      });
    },
    setListCheck: function(item, idx) {
      let check = this.list[idx].check;
      this.list[idx].check = !check;
      let flag = this.arr.find(x => x.label == item.label);
      flag ? this.arr.splice(this.arr.indexOf(flag), 1) : this.arr.push(item);
    },
    addLabel(){
      this.list.push( { check: false, label: this.name });
      this.name = '';
    }
  }
};
</script>
<style lang='scss' scoped>
.alarm-management-setting {
  display: flex;
  justify-content: center;

  .main {
    width: 80%;
    display: flex;
    .list {
      flex: 0.4;
      height: 100%;
      background: white;
      .item /deep/ {
        padding: 20px 25px;
        border-bottom: 1px solid #ebebeb;
        .title {
          margin-bottom: 15px;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
          font-size: 16px;
        }
       
        .el-form-item__content {
          display: flex;
          button {
            margin-left: 10px;
          }
          .alreadyID {
            max-height: 245px;
            min-height: 100px;
            width: 100%;
            border-radius: 4px;
            border: 1px solid #ddd;
            overflow-y: scroll;
            padding: 8px 20px;
            &::-webkit-scrollbar {
              width: 10px;
              height: 10px;
            }
            &::-webkit-scrollbar-track {
              background: rgb(239, 239, 239);
              border-radius: 2px;
            }
            &::-webkit-scrollbar-thumb {
              background: #bfbfbf;
              border-radius: 10px;
            }
            &::-webkit-scrollbar-thumb:hover {
              background: #333;
            }
            &::-webkit-scrollbar-corner {
              background: #179a16;
            }
            li {
              line-height: 40px;
              margin: 5px 0;
              border-radius: 5px;
              padding-left: 10px;
              &.cur {
                background: #409eff;
                color: #fff;
              }
            }
          }
        }
      }
    }
    .map {
      margin-left: 30px;
      flex: 1;
      // height: 800px;
    }
  }
}
</style>

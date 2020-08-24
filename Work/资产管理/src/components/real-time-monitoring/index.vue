<template>
  <div class="real-time-monitoring">
    <!-- 实时监控 -->
    <div class="main">
      <div class="list">
        <div class="search">
          <div class="demo-input-suffix">
            标签ID：
            <el-input placeholder="请输入搜索内容" v-model="searchKey" class="search-box">
              <a slot="suffix" class="el-input__icon el-icon-search"></a>
            </el-input>
          </div>
        </div>
        <div class="ctrl">
          <el-radio-group v-model="radio">
            <el-radio :label="0" @change="AllElection">全选</el-radio>
            <el-radio :label="1" @change="reversElection">反选</el-radio>
            <el-radio :label="2" @change="cancelAll">全部取消</el-radio>
          </el-radio-group>
        </div>
        <div class="item">
          <Tree :data="treeData" show-checkbox @on-check-change="getCheckedNodes"></Tree>
        </div>
      </div>
      <div class="map">
        <div class="search">
          <el-form
            :model="formInline"
            class="demo-form-inline"
            :label-position="labelPosition"
          >
            <el-form-item label="选择地图：">
              <el-select v-model="formInline.building">
                <el-option label="京东亦庄一号楼" value="shanghai"></el-option>
                <el-option label="京东亦庄二号楼" value="beijing"></el-option>
              </el-select>
              <el-select v-model="formInline.floor">
                <el-option label="一层" value="shanghai"></el-option>
                <el-option label="二层" value="beijing"></el-option>
              </el-select>
              <el-select v-model="formInline.office">
                <el-option label="办公室" value="shanghai"></el-option>
                <el-option label="办公室" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">确认</el-button>
            </el-form-item>
          </el-form>
        </div>
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
      searchKey: "",
      radio: -1,
      labelPosition: "left",
      treeData: [
        {
          title: "仓库1",
          expand: true,
          checked: false,
          children: [
            {
              title: "标签 1-1",
              checked: false
            },
            {
              title: "标签 1-2",
              checked: false
            }
          ]
        },
        {
          title: "仓库2",
          expand: true,
          checked: false,
          children: [
            {
              title: "标签 2-1",
              checked: false
            },
            {
              title: "标签 2-2",
              checked: false
            }
          ]
        },
        {
          title: "仓库3",
          expand: true,
          checked: false,
          children: [
            {
              title: "标签 3-1",
              checked: false
            },
            {
              title: "标签 3-2",
              checked: false
            }
          ]
        },
        {
          title: "仓库4",
          expand: true,
          checked: false,
          children: [
            {
              title: "标签 4-1",
              checked: false
            },
            {
              title: "标签 4-2",
              checked: false
            }
          ]
        }
      ],
      formInline: {
        building: "",
        floor: "",
        office: ""
      }
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
        sessionStorage.setItem("mapLineData", JSON.stringify(response.data));
        this.mapAllData = response.data;
      });
    },
    getCheckedNodes(e) {
      console.log(e);
    },
    AllElection() {
      this.treeData.forEach(item => {
        item.children.forEach(val => {
          val.checked = true;
        });
      });
    },
    reversElection() {
      this.treeData.forEach(item => {
        // item.checked = !item.checked;
        item.children.forEach(val => {
          val.checked = !val.checked;
        });
      });
    },
    cancelAll() {
      this.treeData.forEach(item => {
        item.checked = false;
        item.indeterminate = false;
        item.children.forEach(val => {
          val.checked = false;
          val.indeterminate = false;
        });
      });
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
<style lang='scss' scoped>
.real-time-monitoring {
  display: flex;
  justify-content: center;

  .main {
    width: 80%;
    display: flex;
    .list {
      flex: 0.45;
      background: white;
      .search {
        padding: 20px 17px;
        border-bottom: 1px solid #f4f5f6;
        .search-box {
          width: 79%;
        }
      }
      .ctrl {
        padding: 17px;
        border-bottom: 1px solid #f4f5f6;
        background: #f9fafc;
      }
      .item {
        padding: 20px 17px;
      }
    }
    .map {
      margin-left: 25px;
      flex: 1;
      height: 720px;
      background: white;
      .search {
        padding: 20px 17px;
        border-bottom: 1px solid #f4f5f6;
        background:rgba(249,250,252,1);
        .el-form {
          display: flex;
          justify-content: space-between;
          .el-form-item {
            margin-bottom: 0;
            .el-select {
              width: 25%;
            }
          }
        }
      }
    }
  }
}
</style>

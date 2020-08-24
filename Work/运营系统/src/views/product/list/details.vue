<template>
  <div class="app-container">
    <el-row class="header" type="flex" justify="space-around">
      <el-col :span="16">
        <el-form :model="baseInfo" :inline="true">
          <el-form-item label="产品名称：">{{this.$route.query.name}}</el-form-item>
          <el-form-item label="创建时间：">{{this.$route.query.time}}</el-form-item>
        </el-form>
      </el-col>
      <el-col :span="1.5">
        <el-popover placement="bottom" width="200" v-model="visible" @hide="selectAttr = ''">
          <el-select
            v-model="selectAttr"
            clearable
            filterable
            value-key="id"
            @change="currentSel"
            placeholder="请选择"
            size="mini"
          >
            <el-option
              v-for="item in initAttrList"
              :key="item.id"
              :label="item.title"
              :value="item"
            ></el-option>
          </el-select>
          <div style="text-align: right; margin-top:10px">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="addAttr">确定</el-button>
          </div>
          <el-button slot="reference" class="mt5" type="primary" size="mini">添加属性</el-button>
        </el-popover>
      </el-col>
    </el-row>
    <el-collapse accordion v-model="activeNames" class="content">
      <!-- <el-collapse-item name="1">
        <template slot="title">
          <el-row class="headers">
            <el-col :span="4" class="name">基本信息</el-col>
          </el-row>
        </template>
        <div class="p25">
          <el-row :gutter="20" class="list">
            <el-col class="item" :span="8" v-for="(item,index) in inputArr" :key="index">
              <div
                :is="categoryList['status'+item.category].page"
                :dataInfo="item"
                @saveRow="saveRow"
              ></div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <el-row class="headers">
            <el-col :span="4" class="name">文件信息</el-col>
          </el-row>
        </template>
        <div class="p25">
          <el-row :gutter="20" class="list">
            <el-col class="item" :span="8" v-for="(item,index) in uploadArr" :key="index">
              <div
                :is="categoryList['status'+item.category].page"
                :dataInfo="item"
                @saveRow="saveRow"
              ></div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <el-row class="headers">
            <el-col :span="4" class="name">数据信息</el-col>
          </el-row>
        </template>
        <div class="p25">
          <el-row :gutter="20" class="list">
            <el-col class="item" :span="8" v-for="(item,index) in dataArr" :key="index">
              <div
                :is="categoryList['status'+item.category].page"
                :dataInfo="item"
                @saveRow="saveRow"
              ></div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>-->
      <el-collapse-item :name="i" v-for="(el,i) in viewsArrs" :key="i">
        <template slot="title">
          <el-row class="headers">
            <el-col :span="4" class="name">{{el.name}}</el-col>
          </el-row>
        </template>
        <div class="p25">
          <el-row :gutter="20" class="list">
            <el-col class="item" :span="8" v-for="(item,index) in el.dataArr" :key="index">
              <div
                :is="categoryList['status'+item.category].page"
                :dataInfo="item"
                @saveRow="saveRow"
              ></div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import AShortTxt from "../../components/components/attr-shortTxt";
import ALongTxt from "../../components/components/attr-longTxt";
import AImg from "../../components/components/attr-img";
import AFile from "../../components/components/attr-file";
import AAudio from "../../components/components/attr-audio";
import AInt from "../../components/components/attr-int";
import ANum from "../../components/components/attr-num";
import AData from "../../components/components/attr-data";
import {
  GetDetailListByID,
  DeleteProdDetail,
  UpdateProdDetail,
  GetDetailByID,
  UpdateProdFile,
  UpdateProdMultipleFile,
} from "@/api/product/details.js";
GetAttrList;
import { GetAttrList } from "@/api/product/attr.js";
export default {
  name: "productDetails",
  data() {
    return {
      baseInfo: {
        orderNo: "454654564",
        checkList: ["设备列表", "功能描述"],
      },
      activeNames: [0],
      categoryList: {
        status1: {
          name: "数字",
          page: "ANum",
        },
        status2: {
          name: "整数",
          page: "AInt",
        },
        status3: {
          name: "短文本",
          page: "AShortTxt",
        },
        status4: {
          name: "长文本",
          page: "ALongTxt",
        },
        status5: {
          name: "图片",
          page: "AImg",
        },
        status6: {
          name: "音频",
          page: "AAudio",
        },
        status7: {
          name: "视频",
          page: "AAudio",
        },
        status8: {
          name: "文件",
          page: "AFile",
        },
        status9: {
          name: "json数组",
          page: "AData",
        },
      },
      list: [],
      // inputArr:[],
      // uploadArr: [],
      // dataArr: [],
      attrList: [],
      visible: false,
      selectAttr: {},
      viewsArrs: [
        {
          name: "基本信息",
          dataArr: [],
        },
        {
          name: "文件信息",
          dataArr: [],
        },
        {
          name: "数据信息",
          dataArr: [],
        },
      ],
    };
  },
  inject: ["reload"],
  created() {
    this.getAttrList();
    this.getDetailListByID(this.$route.query.id);
  },
  computed: {
    initAttrList() {
      var result = [];
      this.attrList.forEach((el) => {
        var id = el.id;
        var isExist = false;
        this.list.forEach((it) => {
          var attributeId = it.attributeId;
          if (attributeId == id) {
            isExist = true;
            return false;
          }
        });
        if (!isExist) {
          result.push(el);
        }
      });
      return result;
    },
  },
  components: {
    AShortTxt,
    ALongTxt,
    AImg,
    AFile,
    AAudio,
    AInt,
    ANum,
    AData,
  },
  methods: {
    getDetailListByID(id) {
      GetDetailListByID(id).then((response) => {
        this.list = response.data;
        this.list.forEach((element) => {
          if (element.category > 0 && element.category <= 4) {
            this.viewsArrs[0].dataArr.push(element);
          } else if (element.category > 4 && element.category <= 8) {
            this.viewsArrs[1].dataArr.push(element);
          } else {
            this.viewsArrs[2].dataArr.push(element);
          }
        });
      });
    },
    getAttrList() {
      GetAttrList().then((r) => {
        this.attrList = r.data;
      });
    },
    saveRow(obj) {
      obj.productId = this.$route.query.id;
      UpdateProdDetail(obj).then((r) => {
        this.msgSuccess(r.data);
        this.reload();
      });
    },
    addAttr() {
      this.visible = false;
      let obj = {
        atitle: this.selectAttr.title,
        attributeId: this.selectAttr.id,
        category: this.selectAttr.category,
      };
      if (this.selectAttr.category > 0 && this.selectAttr.category <= 4) {
        this.viewsArrs[0].dataArr.push(obj);
        this.activeNames = [0];
      } else if (
        this.selectAttr.category > 4 &&
        this.selectAttr.category <= 8
      ) {
        this.viewsArrs[1].dataArr.push(obj);
        this.activeNames = [1];
      } else {
        this.viewsArrs[2].dataArr.push(obj);
        this.activeNames = [2];
      }
    },
    currentSel(selVal) {
      // console.log(selVal);
    },
  },
};
</script>
<style lang='scss' scoped>
.header {
  padding: 10px 5px;
  background: #f5f5f5;
  border-radius: 5px;
  .el-form-item {
    margin-bottom: 0;
    margin-right: 30px;
  }
}
.content /deep/ {
  margin: 30px auto;
  .el-collapse-item__header {
    background: #f5f5f5;
    border-radius: 5px 5px 0 0;
    .headers {
      width: 100%;
      .el-col.name {
        text-indent: 3em;
      }
    }
  }
  .el-collapse-item__content {
    .list {
      flex-wrap: wrap;
      display: flex;
      .item {
        margin: 10px 0 10px 0;
        padding: 15px;
        border-radius: 5px;
        .item-content {
          display: flex;
          flex-direction: column;
          min-height: 180px;
          .key {
            font-weight: 800;
            font-size: 18px;
            margin-bottom: 15px;
          }
          .value {
            flex: 1 1 auto;
            min-height: 0;
          }
          .ctrl {
            text-align: right;
            margin-top: 15px;
          }
        }
      }
    }
  }
}
.p25 {
  padding: 10px 25px 0 25px;
}
</style>
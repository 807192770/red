<template>
  <div class="imgs">
    <el-card shadow="hover">
      <el-form label-position="top" :model="form" size="small" ref="form">
        <el-form-item>
          <div slot="label" class="title">
            <div>上传图片</div>
            <span class="tips">只能上传 png / jpg / bmp 类型的文件，且不超过2M</span>
          </div>
          <el-upload
            class="upload"
            action="#"
            ref="upload"
            accept="image/jpeg, image/png, image/gif, image/bmp"
            list-type="picture-card"
            :auto-upload="false"
            :limit="limitNum"
            :before-upload="beforeUploadFile"
            :on-change="fileChange"
            :on-exceed="exceedFile"
            :on-success="handleSuccess"
            :on-error="handleError"
            :file-list="fileList"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}" class="list">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item style="margin-bottom:0">
          <el-button class="fr" type="primary" size="mini" @click="submitForm">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" width="40%">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import { UpdateProdFile } from "@/api/product/details.js";
import axios from "axios";
export default {
  name: "imgs",
  data() {
    return {
      limitNum: 1,
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      form: {
        file: "",
      },
      fileList: [],
    };
  },
  props: ["dataInfo"],
  watch: {
    dataInfo(n, o) {
      if (n.attributeValue) this.fileList.push({ url: n.attributeValue });
    },
  },
  created() {
    if (this.dataInfo.attributeValue)
      this.fileList.push({ url: this.dataInfo.attributeValue });
  },
  methods: {
    handleRemove(file) {
      // 删除图片
      console.log(file);
      this.$refs.upload.handleRemove(file);
    },
    handlePictureCardPreview(file) {
      // 查看图片
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      // 下载图片
      console.log(file);
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      console.log(file);
      const isJPG = file.raw.type === "image/jpeg";
      const isPNG = file.raw.type === "image/png";
      const isBMP = file.raw.type === "image/bmp";
      // const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG && !isBMP) {
        this.$message.error("上传图片只能是 JPG、PNG 或者 BMP格式!");
        //执行清空图片
        // this.$refs.upload.clearFiles();
        // 取消时在文件列表中删除该文件
        this.$refs.upload.handleRemove(file);
        return isJPG || isPNG || isBMP;
      }
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      this.form.file = file.raw;
      this.beforeUploadFile(file);
    },
    // 文件超出个数限制时的钩子
    exceedFile(files, fileList) {
      this.$message.error(`只能选择 ${this.limitNum} 个文件`);
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      this.$message.success(`文件上传成功`);
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      this.$message.error(`文件上传失败`);
    },
    submitForm() {
      let formData = new FormData();
      formData.append("file", this.form.file);
      UpdateProdFile(formData).then((res) => {
        let par = {
          attributeId: this.dataInfo.attributeId,
          id: this.dataInfo.id,
          attributeValue: res.fileDownloadUri,
        };
        this.$emit("saveRow", par);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.imgs /deep/ {
  display: inline-block;
  .list {
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
    .el-upload-list__item-thumbnail {
      width: 100%;
      height: auto;
    }
  }
  .title {
    font-size: 18px;
    span {
      font-size: 12px;
      display: inline-block;
      line-height: 18px;
    }
  }
}
</style>
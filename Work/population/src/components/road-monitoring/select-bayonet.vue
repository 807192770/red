<template>
  <!-- 重要卡口人流量监控与预测卡口选择 -->
  <div class="bayonet-monitor">
    <el-select v-model="value" placeholder="A1口" @change="changeValue()">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: "A1",
          label: "A1口"
        },
        {
          value: "A2",
          label: "A2口"
        },
        {
          value: "B1",
          label: "B1口"
        },
        {
          value: "B2",
          label: "B2口"
        }
      ],
      value: ""
    };
  },
  props: {
    changeValue: {
      type: Function
      // default: 0
    }
  },
  methods: {}
};
</script>
<style lang='scss'>
.bayonet-monitor {
  .el-select {
    margin: 0.2rem 0;
    .el-input__inner {
      background: #213148;
      border: 1px solid #4b8cd3;
      width: 1.1rem;
      height: 0.3rem;
      color: #fff;
      text-align: center;
    }
    .el-select__caret::before,
    .el-select__caret::after {
      position: absolute;
      bottom: -36%;
      right: 30%;
    }
  }
  input[type="text"],
  input[type="date"] {
    background: #fff;
    /* padding: .375rem .75rem; */
  }
  select,
  input[type="text"],
  input[type="date"] {
    padding: 0;
    border-radius: 2px;
  }
}
</style>

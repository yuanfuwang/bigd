<template>
    <div style="margin:24px">
        <el-row :gutter="16">
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="font-size:24px">课程字典</span>
                        <el-button style="float: right" type="primary" plain @click="handleCreateClick">新建课程字典</el-button>
                    </div>
                    <div class="text item">
                        <el-tree :data="parentTableData" :props="defaultProps" @node-click="handleNodeClick" highlight-current></el-tree>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="font-size:24px">课程字典分类</span>
                        <el-button v-if="showbutton!==false" style="float: right" type="primary" plain @click="handleCreateTypeClick">新建课程字典分类</el-button>
                    </div>
                    <div class="text item">
                        <el-tree :data="childrenTableData" :props="defaultProps" @node-click="handleChlidNodeClick" highlight-current></el-tree>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <my-dialog :dialogVisible="visiable" @closeDialog="closeDialog" :dialogType="dialogType" :info="info"></my-dialog>
    </div>
</template>

<script>
import MyDialog from "./dicDialog";
export default {
  name: "index",
  components: {
    MyDialog
  },
  data() {
    return {
      parentTableData: [], //课程字典
      childrenTableData: [], //课程字典分类
      showbutton: false, // 新建课程字典分类 按钮 显示隐藏,
      info: "",
      defaultProps: {
        children: "children",
        label: "label"
      },
      visiable: false,
      dialogType: ""
    };
  },
  mounted() {
    this.SelectParentType("");
  },
  methods: {
    SelectParentType(data) {
      // 获取字典
      this.$store
        .dispatch("SelectParentType", data)
        .then(response => {
          if (data !== "") {
            this.childrenTableData = response;
            //显示按钮
            this.showbutton = true;
          } else {
            this.parentTableData = response;
          }
        })
        .catch(error => {
          this.$notify({
            title: "失败",
            message: error,
            type: "error"
          });
        });
    },
    closeDialog() {
      this.visiable = false;
      //隐藏按钮
      this.showbutton = false;
      //清空type数据
      this.childrenTableData = [];
      //刷新
      this.SelectParentType("");
    },
    // parent click
    handleNodeClick(data) {
      this.info = data;
      if (data.key) {
        this.SelectParentType(data.key);
      } else {
        this.$notify({
          title: "失败",
          message: "获取字典失败",
          type: "error"
        });
      }
    },
    // Child click
    handleChlidNodeClick(data) {
      console.log(data);
    },
    // 新建课程字典
    handleCreateClick() {
      this.dialogType = "createDic";
      this.visiable = true;
    },
    // 新建分类
    handleCreateTypeClick() {
      this.dialogType = "createType";
      this.visiable = true;
    }
  }
};
</script>


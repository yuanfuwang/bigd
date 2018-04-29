<template>
    <div>
        <el-form :model="dicForm" :rules="dicRules" ref="dicForm" label-width="auto">
            <el-form-item label="字典名称:" prop="categoryName">
                <el-input v-model="dicForm.categoryName"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  name: "dicForm",
  props: ["info", "dialogType"],
  data() {
    return {
      dicForm: {
        categoryName: "", // 分类名
        parentId: "" // 父级id
        // level: "1", // 层级
        // status: "0"
      },
      dicRules: {
        categoryName: [
          { required: true, message: "请输入字典名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs["dicForm"].validate(valid => {
        if (valid) {
          //create parent type
          if (this.dialogType === "createType") {
            this.dicForm.parentId = this.info.key;
          }
          this.$store
            .dispatch("CreateParentType", this.dicForm)
            .then(response => {
              //提示消息
              this.$message({
                message: response,
                type: "success"
              });
              //关闭dialog
              this.$emit("close");
            })
            .catch(error => {
              this.$notify({
                title: "失败",
                message: error,
                type: "error"
              });
            });
        }
      });
    },
    resetForm() {
      this.$refs["dicForm"].resetFields();
    }
  }
};
</script>


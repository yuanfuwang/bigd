<template>
    <div>
        <el-dialog :title="dialogType==='createDic'?'新建课程字典':''" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <dic-form @close="handleClose" ref="createDic" :info="info" :dialogType="dialogType"></dic-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="handleSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import DicForm from "./components/dicForm";
export default {
  name: "dicDialog",
  props: ["dialogVisible", "dialogType", "info"],
  components: {
    DicForm
  },
  methods: {
    handleClose() {
      //调用子组件方法
      this.$refs.createDic.resetForm();
      this.$emit("closeDialog");
    },
    handleSubmit() {
      this.$refs.createDic.submitForm();
    }
  }
};
</script>


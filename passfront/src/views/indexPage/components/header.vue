<template>
    <div class="header">
        <div class="menu">
            <el-row type="flex" align="middle" style="height:100%">
                <el-col :span="2">
                    <img :src="logo" />
                </el-col>
                <!-- <el-col :span="4" :offset="18">
                    
                </el-col> -->
                <el-col :span="22" style="text-align:right">
                    <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input21" style="width:30%;margin-right:24px"></el-input>
                    <el-button type="text" @click="clickLogin">登录</el-button>
                    <el-button type="text" @click="clickRegister">
                        <span style="color:#ffd200">免费注册</span>
                    </el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import logo from "../../../assets/index/logo.png";
export default {
  name: "header",
  data() {
    return {
      logo
    };
  },
  methods: {
    clickLogin() {
      this.$router.push({ path: "/login" });
    },
    clickRegister() {
      this.$router.push({ path: "/register" });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.header {
  //   border: 1px solid rgb(245, 4, 4);
  width: 100%;
  height: 60px;
  background: #313131;
}
.menu {
  padding-left: 60px;
  padding-right: 60px;
  height: 100%;
}
.el-button--text {
  color: #ffffff;
}
</style>
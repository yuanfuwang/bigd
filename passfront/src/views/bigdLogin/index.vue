<template>
    <div class="login-container">
        <Form class="login-form" ref="formLogin" :model="formBackLoginValidate" :rules="ruleLogin">
            <div class="title-container">
                <h5 class="title">登录</h5>
                <hr class="line" />
            </div>
            <FormItem prop='loginName'>
                <Input v-model="formBackLoginValidate.loginName" size="large" type="text" placeholder="请输入用户名" />
            </FormItem>
            <FormItem prop='password'>
                <Input v-model="formBackLoginValidate.password" size="large" type="password" placeholder="请输入密码" />
            </FormItem>
            <el-row style="margin-top:32px;margin-bottom:40px">
                <el-col :span='24'>
                    <el-button size="large" style="width:100%" type="primary" :loading="this.$store.state.bigdLogin.loginLoading" @click="handleSubmit('formLogin')">
                        {{ !this.$store.state.bigdLogin.loginLoading ? '登录' : '登录中...' }}
                    </el-button>
                </el-col>
            </el-row>
        </Form>
    </div>
</template>

<script>
export default {
  name: "bigdLogin",
  data() {
    return {
      formBackLoginValidate: {
        loginName: "",
        password: ""
      },
      ruleLogin: {
        loginName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 点击登陆
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.formBackLoginValidate.loginIp = returnCitySN["cip"];
          this.$store
            .dispatch("AdminUserLogin", this.formBackLoginValidate)
            .then(() => {
              this.$router.push({ path: "/dashboard" });
            })
            .catch(error => {
              this.$Notice.error({
                title: error,
                desc: error
              });
            });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #c6c8ca;
$dark_gray: #889aa4;
$light_gray: rgb(0, 0, 0);

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  // background-color: $bg;
  //   background: url("../../assets/gplus/login/gplusback.svg") center no-repeat;
  background-size: cover;
  overflow-x: scroll;
  .login-form {
    background-color: rgb(255, 255, 255);
    border-radius: 10px; // 边框圆角
    box-shadow: 0 0 10px rgb(255, 255, 255); // 边框阴影
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 28px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 15px auto;
      text-align: center;
      // 粗体
      //   font-weight: bold;
    }
    .line {
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 50px;
      width: 120px;
      height: 3px;
      border: 0px;
      background-color: rgb(82, 80, 80);
      color: rgb(82, 80, 80);
    }
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>


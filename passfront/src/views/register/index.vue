<template>
  <div class="register-container">
    <div class="register-steps">
      <el-row type='flex' align="middle">
        <el-col :span='12'>
          <h1>
            BigD通行证
          </h1>
        </el-col>
        <el-col :span='8' style="text-align:right">
          <span>
            已有帐号，
            <a @click="returnLogin">马上登录</a>
          </span>
        </el-col>
        <el-col :span='4' style="text-align:right">
          <a @click="returnIndex">
            返回站酷网
          </a>
        </el-col>
      </el-row>
      <el-row type='flex' align='middle' style="margin-top:24px">
        <el-col :span='24' style="text-align:center">
          <div style="background:#ffd100;padding:24px 0px">
            <h1>注册会员</h1>
          </div>
        </el-col>
      </el-row>
      <div style="background:#fff;padding:48px 0px">
        <el-form class="register-form" ref="formRegister" :model="formRegisterValidate" :rules="ruleRegister">
          <el-row type='flex' justify="center">
            <el-col :span='12'>
              <el-form-item prop='mobile'>
                <el-input v-model="formRegisterValidate.mobile" size="large" type="text" placeholder="请输入您的手机号" />
              </el-form-item>
              <el-form-item prop='password'>
                <el-input v-model="formRegisterValidate.password" size="large" type="password" placeholder="请输入您的密码" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type='flex' justify="center">
            <el-col :span='8'>
              <el-form-item prop='verificationCode' style="margin:auto 0px">
                <el-input v-model="formRegisterValidate.verificationCode" size="large" type="text" placeholder="请输入您的验证码" />
              </el-form-item>
            </el-col>
            <el-col :span='4' style="text-align:right">
              <el-button style="width:90%" size="large" type="primary" plain @click="getMa" :loading="this.$store.state.ma.loading">
                {{!this.$store.state.ma.loading?'获取验证码':'获取中...'}}
              </el-button>
            </el-col>
          </el-row>
          <el-row type='flex' justify="center" style="margin-top:24px">
            <el-col :span='12'>
              <el-checkbox v-model="checked">我已阅读并接受用户协议</el-checkbox>
            </el-col>
          </el-row>
        </el-form>
        <el-row type='flex' justify="center" style="margin-top:24px">
          <el-col :span='12'>
            <el-button style="width:100%" size="large" type="primary" @click="clickRegister" :loading="this.$store.state.register.loading">注册</el-button>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="24" style="text-align:center;margin-top:3%">
          <p style="cursor:default">京ICP备11017824号-4 / 京ICP证130164号 北京市公安局朝阳分局备案编号:110105000501</p>
          <p style="cursor:default">Copyright © 2016-2017 BigD 中文 English</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    //自定义用户名验证
    var user = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入您的手机号"));
      } else {
        const reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        // const reg1 = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        // if (!reg.test(value) && !reg1.test(value)) {
        if (!reg.test(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      }
    };
    //密码自定义验证
    var pwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 6) {
          callback(new Error("密码长度不能少于6位"));
        } else {
          callback();
        }
      }
    };
    return {
      checked: false, //用户协议
      //注册表单
      formRegisterValidate: {
        mobile: "",
        password: "",
        verificationCode: ""
      },
      //   注册表单验证
      ruleRegister: {
        mobile: [{ validator: user, trigger: "blur" }],
        password: [{ validator: pwd, trigger: "blur" }],
        verificationCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {},
  methods: {
    returnIndex() {
      this.$router.push({ path: "/index" });
    },
    returnLogin() {
      this.$router.push({ path: "/login" });
    },
    //点击注册
    clickRegister() {
      //获取客户端公网ip
      this.formRegisterValidate.loginIp = returnCitySN["cip"];
      this.$refs["formRegister"].validate(valid => {
        if (valid) {
          if (!this.checked) {
            this.$message("请先阅读并勾选接受用户协议");
          }
          if (this.checked) {
            this.$store
              .dispatch("SubmitRegisterInfo", this.formRegisterValidate)
              .then(response => {
                this.$message({
                  message: "注册成功",
                  type: "success"
                });
              })
              .catch(error => {
                this.$Notice.error({
                  title: "注册失败",
                  desc: error
                });
              });
          }
        }
      });
    },
    // 获取验证码
    getMa() {
      this.$refs["formRegister"].validateField("mobile", valid => {
        if (valid.length === 0) {
          this.$store
            .dispatch("GetMa", this.formRegisterValidate.mobile)
            .then(response => {
              this.$message({
                message: "验证码已发送",
                type: "success"
              });
            })
            .catch(error => {
              this.$Notice.error({
                title: "获取验证码失败",
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
$bg: #f4f4f4;
$dark_gray: #889aa4;
$light_gray: rgb(0, 0, 0);
.register-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background: $bg;
  background-size: cover;
  overflow-x: scroll;

  .register-steps {
    background-color: $bg;
    position: absolute;
    left: 0;
    right: 0;
    width: 60%;
    padding: 25px 15px 25px 15px;
    margin: 5% auto;
  }
}
</style>



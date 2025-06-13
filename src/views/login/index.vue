<template>
  <div class="login">
    <div class="login-box">
      <h1>后台管理系统</h1>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item :label="'密\xa0\xa0\xa0\xa0码'" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captchaCode">
          <div class="captcha-box">
            <el-input v-model.number="ruleForm.captchaCode" clearable></el-input>
            <img height="40" class="login-code-img" :src="captchaSrc" alt="" @click="captchaGet">
          </div>
        </el-form-item>
        <el-form-item class="login-button">
          <el-button class="login-btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validateName } from "@/utils/validate";
import { GetCaptchaCodeApi,LoginApi } from "@/request/api";

export default {
  data() {
    return {
      ruleForm: {
        name: '',
        password: '',
        captchaCode: ''
      },
      rules: {
        name:[
          { required: true, message: '用户名不能为空', trigger: 'blur' },
            //自定义校验
          {validator: validateName, trigger: 'blur'}
        ],
        password:[
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {min: 6,max:16, message: '密码6至16位', trigger: 'blur' }
        ],
        captchaCode:[
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      },
      captchaSrc: ''
    }
  },
  created() {
    this.captchaGet()
  },
  methods: {
    async captchaGet() {
      // axios.get('http://vue.ruoyi.vip/prod-api/captchaImage')
      let response = await GetCaptchaCodeApi();
      if (!response) return;
      //展示图片
      this.captchaSrc = "data:image/gif;base64," + response.img;
      //保存uuid
      localStorage.setItem('VMG-captcha-uuid',response.uuid);


    },
    submitForm(formName) {
      this.$refs[formName].validate
      (async (valid) => {
        if (valid) {
          let response = await LoginApi({
            name: this.ruleForm.name,
            password: this.ruleForm.password,
            code: this.ruleForm.captchaCode,
            uuid: localStorage.getItem('VMG-captcha-uuid')
          })
          if (!response) return;
          //提示登录成功
          this.$message({message: '登录成功!', type: 'success' });
          // 清除uuid
          localStorage.removeItem('VMG-captcha-uuid');
          //保存token
          localStorage.setItem('VMG-authorization-token', response.data.token);
          //跳转首页
          this.$router.push('/');
          console.log(response);


        } else {
          this.$message.error('error submit!');
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: url(../../assets/img/star-1.png) center top no-repeat ;
}
.login .login-box {
  width: 400px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 10px 10px 20px rgba(0,0,0,0.2);
  padding-top: 20px;
  padding-right: 40px;
  h1 {
    text-align: center;
    margin-bottom: 20px;
    padding-left: 40px;
    font-size: 20px;
  }
  .captcha-box{
    display: flex;
    .login-code-img{
      margin-left: 20px;
      padding-top: 3px;
    }
  }
  .login-btn{
    width: 100%;
  }
  ::v-deep .login-button .el-form-item__content{
    margin-left: 40px!important;
  }
}

</style>
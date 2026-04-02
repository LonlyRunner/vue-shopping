<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" :src="picUrl" @click="getPicCode" alt="">
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" maxlength="6" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">{{ seconds === totalSeconds ? '获取验证码' : seconds + '秒后重新获取' }}</button>
        </div>
      </div>

      <div @click="login" class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getMsgCode, login } from '@/api/login'

export default {
  name: 'LoginIndex',
  data () {
    return {
      picCode: '',
      picKey: '',
      picUrl: '',
      totalSeconds: 60,
      seconds: 60,
      timer: null,
      mobile: '',
      msgCode: '',
      active: false
    }
  },

  async created () {
    await this.getPicCode()
  },
  methods: {
    // 获取图形验证码
    async getPicCode () {
      try {
        const res = await getPicCode()
        this.picUrl = res.data.base64
        this.picKey = res.data.key
      } catch (error) {
        console.error('获取图形验证码失败:', error)
        this.$toast('获取图形验证码失败')
      }
    },
    // 校验表单数据
    validFn () {
      if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号码')
        return false
      }
      if (!/^[a-zA-Z0-9]{4,5}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 获取短信验证码
    async getCode () {
      if (!this.validFn()) {
        return
      }
      if (!this.timer && this.seconds === this.totalSeconds) {
        try {
          await getMsgCode(this.picCode, this.picKey, this.mobile)
          this.$toast('发送成功，请注意查收')
          this.timer = setInterval(() => {
            this.seconds--
            if (this.seconds < 1) {
              clearInterval(this.timer)
              this.timer = null
              this.seconds = this.totalSeconds
            }
          }, 1000)
        } catch (e) {
          this.$toast('验证码发送失败')
        }
      }
    },
    // 登录
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      try {
        const res = await login(this.mobile, this.msgCode)
        const { userId, token } = res.data
        this.$store.commit('user/setUserInfo', { userId, token })
        this.$toast('登录成功')
        const url = this.$route.query.backUrl || '/'
        this.$router.replace(url)
      } catch (error) {
        console.error('登录失败:', error)
        this.$toast('登录失败')
      }
    }
  },
  // 组件销毁时清除定时器
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
      cursor: pointer;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
      cursor: pointer;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
</style>

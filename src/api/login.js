import request from '@/utils/request'

// 获取图形验证码
export const getPicCode = () => {
  return request.get('/captcha/image')
}

// 获取短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    captchaCode,
    captchaKey,
    mobile
  })
}

// 验证码登录 ✅ 100% 正确，修复 platform
export const login = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      mobile: mobile,
      smsCode: smsCode,
      partyData: [] // 修复为数组
    }
  })
}

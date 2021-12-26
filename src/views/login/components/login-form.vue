<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin=false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin=true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
     <Form ref='target' class="form" v-slot='{ errors }'>
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <!-- Field组件的name属性是必要的 -->
            <!-- rules表示验证规则 -->
            <Field name='account' :rules='checkName' type="text" placeholder="请输入用户名或手机号" v-model="form.account" />
          </div>
          <div class="error" v-if='errors.account'><i class="iconfont icon-warning" />
            {{errors.account}}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <input type="password" placeholder="请输入密码" />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input type="text" placeholder="请输入手机号" />
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <!-- -------------验证码----------------- -->
            <input type="password" placeholder="请输入验证码">
            <span class="code">发送验证码</span>
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <!-- <XtxCheckbox v-model="form.isAgree" /> -->
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
      </div>
      <a @click='handlelogin' href="javascript:;" class="btn">登录</a>
    </Form>
    <div class="action">
      <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import { getCurrentInstance, reactive, ref } from 'vue'
import { Form, Field } from 'vee-validate'
import { userAccountLogin } from '@/api/user.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'LoginForm',
  components: { Form, Field },
  setup () {
    const store = useStore()
    const router = useRouter()
    const form = reactive({
      account: '',
      password: ''
    })

    const isMsgLogin = ref(false)

    // 表单验证函数
    const checkName = (value) => {
      // value表示表单域输入的值
      if (value) {
        // 输入的值是存在的
        return true
      } else {
        // 没有输入值
        return '请输入用户名'
      }
    }

    // 登录操作
    // const target = ref(null)
    // const handlelogin = async () => {
    //   // 注意：validate()方法不支持回调，但是支持Promise
    //   const valid = await target.value.validate()
    //   if (valid) {
    //     // 验证通过
    //     console.log('ok')
    //   }
    // }

    // 登录操作
    // 基于getCurrentInstance创建组件的实例对象，相当于this
    const instance = getCurrentInstance()
    const target = ref(null)
    const handlelogin = async () => {
      // 注意：validate()方法不支持回调，但是支持Promise
      const valid = await target.value.validate()
      if (valid) {
        try {
          // 验证通过
        // console.log('ok')
        // Message({ type: 'success', text: '登录成功' })
        // this.$message({ type: 'success', text: '登录成功' })

          const ret = await userAccountLogin({
            account: form.account,
            password: form.password
          })
          if (ret.result) {
            instance.proxy.$message({ type: 'success', text: '登录成功' })
            // 登录成功之后,保存用户的登录信息
            const { id, avatar, nickname, account, mobile, token } = ret.result
            store.commit('user/updateInfo', { id, avatar, nickname, account, mobile, token })
            // 跳转到首页
            router.push('/')
          }
        } catch {
          instance.proxy.$message({ type: 'error', text: '登录失败' })
        }
      }
    }

    return { form, isMsgLogin, checkName, target, handlelogin }
  }
}
</script>

<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,&:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>

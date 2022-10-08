<template>
  <div class="login-card">
    <div class="left">
      <figure>
        <img src="@/assets/undraw_review_re_kgg1.svg" alt="" srcset="" draggable="false" ondragstart="return false" />
        <figcaption :style="{ color: 'white' }">this is Description</figcaption>
      </figure>
    </div>

    <div class="right">
      <n-tabs animated class="right-content" size="large">
        <n-tab-pane name="passwordLogin" tab="密码登录">
          <n-form class="form" ref="loginFormRef" :model="loginForm" :rules="rules">
            <n-form-item path="user.name" label="用户名">
              <n-input-group>
                <n-select v-model:value="phonePrefix" :options="prefixOptions" :style="{ width: '90px' }" />
                <n-input v-model:value="loginForm.user.name" placeholder="输入用户名" />
              </n-input-group>
            </n-form-item>
            <n-form-item path="user.password" label="密码">
              <n-input v-model:value="loginForm.user.password" type="password" show-password-on="click"
                placeholder="输入密码" />
            </n-form-item>
            <n-checkbox v-model:checked="isRemember">下次自动登录</n-checkbox>
            <n-form-item>
              <n-button @click="loginAction" type="primary" :style="{ width: 'calc(50% - 30px)', marginRight: '30px' }">
                登录</n-button>
              <n-button :style="{ width: '50%' }">注册</n-button>
            </n-form-item>
          </n-form>
        </n-tab-pane>
        <n-tab-pane name="codeLoginOrRegister" tab="验证码登录/注册">
          <n-form class="form" ref="loginFormRef" :model="registerForm" :rules="registerRules">
            <n-form-item path="phone" label="电话号码">
              <n-input-group>
                <n-select v-model:value="phonePrefix" :options="prefixOptions" :style="{ width: '90px' }" />
                <n-input v-model:value="registerForm.phone" placeholder="输入电话号码" />
              </n-input-group>
            </n-form-item>
            <n-form-item path="code" label="验证码">
              <n-input-group>
                <n-input v-model:value="registerForm.code" placeholder="输入验证码" />
                <n-button @click="getCode">{{ btnText }}</n-button>
              </n-input-group>
            </n-form-item>
            <n-form-item path="password1" label="密码">
              <n-input v-model:value="registerForm.password1" show-password-on="click" type="password"
                placeholder="输入密码" />
            </n-form-item>
            <n-form-item path="password2" label="重复密码" :validation-status="password2Status"
              :feedback="password2FeedBack">
              <n-input v-model:value="registerForm.password2" show-password-on="click" type="password"
                placeholder="输入密码" />
            </n-form-item>
            <n-form-item>
              <n-button type="primary" :style="{ width: 'calc(50% - 30px)', marginRight: '30px' }">登录</n-button>
              <n-button :style="{ width: '50%' }">注册</n-button>
            </n-form-item>
          </n-form>
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NSelect,
  NCheckbox,
  NTabs,
  NTabPane,
  NInputGroup,
} from 'naive-ui'
import type { Ref } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'
import router from '@/router'
const timer = ref<number | null>(null)
type userOption = {
  user: {
    [key: string]: string
  }
}
const loginForm: Ref<userOption> = ref({
  user: {
    name: '',
    password: '',
  },
})
const isRemember = ref<boolean>(false)
const loginFormRef = ref<FormInst | null>(null)
const rules: FormRules = {
  user: {
    name: {
      required: true,
      trigger: 'blur',
      message: '用户名必须填写',
    },
    password: {
      required: true,
      trigger: 'blur',
      message: '密码必须填写',
    },
  },
}
const registerForm = ref({
  phone: '',
  code: '',
  password1: '',
  password2: '',
})
const registerRules: FormRules = {
  phone: {
    required: true,
    trigger: 'blur',
    message: '电话号码必须填写',
  },
  code: {
    required: true,
    trigger: 'blur',
    message: '验证码必须填写',
  },
  password1: {
    required: true,
    trigger: 'blur',
    message: '密码必须填写',
  },
  password2: {
    required: true,
    trigger: 'blur',
    message: '密码2必须填写',
  },
}
const phonePrefix = ref('86')
const prefixOptions = ref<SelectMixedOption[]>([
  { label: '+45', value: '45' },
  { label: '+86', value: '86' },
])
const password2FeedBack = computed(() => {
  return registerForm.value.password1 === registerForm.value.password2
    ? ''
    : '两次输入的密码不同'
})
const password2Status = computed(() =>
  registerForm.value.password1 === registerForm.value.password2
    ? undefined
    : 'error'
)
const btnText = ref('获取验证码')
const getCode = () => {
  if (timer.value === null) {
    let time = 30
    btnText.value = `${time.toString()} 秒后重试`
    timer.value = setInterval(() => {
      time--
      btnText.value = `${time.toString()} 秒后重试`
      if (time == 0) {
        btnText.value = '获取验证码'
        clearInterval(timer.value!)
      }
    }, 1000)
  }
}
const loginAction = () => {
  router.push('/dashboard')
}
const isDisabled = computed(() => {
  const obj = loginForm.value.user
  const formData = []
  for (const property of Object.getOwnPropertyNames(obj)) {
    console.log(property)
    console.log(obj[property])
    formData.push(obj[property])
  }
  if (formData.some((e) => e === '')) {
    return true
  }
  return false
})
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.login-card {
  display: flex;
  height: 100vh;

  .left {
    display: flex;
    width: 50vw;
    vertical-align: middle;
    justify-content: center;
    background-color: #449e84;
  }

  .right {
    width: calc(50vw);
    height: 100%;
    background-color: #f5f5f4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .form {
    width: 80%;
  }

  img {
    margin: 30px 0;
    user-select: none;
  }

  .right-content {
    width: 80%;
  }
}
</style>

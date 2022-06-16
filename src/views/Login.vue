<template>
  <div class="login-card">
    <img
      src="@/assets/undraw_to_the_moon_re_q21i.svg"
      alt=""
      srcset=""
      draggable="false"
      ondragstart="return false"
    />

    <n-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="rules"
      class="form-box"
    >
      <n-form-item path="user.name">
        <n-input v-model:value="loginForm.user.name" placeholder="输入用户名" />
      </n-form-item>
      <n-form-item path="user.password">
        <n-input
          v-model:value="loginForm.user.password"
          placeholder="输入密码"
        />
      </n-form-item>
      <n-form-item>
        <n-button>登录</n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  type FormInst,
  type FormRules,
} from 'naive-ui'
const loginForm = ref({
  user: {
    name: '',
    password: '',
  },
})
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
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.login-card {
  display: flex;
  width: 80vw;
  height: 100%;
  img {
    user-select: none;
  }
  .form-box {
    width: 100%;
    margin-left: 15px;
  }
}
</style>

<template>
  <n-card class="info-card">
    <div :style="{
      display: 'flex',
      justifyContent: 'space-between',
      height: '35px',
    }">
      <label for="" class="info-label">新增客户</label>
      <n-icon size="35" color="#4bb87a" v-if="showIcon">
        <user-friends />
      </n-icon>
    </div>
    <div>
      <span class="info-num">
        {{ numPrefix }}
      </span>
      <span class="info-num">
        <n-number-animation ref="numberAnimationInstRef" :from="0" :to="dataNum" />
      </span>
    </div>
    <div :style="{ display: 'flex' }">
      <n-icon size="20" color="green" v-if="isRise">
        <rise-outlined />
      </n-icon>
      <n-icon size="20" color="red" v-else>
        <rise-outlined class="decline-icon" />
      </n-icon>
      <span class="info-footer-label">
        5% 同比{{ isRise ? '增长' : '下降' }}
      </span>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import {
  NCard,
  NIcon,
  NNumberAnimation,
  type NumberAnimationInst,
} from 'naive-ui'
import { UserFriends } from '@vicons/fa'
import { RiseOutlined } from '@vicons/antd'
import { onMounted, ref } from 'vue'
const props = defineProps({
  isRise: { type: Boolean },
  dataNum: { type: Number },
  showIcon: { type: Boolean, default: true },
  numPrefix: { type: String, default: '' },
})
const numberAnimationInstRef = ref<NumberAnimationInst | null>(null)
onMounted(() => {
  numberAnimationInstRef.value?.play()
})
</script>

<style scoped>
.info-label {
  font-size: 15px;
  user-select: none;
  cursor: pointer;
}

.info-card {
  background-color: var(--main-color);
  height: 150px;
}

.info-num {
  font-size: 35px;
  font-weight: 800;
  user-select: none;
  cursor: pointer;
}

.info-footer-label {
  font-size: 15px;
  user-select: none;
  cursor: pointer;
  text-overflow: ellipsis;
}

.decline-icon {
  transform: rotate(180deg);
}
</style>

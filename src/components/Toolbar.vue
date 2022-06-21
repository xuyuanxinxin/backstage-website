<template>
  <nav>
    <div class="nav-item">
      <n-input round size="small" placeholder="输入要搜索的内容" />
    </div>
    <div class="nav-item end-group">
      <n-avatar
        :size="30"
        round
        src="https://w.wallhaven.cc/full/nm/wallhaven-nmkv81.png"
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { NInput, NAvatar } from 'naive-ui'
</script>

<style scoped lang="scss">
.nav-item {
  display: inline-block;
}
.end-group {
  margin: 0 15px 0 auto;
}
nav {
  margin-left: 80px;
  height: 60px;
  align-items: center;
  display: flex;
}
</style>

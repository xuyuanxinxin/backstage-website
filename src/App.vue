<script setup lang="ts">
import { NNotificationProvider, NDialogProvider, NMessageProvider, NLoadingBarProvider, useLoadingBar } from 'naive-ui'
import { defineComponent, h, resolveComponent } from 'vue';
const LoadingContent = defineComponent({
  name: 'LoadingContent',
  setup() {
    const res = useLoadingBar()
    console.log(res);
    window.loading = res
    console.log(window);

  },
  render() {
    return h(resolveComponent('router-view'))
  }
})
</script>

<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <n-notification-provider :max="3">
        <n-dialog-provider>
          <loading-content>
          </loading-content>
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-loading-bar-provider>
</template>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
  box-sizing: border-box;
}

:root {
  --main-color: white;
}

* {
  box-sizing: border-box;
}
</style>

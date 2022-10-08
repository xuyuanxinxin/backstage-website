import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { contextMenuDirective } from './directives'

const app = createApp(App)
const pinia = createPinia()
pinia.use(({ store }) => {
  console.log(store)
  if (!localStorage.getItem('store')) {
    console.log(store.$state)
    localStorage.setItem('store', JSON.stringify(store.$state))
  } else {
    store.$state = JSON.parse(localStorage.getItem('store')!)
  }
  store.$subscribe((mutations, state) => {
    localStorage.setItem('store', JSON.stringify(state))
  })
})
app.directive('context-menu', contextMenuDirective)
app.use(pinia)
app.use(router)

app.mount('#app')

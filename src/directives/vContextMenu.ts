import contextMenu from './ContextMenu.vue'
import { render, h, type VNode } from 'vue'
import type { TabOption } from '@/global'
import type { Directive } from 'vue'

let aBody = document.querySelector('body')!
let eventData: MouseEvent | null = null
let showDropDown = false
interface MenuList {
  dom: Element | null
  options: TabOption[]
}
let menuList: MenuList[] = []

export const contextMenuDirective: Directive = {
  created(el: HTMLElement, binding, vnode) {
    let options: TabOption[] = []
    options = binding.value
    // console.log(vnode.children?.length)
    // const key = ((vnode.children as Array<VNode>)[1] as VNode).key
    el.addEventListener('contextmenu', (ev: MouseEvent) => {
      eventData = ev
      ev.preventDefault()
      showDropDown = true
      update(options)
      // console.log(key)
      menuList.push({
        dom: el,
        options,
      })
    })
  },
}

document.body.addEventListener('click', (e) => {
  console.log('menuList')
  console.log(menuList)
  if (menuList.length !== 0) {
    const latestTabOption = menuList[menuList.length - 1]
    console.log('latest tab option')
    console.log(latestTabOption)

    showDropDown = false
    update(latestTabOption.options)
  }
  // update(options)
})
function update(options: TabOption[]) {
  render(
    h(h(contextMenu), {
      position: eventData,
      options,
      showDropDown: showDropDown,
    }),
    aBody
  )
}

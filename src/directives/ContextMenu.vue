<template>
    <n-dropdown :options="options" trigger="manual" :show="showDropDown" :x="position.clientX" :y="position.clientY"
        @select="handleSelect">
        <div></div>
    </n-dropdown>
</template>

<script setup lang="ts">
import type { TabOption } from '@/global';
import { NDropdown, type MenuOption } from 'naive-ui'
import type { PropType } from 'vue'
const { position, showDropDown, options } = defineProps(
    {
        position: {
            type: Object as PropType<MouseEvent>,
            default: { clientX: 0, clientY: 0 },
        },
        showDropDown: Boolean,
        options: {
            type: Object as PropType<Array<MenuOption & TabOption>>
        }
    }
)

function handleSelect(v: string) {
    console.log(`options is v is:${v}`);
    console.log(options);
    const target = options?.find(x => x.key === v)!
    target?.callback(v)
}
</script>

<style scoped>
.context-menu {
    z-index: 99999;
    position: absolute;
    /* width: 150px;
    height: 150px; */
}
</style>
<template>
    <n-card>
        <n-button-group :style="{ marginBottom: '15px' }">
            <n-button ghost type="primary" @click="showDialog" v-context-menu="options">添加</n-button>
            <n-button ghost type="error" @click="deleteRow">删除</n-button>
        </n-button-group>
        <n-data-table :columns="columns" :data="data" :pagination="pagination" :bordered="false" :loading="isLoading"
            :row-props="rowProps" :row-key="rowKey" @update:checked-row-keys="handleSelect" />
    </n-card>
    <teleport to="body">
        <n-modal v-model:show="show" :close-on-esc="false" :mask-closable="false">
            <n-card :style="{
                width: '500px'
            }" size="huge" role="dialog" title="添加数据">
                <n-form>
                    <n-form-item label="用户名">
                        <n-input v-model:value="username" placeholder="输入用户名" />
                    </n-form-item>
                    <n-form-item label="地址">
                        <n-input v-model:value="address" placeholder="输入地址" />
                    </n-form-item>
                </n-form>
                <template #header-extra>
                    <n-button text :style="{ fontSize: '25px' }" @click="show = false">
                        <n-icon>
                            <close-outlined />
                        </n-icon>
                    </n-button>
                </template>
                <template #footer>
                    <div :style="{ display: 'flex', justifyContent: 'right' }">
                        <n-button @click="show = false">取消</n-button>
                        <n-button :style="{ marginLeft: '15px' }" type="primary">确定</n-button>
                    </div>
                </template>
            </n-card>
        </n-modal>
    </teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue"
import { NButton, NDataTable, NButtonGroup, NCard, NModal, NInput, NSpace, NForm, NFormItem, NIcon } from "naive-ui"
import { CloseOutlined } from "@vicons/antd"
import { useNotification, useDialog } from "naive-ui"
import type { DataTableColumns, DataTableRowKey } from "naive-ui"
import { useCounterStore } from "@/stores"
import type { TabOption } from "@/global"

const notification = useNotification()
const dialog = useDialog()

interface User {
    no: number;
    name: string;
    age: number;
    gender: string;
    address: string
}
const store = useCounterStore()
const options: TabOption[] = [
    {
        key: 'demo1',
        label: 'label1',
        callback: function (v: string) {
            console.log("demo1 click")
            dialog.success({
                title: 'click',
                content: `value:${v} demo1 clicked ${store.selectedTab}`
            })
        }
    },
    {
        key: 'demo2',
        label: 'label2',
        callback: function (v: string) {
            console.log("demo2 click")
            dialog.success({
                title: 'click',
                content: `value:${v} demo2 clicked ${store.selectedTab}`
            })
        }
    },
]
const username = ref("")
const address = ref("")
const pagination = {
    pageSize: 3
}


const columns: DataTableColumns<User> = [
    {
        type: 'selection'
    },
    {
        title: 'No.',
        key: 'no',
    },
    {
        title: '名称',
        key: 'name'
    },
    {
        title: '年龄',
        key: 'age'
    },
    {
        title: '性别',
        key: 'gender'
    },
    {
        title: '地址',
        key: 'address'
    },
]
const data: Ref<User[]> = ref([
    {
        no: 1,
        name: 'user1',
        age: 22,
        gender: 'male',
        address: 'data 1 user1'
    },
    {
        no: 2,
        name: 'user2',
        age: 22,
        gender: 'female',
        address: 'data 1 user1'
    },
    {
        no: 3,
        name: 'user3',
        age: 23,
        gender: 'male',
        address: 'data 1 user1'
    },
    {
        no: 4,
        name: 'user1',
        age: 22,
        gender: 'male',
        address: 'data 1 user1'
    },
    {
        no: 5,
        name: 'user2',
        age: 22,
        gender: 'female',
        address: 'data 1 user1'
    },
    {
        no: 6,
        name: 'user3',
        age: 23,
        gender: 'male',
        address: 'data 1 user1'
    },
])
const checkedRowKeys = ref<DataTableRowKey[]>([])
function handleSelect(rowKeys: DataTableRowKey[]) {
    console.log(rowKeys);
    checkedRowKeys.value = rowKeys

}
const show = ref(false)
const rowKey = (row: User) => row.no
const isLoading = ref(true)
const showDialog = () => {
    console.log('test');
    show.value = true
}

function deleteRow() {
    console.log(checkedRowKeys.value);
    if (checkedRowKeys.value.length === 0) {
        return
    }
    dialog.warning({
        title: "警告",
        content: "确定删除这条数据么？",
        positiveText: "确定",
        negativeText: "取消",
        onPositiveClick: function () {
            checkedRowKeys.value.forEach((value) => {
                console.log(value);
                const index = data.value.findIndex(x => x.no === value)
                console.log(index);

                console.log(data.value)
                console.log(index)
                notification.info({
                    title: '测试消息',
                    content: `数据：${data.value[index].name}`,
                    duration: 1500,
                })
                data.value.splice(index, 1)
            })
            checkedRowKeys.value.length = 0
        }
    })
}

const rowProps = (rowData: User, index: number) => {
    return {
        onClick: function (e: MouseEvent) {
        },
        onContextmenu: (e: MouseEvent) => {
            console.log(e)
            e.preventDefault()
        }
    }

}
onMounted(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 1000);
})
</script>

<style scoped>
</style>
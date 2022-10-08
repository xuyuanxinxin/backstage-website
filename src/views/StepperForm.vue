<template>
    <n-card>
        <n-steps :current="(current as number)" :status="currentStatus">
            <n-step title="步骤一" description="步骤一的具体描述" />
            <n-step title="步骤二" description="步骤二的具体描述" />
            <n-step title="步骤三" description="步骤三的具体描述" />
            <n-step title="步骤四" description="步骤四的具体描述" />
        </n-steps>
        <div :style="{ width: '80%', marginTop: '30px', display: 'flex', justifyContent: 'space-between' }">
            <template v-if="current === 1">
                <n-form :model="formValue" ref="formRef" :rules="rules" inline :style="{ flexWrap: 'wrap' }">
                    <n-form-item label="项目1" path="form.item1" :style="{ width: '250px' }">
                        <n-input v-model:value="formValue.form.item1" placeholder="请输入项目1内容" />
                    </n-form-item>
                    <n-form-item label="项目2" path="form.item2" :style="{ width: '250px' }">
                        <n-input v-model:value="formValue.form.item2" placeholder="请输入项目2内容" />
                    </n-form-item>
                    <n-form-item label="项目3" path="form.item3" :style="{ width: '250px' }">
                        <n-input v-model:value="formValue.form.item3" placeholder="请输入项目3内容" />
                    </n-form-item>
                    <n-form-item label="项目4" path="form.item4" :style="{ width: '250px' }">
                        <n-input v-model:value="formValue.form.item4" placeholder="请输入项目4内容" />
                    </n-form-item>
                    <n-form-item label="项目5" path="form.item5" :style="{ width: '250px' }">
                        <n-input v-model:value="formValue.form.item5" placeholder="请输入项目5内容" />
                    </n-form-item>
                </n-form>
            </template>
            <template v-else-if="current === 2">
                <n-form :model="formValue" ref="formRef">
                    <n-form-item label="项目2" path="form.item1">
                        <n-input v-model:value="formValue.form.item1" />
                    </n-form-item>
                </n-form>
            </template>
            <template v-else-if="current === 3">
                <n-form :model="formValue" ref="formRef">
                    <n-form-item label="项目3" path="form.item1">
                        <n-input v-model:value="formValue.form.item1" />
                    </n-form-item>
                </n-form>
            </template>
            <template v-else-if="current === 4">
                <n-form :model="formValue" ref="formRef">
                    <n-form-item label="项目4" path="form.item1">
                        <n-input v-model:value="formValue.form.item1" />
                    </n-form-item>
                </n-form>
            </template>

        </div>
        <n-button @click="before" :style="{ marginRight: '30px' }">上一个</n-button>
        <n-button @click="next">下一个</n-button>
    </n-card>
</template>

<script setup lang="ts">
import { NCard, NSteps, NStep, NButton, NForm, NInput, NFormItem, type StepProps, type FormInst, type FormRules, useMessage } from 'naive-ui'
import { ref } from 'vue'
interface FormModel {
    form: {
        item1: string
        item2: string
        item3: string
        item4: string
        item5: string
    }
}

const formRef = ref<FormInst | null>(null)
const current = ref<number | null>(1)
const currentStatus = ref<StepProps['status']>('process')
const formValue = ref<FormModel>({
    form: {
        item1: '',
        item2: '',
        item3: '',
        item4: '',
        item5: '',
    }
})
const rules: FormRules = {
    form: {
        item1: {
            required: true,
            message: '请输入项目1',
            trigger: ['blur']
        },
        item2: {
            required: true,
            message: '请输入项目2',
            trigger: ['blur']
        }
    }
}
const message = useMessage()
function before(e: MouseEvent) {
    if (current.value === null) {
        current.value = 1
    } else if (current.value <= 1) {
        current.value = 1
    } else {
        current.value--
    }
}
function next(e: MouseEvent) {
    formRef.value?.validate(errors => {
        if (!errors) {
            if (current.value === null) {
                current.value = 1
            } else if (current.value >= 4) {
                current.value = null
            } else {
                current.value++
            }
            message.success("验证成功,下一页。")
        } else {
            console.log(errors);
            message.error("验证失败，重新填写。")

        }
    })
}
</script>

<style scoped>
</style>
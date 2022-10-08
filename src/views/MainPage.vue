<template>
    <div class="cards-row">
        <div class="info-list">
            <div class="info-item">
                <InfoCard :is-rise="false" :data-num="321" />
            </div>
            <div class="info-item">
                <InfoCard :is-rise="true" :data-num="241" />
            </div>
            <div class="info-item">
                <InfoCard :is-rise="true" :data-num="123" />
            </div>
            <div class="info-item">
                <InfoCard :is-rise="true" :data-num="386" />
            </div>
        </div>

        <div :style="{ display: 'inline-block', width: '40%' }">
            <InfoCard :is-rise="false" :data-num="3243226" :show-icon="false" num-prefix="¥" />
        </div>
    </div>
    <div class="charts-row cards-row">
        <div :style="{ width: '58%' }">
            <n-card size="small">
                <div ref="pie2" :style="{ height: '300px' }"></div>
            </n-card>
        </div>
        <div :style="{ width: '40%' }">
            <n-card size="small">
                <div ref="pie1" :style="{ height: '300px' }"></div>
            </n-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { NCard } from "naive-ui"
import { InfoCard } from "@/components"
import { ref, reactive, type UnwrapNestedRefs } from "vue";
import { useEcharts, type ECOption } from "@/composables";
import type { CallbackDataParams } from "echarts/types/dist/shared";

const data = reactive([
    { id: 'a1', value: 33 },
    { id: 'a2', value: 92.1 },
    { id: 'a3', value: 94.4 },
    { id: 'a4', value: 85.4 },
])
const barData = reactive([0, 43, 32, 21, 65, 18, 19, 0])
const lineData = reactive(barData.map(x => x === 0 ? 0 : (x + 15)))
const xAxisData = reactive(['', 'test1', 'test2', 'test3', 'test4', 'test5', 'test6', ''])
const option: UnwrapNestedRefs<ECOption> = reactive({
    title: {
        text: '数据展示饼图',
        textVerticalAlign: 'middle',
        textAlign: 'left',
        top: '15px',
        textStyle: {
            overflow: 'truncate',
        },
    },
    dataset: {
        source: data,
    },
    legend: {
        top: 20,
        right: 0,
        orient: 'vertical',
        itemGap: 15,
        width: '80%',
        type: 'scroll'
    },
    series: [
        {
            type: 'pie',
            radius: ['40%', '70%'],
            itemStyle: {
                borderRadius: 5,
                borderColor: '#f5f5f4',
                borderWidth: 2,
            },
        },
        {
            type: 'pie',
            radius: ['40%', '70%'],
            itemStyle: {
                borderRadius: 5,
                borderColor: '#f5f5f4',
                borderWidth: 2,
            },
            label: {
                position: 'center',
                formatter: (e: CallbackDataParams) => {
                    return `总人数\n {a|480} 人`
                },
                fontSize: '15px',
                color: '#c3c3c3',
                rich: {
                    a: {
                        color: 'black',
                        fontSize: '35px',
                        lineHeight: 55,
                    },
                },
            },
        },
    ],
    tooltip: {
    },
} as ECOption)

const option2: UnwrapNestedRefs<ECOption> = reactive({
    title: {
        text: '数据展示折线图',
        textVerticalAlign: 'middle',
        textAlign: 'left',
        top: '15px',
        textStyle: {
            overflow: 'truncate',
        },
    },
    color: ['#4bb87a'],
    grid: {
        left: '5%',
        right: '5%',
        bottom: '15%',
    },
    legend: {
        data: ['趋势线', '数据柱状图']
    },
    xAxis: [
        {
            axisLine: {
                show: false,
            },
            type: 'category',
            data: xAxisData,
            boundaryGap: false,
            axisTick: {
                show: false,
            },
        },
    ],
    yAxis: {
        splitLine: {
            lineStyle: {
                color: ['#c1c1c1'],
                opacity: 0.2,
            },
        },
        max: 115,
    },
    series: [
        {
            name: '趋势线',
            data: lineData,
            type: 'line',
            smooth: true,
            areaStyle: {
                opacity: 0.1,
            },
            symbolSize: (v, p) => {
                const index = p.dataIndex
                if (index === 0 || index === 7) {
                    return 0
                }
                return 4
            },
        },
        {
            name: '数据柱状图',
            type: 'bar',
            roundCap: true,
            itemStyle: {
                borderRadius: 5,
            },
            barWidth: 20,
            data: barData,
        },
    ],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        },
        valueFormatter: (v) => `$${v}`,
    },
} as ECOption)
const pie1 = ref(null)
const pie2 = ref(null)

useEcharts(pie1, option)
useEcharts(pie2, option2)
let timer = 5
const intervalId = setInterval(() => {
    if (timer === 0)
        clearInterval(intervalId)
    console.log(data)
    const id = data[data.length - 1].id
    console.log(id.slice(1, id.length));
    let index = +id.slice(1, id.length)
    console.log(`当前索引:${index}`);
    data.push({
        id: `a${index + 1}`,
        value: Math.floor(Math.random() * 100)
    })
    const randomNum = Math.floor(Math.random() * 100)
    barData.splice(barData.length - 1, 0, randomNum)
    lineData.splice(lineData.length - 1, 0, randomNum + 15)
    xAxisData.splice(xAxisData.length - 1, 0, `test${(+xAxisData[xAxisData.length - 2].replace('test', '')) + 1}`)
    timer--
}, 3000)

</script>

<style scoped>
.charts-row {
    width: 100%;
}

.cards-row {
    display: flex;
    justify-content: space-between;
}

.info-list {
    width: 58%;
    display: inline-flex;
    justify-content: space-between;
    margin-bottom: 15px;
}

.info-item {
    width: 23%;
}
</style>
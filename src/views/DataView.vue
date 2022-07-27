<template>
  <div
    :style="{
      display: 'flex',
      justifyContent: 'space-between'
    }"
  >
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
      <InfoCard
        :is-rise="false"
        :data-num="3243226"
        :show-icon="false"
        num-prefix="¥"
      />
    </div>
  </div>
  <div class="charts-row">
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
import { NCard } from 'naive-ui'
import { InfoCard } from '@/components'
import { ref, type Ref } from 'vue'
import { useEcharts, type ECOption } from '@/composables'
import type { CallbackDataParams } from 'echarts/types/dist/shared'
const pie1 = ref(null)
const pie2 = ref(null)
const data = [
  { id: 'a1', value: 33 },
  { id: 'a2', value: 92.1 },
  { id: 'a3', value: 94.4 },
  { id: 'a4', value: 85.4 }
]
const option: Ref<ECOption> = ref({
  title: {
    text: '数据展示饼图',
    textVerticalAlign: 'middle',
    textAlign: 'left',
    top: '15px',
    textStyle: {
      overflow: 'truncate'
    }
  },
  dataset: {
    source: data
  },
  legend: {
    top: 'bottom',
    left: 'center',
    itemGap: 50
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      itemStyle: {
        borderRadius: 5,
        borderColor: '#f5f5f4',
        borderWidth: 2
      }
    },
    {
      type: 'pie',
      radius: ['40%', '70%'],
      itemStyle: {
        borderRadius: 5,
        borderColor: '#f5f5f4',
        borderWidth: 2
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
            lineHeight: 55
          }
        }
      }
    }
  ],
  tooltip: {}
} as ECOption)

const option2: Ref<ECOption> = ref({
  title: {
    text: '数据展示饼图',
    textVerticalAlign: 'middle',
    textAlign: 'left',
    top: '15px',
    textStyle: {
      overflow: 'truncate'
    }
  },
  color: ['#4bb87a'],
  grid: {
    left: '5%',
    right: '5%',
    bottom: '15%'
  },
  legend: {
    top: 'bottom',
    left: 'center',
    itemGap: 50
  },
  xAxis: [
    {
      axisLine: {
        show: false
      },
      type: 'category',
      data: ['', 'test1', 'test2', 'test3', 'test4', 'test5', 'test6', ''],
      boundaryGap: false,
      axisTick: {
        show: false
      }
    }
  ],
  yAxis: {
    splitLine: {
      lineStyle: {
        color: ['#c1c1c1'],
        opacity: 0.2
      }
    },
    max: 80
  },
  series: [
    {
      data: [0, 43, 32, 21, 65, 18, 19, 0],
      type: 'line',
      smooth: true,
      areaStyle: {
        opacity: 0.1
      },
      symbolSize: (v, p) => {
        const index = p.dataIndex
        if (index === 0 || index === 7) {
          return 0
        }
        return 4
      }
    },
    {
      type: 'bar',
      roundCap: true,
      itemStyle: {
        borderRadius: 5
      },
      barWidth: 20,
      data: [0, 33, 22, 11, 55, 6, 7, 0]
    }
  ],
  tooltip: {}
} as ECOption)
useEcharts(pie1, option)
useEcharts(pie2, option2)
</script>

<style scoped>
.charts-row {
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

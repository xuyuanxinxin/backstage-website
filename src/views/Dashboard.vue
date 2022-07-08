<template>
  <div class="container">
    <aside class="menu">
      <div class="menu-box">
        <div class="logo-label">DashBoard</div>
        <n-menu
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          :render-icon="renderMenuIcon"
          :render-label="renderMenuLabel"
        />
      </div>
    </aside>
    <aside class="main-box">
      <ToolBar />
      <div
        :style="{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '80px',
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
    </aside>
  </div>
</template>

<script setup lang="ts">
import { NIcon, NMenu, NCard, type MenuOption } from 'naive-ui'
import { InfoCard, ToolBar } from '@/components'
import { h, ref, type Ref } from 'vue'
import type { ECOption } from '@/composables/echart'
import { useEcharts } from '@/composables'
import type { CallbackDataParams } from 'echarts/types/dist/shared'
const collapsed = ref(false)
const pie1 = ref(null)
const pie2 = ref(null)
const menuOptions: MenuOption[] = [
  {
    label: '菜单1',
    key: 'menu1',
    href: '/login',
  },
  {
    label: '菜单2',
    key: 'menu2',
    children: [
      {
        label: '菜单2-1',
        key: 'menu2-1',
      },
      {
        label: '菜单2-2',
        key: 'menu2-2',
      },
    ],
  },
  {
    label: '菜单3',
    key: 'menu3',
    children: [
      {
        label: '菜单3-1',
        key: 'menu3-1',
      },
      {
        label: '菜单3-2',
        key: 'menu3-2',
      },
    ],
  },
  {
    label: '菜单4',
    key: 'menu4',
    children: [
      {
        label: '菜单4-1',
        key: 'menu4-1',
      },
      {
        label: '菜单4-2',
        key: 'menu4-2',
      },
    ],
  },
]
const renderMenuIcon = (option: MenuOption) => {
  if (option.icon !== null) {
    return h(NIcon, null)
  }
}
const renderMenuLabel = (option: MenuOption) => {
  if (option.href !== undefined) {
    return h('a', { href: option.href }, option.label as string)
  }
  return option.label as string
}
const data = [
  { id: 'a1', value: 33 },
  { id: 'a2', value: 92.1 },
  { id: 'a3', value: 94.4 },
  { id: 'a4', value: 85.4 },
]
const option: Ref<ECOption> = ref({
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
    top: 'bottom',
    left: 'center',
    itemGap: 50,
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
  tooltip: {},
} as ECOption)

const option2: Ref<ECOption> = ref({
  title: {
    text: '数据展示饼图',
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
    top: 'bottom',
    left: 'center',
    itemGap: 50,
  },
  xAxis: [
    {
      axisLine: {
        show: false,
      },
      type: 'category',
      data: ['', 'test1', 'test2', 'test3', 'test4', 'test5', 'test6', ''],
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
    max: 80,
  },
  series: [
    {
      data: [0, 43, 32, 21, 65, 18, 19, 0],
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
      type: 'bar',
      roundCap: true,
      itemStyle: {
        borderRadius: 5,
      },
      barWidth: 20,
      data: [0, 33, 22, 11, 55, 6, 7, 0],
    },
  ],
  tooltip: {},
} as ECOption)
useEcharts(pie1, option)
useEcharts(pie2, option2)
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: row;
}
.main-box {
  display: inline-block;
  padding: 0 15px;
}
.menu {
  width: 208px;
}
.menu-box {
  width: 100%;
  height: 100%;
  box-shadow: 2px 0 4px rgba(33, 33, 33, 0.2);
}
.main-box {
  width: calc(100vw - 208px);
  background-color: #f5f5f4;
}
.logo-label {
  font-size: 20px;
  font-style: italic;
  font-weight: 600;
  text-align: center;
}
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

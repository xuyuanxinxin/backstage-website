import { nextTick, onUnmounted, watch, type UnwrapNestedRefs } from 'vue'
import type { Ref } from 'vue'

import * as echarts from 'echarts/core'
import { BarChart, PieChart, LineChart } from 'echarts/charts'

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
} from 'echarts/components'

import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import type {
  TitleComponentOption,
  GridComponentOption,
  TooltipComponentOption,
  DatasetComponentOption,
  LegendComponentOption,
} from 'echarts/components'
import type { EChartsType, SeriesOption } from 'echarts/types/dist/shared'

export type ECOption = echarts.ComposeOption<
  | GridComponentOption
  | DatasetComponentOption
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | SeriesOption
>
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  CanvasRenderer,
  BarChart,
  PieChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
])

export function useEcharts(refData: Ref, option: UnwrapNestedRefs<ECOption>) {
  let chartInstance: EChartsType | null = null

  nextTick(() => {
    const element = refData.value as HTMLElement
    chartInstance = echarts.init(element)
    chartInstance.setOption(option)
  })

  function update() {
    nextTick(() => {
      chartInstance!.setOption(option)
    })
  }

  const unWatchOption = watch(option, update)

  onUnmounted(() => {
    unWatchOption()
  })

  return {
    update,
  }
}

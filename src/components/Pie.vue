<template>
  <p class="title">{{ title }}</p>
  <div id="Pie" style="width: 100%; height: 90%"></div>
</template>

<script setup lang="ts">
// 需要用到props
import { onMounted } from "vue";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption,
} from "echarts/components";
import { PieChart, PieSeriesOption } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | PieSeriesOption
>;
let title: string = "投诉类型"
let data: Array<object> = [
  { value: 1048, name: '售后' },
  { value: 735, name: '质量' },
  { value: 580, name: '价格' },
  { value: 484, name: '虚假宣传' },
  { value: 300, name: '其他' }
]
let init: Function = () => {
  var chartDom = document.getElementById("Pie");
  var myChart = echarts.init(chartDom, null, {
    renderer: "canvas",
    useDirtyRect: false,
  });
  var option: EChartsOption;

  option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: "50%",
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter(param) {
            // correct the percentage
            return param.name + ' (' + param.percent + '%)';
          }
        },
        labelLine: {
          show: true
        },
        data
      }
    ]
  };

  option && myChart.setOption(option);
}
onMounted(() => {
  init();
});


</script>

<style scoped>
.title {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
}
</style>
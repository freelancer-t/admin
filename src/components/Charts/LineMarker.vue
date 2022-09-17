<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
import resize from './mixins/resize'

const option = (data) => ({
  backgroundColor: '#fff',
  title: {
    top: 20,
    text: 'Thống kê doanh thu / chiết khấu',
    textStyle: {
      fontWeight: 'normal',
      fontSize: 16,
      color: '#2590EB'
    },
    left: '1%'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        color: '#57617B'
      }
    }
  },
  legend: {
    top: 20,
    icon: 'rect',
    itemWidth: 14,
    itemHeight: 5,
    itemGap: 13,
    data: ['Tổng doanh thu', 'Tổng chiết khấu'],
    right: '4%',
    textStyle: {
      fontSize: 12,
      color: '#2590EB'
    }
  },
  grid: {
    top: 100,
    left: '2%',
    right: '2%',
    bottom: '2%',
    containLabel: true
  },
  xAxis: [{
    type: 'category',
    boundaryGap: false,
    axisLine: {
      lineStyle: {
        color: '#2590EB'
      }
    },
    data: data[0].map(({ date }) => date)
  }],
  yAxis: [{
    type: 'value',
    name: '(vnđ)',
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#2590EB'
      }
    },
    axisLabel: {
      margin: 10,
      textStyle: {
        fontSize: 14
      }
    },
    splitLine: {
      lineStyle: {
        color: '#2590EB'
      }
    }
  }],
  series: [{
    name: 'Tổng doanh thu',
    type: 'line',
    smooth: true,
    symbol: 'circle',
    symbolSize: 5,
    showSymbol: false,
    lineStyle: {
      normal: {
        width: 1
      }
    },
    areaStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(137, 189, 27, 0.3)'
        }, {
          offset: 0.8,
          color: 'rgba(137, 189, 27, 0)'
        }], false),
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowBlur: 10
      }
    },
    itemStyle: {
      normal: {
        color: 'rgb(137,189,27)',
        borderColor: 'rgba(137,189,2,0.27)',
        borderWidth: 12
      }
    },
    data: data[0].map(({ price }) => price)
  }, {
    name: 'Tổng chiết khấu',
    type: 'line',
    smooth: true,
    symbol: 'circle',
    symbolSize: 5,
    showSymbol: false,
    lineStyle: {
      normal: {
        width: 1
      }
    },
    areaStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(0, 136, 212, 0.3)'
        }, {
          offset: 0.8,
          color: 'rgba(0, 136, 212, 0)'
        }], false),
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowBlur: 10
      }
    },
    itemStyle: {
      normal: {
        color: 'rgb(0,136,212)',
        borderColor: 'rgba(0,136,212,0.2)',
        borderWidth: 12
      }
    },
    data: data[0].map(({ discount_amount }) => discount_amount)
  }]
})

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    data: function() {
      const options = option({
        ...this.data,
        series: this.data.map(s => {
          return {
            ...s,
            data: []
          }
        })
      })

      this.chart.setOption(options)
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption(option(this.data))
    }
  }
}
</script>

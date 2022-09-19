<template>
  <div class="chart-container">
    <el-row>
      <el-select v-model="value" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-row>
    <el-row>
      <chart v-if="data.length" height="450px" width="100%" :data="data" />
    </el-row>
    <el-row :gutter="24">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table :recent-orders="recentOrders" />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 12}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Chart from '@/components/Charts/LineMarker'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'

import { analytics, fetchRecentOrder } from '@/api/dashboard'
import { loading } from '@/utils/index'

export default {
  name: 'LineChart',
  components: { Chart, TransactionTable, TodoList },
  data() {
    return {
      data: [],
      recentOrders: [],
      options: [
        { label: 'Tuần này', value: 1 },
        { label: 'Tháng này', value: 2 },
        { label: 'Tháng trước', value: 3 },
        { label: 'Năm này', value: 4 }
      ],
      value: 1
    }
  },
  watch: {
    value: function(val) {
      this.fetchData(val)
    }
  },
  async created() {
    await Promise.all([this.fetchData(1), this.fetchRecentOrder()])
  },
  methods: {
    async fetchData(type) {
      const load = loading()
      const { data } = await analytics({ type })
      this.data = [...data]
      load.close()
    },
    async fetchRecentOrder() {
      const { data } = await fetchRecentOrder()
      this.recentOrders = [...data]
    }
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

<style lang="scss">
  .chart-container {
    .el-row {
      padding: 16px 16px 0px;
      margin-bottom: 32px;
    }

    .el-row:first-child {
      margin-bottom: 0px;
    }
  }
</style>

<template>
  <el-table :data="recentOrders" style="width: 100%;padding-top: 15px;">
    <el-table-column label="Mã order" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.code }}
      </template>
    </el-table-column>
    <el-table-column label="Tổng tiền" width="195" align="center">
      <template slot-scope="scope">
        {{ formatMoney(scope.row.total_price) }}
      </template>
    </el-table-column>
    <el-table-column label="Trạng thái" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag
          :type="getTypeStatus(row.status).type"
          size="mini"
          effect="dark"
        >
          {{ getTypeStatus(row.status).txt }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { numberWithCommas } from '@/utils/index'

export default {
  props: {
    recentOrders: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      list: null
    }
  },
  methods: {
    formatMoney: x => numberWithCommas(x),
    getTypeStatus(status) {
      return status === 1 ? { type: 'primary', txt: 'Chờ xử lý' } : status === 2 ? { type: 'success', txt: 'Đã tất toán' } : { type: 'danger', txt: 'Đã huỷ đơn' }
    }
  }
}
</script>

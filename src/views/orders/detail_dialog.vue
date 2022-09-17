<template>
  <div>
    <el-dialog
      v-if="order"
      :title="`Thông tin chi tiết - ${order.code}`"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="50%"
      top="5vh"
    >
      <el-form :label-position="labelPosition" label-width="100px">
        <el-form-item label="Tên khách hàng">
          <el-input v-model="form.customer_name" disabled />
        </el-form-item>
        <el-row :gutter="24">
          <el-col :span="14">
            <el-form-item label="Email">
              <el-input v-model="form.customer_email" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="Số điện thoại">
              <el-input v-model="form.customer_phone" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="Địa chỉ">
              <el-input v-model="form.address" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Tỉnh / thành">
              <el-input v-model="form.address_1" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="Quận / huyện">
              <el-input v-model="form.address_2" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Phường / xã">
              <el-input v-model="form.address_3" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="Phương thức nhận hàng">
              <el-input v-model="form.delivery_type" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Phương thức thanh toán">
              <el-input v-model="form.payment_method" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div>
        <el-table
          ref="dragTable"
          v-loading="listLoading"
          :data="form.order_details"
          element-loading-text="Loading"
          row-key="id"
          border
          fit
          highlight-current-row
        >
          <el-table-column align="center" label="Số thứ tự">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="Tên sản phẩm">
            <template slot-scope="scope">
              {{ scope.row.product_name }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="Giá sản phẩm">
            <template slot-scope="scope">
              {{ formatMoney(scope.row.product_price) }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="Số lượng">
            <template slot-scope="scope">
              {{ scope.row.quantity }}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <h3 style="margin-top: 10px">Tổng tiền : {{ formatMoney(order.total_price) }} </h3>
      <h3 style="margin-top: 10px">Tổng tiền chưa có chiết khấu : {{ formatMoney(+order.discount_amount + +order.total_price) }} </h3>
      <h3 style="margin-top: 10px">Chiết khấu : {{ formatMoney(order.discount_amount) }} </h3>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">Đóng</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { numberWithCommas } from '@/utils/index'

export default {
  name: 'DetailDialog',
  props: {
    order: {
      type: Object,
      default: () => {}
    },
    dialogVisible: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      labelPosition: 'top',
      form: { ...this.order }
    }
  },
  watch: {
    order: function(val) {
      this.form = { ...val }
    }
  },
  methods: {
    handleClose() {
      this.$emit('cancelDialog')
    },
    formatMoney: x => numberWithCommas(x)
  }
}
</script>

<style>
  .el-form--label-top .el-form-item__label {
    padding: 0!important
  }

  .el-dialog__body {
    padding: 15px 10px !important;
  }

  .el-form-item {
    margin-bottom: 10px;
  }
</style>

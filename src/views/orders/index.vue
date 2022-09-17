<template>
  <div class="app-container">
    <div style="marign: 10px">
      <el-collapse accordion>
        <el-collapse-item name="1">
          <template slot="title">
            <h3>Mở hộp thoại tìm kiếm <i class="header-icon el-icon-search" /></h3>
          </template>
          <div style="padding: 10px; border: 1px solid black">
            <el-form v-model="formSearch" :label-position="labelPosition" class="demo-form-inline">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="CODE">
                    <el-input v-model="formSearch.code" placeholder="XXX" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="Tên khách hàng">
                    <el-input v-model="formSearch.customer_name" placeholder="Nguyễn Văn A" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="Số điện thoại">
                    <el-input v-model="formSearch.customer_phone" placeholder="0905 123 XXX" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="Khoảng giá khởi điểm">
                    <el-input v-model="formSearch.price_start" placeholder="1 000 000" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="Khoảng giá kết thúc">
                    <el-input v-model="formSearch.price_end" placeholder="1 200 000" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="Trạng thái">
                    <el-select v-model="formSearch.status" placeholder="Trạng thái">
                      <el-option label="Tất cả" value="0" />
                      <el-option label="Đang xử lý" value="1" />
                      <el-option label="Đã hoàn tất" value="2" />
                      <el-option label="Đã huỷ" value="3" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="Từ ngày">
                    <el-date-picker
                      v-model="formSearch.order_date_start"
                      type="date"
                      placeholder="Chọn ngày bắt đầu"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="Đến ngày">
                    <el-date-picker
                      v-model="formSearch.order_date_end"
                      type="date"
                      placeholder="Chọn ngày kết thúc"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                <el-button type="primary" @click="fetchData(1)">Tìm kiếm</el-button>
                <el-button @click="clearSearch">Xoá tìm kiếm</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-table
      ref="dragTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      row-key="id"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="CODE" width="95">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column label="Tên khách hàng">
        <template slot-scope="scope">
          {{ scope.row.customer_name }}
        </template>
      </el-table-column>
      <el-table-column label="Số điện thoại">
        <template slot-scope="scope">
          {{ scope.row.customer_phone }}
        </template>
      </el-table-column>
      <el-table-column label="Email">
        <template slot-scope="scope">
          {{ scope.row.customer_email }}
        </template>
      </el-table-column>
      <el-table-column label="Tổng tiền">
        <template slot-scope="scope">
          {{ formatMoney(+scope.row.total_price + +scope.row.discount_amount) }}
        </template>
      </el-table-column>
      <el-table-column label="Giảm giá">
        <template slot-scope="scope">
          {{ formatMoney(scope.row.discount_amount) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Thành tiền" width="200">
        <template slot-scope="scope">
          <span>{{ formatMoney(scope.row.total_price) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Ngày order" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.order_date }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Trạng thái" width="200">
        <template slot-scope="scope">
          <el-tag
            :type="getTypeStatus(scope.row.status).type"
            size="mini"
            effect="dark"
          >
            {{ getTypeStatus(scope.row.status).txt }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Thao tác" width="200" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button icon="el-icon-view" circle @click="show(scope.row.id)" />
            <el-button v-if="scope.row.status !== 2" type="success" icon="el-icon-finished" circle @click="updateStatus(scope.row.id, 2)" />
            <el-button v-if="scope.row.status !== 3" type="danger" icon="el-icon-delete" circle @click="updateStatus(scope.row.id, 3)" />
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 10px">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="perPage"
        @current-change="handleCurrentChange"
      />
    </div>
    <DetailDialog
      :order="order"
      :dialog-visible="visibleDetail"
      @cancelDialog="visibleDetail = false"
    />
  </div>
</template>
<script>
import { getList, updateStatus, fetchOrder } from '@/api/order'
import { numberWithCommas, loading } from '@/utils/index'
import { pagiMixin } from '@/mixin/common'
import DetailDialog from './detail_dialog.vue'

export default {
  components: { DetailDialog },
  mixins: [pagiMixin],
  data() {
    return {
      listLoading: true,
      order: null,
      visibleDetail: false,
      formSearch: {
        code: '',
        customer_name: '',
        customer_email: '',
        price_start: '',
        price_end: '',
        order_date_start: null,
        order_date_end: null,
        status: '0'
      },
      labelPosition: 'top'
    }
  },
  created() {
    this.fetchData(1)
  },
  methods: {
    async fetchData(nextPage) {
      this.listLoading = true
      const { data } = await getList({ page: nextPage, ...this.formSearch })
      this.setPagi(data)
      this.listLoading = false
    },
    async updateStatus(id, status) {
      const load = loading()

      await this.$confirm('Bạn chắc chắn chứ?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async() => {
        await updateStatus(id, status)
          .then(({ message, data }) => {
            this.$message({
              type: 'success',
              message
            })

            this.list = this.list.map(l => l.id === id ? data : l)
          })
      })

      load.close()
    },
    async show(id) {
      const load = loading()
      const { data } = await fetchOrder(id)
      this.order = {
        ...data,
        delivery_type: data.delivery_type === 1 ? 'Giao tận nơi' : 'Nhận tại cửa hàng',
        payment_method: data.payment_method === 1 ? 'Thanh toán khi giao hàng (COD)' : 'Chuyển khoản ngân hàng'
      }

      load.close()
      this.visibleDetail = true
    },
    async clearSearch() {
      this.formSearch = {
        code: '',
        customer_name: '',
        customer_email: '',
        price_start: '',
        price_end: '',
        order_date_start: null,
        order_date_end: null,
        status: '0'
      }

      await this.fetchData(1)
    },
    getTypeStatus(status) {
      return status === 1 ? { type: 'primary', txt: 'Chờ xử lý' } : status === 2 ? { type: 'success', txt: 'Đã tất toán' } : { type: 'danger', txt: 'Đã huỷ đơn' }
    },
    formatMoney: x => numberWithCommas(x)
  }
}
</script>
<style>
.el-form-item {
  width: 100%;
  padding: 0 5px;
}

.el-select {
  width: 100%;
}
</style>

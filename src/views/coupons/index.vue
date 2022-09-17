<template>
  <div class="app-container">
    <div style="margin-bottom: 5px">
      <el-button size="small" type="primary" icon="el-icon-edit" @click="dialogFormVisible = true">Tạo mới mã giảm giá</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="Tên mã giảm giá">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="Code">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column label="Tỷ lệ giảm giá (%)">
        <template slot-scope="scope">
          {{ scope.row.rate_discount }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Ngày hết hạn" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.date_expirate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="status" label="Trạng thái" width="200">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.is_used ? 'danger' : 'success'"
            effect="dark"
          >
            {{ scope.row.is_used ? 'Đã sử dụng' : 'Chưa sử dụng' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Thao tác" width="200" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button v-if="!scope.row.is_used" type="primary" icon="el-icon-edit" circle @click="loadCoupon(scope.row.id)" />
            <el-button type="danger" icon="el-icon-delete" circle @click="destroy(scope.row.id)" />
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
    <FormCoupon
      :coupon="coupon"
      :dialog-form-visible="dialogFormVisible"
      :errors="errors"
      @cancel="cancelDialog"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import { getList, createCoupon, fetchCoupon, updateCoupon, deleteCoupon } from '@/api/coupon'
import { pagiMixin } from '@/mixin/common'
import FormCoupon from './form.vue'

export default {
  components: { FormCoupon },
  mixins: [pagiMixin],
  data() {
    return {
      listLoading: true,
      dialogFormVisible: false,
      errors: {},
      coupon: {}
    }
  },
  async created() {
    await this.fetchData(1)
  },
  methods: {
    async fetchData(nextPage) {
      this.listLoading = true
      const { data } = await getList({ page: nextPage })
      this.setPagi(data)
      this.listLoading = false
    },
    cancelDialog() {
      this.dialogFormVisible = false
      this.errors = {}
    },
    async onSubmit(data) {
      const request = data.id
        ? updateCoupon(data.id, data)
        : createCoupon(data)

      await request
        .then(async({ message }) => {
          await this.fetchData(1)
          await this.$message({
            type: 'success',
            message
          })
          this.cancelDialog()
        })
        .catch(({ response }) => {
          const { status, data } = response

          if (status === 422) {
            this.errors = data.errors
          }
        })
    },
    async destroy(id) {
      await this.$confirm('Bạn chắc chắn muốn xoá danh mục này?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async() => {
        this.listLoading = true
        await deleteCoupon(id)
          .then(({ message }) => {
            this.$message({
              type: 'success',
              message
            })
          })

        await this.fetchData(1)
      })
    },
    async loadCoupon(id) {
      this.listLoading = true
      const { data } = await fetchCoupon(id)

      this.coupon = { ...data }
      this.dialogFormVisible = true
      this.listLoading = false
    }
  }
}
</script>

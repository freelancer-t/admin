<template>
  <div class="app-container">
    <div style="margin-bottom: 5px">
      <router-link :to="{ name: 'product_discounts_create'}" tag="span">
        <el-button size="small" type="primary" icon="el-icon-edit">Tạo mới chiến dịch giảm giá</el-button>
      </router-link>
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
      <el-table-column label="Sổ sản phẩm áp dụng">
        <template slot-scope="scope">
          {{ scope.row.products_count }}
        </template>
      </el-table-column>
      <el-table-column label="Tỷ lệ giảm giá (%)">
        <template slot-scope="scope">
          {{ scope.row.percent }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Ngày bắt đầu" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.sale_start }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Ngày hết hạn" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.sale_end }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Thao tác" width="200" align="center">
        <template slot-scope="scope">
          <el-row>
            <router-link :to="{ name: 'product_discounts_edit', params: { id: scope.row.id }}" tag="span">
              <el-button type="primary" icon="el-icon-edit" circle />
            </router-link>
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
  </div>
</template>

<script>
import { getList, deleteProductDiscount } from '@/api/product_discount'
import { pagiMixin } from '@/mixin/common'

export default {
  mixins: [pagiMixin],
  data() {
    return {
      listLoading: true,
      errors: {}
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
    async destroy(id) {
      await this.$confirm('Bạn chắc chắn muốn xoá danh mục này?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async() => {
        this.listLoading = true
        await deleteProductDiscount(id)
          .then(({ message }) => {
            this.$message({
              type: 'success',
              message
            })
          })

        await this.fetchData(1)
      })
    }
  }
}
</script>

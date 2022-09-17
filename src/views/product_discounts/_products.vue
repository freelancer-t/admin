<template>
  <div>
    <el-dialog
      title="Chọn sản phẩm"
      :visible.sync="dialogFormVisible"
      :before-close="cancel"
      :width="'75%'"
      :top="'5vh'"
      @open="fetchData(1)"
    >
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" :label="`Số lượng chọn (${newIds.length})`" width="200">
          <template slot-scope="scope">
            <input
              type="checkbox"
              :value="scope.row.id"
              :checked="newIds.includes(scope.row.id)"
              @click="add"
            >
          </template>
        </el-table-column>
        <el-table-column align="center" label="Tên sản phẩm">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="Ảnh sản phẩm">
          <template slot-scope="scope">
            <img :src="scope.row.images[0].url" class="image" width="75" height="75">
          </template>
        </el-table-column>
        <el-table-column align="center" label="Giá">
          <template slot-scope="scope">
            <el-tag v-for="stock in scope.row.product_unit_stocks" :key="stock.id" size="normal" effect="plain">
              {{ stock.name }} {{ formatMoney(stock.retail_price) }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 10px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="perPage"
          :current-page.sync="currentPage"
          @current-change="handleCurrentChange"
        />
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">Huỷ bỏ</el-button>
        <el-button type="primary" @click="done">Đồng ý</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { loadProduct } from '@/api/product'
import { pagiMixin } from '@/mixin/common'
import { numberWithCommas } from '@/utils/index'

export default {
  mixins: [pagiMixin],
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: () => false
    },
    ids: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      listLoading: false,
      newIds: [],
      currentIds: [],
      currentPage: 1
    }
  },
  watch: {
    ids: function(newVal) {
      this.currentIds = [...newVal]
    }
  },
  methods: {
    add({ target }) {
      const value = target.value
      const isChecked = target.checked

      this.newIds = isChecked ? [...this.newIds, +value] : this.newIds.filter(i => i !== value)
    },
    cancel() {
      this.$emit('cancel')
      this.newIds = this.currentIds
      this.list = []
      this.currentPage = 1
    },
    done() {
      this.currentIds = this.newIds
      this.$emit('done', this.currentIds)
    },
    async fetchData(nextPage) {
      if (this.currentIds.length) {
        this.newIds = [...this.currentIds]
      }

      this.listLoading = true
      const { data } = await loadProduct({ page: nextPage })
      this.setPagi(data)
      this.listLoading = false
    },
    formatMoney: (x) => numberWithCommas(x)
  }
}
</script>

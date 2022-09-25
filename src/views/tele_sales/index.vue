<template>
  <div class="app-container">
    <div style="margin: 10px 0">
      <el-collapse accordion>
        <el-collapse-item name="1">
          <template slot="title">
            <h3>Mở hộp thoại tìm kiếm <i class="header-icon el-icon-search" /></h3>
          </template>
          <div style="padding: 10px; border: 1px solid black">
            <el-form v-model="formSearch" :label-position="labelPosition" class="demo-form-inline">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="Tên sản phẩm">
                    <el-input v-model="formSearch.name" placeholder="Tôm tít.." />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="Từ khoá">
                    <el-input v-model="formSearch.keyword" placeholder="Tôm tít, tôm hùm, ..." />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="Xuất xứ">
                    <el-input v-model="formSearch.origin" placeholder="Việt Nam" />
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
                    <el-select v-model="formSearch.category_id" placeholder="Trạng thái">
                      <el-option label="Tất cả" :value="0" />
                      <el-option v-for="cate in categories" :key="cate.id" :label="cate.name" :value="cate.id" />
                    </el-select>
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
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="Ảnh đại diện">
        <template slot-scope="scope">
          <img :src="scope.row.images[0].url" class="image" width="75" height="75">
        </template>
      </el-table-column>
      <el-table-column align="center" label="Tên sản phẩm">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Đường dẫn">
        <template slot-scope="scope">
          {{ scope.row.slug }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Danh mục">
        <template slot-scope="scope">
          {{ categoriesToString(scope.row.categories) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Từ khoá">
        <template slot-scope="scope">
          {{ scope.row.keyword }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Xuất xứ">
        <template slot-scope="scope">
          {{ scope.row.origin }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Ưu đãi">
        <template slot-scope="scope">
          {{ scope.row.endow }}
        </template>
      </el-table-column>
      <el-table-column label="Thao tác" width="200" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button type="default" icon="el-icon-view" circle @click="detail(scope.row.id)" />
            <router-link :to="{ name: 'products_edit', params: { id: scope.row.id }}">
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
    <DrawerProduct
      :product="product"
      :drawer="drawer"
      @closeDrawer="closeDrawer"
    />
  </div>
</template>

<script>
import { getList as getCategories } from '@/api/category'
import { getList, deleteProduct, fetchProduct } from '@/api/product'
import { pagiMixin } from '@/mixin/common'
import { loading } from '@/utils/index'
import DrawerProduct from '../products/_drawer'

export default {
  components: { DrawerProduct },
  mixins: [pagiMixin],
  data() {
    return {
      listLoading: true,
      categories: [],
      formSearch: {
        name: '',
        keyword: '',
        origin: '',
        price_start: '',
        price_end: '',
        category_id: 0
      },
      labelPosition: 'top',
      drawer: false,
      product: {}
    }
  },
  async created() {
    await Promise.all([this.fetchCategories(), this.fetchData(1)])
  },
  methods: {
    async fetchCategories() {
      const { data } = await getCategories()
      this.categories = data.map(({ id, name }) => ({ id, name }))
    },
    async fetchData(nextPage) {
      this.listLoading = true
      const { data } = await getList({ page: nextPage, ...this.formSearch })
      this.setPagi(data)
      this.listLoading = false
    },
    async destroy(id) {
      await this.$confirm('Bạn chắc chắn muốn xoá sản phẩm này?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async() => {
        this.listLoading = true
        await deleteProduct(id)
          .then(({ message }) => {
            this.$message({
              type: 'success',
              message
            })
          })

        await this.fetchData(1)
      })
    },
    async clearSearch() {
      this.formSearch = {
        name: '',
        keyword: '',
        origin: '',
        price_start: '',
        price_end: '',
        category_id: 0
      }

      await this.fetchData(1)
    },
    async detail(id) {
      const load = loading()
      const { data } = await fetchProduct(id)
      this.product = { ...data }
      this.drawer = true
      load.close()
    },
    categoriesToString(categories) {
      return categories.map(c => c.name).join(', ')
    },
    closeDrawer() {
      this.drawer = false
    }
  }
}
</script>
<style>
.el-select {
  width: 100%;
}

.el-drawer__body {
  padding: 20px;
}
</style>

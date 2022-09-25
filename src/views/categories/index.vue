<template>
  <div class="app-container">
    <div style="margin-bottom: 5px">
      <router-link :to="{ name: 'category_create'}" tag="span">
        <el-button size="small" type="primary" icon="el-icon-edit">Tạo mới danh mục</el-button>
      </router-link>
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
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="Icon">
        <template slot-scope="scope">
          <img :src="scope.row.icon" class="image" width="50">
        </template>
      </el-table-column>
      <el-table-column label="Tên danh mục">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="Slug">
        <template slot-scope="scope">
          {{ scope.row.slug }}
        </template>
      </el-table-column>
      <el-table-column label="Thứ tự">
        <template slot-scope="scope">
          {{ scope.row.order }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Ngày tạo" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Thao tác" width="200" align="center">
        <template slot-scope="scope">
          <el-row>
            <router-link :to="{ name: 'category_edit', params: { id: scope.row.id }}" tag="span">
              <el-button type="primary" icon="el-icon-edit" circle />
            </router-link>
            <el-button type="danger" icon="el-icon-delete" circle @click="destroy(scope.row.id)" />
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Sortable from 'sortablejs'

import { getList, deleteCategory, updateOrder } from '@/api/category'
import { loading } from '@/utils/index'

export default {
  data() {
    return {
      list: [],
      listLoading: true,
      sortable: null,
      oldList: [],
      newList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    setList() {
      this.oldList = this.list.map(v => v.id)
      this.newList = this.oldList.slice()
    },
    async fetchData() {
      this.listLoading = true
      const { data } = await getList()

      this.list = data
      this.listLoading = false
      this.setList()
      this.$nextTick(() => {
        this.setSort()
      })
    },
    async destroy(id) {
      const load = loading()

      await this.$confirm('Bạn chắc chắn muốn xoá danh mục này?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async() => {
        await deleteCategory(id)
          .then(({ message }) => {
            this.$message({
              type: 'success',
              message
            })
          })

        this.list = this.list.filter(i => i.id !== id)
        this.setList()
      })

      load.close()
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onEnd: async({ oldIndex, newIndex }) => {
          this.listLoading = true
          const targetRow = this.list.splice(oldIndex, 1)[0]

          this.list.splice(newIndex, 0, targetRow)
          this.list = this.list.map((item, order) => ({ ...item, order }))

          await updateOrder(this.list.map(l => ({ id: l.id, order: l.order })))

          this.listLoading = false
        }
      })
    }
  }
}
</script>
<style lang="css">
  .sortable-ghost{
    opacity: .8;
    color: #fff!important;
    background: #42b983!important;
  }
</style>

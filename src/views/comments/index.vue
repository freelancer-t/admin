<template>
  <div class="app-container">
    <div style="margin-bottom: 5px">
      <el-button size="small" type="primary" icon="el-icon-edit" @click="dialogFormVisible = true">Tạo mới bình luận</el-button>
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
      <el-table-column label="Tên">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="Nội dung">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="Ảnh đại diện">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" class="image" width="75" height="75">
        </template>
      </el-table-column>
      <el-table-column label="Thao tác" width="200" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button v-if="!scope.row.is_used" type="primary" icon="el-icon-edit" circle @click="loadComment(scope.row.id)" />
            <el-button type="danger" icon="el-icon-delete" circle @click="destroy(scope.row.id)" />
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <FormComment
      :comment="comment"
      :dialog-form-visible="dialogFormVisible"
      :errors="errors"
      @cancel="cancelDialog"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import { getList, createComment, fetchComment, updateComment, deleteComment } from '@/api/comment'
import FormComment from './form.vue'

export default {
  components: { FormComment },
  data() {
    return {
      listLoading: true,
      dialogFormVisible: false,
      errors: {},
      comment: {},
      list: []
    }
  },
  async created() {
    await this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const { data } = await getList()
      this.list = data
      this.listLoading = false
    },
    cancelDialog() {
      this.dialogFormVisible = false
      this.errors = {}
    },
    async onSubmit(data) {
      const formData = new FormData()
      for (const key in data) {
        if (key === 'avatar') {
          data[key] = formData.append('avatar', data[key].raw)
        } else {
          formData.append(key, data[key])
        }
      }

      if (data.id) {
        formData.append('_method', 'put')
      }

      const request = data.id
        ? updateComment(data.id, formData)
        : createComment(formData)

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
        await deleteComment(id)
          .then(({ message }) => {
            this.$message({
              type: 'success',
              message
            })
          })

        await this.fetchData()
      })
    },
    async loadComment(id) {
      this.listLoading = true
      const { data } = await fetchComment(id)

      this.comment = { ...data }
      this.dialogFormVisible = true
      this.listLoading = false
    }
  }
}
</script>

<template>
  <div>
    <el-dialog
      title="Tạo mới mã giảm giá"
      :visible.sync="dialogFormVisible"
      :before-close="cancel"
    >
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="Tên người bình luận" :label-width="formLabelWidth" prop="name" :error="errorField('name')">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Nội dùng" :label-width="formLabelWidth" prop="code" :error="errorField('content')">
          <el-input v-model="form.content" autocomplete="off" type="textarea" />
        </el-form-item>
        <el-form-item label="Ảnh" :error="errorField('avatar')" prop="avatar">
          <el-upload
            ref="upload"
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :file-list="fileList"
            accept="image/jpg,image/png,image/jpeg,images/webp"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">Huỷ bỏ</el-button>
        <el-button type="primary" :loading="btnLoading" @click="onSubmit">Đồng ý</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { formMixin } from '@/mixin/common'

export default {
  name: 'FormComment',
  mixins: [formMixin],
  props: {
    comment: {
      type: Object,
      default: () => {}
    },
    dialogFormVisible: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      form: {
        name: '',
        content: '',
        avatar: null
      },
      rules: {
        name: [
          { required: true, message: 'Vui lòng điền tên mã giảm giá', trigger: 'blur' }
        ],
        content: [
          { required: true, message: 'Vui lòng điền CODE', trigger: 'blur' }
        ]
      },
      formLabelWidth: '200px',
      fileList: []
    }
  },
  watch: {
    comment: function(newVal) {
      this.form = { ...newVal }
      this.fileList = [{ id: newVal.id, url: this.form.avatar }]
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel', false)
      this.resetForm()
    },
    resetForm() {
      this.form = {
        name: '',
        content: '',
        avatar: null
      }
      this.fileList = []
    },
    onSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.btnLoading = true
          this.form.avatar = this.$refs.upload.uploadFiles[this.$refs.upload.uploadFiles.length - 1]
          this.$emit('submit', this.form)
          setTimeout(() => {
            this.btnLoading = false
            this.resetForm()
          }, 500)
        } else {
          return false
        }
      })
    }
  }
}
</script>

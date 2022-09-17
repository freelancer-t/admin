<template>
  <el-form ref="form" :model="form" label-width="120px" :rules="rules">
    <el-form-item label="Tên danh mục" prop="name" :error="errorField('name')">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="Đường dẫn" prop="slug" :error="errorField('slug')">
      <el-input v-model="form.slug" />
    </el-form-item>
    <el-form-item label="Vị trí" prop="order" :error="errorField('order')">
      <el-input v-model="form.order" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">{{ category.name.length ? 'Cập nhật' : 'Tạo mới' }}</el-button>
      <el-button @click="onCancel">Huỷ</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { convertToSlug } from '@/utils/index'
import { formMixin } from '@/mixin/common'

export default {
  name: 'FormCategory',
  mixins: [formMixin],
  props: {
    category: {
      type: Object,
      default: () => ({
        name: '',
        slug: '',
        order: 0
      })
    },
    onSubmit: {
      type: Function,
      default: () => []
    }
  },
  data() {
    return {
      form: {
        name: '',
        slug: '',
        order: 0
      },
      rules: {
        name: [
          { required: true, message: 'Vui lòng điền tên danh mục', trigger: 'blur' }
        ],
        slug: [
          { required: true, message: 'Vui lòng điền đường dẫn', trigger: 'blur' }
        ],
        order: [
          { required: true, message: 'Vui lòng điền số thứ tự', trigger: 'blur' }
        ]
      },
      isLoading: false
    }
  },
  computed: {
    name() {
      return this.form.name
    }
  },
  watch: {
    category: function(newVal) {
      this.form = { ...newVal }
    },
    name(val) {
      this.form.slug = convertToSlug(val)
    }
  },
  methods: {
    onCancel() {
      this.$router.push({ name: 'category_index' })
    },
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$emit('onSubmit', this.form)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>


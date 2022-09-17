<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="Tên" prop="name" :error="errorField('name')">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Tỷ lệ giảm" prop="percent" :error="errorField('percent')">
        <el-input v-model="form.percent" type="number" />
      </el-form-item>
      <el-form-item label="Ngày hết hạn" prop="sale_start" :error="errorField('sale_start')">
        <el-date-picker
          v-model="form.sale_start"
          type="datetime"
          placeholder="Chọn ngày bắt đầu"
        />
      </el-form-item>
      <el-form-item label="Ngày hết hạn" prop="sale_end" :error="errorField('sale_end')">
        <el-date-picker
          v-model="form.sale_end"
          type="datetime"
          placeholder="Chọn ngày hết hạn"
        />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-edit" @click="dialogFormVisible = true">Chọn sản phẩm giảm giá</el-button>
        <el-button type="primary" @click="submit">{{ form.name.length ? 'Cập nhật' : 'Tạo mới' }}</el-button>
        <el-button @click="onCancel">Huỷ</el-button>
      </el-form-item>
    </el-form>
    <DiaglogProduct
      :dialog-form-visible="dialogFormVisible"
      :ids="form.product_ids"
      @cancel="cancelDialog"
      @done="done"
    />
  </div>
</template>
<script>
import DiaglogProduct from './_products.vue'
import { formMixin } from '@/mixin/common'

export default {
  name: 'FormProductDiscount',
  components: { DiaglogProduct },
  mixins: [formMixin],
  props: {
    productDiscount: {
      type: Object,
      default: () => ({
        name: '',
        percent: 0,
        product_ids: [],
        sale_start: null,
        sale_end: null
      })
    }
  },
  data() {
    return {
      form: {
        name: '',
        percent: 0,
        product_ids: [],
        sale_start: null,
        sale_end: null
      },
      rules: {
        name: [
          { required: true, message: 'Vui lòng điền tên', trigger: 'blur' }
        ],
        percent: [
          { required: true, message: 'Vui lòng điền tỷ lệ giảm', trigger: 'blur' }
        ],
        sale_start: [
          { required: true, message: 'Vui lòng điền ngày bắt đầu', trigger: 'blur' }
        ],
        sale_end: [
          { required: true, message: 'Vui lòng điền ngày kết thúc', trigger: 'blur' }
        ]
      },
      isLoading: false,
      dialogFormVisible: false
    }
  },
  watch: {
    productDiscount: function(newVal) {
      this.form = { ...newVal }
    }
  },
  methods: {
    onCancel() {
      this.$router.push({ name: 'product_discounts_index' })
    },
    cancelDialog() {
      this.dialogFormVisible = false
    },
    done(ids) {
      this.form.product_ids = ids
      this.cancelDialog()
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


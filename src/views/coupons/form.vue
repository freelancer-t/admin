<template>
  <div>
    <el-dialog
      title="Tạo mới mã giảm giá"
      :visible.sync="dialogFormVisible"
      :before-close="cancel"
    >
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="Tên mã giảm giá" :label-width="formLabelWidth" prop="name" :error="errorField('name')">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="CODE" :label-width="formLabelWidth" prop="code" :error="errorField('code')">
          <el-input v-model="form.code" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Tỷ lệ giảm giá" :label-width="formLabelWidth" prop="rate_discount" :error="errorField('rate_discount')">
          <el-input v-model="form.rate_discount" type="number" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Ngày hết hạn" :label-width="formLabelWidth" prop="date_expirate" :error="errorField('date_expirate')">
          <el-date-picker
            v-model="form.date_expirate"
            type="date"
            placeholder="Chọn ngày hết hạn"
            :picker-options="pickerOptions"
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
import { strRandom } from '@/utils/index'
import { formMixin } from '@/mixin/common'

export default {
  mixins: [formMixin],
  props: {
    coupon: {
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
        code: strRandom(),
        rate_discount: 0,
        date_expirate: null
      },
      rules: {
        name: [
          { required: true, message: 'Vui lòng điền tên mã giảm giá', trigger: 'blur' }
        ],
        code: [
          { required: true, message: 'Vui lòng điền CODE', trigger: 'blur' }
        ],
        rate_discount: [
          { required: true, message: 'Vui lòng điền tỷ lệ giảm giá', trigger: 'blur' }
        ],
        date_expirate: [
          { required: true, message: 'Vui lòng điền ngày hết hạn', trigger: 'blur' }
        ]
      },
      formLabelWidth: '200px',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        },
        shortcuts: [{
          text: 'Hôm nay',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: 'Tuần sau',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }, {
          text: 'Tháng sau',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 30)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  watch: {
    coupon: function(newVal) {
      this.form = { ...newVal }
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
        code: strRandom(),
        rate_discount: 0,
        date_expirate: null
      }
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
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

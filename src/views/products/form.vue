<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="Tên sản phẩm" :error="errorField('name')" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="Đường dẫn" :error="errorField('slug')" prop="slug">
            <el-input v-model="form.slug" />
          </el-form-item>
          <el-form-item label="Danh mục" :error="errorField('category_ids')" prop="category_ids">
            <el-select v-model="form.category_ids" multiple placeholder="Select">
              <el-option
                v-for="c in categories"
                :key="c.id"
                :label="c.name"
                :value="c.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Từ khoá" :error="errorField('keyword')" prop="keyword">
            <el-tag
              v-for="tag in form.keyword"
              :key="tag"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              v-if="inputVisible"
              ref="saveTagInput"
              v-model="inputValue"
              class="input-new-tag"
              size="mini"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Từ khoá mới</el-button>
          </el-form-item>
          <el-form-item label="Xuất xứ" :error="errorField('origin')" prop="origin">
            <el-input v-model="form.origin" />
          </el-form-item>
          <el-form-item label="Ưu đãi" :error="errorField('endow')" prop="endow">
            <el-input v-model="form.endow" />
          </el-form-item>
          <el-form-item label="Ghi chú" :error="errorField('note')" prop="note">
            <el-input v-model="form.note" type="textarea" />
          </el-form-item>
          <el-form-item label="Mô tả ngắn" :error="errorField('soft_description')" prop="soft_description">
            <el-input v-model="form.soft_description" type="textarea" />
          </el-form-item>
          <el-form-item label="Mô tả ngắn" :error="errorField('description')" prop="description">
            <form-editor v-model="form.description" />
          </el-form-item>
          <el-form-item label="Sản phẩm hot ?" :error="errorField('is_hot')" prop="is_hot">
            <el-checkbox v-model="form.is_hot" name="type" />
          </el-form-item>
          <el-form-item label="Ảnh sản phẩm" :error="errorField('images')" prop="images">
            <el-upload
              ref="upload"
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              :file-list="fileList"
              accept="image/jpg,image/png,image/jpeg,images/webp"
              multiple
            >
              <i slot="default" class="el-icon-plus" />
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in" />
                  </span>
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete" />
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <div v-if="isRenderStocks">
            <ProductUnitStock
              v-for="(stock, index) in form.product_unit_stocks"
              :key="index"
              :stock="stock"
              :index="index"
              :errors="errors"
              @changeStock="changeStock"
              @deleteStock="deleteStock"
            />
          </div>
          <div style="margin-top: 10px">
            <el-button type="primary" size="mini" @click="addStock">Thêm loại</el-button>
          </div>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ form.id ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm' }}</el-button>
        <el-button @click="cancel">Huỷ</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { formMixin } from '@/mixin/common'
import { getList as getCategories } from '@/api/category'
import FormEditor from '@/components/FormEditor/index'
import ProductUnitStock from './_product_unit_stock.vue'

export default {
  name: 'FormProduct',
  components: { FormEditor, ProductUnitStock },
  mixins: [formMixin],
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      categories: [],
      form: {
        id: undefined,
        name: '',
        slug: '',
        category_ids: [],
        keyword: [],
        origin: '',
        endow: '',
        note: '',
        soft_description: '',
        description: '',
        is_hot: false,
        product_unit_stocks: [
          {
            id: undefined,
            name: '',
            retail_price: null
          }
        ],
        images: [],
        image_deleted: []
      },
      rules: {
        name: [
          { required: true, message: 'Vui lòng điền tên danh mục', trigger: 'blur' }
        ],
        slug: [
          { required: true, message: 'Vui lòng điền đường dẫn', trigger: 'blur' }
        ],
        category_ids: [
          { required: true, message: 'Vui lòng điền số thứ tự', trigger: 'blur' }
        ]
      },
      inputVisible: false,
      inputValue: '',
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    isRenderStocks() {
      return this.$route.name === 'products_create' || this.form.product_unit_stocks[0].id
    }
  },
  watch: {
    product: {
      handler(val) {
        this.form = {
          ...val,
          category_ids: val.categories.map(i => i.id),
          keyword: val.keyword ? val.keyword.split(',') : [],
          image_deleted: []
        }
        this.fileList = val.images.map(({ id, url }) => ({ id, url }))
      },
      deep: true
    }
  },
  async created() {
    await this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      const { data } = await getCategories()
      this.categories = data.map(({ id, name }) => ({ id, name }))
    },
    handleClose(tag) {
      this.form.keyword.splice(this.form.keyword.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.form.keyword.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    onSubmit() {
      this.form.images = [...this.$refs.upload.uploadFiles]
      this.$emit('onSubmit', this.form)
    },
    cancel() {
      this.$router.push({ name: 'products_index' })
    },
    changeStock(val) {
      this.form.product_unit_stocks[val.index] = { ...val }
    },
    addStock() {
      this.form.product_unit_stocks.push({
        id: undefined,
        name: '',
        retail_price: null
      })
    },
    deleteStock(index) {
      this.form.product_unit_stocks.splice(index, 1)
    },
    handleRemove(file) {
      const index = this.$refs.upload.uploadFiles.findIndex(f => f.url === file.url)

      if (!file.raw) {
        this.form.image_deleted.push(this.fileList.find(i => i.url === file.url).id)
      }

      if (index !== -1) {
        this.$refs.upload.uploadFiles.splice(this.$refs.upload.uploadFiles.findIndex(f => f.url === file.url), 1)
      }
    }
  }
}
</script>
<style>
.el-select {
  width: 100%;
}
.input-new-tag {
  width: 20%;
}
</style>

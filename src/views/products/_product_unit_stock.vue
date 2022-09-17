<template>
  <el-card :key="index" class="box-card" style="margin-bottom: 5px">
    <div slot="header" class="clearfix">
      <el-form-item :error="errorField('product_unit_stocks')">
        <span>Loại</span>
      </el-form-item>
      <el-button v-if="index !== 0" style="float: right; padding: 3px 0" type="text" @click="deleteStock">Xoá</el-button>
    </div>
    <div class="text item">
      <el-form :label-position="labelPosition" :model="productStock">
        <el-form-item label="Tên loại (0.5 ~ 1kg)">
          <el-input v-model="productStock.name" placeholder="1kg" />
        </el-form-item>
        <el-form-item label="Giá bán lẻ (VNĐ)">
          <el-input v-model="productStock.retail_price" type="number" placeholder="1 000 000" />
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>
<script>
import { formMixin } from '@/mixin/common'

export default {
  name: 'ProductUnitStock',
  mixins: [formMixin],
  props: {
    stock: {
      type: Object,
      default: () => ({
        id: undefined,
        name: '',
        retail_price: null,
        index: 0
      })
    },
    index: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      productStock: { ...this.stock },
      labelPosition: 'top'
    }
  },
  watch: {
    productStock: {
      handler(v) {
        this.$emit('changeStock', v)
      },
      deep: true
    }
  },
  mounted() {
    this.productStock = { ...this.stock, index: this.index }
  },
  methods: {
    deleteStock() {
      this.$emit('deleteStock', this.index)
    }
  }
}
</script>
<style>
  .el-form .el-form--label-top .el-form-item{
    padding: 0!important;
    margin: 0!important;
  }

  .el-card__body {
    padding: 10px 15px !important ;
  }

  .el-card__header .el-form-item {
    margin-bottom: 0px!important;
  }

  .el-card__header .el-form-item__content {
    margin-bottom: 0px!important;
    margin-left: 0 !important;
    line-height: 15px !important;
    position: relative;
    font-size: 16px;
  }
</style>

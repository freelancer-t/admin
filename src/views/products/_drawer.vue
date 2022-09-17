<template>
  <div>
    <el-drawer
      v-if="Object.keys(product).length"
      :title="product.name"
      :visible.sync="open"
      size="40%"
      direction="rtl"
      @close="close"
    >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <router-link :to="{ name: 'products_edit', params: { id: product.id }}">
            <el-button style="float: right; padding: 3px 0" type="primary" icon="el-icon-edit">Chỉnh sửa</el-button>
          </router-link>
        </div>
        <div class="text item">
          <table>
            <tr>
              <td>Tên</td>
              <td>{{ product.name }}</td>
            </tr>
            <tr>
              <td>Đường dẫn</td>
              <td>{{ product.slug }}</td>
            </tr>
            <tr>
              <td>Từ khoá</td>
              <td>{{ product.keyword }}</td>
            </tr>
            <tr>
              <td>Xuất xứ</td>
              <td>{{ product.origin }}</td>
            </tr>
            <tr>
              <td>Ưu đãi</td>
              <td>{{ product.endow }}</td>
            </tr>
            <tr>
              <td>Danh mục</td>
              <td>{{ product.categories.map(c => c.name).join(', ') }}</td>
            </tr>
            <tr>
              <td>Ghi chú</td>
              <td>{{ product.note }}</td>
            </tr>
            <tr>
              <td>Mô tả ngắn</td>
              <td>{{ product.soft_description }}</td>
            </tr>
            <tr>
              <td>Hot?</td>
              <td>
                <i v-if="product.isHot" class="el-icon-check" />
                <i v-else class="el-icon-close" />
              </td>
            </tr>
            <tr>
              <td>Nội dung</td>
              <td v-html="product.description" />
            </tr>
            <tr>
              <td>Loại</td>
              <td>
                <el-tag v-for="stock in product.product_unit_stocks" :key="stock.id" size="normal" effect="plain">
                  {{ stock.name }} - {{ formatMoney(stock.retail_price) }}
                </el-tag>
              </td>
            </tr>
            <tr>
              <td>Ảnh sản phẩm</td>
              <td>
                <el-carousel :interval="4000" type="card" height="200px">
                  <el-carousel-item v-for="item in product.images" :key="item.id">
                    <h3 class="small">
                      <el-avatar shape="square" :size="200" fit="fit" :src="item.url" />
                    </h3>
                  </el-carousel-item>
                </el-carousel>
              </td>
            </tr>
          </table>
        </div>
      </el-card>
    </el-drawer>
  </div>
</template>
<script>
import { numberWithCommas } from '@/utils/index'

export default {
  name: 'DrawerProduct',
  props: {
    product: {
      type: Object,
      default: () => {}
    },
    drawer: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      open: false
    }
  },
  watch: {
    drawer: function(v) {
      this.open = v
    }
  },
  methods: {
    close() {
      this.$emit('closeDrawer')
    },
    formatMoney: x => numberWithCommas(x)
  }
}
</script>
<style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }

  td {
    padding: 5px;
    border: 1px solid;
  }

  table tr td:first-child{
    width: 150px;
    font-weight: bold;
  }
</style>

<style>
  .el-drawer__body {
    overflow-y: scroll;
  }

  .el-tag--plain {
    margin-right: 5px !important;
  }

  .el-drawer__body {
    padding-top: 5px !important;
  }

  .el-card__body {
    padding: 5px;
  }

  .el-drawer__header {
    margin-bottom: 5px;
  }

  .el-card__header {
    padding: 5px 20px;
  }

  .box-card .el-button--primary {
    padding: 5px !important;
  }
</style>

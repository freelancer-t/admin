<template>
  <div class="app-container">
    <FormProductDiscount
      :product-discount="productDiscount"
      :errors="errors"
      @onSubmit="onSubmit"
    />
  </div>
</template>

<script>
import { loading } from '@/utils/index'
import { fetchProductDiscount, updateProductDiscount } from '@/api/product_discount'
import FormProductDiscount from './form.vue'

export default {
  components: { FormProductDiscount },
  data() {
    return {
      errors: {},
      isLoading: false,
      productDiscount: {}
    }
  },
  mounted() {
    this.fetchProductDiscount()
  },
  methods: {
    async fetchProductDiscount() {
      const load = loading()

      await fetchProductDiscount(this.$route.params.id)
        .then(({ data }) => {
          this.productDiscount = {
            ...data,
            product_ids: data.products.map(p => p.id),
            sale_start: data.sale_start_formated,
            sale_end: data.sale_end_formated
          }
        })
      load.close()
    },
    async onSubmit(data) {
      const load = loading()
      await updateProductDiscount(data.id, data)
        .then(({ message }) => {
          this.$message({
            type: 'success',
            message
          })

          this.$router.push({ name: 'product_discounts_index' })
        })
        .catch(({ response }) => {
          const { status, data } = response

          if (status === 422) {
            this.errors = data.errors
          }
        })

      load.close()
    }
  }
}
</script>

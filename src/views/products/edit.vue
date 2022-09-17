<template>
  <div class="app-container">
    <FormProduct
      :product="product"
      :errors="errors"
      @onSubmit="onSubmit"
    />
  </div>
</template>

<script>
import { updateProduct, fetchProduct } from '@/api/product'
import { loading } from '@/utils/index'
import FormProduct from './form.vue'

export default {
  components: { FormProduct },
  data() {
    return {
      errors: {},
      isLoading: false,
      product: {}
    }
  },
  async mounted() {
    await this.getProduct()
  },
  methods: {
    async onSubmit(data) {
      const formData = new FormData()
      formData.append('_method', 'put')
      for (const key in data) {
        if (key === 'images') {
          data[key].forEach((f, idx) => formData.append(`images[${idx}]`, f.raw ?? f.url))
        } else if (key === 'product_unit_stocks') {
          data[key].forEach((s, idx) => {
            for (const [k, v] of Object.entries(s)) {
              formData.append(`product_unit_stocks[${idx}][${k}]`, v)
            }
          })
        } else {
          formData.append(key, data[key])
        }
      }

      const load = loading()
      await updateProduct(this.product.id, formData)
        .then(({ message }) => {
          this.$message({
            type: 'success',
            message
          })

          this.$router.push({ name: 'products_index' })
        })
        .catch(({ response }) => {
          const { status, data } = response

          if (status === 422) {
            this.errors = data.errors
          }
        })

      load.close()
    },
    async getProduct() {
      const load = loading()
      const id = this.$route.params.id
      const { data } = await fetchProduct(id)
      this.product = { ...data }
      load.close()
    }
  }
}
</script>

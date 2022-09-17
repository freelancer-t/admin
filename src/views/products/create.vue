<template>
  <div class="app-container">
    <FormProduct
      :errors="errors"
      @onSubmit="onSubmit"
    />
  </div>
</template>

<script>
import { createProduct } from '@/api/product'
import { loading } from '@/utils/index'
import FormProduct from './form.vue'

export default {
  components: { FormProduct },
  data() {
    return {
      errors: {},
      isLoading: false
    }
  },
  methods: {
    async onSubmit(data) {
      const formData = new FormData()
      for (const key in data) {
        if (key === 'images') {
          data[key].forEach(f => formData.append('images[]', f.raw))
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
      await createProduct(formData)
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
    }
  }
}
</script>

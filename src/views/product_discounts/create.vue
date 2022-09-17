<template>
  <div class="app-container">
    <FormProductDiscount
      :errors="errors"
      @onSubmit="onSubmit"
    />
  </div>
</template>

<script>
import { loading } from '@/utils/index'
import { createProductDiscount } from '@/api/product_discount'
import FormProductDiscount from './form.vue'

export default {
  components: { FormProductDiscount },
  data() {
    return {
      errors: {},
      isLoading: false
    }
  },
  methods: {
    async onSubmit(data) {
      const load = loading()
      await createProductDiscount(data)
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

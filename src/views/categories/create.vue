<template>
  <div class="app-container">
    <FormCategory
      :category="form"
      :errors="errors"
      @onSubmit="onSubmit"
    />
  </div>
</template>

<script>
import { loading } from '@/utils/index'
import { createCategory } from '@/api/category'
import FormCategory from './form-category.vue'

export default {
  components: { FormCategory },
  data() {
    return {
      form: {
        name: '',
        slug: '',
        order: 0
      },
      errors: {},
      isLoading: false
    }
  },
  methods: {
    async onSubmit(data) {
      const load = loading()
      await createCategory(data)
        .then(({ message }) => {
          this.$message({
            type: 'success',
            message
          })

          this.$router.push({ name: 'category_index' })
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

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
        order: 0,
        icon: null
      },
      errors: {},
      isLoading: false
    }
  },
  methods: {
    async onSubmit(data) {
      const load = loading()
      const formData = new FormData()

      for (const key in data) {
        formData.append(key, key === 'icon' ? data[key].raw : data[key])
      }

      await createCategory(formData)
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

<template>
  <div class="app-container">
    <FormCategory :category="form" :errors="errors" @onSubmit="onSubmit" />
  </div>
</template>

<script>
import { loading } from '@/utils/index'
import { fetchCategory, updateCategory } from '@/api/category'
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
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const load = loading()

      await fetchCategory(this.$route.params.id)
        .then(({ data }) => {
          this.form = { ...data }
        })

      load.close()
    },
    async onSubmit(data) {
      const load = loading()
      await updateCategory(data.id, data)
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

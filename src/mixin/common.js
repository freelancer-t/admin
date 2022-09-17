import { errorSingle } from '@/utils/index'

export const formMixin = {
  props: {
    errors: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      btnLoading: false
    }
  },
  computed: {
    errorForm: function() {
      return this.errors
    }
  },
  methods: {
    errorField(name) {
      return errorSingle(this.errorForm, name)
    }
  }
}

export const pagiMixin = {
  data() {
    return {
      list: [],
      total: 1,
      perPage: 1,
      currentPage: 1
    }
  },
  methods: {
    setPagi({ per_page, total, data, current_page }) {
      this.perPage = per_page
      this.total = total
      this.list = data
      this.currentPage = current_page
    },
    handleCurrentChange(page) {
      this.fetchData(page)
    }
  }
}

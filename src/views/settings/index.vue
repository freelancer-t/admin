<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Sologan header">
        <el-input v-model="form.sologan" type="textarea" />
      </el-form-item>
      <el-form-item label="Link youtube">
        <el-input v-model="form.youtube" />
      </el-form-item>
      <el-form-item label="Link instagram">
        <el-input v-model="form.instagram" />
      </el-form-item>
      <el-form-item label="Link tiktok">
        <el-input v-model="form.tiktok" />
      </el-form-item>
      <el-form-item label="Link zalo">
        <el-input v-model="form.zalo" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Cập nhật</el-button>
        <el-button>Huỷ</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { fetchSetting, updateSetting } from '@/api/setting'
import { loading } from '@/utils/index'

export default {
  data() {
    return {
      form: {
        sologan: '',
        youtube: '',
        tiktok: '',
        instagram: '',
        zalo: ''
      }
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const load = loading()
      const { data } = await fetchSetting()
      this.form = { ...data }
      load.close()
    },
    async onSubmit() {
      const load = loading()
      const { data, message } = await updateSetting(this.form)
      this.$message({
        type: 'success',
        message
      })
      this.form = { ...data }
      load.close()
    }
  }
}
</script>

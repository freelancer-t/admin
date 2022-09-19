<template>
  <div v-if="content.length">
    <el-dialog
      title="Nội dung chi tiết"
      :visible.sync="open"
      width="70%"
      top="5vh"
      center
      @close="$emit('close')"
    >
      <span v-html="content" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="$emit('close')">Đóng</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'DialogContent',
  props: {
    content: {
      type: String,
      default: () => ''
    },
    centerDialogVisible: {
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
    centerDialogVisible: function(v) {
      this.open = v
    }
  }
}
</script>

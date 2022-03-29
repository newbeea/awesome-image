<script lang="ts" setup>
import 'highlight.js/styles/atom-one-dark.css'
import hljs from 'highlight.js'
defineProps({
  code: String,
})
const pre = ref(null)
onMounted(() => {
  hljs.highlightElement(pre.value)
})

const expanded = ref(false)
</script>
<template>
  <div class="highlight">
    <pre v-show="expanded" ref="pre" class="highlight-pre">
    <code>
      {{ code }}
    </code>
  </pre>
    <div class="highlight-btn" @click="expanded = !expanded">
      {{ expanded ? "Hide" : "Expand" }}
    </div>
  </div>
</template>
<style scoped lang="scss">
.highlight-pre {
  overflow: auto;
}
.highlight-btn {
  text-align: center;
  padding: 10px;
  background: #ddd;
  cursor: pointer;
}
.dark {
.highlight-btn {
  text-align: center;
  padding: 10px;
  background: rgb(59, 59, 59);
  cursor: pointer;
}
}
</style>

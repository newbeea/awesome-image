
<script lang="ts">
import type { PropType } from 'vue-demi'
import { computed, defineComponent, onMounted, ref } from 'vue-demi'
interface Mouse {
  x: number
  y: number
}
export default defineComponent({
  props: {
    id: String,
    onImageLoaded: {
      type: Function,
    },
  },
  emits: ['on-image-loaded'],
  setup(props, { emit }) {
    console.log(11, props.onImageLoaded)
    onMounted(() => {
      if (props.id === '2') {
        setTimeout(() => {
          props.onImageLoaded?.(props.id)
          emit('on-image-loaded', props.id)
        }, 100)
      }
      else { props.onImageLoaded?.(props.id) }
    })
    return {
    }
  },
})

</script>

<template>
  <div class="vue-awesome-image-group">
  </div>
</template>
<style lang="scss">
.vue-awesome-image-group {
  .vue-awesome-image {
    position: absolute;
  }
}
</style>

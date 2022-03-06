import type { Ref } from 'vue-demi'
import { onMounted, ref } from 'vue-demi'
export function useLazy(imageRef: Ref<any>, offset: Ref<string>) {
  const loaded = ref(false)
  const image = ref<HTMLImageElement>()
  onMounted(() => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const imageDom = entry.target as any
          // const img = new Image()
          // img.crossOrigin = 'Anonymous'
          // img.srcset = imageDom.dataset.srcset
          // img.onload = () => {
          //   loaded.value = true
          //   imageDom.srcset = img.srcset
          // }
          imageDom.srcset = imageDom.dataset.srcset
          // image.value = img
          imageObserver.unobserve(imageDom)
        }
      })
    }, {
      rootMargin: offset.value,
    })
    imageObserver.observe(imageRef.value)
  })
  return { loaded, image }
}

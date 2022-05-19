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
          imageDom.srcset = imageDom.dataset.srcset
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

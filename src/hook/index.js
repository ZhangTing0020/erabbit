import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export const useLazyData = (apiFn) => {
  const target = ref(null)
  const list = ref([])
  // 数据懒加载，，使用 @vueuse/core 中的 useIntersectionObserver 来实现监听进入可视区域行为
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      apiFn().then((data) => {
        list.value = data.result
      })
      stop()
    }
  })
  return { target, list }
}

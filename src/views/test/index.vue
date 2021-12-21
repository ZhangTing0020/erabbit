<template>
    <div>测试动画</div>
    <hr>
    <button @click="handleClick">按钮</button>
    <transition name="fade">

    <p v-if="isShow">我是一个动画</p>
    </transition>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Test',
  setup () {
    const isShow = ref(false)
    const handleClick = () => {
      isShow.value = !isShow.value
    }
    return { isShow, handleClick }
  }

}
</script>

<style scope lang="less">
.fade-enter-from {
    opacity: 0;
}
.fade-enter-active {
    transition: all 1s;
}
.fade-enter-to {
    opacity: 1;
}

.fade-leave-from {
    opacity: 1;
}
.fade-leave-active {
    transition: all 1s;
}
.fade-leave-to {
    opacity: 0;
}
</style>

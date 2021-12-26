// 将调用一个组件,变成调用一个方法,
// 比如 XtxMessage 组件,调用起来不方便,,将这个组件封装一下,,,改成方法

// 1.需要两个vue3的API createVNode 和render  (创建虚拟节点,让后将这个节点插入到body中,再将这个虚拟节点渲染)

// 实现使用函数调用xtx-message组件的逻辑
import { createVNode, render } from 'vue'
import XtxMessage from './xtx-message.vue'

// 准备dom容器,川江一个DOM元素作为放置message组件的容器
const container = document.createElement('div')
container.setAttribute('class', 'xtx-message-container') // 给这个DOM元素设置一些属性,方便后边设置样式
document.body.appendChild(container)
// 定时器标识
let timer = null

export default ({ type, text }) => {
  // 实现：根据xtx-message.vue渲染消息提示
  // 1. 导入组件
  // 2. 根据组件创建虚拟节点
  // createVNode方法可以基于组件创建一个虚拟节点
  // createVNode参数一表示组件
  // createVNode参数二表示传递给组件的props
  const vnode = createVNode(XtxMessage, { type, text })
  // 3. 准备一个DOM容器
  // 4. 把虚拟节点渲染DOM容器中
  render(vnode, container)
  // 5. 开启定时，移出DOM容器内容
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, container)
  }, 3000)
}

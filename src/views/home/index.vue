<template>
  <div class="active">Home</div>
</template>
<style scoped lang='less'>
// 底层webpack解析路径时要求添加一个波浪线
// @import '~@/styles/variables.less';
// 本来每次都需要手动导入的,但是下了一个webpack的插件,可以自动导入
.active {
  color: @xtxColor;
}
</style>

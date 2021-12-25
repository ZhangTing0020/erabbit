<template>
  <div class="goods-sku">
    <dl v-for="(item,index) in specs" :key="index">
      <dt>{{item.name}}</dt>
      <dd >
        <template v-for="(tag,i) in item.values" :key="i">
        <!-- 通过类来判断,选中了哪个规格   -->
        <!-- 点击事件作用: 排他思想,,,选中的规格加边框,其他的不加 -->
        <img :class="{selected:tag.selected}" :src="tag.picture" alt="" v-if="tag.picture"
        @click="toggle(tag,item.values)">
        <span :class="{selected:tag.selected}"  @click="toggle(tag,item.values)" v-else> {{tag.name}}</span>
        </template>
      </dd>

    </dl>

  </div>
</template>
<script>
import powerSet from '@/vendor/power-set.js'
const spliter = '*'

// 更新页面的禁用状态
// 1.页面首次渲染时触发
// 2.点击规格的时候重新触发
// 控制标签是否被禁用
const updateDisabledStatus = (specs, pathMap) => {
  // 每一种规格都需要重新判断一次
  // item 是 颜色  产地  或者尺寸
  specs.forEach((item, index) => {
    // 获取所有规格选中的值,每一个规格都会调用一次getSelectedValues方法
    const selectValues = getSelectedValues(specs)
    // selectValues是一个数组的形式
    console.log(selectValues)
    // tag是每一个规格具体的选项  比如颜色: 黑色  蓝色
    item.values.forEach(tag => {
      // 判断每一个规格是否可以点击(是否在pathMap中)
      if (tag.selected) { // 如果选中的话,直接return,因为在getSelectedValues方法中,有的规格是没有选中的,所以还需要在这里加判断,该规格选择了直接return ,没选择就给selectValues中加到相应的索引处
        return
      } else { // 没有选中
        selectValues[index] = tag.name
        // console.log(tag.name)
      }
      // 判断选中的值是否在pathMap中
      // filter返回符合条件元素的数组 参数是一个回调函数  符合条件的是true  不符合条件的是false,所以下边的item中,item为true时就是符合条件,为undefined时就是false,不符合条件
      const pathKey = selectValues.filter(item => item).join(spliter)
      // 当只选中蓝色或者黑色的时候,会单独打印出另外一种颜色,,,,为什么???
      console.log(pathKey)
      console.log('--------------------------')
      // 如果pathKey不在pathMap中,应该被禁用
      // pathMap[pathKey]如果有值,就是true,取反就是false ------- tag.disabled=false时就是不禁用
      // 蓝色*中国*20 没有,怎么确定禁用的是哪个按钮呢
      // 但是怎么确定禁用的是哪个按钮呢????????????????
      tag.disabled = !pathMap[pathKey]
    })
  })
}

// 封装一个函数,获得选中的所有规格的值
const getSelectedValues = (specs) => {
  const result = []
  // 循环  这个item    颜色  产地或者尺寸
  specs.forEach((item, index) => {
    // find返回第一个符合条件的元素, 这个tag是颜色中的黑色或蓝色  产地中的 中国或日本
    // specs: Array(3) sepcs中包含三个元素   颜色  产地  尺寸
    //    0:
    //       name: "颜色"
    //       values: Array(2)
    //        0: {name: '黑色', picture: 'http://47-cdee294568a1.png', desc: '', disabled: false}
    //        1: {name: '蓝色', picture: 'http://y.aliyuncs.…21-04-0', desc: '', disabled: false}
    const tag = item.values.find(tag => {
      // 选中了一个产品规格之后,就会给这个产品规格的里边的元素加上selected属性,,,属性值是true或者false
      // console.log(tag, tag.selected)
      return tag.selected
    })
    if (tag) {
      result[index] = tag.name
    } else {
      result[index] = undefined
    }
  })
  // console.log('----------------------')
  // console.log(result)
  // 从这return的数组,是每选中一个规格之后,就会返回一个result,,,因为 specs.forEach虽然会遍历整个规格,选中一个规格之后,,,后边的规格可能没有选,,,也是会遍历的,所以会产生['蓝色', undefined, undefined]这种情况,,,所以在调用getSelectedValues方法的地方,还是需要判断
  return result
}

// 封装一个函数，根据skus所有的数据生成路径字典
const usePathMap = (skus) => {
  // 定义一个空对象,来接收计算得到的路径字典
  const pathMap = {}
  // 获取后端传过来的有效的skus数据,也就是每一个元素的inventory的值不为0,,,这个属性是库存
  skus.forEach((item) => {
    if (item.inventory === 0) return
    // 如果不为0的话,就拿到这个数组中specs中的所有键值
    const skuSpec = item.specs.map(tag => {
      return tag.valueName
    })
    // 拿到有效数据中的所有子集,skuSet,,也就是生成笛卡尔集
    // skuSpec = ['蓝色', '中国', '10cm']
    const skuSet = powerSet(skuSpec)
    // console.log(skuSet)
    // 根据生成的所有的子集,来生成数据字(路径字典) 因为所有的自己中,都有空集合,,,所以要把空集合排除掉
    skuSet.forEach(spec => {
      // skuSet是一个二维数组,它里边的每一个元素都是一个数组,所以要拿长度来判断
      if (spec.length === 0) return
      // 数据字典是一个对象,现在就要给这个对象中添加属性,这个属性就是笛卡尔集中的每一个元素
      // 生成的笛卡尔集是一个二维数组..每一个元素都是一个一维数组,,,将一维数组中的元素用*连接起来
      // 将用*连接起来的字符串,作为数据字典的键名
      const mapKey = spec.join(spliter)
      // console.log(mapKey)
      if (pathMap[mapKey]) {
        // console.log(pathMap[mapKey])
        pathMap[mapKey].push(item.id)
      } else {
        // 这里要给数据字典里的键值,放数组类型的,因为一个键名后边可能会有多个id值,,,后边会根据这个id值
        // 来判断价格,所以要用数组的方式来接收,,,如果数组中已经有这个键名了,就直接给数组中push即可
        // mapKey是动态生成的,所以要用[] 来给对象中添加一个属性,,,这个时候就不能用. 来直接添加了
        pathMap[mapKey] = [item.id]
      }
    })
  })
  return pathMap
}

// 父组件传过来一个skuId,,,要根据这个skuId来渲染选中的规格
const initSkuIdSelected = (skuId, specs, skus) => {
  // 先找到这个skuId对应的skus[].id
  // skus.forEach(item => {
  //   if (item.id === skuId) {
  //     // 找到了就把这个元素下的specs数组拿出来,然后取出其中的valueName 并且拼接一下 name和valueName
  //   }
  // }) 用forEach查找的话,效率不高,即便找到了,还是要遍历全部数组,所以采用find方法
  const target = skus.find(item => item.id === skuId).specs
  // specs 也就是target是一个数组,里边包含着规格对应的值
  //   specs: Array(3) 这个specs是skus下的一个元素
  // 0: {name: '颜色', valueName: '蓝色'}
  // 1: {name: '产地', valueName: '中国'}
  // 2: {name: '尺寸', valueName: '10cm'}
  // 因为在购物车中要用到拼接后的值,例如:   颜色:蓝色,产地:中国,尺寸:10cm

  // 这里的spec指的是后台返回的所有规格数据
  // item指的是每一种规格 item.name  颜色  产地  尺寸
  //   specs: Array(3)
  // 0: {name: '颜色', values: Array(2)}  这里每个数组下边还包含了数组,,,specs是二维数组
  //   name: "颜色"
  //   values: Array(2)
  //    0: {name: '黑色', picture: 'http://yjy-xiao94568a1.png', desc: '', disabled: false}
  //    1: {name: '蓝色', picture: 'http://yjy-xiaotuxian-dev.
  // 1: {name: '产地', values: Array(2)}
  // 2: {name: '尺寸', values: Array(3)}
  specs.forEach(item => {
    // target是skuId对应的规格数组数据    颜色:蓝色,产地:中国,尺寸:10cm
    const currentSpec = target.find(tag => tag.name === item.name)
    item.values.forEach(tag => {
      if (tag.name === currentSpec.valueName) {
        tag.selected = true
      }
    })
  })
}
export default {
  name: 'GoodsSku',
  props: {
    skuId: {
      type: String,
      required: true
    },
    specs: {
      type: Array,
      default: () => []
    },
    skus: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const pathMap = usePathMap(props.skus)

    // 组件初始化的时候，判断skuId是否存在，如果存在就控制选中
    if (props.skuId) {
      initSkuIdSelected(props.skuId, props.specs, props.skus)
    }

    // 页面首次渲染时触发
    updateDisabledStatus(props.specs, pathMap)
    // 控制规格的选中与取消
    // tag是当前选中的规格,,将当前选中的规格取反,,,其他规格都不选中
    // list是所有的specs.values
    const toggle = (tag, list) => {
      // 遍历数组,,,将所有的都不加选中状态
      // 当选中一个之后,,,再点击一下,要达到取消的效果,,,这里给所有的元素都置为false了,,,也就是给tag.selected
      // 取反就是true,,,所以这里要排除一下当前选中的规格,,然后再给当前选中的规格取反
      list.forEach((item) => {
        // 这是给specs.values里边嘚每一个元素,加上一个属性selected
        // 排除当前选中的规格
        if (item !== tag) {
          item.selected = false
        }
      })
      tag.selected = !tag.selected

      // const ret = getSelectedValues(props.specs)
      // console.log(ret)
      updateDisabledStatus(props.specs, pathMap)
    }

    return { toggle }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>

<template>
  <div class="page">
    <div class="page-header">
      <app-header :pageTitle="$route.query.title"></app-header>
    </div>
    <div class="page-container top96">
      <div class="md-example-child md-example-child-cell-item md-example-child-cell-item-2">
        <md-field>
          <md-cell-item title="交通银行(尾号3089)" brief="展示摘要描述" />
          <md-cell-item title="招商银行(尾号2342)" brief="展示摘要描述">
            <md-switch v-model="open" slot="right" />
          </md-cell-item>
          <md-cell-item title="交通银行(尾号3089)" brief="展示摘要描述" addon="附加文案" arrow />
          <md-cell-item title="交通银行" brief="展示摘要描述" addon="附加文案" arrow>
            <span class="holder" slot="left"></span>
          </md-cell-item>
          <md-cell-item title="招商银行" brief="展示摘要描述" addon="禁用的项目" disabled arrow>
            <span class="holder" slot="left"></span>
          </md-cell-item>
          <md-cell-item title="Mand Mobile" brief="A mobile UI toolkit" arrow>
            <p slot="children" style="font-size:0.24rem;color:#858B9C;">
              面向金融场景的Vue移动端UI组件库，丰富、灵活、实用，快速搭建优质的金融类产品，让复杂的金融场景变简单。基于「合理、好用」设计价值观，从交互操作、视觉抽象、图形可视等角度共同解决问题。
            </p>
          </md-cell-item>
        </md-field>
      </div>
    </div>
    <welcome></welcome>
  </div>
</template>

<script>
import {Field, CellItem, Switch} from 'mand-mobile'
import welcome from '@/components/welcome'
export default {
  name: 'home',
  components: {
    welcome,
    [Field.name]: Field,
    [CellItem.name]: CellItem,
    [Switch.name]: Switch,
  },
  data() {
    return {
      open: false
    }
  },
  mounted() {
    setTimeout(()=>{
      this.$toast.info('愉快的使用GUI构建您的项目')
    },6000)
  }
}
</script>
<style lang="scss" scoped>
  .page{

  }
</style>

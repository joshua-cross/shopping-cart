<template>
  <div>
    <app-cart></app-cart>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Cart from './components/Cart';
export default {
  components: {
    appCart: Cart
  }
}
</script>

<style lang="scss">

* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

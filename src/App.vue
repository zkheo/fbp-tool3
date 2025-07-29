<template>
  <Layout/>
</template>

<script>
import Layout from './layout/Layout.vue'

export default {
  name: 'App',
  components: {
      Layout
  }
}
</script>

<style>
body {
    margin: 0px;
    padding: 0px;
    height: 100vh;
    background-color: #f9fafb;
    //background-image: linear-gradient(120deg, #1c1f2b, #171924);
}
#app{
    height: 100%;
    display: flex;
}
</style>

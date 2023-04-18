<template>
  <div id="app">
    <Header />
      <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Home from './pages/Home.vue'
import Register from './pages/Register.vue'
import Login from './pages/Login.vue'
import ChangePass from '../src/components/ChangePass.vue'
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
*{
  margin: 0px;
  padding: 0px;
}
</style>

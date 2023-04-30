<template>
  <div id="app">
    <Header />
      <router-view></router-view>
    <Footer />
  </div>
</template>

<script>

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { mapActions } from 'vuex';
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  methods: {
    ...mapActions(['checkLogin']),
  },

  created() {
    this.checkLogin();
  }
}
</script>

<style>
*{
  margin: 0px;
  padding: 0px;
}
</style>

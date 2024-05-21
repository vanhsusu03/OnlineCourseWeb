<template>
  <!-- <div v-if="loading">
    <Loading ></Loading>
  </div> -->
  <div id="app">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Loading from './pages/Loading.vue';
import { mapActions } from 'vuex';
export default {
  name: 'App',
  components: {
    Header,
    Footer,
    // Loading,
  },
  data() {
    return {
      loading: true,
    }
  },
  methods: {
    ...mapActions(['checkLogin']),
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  created() {
    this.checkLogin();
  }
}
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}
</style>

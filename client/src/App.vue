<template>
<ChangePass/>
<Home/>
</template>

<script>
import Home from './pages/Home.vue'
import Register from './pages/Register.vue'
import Login from './pages/Login.vue'
import ChangePass from '../src/components/ChangePass.vue'

export default {
  name: 'App',
  components: {
    Home,
    Register,
    Login,
    ChangePass
  }
}
</script>

<style>
*{
  margin: 0px;
  padding: 0px;
}
</style>

<template>
  <div class="main-layout">
    <MainHeader />
    <router-view />
  </div>
</template>

<script>
import MainHeader from './Header.vue'
export default {
  name: 'MainLayout',
  components: {
    MainHeader
  }
}
</script>
<template>
  <div class="main-layout">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
}
</script>

<style>
.main-layout {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  height: 100%;
}
</style>

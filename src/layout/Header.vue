<template>
  <div class="main-header">
    <span>Make your plan to make your day productive</span>
    <div>
      <button @click="navigateToPage('/tasks')">Tasks</button>
      <button @click="navigateToPage('/members')">Members</button>
      <button @click="navigateToPage('/')">Home</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods:{
    navigateToPage(path){
      this.$router.push(path)
    },
  }
}
</script>

<style scoped>
.main-header {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid transparent;
  border-radius: 0.6rem;
  background-color: rgb(20, 171, 65);
  color: white;
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

.main-header button {
  border: none;
  background-color: transparent;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  color: #fff;
}
</style>
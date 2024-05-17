<template>
  <div class="main-body">
    <div class="login-form">
      <h2>Login</h2>
      <input 
        v-model="email" 
        type="email" 
        name="email" 
        placeholder="User Email"
      >
      <input
        v-model="password"
        type="password" 
        name="password" 
        placeholder="User Password"
      >
      <div class="save-login">
        <input
          v-model="isSaved"
          type="checkbox" 
          name="checkbox" 
          id="checkbox"
        >
        <label for="save-login">Save Login</label>
      </div>
      <div class="line-text">
        <span>Or continue with</span>
        <span class="line"></span>
      </div>
      <div class="login-social">
        <div class="image-wrapper">
          <img src="../../assets/google.png" alt="google">
        </div>
        <div class="image-wrapper">
          <img src="../../assets/facebook.png" alt="facebook">
        </div>
        <div class="image-wrapper">
          <img src="../../assets/apple.png" alt="apple">
        </div>
      </div>
      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login page',
  data() {
    return {
      email: '',
      password: '',
      isSaved: false,
    }
  },
  methods: {
    login() {
      console.log(this.email, this.password, this.isSaved);
      if(!this.isSaved) {
        this.$store.commit('setTokenForNow', true);
      }else{
        this.$store.dispatch('loginAction', this.isSaved)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-body {
  justify-content: center;
  align-items: center;
  background-color: #F7F7F7 !important;

  .login-form {
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    padding: 3.2rem 2.3rem;
    gap: 1rem;
    box-sizing: border-box;
    border-radius: 0.6rem;

    input {
      width: 100%;
      padding: 1rem 0.8rem;
      box-sizing: border-box;
      outline: none;
      font-size: 1rem;
      border-radius: 0.6rem;
      border: 1px solid #e6e6e6
    }

    .save-login {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 0.5rem;

      input[type="checkbox"] {
        width: 1rem;
        height: 1rem;
        margin: 0;
      }
    }

    .line-text {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .line {
        width: 60%;
        height: 1px;
        background-color: #e6e6e6;
      }
    }

    .login-social {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;

      .image-wrapper {
        width: 150px;
        height: 67px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #F7F7F7;
        border-radius: 0.4rem;
        cursor: pointer;

        img {
          background-color: transparent;
          ;
          object-fit: fill;
          width: 2rem;
          height: 2rem;
        }
      }
    }

    button {
      width: 70%;
      border: none;
      background-color: #14ab41;
      color: #fff;
      padding: 1rem 0;
      border-radius: 0.6rem;
      margin-top: 1rem;
      cursor: pointer;
      font-size: 1rem;
      line-height: 1.2rem;
      font-weight: 600;
      font-family: 'Poppins', sans-serif;
    }
  }
}
</style>
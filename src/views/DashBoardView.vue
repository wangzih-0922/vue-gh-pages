<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <router-link to="/admin" class="navbar-brand">後台</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">回到前台</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/products" class="nav-link">產品列表</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/orders" class="nav-link">訂單</router-link>
        </li>
        <li class="nav-item ">
          <a href="#" @click.prevent="signOut" class="nav-link">登出</a>
        </li>
      </ul>
    </div>
  </div>
  </nav>
  <div class="container">
    <router-view v-if="checkSuccess"></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkSuccess: 'false'
    }
  },
  methods: {
    checkAdmin () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)myCookie\s*=\s*([^;]*).*$)|^.*$/, '$1')
      if (token) {
        this.$http.defaults.headers.common.Authorization = `${token}`
        this.$http.post(`${process.env.VUE_APP_API}/api/user/check`, { api_token: this.token })
          .then((res) => {
            this.checkSuccess = true
            console.log(this.checkSuccess)
          })
          .catch((error) => {
            console.log(error)
            alert('登入驗證失敗，請重新登入')
            this.$router.push('/login')
          })
      } else {
        alert('您尚未登入。')
        this.$router.push('/login')
      }
    },
    signOut () {
      document.cookie = 'hexToken=;expires=;'
      alert('已登出')
      this.$router.push('/login')
    }
  },
  mounted () {
    this.checkAdmin()
  }
}
</script>

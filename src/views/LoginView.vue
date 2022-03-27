<template>
  <div class="container">
    <div class="row justify-content-center">
      <h2 class="my-5 text-center">登入</h2>
      <div class="col-3">
        <form>
          <div class="mb-3">
            <label for="inputEmail1" class="form-label">電子信箱</label>
            <input type="email" class="form-control" id="inputEmail1" aria-describedby="emailHelp" v-model="user.username" placeholder="name@example.com" autofocus required>
          </div>
          <div class="mb-3">
            <label for="inputPassword1" class="form-label">密碼</label>
            <input type="password" class="form-control" id="inputPassword1" v-model="user.password">
          </div>
          <div class="w-100 mx-auto">
            <button type="button" class="btn btn-primary w-100" @click="signIn">登入</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signIn () {
      this.$http.post(`${process.env.VUE_APP_API}/admin/signin`, this.user)
        .then((res) => {
          console.log(res)
          const { expired, token } = res.data
          document.cookie = `myCookie=${token}; expires= ${new Date(expired)};`
          this.$router.push('/admin/products')
        })
        .catch((error) => {
          console.log(error)
          alert('登入失敗')
        })
    }
  }
}
</script>

<template>
  <div class="container">
    <h2 class="text-center mt-3">商品列表</h2>
    <LoadingOverlay :active="isLoading"></LoadingOverlay>
    <div class="row row-cols-1 row-cols-lg-4 g-3">
        <div class="col" v-for="item in productsData" :key="item.id">
            <div class="card h-100">
                <img :src="item.imageUrl" class="card-img-top" alt="...">
                <div class="card-body">
                   <router-link class="h5 card-title link-dark" :to="`/product/${item.id}`">{{ item.title }}</router-link>
                   <p class="card-text">{{item.description}}</p>
                   <button class="btn btn-primary" @click="addCart(item.id)" :disabled="isLoadingItem === item.id">加入購物車
                     <span class="spinner-border spinner-border-sm" v-show="isLoadingItem === item.id"></span>
                   </button>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      productsData: [],
      isLoadingItem: '',
      isLoading: false
    }
  },
  methods: {
    getProducts () {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          this.productsData = res.data.products
          this.isLoading = false
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addCart (id, qty = 1) {
      this.isLoadingItem = id
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, {
        data: {
          product_id: id,
          qty
        }
      })
        .then((res) => {
          console.log(res)
          alert(res.data.message)
          this.isLoadingItem = ''
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>

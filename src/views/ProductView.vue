<template>
  <div class="container" style="width: 1000px">
    <h2 class="text-center my-3">{{product.title}}</h2>
    <img :src="product.imageUrl" alt="" class="img-fluid d-block mx-auto" >
    <div class="content my-4">
      <p class="fs-4">{{product.description}}</p>
      <p class="text-muted">{{product.content}}</p>
      <p class="text-decoration-line-through">原價：{{product.origin_price}} 元</p>
      <p class="h4">現在只要 <span class="fst-italic">{{product.price}}</span> 元</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: []
    }
  },
  methods: {
    getProduct () {
      const { id } = this.$route.params
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then((res) => {
          console.log(res)
          this.product = res.data.product
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>

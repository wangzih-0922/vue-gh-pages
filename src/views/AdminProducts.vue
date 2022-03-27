<template>
  <div class="container">
    <h2 class="text-center my-3">後台產品列表</h2>
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal('new')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">
            分類
          </th>
          <th>產品名稱</th>
          <th width="120">
            原價
          </th>
          <th width="120">
            售價
          </th>
          <th width="100">
            是否啟用
          </th>
          <th width="120">
            編輯
          </th>
        </tr>
      </thead>
      <template v-for="item in products" :key="item.id">
        <tbody>
          <tr>
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td class="text-end">{{ item.origin_price }}</td>
            <td class="text-end">{{ item.price }}</td>
            <td>
              <span class="text-success" v-if="item.is_enabled">啟用</span>
              <span v-else class="text-danger">未啟用</span>
            </td>
            <td>
              <div class=" btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal('edit', item)">
                  編輯
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm" @click="delProduct(item.id)">
                    刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </table>
    <pagination :pages="pagination" @page-change='getProducts'></pagination>
  </div>
  <!-- modal -->
  <product-modal ref="productModal" :item-product="tempProduct" @update-product="getProducts" :is-new="isNew"></product-modal>
</template>

<script>
import pagination from '@/components/PageNation.vue'
import productModal from '@/components/ProductModal.vue'

export default {
  components: {
    pagination, productModal
  },
  data () {
    return {
      products: [],
      pagination: [],
      productModal: '',
      isNew: false,
      tempProduct: {
        imagesUrl: []
      }
    }
  },
  methods: {
    getProducts (item = 1) {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${item}`)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
        .catch((error) => {
          console.log(error)
        })
    },
    openModal (status, item) {
      if (status === 'new') {
        this.tempProduct = {
          imagesUrl: []
        }
        this.isNew = true
      } else if (status === 'edit') {
        this.tempProduct = { imgesUrl: [], ...item }
        this.isNew = false
      }
      this.$refs.productModal.openModal()
    },
    delProduct (id) {
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${id}`)
        .then((res) => {
          console.log(res)
          alert('此產品已成功刪除')
          this.getProducts()
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

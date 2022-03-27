<template>
  <h2 class="text-center mt-3">購物車列表</h2>
    <div class="container">
      <LoadingOverlay :active="isLoading"></LoadingOverlay>
      <div class="mt-4">
<!-- 購物車列表 -->
        <div class="text-end">
          <button class="btn btn-outline-danger" type="button" @click="delAllCart" :disabled="cartData.carts.length === 0">清空購物車</button>
        </div>
        <table class="table align-middle">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th style="width: 150px">數量/單位</th>
              <th>單價</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="cartData.carts">
              <tr v-for="item in cartData.carts" :key="item.id">
                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm" @click="delCartItem(item.id)">x</button>
                </td>
                <td>
                  {{ item.product.title }}
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <div class="input-group mb-3">
                      <select class="form-select" v-model="item.qty" @change="updatedproduct(item)" :disabled="isLoadingItem === item.id">
                        <option :value="num" v-for="num in 20" :key="`${num}-${item.id}`">{{num}}
                        </option>
                      </select>
                      <span class="input-group-text" id="basic-addon2">
                        {{item.product.unit}}
                      </span>
                    </div>
                  </div>
                </td>
                <td class="text-end">
                  {{item.total}}
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ cartData.total }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <!-- 表單 -->
      <div class="my-5 row justify-content-center">
        <MyForm ref="form" class="col-md-6" v-slot="{ errors }" @submit="submit">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <MyField id="email" name="email" type="email" class="form-control" :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" rules="email|required" v-model="user.email">
            </MyField>
            <error-message name="email" class="invalid-feedback"></error-message>
          </div>
        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <MyField id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }" placeholder="請輸入姓名" rules="required" v-model="user.name"></MyField>
          <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <MyField id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }" placeholder="請輸入電話" rules="min:8|max:10|required" v-model="user.tel"></MyField>
          <error-message name="電話" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <MyField id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }" placeholder="請輸入地址" rules="required" v-model="user.address"></MyField>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea id="message" class="form-control" cols="30" rows="10" v-model="message"></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger" :disabled="cartData.carts.length === 0">送出訂單</button>
        </div>
        </MyForm>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      productData: [],
      id: '',
      cartData: {
        carts: []
      },
      isLoadingItem: '',
      isLoading: false,
      user: {
        name: '',
        email: '',
        tel: '',
        address: ''
      },
      message: ''
    }
  },
  methods: {
    getCartList () {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data
          this.isLoading = false
        })
        .catch((error) => {
          console.log(error)
        })
    },
    delAllCart () {
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`)
        .then((res) => {
          alert('已刪除全部購物車')
          this.getCartList()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    delCartItem (id) {
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`)
        .then((res) => {
          alert('已刪除此商品')
          this.getCartList()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updatedproduct (item) {
      this.isLoadingItem = item.id
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`, {
        data: {
          product_id: item.id,
          qty: item.qty
        }
      })
        .then((res) => {
          alert('購物車已更新')
          this.getCartList()
          this.isLoadingItem = ''
        })
        .catch((error) => {
          console.log(error)
        })
    },
    submit () {
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`, {
        data: {
          user: this.user,
          message: this.message
        }
      })
        .then((res) => {
          alert(res.data.message)
          this.getCartList()
          this.$refs.form.resetForm()
          this.message = ''
        })
        .catch((error) => {
          console.log(error)
          alert(error.data.message)
        })
    }
  },
  mounted () {
    this.getCartList()
  }
}
</script>

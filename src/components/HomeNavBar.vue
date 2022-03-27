<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand">傢俱店</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">首頁</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/products" class="nav-link">商品</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/cart" class="nav-link">購物車</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">登入後台</router-link>
        </li>
      </ul>
    </div>
  </div>
  </nav>
</template>

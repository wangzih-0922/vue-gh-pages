<template>
  <HomeNavBar></HomeNavBar>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import HomeNavBar from '@/components/HomeNavBar.vue'
export default {
  components: {
    HomeNavBar
  }
}
</script>

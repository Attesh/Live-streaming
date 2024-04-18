// App.vue
<template>
    <router-view />
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'App',
  setup() {
    const isLoggedIn = ref(false)
    return {
      isLoggedIn
    }
  }
}
</script>

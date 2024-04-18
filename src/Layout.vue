<template>
  <div>
    <!-- Your layout content, such as header and navigation -->
    <header>
      <router-link to="/login">Login</router-link>
    <router-link to="/register">Register</router-link>
    </header>
    
    <!-- Router view to display page components -->
    <router-view></router-view>

    <!-- Your layout content, such as footer -->
    <footer>
      <!-- Footer content here -->
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Layout',
};
</script>

<style>
/* Add CSS styles for your layout here */
</style>

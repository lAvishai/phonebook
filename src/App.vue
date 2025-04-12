<template>
  <div id="app" dir="rtl">
    <nav class="navbar">
      <router-link to="/">
        <i class="fas fa-home"></i>
      </router-link>
      <div class="user-info">
        <span>שלום, אורלי</span>
        <i class="fas fa-user-circle profile-icon"></i>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  background-color: #f5f7fa;
}

.navbar {
  background-color: #3b5998;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.profile-icon {
  font-size: 2rem;
}

a {
  color: white;
  text-decoration: none;
}
</style> 
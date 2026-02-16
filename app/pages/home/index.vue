@ -0,0 +1,69 @@
<template>
  <div>
    <header class="header">
      <h1 class="logo">MyApp</h1>

      <button class="logout" @click="logout">
        Logout
      </button>
    </header>

    
    <main class="content">
      <p>Home page content (coming soon)</p>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  
  localStorage.removeItem('token')


  router.push('/login')
}
</script>

<style scoped>
.header {
  height: 64px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 50px;
  font-weight: 700;
  color: #9e47b7;
}

.logout {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background: #ef4444;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.logout:hover {
  background: #9f0505;
}

.content {
  padding: 24px;
  color: #6b7280;
}
</style>
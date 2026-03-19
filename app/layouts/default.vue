<template>
  <div>
    <header class="header">
      <h1 class="logo" >Contact Management</h1>
      <button class="logout" @click="logout">Logout</button>
    </header>

    <main class="content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'


import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const auth = useAuth()



const logout = () => {
 
  auth.logout?.() 
  localStorage.removeItem('token') 
  sessionStorage.removeItem('token') 

  
  router.push('/login')
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  border-bottom: 1px solid #ddd;
  background: white;
  font-family: 'Inter', sans-serif;
}

.logo {
  font-size: 40px;
  color: #8e44ad;
  cursor: pointer;
  font-weight: bold;
}

.logout {
  background: #ff4d4f;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
}

.content {
  padding: 20px 32px;
}
</style>
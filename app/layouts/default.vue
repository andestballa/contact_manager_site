<template>
  <div>
    <header class="header">
      <h1 class="logo" @click="goHome">Contact Management</h1>
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

const goHome = () => {
  router.push('/')
}


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
  padding: 24px 40px;
  border-bottom: 1px solid #ddd;
  background: white;
  font-family: 'Inter', sans-serif;
}

.logo {
  font-size: 32px;
  color: #8e44ad;
  cursor: pointer;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
}

.logout {
   background: #ef4444;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
  margin-left: 20px;
  font-family: 'Inter', sans-serif;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', sans-serif;
}

.logout:hover {
  background: #dc2626;
}
</style>
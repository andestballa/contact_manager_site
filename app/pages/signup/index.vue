<template>
  <div class="page">
    <div class="card">
      <h1>Create Account</h1>
      <p class="subtitle">Sign up to get started</p>

      <form @submit.prevent="submit">
        <div class="field">
          <label>Email</label>
          <input type="email" v-model="form.email" placeholder="you@example.com" required />
        </div>

        <div class="field">
          <label>Password</label>
           <input type="password" v-model="form.password" placeholder="••••••••" required />
        </div>

        <button type="submit">Sign up</button>
      </form>

      <p class="footer">
        Already have an account?
        <NuxtLink to="/login">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth' 

const router = useRouter()
const { signup } = useAuth()

const form = reactive({
  email: '',
  password: ''
})

const submit = async () => {
  try {
    await signup(form.email, form.password)
    router.push('/')
  } catch (err: any) {
    console.error(err)
    alert(err?.data?.error || 'Signup failed')
  }
}
</script>

<script lang="ts">
definePageMeta({
  layout: 'auth'
})
</script>


<style scoped>
.page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fdfdfd;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  background: rgb(255, 255, 255);
  width: 100%;
  max-width: 360px;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  font-family: 'Inter', sans-serif;
}

h1 {
  margin: 0;
  text-align: center;
  font-family: 'Inter', sans-serif;
}

.subtitle {
  text-align: center;
  color: #6b7280;
  margin-bottom: 24px;
  font-family: 'Inter', sans-serif;
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

label {
  font-size: 14px;
  margin-bottom: 6px;
  color: #374151;
}

input {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  outline: none;
  transition: 0.2s;
}

input:focus {
  border-color: #9b9ba0;
}

button {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: none;
  background: #946b44;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  background: #a57c58;
}

.footer {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
}

.footer a {
  color: #ff0000;
  font-weight: 500;
}
</style>
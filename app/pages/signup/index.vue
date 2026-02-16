<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

// 🔑 connect to auth composable
const { signup } = useAuth()
const router = useRouter()

// form state
const form = reactive({
  email: '',
  password: ''
})

// submit handler
const submit = async () => {
  try {
    await signup(form.email, form.password)
    router.push('/home')
  } catch (err: any) {
    console.error(err)
    alert(err?.data?.error || 'Signup failed')
  }
}
</script>

<template>
  <div class="page">
    <div class="card">
      <h1>Create Account</h1>
      <p class="subtitle">Sign up to get started</p>

      <form @submit.prevent="submit">
        <div class="field">
          <label>Email</label>
          <input
            type="email"
            v-model="form.email"
            required
            autocomplete="email"
          />
        </div>

        <div class="field">
          <label>Password</label>
          <input
            type="password"
            v-model="form.password"
            required
            autocomplete="new-password"
          />
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

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #aa9684;
}

.card {
  width: 360px;
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.subtitle {
  text-align: center;
  color: #6b7280;
  margin-bottom: 24px;
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

label {
  margin-bottom: 6px;
  font-weight: 500;
}

input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
}

button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: #c79f6e;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}

.footer {
  margin-top: 20px;
  text-align: center;
}
</style>

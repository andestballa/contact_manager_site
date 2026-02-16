<template>
  <div class="page">
    <div class="card">
      <h1>Welcome </h1>
      <p class="subtitle">Please login to your account</p>

      <form @submit.prevent="submit">
        <div class="field">
          <label>Email</label>
          <input type="email" v-model="form.email" placeholder="you@example.com" required />
        </div>

        <div class="field">
          <label>Password</label>
          <input type="password" v-model="form.password" placeholder="••••••••" required />
        </div>

        <button type="submit">Login</button>
      </form>

      <p class="footer">
        Don't have an account?
        <NuxtLink to="/signup">Register</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">

const auth = useAuth()

const form = reactive({
  email: '',
  password: ''
})

const submit = async () => {
  try {
    const response = await auth.login(form.email, form.password)

    console.log('Login success', response)
    navigateTo("/home")
  } catch (err) {
    console.error('Login failed', err)
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(135deg, #afafb0, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  background: rgb(255, 255, 255);
  width: 360px;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

h1 {
  margin: 0;
  text-align: center;
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
  background: #8963f1;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  background: #5000fe;
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

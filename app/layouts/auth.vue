<template>
  <div class="auth-layout">
    <main class="auth-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.auth-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
  font-family: 'Inter', sans-serif;
}

.auth-content {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
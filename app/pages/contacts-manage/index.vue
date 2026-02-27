<template>
  <div class="manage-page">
    <header class="header">
      <div class="header-content">
        <h1 class="logo" @click="router.push('/home')">MyApp</h1>
        <button class="btn-back" @click="router.push('/home')">
          <span>←</span> Kthehu te Lista
        </button>
      </div>
    </header>

    <main class="main-content">
      <div class="form-card">
        <div class="form-header">
          <h2>{{ isEditMode ? 'Edito Kontaktin' : 'Shto Kontakt të Ri' }}</h2>
          <p>Plotësoni të dhënat për të {{ isEditMode ? 'përditësuar' : 'krijuar' }} kontaktin.</p>
        </div>
        
        <form @submit.prevent="handleSubmit" class="contact-form">
          <div class="form-grid">
            <div class="field">
              <label>Emri</label>
              <input v-model="form.name" type="text" placeholder="Emri" required />
            </div>

            <div class="field">
              <label>Mbiemri</label>
              <input v-model="form.surname" type="text" placeholder="Mbiemri" required />
            </div>
          </div>

          <div class="field">
            <label>Email</label>
            <input v-model="form.email" type="email" placeholder="email@shembull.com" required />
          </div>

          <div class="field">
            <label>Telefon</label>
            <input v-model="form.phone_number" type="text" placeholder="06X XXX XXXX" required />
          </div>

          <div class="form-actions">
            <button type="button" class="btn-cancel" @click="router.push('/home')">Anulo</button>
            <button type="submit" class="btn-submit" :disabled="submitting">
              {{ submitting ? 'Duke u ruajtur...' : (isEditMode ? 'Përditëso' : 'Ruaj Kontaktin') }}
            </button>
          </div>
          
          <div v-if="serverError" class="error-banner">
            {{ serverError }}
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useContacts } from '~/composables/useContacts'

const router = useRouter()
const route = useRoute()
const { createContact, getContactById, updateContact } = useContacts()

const contactId = route.query.id ? Number(route.query.id) : null
const isEditMode = computed(() => !!contactId)

const submitting = ref(false)
const serverError = ref<string | null>(null)

const form = reactive({
  name: "",
  surname: "",
  email: "",
  phone_number: "",
})

onMounted(async () => {
  if (isEditMode.value && contactId) {
    try {
      const data = await getContactById(contactId)
      form.name = data.name
      form.surname = data.surname
      form.email = data.email
      form.phone_number = data.phone_number
    } catch (e) {
      serverError.value = "Nuk u gjet ky kontakt."
    }
  }
})

const handleSubmit = async () => {
  submitting.value = true
  serverError.value = null
  
  try {
    if (isEditMode.value && contactId) {
      // 1. Thirr API për përditësim
      await updateContact(contactId, { ...form })
    } else {
      // 2. Thirr API për krijim
      await createContact({ ...form })
    }
    
    // 3. Pas suksesit (Add ose Edit), kthehu menjëherë te Home
    router.push('/home') 
    
  } catch (e: any) {
    serverError.value = "Dështoi ruajtja e kontaktit. Provoni përsëri."
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.manage-page {
  min-height: 100vh;
  background-color: #f9fafb;
  font-family: 'Inter', sans-serif;
}

.header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 1.5rem;
  height: 70px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-content {
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  color: #9e47b7;
  cursor: pointer;
}

.btn-back {
  background: transparent;
  border: 1px solid #d1d5db;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.main-content {
  padding: 3rem 1rem;
  display: flex;
  justify-content: center;
}

.form-card {
  background: white;
  width: 100%;
  max-width: 550px;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.form-header h2 {
  font-size: 1.75rem;
  color: #111827;
  margin-bottom: 0.5rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

input {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #9e47b7;
  box-shadow: 0 0 0 4px rgba(158, 71, 183, 0.1);
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-submit {
  flex: 2;
  background: #9e47b7;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
}

.btn-cancel {
  flex: 1;
  background: #f3f4f6;
  color: #4b5563;
  border: none;
  padding: 0.8rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
}

.error-banner {
  background-color: #fef2f2;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 8px;
  text-align: center;
}
</style>
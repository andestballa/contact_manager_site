<template>
  <div class="manage-page">
    <header class="header">
      <div class="header-content">
        <h1 class="logo" @click="router.push('/home')">Contact Management</h1>
        <button class="btn-back" @click="router.push('/home')">
          <span>←</span> Kthehu te Lista
        </button>
      </div>
    </header>

    <main class="main-content">
      <div class="form-card">
        <div class="form-header">
          <h2>{{ isEditMode ? 'Edito Kontaktin' : 'Shto Kontakt të Ri' }}</h2>
          <p>
            Plotësoni të dhënat për të
            {{ isEditMode ? 'përditësuar' : 'krijuar' }} kontaktin.
          </p>
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
            <input v-model="form.email" type="email" placeholder="email@shembull.com" />
            <span v-if="emailError" class="field-error">
              {{ emailError }}
            </span>
          </div>

          <div class="field">
            <label>Telefon</label>
            <input v-model="form.phone_number" type="text" placeholder="+3556XXXXXXXX" />
            <span v-if="phoneError" class="field-error">
              {{ phoneError }}
            </span>
          </div>

          <div class="form-actions">
            <button
              type="button"
              class="btn-cancel"
              @click="router.push('/home')"
            >
              Anulo
            </button>

            <button
              type="submit"
              class="btn-submit"
              :disabled="submitting || formInvalid"
            >
              {{
                submitting
                  ? 'Duke u ruajtur...'
                  : isEditMode
                  ? 'Përditëso'
                  : 'Ruaj Kontaktin'
              }}
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
import { useContacts } from "~/composables/useContacts"

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


const emailError = computed(() => {
  if (!form.email) return null
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) return "Email nuk është i saktë"
  return null
})

const phoneError = computed(() => {
  if (!form.phone_number) return null
  const phoneRegex = /^\+?\d{8,15}$/
  if (!phoneRegex.test(form.phone_number)) return "Numri i telefonit nuk është valid"
  return null
})

const formInvalid = computed(() => !!(emailError.value || phoneError.value))


onMounted(async () => {
  if (isEditMode.value && contactId) {
    try {
      const data = await getContactById(contactId)
      form.name = data.name
      form.surname = data.surname
      form.email = data.email
      form.phone_number = data.phone_number
    } catch {
      serverError.value = "Nuk u gjet ky kontakt."
    }
  }
})


const handleSubmit = async () => {
  if (formInvalid.value) {
    serverError.value = "Ju lutem rregulloni gabimet në form."
    return
  }

  submitting.value = true
  serverError.value = null

  try {
    if (isEditMode.value && contactId) {
      await updateContact(contactId, { ...form })
    } else {
      await createContact({ ...form })
    }
    router.push("/home")
  } catch (e: any) {
    if (e?.data) {
      const errors = Object.values(e.data).flat()
      serverError.value = errors.join(", ")
    } else {
      serverError.value = "Dështoi ruajtja e kontaktit."
    }
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.manage-page {
  min-height: 100vh;
  background-color: #f9fafb;
  font-family: "Inter", sans-serif;
}

.header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 1.5rem;
  height: 70px;
  display: flex;
  align-items: center;
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
  cursor: pointer;
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

input {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 10px;
}

input:focus {
  outline: none;
  border-color: #9e47b7;
}

.field-error {
  color: #dc2626;
  font-size: 0.85rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
}

.btn-submit {
  flex: 2;
  background: #9e47b7;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 10px;
  cursor: pointer;
}

.btn-cancel {
  flex: 1;
  background: #f3f4f6;
  border: none;
  padding: 0.8rem;
  border-radius: 10px;
}

.error-banner {
  background-color: #fef2f2;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 8px;
  text-align: center;
}
</style>
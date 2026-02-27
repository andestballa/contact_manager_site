<template>
  <div>
    <header class="header">
      <h1 class="logo">MyApp</h1>
      <button class="logout" @click="logout">Logout</button>
    </header>

    <main class="content">
      <div class="title-section">
        <h2>Contacts</h2>
        <button class="btn-add" @click="router.push('/contacts-manage')">
          + Add New Contact
        </button>
      </div>

      <div v-if="loading">Loading contacts...</div>
      
      <ul v-else class="contact-list">
        <li v-for="c in contacts" :key="c.id" class="contact-item">
          <span class="contact-info">
            {{ c.name }} {{ c.surname }} – {{ c.email }}
          </span>
          <div class="actions">
            <button class="btn-edit" @click="router.push(`/contacts-manage?id=${c.id}`)">
              Edit
            </button>
            <button class="btn-delete" @click="remove(c.id)">Delete</button>
          </div>
        </li>
      </ul>

      <p v-if="error" class="error">{{ error }}</p>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useContacts } from '~/composables/useContacts'

const router = useRouter()
const { getContacts, deleteContact } = useContacts()

const contacts = ref<any[]>([]) // Ndrysho 'any' me tipin tend 'Contact'
const loading = ref(false)
const error = ref<string | null>(null)

const loadContacts = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await getContacts()
    contacts.value = res.results
  } catch (e: any) {
    error.value = "Failed to load contacts"
  } finally {
    loading.value = false
  }
}

onMounted(loadContacts)

const remove = async (id: number) => {
  if(!confirm("Are you sure you want to delete this contact?")) return
  try {
    await deleteContact(id)
    contacts.value = contacts.value.filter(c => c.id !== id)
  } catch (e: any) {
    error.value = "Failed to delete contact"
  }
}

const logout = () => {
  localStorage.removeItem("token")
  router.push("/login")
}
</script>

<style scoped>
.header {
  height: 64px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo { font-size: 50px; font-weight: 700; color: #9e47b7; }
.logout {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background: #ef4444;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.content { padding: 24px; color: #4b5563; }

.title-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.btn-add {
  background: #9e47b7;
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.contact-list { list-style: none; padding: 0; }
.contact-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #f3f4f6;
}

.actions button {
  margin-left: 8px;
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  cursor: pointer;
}

.btn-edit { background: #f3f4f6; }
.btn-delete { background: #fee2e2; color: #dc2626; border-color: #fca5a5 !important; }

.error { color: red; margin-top: 10px; }
</style>
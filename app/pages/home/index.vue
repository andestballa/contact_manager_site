<template>
  <div>
    <header class="header">
      <h1 class="logo">MyApp</h1>
      <button class="logout" @click="logout">Logout</button>
    </header>

    <main class="content">
      <h2>Contacts</h2>

      
      <div class="form">
        <input v-model="form.name" placeholder="Name" />
        <input v-model="form.surname" placeholder="Surname" />
        <input v-model="form.email" placeholder="Email" />
        <input v-model="form.phone_number" placeholder="Phone" />
        <button @click="addContact">Add Contact</button>
        <p v-if="error" class="error">{{ error }}</p>
      </div>

      
      <div v-if="loading">Loading contacts...</div>
      <ul v-else>
        <li v-for="c in contacts" :key="c.id">
          {{ c.name }} {{ c.surname }} – {{ c.email }}
          <button @click="remove(c.id)">Delete</button>
        </li>
      </ul>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useContacts } from '~/composables/useContacts'

const router = useRouter()
const { getContacts, createContact, deleteContact } = useContacts()

const contacts = ref<Contact[]>([])
const loading = ref(false)
const error = ref<string | null>(null)


const form = reactive({
  name: "",
  surname: "",
  email: "",
  phone_number: "",
})


const loadContacts = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await getContacts()
    contacts.value = res.results
  } catch (e: any) {
    error.value = "Failed to load contacts"
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(loadContacts)


const addContact = async () => {
  error.value = null
  if (!form.name || !form.surname || !form.email || !form.phone_number) {
    error.value = "All fields are required"
    return
  }
  try {
    await createContact({ ...form })
    form.name = ""
    form.surname = ""
    form.email = ""
    form.phone_number = ""
    await loadContacts()
  } catch (e: any) {
    error.value = "Failed to create contact"
    console.error(e)
  }
}

const remove = async (id: number) => {
  try {
    await deleteContact(id)
    contacts.value = contacts.value.filter(c => c.id !== id)
  } catch (e: any) {
    error.value = "Failed to delete contact"
    console.error(e)
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
  transition: 0.2s;
}
.logout:hover { background: #9f0505; }
.content { padding: 24px; color: #6b7280; }
.form { margin-bottom: 20px; }
.form input { margin-right: 8px; padding: 4px; }
.form button { padding: 4px 8px; }
.error { color: red; }
</style>
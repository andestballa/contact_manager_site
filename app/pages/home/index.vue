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

      
      <div class="search-section">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name, surname or email..."
          class="search-input"
        />
      </div>

      <div v-if="loading">Loading contacts...</div>

      <ul v-else class="contact-list">
        <li
          v-for="c in filteredContacts"
          :key="c.id"
          class="contact-item"
        >
          <span class="contact-info">
            {{ c.name }} {{ c.surname }} – {{ c.email }}
          </span>
          <div class="actions">
            <button
              class="btn-edit"
              @click="router.push(`/contacts-manage?id=${c.id}`)"
            >
              Edit
            </button>
            <button
              class="btn-delete"
              @click="remove(c.id)"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>

      
      <div
        class="pagination"
        v-if="!loading && totalPages > 1"
      >
        <button
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          Previous
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          :class="['page-number', { active: page === currentPage }]"
          @click="changePage(page)"
        >
          {{ page }}
        </button>

        <button
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          Next
        </button>
      </div>

      <p v-if="error" class="error">{{ error }}</p>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useContacts } from "~/composables/useContacts"

const router = useRouter()
const { getContacts, deleteContact } = useContacts()

const contacts = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const searchQuery = ref("")
const currentPage = ref(1)
const totalCount = ref(0)
const pageSize = 5 

const totalPages = computed(() =>
  Math.ceil(totalCount.value / pageSize)
)

const loadContacts = async (page = 1) => {
  loading.value = true
  error.value = null

  try {
    const res = await getContacts(page)
    contacts.value = res.results
    totalCount.value = res.count
    currentPage.value = page
  } catch {
    error.value = "Failed to load contacts"
  } finally {
    loading.value = false
  }
}

onMounted(() => loadContacts())

const changePage = (page: number) => {
  loadContacts(page)
}

const filteredContacts = computed(() => {
  if (!searchQuery.value) return contacts.value

  return contacts.value.filter(c =>
    c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    c.surname.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const remove = async (id: number) => {
  if (!confirm("Are you sure you want to delete this contact?")) return
  try {
    await deleteContact(id)
    loadContacts(currentPage.value)
  } catch {
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

.logo {
  font-size: 50px;
  font-weight: 700;
  color: #9e47b7;
}

.logout {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background: #ef4444;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.content {
  padding: 24px;
  color: #4b5563;
}

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

.search-section {
  margin-bottom: 16px;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  outline: none;
}

.search-input:focus {
  border-color: #9e47b7;
}

.contact-list {
  list-style: none;
  padding: 0;
}

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

.btn-edit {
  background: #f3f4f6;
}

.btn-delete {
  background: #fee2e2;
  color: #dc2626;
  border-color: #fca5a5 !important;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.pagination button {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  cursor: pointer;
}

.page-number.active {
  background: #9e47b7;
  color: white;
  border-color: #9e47b7;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
<template>
  <div class="page">
    <div class="container">
      <h1>Contacts</h1>

      <!-- Contacts List -->
      <div v-if="contacts?.results.length">
        <div 
          v-for="contact in contacts.results" 
          :key="contact.id" 
          class="contact-card"
        >
          <h3>{{ contact.name }} {{ contact.surname }}</h3>
          <p>{{ contact.email }}</p>
          <p>{{ contact.phone_number }}</p>
        </div>
      </div>

      <p v-else class="no-data">No contacts found.</p>

      <!-- ✅ Pagination (Shfaqet vetëm nëse ka më shumë se 1 faqe) -->
      <div 
        v-if="contacts && contacts.count > perPage" 
        class="pagination"
      >
        <button 
          @click="goToPage(currentPage - 1)" 
          :disabled="!contacts.previous"
        >
          Previous
        </button>

        <span>
          Page {{ currentPage }} of {{ totalPages }}
        </span>

        <button 
          @click="goToPage(currentPage + 1)" 
          :disabled="!contacts.next"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

type Contact = {
  id: number
  name: string
  surname: string
  email: string
  phone_number: string
  created_at: string
  updated_at: string
}

type PaginatedResponse<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

const contacts = ref<PaginatedResponse<Contact> | null>(null)
const currentPage = ref(1)
const perPage = ref(10)

const config = useRuntimeConfig()

// ✅ Total pages
const totalPages = computed(() => {
  if (!contacts.value) return 0
  return Math.ceil(contacts.value.count / perPage.value)
})

// ✅ Fetch contacts
const fetchContacts = async (page = 1) => {
  try {
    const data = await $fetch<PaginatedResponse<Contact>>(
      `${config.public.apiBase}/contacts/?page=${page}`
    )

    contacts.value = data
    currentPage.value = page
  } catch (error) {
    console.error('Error fetching contacts:', error)
  }
}

// ✅ Change page
const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  fetchContacts(page)
}

onMounted(() => {
  fetchContacts()
})
</script>

<style scoped>
.page {
  padding: 40px;
  background: #f3f4f6;
  min-height: 100vh;
}

.container {
  max-width: 700px;
  margin: auto;
}

.contact-card {
  background: white;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.no-data {
  text-align: center;
  color: gray;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background: #8963f1;
  color: white;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
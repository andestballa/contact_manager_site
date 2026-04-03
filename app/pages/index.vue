<template>
  <div>
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
          autocomplete="off"
        />
      </div>

      <div v-if="loading">Loading contacts...</div>

      <ul v-else class="contact-list">
        <li v-for="c in filteredContacts" :key="c.id" class="contact-item">
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

      <div v-if="!loading && totalPages > 1" class="pagination">
        <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
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

        <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
          Next
        </button>
      </div>

      <p v-if="error" class="error">{{ error }}</p>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useContacts } from "~/composables/useContacts";

const router = useRouter();
const { getContacts, deleteContact } = useContacts();

const contacts = ref<any[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const searchQuery = ref("");
const currentPage = ref(1);
const totalCount = ref(0);
const pageSize = 5;

const totalPages = computed(() => Math.ceil(totalCount.value / pageSize));

const loadContacts = async (page = 1) => {
  loading.value = true;
  error.value = null;

  try {
    const res = await getContacts(page);
    contacts.value = res.results;
    totalCount.value = res.count;
    currentPage.value = page;
  } catch {
    error.value = "Failed to load contacts";
  } finally {
    loading.value = false;
  }
};

onMounted(() => loadContacts());

const changePage = (page: number) => {
  loadContacts(page);
};

const filteredContacts = computed(() => {
  if (!searchQuery.value) return contacts.value;

  return contacts.value.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      c.surname.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const remove = async (id: number) => {
  if (!confirm("Are you sure you want to delete this contact?")) return;

  try {
    await deleteContact(id);
    loadContacts(currentPage.value);
  } catch {
    error.value = "Failed to delete contact";
  }
};
</script>

<style scoped>

.content {
  padding: 24px;
  color: #363c43;
  font-family: 'Inter', sans-serif; 
}

.title-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.title-section h2 {
  font-size: 24px;
  font-weight: 600;
}

.btn-add {
   background: linear-gradient(135deg, #8b5cf6, #a855f7);
  color: white;
  padding: 10px 18px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s;
}

.btn-add:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 15px rgba(139, 92, 246, 0.3);
}

.search-section {
  margin-bottom: 2px;
}

.search-input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: white;
  transition: 0.2s;
}

.search-input:focus {
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.contact-list {
  list-style: none;
  padding: 0;
}

.contact-item {
   display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  margin-bottom: 12px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.04);
  transition: 0.2s;
}

.contact-item:hover {
  transform: translateY(-2px);
}

.contact-info {
  font-family: inherit; 
  font-size: 15px;
  color: #374151;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-edit {
  background: #f3f4f6;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
}

.btn-delete {
  background: #fee2e2;
  color: #dc2626;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
}

.pagination {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 6px;
}

.pagination button {
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: white;
}

.page-number.active {
  background: #8b5cf6;
  color: white;
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
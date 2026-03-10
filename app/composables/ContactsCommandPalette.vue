
<script setup lang="ts">
import type { CommandPaletteGroup } from '@nuxt/ui'
import { ref, onMounted } from 'vue'
import { useContacts } from '~/composables/useContacts'

const { getContacts } = useContacts()

const groups = ref<CommandPaletteGroup[]>([])
const value = ref({})


const loadContacts = async () => {
  try {
    
    const res = await getContacts(1)
    
  
    groups.value = [
      {
        id: 'contacts',
        label: 'Contacts',
        items: res.results.map(contact => ({
          label: `${contact.name} ${contact.surname}`,
          suffix: contact.email
          
        }))
      }
    ]
  } catch (err) {
    console.error("Failed to load contacts for CommandPalette", err)
  }
}

onMounted(loadContacts)
</script>

<template>
  <UCommandPalette
    v-model="value"
    :groups="groups"
    placeholder="Search contacts..."
    class="flex-1 h-80"
  />
</template>

<style scoped>

.flex-1 {
  flex: 1;
}
.h-80 {
  height: 320px;
}
</style>
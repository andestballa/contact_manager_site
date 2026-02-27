export interface Contact {
  id: number
  name: string
  surname: string
  email: string
  phone_number: string
  created_at: string
  updated_at: string
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export const useContacts = () => {
  const { authFetch } = useAuth()

  async function getContacts(page = 1): Promise<PaginatedResponse<Contact>> {
    return await authFetch<PaginatedResponse<Contact>>(`/api/contacts/list/?page=${page}`)
  }

  
  async function searchContacts(query: string): Promise<Contact[]> {
    if (!query) return []
    const res = await authFetch<PaginatedResponse<Contact>>(`/api/contacts/list/?search=${query}`)
    return res.results
  }

  async function getContactById(id: number): Promise<Contact> {
   
    return await authFetch<Contact>(`/api/contacts/detail/${id}/`)
  }

 
  async function createContact(data: Omit<Contact, 'id' | 'created_at' | 'updated_at'>): Promise<Contact> {
    return await authFetch<Contact>("/api/contacts/create/", {
      method: "POST",
      body: data,
    })
  }

  
  async function updateContact(id: number, data: Partial<Contact>): Promise<Contact> {
    return await authFetch<Contact>(`/api/contacts/update/${id}/`, {
      method: "PUT",
      body: data,
    })
  }

  
  async function deleteContact(id: number): Promise<void> {
    await authFetch(`/api/contacts/delete/${id}/`, {
      method: "DELETE",
    })
  }

  return { 
    getContacts, 
    searchContacts, 
    getContactById, 
    createContact, 
    updateContact, 
    deleteContact 
  }
}
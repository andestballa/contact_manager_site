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

  // 1. Marrja e listës
  async function getContacts(page = 1): Promise<PaginatedResponse<Contact>> {
    return await authFetch<PaginatedResponse<Contact>>(`/api/contacts/list/?page=${page}`)
  }

  // 2. Marrja e NJË kontakti (RREGULLUAR)
  async function getContactById(id: number): Promise<Contact> {
    // Provojmë /detail/ sepse struktura jote ndjek këtë logjikë (list, create, delete)
    return await authFetch<Contact>(`/api/contacts/detail/${id}/`)
  }

  // 3. Krijimi i kontaktit 
  async function createContact(data: Omit<Contact, 'id' | 'created_at' | 'updated_at'>): Promise<Contact> {
    return await authFetch<Contact>("/api/contacts/create/", {
      method: "POST",
      body: data,
    })
  }

  // 4. Përditësimi i kontaktit (RREGULLUAR)
  async function updateContact(id: number, data: Partial<Contact>): Promise<Contact> {
    // Backend-et që kanë /create/ zakonisht kanë /update/ ose /edit/
    return await authFetch<Contact>(`/api/contacts/update/${id}/`, {
      method: "PUT", 
      body: data,
    })
  }

  // 5. Fshirja
  async function deleteContact(id: number): Promise<void> {
    await authFetch(`/api/contacts/delete/${id}/`, {
      method: "DELETE",
    })
  }

  return { getContacts, getContactById, createContact, updateContact, deleteContact }
}
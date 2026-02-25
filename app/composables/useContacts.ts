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
  // Përdorim authFetch që ke krijuar te useAuth.ts
  const { authFetch } = useAuth()

  // 1. Marrja e listës
  async function getContacts(page = 1): Promise<PaginatedResponse<Contact>> {
    return await authFetch<PaginatedResponse<Contact>>(`/api/contacts/list/?page=${page}`)
  }

  // 2. Krijimi i kontaktit (Ky që po të jep error)
  async function createContact(data: Omit<Contact, 'id' | 'created_at' | 'updated_at'>): Promise<Contact> {
    return await authFetch<Contact>("/api/contacts/create/", {
      method: "POST",
      body: data,
    })
  }

  // 3. Fshirja
  async function deleteContact(id: number): Promise<void> {
    await authFetch(`/api/contacts/delete/${id}/`, {
      method: "DELETE",
    })
  }

  return { getContacts, createContact, deleteContact }
}
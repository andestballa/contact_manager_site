export interface Contact {
  id: number
  name: string
  surname?: string
  email?: string
  phone_number?: string
}

type ContactsResponse = Contact[] | { results: Contact[]; [key: string]: any }

export function useContacts() {
  const API_BASE = (import.meta.env.VITE_API_URL as string) ?? ""

  const getHeaders = () => {
    const headers: Record<string, string> = { "Content-Type": "application/json" }
    const token = localStorage.getItem("token")
    if (token) headers["Authorization"] = `Bearer ${token}`
    return headers
  }

  async function getContacts(): Promise<ContactsResponse> {
    const url = API_BASE ? `${API_BASE.replace(/\/$/, "")}/api/contacts/` : "/api/contacts/"
    const res = await fetch(url, { headers: getHeaders() })
    if (!res.ok) throw new Error(`Failed to fetch contacts: ${res.status}`)
    return res.json()
  }

  async function createContact(payload: Partial<Contact>): Promise<Contact> {
    const url = API_BASE ? `${API_BASE.replace(/\/$/, "")}/api/contacts/` : "/api/contacts/"
    const res = await fetch(url, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const errText = await res.text().catch(() => "")
      throw new Error(`Failed to create contact: ${res.status} ${errText}`)
    }
    return res.json()
  }

  return { getContacts, createContact }
}
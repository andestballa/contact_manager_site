

type User = {
  user_id: string
  user_email: string
  token: string
}

export const useAuth = () => {
  const user = useState<User | null>("user", () => null)
  const config = useRuntimeConfig()
  const tokenCookie = useCookie<string | null>("token")


  const login = async (email: string, password: string) => {
    const res = await $fetch<User>(`${config.public.apiUrl}/api/login/`, {
      method: "POST",
      body: { email, password },
    })

    tokenCookie.value = res.token
    user.value = res

    return res
  }


  const signup = async (email: string, password: string) => {
    const res = await $fetch<User>(`${config.public.apiUrl}/api/signup/`, {
      method: "POST",
      body: { email, password },
    })

    tokenCookie.value = res.token
    user.value = res

    return res
  }


  const authFetch = async <T>(
    url: string,
    options: any = {}
  ): Promise<T> => {
    const token = tokenCookie.value

    if (!token) {
      throw new Error("Not authenticated")
    }

    return await $fetch<T>(`${config.public.apiUrl}${url}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Token ${token}`,
      },
    })
  }

  
  const logout = () => {
    tokenCookie.value = null
    user.value = null
  }

  const checkAuth = () => !!tokenCookie.value
  const getToken = () => tokenCookie.value

  return {
    login,
    signup,
    logout,
    checkAuth,
    getToken,
    authFetch, 
    user,
  }
}

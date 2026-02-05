// composables/useAuth.ts

type User = {
    user_id: string,
    user_email: string,
    token: string,
}

export const useAuth = () => {
    const user = useState<User | null>('user', () => null)

    const login = async (email: string, password: string) => {
        const res = await $fetch<User>('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            body: { email, password },
        })

        // Save token in cookie
        const tokenCookie = useCookie('token')
        tokenCookie.value = res.token

        user.value = res

        return res
    }
    const logout = () => {
        useCookie('token').value = null
        user.value = null
    }

    const checkAuth = () => {
        console.log({ user: user.value })
        const token = useCookie('token').value
        return !!token
    }


    const getToken = () => {
        return useCookie("token").value
    }

    return { login, logout, checkAuth, user, getToken }
}

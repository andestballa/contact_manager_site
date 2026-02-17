export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth = useAuth()
    const isAuth = auth.checkAuth()

    if (!isAuth && to.path !== '/login') {
        return navigateTo('/login')
    }
})

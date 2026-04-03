export default defineNuxtRouteMiddleware((to) => {
  const user = useState('user')

  if (!user.value && to.path !== '/login' && to.path !== '/signup') {
    return navigateTo('/login')
  }
})
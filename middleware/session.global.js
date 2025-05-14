export default defineNuxtRouteMiddleware(async (to, from) => {
    // const authStore = useAuthStore();
    // const isAuthenticated = await authStore.checkAuth();
    // // const isAuthenticated = true;
    
    // // Allow 404 page to show
    // if (!to.matched?.length)
    //     return;

    // // if user is not logged in, redirect to '/' when not navigating to a public page.
    // const publicRoutes = ['/', '/auth/login', '/auth/sign-up', '/github/callback', '/google/callback', '/user']
    // if (isAuthenticated) {
    //     if (to.path === '/auth/login') {
    //         return navigateTo('/user');
    //     }
    //     return;
    // } else if(publicRoutes.includes(to.path)) {
    //     return
    // } else {
    //     // If user is not logged in or there was an error, redirect to appropriate route
    //     if (to.path !== '/auth/login') {
    //         return navigateTo('/auth/login');
    //     }
    // }
});
  
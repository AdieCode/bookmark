import axios from 'axios';
// file name will change, just making changes to make sure everything works.

export default defineNuxtPlugin((nuxtApp) => {
  const auth = useAuthStore();
    // const authStore = useAuthStore();
    // const isAuthenticated = await authStore.checkAuth();

  const api = axios.create({
    baseURL: useRuntimeConfig().public.baseUrl
  });
  auth.init()

  // Automatically attach token to every request
  api.interceptors.request.use((config) => {
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  });

  // Handle errors globally
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // auth.setAuthenticated(false);
        return navigateTo('/auth/login');
      } else if(error.response?.status === 500) {
        return navigateTo('exeption/error')
      } else {
        return Promise.reject(error);
      }
    }
  );

  // Expose it globally
  return {
    provide: {
      api
    }
  };
});

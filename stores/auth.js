// store/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      isAuthenticated: false,
      user: null,
      token: null,
      error: null,
	  baseURL: 'http://localhost:3001',
    };
  },

  actions: {
	  	init() {
			if (process.client) {
			const session = useCookie('session');
			this.token = session.value?.token || null;
			}

			const config = useRuntimeConfig();
			this.baseURL = config.public.baseUrl || 'http://localhost:3001';
		},
		async login(email, password) {
			try {
				const { $api } = useNuxtApp();
				const response = await $api.post(this.baseURL + '/auth/login', { email, password });
				const { message, token } = response.data;
				if (process.client) {
					useCookie('session', { 
						expires: new Date(Date.now() + 1000 * 60 * 60 * 24) // 24 hours from now
					}).value = { token }; // Store the token in a cookie
				}
				// console.log(token)
				this.token = token;
				this.user = message;
				this.isAuthenticated = true;
				return true
			} catch (error) {
				this.error = error.message;
				return false
			}
		},

		async signUp(username, email, password) {
			try {
				const { $api } = useNuxtApp();
				const response = await $api.post(this.baseURL + '/auth/sign-up', { username, email, password });
				const { message, token } = response.data;
				if (process.client) {
					useCookie('session').value = { token }; // Store the token in a cookie
				}

				this.token = token;
				this.user = message;
				this.isAuthenticated = true;
				return true;
			} catch (error) {
				this.error = error.message;
				return false;
			}
		},

		async googleLogin(token) {
			try {
				
				if (process.client) {
					useCookie('session').value = { token }; // Store the token in a cookie
				}

				this.token = token;
				this.isAuthenticated = true;
				return true;
			} catch (error) {
				this.error = error.message;
				return false;
			}
		},

		async logout() {
			// Clear token and user data
			
			useCookie('session').value.token = ''; // Store the token in a cookie
			
			this.token = null;
			this.user = null;
			this.isAuthenticated = false;
		},

		async checkAuth() {
			try {
				const { $api } = useNuxtApp();
				const response = await $api.get(this.baseURL + '/isAuth', {
				headers: {
					authorization: `Bearer ${this.token}`,
					},
				});
				// If authentication is successful, update user data
				this.isAuthenticated = true;
				console.log('auth token passed')
				return true
			} catch (error) {
				// If authentication fails, clear token and user data
				this.token = null;
				this.user = null;
				this.isAuthenticated = false;
				console.log('auth token did not pass')
				return false
			}
		},
  	},
});

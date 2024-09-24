// store/auth.js
import { defineStore } from 'pinia';
import axios from 'axios';

const baseURL = 'http://localhost:3001';

export const useAuthStore = defineStore('auth', {
  state: () => {
	let session;
	let token;

	try {
		session = useCookie('session');
		token =  session.value.token || null;
	} catch {
		token =  null;
		console.log('something went wrong when fetching cookie');
	}

    return {
      isAuthenticated: false,
      user: null,
      token: token,
      error: null,
    };
  },

  actions: {
		async login(email, password) {
		try {
			const response = await axios.post(baseURL + '/auth/login', { email, password });
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
				const response = await axios.post(baseURL + '/auth/sign-up', { username, email, password });
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

		async logout() {
			// Clear token and user data
			
			useCookie('session').value.token = ''; // Store the token in a cookie
			
			this.token = null;
			this.user = null;
			this.isAuthenticated = false;
		},

		async checkAuth() {
			try {
				
				const response = await axios.get(baseURL + '/isAuth', {
				headers: {
					Authorization: `Bearer ${this.token}`,
					},
				});
				// If authentication is successful, update user data
				this.user = response.data;
				this.isAuthenticated = true;
				console.log('fine')
				return true
			} catch (error) {
				// If authentication fails, clear token and user data
				this.token = null;
				this.user = null;
				this.isAuthenticated = false;
				console.log('not fine')
				return false
			}
		},
  	},
});

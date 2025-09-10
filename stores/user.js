// store/extraData.js
import { defineStore } from 'pinia';

let abortController = null;

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: {
                counts: {
                    manga: {
                        totalCount: 0,
                        planningCount: 0,
                        busyCount: 0,
                        completedCount: 0,
                    },
                    anime: {
                        totalCount: 0,
                        planningCount: 0,
                        busyCount: 0,
                        completedCount: 0,
                    }
                }
            },
            baseURL: useRuntimeConfig().public.baseUrl || 'http://localhost:3001',
        }
    },

    actions: {
        async getcontentCount() {
        const { $api } = useNuxtApp();
        if (abortController) {
            abortController.abort(); // Cancel the previous request
        }

        abortController = new AbortController(); // Create a new controller for this request

        try {
            const response = await $api.get(`${this.baseURL}/user_content/user_content_count`, {
                signal: abortController.signal // Pass the signal to axios
            });

            console.log('User content count:', response.data);
            this.user.counts = {
                manga: response.data.data.manga,
                anime: response.data.data.anime,
            };
        } catch (error) {
            if (error.name === 'CanceledError') {
            console.log("Previous request canceled");
            } else {
            console.log(error);
            }
        }
        },
    }
});

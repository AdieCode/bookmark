// store/toggles.js
import { defineStore } from 'pinia';

export const useExtraDataStore = defineStore('extraData', {
  state: () => {
    return {
        tags: [],
        extraTags: []
    };
  },

  actions: {
    addTag(tag) {
        if (!this.tags.some(existingTag => existingTag.text === tag)) {
            this.tags.push(
                {
                    text: tag,
                    id: this.generateId()
                }
            );
        }
    },

    removeTag(id) {
        this.tags = this.tags.filter(tag => tag.id !== id);
    },

    clearTags() {
        this.tags = [];
    },

    generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    },
  },
});

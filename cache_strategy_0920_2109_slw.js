// 代码生成时间: 2025-09-20 21:09:58
import EmberObject from '@ember/object';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default EmberObject.extend({
  
  // The cache object where all data will be stored
  cache: A([]),

  // A method to set data in the cache
  // params: key (string), value (any), ttl (number) - time to live in milliseconds
  set(key, value, ttl = 0) {
    const now = Date.now();
    // If ttl is greater than 0, calculate expiration time
    const expiration = ttl > 0 ? now + ttl : 0;
    // Create or update the cache entry
    this.cache.replace(
      key,
      {
        value,
        expiration
      }
    );
  },

  // A method to get data from the cache
  // params: key (string) - the key to look for in the cache
  // returns: the cached value or null if it's not found or expired
  get(key) {
    const cacheEntry = this.cache.findBy('key', key);
    if (cacheEntry) {
      const { value, expiration } = cacheEntry;
      // Check if the cache entry has expired
      if (expiration > 0 && Date.now() > expiration) {
        this.cache.removeObject(cacheEntry); // Remove the expired entry
        return null;
      }
      return value;
    }
    return null;
  },

  // A method to clear the entire cache
  clear() {
    this.cache.clear();
  },

  // A method to clear expired entries from the cache
  clearExpired() {
    const now = Date.now();
    this.cache = this.cache.filter(entry => !entry.expiration || entry.expiration > now);
  },

  // Computed property to check if the cache is empty
  isEmpty: computed('cache.[]', function() {
    return this.cache.length === 0;
  }),

  // Observer to automatically clear expired entries whenever the cache is modified
  didCacheChange: observer('cache.[]', function() {
    this.clearExpired();
  })
});

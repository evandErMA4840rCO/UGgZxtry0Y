// 代码生成时间: 2025-09-29 00:03:08
import EmberObject from '@ember/object';
import { service } from '@ember/service';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import { A } from '@ember/array';

/**
 * A simple content recommendation service that simulates
 * a content recommendation algorithm.
 */
export default class ContentRecommendationService extends EmberObject {
  constructor() {
    super(...arguments);
    // Initialize with some sample content data
    this.contentData = A([
      { id: 1, title: 'Content A', tags: ['tech', 'news', 'emerging'] },
      { id: 2, title: 'Content B', tags: ['tech', 'gadgets'] },
      { id: 3, title: 'Content C', tags: ['books', 'reviews'] },
      { id: 4, title: 'Content D', tags: ['sports', 'news'] },
    ]);
  }

  @service store;  // Injecting an Ember Data store service

  /**
   * Recommends content based on the user's tagged interests.
   * @param {array} userInterests - An array of user's interests.
   * @returns {array} - Recommended content items.
   */
  recommendContent(userInterests) {
    // Check if userInterests is not undefined or empty
    if (!userInterests || userInterests.length === 0) {
      throw new Error('User interests are required for recommendations.');
    }

    // Filter content based on user interests
    return this.contentData.filter((contentItem) => {
      return contentItem.tags.some((tag) => userInterests.includes(tag));
    });
  }

  /**
   * Returns the content data used for recommendations.
   * @returns {array} - The content data array.
   */
  getContentData() {
    return this.contentData;
  }

  /**
   * Updates the content data with new items.
   * @param {array} newContent - An array of new content items to add.
   */
  updateContentData(newContent) {
    run(() => {
      // Ensure newContent is an array
      this.contentData.addObjects(newContent);
    });
  }
}

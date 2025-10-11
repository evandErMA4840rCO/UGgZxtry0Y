// 代码生成时间: 2025-10-12 03:29:26
import Ember from 'ember';
import DS from 'ember-data';

// A model representing a Subject
export default DS.Model.extend({
  title: DS.attr('string'),
  completed: DS.attr('boolean', {defaultValue: false}),
  progress: DS.attr('number', {defaultValue: 0}), // Progress as a percentage

  // Method to toggle the completion status
  toggleComplete() {
    this.toggleProperty('completed');
  },

  // Method to update progress
  updateProgress(progress) {
    if (progress >= 0 && progress <= 100) {
      this.set('progress', progress);
    } else {
      throw new Error('Progress must be between 0 and 100.');
    }
  },

  // Computed property to determine if progress is complete
  isCompleted: Ember.computed('progress', function() {
    return this.get('progress') === 100;
  }).readOnly(),
});

/*
 * Route to handle the subjects
 */
export default Ember.Route.extend({
  model() {
    return this.store.findAll('subject');
  },

  actions: {
    // Action to create a new subject
    createSubject() {
      let newSubject = this.store.createRecord('subject', {
        title: 'New Subject',
        completed: false,
        progress: 0,
      });
      newSubject.save().then(() => {
        // Handle successful save
        this.transitionTo('subject', newSubject);
      }).catch(() => {
        // Handle error
        this.set('errorMessage', 'Failed to create subject.');
      });
    },

    // Action to update progress
    updateSubjectProgress(subject, progress) {
      try {
        subject.updateProgress(progress);
        subject.save().then(() => {
          // Handle successful save
        }).catch(() => {
          // Handle error
          this.set('errorMessage', 'Failed to update progress for subject.');
        });
      } catch (error) {
        this.set('errorMessage', error.message);
      }
    },
  },
});

/*
 * Controller for the index route
 */
export default Ember.Controller.extend({
  subjects: Ember.computed(function() {
    return this.model;
  }),

  actions: {
    // Action to handle the toggle complete action from a subject
    toggleSubjectComplete(subject) {
      subject.toggleComplete();
      subject.save().then(() => {
        // Handle successful save
      }).catch(() => {
        // Handle error
        this.set('errorMessage', 'Failed to toggle subject completion.');
      });
    },
  },
});

/*
 * Template for the subject route
 */
export default Ember.Component.extend({
  tagName: 'li',

  didInsertElement() {
    this._super(...arguments);
    this.set('subject', this.get('subject'));
  },

  actions: {
    // Action to handle the delete action
    delete() {
      let subject = this.get('subject');
      subject.destroyRecord().then(() => {
        // Handle successful deletion
        this.sendAction('refresh');
      }).catch(() => {
        // Handle error
        this.set('errorMessage', 'Failed to delete subject.');
      });
    },
  },
});

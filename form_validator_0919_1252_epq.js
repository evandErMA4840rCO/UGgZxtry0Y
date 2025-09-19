// 代码生成时间: 2025-09-19 12:52:12
import Ember from 'ember';

// FormValidator component
export default Ember.Component.extend({
  // Properties
  username: null,
  email: null,
  password: null,
  error: null,

  // Actions
  actions: {
    validateForm() {
      // Reset error message
      this.set('error', null);
      
      // Validate each field
      if (!this.get('username')) {
        this.set('error', 'Username is required.');
        return;
      }
      if (!this.get('email')) {
        this.set('error', 'Email is required.');
        return;
      }
      if (!this.get('password')) {
        this.set('error', 'Password is required.');
        return;
      }
      
      // If all validations pass, submit the form
      this.submitForm();
    },
    submitForm() {
      // TODO: Implement form submission logic here
      console.log('Form submitted:', this.getProperties('username', 'email', 'password'));
    }
  },

  // Computed property to check if the form is valid
  isFormValid: Ember.computed('username', 'email', 'password', function() {
    return this.get('username') && this.get('email') && this.get('password');
  }),

  // Observer to disable the submit button if the form is not valid
  disableSubmit: Ember.observer('isFormValid', function() {
    this.set('disabled', !this.get('isFormValid'));
  }),

  // Component lifecycle hooks
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('error', null);
  }
});
// 代码生成时间: 2025-09-20 00:55:35
import Ember from 'ember';
import fetch from 'fetch';

// Define the application
const App = Ember.Application.create();

// Define the HTTP request handler service
App.HttpHandlerService = Ember.Service.extend({
  // Perform an HTTP GET request
  get(url) {
    return this._handleHttpRequest(url, { method: 'GET' });
  },

  // Perform an HTTP POST request
  post(url, data) {
    return this._handleHttpRequest(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  },

  // Handle HTTP requests
  _handleHttpRequest(url, options) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      fetch(url, options)
        .then(response => {
          // Check if the response is successful
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        }).then(data => {
          // Resolve the promise with the data
          resolve(data);
        }).catch(error => {
          // Reject the promise with the error
          reject(error);
        });
    });
  }
});

// Example usage:
// let httpHandler = App.__container__.lookup('service:http-handler');
// httpHandler.get('https://api.example.com/data')
//   .then(data => {
//     console.log('Data received:', data);
//   }).catch(error => {
//     console.error('Error:', error);
//   });
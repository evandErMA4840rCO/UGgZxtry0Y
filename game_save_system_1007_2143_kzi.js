// 代码生成时间: 2025-10-07 21:43:53
import Ember from 'ember';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

// Define a service for game save operations
export default Ember.Service.extend({
    // Injecting the storage service which handles local storage operations
    storage: service('storage'),

    // Method to save game data
    saveGameData: function(gameId, data) {
        // Check if gameId and data are provided
        if (!gameId || !data) {
            return RSVP.reject(new Error('Game ID and data are required to save the game state.'));
        }

        // Save the game data to local storage
        return this.get('storage').setItem(gameId, data).then(() => {
            // Return a success message
            return { message: `Game data for ${gameId} has been saved successfully.` };
        }).catch(error => {
            // Handle any errors that occur during the save operation
            throw new Error(`An error occurred while saving the game data: ${error.message}`);
        });
    },

    // Method to load game data
    loadGameData: function(gameId) {
        // Check if gameId is provided
        if (!gameId) {
            return RSVP.reject(new Error('Game ID is required to load the game state.'));
        }

        // Load the game data from local storage
        return this.get('storage').getItem(gameId).then(data => {
            // Return the game data if found
            if (data) {
                return { message: `Game data for ${gameId} has been loaded successfully.`, data };
            } else {
                // Return an error message if no data is found for the given gameId
                throw new Error(`No game data found for ID: ${gameId}`);
            }
        }).catch(error => {
            // Handle any errors that occur during the load operation
            throw new Error(`An error occurred while loading the game data: ${error.message}`);
        });
    }
});

// Define the storage service
export class StorageService {
    // Method to set an item in local storage
    setItem(key, value) {
        return new RSVP.Promise((resolve, reject) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    // Method to get an item from local storage
    getItem(key) {
        return new RSVP.Promise((resolve, reject) => {
            try {
                const value = localStorage.getItem(key);
                if (value) {
                    resolve(JSON.parse(value));
                } else {
                    resolve(null);
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}

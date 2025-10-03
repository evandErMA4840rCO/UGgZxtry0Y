// 代码生成时间: 2025-10-04 02:57:29
// Import Ember from 'ember';
import Ember from 'ember';

// Define the AnimationEffectsLib component
export default Ember.Component.extend({

  // Define the animations object with all possible animations
  animations: Ember.computed(function() {
    return {
      fadeIn: {
        type: 'fade',
        duration: 1000,
        delay: 0,
        easing: 'ease-in-out'
      },
      fadeOut: {
        type: 'fade',
        duration: 1000,
        delay: 0,
        easing: 'ease-in-out',
        reverse: true
      },
      // Add more animations as needed
    };
  }),

  // Function to play an animation on a given element
  playAnimation: Ember.on('didInsertElement', function() {
    const element = this.element;
    const animationName = this.get('animationName');
    const animation = this.get('animations')[animationName];

    // Error handling if animation does not exist
    if (!animation) {
      Ember.Logger.error('Animation not found: ' + animationName);
      return;
    }

    // Play the animation on the element
    Ember.$(element).css('animation', 
      `"${animationName}" ${animation.duration / 1000}s ${animation.delay / 1000}s ${animation.easing} ${animation.reverse ? 'reverse' : 'normal'}`
    );
  }),

  // Add a watcher to ensure the element is updated when needed
  animationsWatcher: Ember.observer('animations.@each', function() {
    this.rerender();
  }),

  // Function to stop the animation if needed
  stopAnimation: function() {
    const element = this.element;
    Ember.$(element).css('animation', 'none');
  },

  // Lifecycle hook to clean up when the component is destroyed
  willDestroyElement() {
    this._super(...arguments);
    this.stopAnimation();
  },

  // Additional properties can be added as needed
  animationName: null
});

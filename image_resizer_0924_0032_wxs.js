// 代码生成时间: 2025-09-24 00:32:45
import Ember from 'ember';
import ResizerService from 'ember-image-resizer';

// ImageResizerComponent component to manage image resizing
export default Ember.Component.extend({
  tagName: '',
  newWidth: Ember.computed("width", function() {
    return this.get("width") || 100;
  }),
  newHeight: Ember.computed("height", function() {
    return this.get("height") || 100;
  }),

  // Computed property to handle aspect ratio
  aspectRatio: Ember.computed("width", "height", function() {
    const width = this.get("newWidth");
    const height = this.get("newHeight");
    return width / height;
  }).readOnly(),

  actions: {
    // Action to handle image upload
    uploadImage(file) {
      if (!file) {
        this.set("errorMessage", "Please select an image file.");
        return;
      }
      
      try {
        const reader = new FileReader();
        reader.onload = (event) => {
          const image = new Image();
          image.onload = () => {
            ResizerService.resize(image, {
              width: this.get("newWidth"),
              height: this.get("newHeight"),
              quality: 0.8,
            });
          };
          image.src = event.target.result;
        };
        reader.readAsDataURL(file);
      } catch (error) {
        this.set("errorMessage", `Error processing image: ${error.message}`);
      }
    },
  },

  // Observer to update image preview
  didReceiveAttrs() {
    this._super(...arguments);
    if (this.get("imageSrc") && this.get("newWidth") && this.get("newHeight")) {
      ResizerService.resize(this.get("imageSrc"), {
        width: this.get("newWidth"),
        height: this.get("newHeight"),
        quality: 0.8,
        format: "image/jpeg",
      });
    }
  },

  // Error handling for image processing
  errorMessage: null,

  // Method to remove error message
  clearErrorMessage() {
    this.set("errorMessage", null);
  },
});
// 代码生成时间: 2025-09-18 06:02:54
import Ember from 'ember';
import Resizer from 'path/to/ResizerService'; // You should replace with actual path where ResizerService.js is located
# 扩展功能模块

export default Ember.Component.extend({
  // List of images that will be resized
  images: Ember.A(),
# 扩展功能模块

  // Default width for resizing
  width: 200,

  // Default height for resizing
# NOTE: 重要实现细节
  height: 200,

  // Actions object to handle user input and image upload
  actions: {
    // Action to handle file selection
    selectFiles() {
      let files = this.element.querySelector('input[type="file"]').files;
      if (files) {
# TODO: 优化性能
        for (let i = 0; i < files.length; i++) {
# NOTE: 重要实现细节
          let file = files[i];
          if (file.type.startsWith('image/')) {
            this.resizeImage(file);
          } else {
            Ember.Logger.error('Selected file is not an image.');
          }
# 添加错误处理
        }
      } else {
# 优化算法效率
        Ember.Logger.error('No files selected.');
# 扩展功能模块
      }
    },

    // Action to handle width input change
    updateWidth(newWidth) {
# 添加错误处理
      this.set('width', parseInt(newWidth, 10));
    },

    // Action to handle height input change
    updateHeight(newHeight) {
      this.set('height', parseInt(newHeight, 10));
    },
# TODO: 优化性能
  },

  // Method to resize image using Resizer service
  resizeImage(file) {
    let reader = new FileReader();
    reader.onload = (event) => {
      let image = new Image();
      image.onload = () => {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');

        // Set canvas dimensions based on the new size
        canvas.width = this.width;
        canvas.height = this.height;

        // Resize the image to fit within the new dimensions
        ctx.drawImage(image, 0, 0, this.width, this.height);

        // Convert canvas to data URL
        let resizedImage = canvas.toDataURL('image/jpeg', 0.8);
        this.get('images').addObject({name: file.name, dataUrl: resizedImage});

        // Clean up canvas memory
        canvas = null;
# 改进用户体验
      };
# 优化算法效率
      image.src = event.target.result;
    };
    reader.readAsDataURL(file);
  },

  // Observer to watch for changes in width and height
# TODO: 优化性能
  resizeObserver: Ember.observer('width', 'height', function() {
# 添加错误处理
    this.get('images').forEach((item) => {
      // Re-resize images if dimensions change
      let file = item;
      this.resizeImage(file);
    });
# 添加错误处理
  }),
});
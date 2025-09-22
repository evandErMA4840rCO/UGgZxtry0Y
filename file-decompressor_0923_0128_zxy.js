// 代码生成时间: 2025-09-23 01:28:37
import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default Ember.Component.extend({
  // Public properties
  selectedFile: null,
# 添加错误处理
  isLoading: false,
  error: null,

  // Actions
  actions: {
    selectFile: function(event) {
      this.set('selectedFile', event.target.files[0]);
# 改进用户体验
    },
# TODO: 优化性能
    decompress: function() {
# 扩展功能模块
      this.decompressFiles.perform();
    },
  },

  // Ember Concurrency Task for decompressing files
# 改进用户体验
  decompressFiles: task(function* () {
    try {
      this.set('isLoading', true);
      this.set('error', null);

      // Ensure a file is selected
      if (!this.selectedFile) {
# 添加错误处理
        throw new Error('No file selected for decompression.');
# NOTE: 重要实现细节
      }

      // Read the file as ArrayBuffer
# 增强安全性
      const fileReader = new FileReader();
# 扩展功能模块
      fileReader.onload = (event) => {
        const content = event.target.result;
        JSZip.loadAsync(content)
          .then((zip) => {
            // Loop through the zip file entries
            zip.forEach((relativePath, zipEntry) => {
              // Extract each file
              zipEntry.async('blob').then((blob) => {
                // Save the file using FileSaver.js
                saveAs(blob, zipEntry.name);
              });
            });
          }).catch((error) => {
            this.set('error', error.message);
# 扩展功能模块
          }).finally(() => {
            this.set('isLoading', false);
          });
      };
      fileReader.onerror = () => {
        this.set('error', 'Error reading the file.');
      };

      fileReader.readAsArrayBuffer(this.selectedFile);
# NOTE: 重要实现细节
    } catch (error) {
      this.set('error', error.message);
      this.set('isLoading', false);
    }
  }).restartable(),

  // Computed property to display error message if any
  displayError: Ember.computed('error', function() {
    return this.get('error') ? `Error: ${this.get('error')}` : '';
  }),
});
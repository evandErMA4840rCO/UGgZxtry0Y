// 代码生成时间: 2025-09-20 06:37:59
import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import JSZip from 'jszip';

/**
 * FileDecompressTool Component
 * A component that handles file decompression using JSZip.
 */
export default Ember.Component.extend({
  // Services
  fileReader: service('file-reader'),

  // Public properties
  fileName: null,
  compressedFile: null,
  decompressedFiles: null,

  // Private actions
  @task(function* (compressedFile) {
    try {
      this.set('compressedFile', compressedFile);
      const content = yield this.fileReader.readAsArrayBuffer(compressedFile);
      const zip = yield JSZip.loadAsync(content);
      const files = Object.entries(zip.files);

      const decompressedFiles = files.map(([path, file]) => {
        return {
          path,
          content: file.async('string')
        };
      });

      this.set('decompressedFiles', decompressedFiles);
    } catch (error) {
      console.error('Error decompressing file:', error);
      alert('An error occurred while decompressing the file.');
    }
  })
  decompressFile,

  // Public actions
  actions: {
    /**
     * Handle file input changes.
     * @param {Event} event - The event triggered by the file input.
     */
    handleFileInput(event) {
      const file = event.target.files[0];
      if (file) {
        this.decompressFile.perform(file);
      }
    },
  },

  // Lifecycle hooks
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('decompressedFiles', null);
  },
});
// 代码生成时间: 2025-09-20 17:07:23
import EmberObject from '@ember/object';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import { isEmpty } from '@ember/utils';
import { isObject } from '@ember/utils';

// JSONDataFormatter is a utility class for transforming JSON data.
class JSONDataFormatter extends EmberObject {
  // The input JSON data to be formatted.
  inputJson = null;

  // The output formatted JSON data.
  outputJson = computed('inputJson', function() {
    let input = this.inputJson;
    if (isNone(input) || isEmpty(input) || !isObject(input)) {
      throw new Error('Invalid input JSON data.');
    }

    // Transform the input JSON data into the desired format.
    // This example simply converts the keys to uppercase for demonstration purposes.
    let formattedData = this.transformData(input);

    return formattedData;
  });

  // Method to transform the input JSON data.
  // This should be overridden to implement custom transformation logic.
  transformData(data) {
    if (isObject(data)) {
      let result = {};
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          result[key.toUpperCase()] = this.transformData(data[key]);
        }
      }
      return result;
    } else if (Array.isArray(data)) {
      return data.map(item => this.transformData(item));
    } else {
      return data;
    }
  }
}

export default JSONDataFormatter;
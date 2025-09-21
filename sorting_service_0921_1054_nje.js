// 代码生成时间: 2025-09-21 10:54:59
export default class SortingService {
  
  /**
   * Performs bubble sort on an array of numbers
   *
   * @param {Array} array - The array to be sorted
   * @returns {Array} - The sorted array
   */
  bubbleSort(array) {
    if (!Array.isArray(array)) {
      throw new Error('Input must be an array');
    }
    if (array.length <= 1) return array;
    
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
    }
    return array;
  }

  /**
   * Performs quick sort on an array of numbers
   *
   * @param {Array} array - The array to be sorted
   * @returns {Array} - The sorted array
   */
  quickSort(array) {
    if (!Array.isArray(array)) {
      throw new Error('Input must be an array');
    }
    if (array.length <= 1) return array;
    
    let pivotIndex = Math.floor(array.length / 2);
    let pivot = array.splice(pivotIndex, 1)[0];
    let left = [];
    let right = [];
    
    for (let i = 0; i < array.length; i++) {
      if (array[i] < pivot) {
        left.push(array[i]);
      } else {
        right.push(array[i]);
      }
    }
    
    return this.quickSort(left).concat([pivot], this.quickSort(right));
  }

  /**
   * Performs insertion sort on an array of numbers
   *
   * @param {Array} array - The array to be sorted
   * @returns {Array} - The sorted array
   */
  insertionSort(array) {
    if (!Array.isArray(array)) {
      throw new Error('Input must be an array');
    }
    if (array.length <= 1) return array;
    
    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;
      
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        j--;
      }
      array[j + 1] = key;
    }
    return array;
  }

  /**
   * Performs selection sort on an array of numbers
   *
   * @param {Array} array - The array to be sorted
   * @returns {Array} - The sorted array
   */
  selectionSort(array) {
    if (!Array.isArray(array)) {
      throw new Error('Input must be an array');
    }
    if (array.length <= 1) return array;
    
    for (let i = 0; i < array.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }
      let temp = array[minIndex];
      array[minIndex] = array[i];
      array[i] = temp;
    }
    return array;
  }
}

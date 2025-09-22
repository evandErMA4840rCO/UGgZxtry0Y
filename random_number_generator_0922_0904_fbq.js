// 代码生成时间: 2025-09-22 09:04:55
import Ember from 'ember';
// RandomNumberGenerator Component
const { Component, computed } = Ember;

// 定义组件
export default Component.extend({
  // 定义属性
  max: 100,
  min: 1,
  // 随机数
  randomNumber: null,

  // 计算属性，确保生成的随机数在指定范围内
  randomValue: computed('min', 'max', function() {
    const { min, max } = this;
    if (min < 1 || max < min) {
      // 如果min小于1或者max小于min，抛出错误
      throw new Error('Invalid range: minimum value must be greater than 0 and less than maximum value.');
    }
    // 生成随机数
    return Math.floor(Math.random() * (max - min + 1) + min);
  }),

  // 动作，用于重新生成随机数
  generateRandomNumber() {
    this.set('randomNumber', this.get('randomValue'));
  },

  // 组件生命周期钩子，确保在渲染时生成随机数
  didInsertElement() {
    this._super(...arguments);
    this.generateRandomNumber();
  }
});

// 组件模板（Ember CLI自动生成的文件中，通常位于同名的.hbs文件中）
// {{!-- app/templates/components/random-number-generator.hbs --}}
// <div class="random-number-generator">
//   <p>Random Number: {{randomNumber}}</p>
//   <button {{action "generateRandomNumber"}}>Generate</button>
// </div>
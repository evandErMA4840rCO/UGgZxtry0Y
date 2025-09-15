// 代码生成时间: 2025-09-16 05:23:29
import Ember from 'ember';

// 网络连接状态检查器组件
export default Ember.Component.extend({
  // 组件的属性
  onlineStatus: Ember.computed('isOnline', function() {
    return this.get('isOnline') ? 'Online' : 'Offline';
  }),

  // 检查网络连接状态的方法
  checkNetworkStatus() {
    // 使用navigator.onLine属性检查网络连接状态
    this.set('isOnline', navigator.onLine);
  },

  // 组件初始化时检查网络连接状态
  init() {
    this._super(...arguments);
    this.checkNetworkStatus();
  },

  // 监听网络状态变化事件
  _setupNetworkChangeListener: Ember.on('didInsertElement', function() {
    window.addEventListener('online', () => this.checkNetworkStatus());
    window.addEventListener('offline', () => this.checkNetworkStatus());
  }),

  // 组件销毁时移除事件监听器
  _teardownNetworkChangeListener: Ember.on('willDestroyElement', function() {
    window.removeEventListener('online', () => this.checkNetworkStatus());
    window.removeEventListener('offline', () => this.checkNetworkStatus());
  }),

  // 组件的模板
  layout: Ember.HTMLBars.template({
    "id": "ember437", "block": "EMBER_BLOCK", "symbols": [], "statements": [
      "{{!-- 网络状态检查器模板 --}}",
      "<div class='network-status'>",
      "  <h2>Network Status: {{onlineStatus}}</h2>", // 显示网络状态
      "</div>"
    ], "hasEval": false, "upvars": []
  })
});
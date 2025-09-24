// 代码生成时间: 2025-09-24 13:53:11
import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

// 定义消息通知服务
class NotificationService {
  constructor() {
    // 存储通知列表
    this.notifications = [];
  }

  // 添加通知
  addNotification(message) {
    this.notifications.push(message);
  }

  // 获取通知列表
  getNotifications() {
    return this.notifications;
  }

  // 清空通知列表
  clearNotifications() {
    this.notifications = [];
  }
}

// 注入通知服务
export default class MessageNotificationSystem extends Component {
  @service('notification') notificationService; // 使用 Ember 的 service 来管理通知
  @tracked showNotification = false; // 用于控制通知是否显示

  // 构造函数
  constructor() {
    super(...arguments);
  }

  // 添加通知的 action
  @action
  addNotification(message) {
    this.notificationService.addNotification(message);
  }

  // 显示通知的 action
  @action
  showNotificationAction() {
    this.showNotification = true;
  }

  // 隐藏通知的 action
  @action
  hideNotificationAction() {
    this.showNotification = false;
  }

  // 获取通知列表
  getNotifications() {
    try {
      return this.notificationService.getNotifications();
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }
  }

  // 清空通知列表的 action
  @action
  clearNotifications() {
    this.notificationService.clearNotifications();
  }
}

// 注册通知服务
export function setupApplication() {
  this.register('service:notification', NotificationService);
}

// 组件模板 (message-notification-system.hbs)
// {{!-- 模板内容 --}}

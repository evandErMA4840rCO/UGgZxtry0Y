// 代码生成时间: 2025-09-23 13:41:33
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

// 数学计算工具集服务
const MathToolbox = {
  // 加法运算
  add(a, b) {
    return a + b;
  },
  // 减法运算
  subtract(a, b) {
    return a - b;
  },
  // 乘法运算
  multiply(a, b) {
    return a * b;
  },
  // 除法运算
  divide(a, b) {
    if (b === 0) {
      throw new Error('除数不能为0');
    }
    return a / b;
  },
  // 粉数运算（仅适用于整数值）
  power(a, b) {
    if (!Number.isInteger(a) || !Number.isInteger(b)) {
      throw new Error('指数运算仅适用于整数');
    }
    return Math.pow(a, b);
  }
};

export default class MathToolboxController extends Controller {
  // 注入数学计算工具集服务
  @service('math-toolbox') toolbox;

  // 用于存储计算结果
  result = '';

  // 执行计算的函数
  @action
  calculate(operation, a, b) {
    try {
      switch (operation) {
        case 'add':
          this.result = MathToolbox.add(a, b).toString();
          break;
        case 'subtract':
          this.result = MathToolbox.subtract(a, b).toString();
          break;
        case 'multiply':
          this.result = MathToolbox.multiply(a, b).toString();
          break;
        case 'divide':
          this.result = MathToolbox.divide(a, b).toString();
          break;
        case 'power':
          this.result = MathToolbox.power(a, b).toString();
          break;
        default:
          throw new Error('未知的运算类型');
      }
    } catch (error) {
      // 错误处理
      this.result = `错误: ${error.message}`;
    }
  }
}

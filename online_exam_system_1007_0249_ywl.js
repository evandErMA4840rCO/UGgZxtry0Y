// 代码生成时间: 2025-10-07 02:49:24
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
# FIXME: 处理边界情况
import { isEmpty } from '@ember/utils';

/*
 * Online Exam System Controller
# TODO: 优化性能
 * This controller handles the logic for an online exam system.
# NOTE: 重要实现细节
 * It manages questions, user selections, and stores the results.
# 增强安全性
 */
export default class OnlineExamSystemController extends Controller {
  // Inject the store service to work with questions
  @service store;

  // Tracked property to hold the current question index
  @tracked currentQuestionIndex = 0;

  // Tracked property to hold the question data
  @tracked question;

  // Tracked property to hold the user's answers
# TODO: 优化性能
  @tracked answers = A();

  // Tracked property to hold the score
  @tracked score = 0;

  // Get questions from the store and initialize the first question
  constructor() {
    super(...arguments);
    this.loadQuestions();
  }

  // Load questions from the store
  loadQuestions() {
# 改进用户体验
    try {
      const questions = this.store.findAll('question'); // Assuming 'question' is the model name
# 改进用户体验
      this.question = questions[0];
# 优化算法效率
    } catch (error) {
      console.error('Error loading questions:', error);
    }
  }

  // Go to the next question
  @action
  nextQuestion() {
# 增强安全性
    if (this.currentQuestionIndex < this.store.findAll('question').length - 1) {
      this.currentQuestionIndex++;
      this.question = this.store.findAll('question')[this.currentQuestionIndex];
# FIXME: 处理边界情况
    } else {
      // Handle the end of the exam
      this.endExam();
# TODO: 优化性能
    }
  }

  // Handle the end of the exam
  @action
  endExam() {
    // Calculate the score based on user's answers
    this.calculateScore();
# 增强安全性
    // Display results
    console.log('Exam ended. Your score is:', this.score);
  }
# 增强安全性

  // Calculate the score based on user's answers
  calculateScore() {
    let correctAnswers = 0;
    this.answers.forEach((answer, index) => {
      if (answer.correct) {
        correctAnswers++;
      }
    });
    this.score = correctAnswers;
# 改进用户体验
  }

  // Handle user's answer selection
# 扩展功能模块
  @action
  userAnswer(answer) {
# 优化算法效率
    if (isEmpty(this.question)) {
      console.error('No question is currently available to answer.');
# TODO: 优化性能
      return;
    }

    // Assume 'answer' is an object with 'isCorrect' property
    if (answer.isCorrect) {
      this.answers.pushObject({
        questionId: this.question.id,
# 扩展功能模块
        correct: true
      });
    } else {
      this.answers.pushObject({
        questionId: this.question.id,
        correct: false
      });
    }
  }
}
# FIXME: 处理边界情况

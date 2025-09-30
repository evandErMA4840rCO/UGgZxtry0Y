// 代码生成时间: 2025-09-30 22:21:32
 * This is a simple implementation of an intelligent scheduling system.
 * It includes basic functionality to manage classes and schedule them.
 */

// Import necessary modules
import Ember from 'ember';
import { A } from '@ember/array';

// Define the model for a schedule
const Schedule = Ember.Object.extend({
  // Define properties and methods here
  courses: A(),
  addCourse(course) {
    // Add a course to the schedule
    this.get('courses').pushObject(course);
  },
  removeCourse(course) {
    // Remove a course from the schedule
    this.get('courses').removeObject(course);
  },
  findCourse(courseId) {
    // Find a course by ID
    return this.get('courses').findBy('id', courseId);
  },
  isCourseConflict(course) {
    // Check for scheduling conflicts
    let courses = this.get('courses');
    return courses.any(c => c.get('timeSlot') === course.get('timeSlot') && c.get('roomId') === course.get('roomId'));
  }
});

// Define the main application
const Application = Ember.Application.create({
  // Application logic here
  init() {
    this._super(...arguments);
    this.set('schedule', Schedule.create());
  },
  actions: {
    addCourse(courseData) {
      let schedule = this.get('schedule');
      let course = Schedule.create(courseData);
      if (!schedule.isCourseConflict(course)) {
        schedule.addCourse(course);
        alert('Course added successfully!');
      } else {
        alert('Error: Scheduling conflict detected.');
      }
    },
    removeCourse(courseId) {
      let schedule = this.get('schedule');
      let course = schedule.findCourse(courseId);
      if (course) {
        schedule.removeCourse(course);
        alert('Course removed successfully!');
      } else {
        alert('Error: Course not found.');
      }
    }
  }
});

// Export the application for testing or further usage
export default Application;
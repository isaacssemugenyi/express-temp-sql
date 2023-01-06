const studentCourese = require('./studentsCourses');
const database = require('../../database/config');

module.exports = {
  /**
   * @description method to create a join students courses table
   */
  createStudentCoursesTable: async () =>
    await database.any(`${studentCourese.createStudentCourseTable}`),

  /**
   * @argument {number, number} -> {studentId, courseId}
   * @summary studentId and courseId for a new entry
   * @description method for adding a join
   * @returns An object of the both student and course ids
   */
  save: async (studentId, courseId) =>
    await database.one(`${studentCourese.saveAStudentCourse}`, [
      `${studentId}${courseId}`,
      studentId,
      courseId,
    ]),
};

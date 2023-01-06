const course = require('./courses');
const database = require('../../database/config');

module.exports = {
  /**
   * @description method to create a new courses table
   */
  createCoursesTable: async () =>
    await database.any(`${course.createCoursesTable}`),

  /**
   * @description method to select all courses from courses table
   * @returns List of all courses
   */
  findAll: async () => await database.any(`${course.findAllCourses}`),

  /**
   * @description method to select all courses with students
   * @returns List of all courses with students
   */
  findAllWithStudents: async () =>
    await database.any(`${course.findAllCoursesWithStudents}`),

  /**
   * @argument courseId
   * @summary Id for course to find
   * @description method to select a course based on a course id
   * @returns An object of a course
   */
  findById: async (courseId) =>
    await database.any(`${course.findACourseById}`, courseId),

  /**
   * @argument courseId
   * @summary Id for course to find with students
   * @description method to select a course based on a course id with student
   * @returns An object of a course with students
   */
  findCourseWithStudentsByCourseId: async (courseId) =>
    await database.any(`${course.findACourseWithStudentsById}`, courseId),

  /**
   * @argument course
   * @summary course object for a new entry
   * @description method for creating a new course
   * @returns An object of the newly created course
   */
  save: async (newCourse) =>
    await database.one(`${course.saveACourse}`, [
      newCourse.name,
      newCourse.duration,
      newCourse.description ?? '',
    ]),

  /**
   * @argument course
   * @summary object of a course to update
   * @argument courseId
   * @summary course id to update
   * @description method for updating an existing course
   * @returns an object of the update course
   */
  update: async (updateCourse, courseId) =>
    await database.none(`${course.updateACourse}`, [
      courseId,
      updateCourse.name ?? '',
      updateCourse.duration ?? '',
      updateCourse.description ?? '',
    ]),

  /**
   * @argument courseId
   * @summary Id for course to suspend
   * @description method to suspend a course based on a course id
   * @returns An id of the suspended course
   */
  suspend: async (courseId) =>
    database.any(`${course.suspendACourse}`, courseId),

  /**
   * @argument courseId
   * @summary Id for course to soft delete
   * @description method to soft-delete a course based on a course id
   * @returns An id of the soft-deleted course
   */
  softDelete: async (courseId) =>
    await database.any(`${course.softDeleteACourse}`, courseId),
};

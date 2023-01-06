const studentService = require('./studentService');
const studentCourseService = require('../studentsCourses/studentsCoursesService');

module.exports = (app) => {
  app
    .route('/students')

    /**
     * @description route to get all students
     * @returns List of students
     */
    .get(studentService.findAll)

    /**
     * @description route to create a new student
     * @returns object of student
     */
    .post(studentService.createANewStudent);

  app
    .route('/students/:studentId')

    /**
     * @description route to get a student by id
     * @returns object of student
     */
    .get(studentService.findById)

    /**
     * @description route to suspend a student by id
     * @returns id of student
     */
    .patch(studentService.suspendAStudentByStudentId)

    /**
     * @description route to delete a student by id
     * @returns id of student
     */
    .delete(studentService.softDeleteAStudentByStudentId);

  app
    .route('/students/:studentId/courses/courseId')

    /**
     * @description route to save a new studentand course connection
     * @returns object of join ids
     */
    .put(studentCourseService.saveAStudentCourse);
};

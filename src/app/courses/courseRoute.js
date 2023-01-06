const courseService = require('./courseService');
module.exports = (app) => {
  app
    .route('/courses')

    /**
     * @description route to get all courses
     * @returns List of courses
     */
    .get(courseService.findAll)

    /**
     * @description route to create a new course
     * @returns object of course
     */
    .post(courseService.createANewCourse);

  app
    .route('/courses/students')

    /**
     * @description route to get all courses with students
     * @returns List of courses with students
     */
    .get(courseService.findAllWithStudents);
  app
    .route('/courses/:courseId')

    /**
     * @description route to get a course by id
     * @returns object of course
     */
    .get(courseService.findById)

    /**
     * @description route to suspend a course by id
     * @returns id of course
     */
    .patch(courseService.suspendACourseByCourseId)

    /**
     * @description route to delete a course by id
     * @returns id of course
     */
    .delete(courseService.softDeleteACourseByCourseId);

  app
    .route('/courses/:courseId/students')

    /**
     * @description route to get a course by id with students
     * @returns object of course with students
     */
    .get(courseService.findCourseWithStudentsByCourseId);
};

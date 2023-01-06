const studentsCoursesRepository = require('./studentsCoursesRepository');

module.exports = {
  /**
   * @method saveAStudentCourse
   * @param { Request, Response } {studentId, courseId}
   * @description create a new student course join
   * @returns An object of a student and course id
   */
  async saveAStudentCourse(req, res) {
    try {
      const newStudentCourse = await studentsCoursesRepository.save(
        req.params.studentId,
        req.params.courseId
      );

      return res.status(201).json({ result: newStudentCourse });
    } catch (err) {
      logger.error(err.message);
    }
  },
};

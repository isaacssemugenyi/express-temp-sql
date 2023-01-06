const Transformer = require('transform-array-list');
const courseRepository = require('./courseRepository');

const transformedResults = (itemList) =>
  Transformer.transformList(
    itemList,
    ['category_id', 'category_name', 'category_description', 'category_alias'],
    'id',
    'categories'
  );

module.exports = {
  /**
   * @method findAll
   * @param { Request, Response }
   * @description find all courses
   * @returns List of all courses
   */
  async findAll(req, res) {
    const courseList = await courseRepository.findAll();

    let results = [];
    if (courseList.length <= 0) return (results = []);

    results = transformedResults(courseList);

    return res.status(200).json({ result: results });
  },

  /**
   * @method findAllWithStudents
   * @param { Request, Response }
   * @description find all courses with students
   * @returns List of all courses with students
   */
  async findAllWithStudents(req, res) {
    const courseList = await courseRepository.findAllWithStudents();

    let results = [];
    if (courseList.length <= 0) return (results = []);

    results = transformedResults(courseList);

    return res.status(200).json({ result: results });
  },

  /**
   * @method findById
   * @param { Request, Response } param -> courseId
   * @argument {number} courseId
   * @description find a single course based on course id
   * @returns An object of a course
   */
  async findById(req, res) {
    const course = await courseRepository.findById(req.params.courseId);

    return res.status(200).json({ result: course[0] });
  },

  /**
   * @method findCourseWithStudentsByCourseId
   * @param { Request, Response } param -> courseId
   * @argument {number} courseId
   * @description find a single course with students based on course id
   * @returns An object of a course with students
   */
  async findCourseWithStudentsByCourseId(req, res) {
    const course = await courseRepository.findCourseWithStudentsByCourseId(
      req.params.courseId
    );
    let output = [];
    if (course.length <= 0) return (output = []);

    output = transformedResults(course);

    return res.status(200).json({ result: output[0] });
  },

  /**
   * @method createANewCourse
   * @param { Request, Response } body -> course
   * @description create a new course
   * @returns An object of a course
   */
  async createANewCourse(req, res) {
    try {
      const newCourse = await courseRepository.save(req.body);

      return res.status(201).json({ result: newCourse });
    } catch (err) {
      logger.error(err.message);
    }
  },

  /**
   * @method suspendACourseByCourseId
   * @param { Request, Response } param -> courseId
   * @description suspend a student based on a course id
   * @returns An id of the suspended course
   */
  async suspendACourseByCourseId(req, res) {
    try {
      const suspendedCourse = await courseRepository.suspend(
        req.params.courseId
      );
      return res.status(200).json({
        result: suspendedCourse.length > 0 ? suspendedCourse[0] : { id: null },
      });
    } catch (err) {
      logger.error(err.message);
    }
  },

  /**
   * @method softDeleteACourseByCourseId
   * @param { Request, Response } param -> courseId
   * @description soft delete a course based on a course id
   * @returns An id of the suspended course
   */
  async softDeleteACourseByCourseId(req, res) {
    try {
      const softDeletedCourse = await courseRepository.softDelete(
        req.params.courseId
      );
      return res.status(200).json({
        result:
          softDeletedCourse.length > 0 ? softDeletedCourse[0] : { id: null },
      });
    } catch (err) {
      logger.error(err.message);
    }
  },
};

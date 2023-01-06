const Transformer = require('transform-array-list');
// const { productLogger } = require('../../../utils/entityLogger');
// const logger = require('../../../utils/logger');
const studentRepository = require('./studentRepository');

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
   * @description find all students
   * @returns List of all students
   */
  async findAll(req, res) {
    const studentList = await studentRepository.findAll();

    let results = [];
    if (studentList.length <= 0) return (results = []);

    results = transformedResults(studentList);

    return res.status(200).json({ result: results });
  },

  /**
   * @method findById
   * @param { Request, Response } param -> studentId
   * @argument {number} studentId
   * @description find a single student based on student id
   * @returns An object of a student
   */
  async findById(req, res) {
    const student = await studentRepository.findById(req.params.studentId);
    let output = [];
    if (student.length <= 0) return (output = []);

    output = transformedResults(student);

    return res.status(200).json({ result: output[0] });
  },

  /**
   * @method createANewStudent
   * @param { Request, Response } body -> student
   * @description create a new student
   * @returns An object of a student
   */
  async createANewStudent(req, res) {
    try {
      const newStudent = await studentRepository.save(req.body);

      return res.status(201).json({ result: newStudent });
    } catch (err) {
      logger.error(err.message);
    }
  },

  /**
   * @method suspendAStudentByStudentId
   * @param { Request, Response } param -> studentId
   * @description suspend a student based on a student id
   * @returns An id of the suspended student
   */
  async suspendAStudentByStudentId(req, res) {
    try {
      const suspendedStudent = await studentRepository.suspend(
        req.params.studentId
      );
      return res.status(200).json({
        result:
          suspendedStudent.length > 0 ? suspendedStudent[0] : { id: null },
      });
    } catch (err) {
      logger.error(err.message);
    }
  },

  /**
   * @method softDeleteAStudentByStudentId
   * @param { Request, Response } param -> studentId
   * @description soft delete a student based on a student id
   * @returns An id of the suspended student
   */
  async softDeleteAStudentByStudentId(req, res) {
    try {
      const softDeletedStudent = await studentRepository.softDelete(
        req.params.studentId
      );
      return res.status(200).json({
        result:
          softDeletedStudent.length > 0 ? softDeletedStudent[0] : { id: null },
      });
    } catch (err) {
      logger.error(err.message);
    }
  },
};

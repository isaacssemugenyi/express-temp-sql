const student = require('./students');
const database = require('../../database/config');

module.exports = {
  /**
   * @description method to create a new students table
   */
  createStudentsTable: async () =>
    await database.any(`${student.createStudentsTable}`),

  /**
   * @description method to select all students from students table
   * @returns List of all students
   */
  findAll: async () => await database.any(`${student.findAllStudents}`),

  /**
   * @argument studentId
   * @summary Id for student to find
   * @description method to select a student based on a student id
   * @returns An object of a student
   */
  findById: async (studentId) =>
    await database.any(`${student.findAStudentById}`, studentId),

  /**
   * @argument student
   * @summary student object for a new entry
   * @description method for creating a new student
   * @returns An object of the newly created student
   */
  save: async (newStudent) =>
    await database.one(`${student.saveAStudent}`, [
      newStudent.name,
      newStudent.email,
      newStudent.phone ?? '',
    ]),

  /**
   * @argument student
   * @summary object of a student to update
   * @argument studentId
   * @summary student id to update
   * @description method for updating an existing student
   * @returns an object of the update student
   */
  update: async (updateStudent, studentId) =>
    await database.none(`${student.updateAStudent}`, [
      studentId,
      updateStudent.name ?? '',
      updateStudent.email ?? '',
      updateStudent.phone ?? '',
    ]),

  /**
   * @argument studentId
   * @summary Id for student to suspend
   * @description method to suspend a student based on a student id
   * @returns An id of the suspended student
   */
  suspend: async (studentId) =>
    database.any(`${student.suspendAStudent}`, studentId),

  /**
   * @argument studentId
   * @summary Id for student to soft delete
   * @description method to soft-delete a student based on a student id
   * @returns An id of the soft-deleted student
   */
  softDelete: async (studentId) =>
    await database.any(`${student.softDeleteAStudent}`, studentId),
};

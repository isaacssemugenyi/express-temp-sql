const studentRepository = require('../app/students/studentRepository');
const courseRepository = require('../app/courses/courseRepository');
const studentCourseRepository = require('../app/studentsCourses/studentsCoursesRepository');
// const userReportsRepository = require('../app/reports/userReports/userReportsRepository');

exports.createAllTables = async () => {
  await studentRepository.createStudentsTable();
  // await userReportsRepository.createUserReportsTable();
  await courseRepository
    .createCoursesTable()
    .then(() => studentCourseRepository.createStudentCoursesTable());
};

module.exports = {
  createStudentCourseTable: `CREATE TABLE IF NOT EXISTS students_courses(
            id serial PRIMARY KEY,
            student_course_ck VARCHAR(10) NOT NULL UNIQUE,
            student_id INTEGER NOT NULL REFERENCES students(id),
            course_id INTEGER NOT NULL REFERENCES courses(id)
    )`,

  saveAStudentCourse: `INSERT INTO students_courses 
    (student_course_ck, student_id, course_id) VALUES ($1, $2, $3) 
    ON CONFLICT(student_course_ck) DO UPDATE SET student_id = $2, course_id = $3
    RETURNING id, student_id, course_id`,
};

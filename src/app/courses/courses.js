module.exports = {
  createCoursesTable: `CREATE TABLE IF NOT EXISTS courses(
          id serial PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          duration VARCHAR(40) NOT NULL,
          description VARCHAR(100),
          is_inactive BOOLEAN NOT NULL DEFAULT false,
          is_deleted BOOLEAN NOT NULL DEFAULT false,
          created_at bigint NOT NULL DEFAULT (date_part('epoch'::text, NOW()) * (1000)::double precision),
          last_modified_at bigint NOT NULL DEFAULT (date_part('epoch'::text, NOW()) * (1000)::double precision)
      )`,

  findAllCourses: `SELECT 
            c.id as course_id, 
            c.name,
            c.duration,
            c.description,
            c.created_at,
            s.id, 
            s.name,
            s.email,
            s.phone,
        FROM courses WHERE p.is_inactive IS FALSE AND p.is_deleted IS FALSE`,

  findAllCoursesWithStudents: `SELECT 
            c.id as course_id, 
            c.name,
            c.duration,
            c.description,
            c.created_at,
            s.id, 
            s.name,
            s.email,
            s.phone,
        FROM products p
        LEFT JOIN product_product_categories ppc ON ppc.product_id = p.id
        LEFT JOIN product_category_lookup pcl ON ppc.product_category_id = pcl.id
        WHERE p.is_suspended IS FALSE
        AND p.is_deleted IS FALSE`,

  findACourseById: `SELECT 
            p.id, 
            p.product_model,
            p.product_name, 
            p.product_description,
            p.product_alias, 
            p.product_cost,
            p.product_rating, 
            p.is_in_stock,
            p.created_at as product_created_date,
            p.last_modified_at, 
            pcl.id as category_id, 
            pcl.category_name,
            pcl.category_description, 
            pcl.category_alias
        FROM products p
        LEFT JOIN product_product_categories ppc ON ppc.product_id = p.id
        LEFT JOIN product_category_lookup pcl ON ppc.product_category_id = pcl.id
        WHERE p.is_suspended IS FALSE
        AND p.is_deleted IS FALSE
        AND p.id = $1`,

  findACourseWithStudentsById: `SELECT 
            p.id, 
            p.product_model,
            p.product_name, 
            p.product_description,
            p.product_alias, 
            p.product_cost,
            p.product_rating, 
            p.is_in_stock,
            p.created_at as product_created_date,
            p.last_modified_at, 
            pcl.id as category_id, 
            pcl.category_name,
            pcl.category_description, 
            pcl.category_alias
        FROM products p
        LEFT JOIN product_product_categories ppc ON ppc.product_id = p.id
        LEFT JOIN product_category_lookup pcl ON ppc.product_category_id = pcl.id
        WHERE p.is_suspended IS FALSE
        AND p.is_deleted IS FALSE
        AND p.id = $1`,

  saveACourse: `INSERT INTO courses (name, duration, description) VALUES ($1, $2, $3) RETURNING id, name. duration, description, created_at`,

  updateACourse: `UPDATE courses SET 
              name = COALESCE($2, name),
              duration = COALESCE($3, duration),
              description = COALESCE($4, description),
              last_modified_at = (date_part('epoch'::text, NOW()) * (1000)::double precision)
          WHERE id = $1 RETURNING id, name, duration, description, last_modified_at`,

  softDeleteACourse: `UPDATE courses SET 
          is_deleted = true,
          last_modified_at = (date_part('epoch'::text, NOW()) * (1000)::double precision)
      WHERE id = $1 RETURNING id`,

  suspendACourse: `UPDATE students SET 
          is_inactive = true,
          last_modified_at = (date_part('epoch'::text, NOW()) * (1000)::double precision)
      WHERE id = $1 RETURNING id`,
};

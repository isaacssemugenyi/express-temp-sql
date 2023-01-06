module.exports = {
  createStudentsTable: `CREATE TABLE IF NOT EXISTS students(
        id serial PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(40),
        is_inactive BOOLEAN NOT NULL DEFAULT false,
        is_deleted BOOLEAN NOT NULL DEFAULT false,
        created_at bigint NOT NULL DEFAULT (date_part('epoch'::text, NOW()) * (1000)::double precision),
        last_modified_at bigint NOT NULL DEFAULT (date_part('epoch'::text, NOW()) * (1000)::double precision)
    )`,

  findAllStudents: `SELECT 
          s.id, 
          s.name,
          s.email,
          s.phone,
          s.is_inactive, 
          s.created_at,
          s.last_modified_at,
          c.default_image_name, 
          c.is_in_stock,
          c.created_at as product_created_date,
          c.last_modified_at, 
          pcl.id as category_id, 
          pcl.category_name,
          pcl.category_description, 
          pcl.category_alias
      FROM products p
      LEFT JOIN product_product_categories ppc ON ppc.product_id = p.id
      LEFT JOIN product_category_lookup pcl ON ppc.product_category_id = pcl.id
      WHERE p.is_suspended IS FALSE
      AND p.is_deleted IS FALSE`,

  findAStudentById: `SELECT 
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

  saveAStudent: `INSERT INTO students (name, email, phone) VALUES ($1, $2, $3) RETURNING id, name. email, phone, created_at`,

  updateAStudent: `UPDATE students SET 
            name = COALESCE($2, name),
            email = COALESCE($3, email),
            phone = COALESCE($4, phone),
            last_modified_at = (date_part('epoch'::text, NOW()) * (1000)::double precision)
        WHERE id = $1 RETURNING id, name, email, phone, last_modified_at`,

  softDeleteAStudent: `UPDATE students SET 
        is_deleted = true,
        last_modified_at = (date_part('epoch'::text, NOW()) * (1000)::double precision)
    WHERE id = $1 RETURNING id`,

  suspendAStudent: `UPDATE students SET 
        is_inactive = true,
        last_modified_at = (date_part('epoch'::text, NOW()) * (1000)::double precision)
    WHERE id = $1 RETURNING id`,
};

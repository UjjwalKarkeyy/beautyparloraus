const pool = require("../config/db");

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatBlog(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    excerpt: row.excerpt,
    content: row.content,
    imageUrl: row.image_url,
    author: row.author,
    readTime: row.read_time,
    isFeatured: row.is_featured,
    isActive: row.is_active,
    displayOrder: row.display_order,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function validateBlogPayload(body) {
  const { title, excerpt, content } = body;

  if (!title || !String(title).trim()) {
    return "Blog title is required";
  }

  if (!excerpt || !String(excerpt).trim()) {
    return "Blog excerpt is required";
  }

  if (!content || !String(content).trim()) {
    return "Blog content is required";
  }

  return null;
}

async function getBlogs(req, res, next) {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM blogs
      WHERE is_active = TRUE
      ORDER BY display_order ASC, published_at DESC, id DESC
      `
    );

    res.json(result.rows.map(formatBlog));
  } catch (error) {
    next(error);
  }
}

async function getBlogBySlug(req, res, next) {
  try {
    const { slug } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM blogs
      WHERE slug = $1 AND is_active = TRUE
      `,
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Blog not found",
      });
    }

    res.json(formatBlog(result.rows[0]));
  } catch (error) {
    next(error);
  }
}

async function getAdminBlogs(req, res, next) {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM blogs
      ORDER BY created_at DESC, id DESC
      `
    );

    res.json(result.rows.map(formatBlog));
  } catch (error) {
    next(error);
  }
}

async function createBlog(req, res, next) {
  try {
    const validationError = validateBlogPayload(req.body);

    if (validationError) {
      return res.status(400).json({
        error: validationError,
      });
    }

    const {
      slug,
      title,
      category,
      excerpt,
      content,
      imageUrl,
      author,
      readTime,
      isFeatured,
      isActive,
      displayOrder,
    } = req.body;

    const finalSlug = slug ? slugify(slug) : slugify(title);

    const result = await pool.query(
      `
      INSERT INTO blogs (
        slug,
        title,
        category,
        excerpt,
        content,
        image_url,
        author,
        read_time,
        is_featured,
        is_active,
        display_order
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
      `,
      [
        finalSlug,
        String(title).trim(),
        category || null,
        String(excerpt).trim(),
        String(content).trim(),
        imageUrl || null,
        author || "Brow Beauty Hub",
        readTime || null,
        isFeatured === undefined ? false : isFeatured,
        isActive === undefined ? true : isActive,
        displayOrder ? Number(displayOrder) : 0,
      ]
    );

    res.status(201).json(formatBlog(result.rows[0]));
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({
        error: "A blog with this slug already exists",
      });
    }

    next(error);
  }
}

async function updateBlog(req, res, next) {
  try {
    const { id } = req.params;

    const validationError = validateBlogPayload(req.body);

    if (validationError) {
      return res.status(400).json({
        error: validationError,
      });
    }

    const {
      slug,
      title,
      category,
      excerpt,
      content,
      imageUrl,
      author,
      readTime,
      isFeatured,
      isActive,
      displayOrder,
    } = req.body;

    const finalSlug = slug ? slugify(slug) : slugify(title);

    const result = await pool.query(
      `
      UPDATE blogs
      SET
        slug = $1,
        title = $2,
        category = $3,
        excerpt = $4,
        content = $5,
        image_url = $6,
        author = $7,
        read_time = $8,
        is_featured = $9,
        is_active = $10,
        display_order = $11,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $12
      RETURNING *
      `,
      [
        finalSlug,
        String(title).trim(),
        category || null,
        String(excerpt).trim(),
        String(content).trim(),
        imageUrl || null,
        author || "Brow Beauty Hub",
        readTime || null,
        isFeatured === undefined ? false : isFeatured,
        isActive === undefined ? true : isActive,
        displayOrder ? Number(displayOrder) : 0,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Blog not found",
      });
    }

    res.json(formatBlog(result.rows[0]));
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({
        error: "A blog with this slug already exists",
      });
    }

    next(error);
  }
}

async function deleteBlog(req, res, next) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      UPDATE blogs
      SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING id
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Blog not found",
      });
    }

    res.json({
      message: "Blog removed successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getBlogs,
  getBlogBySlug,
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};
const pool = require("../config/db");

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeList(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter((item) => item.length > 0);
  }

  if (typeof value === "string") {
    return value
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  return [];
}

function formatService(row) {
  return {
    id: row.id,
    slug: row.slug,
    number: row.service_number,
    label: row.label,
    title: row.title,
    image: row.image_url,
    description: row.short_description,
    paragraphs: row.paragraphs || [],
    includes: row.includes || [],
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function getServices(req, res, next) {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM services
      WHERE is_active = TRUE
      ORDER BY service_number ASC, id ASC
      `
    );

    res.json(result.rows.map(formatService));
  } catch (error) {
    next(error);
  }
}

async function getServiceBySlug(req, res, next) {
  try {
    const { slug } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM services
      WHERE slug = $1 AND is_active = TRUE
      `,
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Service not found",
      });
    }

    res.json(formatService(result.rows[0]));
  } catch (error) {
    next(error);
  }
}

async function getAdminServices(req, res, next) {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM services
      ORDER BY id DESC
      `
    );

    res.json(result.rows.map(formatService));
  } catch (error) {
    next(error);
  }
}

async function createService(req, res, next) {
  try {
    const {
      slug,
      title,
      label,
      number,
      description,
      image,
      paragraphs,
      includes,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        error: "Service title and description are required",
      });
    }

    const finalSlug = slug ? slugify(slug) : slugify(title);

    const result = await pool.query(
      `
      INSERT INTO services (
        slug,
        title,
        label,
        service_number,
        short_description,
        image_url,
        paragraphs,
        includes
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8::jsonb)
      RETURNING *
      `,
      [
        finalSlug,
        title,
        label || null,
        number || null,
        description,
        image || null,
        JSON.stringify(normalizeList(paragraphs)),
        JSON.stringify(normalizeList(includes)),
      ]
    );

    res.status(201).json(formatService(result.rows[0]));
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({
        error: "A service with this slug already exists",
      });
    }

    next(error);
  }
}

async function updateService(req, res, next) {
  try {
    const { id } = req.params;

    const {
      slug,
      title,
      label,
      number,
      description,
      image,
      paragraphs,
      includes,
      isActive,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        error: "Service title and description are required",
      });
    }

    const finalSlug = slug ? slugify(slug) : slugify(title);

    const result = await pool.query(
      `
      UPDATE services
      SET
        slug = $1,
        title = $2,
        label = $3,
        service_number = $4,
        short_description = $5,
        image_url = $6,
        paragraphs = $7::jsonb,
        includes = $8::jsonb,
        is_active = $9,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $10
      RETURNING *
      `,
      [
        finalSlug,
        title,
        label || null,
        number || null,
        description,
        image || null,
        JSON.stringify(normalizeList(paragraphs)),
        JSON.stringify(normalizeList(includes)),
        isActive === undefined ? true : isActive,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Service not found",
      });
    }

    res.json(formatService(result.rows[0]));
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({
        error: "A service with this slug already exists",
      });
    }

    next(error);
  }
}

async function deleteService(req, res, next) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      UPDATE services
      SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING id
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Service not found",
      });
    }

    res.json({
      message: "Service removed successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getServices,
  getServiceBySlug,
  getAdminServices,
  createService,
  updateService,
  deleteService,
};
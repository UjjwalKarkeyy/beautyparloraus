const pool = require("../config/db");

function formatStat(row) {
  return {
    id: row.id,
    value: row.stat_value,
    suffix: row.stat_suffix || "",
    label: row.stat_label,
    displayOrder: row.display_order,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function validateStatPayload(body) {
  const { value, label } = body;

  if (!value || !String(value).trim()) {
    return "Stat value is required";
  }

  if (!label || !String(label).trim()) {
    return "Stat label is required";
  }

  return null;
}

async function getHomepageStats(req, res, next) {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM homepage_stats
      WHERE is_active = TRUE
      ORDER BY display_order ASC, id ASC
      `
    );

    res.json(result.rows.map(formatStat));
  } catch (error) {
    next(error);
  }
}

async function getAdminHomepageStats(req, res, next) {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM homepage_stats
      ORDER BY display_order ASC, id ASC
      `
    );

    res.json(result.rows.map(formatStat));
  } catch (error) {
    next(error);
  }
}

async function createHomepageStat(req, res, next) {
  try {
    const validationError = validateStatPayload(req.body);

    if (validationError) {
      return res.status(400).json({
        error: validationError,
      });
    }

    const { value, suffix, label, displayOrder, isActive } = req.body;

    const result = await pool.query(
      `
      INSERT INTO homepage_stats (
        stat_value,
        stat_suffix,
        stat_label,
        display_order,
        is_active
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        String(value).trim(),
        suffix || "",
        String(label).trim(),
        displayOrder ? Number(displayOrder) : 0,
        isActive === undefined ? true : isActive,
      ]
    );

    res.status(201).json(formatStat(result.rows[0]));
  } catch (error) {
    next(error);
  }
}

async function updateHomepageStat(req, res, next) {
  try {
    const { id } = req.params;

    const validationError = validateStatPayload(req.body);

    if (validationError) {
      return res.status(400).json({
        error: validationError,
      });
    }

    const { value, suffix, label, displayOrder, isActive } = req.body;

    const result = await pool.query(
      `
      UPDATE homepage_stats
      SET
        stat_value = $1,
        stat_suffix = $2,
        stat_label = $3,
        display_order = $4,
        is_active = $5,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
      `,
      [
        String(value).trim(),
        suffix || "",
        String(label).trim(),
        displayOrder ? Number(displayOrder) : 0,
        isActive === undefined ? true : isActive,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Homepage stat not found",
      });
    }

    res.json(formatStat(result.rows[0]));
  } catch (error) {
    next(error);
  }
}

async function deleteHomepageStat(req, res, next) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      UPDATE homepage_stats
      SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING id
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Homepage stat not found",
      });
    }

    res.json({
      message: "Homepage stat removed successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getHomepageStats,
  getAdminHomepageStats,
  createHomepageStat,
  updateHomepageStat,
  deleteHomepageStat,
};
const pool = require("../config/db");

function formatReview(row) {
  return {
    id: row.id,
    clientName: row.client_name,
    serviceName: row.service_name,
    location: row.location,
    rating: Number(row.rating),
    reviewText: row.review_text,
    avatarLetter: row.avatar_letter,
    isFeatured: row.is_featured,
    isActive: row.is_active,
    displayOrder: row.display_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function getAvatarLetter(clientName, avatarLetter) {
  if (avatarLetter && avatarLetter.trim()) {
    return avatarLetter.trim().charAt(0).toUpperCase();
  }

  if (clientName && clientName.trim()) {
    return clientName.trim().charAt(0).toUpperCase();
  }

  return "C";
}

function validateReviewPayload(body) {
  const { clientName, reviewText, rating } = body;

  if (!clientName || !clientName.trim()) {
    return "Client name is required";
  }

  if (!reviewText || !reviewText.trim()) {
    return "Review text is required";
  }

  if (rating !== undefined) {
    const ratingNumber = Number(rating);

    if (Number.isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
      return "Rating must be between 1 and 5";
    }
  }

  return null;
}

async function getReviews(req, res, next) {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM client_reviews
      WHERE is_active = TRUE
      ORDER BY display_order ASC, created_at DESC
      `
    );

    res.json(result.rows.map(formatReview));
  } catch (error) {
    next(error);
  }
}

async function getFeaturedReviews(req, res, next) {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM client_reviews
      WHERE is_active = TRUE
      AND is_featured = TRUE
      ORDER BY display_order ASC, created_at DESC
      `
    );

    res.json(result.rows.map(formatReview));
  } catch (error) {
    next(error);
  }
}

async function getAdminReviews(req, res, next) {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM client_reviews
      ORDER BY created_at DESC
      `
    );

    res.json(result.rows.map(formatReview));
  } catch (error) {
    next(error);
  }
}

async function createReview(req, res, next) {
  try {
    const validationError = validateReviewPayload(req.body);

    if (validationError) {
      return res.status(400).json({
        error: validationError,
      });
    }

    const {
      clientName,
      serviceName,
      location,
      rating,
      reviewText,
      avatarLetter,
      isFeatured,
      isActive,
      displayOrder,
    } = req.body;

    const finalAvatarLetter = getAvatarLetter(clientName, avatarLetter);

    const result = await pool.query(
      `
      INSERT INTO client_reviews (
        client_name,
        service_name,
        location,
        rating,
        review_text,
        avatar_letter,
        is_featured,
        is_active,
        display_order
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
      `,
      [
        clientName.trim(),
        serviceName || null,
        location || null,
        rating ? Number(rating) : 5,
        reviewText.trim(),
        finalAvatarLetter,
        isFeatured === undefined ? false : isFeatured,
        isActive === undefined ? true : isActive,
        displayOrder ? Number(displayOrder) : 0,
      ]
    );

    res.status(201).json(formatReview(result.rows[0]));
  } catch (error) {
    next(error);
  }
}

async function updateReview(req, res, next) {
  try {
    const { id } = req.params;

    const validationError = validateReviewPayload(req.body);

    if (validationError) {
      return res.status(400).json({
        error: validationError,
      });
    }

    const {
      clientName,
      serviceName,
      location,
      rating,
      reviewText,
      avatarLetter,
      isFeatured,
      isActive,
      displayOrder,
    } = req.body;

    const finalAvatarLetter = getAvatarLetter(clientName, avatarLetter);

    const result = await pool.query(
      `
      UPDATE client_reviews
      SET
        client_name = $1,
        service_name = $2,
        location = $3,
        rating = $4,
        review_text = $5,
        avatar_letter = $6,
        is_featured = $7,
        is_active = $8,
        display_order = $9,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $10
      RETURNING *
      `,
      [
        clientName.trim(),
        serviceName || null,
        location || null,
        rating ? Number(rating) : 5,
        reviewText.trim(),
        finalAvatarLetter,
        isFeatured === undefined ? false : isFeatured,
        isActive === undefined ? true : isActive,
        displayOrder ? Number(displayOrder) : 0,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Review not found",
      });
    }

    res.json(formatReview(result.rows[0]));
  } catch (error) {
    next(error);
  }
}

async function deleteReview(req, res, next) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      UPDATE client_reviews
      SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING id
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Review not found",
      });
    }

    res.json({
      message: "Review removed successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getReviews,
  getFeaturedReviews,
  getAdminReviews,
  createReview,
  updateReview,
  deleteReview,
};
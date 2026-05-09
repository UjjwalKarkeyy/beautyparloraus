const pool = require("../config/db");

function generateOrderNumber() {
  return `BBH-${Date.now()}`;
}

function validateOrderPayload(body) {
  const { customer, items, subtotal, total } = body;

  if (!customer) {
    return "Customer details are required";
  }

  if (!customer.firstName || !customer.lastName || !customer.email) {
    return "Customer name and email are required";
  }

  if (!customer.address || !customer.city || !customer.postcode) {
    return "Delivery address, city, and postcode are required";
  }

  if (!Array.isArray(items) || items.length === 0) {
    return "Order must contain at least one item";
  }

  if (subtotal === undefined || total === undefined) {
    return "Subtotal and total are required";
  }

  return null;
}

async function createOrder(req, res, next) {
  const client = await pool.connect();

  try {
    const validationError = validateOrderPayload(req.body);

    if (validationError) {
      return res.status(400).json({
        error: validationError,
      });
    }

    const { customer, items, subtotal, total } = req.body;
    const orderNumber = generateOrderNumber();

    await client.query("BEGIN");

    const orderResult = await client.query(
      `
      INSERT INTO orders (
        order_number,
        first_name,
        last_name,
        email,
        phone,
        address,
        city,
        postcode,
        notes,
        subtotal,
        total
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
      `,
      [
        orderNumber,
        customer.firstName,
        customer.lastName,
        customer.email,
        customer.phone || null,
        customer.address,
        customer.city,
        customer.postcode,
        customer.notes || null,
        subtotal,
        total,
      ]
    );

    const order = orderResult.rows[0];

    for (const item of items) {
      await client.query(
        `
        INSERT INTO order_items (
          order_id,
          product_id,
          product_name,
          quantity,
          price
        )
        VALUES ($1, $2, $3, $4, $5)
        `,
        [
          order.id,
          item.id || null,
          item.name,
          item.qty,
          item.price,
        ]
      );
    }

    await client.query("COMMIT");

    res.status(201).json({
      id: order.id,
      orderNumber: order.order_number,
      status: order.status,
      message: "Order placed successfully",
    });
  } catch (error) {
    await client.query("ROLLBACK");
    next(error);
  } finally {
    client.release();
  }
}

async function getAdminOrders(req, res, next) {
  try {
    const ordersResult = await pool.query(
      `
      SELECT *
      FROM orders
      ORDER BY created_at DESC
      `
    );

    const itemsResult = await pool.query(
      `
      SELECT *
      FROM order_items
      ORDER BY id ASC
      `
    );

    const orders = ordersResult.rows.map((order) => {
      const items = itemsResult.rows
        .filter((item) => item.order_id === order.id)
        .map((item) => ({
          id: item.product_id,
          name: item.product_name,
          qty: item.quantity,
          price: Number(item.price),
        }));

      return {
        id: order.id,
        orderNumber: order.order_number,
        customer: {
          firstName: order.first_name,
          lastName: order.last_name,
          email: order.email,
          phone: order.phone,
          address: order.address,
          city: order.city,
          postcode: order.postcode,
          notes: order.notes,
        },
        items,
        subtotal: Number(order.subtotal),
        total: Number(order.total),
        status: order.status,
        createdAt: order.created_at,
      };
    });

    res.json(orders);
  } catch (error) {
    next(error);
  }
}

async function updateOrderStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "processing",
      "completed",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        error: "Invalid order status",
      });
    }

    const result = await pool.query(
      `
      UPDATE orders
      SET status = $1
      WHERE id = $2
      RETURNING *
      `,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    res.json({
      message: "Order status updated",
      order: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createOrder,
  getAdminOrders,
  updateOrderStatus,
};
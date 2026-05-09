import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import {
  CAT_IMAGES,
  CAT_LABELS,
  PRODUCTS as FALLBACK_PRODUCTS,
  fmtPrice,
} from "../data/shopProducts";
import { createShopOrder, getShopProducts } from "../api/shopApi";
import type { CheckoutCustomer, ShopCartItem, ShopProduct } from "../types/shop";

function getSavedCart(): ShopCartItem[] {
  try {
    return JSON.parse(localStorage.getItem("bbh_cart") || "[]");
  } catch {
    return [];
  }
}

function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSort, setActiveSort] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);

  const [toast, setToast] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [cart, setCart] = useState<ShopCartItem[]>(getSavedCart);
  const [qtyMap, setQtyMap] = useState<Record<number, number>>({});

  const [customer, setCustomer] = useState<CheckoutCustomer>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    notes: "",
  });

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getShopProducts();
        setProducts(data);
      } catch {
        setProducts(FALLBACK_PRODUCTS);
        showToast("Backend unavailable. Showing local products.");
      } finally {
        setLoadingProducts(false);
      }
    }

    loadProducts();
  }, []);

  const saveCart = (nextCart: ShopCartItem[]) => {
    setCart(nextCart);
    localStorage.setItem("bbh_cart", JSON.stringify(nextCart));
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const cartTotal = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    return sum + Number(product?.price || 0) * item.qty;
  }, 0);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeFilter !== "all") {
      list = list.filter((product) => product.cat === activeFilter);
    }

    if (searchQuery.trim()) {
      list = list.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeSort === "az") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (activeSort === "za") {
      list.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (activeSort === "lohi") {
      list.sort((a, b) => Number(a.price ?? 9999) - Number(b.price ?? 9999));
    }

    if (activeSort === "hilo") {
      list.sort((a, b) => Number(b.price ?? 0) - Number(a.price ?? 0));
    }

    return list;
  }, [products, activeFilter, activeSort, searchQuery]);

  const getProductImage = (product: ShopProduct) => {
    return product.imageUrl || CAT_IMAGES[product.cat];
  };

  const addToCart = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const isPurchasable = product.price !== null && product.price > 0;

    if (!isPurchasable) {
      navigate("/contact");
      return;
    }

    const selectedQty = qtyMap[id] || 1;
    const existing = cart.find((item) => item.id === id);

    let nextCart: ShopCartItem[];

    if (existing) {
      nextCart = cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + selectedQty } : item
      );
    } else {
      nextCart = [...cart, { id, qty: selectedQty }];
    }

    saveCart(nextCart);
    showToast(`"${product.name}" added to cart!`);
  };

  const updateCartQty = (id: number, delta: number) => {
    const nextCart = cart
      .map((item) =>
        item.id === id ? { ...item, qty: item.qty + delta } : item
      )
      .filter((item) => item.qty > 0);

    saveCart(nextCart);
  };

  const removeFromCart = (id: number) => {
    saveCart(cart.filter((item) => item.id !== id));
  };

  const handleCustomerChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCustomer({
      ...customer,
      [event.target.id]: event.target.value,
    });
  };

  const isCustomerValid = () => {
    return (
      customer.firstName.trim() &&
      customer.lastName.trim() &&
      customer.email.trim() &&
      customer.address.trim() &&
      customer.city.trim() &&
      customer.postcode.trim()
    );
  };

  const buildOrderItems = () => {
    return cart.map((item) => {
      const product = products.find((p) => p.id === item.id);

      return {
        id: item.id,
        name: product?.name || "",
        qty: item.qty,
        price: Number(product?.price || 0),
      };
    });
  };

  const submitOrder = async () => {
    try {
      setSubmitting(true);

      const payload = {
        customer,
        items: buildOrderItems(),
        subtotal: cartTotal,
        total: cartTotal,
      };

      const data = await createShopOrder(payload);

      setOrderNumber(data.orderNumber || `BBH-${Date.now()}`);
      saveCart([]);
      setCheckoutStep(3);
    } catch {
      showToast("Could not place order. Please check backend.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <header className="shop-header">
        <div className="sh-inner">
          <Link to="/" className="sh-back">
            <i className="fa-solid fa-arrow-left"></i> Back to Site
          </Link>

          <Link to="/" className="sh-logo">
            <img src={logo} alt="Brow Beauty Hub" className="sh-logo-img" />
          </Link>

          <button className="sh-cart-btn" onClick={() => setCartOpen(true)}>
            <i className="fa-solid fa-bag-shopping"></i>
            <span className="cart-badge">{cartCount}</span>
            Cart
          </button>
        </div>
      </header>

      <section className="shop-hero">
        <p className="shop-hero-sub">Professional &amp; Retail</p>
        <h1>Our Product Store</h1>
        <p className="shop-hero-desc">
          Premium brow, lash, and skin care products used and recommended by our
          therapists.
        </p>
      </section>

      <main className="shop-main">
        <div className="filter-bar">
          {[
            ["all", "All"],
            ["brow", "Brow"],
            ["lash", "Lash"],
            ["skin", "Skin Care"],
            ["wax", "Wax & Tools"],
            ["tattoo", "Tattoo & PMU"],
            ["general", "General Beauty"],
          ].map(([cat, label]) => (
            <button
              key={cat}
              className={`fb-btn ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {label}
            </button>
          ))}

          <div className="sort-wrap">
            <select
              value={activeSort}
              onChange={(event) => setActiveSort(event.target.value)}
            >
              <option value="default">Sort: Default</option>
              <option value="az">Name A–Z</option>
              <option value="za">Name Z–A</option>
              <option value="lohi">Price: Low–High</option>
              <option value="hilo">Price: High–Low</option>
            </select>
          </div>
        </div>

        <div className="search-bar-wrap">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="search"
            placeholder="Search products…"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        <p className="results-count">
          {loadingProducts
            ? "Loading products..."
            : `Showing ${filteredProducts.length} product${
                filteredProducts.length !== 1 ? "s" : ""
              }`}
        </p>

        <div className="products-grid">
          {filteredProducts.map((product) => {
            const inCart = cart.some((item) => item.id === product.id);
            const isPurchasable = product.price !== null && product.price > 0;

            return (
              <div className="p-card" key={product.id}>
                <div className="p-card-img">
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    loading="lazy"
                  />

                  {product.tag && <span className="p-tag">{product.tag}</span>}
                </div>

                <div className="p-body">
                  <span className="p-cat">{CAT_LABELS[product.cat]}</span>

                  <h3 className="p-name">{product.name}</h3>

                  <p className="p-desc">{product.desc}</p>

                  <div className="p-footer">
                    <span
                      className={`p-price ${!isPurchasable ? "no-price" : ""}`}
                    >
                      {fmtPrice(product.price)}
                    </span>

                    {isPurchasable && (
                      <div className="p-qty">
                        <button
                          onClick={() =>
                            setQtyMap({
                              ...qtyMap,
                              [product.id]: Math.max(
                                (qtyMap[product.id] || 1) - 1,
                                1
                              ),
                            })
                          }
                        >
                          −
                        </button>

                        <span>{qtyMap[product.id] || 1}</span>

                        <button
                          onClick={() =>
                            setQtyMap({
                              ...qtyMap,
                              [product.id]: Math.min(
                                (qtyMap[product.id] || 1) + 1,
                                99
                              ),
                            })
                          }
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    className={`btn-add ${
                      !isPurchasable ? "enquire" : inCart ? "in-cart" : ""
                    }`}
                    onClick={() => addToCart(product.id)}
                  >
                    {!isPurchasable ? (
                      <>
                        <i className="fa-solid fa-envelope"></i> Enquire
                      </>
                    ) : inCart ? (
                      <>
                        <i className="fa-solid fa-check"></i> In Cart
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-bag-shopping"></i> Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <aside className={`cart-sidebar ${cartOpen ? "open" : ""}`}>
        <div className="cart-sidebar-inner">
          <div className="cart-header">
            <h2>Your Cart</h2>

            <button className="cart-close" onClick={() => setCartOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="cart-items">
            {cart.length === 0 ? (
              <div className="cart-empty">
                <i className="fa-solid fa-bag-shopping"></i>
                <p>Your cart is empty</p>
                <span>Add some products to get started!</span>
              </div>
            ) : (
              cart.map((item) => {
                const product = products.find((p) => p.id === item.id);
                if (!product) return null;

                return (
                  <div className="ci-row" key={item.id}>
                    <img
                      className="ci-img"
                      src={getProductImage(product)}
                      alt={product.name}
                    />

                    <div className="ci-info">
                      <p className="ci-name">{product.name}</p>
                      <p className="ci-price">
                        ${((product.price || 0) * item.qty).toFixed(2)}
                      </p>
                    </div>

                    <div className="ci-qty-wrap">
                      <div className="ci-qty">
                        <button onClick={() => updateCartQty(item.id, -1)}>
                          −
                        </button>

                        <span>{item.qty}</span>

                        <button onClick={() => updateCartQty(item.id, 1)}>
                          +
                        </button>
                      </div>

                      <button
                        className="ci-remove"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {cart.length > 0 && (
            <div className="cart-footer">
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <p className="cart-note">
                Shipping &amp; taxes calculated at checkout.
              </p>

              <button
                className="btn-checkout"
                onClick={() => {
                  setCartOpen(false);
                  setCheckoutOpen(true);
                  setCheckoutStep(1);
                }}
              >
                Proceed to Checkout <i className="fa-solid fa-arrow-right"></i>
              </button>

              <button className="btn-continue" onClick={() => setCartOpen(false)}>
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </aside>

      <div
        className={`cart-overlay ${cartOpen ? "open" : ""}`}
        onClick={() => setCartOpen(false)}
      ></div>

      <div className={`co-backdrop ${checkoutOpen ? "open" : ""}`}>
        <div className="co-modal">
          <button className="co-close" onClick={() => setCheckoutOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div className="co-steps">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`co-step ${
                  checkoutStep === step
                    ? "active"
                    : checkoutStep > step
                    ? "done"
                    : ""
                }`}
              >
                <span>{step}</span>{" "}
                {step === 1 ? "Details" : step === 2 ? "Review" : "Confirm"}
              </div>
            ))}
          </div>

          {checkoutStep === 1 && (
            <div className="co-panel">
              <h3>Contact &amp; Delivery Details</h3>

              <form className="co-form">
                <div className="co-row">
                  <div className="co-field">
                    <label>First Name *</label>
                    <input
                      id="firstName"
                      value={customer.firstName}
                      onChange={handleCustomerChange}
                    />
                  </div>

                  <div className="co-field">
                    <label>Last Name *</label>
                    <input
                      id="lastName"
                      value={customer.lastName}
                      onChange={handleCustomerChange}
                    />
                  </div>
                </div>

                <div className="co-field">
                  <label>Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    value={customer.email}
                    onChange={handleCustomerChange}
                  />
                </div>

                <div className="co-field">
                  <label>Phone Number</label>
                  <input
                    id="phone"
                    value={customer.phone}
                    onChange={handleCustomerChange}
                  />
                </div>

                <div className="co-field">
                  <label>Delivery Address *</label>
                  <input
                    id="address"
                    value={customer.address}
                    onChange={handleCustomerChange}
                  />
                </div>

                <div className="co-row">
                  <div className="co-field">
                    <label>City / Suburb *</label>
                    <input
                      id="city"
                      value={customer.city}
                      onChange={handleCustomerChange}
                    />
                  </div>

                  <div className="co-field">
                    <label>Postcode *</label>
                    <input
                      id="postcode"
                      value={customer.postcode}
                      onChange={handleCustomerChange}
                    />
                  </div>
                </div>

                <div className="co-field">
                  <label>Order Notes</label>
                  <textarea
                    id="notes"
                    rows={2}
                    value={customer.notes}
                    onChange={handleCustomerChange}
                  ></textarea>
                </div>

                <div className="co-actions">
                  <span></span>

                  <button
                    type="button"
                    className="btn-co-next"
                    onClick={() => {
                      if (!isCustomerValid()) {
                        showToast("Please fill all required fields.");
                        return;
                      }

                      setCheckoutStep(2);
                    }}
                  >
                    Continue to Review{" "}
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </form>
            </div>
          )}

          {checkoutStep === 2 && (
            <div className="co-panel">
              <h3>Review Your Order</h3>

              <div className="co-review-items">
                {cart.map((item) => {
                  const product = products.find((p) => p.id === item.id);
                  if (!product) return null;

                  return (
                    <div className="co-ri" key={item.id}>
                      <img src={getProductImage(product)} alt={product.name} />

                      <div>
                        <p className="co-ri-name">{product.name}</p>
                        <p className="co-ri-qty">Qty: {item.qty}</p>
                      </div>

                      <span className="co-ri-price">
                        ${((product.price || 0) * item.qty).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="co-totals">
                <div className="co-total-row">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>

                <div className="co-total-row">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>

                <div className="co-total-row total">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="co-delivery-summary">
                <strong>Deliver to:</strong>
                <br />
                {customer.firstName} {customer.lastName}
                <br />
                {customer.address}, {customer.city} {customer.postcode}
                <br />
                {customer.email}
              </div>

              <div className="co-actions">
                <button
                  type="button"
                  className="btn-co-back"
                  onClick={() => setCheckoutStep(1)}
                >
                  <i className="fa-solid fa-arrow-left"></i> Back
                </button>

                <button
                  type="button"
                  className="btn-co-next"
                  onClick={submitOrder}
                  disabled={submitting}
                >
                  {submitting ? "Placing order..." : "Place Order"}{" "}
                  <i className="fa-solid fa-check"></i>
                </button>
              </div>
            </div>
          )}

          {checkoutStep === 3 && (
            <div className="co-panel">
              <div className="co-success">
                <div className="co-success-icon">
                  <i className="fa-solid fa-circle-check"></i>
                </div>

                <h3>Order Placed!</h3>

                <p>
                  Thank you, {customer.firstName}! We have received your order
                  and will contact you shortly.
                </p>

                <p className="co-order-num">Order reference: {orderNumber}</p>

                <button
                  className="btn-co-next"
                  onClick={() => {
                    setCheckoutOpen(false);
                    setCheckoutStep(1);
                  }}
                >
                  Back to Shop
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`shop-toast ${toast ? "show" : ""}`}>
        <i className="fa-solid fa-circle-check"></i>
        <span>{toast || "Added to cart!"}</span>
      </div>

      <footer className="shop-footer">
        <p>
          &copy; 2026 Brow Beauty Hub &mdash;{" "}
          <a
            href="https://www.instagram.com/eyebrowbeautyhub/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>{" "}
          &nbsp;|&nbsp; <Link to="/">Back to Website</Link>
        </p>
      </footer>
    </main>
  );
}

export default Products;
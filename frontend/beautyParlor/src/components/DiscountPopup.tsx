import { useEffect, useState } from "react";

function DiscountPopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const alreadyClosed = localStorage.getItem("discountPopupClosed");

    if (!alreadyClosed) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    localStorage.setItem("discountPopupClosed", "true");
    setShowPopup(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    closePopup();
  };

  if (!showPopup) return null;

  return (
    <>
      <div
        className="discount-overlay"
        id="discountOverlay"
        onClick={closePopup}
      ></div>

      <div
        aria-labelledby="discountTitle"
        aria-modal="true"
        className="discount-popup"
        id="discountPopup"
        role="dialog"
      >
        <button
          aria-label="Close"
          className="discount-close"
          id="discountClose"
          onClick={closePopup}
        >
          ×
        </button>

        <div className="discount-body">
          <p className="discount-eyebrow">Limited Offer</p>

          <h2 className="discount-title" id="discountTitle">
            GET 10% OFF
            <br />
            YOUR FIRST ORDER
          </h2>

          <p className="discount-sub">
            Sign up and we'll send your discount code straight to your inbox.
          </p>

          <form className="discount-form" id="discountForm" onSubmit={handleSubmit}>
            <input
              autoComplete="given-name"
              id="dpFirst"
              placeholder="First name"
              required
              type="text"
            />

            <input
              autoComplete="email"
              id="dpEmail"
              placeholder="Email"
              required
              type="email"
            />

            <button className="discount-btn" type="submit">
              CLAIM DISCOUNT
            </button>
          </form>

          <p className="discount-legal">
            By signing up, you agree to receive marketing emails from Brow
            Beauty Hub.
          </p>
        </div>
      </div>
    </>
  );
}

export default DiscountPopup;
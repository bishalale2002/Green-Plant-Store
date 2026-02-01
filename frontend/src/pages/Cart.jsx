import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../components/context/cart.jsx";

const Cart = () => {
  const [cart, setCart] = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  // 🔢 Quantity controls
  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const decreaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // 🧮 Totals
  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 🛍️ Place order
  const handleBuy = async () => {
    if (!customer.name || !customer.phone || !customer.address) {
      alert("Please fill all required fields");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const orderData = {
        products: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        totalAmount,
        customerName: customer.name,
        phone: customer.phone,
        email: customer.email,
        address: customer.address,
      };

      await axios.post(
        "http://localhost:5000/api/orders",
        orderData
      );

      alert(
        "Order placed successfully!\nYour order is pending. We will contact you soon."
      );

      setCart([]);
      localStorage.removeItem("cart");
      setCustomer({
        name: "",
        phone: "",
        email: "",
        address: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to place order");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <h3 className="mb-4">🛒 Your Cart</h3>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="row">
            {/* LEFT: CART ITEMS */}
            <div className="col-md-7">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="row align-items-center mb-3 p-3 border rounded"
                >
                  <div className="col-md-3">
                    <img
                      src={`http://localhost:5000/uploads/${item.photo}`}
                      alt={item.name}
                      className="img-fluid rounded"
                    />
                  </div>

                  <div className="col-md-4">
                    <h6>{item.name}</h6>
                    <p>Rs. {item.price}</p>
                  </div>

                  <div className="col-md-3 d-flex align-items-center gap-2">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => decreaseQty(item._id)}
                    >
                      −
                    </button>
                    <strong>{item.quantity}</strong>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => increaseQty(item._id)}
                    >
                      +
                    </button>
                  </div>

                  <div className="col-md-2 text-end">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeItem(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-4">
                <h6>Total Quantity: {totalQuantity}</h6>
                <h5 className="text-success">
                  Total Amount: Rs. {totalAmount}
                </h5>
              </div>
            </div>

            {/* RIGHT: CUSTOMER FORM */}
            <div className="col-md-5">
              <div className="card p-4 shadow-sm">
                <h5 className="mb-3">Delivery Details</h5>

                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Full Name"
                  value={customer.name}
                  onChange={(e) =>
                    setCustomer({ ...customer, name: e.target.value })
                  }
                />

                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Phone Number"
                  value={customer.phone}
                  onChange={(e) =>
                    setCustomer({ ...customer, phone: e.target.value })
                  }
                />

                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Email (optional)"
                  value={customer.email}
                  onChange={(e) =>
                    setCustomer({ ...customer, email: e.target.value })
                  }
                />

                <textarea
                  className="form-control mb-3"
                  placeholder="Delivery Location / Address"
                  rows="3"
                  value={customer.address}
                  onChange={(e) =>
                    setCustomer({ ...customer, address: e.target.value })
                  }
                ></textarea>

                <button
                  className="btn btn-success w-100"
                  onClick={handleBuy}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Cart;

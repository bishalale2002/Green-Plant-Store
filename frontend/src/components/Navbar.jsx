import { NavLink, Link } from "react-router-dom";
import { useCart } from "./context/cart.jsx";

const Navbar = () => {
  const [cart] = useCart();

  // total quantity
  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          🌱 GreenPlant
        </Link>

        {/* Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">

            <li className="nav-item">
              <NavLink to="/" end className="nav-link">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/products" className="nav-link">
                Products
              </NavLink>
            </li>

            {/* 🛒 CART */}
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link position-relative">
                Cart
                {totalItems > 0 && (
                  <span className="badge bg-danger ms-1">
                    {totalItems}
                  </span>
                )}
              </NavLink>
            </li>

            <li className="nav-item">
              <Link className="btn btn-light btn-sm px-3" to="/login">
                Admin Login
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🌱 Green Plant Store
        </Link>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/admin/dashboard">
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;

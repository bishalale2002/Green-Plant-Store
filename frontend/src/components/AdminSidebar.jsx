import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="bg-light border-end vh-100 p-3">
      <h5 className="mb-4">Admin Panel</h5>

      <ul className="nav flex-column gap-2">
        <li className="nav-item">
          <Link className="nav-link" to="/admin/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/create-category">
            Create Category
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/create-product">
            Upload Product
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/orders">
            Manage Orders
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;

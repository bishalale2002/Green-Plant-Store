import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminSidebar from "../components/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <Header />

      <div className="d-flex">
        <AdminSidebar />
        <div className="flex-grow-1 p-4">
          <Outlet />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminLayout;

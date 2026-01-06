const AdminDashboard = () => {
  return (
    <>
      <h2 className="mb-4">Admin Dashboard</h2>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h6>Total Products</h6>
              <h2>24</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h6>Categories</h6>
              <h2>6</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h6>Orders</h6>
              <h2>12</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

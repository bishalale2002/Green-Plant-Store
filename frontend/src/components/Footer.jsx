const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-4 mt-5">
      <div className="container">
        <div className="row">

          <div className="col-md-4 mb-3">
            <h5>🌱 Green Plant Store</h5>
            <p className="small">
              Your trusted online plant store promoting green living and
              sustainable lifestyle.
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Home</a></li>
              <li><a href="#" className="text-light text-decoration-none">Products</a></li>
              <li><a href="#" className="text-light text-decoration-none">About</a></li>
              <li><a href="#" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h6>Contact</h6>
            <p className="small mb-1">📍 Kathmandu, Nepal</p>
            <p className="small mb-1">📧 support@greenplant.com</p>
            <p className="small">📞 +977-98XXXXXXXX</p>
          </div>

        </div>

        <hr className="border-secondary" />
        <p className="text-center small mb-0 pb-3">
          © {new Date().getFullYear()} Green Plant Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

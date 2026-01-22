import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        className="py-5 d-flex flex-wrap align-items-center justify-content-between"
        style={{
          background: "linear-gradient(135deg, #f8fdf8 0%, #e8f5e9 100%)",
          gap: "2rem",
          padding: "5% 8%",
        }}
      >
        {/* Text */}
        <div style={{ flex: "1", minWidth: "300px" }}>
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "3rem",
              color: "#1b5e20",
              fontWeight: "700",
            }}
          >
            Grow Your Space with Green Plants 🌱
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#455a64", lineHeight: "1.7", marginTop: "20px" }}>
            Discover carefully curated indoor and outdoor plants that refresh your home and bring nature closer to you.
            Each plant is handpicked for quality, health, and beauty.
          </p>
          <button className="btn btn-success btn-lg mt-3">Explore Plants</button>
        </div>

        {/* Image */}
        <div style={{ flex: "1", minWidth: "300px" }}>
          <img
            src="https://images.stockcake.com/public/a/2/2/a220b6ed-47e2-451b-b32d-07d68e08367a/indoor-plant-shop-stockcake.jpg"
            alt="Indoor Plant Shop"
            className="img-fluid rounded shadow"
            style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5" style={{ backgroundColor: "#ffffff", padding: "5% 8%" }}>
        <h2 className="text-center fw-bold mb-5" style={{ color: "#1b5e20" }}>
          Why Choose Green Haven?
        </h2>
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-success">
              <div className="card-body">
                <h5 className="text-success fw-semibold">🌿 Fresh & Healthy</h5>
                <p>
                  Carefully grown and maintained plants for long life. Each plant is nurtured with expert care to ensure it thrives in your home.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-success">
              <div className="card-body">
                <h5 className="text-success fw-semibold">🚚 Safe Delivery</h5>
                <p>
                  Protective packaging ensures plants arrive fresh. Specialized boxes and cushioning guarantee your plants reach you in perfect condition.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-success">
              <div className="card-body">
                <h5 className="text-success fw-semibold">💚 Eco Conscious</h5>
                <p>
                  Supporting green living and sustainable choices. Our packaging is 100% recyclable and we partner with eco-friendly suppliers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-5" style={{ backgroundColor: "#f1f8f4", padding: "5% 8%" }}>
        <h2 className="text-center fw-bold mb-5" style={{ color: "#1b5e20" }}>
          Shop by Category
        </h2>
        <div className="row g-4 justify-content-center">
          {/* Indoor Plants */}
          <div className="col-md-4">
            <div className="card h-100 border-success">
              <img
                src="https://images.unsplash.com/photo-1463320726281-696a485928c7?w=800"
                className="card-img-top"
                alt="Indoor Plants"
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="text-success fw-semibold">Indoor Plants</h5>
                <p>Perfect for offices, living rooms, and bedrooms.</p>
              </div>
            </div>
          </div>

          {/* Outdoor Plants */}
          <div className="col-md-4">
            <div className="card h-100 border-success">
              <img
                src="https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=800"
                className="card-img-top"
                alt="Outdoor Plants"
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="text-success fw-semibold">Outdoor Plants</h5>
                <p>Transform your garden and balcony spaces.</p>
              </div>
            </div>
          </div>

          {/* Succulents & Cacti */}
          <div className="col-md-4">
            <div className="card h-100 border-success">
              <img
                src="https://images.unsplash.com/photo-1459156212016-c812468e2115?w=800"
                className="card-img-top"
                alt="Succulents & Cacti"
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="text-success fw-semibold">Succulents & Cacti</h5>
                <p>Low-maintenance beauties for busy lifestyles.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;

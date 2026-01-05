import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-success text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-5 fw-bold">
                Grow Your Space with Green Plants 🌱
              </h1>
              <p className="lead mt-3">
                Discover indoor & outdoor plants that refresh your home
                and bring nature closer to you.
              </p>
              <button className="btn btn-light btn-lg mt-3">
                Explore Plants
              </button>
            </div>

            <div className="col-md-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1524594154908-edd66594fd4b"
                alt="Plants"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">
            Why Choose Us?
          </h2>

          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5>🌿 Fresh & Healthy</h5>
                  <p>
                    Carefully grown and maintained plants for long life.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5>🚚 Safe Delivery</h5>
                  <p>
                    Protective packaging ensures plants arrive fresh.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5>💚 Eco Conscious</h5>
                  <p>
                    Supporting green living and sustainable choices.
                  </p>
                </div>
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

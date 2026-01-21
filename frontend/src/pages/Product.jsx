import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Product.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const limit = 10; // 10 products per load

  useEffect(() => {
    fetchProducts(page);
  }, []);

  const fetchProducts = async (pageNum = 1) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/admin/product?limit=${limit}&page=${pageNum}`
      );
      if (data.length < limit) setHasMore(false); // no more products
      setProducts((prev) => [...prev, ...data]);
    } catch (error) {
      console.error("Failed to load products", error);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    fetchProducts(nextPage);
    setPage(nextPage);
  };

  const handleAddToCart = (product) => {
    alert(`${product.name} added to cart`);
    // Later: cart logic
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">
        {products.map((product) => (
          <div
            key={product._id}
            className="row mb-5 product-card shadow-sm p-3 rounded align-items-start"
          >
            {/* LEFT: Product Image */}
            <div className="col-md-4 mb-3 mb-md-0 text-center">
              <div className="product-image-wrapper">
                <img
                  src={
                    product.photo
                      ? `http://localhost:5000/uploads/${product.photo}`
                      : "/placeholder.png"
                  }
                  alt={product.name}
                  className="img-fluid rounded product-image"
                />
              </div>

              <div className="mt-3 text-start">
                <h5 className="fw-bold">{product.name}</h5>
                <p className="text-success fw-bold">Rs. {product.price}</p>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* RIGHT: Description */}
            <div className="col-md-8">
              <div className="description-box">
                <p className="mb-0">{product.description || "No description available"}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center">
            <button className="btn btn-outline-success" onClick={loadMore}>
              Load More
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Product;

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Product.css";
import { useCart } from "../components/context/cart.jsx";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [cart, setCart] = useCart();
  const limit = 5;

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [page]);

  const fetchProducts = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/admin/product?page=${page}&limit=${limit}`
      );

      const { products: newProducts, total } = res.data;

      if (!Array.isArray(newProducts)) {
        setHasMore(false);
        return;
      }

      setProducts((prev) => {
        const ids = new Set(prev.map((p) => p._id));
        const filtered = newProducts.filter((p) => !ids.has(p._id));
        return [...prev, ...filtered];
      });

      if (page * limit >= total) setHasMore(false);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ OPTIMIZED ADD TO CART
  const handleAddToCart = (product) => {
    if (!product?._id) return;

    const updatedCart = [...cart];
    const index = updatedCart.findIndex(
      (item) => item._id === product._id
    );

    if (index !== -1) {
      updatedCart[index].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Item added to cart");
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">
        {products.map((product) => (
          <div
            key={product._id}
            className="row mb-4 product-card shadow-sm p-3 rounded"
          >
            {/* IMAGE */}
            <div className="col-md-4">
              <div className="product-image-wrapper">
                <img
                  src={`http://localhost:5000/uploads/${product.photo}`}
                  alt={product.name}
                  className="product-image"
                />
              </div>

              <h5 className="mt-3 fw-bold">{product.name}</h5>
              <p className="text-success fw-bold">Rs. {product.price}</p>

              <button
                className="btn btn-secondary"
                onClick={() => handleAddToCart(product)}
              >
                Add To Cart
              </button>
            </div>

            {/* DESCRIPTION */}
            <div className="col-md-8">
              <div className="description-box">
                {product.description || "No description available"}
              </div>
            </div>
          </div>
        ))}

        {/* LOAD MORE */}
        <div className="text-center">
          <button
            className="btn btn-outline-success"
            disabled={!hasMore || loading}
            onClick={() => setPage((p) => p + 1)}
          >
            {loading ? "Loading..." : hasMore ? "Load More" : "No More Products"}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Product;

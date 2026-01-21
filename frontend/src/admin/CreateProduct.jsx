import { useEffect, useState } from "react";
import axios from "axios";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    quantity: "",
  });
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get("/api/admin/category");
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append("name", form.name);
    productData.append("price", form.price);
    productData.append("description", form.description);
    productData.append("category", form.category);
    productData.append("quantity", form.quantity);
    productData.append("photo", photo);

    try {
      await axios.post("/api/admin/product", productData);
      alert("Product uploaded successfully");
    } catch (err) {
  console.error(err.response?.data || err.message);
  alert(err.response?.data?.message || "Product upload failed");
}
  };

  return (
    <>
      <h3 className="mb-4">Upload Product</h3>

      <div className="card shadow-sm p-4 col-md-8">
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            name="name"
            placeholder="Product name"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            className="form-control mb-3"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            required
          />

          <textarea
            className="form-control mb-3"
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />

          <select
            className="form-control mb-3"
            name="category"
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="form-control mb-3"
            name="quantity"
            placeholder="Quantity"
            onChange={handleChange}
          />

          <input
            type="file"
            className="form-control mb-3"
            onChange={(e) => setPhoto(e.target.files[0])}
            required
          />

          <button className="btn btn-success">
            Upload Product
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateProduct;

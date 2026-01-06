import { useState } from "react";
import axios from "axios";

const CreateCategory = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/admin/category", { name });
    setName("");
    alert("Category created successfully");
  };

  return (
    <>
      <h3 className="mb-4">Create Category</h3>

      <div className="card shadow-sm p-4 col-md-6">
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button className="btn btn-success">Create Category</button>
        </form>
      </div>
    </>
  );
};

export default CreateCategory;

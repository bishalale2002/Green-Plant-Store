const CreateProduct = () => {
  return (
    <>
      <h3 className="mb-4">Upload Product</h3>

      <div className="card p-4 shadow-sm col-md-8">
        <input className="form-control mb-3" placeholder="Product name" />
        <input className="form-control mb-3" placeholder="Price" />
        <textarea className="form-control mb-3" placeholder="Description" />
        <input type="file" className="form-control mb-3" />
        <button className="btn btn-success">Upload</button>
      </div>
    </>
  );
};

export default CreateProduct;

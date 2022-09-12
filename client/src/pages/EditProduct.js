import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const EditProduct = ({ match }) => {
  console.log(match);
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
    image: "",
  });
  useEffect(() => {
    fetch(`http://localhost:5000/restaurant/${match.params.id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append("image", data.image);
      formData.append("name", data.name);
      formData.append("quantity", data.quantity);
      formData.append("pricegross", data.pricegross);
      formData.append("pricenet", data.pricenet); 

      const res = await fetch(`http://localhost:5000/restaurant/${match.params.id}`, {
        method: "PUT",
        body: formData,
      });
      if (res.ok) {
        setData({ name: "", image: "" });
        history.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Enter Product Name"
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange("name")}
        />
      </div>
      <div className="mb-3">
        <input
          min="0"
          step="1"
          className="form-control"
          placeholder="Quantity"
          type="number"
          name="quantity"
          value={data.quantity}
          onChange={handleChange("quantity")}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Price per Qty (Gross)"
          type="text"
          name="pricegross"
          value={data.pricegross}
          onChange={handleChange("pricegross")}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Price per Qty (net)"
          type="text"
          name="pricenet"
          value={data.pricenet}
          onChange={handleChange("pricenet")}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          type="file"
          accept="image/*"
          name="image"
          onChange={handleChange("image")}
        />
      </div>
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Update
        </button>
        <Link to={`/`} style={{ textDecoration: "none", marginLeft: '10px' }}>
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default EditProduct;

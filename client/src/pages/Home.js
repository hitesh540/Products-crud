import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "./../redux/features/ProductSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { post, body } = useSelector((state) => ({
    ...state.app,
  }));

  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(getPost());

      const res = await fetch(`http://localhost:5000/restaurant`);
      const data = await res.json();
      setProducts(data);

      console.log('post---', post);
      console.log('body----', body);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/restaurant/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const updatedproducts = products.filter((user) => user._id !== id);
        setProducts(updatedproducts);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="row">
      {products?.map((user) => (
        <div className="col-md-3 card me-3 mt-2 p-0" key={user._id}>
          <img src={user.avatar} alt="" width={"100%"} height={200} />
          <div className="p-2">
            <h3>{user.name}</h3>
            <div className="d-flex justify-content-between align-items-center">
              <Link to={`/edit/${user._id}`} style={{ textDecoration: "none" }}>
                Edit
              </Link>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(user._id)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;

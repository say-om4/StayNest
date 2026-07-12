import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import API from "../../services/api";
import { toast } from "react-toastify";

function AddPG() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: "",
    city: "",
    address: "",
    price: "",
    rating: "",
    room_type: "Single Sharing",
    gender: "Boys",
    food: 1,
    wifi: 1,
    bathroom: "Attached",
    parking: 1,
    power_backup: 1,
    image: "pg1.jpg",
    description: "",
  });

  useEffect(() => {

    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "admin") {
      toast.error("Access Denied");
      navigate("/");
      return;
    }

  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      const res = await API.post("/admin/addPG.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("PG Added Successfully");
        navigate("/pgs");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Server Error");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <h2 className="mb-4">Add New PG</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">PG Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              className="form-control"
              name="address"
              rows="3"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">

            <div className="col-md-6 mb-3">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Rating</label>
              <input
                type="number"
                step="0.1"
                className="form-control"
                name="rating"
                value={form.rating}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">

            <div className="col-md-6 mb-3">
              <label>Room Type</label>
              <select
                className="form-control"
                name="room_type"
                value={form.room_type}
                onChange={handleChange}
              >
                <option>Single Sharing</option>
                <option>Double Sharing</option>
                <option>Triple Sharing</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label>Gender</label>
              <select
                className="form-control"
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <option>Boys</option>
                <option>Girls</option>
                <option>Unisex</option>
              </select>
            </div>

          </div>

          <div className="mb-3">
            <label>Description</label>
            <textarea
              className="form-control"
              rows="4"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Upload Image</label>

            <input
              type="file"
              className="form-control"
              name="image"
              accept="image/*"
              onChange={(e) => {
                setForm({
                  ...form,
                  image: e.target.files[0],
                });
              }}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
          >
            Add PG
          </button>

        </form>

      </div>

    </>
  );
}

export default AddPG;
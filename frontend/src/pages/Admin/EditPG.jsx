import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import API from "../../services/api";
import { toast } from "react-toastify";

function EditPG() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    id: "",
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

    API.get(`/pg/getSinglePG.php?id=${id}`)
      .then((res) => {
        if (res.data.success) {
          setForm(res.data.data);
        }
      })
      .catch(console.error);

  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/admin/updatePG.php", form);

      if (res.data.success) {
        toast.success("PG Updated Successfully");
        navigate("/admin");
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

        <h2 className="mb-4">Edit PG</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>PG Name</label>
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
            <label>City</label>
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
            <label>Address</label>
            <textarea
              className="form-control"
              rows="3"
              name="address"
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
            <label>Image</label>
            <select
              className="form-control"
              name="image"
              value={form.image}
              onChange={handleChange}
            >
              <option value="pg1.jpg">pg1.jpg</option>
              <option value="pg2.jpg">pg2.jpg</option>
              <option value="pg3.jpg">pg3.jpg</option>
            </select>
          </div>

          <div className="row">

            <div className="col-md-3 mb-3">
              <label>
                <input
                  type="checkbox"
                  checked={Number(form.food) === 1}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      food: e.target.checked ? 1 : 0,
                    })
                  }
                />
                {" "}Food
              </label>
            </div>

            <div className="col-md-3 mb-3">
              <label>
                <input
                  type="checkbox"
                  checked={Number(form.wifi) === 1}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      wifi: e.target.checked ? 1 : 0,
                    })
                  }
                />
                {" "}WiFi
              </label>
            </div>

            <div className="col-md-3 mb-3">
              <label>
                <input
                  type="checkbox"
                  checked={Number(form.parking) === 1}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      parking: e.target.checked ? 1 : 0,
                    })
                  }
                />
                {" "}Parking
              </label>
            </div>

            <div className="col-md-3 mb-3">
              <label>
                <input
                  type="checkbox"
                  checked={Number(form.power_backup) === 1}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      power_backup: e.target.checked ? 1 : 0,
                    })
                  }
                />
                {" "}Power Backup
              </label>
            </div>

          </div>

          <button
            type="submit"
            className="btn btn-warning w-100"
          >
            Update PG
          </button>

        </form>

      </div>
    </>
  );
}

export default EditPG;
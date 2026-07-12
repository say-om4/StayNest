import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import API from "../../services/api";
import { toast } from "react-toastify";
import "./AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [pgs, setPgs] = useState([]);

  const loadPGs = () => {
    API.get("/pg/getAllPGs.php")
      .then((res) => {
        if (res.data.success) {
          setPgs(res.data.data);
        }
      })
      .catch(console.error);
  };

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

    loadPGs();

  }, []);

  const deletePG = async (id) => {

    if (!window.confirm("Delete this PG?")) return;

    try {

      const res = await API.post("/admin/deletePG.php", {
        id,
      });

      if (res.data.success) {
        toast.success("PG Deleted");
        loadPGs();
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

        <div className="d-flex justify-content-between mb-4">

          <h2>Admin Dashboard</h2>

          <Link
            to="/admin/add-pg"
            className="btn btn-success"
          >
            Add PG
          </Link>

        </div>

        <table className="table table-bordered table-hover">

          <thead>

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>City</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {pgs.map((pg) => (

              <tr key={pg.id}>

                <td>{pg.id}</td>

                <td>{pg.name}</td>

                <td>{pg.city}</td>

                <td>₹{pg.price}</td>

                <td>

                  <Link
                    to={`/admin/edit/${pg.id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deletePG(pg.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default AdminDashboard;
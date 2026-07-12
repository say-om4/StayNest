import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import API from "../../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../components/Footer/Footer";

import pg1 from "../../assets/images/pgs/pg1.jpg";
import pg2 from "../../assets/images/pgs/pg2.jpg";
import pg3 from "../../assets/images/pgs/pg3.jpg";

import "./Wishlist.css";

const imageMap = {
  "pg1.jpg": pg1,
  "pg2.jpg": pg2,
  "pg3.jpg": pg3,
};

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const removeWishlist = async (pgId) => {
    try {
      const res = await API.post("/wishlist/removeWishlist.php", {
        user_id: user.id,
        pg_id: pgId,
      });

      if (res.data.success) {
        toast.success(res.data.message);

        setWishlist((prev) => prev.filter((item) => item.id !== pgId));
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Server Error");
    }
  };

  useEffect(() => {
    if (!user) return;

    API.get(`/wishlist/getWishlist.php?user_id=${user.id}`)
      .then((res) => {
        if (res.data.success) {
          setWishlist(res.data.data);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <h2 className="mb-4">My Wishlist</h2>

        {wishlist.length === 0 ? (
          <h5>No PG in Wishlist</h5>
        ) : (
          <div className="row">

            {wishlist.map((pg) => (

              <div className="col-md-4 mb-4" key={pg.id}>

                <div className="card shadow">

                  <img
                    src={
                      imageMap[pg.image]
                        ? imageMap[pg.image]
                        : `http://localhost/PG-Life/backend/uploads/${pg.image}`
                    }
                    className="card-img-top"
                    alt={pg.name}
                  />

                  <div className="card-body">

                    <h5>{pg.name}</h5>

                    <p>{pg.city}</p>

                    <h6>₹{pg.price}/Month</h6>

                    <Link
                      to={`/pg-details/${pg.id}`}
                      className="btn btn-primary w-100"
                    >
                      View Details
                    </Link>

                    <button
                      className="btn btn-danger w-100 mt-2"
                      onClick={() => removeWishlist(pg.id)}
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
      <Footer />
    </>
  );
}

export default Wishlist;
import "./FeaturedPG.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

import { FaMapMarkerAlt, FaWifi, FaUtensils } from "react-icons/fa";
import { MdBathroom } from "react-icons/md";
import { toast } from "react-toastify";

import pg1 from "../../assets/images/pgs/pg1.jpg";
import pg2 from "../../assets/images/pgs/pg2.jpg";
import pg3 from "../../assets/images/pgs/pg3.jpg";

const imageMap = {
  "pg1.jpg": pg1,
  "pg2.jpg": pg2,
  "pg3.jpg": pg3,
};

function FeaturedPG() {
  const [pgs, setPgs] = useState([]);
  const handleWishlist = async (pgId) => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Please login first");
      return;
    }

    try {

      const res = await API.post("/wishlist/addWishlist.php", {
        user_id: user.id,
        pg_id: pgId,
      });

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }

    } catch (err) {
      console.error(err);
      toast.error("Server Error");
    }

  };

  useEffect(() => {
    API.get("/pg/getAllPGs.php")
      .then((res) => {
        setPgs(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="featured-pg">
      <div className="container">

        <div className="text-center mb-5">
          <h2>Featured PGs</h2>
          <p>Explore our most popular verified PG accommodations.</p>
        </div>

        <div className="row g-4">

          {pgs.map((pg) => (

            <div className="col-lg-4 col-md-6" key={pg.id}>

              <div className="pg-card">

                <div className="pg-image">

                  <img
                    src={
                      imageMap[pg.image]
                        ? imageMap[pg.image]
                        : `http://localhost/PG-Life/backend/uploads/${pg.image}`
                    }
                    alt={pg.name}
                  />

                  <span className="rating-badge">
                    ⭐ {pg.rating}
                  </span>

                  <button
                    className="wishlist-btn"
                    onClick={() => handleWishlist(pg.id)}
                  >
                    ❤️
                  </button>

                </div>

                <div className="pg-content">

                  <h4>{pg.name}</h4>

                  <p>
                    <FaMapMarkerAlt /> {pg.city}
                  </p>

                  <h5>₹{pg.price}/Month</h5>

                  <div className="pg-features">

                    <span>{pg.room_type}</span>

                    <span>
                      <FaWifi /> WiFi
                    </span>

                    <span>
                      <FaUtensils /> Food
                    </span>

                    <span>
                      <MdBathroom /> {pg.bathroom}
                    </span>

                  </div>

                  <Link
                    to={`/pg-details/${pg.id}`}
                    className="btn btn-primary w-100 mt-3"
                  >
                    View Details
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default FeaturedPG;
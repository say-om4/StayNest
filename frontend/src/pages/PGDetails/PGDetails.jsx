import "./PGDetails.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../components/Footer/Footer";

import pg1 from "../../assets/images/pgs/pg1.jpg";
import pg2 from "../../assets/images/pgs/pg2.jpg";
import pg3 from "../../assets/images/pgs/pg3.jpg";

const imageMap = {
  "pg1.jpg": pg1,
  "pg2.jpg": pg2,
  "pg3.jpg": pg3,
};

function PGDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBooking = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      const res = await API.post("/booking/bookPG.php", {
        user_id: user.id,
        pg_id: id,
      });

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Server Error");
      console.error(error);
    }
  };

  const [pg, setPg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/pg/getSinglePG.php?id=${id}`)
      .then((res) => {
        if (res.data.success) {
          setPg(res.data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container text-center mt-5">
          <h3>Loading...</h3>
        </div>
      </>
    );
  }

  if (!pg) {
    return (
      <>
        <Navbar />
        <div className="container text-center mt-5">
          <h2>PG Not Found</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="pg-details">
        <div className="container">
          <div className="row g-4">

            <div className="col-lg-6">
              <img
                src={
                  imageMap[pg.image]
                    ? imageMap[pg.image]
                    : `http://localhost/PG-Life/backend/uploads/${pg.image}`
                }
                alt={pg.name}
                className="pg-main-image"
              />
            </div>

            <div className="col-lg-6">
              <div className="details-card">

                <span className="rating">⭐ {pg.rating}</span>

                <h2>{pg.name}</h2>

                <p>📍 {pg.address}</p>

                <h3>₹{pg.price} / Month</h3>

                <div className="facility-list">
                  <span>🛏 {pg.room_type}</span>
                  <span>👤 {pg.gender}</span>
                  <span>{pg.food == 1 ? "🍽 Food Included" : "❌ No Food"}</span>
                  <span>{pg.wifi == 1 ? "📶 Free WiFi" : "❌ No WiFi"}</span>
                  <span>🚿 {pg.bathroom}</span>
                  <span>{pg.parking == 1 ? "🚗 Parking" : "❌ No Parking"}</span>
                  <span>{pg.power_backup == 1 ? "⚡ Power Backup" : "❌ No Backup"}</span>
                </div>

                <hr />

                <h4>Description</h4>

                <p>{pg.description}</p>

                <button
                  className="btn btn-primary btn-lg w-100 mt-3"
                  onClick={handleBooking}
                >
                  Book Now
                </button>

              </div>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default PGDetails;
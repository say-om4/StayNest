import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import API from "../../services/api";
import "./MyBookings.css";
import Footer from "../../components/Footer/Footer";

import pg1 from "../../assets/images/pgs/pg1.jpg";
import pg2 from "../../assets/images/pgs/pg2.jpg";
import pg3 from "../../assets/images/pgs/pg3.jpg";

const imageMap = {
  "pg1.jpg": pg1,
  "pg2.jpg": pg2,
  "pg3.jpg": pg3,
};

function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    API.get(`/booking/getBookings.php?user_id=${user.id}`)
      .then((res) => {
        if (res.data.success) {
          setBookings(res.data.data);
        }
      })
      .catch(console.error);

  }, []);

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <h2 className="mb-4">My Bookings</h2>

        {bookings.length === 0 ? (

          <div className="alert alert-warning">
            No Bookings Found
          </div>

        ) : (

          <div className="row">

            {bookings.map((pg) => (

              <div className="col-md-4 mb-4" key={pg.booking_id}>

                <div className="card shadow">

                  <img
                    src={imageMap[pg.image]}
                    className="card-img-top"
                    alt={pg.name}
                  />

                  <div className="card-body">

                    <h5>{pg.name}</h5>

                    <p>{pg.city}</p>

                    <p>
                      ₹{pg.price}/Month
                    </p>

                    <small>
                      Booked On :
                      {" "}
                      {pg.booking_date}
                    </small>

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

        )}

      </div>
      <Footer />

    </>
  );
}

export default MyBookings;
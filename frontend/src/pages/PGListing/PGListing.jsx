import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import API from "../../services/api";
import Footer from "../../components/Footer/Footer";
import "./PGListing.css";

import pg1 from "../../assets/images/pgs/pg1.jpg";
import pg2 from "../../assets/images/pgs/pg2.jpg";
import pg3 from "../../assets/images/pgs/pg3.jpg";

const imageMap = {
  "pg1.jpg": pg1,
  "pg2.jpg": pg2,
  "pg3.jpg": pg3,
};

function PGListing() {
  const [pgs, setPgs] = useState([]);
  const [filteredPgs, setFilteredPgs] = useState([]);

  const [search, setSearch] = useState("");
  const [roomType, setRoomType] = useState("");

  useEffect(() => {
    API.get("/pg/getAllPGs.php")
      .then((res) => {
        if (res.data.success) {
          setPgs(res.data.data);
          setFilteredPgs(res.data.data);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    let data = [...pgs];

    if (search.trim() !== "") {
      data = data.filter(
        (pg) =>
          pg.name.toLowerCase().includes(search.toLowerCase()) ||
          pg.city.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (roomType !== "") {
      data = data.filter((pg) => pg.room_type === roomType);
    }

    setFilteredPgs(data);
  }, [search, roomType, pgs]);

  return (
    <>
      <Navbar />

      <SearchBar
        search={search}
        setSearch={setSearch}
        roomType={roomType}
        setRoomType={setRoomType}
      />

      <div className="container py-5">
        <h2 className="mb-4">All PGs</h2>

        {filteredPgs.length === 0 ? (
          <div className="alert alert-warning">
            No PG Found
          </div>
        ) : (
          filteredPgs.map((pg) => (
            <div key={pg.id} className="border rounded p-3 mb-3">

              <h4>{pg.name}</h4>

              <p><strong>City:</strong> {pg.city}</p>

              <p><strong>Room:</strong> {pg.room_type}</p>

              <p><strong>Price:</strong> ₹{pg.price}/Month</p>

              <Link
                to={`/pg-details/${pg.id}`}
                className="btn btn-primary"
              >
                View Details
              </Link>

            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
}

export default PGListing;
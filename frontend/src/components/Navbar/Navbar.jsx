import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          PG Life
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/pgs">PGs</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    Hi, {user.full_name}
                  </span>
                </li>

                <li className="nav-item">
                  <Link
                    to="/admin"
                    className="btn btn-dark ms-2"
                  >
                    Admin
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/wishlist"
                    className="btn btn-warning ms-2"
                  >
                    ❤️ Wishlist
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/my-bookings"
                    className="btn btn-success ms-2"
                  >
                    My Bookings
                  </Link>
                </li>

                {user.role === "admin" && (
                  <li className="nav-item">
                    <Link
                      to="/admin"
                      className="btn btn-dark ms-2"
                    >
                      Admin
                    </Link>
                  </li>
                )}

                <li className="nav-item">
                  <button
                    className="btn btn-danger ms-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="btn btn-primary ms-3"
                  >
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/register"
                    className="btn btn-outline-primary ms-2"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}

          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
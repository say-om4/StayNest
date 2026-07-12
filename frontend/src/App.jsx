import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import PGListing from "./pages/PGListing/PGListing";
import PGDetails from "./pages/PGDetails/PGDetails";
import Wishlist from "./pages/Wishlist/Wishlist";
import MyBookings from "./pages/MyBookings/MyBookings";
import AddPG from "./pages/Admin/AddPG";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import EditPG from "./pages/Admin/EditPG";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pgs" element={<PGListing />} />
        <Route path="/pg-details/:id" element={<PGDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/admin/add-pg" element={<AddPG />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/edit/:id" element={<EditPG />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
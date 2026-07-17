# 🏠 StayNest

StayNest is a premium, feature-rich Full Stack PG & Rental Property Web Application built using React, PHP, MySQL, and Bootstrap.

---

## ✨ Features

* **User Authentication & Profiles**:
  * Secure Register/Login system.
  * Terms & Conditions agreement check on first login.
  * Profile page to update user details and passwords.
  * **Password Visibility Toggles**: Interactive eye icon buttons to show/hide passwords on Login, Register, and Profile pages.
  * **Forgot Password Recovery**: Secure self-service password reset verifying email and phone attributes.
* **Property Search & Exploration**:
  * Case-insensitive search matching City, State, Name, and Address.
  * Filtering options by property type (PG, Single Room, Apartment, Hostel) and room configurations.
  * Responsive back navigation next to logo on all subpages.
* **Customer Review & Rating System**:
  * Customer-written review posts with star ratings.
  * Average ratings calculated automatically from customer submissions.
  * Automatic host protection (hosts are blocked from leaving reviews on properties they own).
* **Admin Dashboard & Override Controls**:
  * Create, edit, and delete PG/Room listings.
  * Selectable **Rating Override** (Admins can toggle between showing calculated customer reviews or forcing a custom static rating).
  * **History Stack (Undo/Redo)**: Complete undo and redo history tracking on the Admin Edit Form for all fields and check boxes.
* **Contact Preference Controls**:
  * Selectable contact detail display preferences per PG (Display Both, Email Only, or Phone Only).
  * Optional secondary phone input field for listings.
* **Layout Enhancements**:
  * Global floating **Scroll to Footer** button with amber-to-red gradient and scroll threshold awareness.
  * Clean footer section with developer credentials and LinkedIn contact integration.

---

## 🛠 Tech Stack

### Frontend
* React.js (Vite compiler)
* Bootstrap 5
* React Router DOM
* Axios (API connection client)
* React Toastify (Notifications)
* React Icons

### Backend
* PHP (OOP connection & API endpoints)
* MySQL database

---

## 📁 Project Structure

```text
StayNest/
├── frontend/             # React SPA Source Code (Vite)
│   ├── src/
│   │   ├── components/   # Navbar, Footer, SearchBar, ScrollToBottom, Hero, etc.
│   │   ├── pages/        # Home, Admin, Login, Register, PGListing, PGDetails, etc.
│   │   └── services/     # api.js connection service
├── backend/              # PHP API Endpoints
│   ├── api/
│   │   ├── admin/        # addPG, updatePG, deletePG
│   │   ├── auth/         # login, register, resetPassword
│   │   └── pg/           # getAllPGs, getSinglePG, addReview
│   ├── config/           # Database connections
│   └── uploads/          # Listing image storage
├── database/             # Database export schemas (pglife.sql)
└── README.md
```

---

## ⚙ Setup & Installation

### 1. Database Configuration
1. Start XAMPP (Apache and MySQL).
2. Open **phpMyAdmin** in your browser.
3. Create a new database named `pglife`.
4. Import the schema file located in `database/pglife.sql`.

### 2. Backend Config Setup
1. Copy or move the `backend/` folder into your server's served directory (e.g. `xampp/htdocs/PG-Life/backend`).
2. Navigate to `backend/config/` and rename `database.php.example` to `database.php`.
3. Open `database.php` and configure your database connection host, username, and password credentials:
   ```php
   $host = "localhost";
   $username = "root";
   $password = "";
   $database = "pglife";
   ```

### 3. Frontend Setup
1. Open a terminal in the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the hot-reloading development server:
   ```bash
   npm run dev
   ```
4. Access the frontend app at **[http://localhost:5173/](http://localhost:5173/)**.

---

## 👤 Developed By
* **Om Jee** — [LinkedIn Profile](https://www.linkedin.com/in/om-jee-93b593259/)

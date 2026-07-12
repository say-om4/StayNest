import "./SearchBar.css";

function SearchBar({
  search,
  setSearch,
  roomType,
  setRoomType,
}) {
  return (
    <div className="search-section">
      <div className="container">
        <div className="search-card">

          <input
            type="text"
            placeholder="Search by City or PG Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option value="">All Room Types</option>
            <option value="Single Sharing">Single Sharing</option>
            <option value="Double Sharing">Double Sharing</option>
            <option value="Triple Sharing">Triple Sharing</option>
          </select>

        </div>
      </div>
    </div>
  );
}

export default SearchBar;
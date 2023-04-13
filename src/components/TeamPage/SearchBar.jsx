import Button from "react-bootstrap/Button";

function SearchBar({ title, filterText, onFilterTextChange }) {
  return (
    <div className="col-12 d-flex justify-content-between">
      <h2 className="w-75 text-white">{title}</h2>
      <div className="d-flex m-2 w-25">
        <input
          id="searchInput"
          className="me-3 w-100"
          placeholder="Search..."
          type="text"
          value={filterText}
          onChange={(e) => {
            onFilterTextChange(e.target.value);
          }}
        />

        <Button
          variant="primary"
          id="clearBtn"
          onClick={(e) => {
            onFilterTextChange("");
          }}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}

export default SearchBar;

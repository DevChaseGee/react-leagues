function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container">
        <ul className="nav" role="tablist">
          <li className="nav-item">
            <i className="fas fa-star icon"></i>
          </li>
          <li className="nav-item">
            <a className="nav-link active" data-bs-toggle="pill" href="#home">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="pill" href="#teams">
              Teams
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

// Export the Navbar component so that it can be used in other files
export default Navbar;

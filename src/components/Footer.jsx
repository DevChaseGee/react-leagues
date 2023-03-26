function Footer() {
  return (
    <footer className="nav d-flex flex-wrap justify-content-between align-items-center border-top fixed-bottom footer">
      <div
        className="row justify-content-between"
        style={{
          width: "100%",
        }}
      >
        <div className="col-md-4">
          <p className="mb-0">
            © 2023 ALGS World Championship &amp; Respawn Entertainment
          </p>
        </div>
        <div className="col-md-4 justify-content-end d-flex">
          <a href="https://twitter.com">
            <i className="fas fa-user-circle icon"></i>
          </a>
          <a href="https://twitter.com">
            <i className="fab fa-twitter icon"></i>
          </a>
          <a href="https://instagram.com">
            <i className="fab fa-instagram icon"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

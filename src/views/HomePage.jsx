function HomePage() {
  return (
    <div id="home" className="container active">
      <div className="row">
        <div className="col text-center my-3">
          <h1>Welcome to the League!</h1>
          <aside>
            Did you know that the prize pool for the upcoming 2023 tournament is
            over $1,000,000?
          </aside>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <img src="images/Intro.jpg" alt="" />
        </div>
        <div className="col">
          <img src="images/Scoreboard.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

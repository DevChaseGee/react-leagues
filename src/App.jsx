import { useEffect } from "react";
import "./App.css";
import AppController from "./services/controller/app_controller.js";
import Navbar from "./components/Navbar.jsx";
import HomeTab from "./components/HomeTab.jsx";
import TeamTab from "./components/TeamTab.jsx";
import Footer from "./components/Footer.jsx";
import Modal from "./components/Modal.jsx";

function App() {
  useEffect(() => {
    let app = new AppController();

    app.render();
  });

  return (
    <div className="App">
      <>
        <Navbar></Navbar>
        <div className="tab-content">
          <HomeTab></HomeTab>
          <TeamTab></TeamTab>
        </div>
        <Footer></Footer>
        <Modal></Modal>
      </>
    </div>
  );
}

export default App;

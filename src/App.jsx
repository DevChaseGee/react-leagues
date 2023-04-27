import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./views/HomePage.jsx";
import TeamsPage from "./views/TeamsPage.jsx";
import NoMatch from "./views/NoMatch.jsx";
import AddTeamPage from "./views/AddTeamPage.jsx";
import EditTeamPage from "./views/EditTeamPage.jsx";

function App() {
  return (
    <div className="App">
      <>
        <Routes>
          <Route
            path="/"
            element={<Layout title="ALGS League" logo="images/intro.jpg" />}
          >
            <Route index path="/" element={<HomePage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/add-team" element={<AddTeamPage />} />
            <Route path="/edit-team/:id" element={<EditTeamPage />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </>
    </div>
  );
}

export default App;

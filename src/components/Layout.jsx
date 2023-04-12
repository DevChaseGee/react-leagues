import { Outlet } from "react-router";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

function Layout({ title, logo }) {
  return (
    <>
      <Header title={title} logo={logo} />
      <Outlet></Outlet>
      <Footer />
    </>
  );
}

export default Layout;

import Footer from "../footer/Footer";
import Header from "../header/Header";
// import "../../App.css";

const Layout = ({ children }) => {
  return (
    <div className="container mx-auto">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
export default Layout;

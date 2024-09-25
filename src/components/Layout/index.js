import Footer from "../footer/Footer";
import Header from "../header/Header";

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

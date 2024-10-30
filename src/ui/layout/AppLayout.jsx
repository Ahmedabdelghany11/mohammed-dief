import Footer from "./Footer";
import Header from "./Header";
import SmallMenu from "./SmallMenu";

function AppLayout({ children }) {
  return (
    <>
      <Header />
      <SmallMenu />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default AppLayout;

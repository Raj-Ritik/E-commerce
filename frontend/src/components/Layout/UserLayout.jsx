import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      {/*Header*/}
      <Header />
      {/*main Content*/}
      <main>
        {/*<Outlet /> component which will be replaced by whatever child route component is being rendered */}
        {/* Outlet: A special component from React Router that serves as a placeholder for child routes */}
        <Outlet />
      </main>
      {/*Footer*/}
      <Footer />
    </>
  );
};

export default UserLayout;

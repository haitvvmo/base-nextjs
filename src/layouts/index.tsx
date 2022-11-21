import Navbar from "components/nav";
import React from "react";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="min-h-screen bg-white">{children}</main>
      <footer className="md:hidden block">
      </footer>
    </React.Fragment>
  );
};

export default Layout;

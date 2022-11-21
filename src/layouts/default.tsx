import React from "react";
import { Roboto } from "@next/font/google";

interface ILayoutProps {
  children: React.ReactNode;
}

const roboto = Roboto({
  weight: "400",
});

const DefaultLayout = ({ children }: ILayoutProps) => {
  return (
    <React.Fragment>
      <main className={`w-full min-h-screen bg-white ${roboto.className}`}>
        {children}
      </main>
    </React.Fragment>
  );
};

export default DefaultLayout;

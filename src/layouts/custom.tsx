import React from "react";
import { Roboto } from "@next/font/google";

interface ILayoutProps {
  children: React.ReactNode;
}

const roboto = Roboto({
  weight: "400",
});

const CustomLayout = ({ children }: ILayoutProps) => {
  return (
    <main>
      <div className={`w-full min-h-screen bg-white ${roboto.className}`}>
        {children}
      </div>
    </main>
  );
};

export default CustomLayout;

/* eslint-disable react/display-name */
import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from "react";
import { Menubar } from "primereact/menubar";
import { MdOutlineEmail } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { VscListSelection } from "react-icons/vsc";
import { classNames } from "primereact/utils";
import Link from "next/link";
import Image from "next/image";
import { LayoutContext } from "contexts/layout.context";

const Navbar = forwardRef((props, ref) => {
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);
  const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } =
    useContext(LayoutContext);
  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }));

  return (
    <header className="fixed top-0 right-0 left-0 h-16 z-[9999] bg-branding07">
      <div className="flex items-center justify-between w-full h-full pl-6 pr-6">
        <div className="flex items-center gap-x-4">
          <button
            ref={menubuttonRef}
            type="button"
            className="p-link focus:outline-none"
            onClick={onMenuToggle}
          >
            <i className="pi pi-bars text-white" />
          </button>
        </div>

        <div ref={topbarmenuRef} className="flex items-center gap-x-3">
          <button type="button" className="p-link">
            <MdOutlineEmail size={20} color="#fff" />
          </button>
          <button type="button" className="p-link">
            <FiUser size={20} color="#fff" />
          </button>
        </div>
      </div>
    </header>
  );
});

export default Navbar;

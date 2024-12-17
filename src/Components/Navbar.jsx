import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-around bg-violet-900 text-white py-2">
        <div className="logo">
          <span className="font-bold text-x1 mx-9 cursor-pointer">
            Personal Task Tracer
          </span>
        </div>
        <ul className="flex gap-8 mx-9">
          <li className="cursor-pointer hover:font-bold transition-on">Home</li>
          <li className="cursor-pointer hover:font-bold transition-on">
            Your Tasks
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
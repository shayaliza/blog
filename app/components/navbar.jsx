"use client";
import React, { useState } from "react";
import "@/app/globals.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-center items-center  p-4">
      <div className="text-lightwhite text-3xl font3 ">Shayaliza Blog's</div>
    </div>
  );
}

export default Navbar;

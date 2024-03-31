"use client";
import React, { useState } from "react";
import Phone from "@/app/(pages)/firebase/phone";
import Email from "@/app/(pages)/firebase/email";
import Google from "@/app/(pages)/firebase/google";

function Page() {
  const [selectedTab, setSelectedTab] = useState("phone");

  return (
    <>
      <div className="flex space-x-4 pt-4  justify-evenly bg-bluebg">
        <button
          className={`px-4 py-2  rounded-lg ${
            selectedTab === "phone"
              ? " border-x-4  text-pinkborder border-pinkborder"
              : "border-y-4 text-pinkborder border-pinkborder"
          }`}
          onClick={() => setSelectedTab("phone")}
        >
          Phone
        </button>

        <button
          className={`px-4 py-2 rounded-lg  ${
            selectedTab === "google"
              ? "border-x-4  text-pinkborder border-pinkborder"
              : "border-y-4 text-pinkborder border-pinkborder"
          }`}
          onClick={() => setSelectedTab("google")}
        >
          Google
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedTab === "email"
              ? "border-x-4  text-pinkborder border-pinkborder"
              : "border-y-4 text-pinkborder border-pinkborder"
          }`}
          onClick={() => setSelectedTab("email")}
        >
          Email
        </button>
      </div>
      {selectedTab === "phone" && <Phone />}
      {selectedTab === "google" && <Google />}
      {selectedTab === "email" && <Email />}
    </>
  );
}

export default Page;

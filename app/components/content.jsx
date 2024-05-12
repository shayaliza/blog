import React from "react";
import "@/app/globals.css";
import Link from "next/link";

function Content() {
  return (
    <div className="flex justify-center items-center borde mt-10">
      <div className="block text-center w-full">
        <div className="md:w-2/3 md:m-auto md:flex ">
          <div className="p-4 md:w-1/2">
            <Link href={"/razorpay"}>
              <div className="  shadow-md p-6 text-lightwhite border-pinkborder border-4 hover:bg-pinkborder hover:text-bluebg  rounded-3xl ">
                <h2 className=" font-bold mb-2 font1 text-2xl">
                  RazorPay Integration{" "}
                </h2>
                <p className="font2 text-lg pt-2 ">
                  Enable Razorpay on your site effortlessly
                </p>
              </div>
            </Link>
          </div>
          <div className="p-4 md:w-1/2">
            <Link href={"/firebase"}>
              <div className="  shadow-md p-6 text-lightwhite border-pinkborder border-4 hover:bg-pinkborder hover:text-bluebg  rounded-3xl ">
                <h2 className=" font-bold mb-2 font1 text-2xl">
                  Firebase Authentication
                </h2>
                <p className="font2 text-lg pt-2 ">
                  Phone Otp , Google , Email
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="md:w-2/3 md:m-auto md:flex ">
          <div className="p-4 md:w-1/2">
            <Link href={"/fcm"}>
              <div className="  shadow-md p-6 text-lightwhite border-pinkborder border-4 hover:bg-pinkborder hover:text-bluebg  rounded-3xl ">
                <h2 className=" font-bold mb-2 font1 text-2xl">
                  Firebase Messaging
                </h2>
                <p className="font2 text-lg pt-2 ">FCM , NodeJs , API</p>
              </div>
            </Link>
          </div>
          <div className="p-4 md:w-1/2">
            <Link href={"/phonepe"}>
              <div className="  shadow-md p-6 text-lightwhite border-pinkborder border-4 hover:bg-pinkborder hover:text-bluebg  rounded-3xl ">
                <h2 className=" font-bold mb-2 font1 text-2xl">
                  PhonePay Integration
                </h2>
                <p className="font2 text-lg pt-2 ">Production Level</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;

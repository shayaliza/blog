import React from "react";
import CodeBlock from "@/app/components/codeblock";

const FirstInstallation = `npm create vite@latest
`;
const SecondInstallation = `npm i firebase`;
const fileStructure = `
my-app
|
|──────src
|      |
|      └──────App.jsx
|      └──────phone.jsx
|
└──────firebaseConfig.js
`;

const FirebaseConfig = `import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "Get Your Key from firebase",
  authDomain: "Get Your Key from firebase",
  projectId: "Get Your Key from firebase",
  storageBucket: "Get Your Key from firebase",
  messagingSenderId: "Get Your Key from firebase",
  appId: "Get Your Key from firebase",
  measurementId: "Get Your Key from firebase",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

`;

const Phone1 = `//phone.jsx
import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebaseConfig";

function Phone() {
  const [phone, setPhone] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const sendOtp = async () => {
    try {
      setIsSendingOtp(true);

      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
      });
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        recaptcha
      );
      setConfirmation(confirmationResult);
      setOtpSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    try {
      const data = await confirmation.confirm(otp);
      console.log(data);
      saveUserDetails(phone);
    } catch (err) {
      console.error(err);
    }
  };
  const saveUserDetails = async (phone) => {
    try {
      console.log("User is Logged in Save the Details in Backend", phone);
    } catch (error) {
      console.log("Failed to Login user:", error.message);
    }
  };

  return (
    <div>
      <h2>Phone Verification</h2>

      {!otpSent ? (
        <>
          <input
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
          />

          <div>
            <button onClick={sendOtp} disabled={isSendingOtp}>
              {isSendingOtp ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
          <div>
            <div id="recaptcha"></div>
          </div>
        </>
      ) : (
        <>
          <div>
            <div>
              <input
                type="text"
                onChange={(e) => setOtp(e.target.value)}
                placeholder="OTP"
              />
              <button onClick={verifyOtp}>Verify OTP</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Phone;
`;
function Phone() {
  return (
    <>
      <div className="fixed bottom-0 right-0 bg-bluebg text-pinkborder text-sm font1 p-2 z-10">
        firebase Authentication by shayaliza
      </div>
      <div className="bg-bluebg h-full">
        <div className="text-lightwhite justify-center text-center flex pt-3 flex-col">
          <div className="text-3xl text-pinkborder font3 mt-3 mb-3">
            Phone with Otp
          </div>
        </div>
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
          Step 1. I'm using vite app, Create App and get the keys from firebase
        </div>
        <CodeBlock code={FirstInstallation} />
        <CodeBlock code={SecondInstallation} />

        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
          Step 2. File Structure
        </div>
        <CodeBlock code={fileStructure} />
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
          Step 3. Setup firebaseConfig.js in root directory
        </div>
        <CodeBlock code={FirebaseConfig} />
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
          Step 4. Create a component phone.jsx and use it in App.jsx
        </div>
        <CodeBlock code={Phone1} />
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
          Step 5. Important Point
          <p>
            -- Use +918888888888 this format to change this to 8888888888 change
            the code to Add +91 in sendOtp function --
          </p>
        </div>
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg pb-20">
          CSS to sbka aata h to apna apna dekh lena<div>OK BYE</div>
        </div>
      </div>
    </>
  );
}

export default Phone;

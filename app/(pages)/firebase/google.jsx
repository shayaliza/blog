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
|      └──────google.jsx
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

const Phone1 = `//google.jsx
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";

function Google() {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      console.log(user.displayName, user.email, "Data got Succesfully");
    } catch (error) {
      if (error.code === "auth/cancelled-popup-request") {
        console.log("Popup was closed before completing the sign-in process.");
      } else {
        console.error(error);
      }
    }
  };
  return <button onClick={handleGoogleSignIn}>Sign in with Google</button>;
}

export default Google;
`;
function Google() {
  return (
    <>
      <div className="fixed bottom-0 right-0 bg-bluebg text-pinkborder text-sm font1 p-2 z-10">
        firebase Authentication by shayaliza
      </div>
      <div className="bg-bluebg h-full">
        <div className="text-lightwhite justify-center text-center flex pt-3 flex-col">
          <div className="text-3xl text-pinkborder font3 mt-3 mb-3">
            SignUp with Google
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
          Step 4. Create a component google.jsx and use it in App.jsx
        </div>
        <CodeBlock code={Phone1} />
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
          Step 5. Important Point
          <p>
            -- In firebase go to porject then Authentication then Settings then
            turn User account linking to "Link accounts that use the same email"
            If it is not selected then you will not get the email in console
            only name will be shown--
          </p>
        </div>
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg pb-20">
          CSS to sbka aata h to apna apna dekh lena<div>OK BYE</div>
        </div>
      </div>
    </>
  );
}

export default Google;

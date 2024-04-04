import React from "react";
import CodeBlock from "@/app/components/codeblock";
import ReadMore from "@/app/components/readmore";

const FirstInstallation = `npm create vite@latest
`;
const SecondInstallation = `npm i firebase`;
const fileStructure = `
my-app
|
|──────src
|      |
|      └──────App.jsx
|      └──────email.jsx
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

const Phone1 = `//email.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

function Email() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Got User Data successfully", userCredential.user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default Email;
`;
function Email() {
  return (
    <>
      <div className="fixed bottom-0 right-0 bg-bluebg text-pinkborder text-sm font1 p-2 z-10">
        firebase Authentication by shayaliza
      </div>
      <div className="bg-bluebg h-full">
        <div className="text-lightwhite justify-center text-center flex pt-3 flex-col">
          <div className="text-3xl text-pinkborder font3 mt-3 mb-3">
            SignUp with Email and Password
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
          Step 4. Create a component email.jsx and use it in App.jsx
        </div>
        <CodeBlock code={Phone1} />

        <ReadMore
          text={"Koi Noobda hi hoga jisko email and password set krna nhi aata"}
        />
      </div>
    </>
  );
}

export default Email;

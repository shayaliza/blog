import CodeBlock from "@/app/components/codeblock";

const PaymentController = `
const crypto = require("crypto");
const Razorpay = require("razorpay");

const keyID = "Paste your key ID";
const keySecret = "Paste your key Secret ";

const instance = new Razorpay({
  key_id: keyID,
  key_secret: keySecret,
});

const Checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount) * 100,
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order: order });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
const PaymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    console.log("is authentic");
    res.redirect(); //redirect to payment success page of frontend
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
module.exports = {
  PaymentVerification,
  Checkout,
};

`;

const PaymentRoutes = `
const express = require("express");

const {
  Checkout,
  PaymentVerification,
} = require("./../Controller/paymentController");
const router = express.Router();

router.post("/checkout", Checkout);
router.post("/paymentverification", PaymentVerification);

module.exports = router;


`;
const Server = `
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const paymentRoutes = require("./Routes/paymentRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", paymentRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server is Runnig");
});


`;
const FrontendPayment = `
import React from "react";

function Payment() {
  const keyID = "your key id here";
  const checkoutHandler = async (amount) => {
    fetch("http://localhost:5000/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    })
      .then((response) => response.json())
      .then((data) => {
        const order = data.order;

        const options = {
          key: keyID,
          amount,
          currency: "INR",
          name: "Shayaliza",
          description: "Shayaliza Razorpay Integration",
          image: "your Profile URL",
          order_id: order.id,
          callback_url: "http://localhost:5000/api/paymentverification",
          prefill: {
            name: "Shayaliza",
            email: "sample@gmail.com",
            contact: "77777777777",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#121212",
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      });
  };

  return (
    <>
      <div onClick={() => checkoutHandler(8000)}>buy Now Rs 8000 </div>
      <div onClick={() => checkoutHandler(6000)}>buy Now Rs 6000 </div>
      <div onClick={() => checkoutHandler(200)}>buy Now Rs 200 </div>

    </>
  );
}

export default Payment;

`;
const fileStructure = `
Backend
│      server.js
|   
└──────Routes
│      │      paymentRoutes.js
│   
└──────Controller
       │      paymentController.js
  
`;

const firebaseconfig = `

import firebase from "firebase/compat/app";
import { getMessaging, getToken } from "firebase/messaging";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

firebase.initializeApp(firebaseConfig);

const app = firebase.initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        " your vapit key",
    });
    return token;
  }
};

`;

const firebaseconfigPublic = `
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

`;

const app = `
import { toast } from "react-toastify";
import { onMessage } from "firebase/messaging"; //from firebase package
import { messaging } from "./firebase.config"; //from local file we made as config

function App() {
  onMessage(messaging, (payload) => {
    console.log("payload", payload);
    toast.info(payload.notification.body);
  });

  const AllowNotification =  () => {
    generateToken().then((token) => {
      console.log(token);
      //save this token to DB to send notification using backend
    });
  };

  return (
   <div>
   Hello Page
   <div onClick={AllowNotification}>Button</div>
   </div>
  );
}

export default App;

`;

function FCM() {
  return (
    <>
      <div className="fixed bottom-0 right-0 bg-bluebg text-pinkborder text-sm font1 p-2 z-10">
        FCM Integration by shayaliza
      </div>
      <div className="bg-bluebg h-full">
        <div className="text-lightwhite justify-center text-center flex pt-3 flex-col">
          <div className="text-3xl text-pinkborder font3 mt-3 mb-3">
            Frontend
          </div>
        </div>
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
          Step 1. Get the keys and vapid id from firebase console, Enable FCM
          service, create react App and install firebase package
        </div>
        <CodeBlock code={"npm i firebase"} />
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
          Step 2. Create firebase config file in root
        </div>
        <CodeBlock code={firebaseconfig} />
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
          Step 3. Now inside public folder make a file firebase-messaging-sw.js
          and paste the code
        </div>
        <CodeBlock code={firebaseconfigPublic} />
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
          Step 4. Now inside App.js call this function
        </div>
        <CodeBlock code={app} />
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
          Step 5. Once we get the token we can easily send message from firebase
          console Messaging Option
        </div>
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
          Step 6. To send Message at a specific Condition we have to make
          backend and from there we send the message, so save the token to DB,
          In this Blog we are keeping it simple for now
        </div>
        <div className="text-lightwhite justify-center text-center flex pt-3 flex-col">
          <div className="text-3xl text-pinkborder font3 mt-3 mb-3">
            Backend
          </div>
        </div>
        <CodeBlock code={"npm i firebase-admin express cors"} />
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
          Step 7. Create firebase.js file, u will get the serviceAccountKey from
          firebase console download and attach
        </div>
        <CodeBlock
          code={`const admin = require("firebase-admin");
const serviceAccountKey = require("./serviceAccountKey.json");

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

module.exports = { firebaseAdmin };
`}
        />
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
          Step 8. Now in any Controller we can easily send the message import
          firbaseAdmin
        </div>
        <CodeBlock
          code={`const {firebaseAdmin} = require("./firebase"); //our local file we made `}
        />
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
          Step 9. Now in Any Controller get the token and use this code
        </div>
        <CodeBlock
          code={`const message = {
            notification: {
              title: "title",
              body: "Notification Body",
            },
            token: your Token,
          };
firebaseAdmin
          .messaging()
          .send(message)
          .then((response) => {
            console.log("Successfully sent message:", response);
           })
          .catch((error) => {
             console.log("Error sending message:", error);
          }); `}
        />
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg pb-20">
          Bss Itna hi h<div>OK BYE</div>
        </div>
      </div>
    </>
  );
}

export default FCM;

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

const HtmlScript = `
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>

`;

function RazorPay() {
  return (
    <>
      <div className="fixed bottom-0 right-0 bg-bluebg text-pinkborder text-sm font1 p-2 z-10">
        Razorpay Integration by shayaliza
      </div>
      <div className="bg-bluebg h-full">
        <div className="text-lightwhite justify-center text-center flex pt-3 flex-col">
          <div className="text-3xl text-pinkborder font3 mt-3 mb-3">
            Backend
          </div>
        </div>
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
          Step 1. Install the dependency & Get the KeyID and keySecret from
          Razorpay Website
        </div>
        <CodeBlock code={"npm i express cors body-parser razorpay"} />
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
          Step 2. File Structure
        </div>
        <CodeBlock code={fileStructure} />
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
          Step 3. Server.js
        </div>
        <CodeBlock code={Server} />
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
          Step 4. Payment Controller
        </div>
        <CodeBlock code={PaymentController} />
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
          Step 5. Payment Routes
        </div>
        <CodeBlock code={PaymentRoutes} />
        <div className="text-lightwhite justify-center text-center flex pt-3 flex-col">
          <div className="text-3xl text-pinkborder font3 mt-3 mb-3">
            Frontend
          </div>
          <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
            Step 1. Write this Script in index.html in body
          </div>
          <CodeBlock code={HtmlScript} />

          <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
            Step 1. Create React App and create component payment.jsx and use it
            in App.js
          </div>
          <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
            Step 2. payment.jsx
          </div>
        </div>
        <CodeBlock code={FrontendPayment} />
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
          Test Card Number, CVV = Random Number , Expiry Date = Any Future Date
          <CodeBlock code={"5267 3181 8797 5449"} />
          <CodeBlock code={"4111 1111 1111 1111"} />
        </div>
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg pb-20">
          Bss Itna hi h<div>OK BYE</div>
        </div>
      </div>
    </>
  );
}

export default RazorPay;

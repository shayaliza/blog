import CodeBlock from "@/app/components/codeblock";

const PaymentController = `
const crypto = require("crypto");
const axios = require("axios");

const salt_key = "Paste your key ID";
const merchant_id = "Paste your key Secret ";

const newPayment = async (req, res) => {
    const merchantTransactionId = req.body.transactionId;
    const data = {
        merchantId: merchant_id,
        merchantTransactionId: merchantTransactionId,
        merchantUserId: req.body.MUID,
        name: req.body.name,
        amount: req.body.amount * 100,
        redirectUrl: "https://gotanbackend.digistall.in/api/payment/status/merchanttransactionId",  //fix
        redirectMode: "POST",
        mobileNumber: req.body.number,
        paymentInstrument: {
          type: "PAY_PAGE",
        },
    };
    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");
    const keyIndex = 1;
    const string = payloadMain + "/pg/v1/pay" + salt_key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;
    const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";

    const options = {
        method: "POST",
        url: prod_URL,
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
        },
        data: {
          request: payloadMain,
        },
    };

      axios
      .request(options)
      .then((response) => {
        const finalreturn =
          response.data.data.instrumentResponse.redirectInfo.url;
        res.status(200).json({ success: true, finalUrl: finalreturn }); 

        res.redirect(finalreturn);
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
      });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
  };

//@Second Controller

const checkStatus = async (req, res) => {
    const merchantTransactionId = res.req.body.transactionId;
    const merchantId = res.req.body.merchantId;
  
    const keyIndex = 1;
    const string =
    "pg/v1/status/{merchantId}/{merchantTransactionId} + salt_key"; //fix it 
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;
  
    const options = {
      method: "GET",
      url: "https://api.phonepe.com/apis/hermes/pg/v1/status/{merchantId}/{merchantTransactionId}", //fix
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      "X-MERCHANT-ID": "{merchantId}", //fix
      },
    };
  
  
    axios.request(options).then(async (response) => {
      if (response.data.success === true) {
        const url = "success url of frontend Page";
        return res.redirect(url);
      } else {
        const url = "failure url of frontend Page";
        return res.redirect(url);
      }
    });
  };

module.exports = {
    newPayment,
    checkStatus,
  };

`;

const PaymentRoutes = `
const express = require("express");
const router = express.Router();
const { newPayment, checkStatus } = require("../Controller/paymentController");

const setCorsForPaymentRoute = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  };

router.post("/newPayment", setCorsForPaymentRoute, newPayment);
router.post("/status/:txnId", checkStatus);

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
import React, { useState } from "react";
import shortid from "shortid";
import axios from "axios";

const Payment = () => {
  let numericalUID = shortid.generate().replace(/\D/g, "");
  while (numericalUID.length < 5) {
    numericalUID += shortid.generate().replace(/\D/g, "");
  }

  const data = {
    name: "shayaliza",
    amount: "99",
    number: "1234567893",
    MUID: "MUID" + Date.now(),
    transactionId: +numericalUID.substring(0, 5),
  };

  const handlePayment = (e) => {
    e.preventDefault();
    axios
      .post("https://localhost:5000/api/payment/newPayment", {
        ...data,
      })
      .then((response) => {
        window.location.href = response.data.finalUrl;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handlePayment}>
        <div>
          Name <span>{data.name}</span>
        </div>
        <div>
          Number <span>{data.number}</span>
        </div>
        <div>
          Amount <span>{data.amount}</span>
        </div>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

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

function PhonePe() {
  return (
    <>
      <div className="fixed bottom-0 right-0 bg-bluebg text-pinkborder text-sm font1 p-2 z-10">
        PhonePe Integration by shayaliza
      </div>
      <div className="bg-bluebg h-full">
        <div className="text-lightwhite justify-center text-center flex pt-3 flex-col">
          <div className="text-3xl text-pinkborder font3 mt-3 mb-3">
            Backend
          </div>
        </div>
        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
          Step 1. Install the Dependency and Get Salt key and Merchant Id from
          Phonepe Account
        </div>
        <CodeBlock code={"npm i express cors body-parser axios"} />
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
            Step 1. Create React App and create component payment.jsx and use it
            in App.js
          </div>
          <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg">
            Step 3. payment.jsx
          </div>
        </div>
        <CodeBlock code={FrontendPayment} />

        <div className="text-lightwhite  pt-3 block text-center m-auto font3 text-lg pb-20">
          Bss Itna hi h<div>OK BYE</div>
        </div>
      </div>
    </>
  );
}

export default PhonePe;

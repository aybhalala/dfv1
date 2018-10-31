"use strict";

const config = require("./config/config");
const {
  dialogflow,
  BasicCard,
  Permission,
  Suggestions,
  SignIn
} = require("actions-on-google");
const rp = require("request-promise");

// Import the firebase-functions package for deployment.
const functions = require("firebase-functions");

// Instantiate the Dialogflow client.
const app = dialogflow({
  clientId: config.CLIENT_ID
});

app.intent("Default Welcome Intent", conv => {
  conv.ask(new SignIn("To get your account details"));
});

app.intent("actions_intent_SIGN_IN", require("./intents/sign_in"));

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

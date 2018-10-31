const checkIntent = require("./check_intent");

module.exports = function createIntent(
  conv,
  displayName,
  trainingPhrasesParts,
  action,
  messageTexts
) {
  let checkedIntent = checkIntent(displayName);
  //console.log(checkedIntent);
  checkedIntent.then(res => {
    console.log("Checked Intent is " + res);
    if (res) {
      console.log("Intent " + displayName + " already exists");
    } else {
      // [START dialogflow_create_intent]
      // Imports the Dialogflow library
      const dialogflow = require("dialogflow");

      // Instantiates the Intent Client
      const intentsClient = new dialogflow.IntentsClient();

      // The path to identify the agent that owns the created intent.
      const agentPath = intentsClient.projectAgentPath(
        require("../config/config").PROJECT_ID
      );

      const trainingPhrases = [];

      trainingPhrasesParts.forEach(trainingPhrasesPart => {
        const part = {
          text: trainingPhrasesPart
        };

        // Here we create a new training phrase for each provided part.
        const trainingPhrase = {
          type: "EXAMPLE",
          parts: [part]
        };

        trainingPhrases.push(trainingPhrase);
      });

      const messageText = {
        text: messageTexts
      };

      const message = {
        text: messageText
      };

      const intent = {
        displayName: displayName,
        trainingPhrases: trainingPhrases,
        messages: [message]
      };

      const createIntentRequest = {
        parent: agentPath,
        intent: intent
      };

      // Create the intent
      intentsClient
        .createIntent(createIntentRequest)
        .then(responses => {
          console.log(`Intent ${responses[0].name} created`);
          conv.data.createdIntents.push(responses[0].name);
        })
        .catch(err => {
          console.error("ERROR:", err);
        });
      // [END dialogflow_create_intent]
    }
  });
};

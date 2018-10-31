module.exports = function listIntents(projectId) {
  // [START dialogflow_list_intents]
  // Imports the Dialogflow library
  const dialogflow = require("dialogflow");

  // Instantiates clients
  const intentsClient = new dialogflow.IntentsClient();

  // The path to identify the agent that owns the intents.
  const projectAgentPath = intentsClient.projectAgentPath(projectId);

  const request = {
    parent: projectAgentPath
  };

  console.log(projectAgentPath);

  // Send the request for listing intents.
  return intentsClient
    .listIntents(request)
    .then(responses => {
      // responses[0].forEach(intent => {
      //   console.log("====================");
      //   console.log(`Intent name: ${intent.name}`);
      //   console.log(`Intent display name: ${intent.displayName}`);
      //   console.log(`Action: ${intent.action}`);
      //   console.log(`Root folowup intent: ${intent.rootFollowupIntentName}`);
      //   console.log(
      //     `Parent followup intent: ${intent.parentFollowupIntentName}`
      //   );

      //   console.log("Input contexts:");
      //   intent.inputContextNames.forEach(inputContextName => {
      //     console.log(`\tName: ${inputContextName}`);
      //   });

      //   console.log("Output contexts:");
      //   intent.outputContexts.forEach(outputContext => {
      //     console.log(`\tName: ${outputContext.name}`);
      //   });
      // });
      return responses[0];
    })
    .catch(err => {
      console.error("Failed to list intents:", err);
    });
  // [END dialogflow_list_intents]
};

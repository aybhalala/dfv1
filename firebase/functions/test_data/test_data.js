module.exports = {
  simpleName: {
    name: "Ask for name",
    trainingPhrases: ["What is your name?", "May I have your name please?"],
    messagesText: ["My name is Aditya Patel", "Aditya Patel"],
    action: "askName"
  },
  deleteAllCreatedIntents: {
    name: "deleteAllCreatedIntents",
    trainingPhrases: ["Delete all Intents", "Delete temporary Intents"],
    messagesText: ["Okay, deleting all temporary intents"],
    action: "deleteAllCreatedIntents"
  }
};

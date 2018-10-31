const listIntents = require("./list_intents");

module.exports = function checkIntent(intentDisplayName) {
  let intentList = listIntents(require("../config/config").PROJECT_ID);
  intentList.then(res => {
    console.log("The Intent List Value is " + res);
    return (isInList = res.some(el => {
      return el.displayName == intentDisplayName;
    }));
  });
};

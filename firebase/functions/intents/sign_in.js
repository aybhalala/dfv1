module.exports = (conv, params, signin) => {
  return new Promise(function(resolve, reject) {
    if (signin.status !== "OK") {
      conv.close(`You need to Sign In before using the System.`);
      resolve();
    } else {
      const payload = conv.user.profile.payload;
      if (payload.email.indexOf("gmail.com") == -1) {
        let rejectionMsg =
          "Unidentified user " + payload.email + " tried to login";
        console.warn(rejectionMsg);
        conv.close("Sorry, you are not authorized to use this system.");
        resolve();
      } else {
        const userRegister = require("../modules/user_register");
        var ur = userRegister(payload.sub, payload.email, payload.name);
        ur.then(function(res) {
          console.log(res);
          conv.data.createdIntents = [];

          const createIntent = require("../modules/create_intent");
          const test_data = require("../test_data/test_data");
          createIntent(
            conv,
            test_data.simpleName.name,
            test_data.simpleName.trainingPhrases,
            test_data.simpleName.action,
            test_data.simpleName.messagesText
          ).then(res => {
            console.log("Sign In Line 30 " + res);
            conv.ask("Hello");
            resolve();
          });
        }).catch(function(rej) {
          console.error(new Error(rej));
          conv.close(
            "Something went wrong. Please send an email with your name and email address to " +
              require("../config/config").DEVELOPER_EMAIL
          );
          resolve();
        });
      }
    }
  });
};

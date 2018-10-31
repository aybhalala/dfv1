var admin = require("firebase-admin");

var serviceAccount = require("../config/user-interaction-ba7f4-firebase-adminsdk-l3ias-aec06f76b1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://user-interaction-ba7f4.firebaseio.com"
});

module.exports = function userRegister(sub_id, user_email, user_name) {
  return new Promise(function(resolve, reject) {
    let user = admin
      .database()
      .ref()
      .child("/Users/" + sub_id);

    user.once("value", snapshot => {
      if (snapshot.exists()) {
        //console.error(new Error(snapshot.val()));
        if (snapshot.val().email == user_email) {
          resolve("User " + user_email + " logged in.");
        } else {
          console.log("returning false");
          reject("User data mismatch for " + user_email);
        }
      } else {
        user.set({
          email: user_email,
          name: user_name
        });
        resolve("User added with email " + user_email);
      }
    });
  });
};

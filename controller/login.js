exports.login = async (req, res) => {
  // Get username,password and remember-me
  let { username, password, remember } = req.body,
    // To catch errors
    error = "",
    // Request status
    status = "",
    // User
    user;

  // This is called in case something goes wrong with the request
  let failureTerminator = (err, status, message) => {
    if (err) {
      console.log(err);
    }
    res.send({
      status: status || "failure",
      msg: message || "Unknown error occurred while processing the request",
    });
  };

  // Check parameters
  if (
    typeof username == "string" &&
    username.trim() != "" &&
    typeof password == "string" &&
    password.trim() != "" &&
    typeof remember == "boolean"
  ) {
    try {
      let found = await this.findUserByUsename(username);

      if (found.length) {
        if (found[0].password === require("md5")(password)) {
          user = found[0];
          status = "success";
        } else {
          error = "Password incorrect, check your password and try again!";
          status = "error";
        }
      } else {
        error = "The email or username does not exist";
        status = "error";
      }
    } catch (err) {
      failureTerminator(err);
    }
  } else {
    error =
      "Missing parameters, expected: username, password and remember parameters";
    status = "error";
  }

  // Get errors
  if (typeof error === "string" && error.trim() !== "")
    failureTerminator(null, status, error);

  // sign the user using jsonwebtoken
  if (user) {
    try {
      // We don't password property in the user Object
      delete user["password"];

      try {
        // Get the token from jsonwebtoken
        let token = jwt.sign(
          { user },
          process.env.SECRET_KEY_JWT,
          !remember && { expiresIn: "1d" }
        );

        // Send the token if called as API [TODO impliment]
        res.send({ status: "success", token });
      } catch (err) {
        // Catch the failure and terminate the process
        failureTerminator(err);
      }
    } catch (err) {
      // Catch the failure and terminate the process
      failureTerminator(err);
    }
  }
};

const jwt = require('jsonwebtoken');

module.exports = {
  ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      if (req.user) {
        if (!req.originalUrl.match("/dashboard")) {
          return res.redirect("../dashboard");
        }
      }
      return next();
    }
    // req.flash("error_msg", "Please login to view this resource");
    res.redirect(`../users/login`);
  },
  verifyToken: function (req, res, next) {
    // Get the auth value (Bearer header)
    // TOKEN FORMAT
    // Authorization: Bearer <access_token>
    const BearerHeader = req.headers["authorization"];

    if (typeof BearerHeader !== "undefined") {
      // Get token from Bearer
      const bearerToken = BearerHeader.split(" ")[1];
      // assign token to the request
      req.token = bearerToken;

      return jwt.verify(
        req.token,
        process.env.SECRET_KEY_JWT || "randomKeywxyzamnxcdat",
        (err, authData) => {
          if (err) {
            if (res) {
              res
                .send({
                  errorCode: 403,
                  status: "Forbiden",
                  message:
                    "Unathorized request ditacted, please sign-in and try again",
                })
                .status(403);
            }
            return false;
          }
          if (res) {
            // abide authdata to the request
            req.authData = authData;
            req.user = authData["user"];
            // done
            return next();
          }
          return true;
        }
      );
    }

    // Forbiden
    if (res) {
      res
        .send({
          errorCode: 403,
          status: "Forbiden",
          message: "Unathorized request detected, please sign-in and try again",
        })
        .status(403);
    }
    return false;
  },
};

const AuthModel = require("../models/Auth");

var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const AuthenticationController = {
  Signup: (request, response) => {
    const { email, password, userName } = request.body;
    console.log(request.body);
    if (!email || !password || !userName) {
      response.json({
        message: "Requires fields are missing",
        status: false,
      });
      return;
    }

    const Hashpassword = bcrypt.hashSync(password, 10);
    console.log(Hashpassword, "HashPassword");
    const objtoSend = {
      email: email,
      password: Hashpassword,
      user_name: userName
    };
    AuthModel.findOne({ email: email }, (error, user) => {
      console.log(request.body);
      if (error) {
        response.json({
          message: "DB Error",
          status: false,
        });
      } else {
        console.log(user, "User");
        if (user) {
          response.json({
            message: "Email address already exits",
            status: false,
          });
        } else {
            AuthModel.create(objtoSend, (error, user) => {
            if (error) {
              response.json({
                message: `Internal error ${error}`,
                status: false,
              });
            } else {
              response.json({
                message: "Data successfully added",
                user: user,
                status: true,
              });
            }
          });
        }
      }
    });
  },
  Login: (request, response) => {
    console.log(request.body, "request.body");
    //
    const { email, password } = request.body;
    if ((!email, !password)) {
      response.json({
        message: "Requires fields are missing",
        status: false,
      });
      return;
    }
    AuthModel.findOne({ email: email }, (error, user) => {
      if (error) {
        response.json({
          message: "internal error",
          status: false,
        });
        return;
      } else {
        if (!user) {
          response.json({
            message: "Credential error",
            status: false,
          });
          return;
        } else {
          console.log("User", user);
          const comparepassword = bcrypt.compareSync(password, user.password);
          console.log(comparepassword, "comparepassword");
          if (comparepassword) {
            jwt.sign(
              {
                user: {
                  email: email,
                  password: password,
                },
              },
              "secretkey123",
              { expiresIn: `${60 * 60 * 24}s` }, //ANCHOR - 1 day expiration time for token
              (err, token) => {
                response.json({
                  message: "User successfully login",
                  status: true,
                  user,
                  token,
                });
              }
            );
          } else {
            response.json({
              message: "Credential error",
              status: false,
            });
          }
        }
      }
    });
  },
};

module.exports = AuthenticationController;

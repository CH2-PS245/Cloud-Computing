const { User } = require("../models");
const { HttpStatus, Response } = require("../http");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return Response({
          res,
          status: HttpStatus.NOT_FOUND,
          message: "Email or password wrong.",
        });
      }

      const isMatch = await bycrypt.compare(password, user.password);

      if (!isMatch) {
        return Response({
          res,
          status: HttpStatus.NOT_FOUND,
          message: "Email or password wrong.",
        });
      }

      const accToken = jwt.sign(
        { uid: user.id, email: user.email },
        ACCESS_TOKEN_SECRET_KEY,
        {
          algorithm: "HS256",
          expiresIn: "1m",
        }
      );

      const refreshToken = jwt.sign(
        { uid: user.id },
        REFRESH_TOKEN_SECRET_KEY,
        {
          algorithm: "HS256",
          expiresIn: "1h",
        }
      );

      return Response({
        res,
        status: HttpStatus.OK,
        message: "Logged in",
        data: {
          accessToken: accToken,
          refreshToken,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  refreshAccessToken: async (req, res) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return Response({
          res,
          status: HttpStatus.UNAUTHORIZED,
          message: "Unauthorized",
        });
      }
      const refreshToken = authorization.split(" ")[1];
      jwt.verify(
        refreshToken,
        REFRESH_TOKEN_SECRET_KEY,
        async (err, decoded) => {
          if (err) {
            if (err.name === "TokenExpiredError") {
              return Response({
                res,
                status: HttpStatus.BAD_REQUEST,
                message: "Refresh token expired",
              });
            } else {
              return Response({
                res,
                status: HttpStatus.BAD_REQUEST,
                message: `Invalid refresh token: ${err.message}`,
              });
            }
          } else {
            const user = await User.findByPk(decoded.uid);
            const accToken = jwt.sign(
              { uid: user.id, email: user.email },
              ACCESS_TOKEN_SECRET_KEY,
              {
                algorithm: "HS256",
                expiresIn: "1m",
              }
            );
            return Response({
              res,
              status: HttpStatus.OK,
              message: "Successfully refresh access token",
              data: accToken,
            });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
};

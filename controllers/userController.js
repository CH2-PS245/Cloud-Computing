const bycrypt = require("bcryptjs");
const { HttpStatus, Response } = require("../http");
const { User, Profile } = require("../models");

module.exports = {
  getUser: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ["email", "createdAt"],
      });

      if (users.length < 1) {
        return Response({
          res,
          status: HttpStatus.OK,
          message: "Success but users data currently null",
        });
      }

      return Response({
        res,
        status: HttpStatus.OK,
        message: "Successfully get users data",
        data: users,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Profile,
            as: "profile",
            attributes: ["name", "job", "height", "weight"],
          },
        ],
      });

      if (!user) {
        return Response({
          res,
          status: HttpStatus.NOT_FOUND,
          message: "User not found",
        });
      }

      return Response({
        res,
        status: HttpStatus.OK,
        message: "User found",
        data: user,
      });
    } catch (error) {
      console.log(error);
    }
  },

  registerUser: async (req, res) => {
    try {
      const { email, password, username } = req.body;
      const encryptedPass = await bycrypt.hash(password, 10);

      if (password.length < 8) {
        return Response({
          res,
          status: HttpStatus.BAD_REQUEST,
          message: "User password min 8",
        });
      }

      if (username.length < 5) {
        return Response({
          res,
          status: HttpStatus.BAD_REQUEST,
          message: "Username min 5",
        });
      }

      const newUser = await User.create({
        username,
        email,
        password: encryptedPass,
      });

      if (!newUser) {
        return Response({
          res,
          status: HttpStatus.BAD_REQUEST,
          message: "Cannot register user",
        });
      }

      return Response({
        res,
        status: HttpStatus.CREATED,
        message: "Successfully register",
        data: newUser.id,
      });
    } catch (error) {
      console.log(error);
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { email, username } = req.body;
      const user = await User.findOne({
        where: {
          id,
        },
      });

      if (!user) {
        return Response({
          res,
          status: HttpStatus.NOT_FOUND,
          message: "User not found",
        });
      }

      if (username.length < 5) {
        return Response({
          res,
          status: HttpStatus.BAD_REQUEST,
          message: "Username too short, min 5",
        });
      }

      user.email = email;
      user.username = username;
      await user.save();
      return Response({
        res,
        status: HttpStatus.OK,
        message: "Successfully Updated User",
      });
    } catch (error) {
      console.log(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findOne({
        where: {
          id,
        },
      });

      if (!user) {
        return Response({
          res,
          status: HttpStatus.NOT_FOUND,
          message: "User not found",
        });
      }

      await user.destroy();

      return Response({
        res,
        status: HttpStatus.OK,
        message: "Successfully Deleted User",
      });
    } catch (error) {
      console.log(error);
    }
  },
};

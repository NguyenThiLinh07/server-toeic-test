const {
  genAccessToken,
  genRefreshToken,
  decodeToken,
} = require("../utilities/tokenHelper");
const User = require("../models/users.model");
const Friend = require("../models/friends.model");
const authServices = require("../services/authServices");
const httpStatus = require("http-status");

const authControllers = {
  loginWithFireBase: async (req, res) => {
    try {
      const { uid } = req.body;
      const findUser = await User.findOne({ uid });
      if (findUser) {
        const accessToken = genAccessToken(findUser.id);
        const refreshToken = genRefreshToken(findUser.id);
        const dataResponse = {
          user: findUser,
          token: {
            accessToken,
            refreshToken,
          },
        };
        return res.status(httpStatus.OK).json(dataResponse);
      } else {
        const userObj = new User(req.body);
        const user = await userObj.save();
        const friendObj = new Friend({ userId: user.id });
        friendObj.save();
        const accessToken = genAccessToken(user.id);
        const refreshToken = genRefreshToken(user.id);
        const dataResponse = {
          user,
          token: {
            accessToken,
            refreshToken,
          },
        };
        return res.status(httpStatus.OK).json(dataResponse);
      }
    } catch (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  refreshToken: async (req, res) => {
    try {
      const refreshTk = req.body.refresh;
      const decodeTokenValue = await decodeToken(refreshTk, false);
      const accessToken = genAccessToken(decodeTokenValue.uid);
      const refreshToken = genRefreshToken(decodeTokenValue.uid);
      return res.status(httpStatus.OK).json({
        accessToken,
        refreshToken,
      });
    } catch (err) {
      return res.status(httpStatus.FORBIDDEN).json();
    }
  },
  getCurrentUser: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const user = await authServices.getUserById(id);
      return res.status(httpStatus.OK).json(user);
    } catch (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
  },
};

module.exports = authControllers;

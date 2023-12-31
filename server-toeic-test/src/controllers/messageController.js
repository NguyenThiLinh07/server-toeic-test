const Message = require("../models/message.model");
const { HTTPStatusCode } = require("../constants");
const messageServices = require("../services/messageServices");
const pick = require("../utilities/pick");

const messageController = {
  sendMessage: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const { group, content } = req.body;
      const sendMess = await messageServices.createMessage(id, group, content);
      return res.status(HTTPStatusCode.OK).json(sendMess);
    } catch (err) {
      return res.status(HTTPStatusCode.BAD_REQUEST).json(err);
    }
  },
  getMessages: async (req, res) => {
    try {
      const { id } = req.infoUser;
      const { groupId } = req.query;
      const options = pick(req.query, ["sortBy", "limit", "page"]);
      const filter = { group: groupId };

      const listMessage = await messageServices.getMessages(filter, options);
      return res.status(HTTPStatusCode.OK).json(listMessage);
    } catch (err) {
      return res.status(HTTPStatusCode.BAD_REQUEST).json(err);
    }
  },
};

module.exports = messageController;

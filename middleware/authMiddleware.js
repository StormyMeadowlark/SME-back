
import User from "../models/User.js";
import "../config.js";

const authenticate = (roles) => {
  return async (req, res, next) => {
    const apiKey = req.header("x-api-key");
    if (!apiKey) {
      return res.status(401).json({ message: "API key is missing" });
    }

    const user = await User.findOne({ apiKey });
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  };
};

export default authenticate;

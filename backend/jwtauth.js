const jwt = require("jsonwebtoken");
// creating jwt token......................

const createjwttoken = ({ id }) => {
  return jwt.sign({ id: id }, process.env.JWTSECRET, {
    expiresIn: process.env.EXPIRETIME,
  });
};

// authenticating token.....................

const jwttokenmiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("token nahi hai");
    return res.status(401).json({ error: "Unauthorized access" });
  }

  try {
    const decodedata = jwt.verify(token, process.env.JWTSECRET);
    req.user = decodedata;
    next();
  } catch (error) {
    console.log("thats the problem");
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};

module.exports = { createjwttoken, jwttokenmiddleware };

const jwt = require("jsonwebtoken");
// creating jwt token......................

const createjwttoken = ({ id }) => {
  return jwt.sign({ id: id }, process.env.JWTSECRET, {
    expiresIn: process.env.EXPIRETIME,
  });
};

// authenticating token.....................
const jwttokenmiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Token not found in headers");
    return res.status(401).json({ error: "Unauthorized access" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedData = jwt.verify(token, process.env.JWTSECRET);
    req.user = decodedData;
    next();
  } catch (error) {
    console.log("Invalid or expired token");
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = { createjwttoken, jwttokenmiddleware };

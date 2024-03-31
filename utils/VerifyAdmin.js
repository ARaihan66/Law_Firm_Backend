const jwt = require("jsonwebtoken");

// Middleware to verify the admin's JWT token from the cookie
const verifyAdmin = async (req, res, next) => {
  // Retrieve the JWT token from the cookie
  const token = req.cookies.JWT;

  console.log(token);

  // Check if the token is missing
  if (!token) {
    return res.status(400).json({
      message: "Please Login First!!!",
    });
  }

  // Verify the token
  await jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    // Handle token verification errors
    if (err) {
      // Check for token expiration error
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token has expired. Please log in again.",
        });
      } else {
        // Handle other token verification errors
        return res.status(403).json({
          success: false,
          message: "Token is not valid!!!",
        });
      }
    } else {
      // If the token is valid, store the decoded user ID in the request object
      req.id = decoded.id;
      // Proceed to the next middleware or route handler
      next();
    }
  });
};

module.exports = verifyAdmin;

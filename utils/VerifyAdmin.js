const jwt = require("jsonwebtoken");

// Middleware to verify the admin's JWT token from the cookie
const verifyAdmin = async (req, res, next) => {
  // Retrieve the JWT token from the cookie
  const token = req.cookies.JWT;


  console.log("Token", req.cookies);
  console.log("JWT token", token);

  // Check if the token is missing
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Please Login First!!!",
    });
  }

  try {
    // Verify the token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    // If the token is valid, store the decoded user ID in the request object
    req.id = decoded.id;
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle token verification errors
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired. Please log in again.",
      });
    } else {
      // Log the error for debugging purposes
      console.error("Token verification error:", err);
      // Handle other token verification errors
      return res.status(403).json({
        success: false,
        message: "Token is not valid!!!",
      });
    }
  }
};

module.exports = verifyAdmin;

module.exports = function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.json({
      "status": "success",
      "authenticated": false,
    });
  }
};
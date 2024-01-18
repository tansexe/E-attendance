function authUser(req, res, next) {
  if (req.userId == null) {
    res.status(401);
    return res.send("You need to sign in");
  }
  next();
}

module.exports = {
  authUser,
};

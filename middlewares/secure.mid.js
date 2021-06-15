
module.exports.isAuthenticated = (req, res , next) => {
  if (req.user) {
    next();
  } else {
    redirect('/login');
  }
}

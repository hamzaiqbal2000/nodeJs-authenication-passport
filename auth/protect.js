const protectRoute = (req, res, next) => {
  if(req.isAuthenicated()) {
    return next()
  }
  console.log('Please log in to continue')
  res.redirect('/login')
}

const allowIf = (req, res, next) => {
  if(!req.isAuthenicated()) {
    return next()
  }
  res.redirect('/dashboard')
}

module.exports = {
  protectRoute,
  allowIf
}

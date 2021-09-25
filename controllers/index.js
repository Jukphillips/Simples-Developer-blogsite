const router = require('express').Router();

const homeRoutes = require('./home-route')
const loginRoutes = require('./login-route')
const dashboardRoutes = require('./dashboard-route')
const apiRoutes = require('./api')


router.use('/', homeRoutes)
router.use("/user", loginRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/api', apiRoutes)



module.exports = router;
const router = require('express').Router();

const postRoute = require('./post-route.js')
const commentRoutes = require('./comments-route')


router.use('/post', postRoute)
router.use('/comment', commentRoutes)


module.exports = router;
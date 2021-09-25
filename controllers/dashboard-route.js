const router = require('express').Router();
const { User, Post, Comment} = require('../models/index')


router.get("/", async (req, res) => {
    if(!req.session.loggedIn){
        res.redirect("/user")
    } else {
        console.log(req.session)
    const myUserData = await Post.findAll({
        where: {
            user_id: req.session.username.id
        },

        include: {
            model: User,
        }

    })

    const userPost = myUserData.map((post) => post.get({plain: true}));

    

    console.log(userPost)
    res.render('dashboard', {userPost, loggedIn: req.session.loggedIn} )


}})

router.get('/post', async (req, res) => {

    res.render('newPost')

})


module.exports = router;